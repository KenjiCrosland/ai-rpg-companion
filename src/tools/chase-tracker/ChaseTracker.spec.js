/**
 * Chase Tracker tests — schema v4 (pills, connect-mode, zone library).
 */

import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import {
  useChaseMap,
  STORAGE_KEY,
  LAST_PARTICIPANTS_KEY,
  SCHEMA_VERSION,
  SHAPE_DIMENSIONS,
} from './composables/useChaseMap.js';
import ChaseTracker from './ChaseTracker.vue';
import templatesData from './data/templates.json';
import shiftsData from './data/zoneShifts.json';
import libraryData from './data/zoneLibrary.json';
import { ROLE_DEFAULTS, TOKEN_ICON_MAP } from './config/tokenIcons.js';
import { TOKEN_COLORS } from './config/tokenColors.js';
import { PILL_TONES } from './config/pills.js';

describe('useChaseMap — core state', () => {
  beforeEach(() => localStorage.clear());

  test('starts empty when no saved state', () => {
    const map = useChaseMap();
    expect(map.state.hasActiveChase).toBe(false);
    expect(map.state.zones).toEqual([]);
    expect(map.state.tokens).toEqual([]);
    expect(map.state.connectingFromZoneId).toBeNull();
  });

  test('startFromTemplate loads zones, connections, tokens and environment', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const template = templatesData.templates.find((t) => t.id === 'urban_alleys');
    expect(map.state.hasActiveChase).toBe(true);
    expect(map.state.mapName).toBe(template.name);
    expect(map.state.environment).toBe('urban');
    expect(map.state.zones).toHaveLength(template.zones.length);
  });

  test('template zones carry pills arrays (never a state field)', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    for (const zone of map.state.zones) {
      expect(Array.isArray(zone.pills)).toBe(true);
      expect(zone).not.toHaveProperty('state');
    }
  });

  test('default tokens have valid icon and color fields', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    for (const token of map.state.tokens) {
      expect(TOKEN_ICON_MAP[token.icon]).toBeDefined();
      expect(TOKEN_COLORS[token.color]).toBeDefined();
    }
  });
});

describe('useChaseMap — movement', () => {
  beforeEach(() => localStorage.clear());

  test('moveSelectedTokenTo rejects non-adjacent, accepts adjacent', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const token = map.state.tokens[0];
    map.selectToken(token.id);
    const nonAdjacent = map.state.zones.find(
      (z) => z.id !== token.zoneId && !map.isAdjacent(token.zoneId, z.id)
    );
    if (nonAdjacent) {
      expect(map.moveSelectedTokenTo(nonAdjacent.id)).toBe(false);
      // Rejection preserves selection — don't re-toggle.
    }
    const adjacent = map.state.zones.find(
      (z) => z.id !== token.zoneId && map.isAdjacent(token.zoneId, z.id)
    );
    expect(map.moveSelectedTokenTo(adjacent.id)).toBe(true);
    expect(token.zoneId).toBe(adjacent.id);
  });

  test('moveTokenTo: tray ↔ any zone always allowed', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const token = map.state.tokens[0];
    expect(map.moveTokenTo(token.id, null)).toBe(true);
    const farZone = map.state.zones[map.state.zones.length - 1];
    expect(map.moveTokenTo(token.id, farZone.id)).toBe(true);
  });
});

describe('useChaseMap — connect mode', () => {
  beforeEach(() => localStorage.clear());

  test('startConnectMode sets the source zone; cancel clears it', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const zoneId = map.state.zones[0].id;
    map.startConnectMode(zoneId);
    expect(map.state.connectingFromZoneId).toBe(zoneId);
    map.cancelConnectMode();
    expect(map.state.connectingFromZoneId).toBeNull();
  });

  test('startConnectMode ignores unknown zone ids', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    map.startConnectMode('not-a-real-zone');
    expect(map.state.connectingFromZoneId).toBeNull();
  });

  test('completeConnection on an unconnected pair creates a connection', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    // Find any non-adjacent pair
    const a = map.state.zones[0];
    const b = map.state.zones.find((z) => z.id !== a.id && !map.isAdjacent(a.id, z.id));
    if (!b) return;
    map.startConnectMode(a.id);
    const result = map.completeConnection(b.id);
    expect(result).toBe('connected');
    expect(map.isAdjacent(a.id, b.id)).toBe(true);
    expect(map.state.connectingFromZoneId).toBeNull();
  });

  test('completeConnection on an existing connection disconnects (toggle)', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const [a, b] = map.state.connections[0];
    map.startConnectMode(a);
    const result = map.completeConnection(b);
    expect(result).toBe('disconnected');
    expect(map.isAdjacent(a, b)).toBe(false);
    expect(map.state.connectingFromZoneId).toBeNull();
  });

  test('completeConnection with same zone cancels without mutating graph', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const zone = map.state.zones[0];
    const connectionsBefore = map.state.connections.length;
    map.startConnectMode(zone.id);
    const result = map.completeConnection(zone.id);
    expect(result).toBe('cancelled');
    expect(map.state.connections.length).toBe(connectionsBefore);
    expect(map.state.connectingFromZoneId).toBeNull();
  });

  test('removeZone cancels connect mode when removing the source', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const zone = map.state.zones[0];
    map.startConnectMode(zone.id);
    map.removeZone(zone.id);
    expect(map.state.connectingFromZoneId).toBeNull();
  });

  test('connect state is not persisted to localStorage', async () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    map.startConnectMode(map.state.zones[0].id);
    await nextTick();
    const persisted = JSON.parse(localStorage.getItem(STORAGE_KEY));
    expect(persisted).not.toHaveProperty('connectingFromZoneId');
  });
});

