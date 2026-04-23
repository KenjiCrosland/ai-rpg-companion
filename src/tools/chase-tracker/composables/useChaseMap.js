import { reactive, computed, watch } from 'vue';
import templatesData from '../data/templates.json';
import shiftsData from '../data/zoneShifts.json';
import { pickRandom, uid } from '../utils/random.js';
import {
  ROLE_DEFAULTS,
  ROLE_LABELS,
  LEGACY_ICON_MIGRATION,
  TOKEN_ICON_MAP,
} from '../config/tokenIcons.js';
import { TOKEN_COLORS } from '../config/tokenColors.js';
import { PILL_TONES } from '../config/pills.js';

const STORAGE_KEY = 'cros-chase-tracker';
const LAST_PARTICIPANTS_KEY = 'cros-chase-tracker-last-participants';
// v5: tokens gain dashCount; root gains participantsPanelCollapsed.
const SCHEMA_VERSION = 5;

export const SHAPE_DIMENSIONS = {
  small:   { colSpan: 1, rowSpan: 1 },
  wide:    { colSpan: 2, rowSpan: 1 },
  tall:    { colSpan: 1, rowSpan: 2 },
  large:   { colSpan: 2, rowSpan: 2 },
  massive: { colSpan: 3, rowSpan: 1 },
};

function emptyState() {
  return {
    schemaVersion: SCHEMA_VERSION,
    hasActiveChase: false,
    mapName: '',
    environment: null,
    gridCols: 0,
    gridRows: 0,
    zones: [],
    connections: [],
    tokens: [],
    selectedTokenId: null,
    pendingShift: null,
    connectingFromZoneId: null,
    participantsPanelCollapsed: false,
  };
}

function normalizeToken(raw) {
  const role = ['quarry', 'pc', 'pursuer'].includes(raw.role) ? raw.role : 'pc';
  const defaults = ROLE_DEFAULTS[role];

  let icon = raw.icon;
  if (icon && LEGACY_ICON_MIGRATION[icon]) icon = LEGACY_ICON_MIGRATION[icon];
  if (!icon || !TOKEN_ICON_MAP[icon]) icon = defaults.icon;

  let color = raw.color;
  if (!color || !TOKEN_COLORS[color]) color = defaults.color;

  return {
    id: raw.id || uid('tok'),
    label: raw.label || ROLE_LABELS[role],
    role,
    icon,
    color,
    zoneId: raw.zoneId === undefined ? null : raw.zoneId,
    dashCount: typeof raw.dashCount === 'number' && raw.dashCount > 0
      ? Math.floor(raw.dashCount)
      : 0,
  };
}

function normalizePill(raw) {
  const tone = PILL_TONES[raw.tone] ? raw.tone : 'neutral';
  return {
    id: raw.id || uid('pill'),
    label: String(raw.label || '').slice(0, 40) || 'Pill',
    tone,
    detail: typeof raw.detail === 'string' ? raw.detail : '',
  };
}

function normalizeZone(raw) {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description || '',
    col: raw.col,
    row: raw.row,
    colSpan: raw.colSpan || 1,
    rowSpan: raw.rowSpan || 1,
    pills: Array.isArray(raw.pills) ? raw.pills.map(normalizePill) : [],
  };
}

function loadFromStorage() {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.schemaVersion !== SCHEMA_VERSION) return null;
    parsed.connectingFromZoneId = null;
    if (typeof parsed.participantsPanelCollapsed !== 'boolean') {
      parsed.participantsPanelCollapsed = true;
    }
    return parsed;
  } catch {
    return null;
  }
}

function saveToStorage(state) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    const { connectingFromZoneId, ...persisted } = state;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
  } catch {
    // storage full or disabled — silent
  }
}

function loadLastParticipants() {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    const raw = window.localStorage.getItem(LAST_PARTICIPANTS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return {
      quarry: Array.isArray(parsed.quarry) ? parsed.quarry : [],
      pc: Array.isArray(parsed.pc) ? parsed.pc : [],
      pursuer: Array.isArray(parsed.pursuer) ? parsed.pursuer : [],
    };
  } catch {
    return null;
  }
}

