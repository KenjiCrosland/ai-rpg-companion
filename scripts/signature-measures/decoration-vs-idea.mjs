// For every row that shipped as DECORATION, show what the AI described next to
// the template that actually shipped — is the row the idea, or just the seat?
import fs from 'node:fs'; import path from 'node:path';
let n = 0;
for (const D of process.argv.slice(2)) for (const f of fs.readdirSync(D).filter((x) => /^\d.*\.md$/.test(x)).sort()) {
  const lines = fs.readFileSync(path.join(D, f), 'utf8').split('\n');
  const ideas = {};
  for (const l of lines) {
    const mi = /signature idea \((action|trait)\): "(.*)/.exec(l);
    if (mi) ideas[mi[1]] = mi[2].slice(0, 120);
    const mf = /free signature row: (action|trait|bonus_action|reaction) — "([a-z-]+)" is the call's nearest/.exec(l);
    if (mf && ideas[mf[1]]) {
      n += 1;
      console.log(`\n${f.slice(0, 2)} ${D.split('/')[1].slice(0, 12)} [${mf[1]}] shipped template: ${mf[2]}`);
      console.log(`   AI described: ${ideas[mf[1]]}…`);
    }
  }
}
console.log(`\n${n} decoration rows with a readable idea beside them.`);
