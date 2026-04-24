/**
 * Chase Tracker tests.
 */

import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import {
  useChaseMap,
  STORAGE_KEY,
  LAST_PARTICIPANTS_KEY,
  SHAPE_DIMENSIONS,
} from './composables/useChaseMap.js';
import ChaseTracker from './ChaseTracker.vue';
import templatesData from './data/templates.json';
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
    expect(map.state.environments).toEqual(['urban']);
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

  function zonesOverlap(a, b) {
    const aColEnd = a.col + (a.colSpan || 1);
    const aRowEnd = a.row + (a.rowSpan || 1);
    const bColEnd = b.col + (b.colSpan || 1);
    const bRowEnd = b.row + (b.rowSpan || 1);
    return a.col < bColEnd && aColEnd > b.col && a.row < bRowEnd && aRowEnd > b.row;
  }

  test('library wide zone never overlaps an existing multi-cell zone', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    // rooftops is 3×1 at (1,1); main_street is 2×1 at (1,2).
    const wide = libraryData.zones.find((z) => z.shape === 'wide');
    const id = map.addZoneFromLibrary(wide);
    const placed = map.state.zones.find((z) => z.id === id);
    for (const other of map.state.zones) {
      if (other.id === id) continue;
      expect(zonesOverlap(placed, other)).toBe(false);
    }
  });

  test('large (2×2) library zone falls through to bottom expansion when no region fits', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    // Urban template is fully packed 3×3 with spans that leave no 2×2
    // region free. A large zone must expand the grid, keeping its
    // preferred shape rather than shrinking to 1×1.
    const rowsBefore = map.state.gridRows;
    const id = map.addZoneFromLibrary({
      name: 'Plaza', description: '', shape: 'large', defaultPills: [],
    });
    const placed = map.state.zones.find((z) => z.id === id);
    expect(placed.colSpan).toBe(SHAPE_DIMENSIONS.large.colSpan);
    expect(placed.rowSpan).toBe(SHAPE_DIMENSIONS.large.rowSpan);
    expect(placed.row).toBeGreaterThan(rowsBefore);
    for (const other of map.state.zones) {
      if (other.id === id) continue;
      expect(zonesOverlap(placed, other)).toBe(false);
    }
  });

  test('edge expansion: large shape at top target lands at the top with preferred shape', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    // expandGrid('top') opens one empty row above rooftops (3×1). A
    // large (2×2) zone needs two rows, so the grid must grow further in
    // the same direction (pushing existing zones down) so the zone lands
    // at row 1 with its full shape rather than drifting to the bottom.
    map.expandGrid('top');
    const id = map.addZoneFromLibrary({
      name: 'Watchtower', description: '', shape: 'large', defaultPills: [],
    });
    const placed = map.state.zones.find((z) => z.id === id);
    expect(placed.row).toBe(1);
    expect(placed.colSpan).toBe(SHAPE_DIMENSIONS.large.colSpan);
    expect(placed.rowSpan).toBe(SHAPE_DIMENSIONS.large.rowSpan);
    for (const other of map.state.zones) {
      if (other.id === id) continue;
      expect(zonesOverlap(placed, other)).toBe(false);
    }
  });

  test('edge expansion: tall shape at top target lands at the top with preferred shape', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    map.expandGrid('top');
    const id = map.addZoneFromLibrary({
      name: 'Belltower', description: '', shape: 'tall', defaultPills: [],
    });
    const placed = map.state.zones.find((z) => z.id === id);
    expect(placed.row).toBe(1);
    expect(placed.rowSpan).toBe(SHAPE_DIMENSIONS.tall.rowSpan);
    for (const other of map.state.zones) {
      if (other.id === id) continue;
      expect(zonesOverlap(placed, other)).toBe(false);
    }
  });

  test('edge expansion: wide shape at left target lands at the left edge', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    // expandGrid('left') opens one empty column; a wide (2×1) zone
    // needs two columns and must push existing zones further right.
    map.expandGrid('left');
    const id = map.addZoneFromLibrary({
      name: 'Canal Mouth', description: '', shape: 'wide', defaultPills: [],
    });
    const placed = map.state.zones.find((z) => z.id === id);
    expect(placed.col).toBe(1);
    expect(placed.colSpan).toBe(SHAPE_DIMENSIONS.wide.colSpan);
    for (const other of map.state.zones) {
      if (other.id === id) continue;
      expect(zonesOverlap(placed, other)).toBe(false);
    }
  });

  test('edge expansion: wide shape at top target keeps preferred span', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    map.expandGrid('top');
    const id = map.addZoneFromLibrary({
      name: 'Weathervane', description: '', shape: 'wide', defaultPills: [],
    });
    const placed = map.state.zones.find((z) => z.id === id);
    // Wide zone at the new top row (row 1) — lots of free columns, so
    // preferred span should survive.
    expect(placed.colSpan).toBe(SHAPE_DIMENSIONS.wide.colSpan);
    expect(placed.rowSpan).toBe(SHAPE_DIMENSIONS.wide.rowSpan);
    expect(placed.row).toBe(1);
    for (const other of map.state.zones) {
      if (other.id === id) continue;
      expect(zonesOverlap(placed, other)).toBe(false);
    }
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
    // Urban template ships with named defaults for v1 content expansion.
    expect(map.state.tokens.find((t) => t.role === 'quarry').label).toBe('Fenn the Cutpurse');
    expect(map.state.tokens.filter((t) => t.role === 'pc')[0].label).toBe('Boblin');
  });

  test('blank template starts with generic placeholder token labels', () => {
    const map = useChaseMap();
    map.startFromTemplate('blank');
    expect(map.state.tokens.find((t) => t.role === 'quarry').label).toBe('Quarry');
    expect(map.state.tokens.filter((t) => t.role === 'pc')[0].label).toBe('PC');
    expect(map.state.tokens.find((t) => t.role === 'pursuer').label).toBe('Pursuer');
  });

  test('blank template loads no zones and all tokens in the tray', () => {
    const map = useChaseMap();
    map.startFromTemplate('blank');
    expect(map.state.zones).toEqual([]);
    expect(map.state.tokens.every((t) => t.zoneId === null)).toBe(true);
  });

  test('startFromTemplate sets the scenario to the template default', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    expect(map.state.scenario).toMatch(/^\[Example\]/);
  });

  test('setScenario writes the new text and replaces the example default', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    map.setScenario('The thief was seen near the temple at dusk.');
    expect(map.state.scenario).toBe('The thief was seen near the temple at dusk.');
  });

  test('starting a new chase from the same template resets the scenario', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    map.setScenario('Custom scene.');
    map.startFromTemplate('urban_alleys');
    expect(map.state.scenario).toMatch(/^\[Example\]/);
  });
});

