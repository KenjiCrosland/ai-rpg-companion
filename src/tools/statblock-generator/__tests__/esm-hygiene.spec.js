/**
 * Browser modules must be pure ESM. Jest transpiles to CommonJS, so a stray
 * require() passes every test and then throws "require is not defined" on
 * the first live generation — which is exactly what happened when the spell
 * policy shipped. This is the only test that can catch that class.
 */
const fs = require('fs');
const path = require('path');
const glob = (dir) => fs.readdirSync(dir, { withFileTypes: true })
  .flatMap((e) => (e.isDirectory() && e.name !== '__tests__'
    ? glob(path.join(dir, e.name))
    : e.name.endsWith('.mjs') ? [path.join(dir, e.name)] : []));

test('no browser module uses require()', () => {
  const roots = [
    path.join(__dirname, '../skeleton'),
    path.join(__dirname, '../format-2024'),
    path.join(__dirname, '../chassis'),
    path.join(__dirname, '../../../util'),
  ];
  const offenders = [];
  let scanned = 0;
  for (const root of roots) {
    if (!fs.existsSync(root)) continue;
    for (const f of glob(root)) {
      scanned += 1;
      const src = fs.readFileSync(f, 'utf8');
      const m = src.match(/^[^\n*/]*\brequire\(/m);
      if (m) offenders.push(`${path.relative(process.cwd(), f)}: ${m[0].trim().slice(0, 60)}`);
    }
  }
  // A guard that scans nothing passes forever — the first version of this
  // test did exactly that (wrong path arithmetic).
  expect(scanned).toBeGreaterThan(20);
  expect(offenders).toEqual([]);
});
