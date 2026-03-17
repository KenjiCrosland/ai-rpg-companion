# Data Migration Guide

## Overview

This guide documents the reference-based architecture migration pattern used for statblocks and should be followed for any future migrations (e.g., NPCs, items, locations).

## The Problem

Previously, large objects (statblocks) were nested directly in parent objects (dungeons, NPCs), causing:
- **Data duplication**: Same statblock stored multiple times
- **No cross-tool updates**: Editing a statblock in one tool didn't update it elsewhere
- **Large localStorage**: Redundant data bloating storage

## The Solution: Reference-Based Architecture

Instead of storing full objects, store **references** (`name` + `folder`):

```javascript
// OLD (nested - bad)
{
  monster: {
    name: "Void Echo",
    statblock: { /* 2KB of data */ }
  }
}

// NEW (reference - good)
{
  monster: {
    name: "Void Echo",
    statblock_name: "Void Echo",      // Reference
    statblock_folder: "My Dungeon"    // Reference
  }
}

// Shared storage (single source of truth)
localStorage.monsters = {
  "My Dungeon": [
    { name: "Void Echo", /* 2KB of data */ }
  ]
}
```

## Critical Migration Gotchas

### 1. **ALWAYS Save References After Migration** ⚠️

**The Bug:**
```javascript
function loadData() {
  data.value = JSON.parse(localStorage.getItem('data'));
  migrateNestedObjects(data.value);  // Adds references in memory
  // BUG: Never saves! References lost on next load
}
```

**The Fix:**
```javascript
function loadData() {
  data.value = JSON.parse(localStorage.getItem('data'));

  let migrated = false;
  data.value.forEach(item => {
    if (migrateNestedObjects(item)) {
      migrated = true;
    }
  });

  // CRITICAL: Save after migration!
  if (migrated) {
    saveData();
  }
}
```

### 2. **Prefer References Over Nested Data on Load** ⚠️

**The Bug:**
```javascript
function resolveReferences(item) {
  // BUG: Only loads if NO nested data
  if (item.ref_name && !item.nested_object) {
    item.nested_object = getFromStorage(item.ref_name);
  }
  // Nested data shadows the reference!
}
```

**The Fix:**
```javascript
function resolveReferences(item) {
  // ALWAYS prefer reference if it exists
  if (item.ref_name) {
    delete item.nested_object;  // Remove stale nested data
    item.nested_object = getFromStorage(
      item.ref_name,
      item.ref_folder
    );
  }
  // else if (item.nested_object) → fallback for legacy data
}
```

### 3. **Keep Nested Data During Migration Period** ⚠️

For safety, keep BOTH nested data AND references in localStorage during migration:

```javascript
function prepareSave(data) {
  const clone = JSON.parse(JSON.stringify(data));

  // TEMPORARY: Comment out stripping for safety
  // Later, uncomment when confident:
  //
  // if (clone.items) {
  //   clone.items.forEach(item => {
  //     if (item.ref_name) {
  //       delete item.nested_object;  // Strip nested, keep reference
  //     }
  //   });
  // }

  return clone;
}
```

**When to remove:** After 2-4 weeks in production with no issues.

### 4. **Migration Should Run Only Once** ⚠️

**The Bug:**
```javascript
function migrate(item) {
  if (item.nested_object) {
    saveToSharedStorage(item.nested_object);  // Overwrites renames!
    item.ref_name = item.nested_object.name;
  }
}
```

Every load re-saves the old nested data, overwriting user's renames.

**The Fix:**
```javascript
function migrate(item) {
  // Check if already migrated
  if (item.nested_object && !item.ref_name) {
    saveToSharedStorage(item.nested_object);
    item.ref_name = item.nested_object.name;
    item.ref_folder = 'FolderName';
    return true;  // Signal migration occurred
  }
  return false;  // Already migrated
}
```

### 5. **Handle Renames Across All References** ⚠️

When user renames in the source tool, update all references:

```javascript
// In the editor (e.g., Statblock Generator)
function updateItem(updatedItem) {
  const oldName = items[index]?.name;
  const newName = updatedItem.name;

  // Save the updated item
  items[index] = updatedItem;
  localStorage.setItem('items', JSON.stringify(items));

  // Update all references across tools
  if (oldName && newName && oldName !== newName) {
    const result = renameReferences(oldName, newName);
    if (result.totalUpdated > 0) {
      toast.success(`Renamed and updated ${result.totalUpdated} references`);
    }
  }
}
```

