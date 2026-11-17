// ROWS PER SHEET AGAINST PRINT'S BAND — one instrument, no model (2026-11-17).
//
//   node --import ./scripts/alias-loader.mjs scripts/row-count.mjs <tape-or-run-dir> [more dirs...]
//
// Reads a recordings folder (each entry's `sheet`) or a smoke-out run (each `NN-name.json`) and
// prints, per sheet: its path, its CR, its rows with Multiattack and the legendary header left out,
// and the engine's own band for that CR. Then the sheets below the band's floor, and below print's
// median.
//
// WHY IT EXISTS. The thin-card count was being taken with percentiles kept outside the repo while
// the free-row budget used its own table inside `settleSheetBudgets`, so two instruments disagreed
// about how many sheets were below print. `PRINT_CARD_ROWS`, `PRINT_CARD_MEDIAN` and `cardBand` are
// now exported from the engine and read here, so the budget and the count are the same numbers.
import fs from 'node:fs';
import path from 'node:path';
import { PRINT_CARD_ROWS, PRINT_CARD_MEDIAN, cardBand, COUNTED_ROW } from '@/tools/statblock-generator/reskin/generate.mjs';

const dirs = process.argv.slice(2).filter((a) => !a.startsWith('--'));
if (!dirs.length) {
  console.error('usage: row-count.mjs <tape-or-run-dir> [more dirs...]');
  process.exit(1);
}

/**
 * Every row the band counts: the 2024 `sections` and every 2014 array.
 *
 * `legendary_actions` was missing from my first cut and the Adult Red Dragon counted 6 rows against
 * a band of 7-9, reading as BELOW print when its legendary actions are three of its rows. A count
 * that silently drops a section is how two instruments disagree, which is the thing this script
 * exists to stop.
 */
const rowsOf = (j) => [
  ...Object.values(j?.sections ?? {}).flat(),
  ...(j?.abilities ?? []), ...(j?.actions ?? []), ...(j?.bonus_actions ?? []),
  ...(j?.reactions ?? []), ...(j?.legendary_actions ?? []), ...(j?.lair_actions ?? []),
].filter((e) => e?.name).map((e) => String(e.name));

/** a recordings entry wraps the sheet; a smoke-out file IS the sheet */
const sheetOf = (j) => (j && typeof j === 'object' && j.sheet ? j.sheet : j);

const read = (dir) => fs.readdirSync(dir).filter((f) => /^\d+.*\.json$/.test(f)).sort().map((f) => {
  const j = sheetOf(JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
  // THE CR IS WRITTEN THREE WAYS. The 2024 shape has a numeric `cr`; the 2014 conversion has only
  // `challenge_rating` ("9 (5,000 XP)") and `selectedChallengeRating` ("9"). Reading `cr` alone left
  // 14 of 38 sheets as "(no CR)" and silently out of the count, which is exactly how two
  // instruments come to disagree. A fraction CR ("1/2") resolves too.
  const crFrom = (v) => {
    const t = String(v ?? '').trim();
    const frac = /^(\d+)\s*\/\s*(\d+)/.exec(t);
    if (frac) return Number(frac[1]) / Number(frac[2]);
    const n = /^-?\d+(?:\.\d+)?/.exec(t);
    return n ? Number(n[0]) : NaN;
  };
  const cr = [j?.cr, j?.cr_str, j?.selectedChallengeRating, j?.challenge_rating]
    .map(crFrom).find((x) => Number.isFinite(x)) ?? NaN;
  const band = cardBand(Number.isFinite(cr) ? cr : null);
  const rows = rowsOf(j).filter(COUNTED_ROW);
  return {
    file: f.replace(/\.json$/, ''),
    path: String(j?.generation?.pipeline?.path ?? j?.generation?.path ?? '?'),
    cr: Number.isFinite(cr) ? cr : null,
    rows: rows.length,
    band,
    floor: band ? PRINT_CARD_ROWS[band][0] : null,
    ceiling: band ? PRINT_CARD_ROWS[band][1] : null,
    median: band ? PRINT_CARD_MEDIAN[band] : null,
  };
});

for (const dir of dirs) {
  const all = read(dir);
  console.log(`\n=== ${dir} — ${all.length} sheet(s) ===`);
  console.log('sheet'.padEnd(30) + 'path'.padEnd(11) + 'CR'.padStart(4) + 'rows'.padStart(6) + '  band   print    verdict');
  for (const s of all) {
    // A PRINT-EXACT SHEET IS NOT JUDGED, because the engine does not judge it either: the free-row
    // budget is 0 on that path, and the card IS print's. The Owlbear reads "1 row" against a band of
    // 2-5 and is simply print's Owlbear.
    const v = s.path === 'exact' ? "print's own card — not judged"
      : s.band == null ? '(no CR)'
        : s.rows < s.floor ? 'BELOW the floor'
          : s.rows < s.median ? 'below the median'
            : s.rows > s.ceiling ? 'above the ceiling' : 'in band';
    console.log(s.file.padEnd(30) + s.path.slice(0, 10).padEnd(11) + String(s.cr ?? '—').padStart(4)
      + String(s.rows).padStart(6) + '  ' + String(s.band ?? '—').padEnd(7) + `${s.floor ?? '—'}-${s.ceiling ?? '—'}`.padEnd(9) + v);
  }
  const judged = all.filter((s) => s.path !== 'exact');
  // "INVENTED" IS THE `homebrew` PATH. A twist is a print body with a change, a class_npc is built
  // from a class, and neither is a creature the engine invented whole — that distinction is what
  // makes 15 the denominator rather than 22.
  const invented = all.filter((s) => s.path === 'homebrew');
  const under = (list) => list.filter((s) => s.path !== 'exact' && s.band != null && s.rows < s.floor);
  const underMed = (list) => list.filter((s) => s.path !== 'exact' && s.band != null && s.rows < s.median);
  console.log(`\n  below the band's floor: ${under(judged).length} of ${judged.length} judged sheet(s)${under(judged).length ? ` — ${under(judged).map((s) => `${s.file} (${s.rows} vs ${s.floor})`).join(', ')}` : ''}`);
  console.log(`  below print's median:   ${underMed(judged).length} of ${judged.length}`);
  console.log(`  of the ${invented.length} INVENTED creatures (path homebrew): ${under(invented).length} below the floor${under(invented).length ? ` — ${under(invented).map((s) => s.file).join(', ')}` : ''}`);
  console.log(`     below the median: ${underMed(invented).length}${underMed(invented).length ? ` — ${underMed(invented).map((s) => `${s.file} (${s.rows} vs ${s.median})`).join(', ')}` : ''}`);
  // AT the floor or AT the median is not below it. Printed because a one-sheet disagreement between
  // two counts was exactly this boundary (s14 glacier-heart, 5 rows against a floor of 5).
  const atFloor = invented.filter((s) => s.band != null && s.rows === s.floor);
  if (atFloor.length) console.log(`     exactly AT the floor (counted as in band): ${atFloor.map((s) => `${s.file} (${s.rows})`).join(', ')}`);
  console.log(`  not judged: ${all.length - judged.length} print-exact sheet(s)`);
}
