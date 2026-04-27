import { reactive, computed, ref, watch } from 'vue';
import templatesData from '../data/templates.json';
import { uid } from '../utils/random.js';
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
const DASH_HINT_SEEN_KEY = 'cros-chase-tracker-dash-hint-seen';

function hasSeenDashHint() {
  if (typeof window === 'undefined' || !window.localStorage) return true;
  try {
    return window.localStorage.getItem(DASH_HINT_SEEN_KEY) === 'true';
  } catch {
    return true;
  }
}

function markDashHintSeen() {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(DASH_HINT_SEEN_KEY, 'true');
  } catch {
    // silent
  }
}

// Floor for gridCols so a small surviving zone (e.g. one 1×1 zone
// left after deletions) doesn't stretch full-viewport when the CSS
// grid recomputes to `repeat(${gridCols}, 1fr)`. Three matches the
// natural width of every shipped template, so the grid feels like
// a 3-wide canvas at minimum even when sparsely populated.
const MIN_GRID_COLS = 3;
const EMPTY_GRID_DIMS = { rows: 3, cols: 3 };

export const SHAPE_DIMENSIONS = {
  small:   { colSpan: 1, rowSpan: 1 },
  wide:    { colSpan: 2, rowSpan: 1 },
  tall:    { colSpan: 1, rowSpan: 2 },
  large:   { colSpan: 2, rowSpan: 2 },
  massive: { colSpan: 3, rowSpan: 1 },
};

function emptyState() {
  return {
    hasActiveChase: false,
    mapName: '',
    environments: [],
    scenario: '',
    gridCols: 0,
    gridRows: 0,
    zones: [],
    connections: [],
    tokens: [],
    selectedTokenId: null,
    connectingFromZoneId: null,
    participantsPanelCollapsed: false,
    pendingPlacementCell: null,
    // ID of the zone added most recently in the current library session.
    // Used to chain successive picks together so a sequence of adds
    // forms a connected path even when consecutive zones don't share a
    // grid edge (e.g. they meet only at a corner, or a forced grow
    // bumps the new zone to a fresh row). Cleared when the library
    // closes, a new chase starts, or the referenced zone is removed.
    lastAddedZoneId: null,
    // GM preference: auto-connect a newly placed zone to every existing
    // grid-edge neighbor and to the previously added zone from the
    // same library session. On by default because that's how GMs
    // usually want a sequence of adds to read; toggle off for full
    // manual control.
    autoConnectEnabled: true,
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
    // Marks a token as GM-authored rather than a pristine template
    // default. Only userEdited tokens are written to the cross-chase
    // "last participants" memory — that way seeing a template's
    // example tokens for the first time doesn't hijack every other
    // template's defaults.
    userEdited: raw.userEdited === true,
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
    // Light shape check — if the core collections are missing or the
    // wrong type, discard and start clean. Cheaper than a schema
    // version, and pre-release so we don't owe migrations.
    if (
      !parsed ||
      typeof parsed !== 'object' ||
      !Array.isArray(parsed.zones) ||
      !Array.isArray(parsed.tokens) ||
      !Array.isArray(parsed.connections)
    ) {
      return null;
    }
    // Fill any fields added after the stored payload was written.
    if (!Array.isArray(parsed.environments)) parsed.environments = [];
    if (typeof parsed.scenario !== 'string') parsed.scenario = '';
    if (typeof parsed.participantsPanelCollapsed !== 'boolean') {
      parsed.participantsPanelCollapsed = true;
    }
    if (typeof parsed.autoConnectEnabled !== 'boolean') {
      parsed.autoConnectEnabled = true;
    }
    // Drop ephemeral UI state.
    parsed.connectingFromZoneId = null;
    parsed.pendingPlacementCell = null;
    parsed.lastAddedZoneId = null;
    delete parsed.schemaVersion;
    return parsed;
  } catch {
    return null;
  }
}

function saveToStorage(state) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    // Don't persist ephemeral UI state — these are all tied to a live
    // flow (connect mode / edge-expansion → library / current library
    // add session).
    const {
      connectingFromZoneId,
      pendingPlacementCell,
      lastAddedZoneId,
      ...persisted
    } = state;
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