describe('useChaseMap — addParticipant (smart default)', () => {
  beforeEach(() => localStorage.clear());

  test('picks the zone with the most on-board tokens of that role', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    // Urban template: PCs default to back_alley (2 tokens). That's the
    // densest PC zone, so addParticipant('pc') should anchor there.
    const densestZoneId = 'back_alley';
    const id = map.addParticipant('pc');
    expect(map.state.tokens.find((t) => t.id === id).zoneId).toBe(densestZoneId);
  });

  test('falls back to the first zone in grid order when no on-board tokens of role', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    // Remove all PCs from the board
    const pcs = map.state.tokens.filter((t) => t.role === 'pc');
    pcs.forEach((p) => map.removeToken(p.id));

    const id = map.addParticipant('pc');
    // First zone in grid order for urban_alleys is "rooftops" (row 1, col 1)
    expect(map.state.tokens.find((t) => t.id === id).zoneId).toBe('rooftops');
  });

  test('all-off-board tokens are treated as absent for anchoring', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    map.state.tokens.filter((t) => t.role === 'pc').forEach((p) => {
      map.setTokenZone(p.id, null);
    });
    const id = map.addParticipant('pc');
    expect(map.state.tokens.find((t) => t.id === id).zoneId).toBe('rooftops');
  });
});