describe('useChaseMap — pills', () => {
  beforeEach(() => localStorage.clear());

  test('addPillToZone normalizes tone and returns an id', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const zoneId = map.state.zones[0].id;
    const pillsBefore = map.state.zones.find((z) => z.id === zoneId).pills.length;
    const id = map.addPillToZone(zoneId, { label: 'On Fire', tone: 'danger', detail: 'Flames.' });
    expect(id).toBeTruthy();
    const zone = map.state.zones.find((z) => z.id === zoneId);
    expect(zone.pills.length).toBe(pillsBefore + 1);
    const pill = zone.pills.find((p) => p.id === id);
    expect(pill.tone).toBe('danger');
    expect(pill.label).toBe('On Fire');
  });

  test('addPillToZone coerces invalid tone to "neutral"', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const zoneId = map.state.zones[0].id;
    const id = map.addPillToZone(zoneId, { label: 'Weird', tone: 'fuchsia' });
    const pill = map.state.zones
      .find((z) => z.id === zoneId)
      .pills.find((p) => p.id === id);
    expect(pill.tone).toBe('neutral');
  });

  test('removePillFromZone removes the pill', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const zoneId = map.state.zones[0].id;
    const id = map.addPillToZone(zoneId, { label: 'Temporary', tone: 'warm' });
    map.removePillFromZone(zoneId, id);
    const zone = map.state.zones.find((z) => z.id === zoneId);
    expect(zone.pills.some((p) => p.id === id)).toBe(false);
  });

  test('updatePillOnZone writes only known fields and clamps label', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const zoneId = map.state.zones[0].id;
    const id = map.addPillToZone(zoneId, { label: 'X', tone: 'warm' });
    const longLabel = 'a'.repeat(80);
    map.updatePillOnZone(zoneId, id, { label: longLabel, tone: 'danger', detail: 'ok' });
    const pill = map.state.zones
      .find((z) => z.id === zoneId)
      .pills.find((p) => p.id === id);
    expect(pill.label.length).toBe(40);
    expect(pill.tone).toBe('danger');
    expect(pill.detail).toBe('ok');
  });
});

describe('useChaseMap — zone library', () => {
  beforeEach(() => localStorage.clear());

  test('addZoneFromLibrary applies shape dimensions', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    // Pick a wide library zone we know exists
    const fishMarket = libraryData.zones.find((z) => z.id === 'lib_urb_002');
    expect(fishMarket.shape).toBe('wide');
    const id = map.addZoneFromLibrary(fishMarket);
    const zone = map.state.zones.find((z) => z.id === id);
    expect(zone.colSpan).toBe(SHAPE_DIMENSIONS.wide.colSpan);
    expect(zone.rowSpan).toBe(SHAPE_DIMENSIONS.wide.rowSpan);
  });

  test('addZoneFromLibrary applies defaultPills', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const fishMarket = libraryData.zones.find((z) => z.id === 'lib_urb_002');
    const id = map.addZoneFromLibrary(fishMarket);
    const zone = map.state.zones.find((z) => z.id === id);
    expect(zone.pills.length).toBe(fishMarket.defaultPills.length);
    expect(zone.pills[0].tone).toBeDefined();
    expect(PILL_TONES[zone.pills[0].tone]).toBeDefined();
  });

  test('addZoneFromLibrary extends grid when no empty cell fits', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const rowsBefore = map.state.gridRows;
    // Pour in enough zones that the initial 3×3 grid can't accommodate them
    const smallish = libraryData.zones.find((z) => z.shape === 'small');
    for (let i = 0; i < 8; i++) map.addZoneFromLibrary(smallish);
    expect(map.state.gridRows).toBeGreaterThan(rowsBefore);
  });

  test('unknown shape falls back to small', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const id = map.addZoneFromLibrary({
      name: 'Weird',
      description: '',
      shape: 'definitely-not-a-shape',
      defaultPills: [],
    });
    const zone = map.state.zones.find((z) => z.id === id);
    expect(zone.colSpan).toBe(1);
    expect(zone.rowSpan).toBe(1);
  });
});