function saveLastParticipantsToStorage(payload) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(LAST_PARTICIPANTS_KEY, JSON.stringify(payload));
  } catch {
    // silent
  }
}

function firstEmptyCell(zones, cols, rows) {
  const occupied = new Set();
  for (const z of zones) {
    for (let c = z.col; c < z.col + (z.colSpan || 1); c++) {
      for (let r = z.row; r < z.row + (z.rowSpan || 1); r++) {
        occupied.add(`${c},${r}`);
      }
    }
  }
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      if (!occupied.has(`${c},${r}`)) return { col: c, row: r };
    }
  }
  return null;
}

function fitsAt(zones, col, row, colSpan, rowSpan) {
  for (const z of zones) {
    const overlapX = col < z.col + (z.colSpan || 1) && col + colSpan > z.col;
    const overlapY = row < z.row + (z.rowSpan || 1) && row + rowSpan > z.row;
    if (overlapX && overlapY) return false;
  }
  return true;
}

export function useChaseMap() {
  const state = reactive(loadFromStorage() || emptyState());

  watch(
    () => state,
    (val) => saveToStorage(val),
    { deep: true }
  );

  // Throttled cross-chase party memory. Every token-list change schedules
  // a save; the payload is a role-keyed list of labels from the current
  // chase, so the next chase can pre-fill it.
  let lastPartTimer = null;
  watch(
    () => state.tokens.map((t) => `${t.role}:${t.label}`),
    () => {
      if (!state.hasActiveChase) return;
      if (!state.tokens.length) return;
      if (lastPartTimer) clearTimeout(lastPartTimer);
      lastPartTimer = setTimeout(() => {
        const payload = { quarry: [], pc: [], pursuer: [] };
        for (const token of state.tokens) {
          if (payload[token.role]) payload[token.role].push(token.label);
        }
        saveLastParticipantsToStorage(payload);
        lastPartTimer = null;
      }, 250);
    },
    { deep: false }
  );

  function startFromTemplate(templateId) {
    const template = templatesData.templates.find((t) => t.id === templateId);
    if (!template) return;

    state.schemaVersion = SCHEMA_VERSION;
    state.hasActiveChase = true;
    state.mapName = template.name;
    state.environment = template.environment || null;
    state.gridCols = template.gridCols;
    state.gridRows = template.gridRows;
    state.zones = template.zones.map(normalizeZone);
    state.connections = template.connections.map((c) => [...c]);
    state.tokens = template.defaultTokens.map(normalizeToken);
    state.selectedTokenId = null;
    state.pendingShift = null;
    state.connectingFromZoneId = null;
    state.participantsPanelCollapsed = false;

    applyLastParticipants();
  }

  function applyLastParticipants() {
    const saved = loadLastParticipants();
    if (!saved) return;

    for (const role of ['quarry', 'pc', 'pursuer']) {
      const names = (saved[role] || []).filter((n) => typeof n === 'string' && n.trim());
      if (!names.length) continue;

      const existing = state.tokens.filter((t) => t.role === role);
      const sharedCount = Math.min(existing.length, names.length);

      for (let i = 0; i < sharedCount; i++) {
        existing[i].label = names[i];
      }

      if (names.length > existing.length) {
        const defaults = ROLE_DEFAULTS[role];
        const anchorZoneId = existing.at(-1)?.zoneId ?? state.zones[0]?.id ?? null;
        for (let i = existing.length; i < names.length; i++) {
          state.tokens.push({
            id: uid('tok'),
            label: names[i],
            role,
            icon: defaults.icon,
            color: defaults.color,
            zoneId: anchorZoneId,
            dashCount: 0,
          });
        }
      }
    }
  }

  function selectToken(tokenId) {
    state.selectedTokenId = state.selectedTokenId === tokenId ? null : tokenId;
  }

  function clearSelection() {
    state.selectedTokenId = null;
  }

  function isAdjacent(zoneIdA, zoneIdB) {
    if (zoneIdA === zoneIdB) return true;
    return state.connections.some(
      ([a, b]) =>
        (a === zoneIdA && b === zoneIdB) || (a === zoneIdB && b === zoneIdA)
    );
  }

  function moveTokenTo(tokenId, zoneId) {
    const token = state.tokens.find((t) => t.id === tokenId);
    if (!token) return false;
    if (token.zoneId === zoneId) return false;
    const fromTray = token.zoneId === null;
    const toTray = zoneId === null;
    if (!fromTray && !toTray && !isAdjacent(token.zoneId, zoneId)) return false;
    token.zoneId = zoneId;
    if (state.selectedTokenId === tokenId) state.selectedTokenId = null;
    return true;
  }

  function moveSelectedTokenTo(zoneId) {
    if (!state.selectedTokenId) return false;
    return moveTokenTo(state.selectedTokenId, zoneId);
  }

  function addToken({ label, role = 'pc', icon, color, zoneId = null } = {}) {
    const defaults = ROLE_DEFAULTS[role] || ROLE_DEFAULTS.pc;
    const token = {
      id: uid('tok'),
      label: label || ROLE_LABELS[role] || 'Token',
      role: ['quarry', 'pc', 'pursuer'].includes(role) ? role : 'pc',
      icon: icon || defaults.icon,
      color: color || defaults.color,
      zoneId: zoneId === undefined ? null : zoneId,
      dashCount: 0,
    };
    state.tokens.push(token);
    return token.id;
  }

  // Adds a participant of the given role at the same zone as the last
  // existing token of that role (or the first zone, or the tray as a last
  // resort). Used by the Participants panel's "+ Add" buttons.
  function addParticipant(role) {
    if (!['quarry', 'pc', 'pursuer'].includes(role)) role = 'pc';
    const existing = state.tokens.filter((t) => t.role === role);
    const anchorZoneId = existing.at(-1)?.zoneId ?? state.zones[0]?.id ?? null;
    return addToken({ role, zoneId: anchorZoneId });
  }

  function removeToken(tokenId) {
    const idx = state.tokens.findIndex((t) => t.id === tokenId);
    if (idx === -1) return;
    state.tokens.splice(idx, 1);
    if (state.selectedTokenId === tokenId) state.selectedTokenId = null;
  }

  function renameToken(tokenId, label) {
    const token = state.tokens.find((t) => t.id === tokenId);
    if (token) token.label = label;
  }

  function updateToken(tokenId, fields) {
    const token = state.tokens.find((t) => t.id === tokenId);
    if (!token) return;
    Object.assign(token, fields);
  }

  function incrementDash(tokenId) {
    const token = state.tokens.find((t) => t.id === tokenId);
    if (!token) return;
    token.dashCount = (token.dashCount || 0) + 1;
  }

  function decrementDash(tokenId) {
    const token = state.tokens.find((t) => t.id === tokenId);
    if (!token) return;
    token.dashCount = Math.max(0, (token.dashCount || 0) - 1);
  }

  function setDashCount(tokenId, n) {
    const token = state.tokens.find((t) => t.id === tokenId);
    if (!token) return;
    const next = Number(n);
    token.dashCount = Number.isFinite(next) ? Math.max(0, Math.floor(next)) : 0;
  }

  function toggleParticipantsPanel() {
    state.participantsPanelCollapsed = !state.participantsPanelCollapsed;
  }

  function setParticipantsPanelCollapsed(val) {
    state.participantsPanelCollapsed = !!val;
  }

  function updateZone(zoneId, fields) {
    const zone = state.zones.find((z) => z.id === zoneId);
    if (!zone) return;
    const { state: _drop, pills: _drop2, ...safe } = fields;
    Object.assign(zone, safe);
  }

  function addZone({ name = 'New Zone', description = '', col, row, colSpan = 1, rowSpan = 1 } = {}) {
    if (col == null || row == null) {
      const cell = firstEmptyCell(state.zones, Math.max(state.gridCols, 1), Math.max(state.gridRows, 1) + 1);
      col = cell?.col || 1;
      row = cell?.row || state.gridRows + 1;
    }
    const zone = {
      id: uid('zone'),
      name,
      description,
      col,
      row,
      colSpan,
      rowSpan,
      pills: [],
    };
    state.zones.push(zone);
    if (col + colSpan - 1 > state.gridCols) state.gridCols = col + colSpan - 1;
    if (row + rowSpan - 1 > state.gridRows) state.gridRows = row + rowSpan - 1;
    return zone.id;
  }

  function addZoneFromLibrary(libraryZone) {
    const shape = SHAPE_DIMENSIONS[libraryZone.shape] || SHAPE_DIMENSIONS.small;
    const cols = Math.max(state.gridCols, 1);
    const rows = state.gridRows;

    let placement = null;
    for (let r = 1; r <= rows && !placement; r++) {
      for (let c = 1; c <= cols - shape.colSpan + 1 && !placement; c++) {
        if (fitsAt(state.zones, c, r, shape.colSpan, shape.rowSpan)) {
          placement = { col: c, row: r, colSpan: shape.colSpan, rowSpan: shape.rowSpan };
        }
      }
    }
    if (!placement) {
      const colSpan = Math.min(shape.colSpan, cols);
      placement = { col: 1, row: rows + 1, colSpan, rowSpan: shape.rowSpan };
    }

    const zone = {
      id: uid('zone'),
      name: libraryZone.name,
      description: libraryZone.description || '',
      ...placement,
      pills: Array.isArray(libraryZone.defaultPills)
        ? libraryZone.defaultPills.map(normalizePill)
        : [],
    };
    state.zones.push(zone);
    if (zone.col + zone.colSpan - 1 > state.gridCols) state.gridCols = zone.col + zone.colSpan - 1;
    if (zone.row + zone.rowSpan - 1 > state.gridRows) state.gridRows = zone.row + zone.rowSpan - 1;
    return zone.id;
  }

  function removeZone(zoneId) {
    state.zones = state.zones.filter((z) => z.id !== zoneId);
    state.connections = state.connections.filter(([a, b]) => a !== zoneId && b !== zoneId);
    state.tokens.forEach((t) => {
      if (t.zoneId === zoneId) t.zoneId = null;
    });
    if (state.connectingFromZoneId === zoneId) state.connectingFromZoneId = null;
  }

  function connectZones(zoneIdA, zoneIdB) {
    if (zoneIdA === zoneIdB) return;
    if (isAdjacent(zoneIdA, zoneIdB)) return;
    state.connections.push([zoneIdA, zoneIdB]);
  }

  function disconnectZones(zoneIdA, zoneIdB) {
    state.connections = state.connections.filter(
      ([a, b]) =>
        !((a === zoneIdA && b === zoneIdB) || (a === zoneIdB && b === zoneIdA))
    );
  }

  function toggleConnection(zoneIdA, zoneIdB) {
    if (zoneIdA === zoneIdB) return 'ignored';
    if (isAdjacent(zoneIdA, zoneIdB)) {
      disconnectZones(zoneIdA, zoneIdB);
      return 'disconnected';
    }
    connectZones(zoneIdA, zoneIdB);
    return 'connected';
  }

  function startConnectMode(zoneId) {
    if (!state.zones.some((z) => z.id === zoneId)) return;
    state.connectingFromZoneId = zoneId;
  }

  function cancelConnectMode() {
    state.connectingFromZoneId = null;
  }

  function completeConnection(targetZoneId) {
    const source = state.connectingFromZoneId;
    if (!source) return null;
    if (source === targetZoneId) {
      state.connectingFromZoneId = null;
      return 'cancelled';
    }
    const result = toggleConnection(source, targetZoneId);
    state.connectingFromZoneId = null;
    return result;
  }

  function addPillToZone(zoneId, pill) {
    const zone = state.zones.find((z) => z.id === zoneId);
    if (!zone) return null;
    const normalized = normalizePill(pill);
    zone.pills.push(normalized);
    return normalized.id;
  }

  function removePillFromZone(zoneId, pillId) {
    const zone = state.zones.find((z) => z.id === zoneId);
    if (!zone) return;
    zone.pills = zone.pills.filter((p) => p.id !== pillId);
  }

  function updatePillOnZone(zoneId, pillId, fields) {
    const zone = state.zones.find((z) => z.id === zoneId);
    if (!zone) return;
    const pill = zone.pills.find((p) => p.id === pillId);
    if (!pill) return;
    if (typeof fields.label === 'string') pill.label = fields.label.slice(0, 40);
    if (fields.tone && PILL_TONES[fields.tone]) pill.tone = fields.tone;
    if (typeof fields.detail === 'string') pill.detail = fields.detail;
  }

  function rollShift() {
    const shift = pickRandom(shiftsData.shifts);
    state.pendingShift = shift ? { ...shift } : null;
  }

  function dismissShift() {
    state.pendingShift = null;
  }

  function reset() {
    Object.assign(state, emptyState());
  }

  const tokensByZone = computed(() => {
    const map = {};
    for (const zone of state.zones) map[zone.id] = [];
    for (const token of state.tokens) {
      if (token.zoneId !== null && map[token.zoneId]) {
        map[token.zoneId].push(token);
      }
    }
    return map;
  });

  const trayTokens = computed(() =>
    state.tokens.filter((t) => t.zoneId === null)
  );

  const participantsByRole = computed(() => {
    const out = { quarry: [], pc: [], pursuer: [] };
    for (const token of state.tokens) {
      if (out[token.role]) out[token.role].push(token);
    }
    return out;
  });

  const adjacentZoneIds = computed(() => {
    if (!state.selectedTokenId) return new Set();
    const token = state.tokens.find((t) => t.id === state.selectedTokenId);
    if (!token) return new Set();
    if (token.zoneId === null) return new Set(state.zones.map((z) => z.id));
    const ids = new Set([token.zoneId]);
    for (const [a, b] of state.connections) {
      if (a === token.zoneId) ids.add(b);
      if (b === token.zoneId) ids.add(a);
    }
    return ids;
  });

  function validDropZoneIdsFor(tokenId) {
    const token = state.tokens.find((t) => t.id === tokenId);
    if (!token) return new Set();
    if (token.zoneId === null) return new Set(state.zones.map((z) => z.id));
    const ids = new Set([token.zoneId]);
    for (const [a, b] of state.connections) {
      if (a === token.zoneId) ids.add(b);
      if (b === token.zoneId) ids.add(a);
    }
    return ids;
  }

  return {
    state,
    startFromTemplate,
    selectToken,
    clearSelection,
    moveTokenTo,
    moveSelectedTokenTo,
    addToken,
    addParticipant,
    removeToken,
    renameToken,
    updateToken,
    incrementDash,
    decrementDash,
    setDashCount,
    toggleParticipantsPanel,
    setParticipantsPanelCollapsed,
    updateZone,
    addZone,
    addZoneFromLibrary,
    removeZone,
    connectZones,
    disconnectZones,
    toggleConnection,
    startConnectMode,
    cancelConnectMode,
    completeConnection,
    addPillToZone,
    removePillFromZone,
    updatePillOnZone,
    rollShift,
    dismissShift,
    reset,
    isAdjacent,
    tokensByZone,
    trayTokens,
    participantsByRole,
    adjacentZoneIds,
    validDropZoneIdsFor,
  };
}

export { STORAGE_KEY, LAST_PARTICIPANTS_KEY, SCHEMA_VERSION };