describe('useChaseMap — recomputeGridDimensions on removeZone', () => {
  beforeEach(() => localStorage.clear());

  test('removing the last zone of the bottom row shrinks gridRows', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const rowsBefore = map.state.gridRows;
    // Urban template's bottom row (row 3) has back_alley, inn_kitchen, warehouse_row
    map.removeZone('back_alley');
    map.removeZone('inn_kitchen');
    // Still one zone left in row 3 (warehouse_row), so grid unchanged
    expect(map.state.gridRows).toBe(rowsBefore);
    map.removeZone('warehouse_row');
    expect(map.state.gridRows).toBe(rowsBefore - 1);
  });

  test('emptying the top row trims the leading gap; zones below shift up', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const mainStreetBefore = map.state.zones.find((z) => z.id === 'main_street').row;
    // Remove rooftops — it was the only zone in row 1 (cols 1-3).
    map.removeZone('rooftops');
    const mainStreetAfter = map.state.zones.find((z) => z.id === 'main_street').row;
    // Leading empty rows are reclaimed — zones shift up by the gap.
    expect(mainStreetAfter).toBe(mainStreetBefore - 1);
    expect(map.state.gridRows).toBe(2);
  });

  test('multiple leading empty rows are all reclaimed in one pass', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    // Push the template down by two rows, then delete only the zone
    // that used to be at the top.
    map.expandGrid('top');
    map.expandGrid('top');
    map.removeZone('rooftops');
    // Remaining zones were at rows 4 (main_street/canal_bridge) and 5
    // (back_alley/inn_kitchen/warehouse_row). Rows 1–3 were leading
    // empties; they should be trimmed so the topmost zones land at row 1.
    expect(map.state.zones.find((z) => z.id === 'main_street').row).toBe(1);
    expect(map.state.zones.find((z) => z.id === 'back_alley').row).toBe(2);
    expect(map.state.gridRows).toBe(2);
  });

  test('emptying a middle row collapses it; zones below shift up', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    map.removeZone('main_street');
    map.removeZone('canal_bridge');
    // Row 2 had no zones left — the whole row collapses. Row-3 zones
    // shift up to take its place.
    expect(map.state.gridRows).toBe(2);
    expect(map.state.zones.find((z) => z.id === 'rooftops').row).toBe(1);
    expect(map.state.zones.find((z) => z.id === 'back_alley').row).toBe(2);
    expect(map.state.zones.find((z) => z.id === 'inn_kitchen').row).toBe(2);
    expect(map.state.zones.find((z) => z.id === 'warehouse_row').row).toBe(2);
  });

  test('after expanding then removing the new zone, grid returns to original size', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const rowsBefore = map.state.gridRows;
    map.expandGrid('bottom');
    expect(map.state.gridRows).toBe(rowsBefore + 1);
    const libraryZone = { name: 'Extra', description: '', shape: 'small', defaultPills: [] };
    const id = map.addZoneFromLibrary(libraryZone);
    expect(map.state.gridRows).toBe(rowsBefore + 1);
    map.removeZone(id);
    expect(map.state.gridRows).toBe(rowsBefore);
  });

  test('removing the final zone resets the grid to 1×1', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    for (const zone of [...map.state.zones]) map.removeZone(zone.id);
    expect(map.state.gridRows).toBe(1);
    expect(map.state.gridCols).toBe(1);
  });

  test('deleting a zone inside a row keeps the row; other zones do not shift', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    // Middle zone of row 3 (inn_kitchen). back_alley (col 1) and
    // warehouse_row (col 3) stay put; col 2 row 3 becomes a placeable gap.
    map.removeZone('inn_kitchen');
    expect(map.state.gridRows).toBe(3);
    expect(map.state.gridCols).toBe(3);
    expect(map.state.zones.find((z) => z.id === 'back_alley').col).toBe(1);
    expect(map.state.zones.find((z) => z.id === 'warehouse_row').col).toBe(3);
  });
});