// Two zones share a grid edge (not just a corner) when their bounding
// rectangles touch along a row or column boundary AND overlap on the
// perpendicular axis. Used to auto-connect newly placed zones to their
// visual neighbors so the GM doesn't have to redraw connections by hand.
function sharesGridEdge(a, b) {
  const aColEnd = a.col + (a.colSpan || 1) - 1;
  const aRowEnd = a.row + (a.rowSpan || 1) - 1;
  const bColEnd = b.col + (b.colSpan || 1) - 1;
  const bRowEnd = b.row + (b.rowSpan || 1) - 1;
  const colsTouch = aColEnd + 1 === b.col || bColEnd + 1 === a.col;
  const rowsOverlap = Math.max(a.row, b.row) <= Math.min(aRowEnd, bRowEnd);
  if (colsTouch && rowsOverlap) return true;
  const rowsTouch = aRowEnd + 1 === b.row || bRowEnd + 1 === a.row;
  const colsOverlap = Math.max(a.col, b.col) <= Math.min(aColEnd, bColEnd);
  return rowsTouch && colsOverlap;
}

// AABB overlap check: is the candidate colSpan×rowSpan region anchored at
// (col, row) free of every existing zone's region?
function isRegionFree(col, row, colSpan, rowSpan, zones) {
  for (const z of zones) {
    const zColSpan = z.colSpan || 1;
    const zRowSpan = z.rowSpan || 1;
    const overlapX = col < z.col + zColSpan && col + colSpan > z.col;
    const overlapY = row < z.row + zRowSpan && row + rowSpan > z.row;
    if (overlapX && overlapY) return false;
  }
  return true;
}

// First (col, row) where a colSpan×rowSpan region fits inside the grid
// (cols × rows) without overlapping any existing zone. Scans row-major,
// left-to-right, top-to-bottom.
function findFreeRegion(zones, cols, rows, colSpan, rowSpan) {
  for (let r = 1; r <= rows - rowSpan + 1; r++) {
    for (let c = 1; c <= cols - colSpan + 1; c++) {
      if (isRegionFree(c, r, colSpan, rowSpan, zones)) {
        return { col: c, row: r };
      }
    }
  }
  return null;
}

