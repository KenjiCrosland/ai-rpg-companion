/**
 * The TEMPLATE BACKLOG — NOT part of the test suite (owner design 2026-09-21:
 * "log the miss, author from print"). Reads every smoke capture, collects the
 * `signature miss:` lines the template signature wrote, and ranks them by
 * seat and tag so the next authoring pass is the top of this list.
 *
 * Usage:  node scripts/smoke-misses.mjs [--runs <prefix,prefix>] [--all]
 *   default: the newest run of each batch; --all: every run on disk
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const all = args.includes('--all');
const runPrefixes = args.includes('--runs') ? args[args.indexOf('--runs') + 1].split(',') : null;

const dirs = fs.readdirSync('smoke-out').filter((d) => fs.statSync(path.join('smoke-out', d)).isDirectory());
const newest = new Map();
for (const d of dirs) {
  const batch = d.replace(/-\d{4}-\d{2}-\d{2}T.*$/, '');
  if (runPrefixes && !runPrefixes.some((p) => batch.startsWith(p))) continue;
  if (all || !newest.has(batch) || d > newest.get(batch)) newest.set(all ? d : batch, d);
}

const RE = /^\[reskin\] signature miss: (action|trait) — "(.*?)" \[([a-z_]+)\/([a-z_]+)\/([a-z_]+)\] — (.*)$/;
const hits = { template: 0, trait: 0 }; const seeds = { drawn: 0 }; const misses = [];
let blocks = 0;
for (const d of newest.values()) {
  for (const f of fs.readdirSync(path.join('smoke-out', d)).filter((x) => /^\d+-.*\.md$/.test(x))) {
    const md = fs.readFileSync(path.join('smoke-out', d, f), 'utf8');
    if (!/\[reskin\] signature idea/.test(md)) continue; // pre-template runs
    blocks += 1;
    hits.template += (md.match(/\[reskin\] signature template: /g) ?? []).length;
    hits.trait += (md.match(/\[reskin\] signature template \(trait\): /g) ?? []).length;
    seeds.drawn += (md.match(/\[reskin\] library seed drawn: /g) ?? []).length;
    for (const line of md.split('\n')) {
      const m = RE.exec(line);
      if (m) misses.push({ run: d, file: f, seat: m[1], idea: m[2], section: m[3], trigger: m[4], effect: m[5], why: m[6].replace(/\s+\(offered:.*$/, '') });
    }
  }
}

const byTag = new Map();
for (const m of misses) {
  const k = `${m.seat.padEnd(6)} ${m.section}/${m.trigger}/${m.effect}`;
  (byTag.get(k) ?? byTag.set(k, []).get(k)).push(m);
}
console.log(`${blocks} template-signature blocks in ${newest.size} run(s): action templates ${hits.template}, trait templates ${hits.trait}, seeds ${seeds.drawn}, misses ${misses.length} (${misses.filter((m) => m.seat === 'action').length} action / ${misses.filter((m) => m.seat === 'trait').length} trait)\n`);
console.log('MISSES BY TAG (most first) — each line is an idea a template could have held:\n');
for (const [k, list] of [...byTag.entries()].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`${String(list.length).padStart(3)}  ${k}`);
  for (const m of list) console.log(`       ${m.file.replace(/\.md$/, '').padEnd(34)} ${m.idea.slice(0, 120)}${m.idea.length > 120 ? '…' : ''}`);
  console.log('');
}