```javascript
// Utility function
export function renameReferences(oldName, newName) {
  let updated = 0;

  // Update Tool A references
  const dataA = JSON.parse(localStorage.getItem('dataA') || '{}');
  for (const folder of Object.values(dataA)) {
    if (!Array.isArray(folder)) continue;
    for (const item of folder) {
      if (item.ref_name === oldName) {
        item.ref_name = newName;
        updated++;
      }
    }
  }
  if (updated > 0) {
    localStorage.setItem('dataA', JSON.stringify(dataA));
  }

  // Repeat for Tool B, Tool C, etc.

  return { totalUpdated: updated };
}
```

### 6. **Sync Across Browser Tabs** ⚠️

Listen for localStorage changes from other tabs:

```javascript
// In stores/main-store.mjs
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'myData' && e.newValue) {
      // Data updated in another tab, reload
      const store = useMyStore();
      store.loadData();
    }
  });
}
```

### 7. **Migration Detection Logic**

Migration should check for:
1. Nested object exists
2. Name exists on nested object
3. Reference does NOT exist yet

```javascript
if (item.nested_object &&
    item.nested_object.name &&
    !item.ref_name) {
  // Needs migration
}
```

## Complete Migration Checklist

When migrating any data type:

- [ ] Create shared storage utility (`util/thing-storage.mjs`)
  - [ ] `saveThingToStorage(thing, folderName)`
  - [ ] `getThingFromStorage(name, folder)`
  - [ ] `renameThingReferences(oldName, newName)`

- [ ] Add migration function
  - [ ] Checks if already migrated (`!item.ref_name`)
  - [ ] Saves nested object to shared storage
  - [ ] Adds `ref_name` and `ref_folder` fields
  - [ ] Returns true/false to indicate if migration ran

- [ ] Add resolve function
  - [ ] Prefers reference over nested (`if (ref_name)`)
  - [ ] Deletes nested in memory (`delete item.nested`)
  - [ ] Loads from shared storage
  - [ ] Falls back to nested for legacy data

- [ ] Update load function
  - [ ] Runs migration for each item
  - [ ] **Saves if any migrations occurred** (critical!)
  - [ ] Runs resolve to load fresh data

- [ ] Update save function
  - [ ] **Keep both nested AND reference** (temporary)
  - [ ] Comment out code to strip nested
  - [ ] Add TODO to remove later

- [ ] Add rename handling
  - [ ] Detect name changes in editor
  - [ ] Call `renameReferences()` on all tools
  - [ ] Show toast with count of updated references

- [ ] Add cross-tab sync
  - [ ] Listen for `storage` event
  - [ ] Reload data when changed in other tab

- [ ] Add debugging (commented out)
  - [ ] Log migration start/end
  - [ ] Log each item migrated
  - [ ] Log resolve operations
  - [ ] Log missing references
  - [ ] Easy to uncomment for troubleshooting

## Testing Migration

1. **Create test data with old schema** (nested objects)
2. **Load and verify migration runs**
   - Check localStorage has references added
   - Check shared storage has extracted objects
3. **Reload and verify migration doesn't run again**
   - Should log "No migration needed"
4. **Test rename in source tool**
   - Should show toast with reference count
   - References should update in all tools
5. **Test cross-tab sync**
   - Rename in Tab 1
   - Tab 2 should auto-update on localStorage change
6. **Test missing references** (delete from shared storage)
   - Should show "Not Found" warning
   - Should offer "Regenerate" and "Clear Reference" options

## Example: Statblock Migration (Reference Implementation)

See the statblock migration for a complete working example:

- **Shared storage**: `/src/util/statblock-storage.mjs`
- **Migration logic**: `/src/tools/dungeon-generator/stores/dungeon-utils.mjs`
  - `migrateDungeonStatblocks()` - lines 129-170
  - `resolveDungeonStatblocks()` - lines 65-127
  - `loadDungeons()` - lines 10-32
- **Rename handling**: `/src/tools/statblock-generator/StatblockGenerator.vue`
  - `updateMonster()` - lines 352-372
- **Cross-tab sync**:
  - `/src/tools/dungeon-generator/stores/dungeon-store.mjs` - lines 117-126
  - `/src/tools/npc-generator/NPCGenerator.vue` - lines 509-546

## Common Mistakes

❌ Forgetting to save after migration
❌ Checking `!item.nested` before loading reference
❌ Stripping nested data too early
❌ Not handling renames
❌ Re-running migration on every load
❌ No cross-tab sync
❌ No "Not Found" handling

## When to Use This Pattern

Use reference-based architecture when:
- ✅ Objects are large (>1KB)
- ✅ Objects are shared across multiple tools
- ✅ Users might edit the object in one place
- ✅ You want a single source of truth

Don't use for:
- ❌ Small objects (<100 bytes)
- ❌ Objects unique to one parent (not shared)
- ❌ Objects that never get edited

## Future Migrations

When migrating other data types (NPCs, items, locations), follow this same pattern. The data structures may differ but the principles remain the same.