describe('useChaseMap — dash tracking', () => {
  beforeEach(() => localStorage.clear());

  test('new tokens start with dashCount 0', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    for (const token of map.state.tokens) {
      expect(token.dashCount).toBe(0);
    }
  });

  test('incrementDash bumps by one; decrementDash floors at 0', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const id = map.state.tokens[0].id;
    map.incrementDash(id);
    map.incrementDash(id);
    expect(map.state.tokens[0].dashCount).toBe(2);
    map.decrementDash(id);
    expect(map.state.tokens[0].dashCount).toBe(1);
    map.decrementDash(id);
    map.decrementDash(id); // already 0
    expect(map.state.tokens[0].dashCount).toBe(0);
  });

  test('setDashCount clamps negatives to 0 and floors fractions', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const id = map.state.tokens[0].id;
    map.setDashCount(id, -3);
    expect(map.state.tokens[0].dashCount).toBe(0);
    map.setDashCount(id, 4.8);
    expect(map.state.tokens[0].dashCount).toBe(4);
  });

  test('startFromTemplate resets dashCount for all tokens', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    map.state.tokens.forEach((t) => map.incrementDash(t.id));
    map.startFromTemplate('wilderness_trails');
    for (const token of map.state.tokens) {
      expect(token.dashCount).toBe(0);
    }
  });
});

describe('useChaseMap — participants panel state', () => {
  beforeEach(() => localStorage.clear());

  test('startFromTemplate expands the panel on fresh chase', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    expect(map.state.participantsPanelCollapsed).toBe(false);
  });

  test('toggleParticipantsPanel flips the flag', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    map.toggleParticipantsPanel();
    expect(map.state.participantsPanelCollapsed).toBe(true);
    map.toggleParticipantsPanel();
    expect(map.state.participantsPanelCollapsed).toBe(false);
  });

  test('rehydrated chase preserves collapsed state', async () => {
    const map1 = useChaseMap();
    map1.startFromTemplate('urban_alleys');
    map1.toggleParticipantsPanel();
    await nextTick();
    await nextTick();
    const map2 = useChaseMap();
    expect(map2.state.participantsPanelCollapsed).toBe(true);
  });
});

describe('useChaseMap — last-used participants', () => {
  beforeEach(() => localStorage.clear());

  test('renaming tokens writes the payload to LAST_PARTICIPANTS_KEY', async () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const pcToken = map.state.tokens.find((t) => t.role === 'pc');
    map.renameToken(pcToken.id, 'Gorum');
    // Debounce is 250ms — wait past that with real timers
    await new Promise((resolve) => setTimeout(resolve, 320));
    const saved = JSON.parse(localStorage.getItem(LAST_PARTICIPANTS_KEY));
    expect(saved).toBeTruthy();
    expect(saved.pc).toContain('Gorum');
  });

  test('applyLastParticipants renames existing tokens up to the saved count', () => {
    localStorage.setItem(
      LAST_PARTICIPANTS_KEY,
      JSON.stringify({
        quarry: ['Shadow'],
        pc: ['Gorum', 'Talis'],
        pursuer: ['Watchguard'],
      })
    );
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const quarry = map.state.tokens.filter((t) => t.role === 'quarry');
    const pcs = map.state.tokens.filter((t) => t.role === 'pc');
    const pursuers = map.state.tokens.filter((t) => t.role === 'pursuer');
    expect(quarry[0].label).toBe('Shadow');
    expect(pcs[0].label).toBe('Gorum');
    expect(pcs[1].label).toBe('Talis');
    expect(pursuers[0].label).toBe('Watchguard');
  });

  test('applyLastParticipants adds extra tokens when saved party > template defaults', () => {
    localStorage.setItem(
      LAST_PARTICIPANTS_KEY,
      JSON.stringify({
        quarry: ['Shadow'],
        pc: ['Gorum', 'Talis', 'Fenn', 'Morr'],
        pursuer: ['Watchguard'],
      })
    );
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const pcs = map.state.tokens.filter((t) => t.role === 'pc');
    expect(pcs).toHaveLength(4);
    expect(pcs.map((p) => p.label)).toEqual(['Gorum', 'Talis', 'Fenn', 'Morr']);
    // Extras inherit the role-default icon + color so they look coherent
    expect(pcs[3].icon).toBeDefined();
    expect(pcs[3].zoneId).toBeDefined();
  });

  test('missing last-participants key leaves template labels intact', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    expect(map.state.tokens.find((t) => t.role === 'quarry').label).toBe('Quarry');
    expect(map.state.tokens.filter((t) => t.role === 'pc')[0].label).toBe('PC');
  });
});

