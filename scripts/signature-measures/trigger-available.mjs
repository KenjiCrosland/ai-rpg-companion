// WAS A TEMPLATE WITH THE IDEA'S OWN TRIGGER EVEN ON THE MENU?
// BAR 1 ("the shipped trait fires the way the idea said") conflates two causes:
//   (a) the menu was ordered badly  -> an ordering failure
//   (b) no template on the menu has that trigger at all -> a catalog gap, and a
//       mismatch is then unavoidable however the menu is sorted.
// This splits them. Reads the `signature idea (trait)` trace for the real menu.
import fs from 'node:fs'; import path from 'node:path';
import { TEMPLATE_BY_ID } from '@/tools/statblock-generator/reskin/templates.mjs';
let gap = 0, order = 0, ok = 0;
for (const D of process.argv.slice(2)) for (const f of fs.readdirSync(D).filter((x) => /^\d.*\.md$/.test(x)).sort()) {
  const t = fs.readFileSync(path.join(D, f), 'utf8');
  const idea = /signature idea \(trait\): ".*?"\s*\[trait\/(\w+)\/(\w+)\][^\n]*?menu: ([^(\n]*)(?:\(\+ shelf: ([^)\n]*)\))?/.exec(t);
  const fit = /signature template \(trait\): ([a-z-]+) ->/.exec(t);
  if (!idea || !fit) continue;
  const [, trig, eff, menuS, shelfS] = idea;
  const ids = [...menuS.split(','), ...(shelfS ?? '').split(',')].map((x) => x.trim()).filter(Boolean);
  const tmpls = ids.map((id) => TEMPLATE_BY_ID.get(id)).filter(Boolean);
  const shipped = TEMPLATE_BY_ID.get(fit[1]);
  const hasTrig = tmpls.filter((x) => x.trigger === trig);
  const hasBoth = tmpls.filter((x) => x.trigger === trig && x.effect === eff);
  const match = shipped?.trigger === trig;
  const verdict = match ? 'OK' : (hasTrig.length ? 'ORDERING: a same-trigger template WAS available' : 'CATALOG GAP: no template on the menu has this trigger');
  if (match) ok++; else if (hasTrig.length) order++; else gap++;
  console.log(`${f.slice(0, 2)} idea ${trig}/${eff} -> ${String(fit[1]).padEnd(17)}(${shipped?.trigger}/${shipped?.effect})  menu=${tmpls.length} sameTrigger=${hasTrig.length} both=${hasBoth.length}  ${verdict}`);
  if (!match && hasTrig.length) console.log(`     available with that trigger: ${hasTrig.map((x) => `${x.id} (${x.trigger}/${x.effect})`).join(', ')}`);
}
console.log(`\nfires as the idea said: ${ok}   ordering failures: ${order}   catalog gaps (unavoidable): ${gap}`);
