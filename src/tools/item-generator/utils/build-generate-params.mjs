/**
 * Build the content-free params for the item-generator `generate` event.
 *
 * Every field is logged as a used/unused boolean only — never its contents AND
 * never its chosen value. The closed-vocab dropdowns (rarity, type, origin) are
 * deliberately NOT logged by value: the actual property is noise; we only want
 * whether the user specified it. So the event measures pure form usage and is
 * trivially PII-safe.
 *
 * Snapshot the form values BEFORE `generateMagicItem` mutates them (it
 * random-fills an empty rarity), so `used_rarity: false` means the user
 * genuinely left it blank — not the random value that gets filled in.
 *
 * See analytics-phase0-findings.md §0b.
 *
 * @param {{itemName?:string, rarity?:string, itemType?:string, itemOrigin?:string, itemLore?:string}} formState
 * @returns {object} content-free GA event params — `tool` + used/unused booleans
 */
export function buildItemGenerateParams(formState = {}) {
  const { itemName, rarity, itemType, itemOrigin, itemLore } = formState;
  const used = (v) => Boolean(v && v.trim());

  return {
    tool: 'item-generator',
    used_name: used(itemName),
    used_lore: used(itemLore),
    used_rarity: used(rarity),
    used_item_type: used(itemType),
    used_origin: used(itemOrigin),
  };
}