describe('useChaseMap — addParticipant', () => {
  beforeEach(() => localStorage.clear());

  test('addParticipant places the new token at the same zone as the last of that role', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const existingPCs = map.state.tokens.filter((t) => t.role === 'pc');
    const anchor = existingPCs.at(-1).zoneId;
    const id = map.addParticipant('pc');
    const added = map.state.tokens.find((t) => t.id === id);
    expect(added.zoneId).toBe(anchor);
    expect(added.dashCount).toBe(0);
  });
});

describe('useChaseMap — persistence', () => {
  beforeEach(() => localStorage.clear());

  test('current-schema state round-trips', async () => {
    const map1 = useChaseMap();
    map1.startFromTemplate('wilderness_trails');
    await nextTick();
    await nextTick();
    const map2 = useChaseMap();
    expect(map2.state.hasActiveChase).toBe(true);
    expect(map2.state.schemaVersion).toBe(SCHEMA_VERSION);
  });

  test('older schemaVersion is cleared (no migration for pre-v4)', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ schemaVersion: 2, hasActiveChase: true, zones: [], tokens: [] })
    );
    const map = useChaseMap();
    expect(map.state.hasActiveChase).toBe(false);
  });

  test('malformed JSON resets to empty', () => {
    localStorage.setItem(STORAGE_KEY, '{not valid json');
    const map = useChaseMap();
    expect(map.state.hasActiveChase).toBe(false);
  });
});

describe('useChaseMap — misc', () => {
  beforeEach(() => localStorage.clear());

  test('rollShift picks from the pool', () => {
    const map = useChaseMap();
    const spy = jest.spyOn(Math, 'random').mockReturnValue(0);
    map.rollShift();
    expect(map.state.pendingShift).toEqual(
      expect.objectContaining({ id: shiftsData.shifts[0].id })
    );
    spy.mockRestore();
  });

  test('addToken applies role defaults when icon/color omitted', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const id = map.addToken({ label: 'Stranger', role: 'pursuer' });
    const token = map.state.tokens.find((t) => t.id === id);
    expect(token.icon).toBe(ROLE_DEFAULTS.pursuer.icon);
    expect(token.color).toBe(ROLE_DEFAULTS.pursuer.color);
    expect(token.zoneId).toBeNull();
  });

  test('updateZone refuses to write a legacy `state` field', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const zoneId = map.state.zones[0].id;
    map.updateZone(zoneId, { name: 'Renamed', state: 'crowded' });
    const zone = map.state.zones.find((z) => z.id === zoneId);
    expect(zone.name).toBe('Renamed');
    expect(zone).not.toHaveProperty('state');
  });

  test('reset clears state', async () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    await nextTick();
    map.reset();
    await nextTick();
    expect(map.state.hasActiveChase).toBe(false);
  });
});

describe('ChaseTracker root', () => {
  beforeEach(() => localStorage.clear());

  test('free tier shows only non-premium templates', () => {
    const wrapper = mount(ChaseTracker, { props: { premium: false } });
    const expected = templatesData.templates.filter((t) => !t.premium).length;
    expect(wrapper.findAll('.picker-card').length).toBe(expected);
  });

  test('premium tier shows all templates', () => {
    const wrapper = mount(ChaseTracker, { props: { premium: true } });
    expect(wrapper.findAll('.picker-card').length).toBe(templatesData.templates.length);
  });

  test('renders the template picker when no active chase', () => {
    const wrapper = mount(ChaseTracker, { props: { premium: false } });
    expect(wrapper.find('.template-picker').exists()).toBe(true);
    expect(wrapper.find('.chase-map').exists()).toBe(false);
  });
});