describe('useChaseMap — expandGrid', () => {
  beforeEach(() => localStorage.clear());

  test('bottom increments gridRows without shifting existing zones', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const rowsBefore = map.state.gridRows;
    const snapshot = map.state.zones.map((z) => ({ id: z.id, col: z.col, row: z.row }));
    const target = map.expandGrid('bottom');
    expect(map.state.gridRows).toBe(rowsBefore + 1);
    for (const z of map.state.zones) {
      const before = snapshot.find((s) => s.id === z.id);
      expect(z.col).toBe(before.col);
      expect(z.row).toBe(before.row);
    }
    expect(target.row).toBe(map.state.gridRows);
    expect(target.col).toBe(Math.ceil(map.state.gridCols / 2));
  });

  test('right increments gridCols without shifting existing zones', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const colsBefore = map.state.gridCols;
    const snapshot = map.state.zones.map((z) => ({ id: z.id, col: z.col, row: z.row }));
    const target = map.expandGrid('right');
    expect(map.state.gridCols).toBe(colsBefore + 1);
    for (const z of map.state.zones) {
      const before = snapshot.find((s) => s.id === z.id);
      expect(z.col).toBe(before.col);
      expect(z.row).toBe(before.row);
    }
    expect(target.col).toBe(map.state.gridCols);
    expect(target.row).toBe(Math.ceil(map.state.gridRows / 2));
  });

  test('top shifts all zone rows by +1 and grows the grid', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const rowsBefore = map.state.gridRows;
    const snapshot = map.state.zones.map((z) => ({ id: z.id, row: z.row }));
    const target = map.expandGrid('top');
    expect(map.state.gridRows).toBe(rowsBefore + 1);
    for (const z of map.state.zones) {
      const before = snapshot.find((s) => s.id === z.id);
      expect(z.row).toBe(before.row + 1);
    }
    expect(target.row).toBe(1);
  });

  test('left shifts all zone cols by +1 and grows the grid', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const colsBefore = map.state.gridCols;
    const snapshot = map.state.zones.map((z) => ({ id: z.id, col: z.col }));
    const target = map.expandGrid('left');
    expect(map.state.gridCols).toBe(colsBefore + 1);
    for (const z of map.state.zones) {
      const before = snapshot.find((s) => s.id === z.id);
      expect(z.col).toBe(before.col + 1);
    }
    expect(target.col).toBe(1);
  });

  test('connections are preserved across an expansion', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const before = map.state.connections.map((c) => [...c]).sort();
    map.expandGrid('top');
    const after = map.state.connections.map((c) => [...c]).sort();
    expect(after).toEqual(before);
  });

  test('expandGrid sets pendingPlacementCell with direction; library add uses it then clears', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const target = map.expandGrid('top');
    expect(map.state.pendingPlacementCell).toEqual(target);
    expect(target.direction).toBe('top');

    const libraryZone = { name: 'Sky Bridge', description: '', shape: 'small', defaultPills: [] };
    const id = map.addZoneFromLibrary(libraryZone);
    const added = map.state.zones.find((z) => z.id === id);
    expect(added.row).toBe(target.row);
    expect(added.col).toBe(target.col);
    expect(map.state.pendingPlacementCell).toBeNull();
  });

  test('clearPendingPlacement wipes the cell (library dismissed without pick)', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    map.expandGrid('right');
    expect(map.state.pendingPlacementCell).not.toBeNull();
    map.clearPendingPlacement();
    expect(map.state.pendingPlacementCell).toBeNull();
  });

  test('without pending placement, library add falls back to first-empty-cell', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const libraryZone = { name: 'Somewhere', description: '', shape: 'small', defaultPills: [] };
    const id = map.addZoneFromLibrary(libraryZone);
    const added = map.state.zones.find((z) => z.id === id);
    // Urban template's 3x3 grid is fully populated in rows 1-3 after
    // templates.json load; so the first truly empty cell would be row 4
    // (or wherever the grid appends a new row).
    expect(added).toBeDefined();
    expect(added.row).toBeGreaterThanOrEqual(1);
  });

  test('pendingPlacementCell is not persisted to localStorage', async () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    map.expandGrid('top');
    await nextTick();
    const persisted = JSON.parse(localStorage.getItem(STORAGE_KEY));
    expect(persisted).not.toHaveProperty('pendingPlacementCell');
  });

  test('reload after edge-expand-without-pick collapses the orphan empty row', async () => {
    const map1 = useChaseMap();
    map1.startFromTemplate('urban_alleys');
    const rowsBefore = map1.state.gridRows;
    const rooftopsBefore = map1.state.zones.find((z) => z.id === 'rooftops').row;
    // User clicks top `+`, grid shifts, then reloads before picking
    // anything from the library.
    map1.expandGrid('top');
    expect(map1.state.gridRows).toBe(rowsBefore + 1);
    expect(map1.state.zones.find((z) => z.id === 'rooftops').row).toBe(rooftopsBefore + 1);
    await nextTick();

    // Simulate a page reload — rehydrate a fresh composable from storage.
    const map2 = useChaseMap();
    // The orphan empty row is trimmed; zone coords shift back to match.
    expect(map2.state.gridRows).toBe(rowsBefore);
    expect(map2.state.zones.find((z) => z.id === 'rooftops').row).toBe(rooftopsBefore);
  });

  test('reload after a bottom expand without pick trims the trailing empty row', async () => {
    const map1 = useChaseMap();
    map1.startFromTemplate('urban_alleys');
    const rowsBefore = map1.state.gridRows;
    map1.expandGrid('bottom');
    expect(map1.state.gridRows).toBe(rowsBefore + 1);
    await nextTick();

    const map2 = useChaseMap();
    expect(map2.state.gridRows).toBe(rowsBefore);
  });
});