export function useChaseMap() {
  const state = reactive(loadFromStorage() || emptyState());

  // Ephemeral UI refs — not persisted. dashHintVisible drives the
  // one-time Dash onboarding popover; the localStorage-backed
  // "seen" flag controls whether it can ever show again.
  const dashHintVisible = ref(false);

  // Defensive sweep on rehydrate: collapse any completely-empty rows/cols
  // left over from older saved states or unexpected edits. The lazy
  // expandGrid flow won't create orphans, but compacting on load keeps the
  // grid honest if a future path ever does.
  if (state.hasActiveChase && state.zones.length) {
    recomputeGridDimensions();
  }

  watch(
    () => state,
    (val) => saveToStorage(val),
    { deep: true }
  );

  // Throttled cross-chase party memory. Every token-list change schedules
  // a save; the payload is a role-keyed list of labels from the current
  // chase, so the next chase can pre-fill it. Only userEdited tokens go
  // into the payload — pristine template defaults (e.g. Boblin, Fenn the
  // Cutpurse) must never overwrite another template's example tokens just
  // because the GM loaded the first template.
  let lastPartTimer = null;
  watch(
    () => state.tokens.map((t) => `${t.role}:${t.label}:${t.userEdited ? 1 : 0}`),
    () => {
      if (!state.hasActiveChase) return;
      if (!state.tokens.length) return;
      if (lastPartTimer) clearTimeout(lastPartTimer);
      lastPartTimer = setTimeout(() => {
        const payload = { quarry: [], pc: [], pursuer: [] };
        for (const token of state.tokens) {
          if (!token.userEdited) continue;
          if (payload[token.role]) payload[token.role].push(token.label);
        }
        // If nothing in this chase is GM-authored yet, leave the stored
        // payload alone so it still reflects the last real party.
        const hasAny =
          payload.quarry.length || payload.pc.length || payload.pursuer.length;
        if (hasAny) saveLastParticipantsToStorage(payload);
        lastPartTimer = null;
      }, 250);
    },
    { deep: false }
  );

  function startFromTemplate(templateId) {
    const template = templatesData.templates.find((t) => t.id === templateId);
    if (!template) return;

    state.hasActiveChase = true;
    state.mapName = template.name;
    state.environments = Array.isArray(template.environments)
      ? [...template.environments]
      : [];
    state.scenario = typeof template.scenario === 'string' ? template.scenario : '';
    state.gridCols = template.gridCols;
    state.gridRows = template.gridRows;
    state.zones = template.zones.map(normalizeZone);
    state.connections = template.connections.map((c) => [...c]);
    state.tokens = template.defaultTokens.map(normalizeToken);
    state.selectedTokenId = null;
    state.connectingFromZoneId = null;
    state.lastAddedZoneId = null;
    state.participantsPanelCollapsed = false;

    applyLastParticipants();
  }

  function applyLastParticipants() {
    const saved = loadLastParticipants();
    if (!saved) return;

    for (const role of ['quarry', 'pc', 'pursuer']) {
      const names = (saved[role] || []).filter((n) => typeof n === 'string' && n.trim());
      // Nothing saved for this role → leave the template defaults alone
      // so GMs can still see each template's example characters.
      if (!names.length) continue;

      const existing = state.tokens.filter((t) => t.role === role);
      const sharedCount = Math.min(existing.length, names.length);

      for (let i = 0; i < sharedCount; i++) {
        existing[i].label = names[i];
        // Applied saved labels are carried forward as user-authored —
        // if the GM keeps them, they should persist across templates.
        existing[i].userEdited = true;
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
            userEdited: true,
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

  function moveTokenTo(tokenId, zoneId, { countAsDash = true } = {}) {
    const token = state.tokens.find((t) => t.id === tokenId);
    if (!token) return false;
    if (token.zoneId === zoneId) return false;
    const fromTray = token.zoneId === null;
    const toTray = zoneId === null;
    if (!fromTray && !toTray && !isAdjacent(token.zoneId, zoneId)) return false;
    token.zoneId = zoneId;
    if (state.selectedTokenId === tokenId) state.selectedTokenId = null;
    // Auto-increment Dash for pure zone↔zone moves — that's what
    // movement in a chase represents in the fiction. Tray interactions
    // (placing / removing) are setup & don't count. Callers like the
    // Participants panel opt out via countAsDash: false.
    if (countAsDash && !fromTray && !toTray) {
      incrementDash(tokenId);
    }
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
      // Anything the GM adds by hand (via the TokenCreator or the +Add
      // buttons on the Participants panel) counts as user-authored,
      // so it flows into cross-chase memory.
      userEdited: true,
    };
    state.tokens.push(token);
    return token.id;
  }

  // Adds a participant of the given role and picks a smart default zone:
  // 1) the zone with the most on-board tokens of that role, or
  // 2) the first zone in grid order (row, col) if none are on the board, or
  // 3) the tray (null) if there are no zones at all.
  function addParticipant(role) {
    if (!['quarry', 'pc', 'pursuer'].includes(role)) role = 'pc';
    const onBoard = state.tokens.filter((t) => t.role === role && t.zoneId !== null);

    let anchorZoneId = null;
    if (onBoard.length > 0) {
      const counts = new Map();
      for (const t of onBoard) {
        counts.set(t.zoneId, (counts.get(t.zoneId) || 0) + 1);
      }
      let bestCount = 0;
      for (const [zid, count] of counts) {
        if (count > bestCount) {
          bestCount = count;
          anchorZoneId = zid;
        }
      }
    } else if (state.zones.length > 0) {
      const sorted = [...state.zones].sort(
        (a, b) => a.row - b.row || a.col - b.col
      );
      anchorZoneId = sorted[0].id;
    }

    return addToken({ role, zoneId: anchorZoneId });
  }

  // Direct zone assignment — bypasses adjacency. Used by the Participants
  // panel's location dropdown, where the GM is setting up or correcting
  // positions rather than making a play-movement call.
  function setTokenZone(tokenId, zoneId) {
    const token = state.tokens.find((t) => t.id === tokenId);
    if (!token) return false;
    if (zoneId !== null && !state.zones.some((z) => z.id === zoneId)) return false;
    token.zoneId = zoneId;
    if (state.selectedTokenId === tokenId) state.selectedTokenId = null;
    return true;
  }

  function removeToken(tokenId) {
    const idx = state.tokens.findIndex((t) => t.id === tokenId);
    if (idx === -1) return;
    state.tokens.splice(idx, 1);
    if (state.selectedTokenId === tokenId) state.selectedTokenId = null;
  }

  function renameToken(tokenId, label) {
    const token = state.tokens.find((t) => t.id === tokenId);
    if (!token) return;
    token.label = label;
    token.userEdited = true;
  }

  function updateToken(tokenId, fields) {
    const token = state.tokens.find((t) => t.id === tokenId);
    if (!token) return;
    Object.assign(token, fields);
  }

  function incrementDash(tokenId) {
    const token = state.tokens.find((t) => t.id === tokenId);
    if (!token) return;
    const prev = token.dashCount || 0;
    token.dashCount = prev + 1;
    // Surface the teaching hint on the first fresh 0→1 transition
    // this user has experienced. This method is only reached via
    // explicit user action (manual + tap OR a move after rehydration),
    // so persisted counts from a prior session don't accidentally
    // fire it on load.
    if (prev === 0 && !hasSeenDashHint()) {
      dashHintVisible.value = true;
    }
  }

  function dismissDashHint() {
    dashHintVisible.value = false;
    markDashHintSeen();
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

  function setScenario(text) {
    state.scenario = typeof text === 'string' ? text : '';
  }

  function updateZone(zoneId, fields) {
    const zone = state.zones.find((z) => z.id === zoneId);
    if (!zone) return;
    const { state: _drop, pills: _drop2, ...safe } = fields;
    Object.assign(zone, safe);
  }

  function addZone({ name = 'New Zone', description = '', col, row, colSpan = 1, rowSpan = 1 } = {}) {
    if (col == null || row == null) {
      const cols = Math.max(state.gridCols, colSpan);
      const rows = Math.max(state.gridRows, 1) + rowSpan;
      const cell = findFreeRegion(state.zones, cols, rows, colSpan, rowSpan);
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
    autoConnectNewZone(zone);
    state.lastAddedZoneId = zone.id;
    return zone.id;
  }

  // After a zone is pushed, auto-connect it on two axes:
  //   1. Spatial — every existing zone that shares a grid edge.
  //   2. Temporal — the zone added immediately before this one in the
  //      same library session, so a sequence of adds forms a connected
  //      path even when consecutive zones meet only at a corner or sit
  //      a row apart after a forced grow.
  // connectZones is a no-op for self-connections and pairs that already
  // share an edge, so the two passes can overlap safely.
  function autoConnectNewZone(zone) {
    if (!state.autoConnectEnabled) return;
    for (const other of state.zones) {
      if (other.id === zone.id) continue;
      if (sharesGridEdge(zone, other)) connectZones(zone.id, other.id);
    }
    if (state.lastAddedZoneId && state.lastAddedZoneId !== zone.id) {
      const prior = state.zones.find((z) => z.id === state.lastAddedZoneId);
      if (prior) connectZones(prior.id, zone.id);
    }
  }

  function setAutoConnectEnabled(val) {
    state.autoConnectEnabled = !!val;
  }

  function addZoneFromLibrary(libraryZone) {
    const shape = SHAPE_DIMENSIONS[libraryZone.shape] || SHAPE_DIMENSIONS.small;

    let placement = null;

    // Priority path: the user opened the library by clicking an edge `+`.
    // pendingPlacementCell holds the direction; placeAtEdgeTarget scans
    // the matching edge row/column for a fit and only grows the grid when
    // the shape can't land at the existing edge. Pending is intentionally
    // *not* cleared here so successive picks from the same flow keep
    // landing on the same edge (clearPendingPlacement runs on dismiss).
    if (state.pendingPlacementCell) {
      placement = placeAtEdgeTarget(state.pendingPlacementCell, shape);
    }

    // Default path: scan the current grid for the first free region that
    // fits the preferred shape.
    if (!placement) {
      const cols = Math.max(state.gridCols, 1);
      const rows = Math.max(state.gridRows, 1);
      const found = findFreeRegion(state.zones, cols, rows, shape.colSpan, shape.rowSpan);
      if (found) {
        placement = { col: found.col, row: found.row, colSpan: shape.colSpan, rowSpan: shape.rowSpan };
      }
    }

    // Preferred shape doesn't fit anywhere in the current grid: append a
    // new row at the bottom and place the zone there at its preferred
    // shape. Only shrink to 1×1 if the shape is wider than the grid.
    if (!placement) {
      const newRow = state.gridRows + 1;
      if (shape.colSpan <= Math.max(state.gridCols, 1)) {
        placement = { col: 1, row: newRow, colSpan: shape.colSpan, rowSpan: shape.rowSpan };
      } else {
        placement = { col: 1, row: newRow, colSpan: 1, rowSpan: 1 };
      }
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
    autoConnectNewZone(zone);
    state.lastAddedZoneId = zone.id;
    return zone.id;
  }

  // Resolve a placement for an edge-direction pick. Scan the existing
  // edge row (top/bottom) or column (left/right) for a free region the
  // preferred shape can occupy; if nothing fits, grow the grid in the
  // pending direction and place the zone at the new edge. Successive
  // picks from the same flow keep landing on the same edge — only one
  // new row/column is added per pick that actually needs the room, so
  // the grid never gains empty space the user didn't ask for.
  function placeAtEdgeTarget(target, shape) {
    const { direction } = target;
    const cols = Math.max(state.gridCols, 1);
    const rows = Math.max(state.gridRows, 1);

    if (direction === 'bottom') {
      const anchorRow = rows - shape.rowSpan + 1;
      if (anchorRow >= 1) {
        for (let c = 1; c + shape.colSpan - 1 <= cols; c++) {
          if (isRegionFree(c, anchorRow, shape.colSpan, shape.rowSpan, state.zones)) {
            return { col: c, row: anchorRow, colSpan: shape.colSpan, rowSpan: shape.rowSpan };
          }
        }
      }
      return growAndPlace(direction, shape);
    }

    if (direction === 'top') {
      if (shape.rowSpan <= rows) {
        for (let c = 1; c + shape.colSpan - 1 <= cols; c++) {
          if (isRegionFree(c, 1, shape.colSpan, shape.rowSpan, state.zones)) {
            return { col: c, row: 1, colSpan: shape.colSpan, rowSpan: shape.rowSpan };
          }
        }
      }
      return growAndPlace(direction, shape);
    }

    if (direction === 'right') {
      const anchorCol = cols - shape.colSpan + 1;
      if (anchorCol >= 1) {
        for (let r = 1; r + shape.rowSpan - 1 <= rows; r++) {
          if (isRegionFree(anchorCol, r, shape.colSpan, shape.rowSpan, state.zones)) {
            return { col: anchorCol, row: r, colSpan: shape.colSpan, rowSpan: shape.rowSpan };
          }
        }
      }
      return growAndPlace(direction, shape);
    }

    if (direction === 'left') {
      if (shape.colSpan <= cols) {
        for (let r = 1; r + shape.rowSpan - 1 <= rows; r++) {
          if (isRegionFree(1, r, shape.colSpan, shape.rowSpan, state.zones)) {
            return { col: 1, row: r, colSpan: shape.colSpan, rowSpan: shape.rowSpan };
          }
        }
      }
      return growAndPlace(direction, shape);
    }

    return null;
  }

  // Grow the grid in the requested direction by exactly the shape's span
  // along that axis, then return a placement at the new edge. For `top`
  // and `left`, existing zones shift away to make room (zone IDs are
  // unchanged so connections and tokens are unaffected).
  function growAndPlace(direction, shape) {
    if (direction === 'bottom') {
      const newRow = state.gridRows + 1;
      state.gridRows += shape.rowSpan;
      if (shape.colSpan > state.gridCols) state.gridCols = shape.colSpan;
      return { col: 1, row: newRow, colSpan: shape.colSpan, rowSpan: shape.rowSpan };
    }
    if (direction === 'top') {
      for (const zone of state.zones) zone.row += shape.rowSpan;
      state.gridRows += shape.rowSpan;
      if (shape.colSpan > state.gridCols) state.gridCols = shape.colSpan;
      return { col: 1, row: 1, colSpan: shape.colSpan, rowSpan: shape.rowSpan };
    }
    if (direction === 'right') {
      const newCol = state.gridCols + 1;
      state.gridCols += shape.colSpan;
      if (shape.rowSpan > state.gridRows) state.gridRows = shape.rowSpan;
      return { col: newCol, row: 1, colSpan: shape.colSpan, rowSpan: shape.rowSpan };
    }
    if (direction === 'left') {
      for (const zone of state.zones) zone.col += shape.colSpan;
      state.gridCols += shape.colSpan;
      if (shape.rowSpan > state.gridRows) state.gridRows = shape.rowSpan;
      return { col: 1, row: 1, colSpan: shape.colSpan, rowSpan: shape.rowSpan };
    }
    return null;
  }

  // Capture the user's directional intent without mutating the grid.
  // Growth (and any zone shift) happens lazily in placeAtEdgeTarget when
  // a library pick actually needs the room. This keeps clicking an edge
  // `+` from creating an orphan empty row when the same edge can still
  // host the next zone, and lets repeated picks from the same flow
  // continue to land on the same edge.
  function expandGrid(direction) {
    if (!['top', 'bottom', 'left', 'right'].includes(direction)) return null;
    const target = { direction };
    state.pendingPlacementCell = target;
    return target;
  }

  function clearPendingPlacement() {
    state.pendingPlacementCell = null;
    // Library close ends the current add session, so the next pick
    // starts a fresh chain instead of connecting back to whatever the
    // GM placed before they dismissed the drawer.
    state.lastAddedZoneId = null;
  }

  function removeZone(zoneId) {
    state.zones = state.zones.filter((z) => z.id !== zoneId);
    state.connections = state.connections.filter(([a, b]) => a !== zoneId && b !== zoneId);
    state.tokens.forEach((t) => {
      if (t.zoneId === zoneId) t.zoneId = null;
    });
    if (state.connectingFromZoneId === zoneId) state.connectingFromZoneId = null;
    if (state.lastAddedZoneId === zoneId) state.lastAddedZoneId = null;
    recomputeGridDimensions();
  }

  // Collapse every row and column that contains no zones (leading,
  // middle, or trailing). Intra-row cell gaps — empty cells inside a row
  // that still has zones elsewhere — are preserved, so a deleted middle
  // zone leaves a placeable gap in its row rather than the whole row
  // collapsing. Zone coords are compacted so the first occupied row/col
  // lands at 1.
  //
  // gridCols is floored at MIN_GRID_COLS so a small surviving zone
  // (e.g. one 1×1 zone left after deletes) doesn't stretch to fill the
  // viewport — the grid keeps its template-natural width even when
  // sparsely populated. Rows are allowed to shrink freely because the
  // CSS grid auto-sizes row heights to content.
  function recomputeGridDimensions() {
    if (!state.zones.length) {
      state.gridRows = EMPTY_GRID_DIMS.rows;
      state.gridCols = EMPTY_GRID_DIMS.cols;
      return;
    }

    const occupiedRows = new Set();
    const occupiedCols = new Set();
    for (const z of state.zones) {
      const rowEnd = z.row + (z.rowSpan || 1) - 1;
      const colEnd = z.col + (z.colSpan || 1) - 1;
      for (let r = z.row; r <= rowEnd; r++) occupiedRows.add(r);
      for (let c = z.col; c <= colEnd; c++) occupiedCols.add(c);
    }

    function compact(oldPos, occupied) {
      let missing = 0;
      for (let p = 1; p < oldPos; p++) {
        if (!occupied.has(p)) missing++;
      }
      return oldPos - missing;
    }

    for (const z of state.zones) {
      z.row = compact(z.row, occupiedRows);
      z.col = compact(z.col, occupiedCols);
    }

    state.gridRows = Math.max(1, occupiedRows.size);
    state.gridCols = Math.max(MIN_GRID_COLS, occupiedCols.size);
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

  function reset() {
    Object.assign(state, emptyState());
  }

  // Wipe the cross-chase party memory AND reload the current map's
  // template defaults so the GM can see the example tokens again. Used
  // for the "Restore example party" action. Safe to call mid-chase;
  // existing zones, connections, and pills are preserved.
  function resetParticipantsToTemplate() {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.removeItem(LAST_PARTICIPANTS_KEY);
      } catch {
        // silent
      }
    }
    const template = templatesData.templates.find((t) => t.name === state.mapName);
    if (!template) return;
    state.tokens = template.defaultTokens.map(normalizeToken);
    state.selectedTokenId = null;
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
    setTokenZone,
    addToken,
    addParticipant,
    removeToken,
    renameToken,
    updateToken,
    incrementDash,
    dashHintVisible,
    dismissDashHint,
    decrementDash,
    setDashCount,
    toggleParticipantsPanel,
    setParticipantsPanelCollapsed,
    setScenario,
    updateZone,
    addZone,
    addZoneFromLibrary,
    setAutoConnectEnabled,
    expandGrid,
    clearPendingPlacement,
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
    reset,
    resetParticipantsToTemplate,
    isAdjacent,
    tokensByZone,
    trayTokens,
    participantsByRole,
    adjacentZoneIds,
    validDropZoneIdsFor,
  };
}

export { STORAGE_KEY, LAST_PARTICIPANTS_KEY, DASH_HINT_SEEN_KEY };