describe('useChaseMap — setTokenZone', () => {
  beforeEach(() => localStorage.clear());

  test('sets zoneId directly without any adjacency check', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const token = map.state.tokens[0];
    const nonAdjacent = map.state.zones.find(
      (z) => z.id !== token.zoneId && !map.isAdjacent(token.zoneId, z.id)
    );
    if (!nonAdjacent) return;
    expect(map.setTokenZone(token.id, nonAdjacent.id)).toBe(true);
    expect(token.zoneId).toBe(nonAdjacent.id);
  });

  test('accepts null (sends to the tray)', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const token = map.state.tokens[0];
    expect(map.setTokenZone(token.id, null)).toBe(true);
    expect(token.zoneId).toBeNull();
  });

  test('rejects unknown zoneIds without mutating', () => {
    const map = useChaseMap();
    map.startFromTemplate('urban_alleys');
    const token = map.state.tokens[0];
    const original = token.zoneId;
    expect(map.setTokenZone(token.id, 'made-up-zone')).toBe(false);
    expect(token.zoneId).toBe(original);
  });
});

describe('useChaseMap — persistence', () => {
  beforeEach(() => localStorage.clear());

  test('active chase state round-trips', async () => {
    const map1 = useChaseMap();
    map1.startFromTemplate('wilderness_trails');
    await nextTick();
    await nextTick();
    const map2 = useChaseMap();
    expect(map2.state.hasActiveChase).toBe(true);
    expect(map2.state.mapName).toBe('Wilderness Trails');
  });

  test('stored state missing core arrays resets to empty', () => {
    // Shape check guards against structurally-broken payloads (old
    // pre-release schemas, partial writes). Any payload without zones/
    // tokens/connections arrays gets discarded.
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ hasActiveChase: true, zones: null, tokens: [], connections: [] })
    );
    const map = useChaseMap();
    expect(map.state.hasActiveChase).toBe(false);
  });

  test('stored state missing new fields fills defaults', async () => {
    // A payload written before environments/scenario existed should
    // still load — missing fields fill with defaults rather than
    // discarding the chase.
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        hasActiveChase: true,
        mapName: 'Old Chase',
        gridCols: 3,
        gridRows: 3,
        zones: [],
        tokens: [],
        connections: [],
        selectedTokenId: null,
      })
    );
    const map = useChaseMap();
    expect(map.state.hasActiveChase).toBe(true);
    expect(Array.isArray(map.state.environments)).toBe(true);
    expect(map.state.scenario).toBe('');
  });

  test('malformed JSON resets to empty', () => {
    localStorage.setItem(STORAGE_KEY, '{not valid json');
    const map = useChaseMap();
    expect(map.state.hasActiveChase).toBe(false);
  });
});

describe('useChaseMap — misc', () => {
  beforeEach(() => localStorage.clear());

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
