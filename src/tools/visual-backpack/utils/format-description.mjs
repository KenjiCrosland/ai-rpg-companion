/**
 * format-description.mjs
 *
 * Tiny, dependency-free Markdown parser for SRD item descriptions — just the
 * subset that actually appears: paragraphs, inline emphasis (***bold-italic***,
 * **bold**, *italic*), bullet lists, and pipe tables. Output is structured data
 * rendered to real DOM elements (see RichText.vue), so there is NO innerHTML /
 * v-html and no XSS surface. Pure, no DOM.
 *
 * SRD quirks this handles:
 *  - Source lines are joined with blank lines, so table rows and bullets each
 *    arrive as separate blank-line-separated blocks — we regroup them.
 *  - Body rows often omit the trailing pipe (`| 1 | 1 | text`), so a row is
 *    detected by its LEADING pipe only.
 *  - Some items stack two tables back-to-back (e.g. Cube of Force); we split a
 *    run of rows into separate tables at each header/separator boundary.
 */

const SEP_CELL = /^:?-{2,}:?$/;
const isTableRow = (line) => /^\|/.test(line.trim());
const isBullet = (line) => /^[*-]\s+\S/.test(line.trim());

function splitCells(row) {
  return row
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((c) => c.trim());
}

function isSeparatorRow(cells) {
  return cells.length > 0 && cells.every((c) => SEP_CELL.test(c.replace(/\s/g, '')));
}

/** Split a run of pipe rows into one or more tables (header + separator + body). */
function buildTables(rows) {
  const tables = [];
  let k = 0;
  while (k < rows.length) {
    let headers = [];
    if (k + 1 < rows.length && isSeparatorRow(rows[k + 1])) {
      headers = rows[k]; // a header is the row directly before a separator
      k += 2;
    } else if (isSeparatorRow(rows[k])) {
      k += 1; // stray separator
      continue;
    }
    const body = [];
    while (k < rows.length) {
      if (k + 1 < rows.length && isSeparatorRow(rows[k + 1])) break; // next table begins
      if (!isSeparatorRow(rows[k])) body.push(rows[k]);
      k += 1;
    }
    if (body.length) tables.push({ type: 'table', headers, rows: body });
  }
  return tables;
}

/** Parse a description into ordered blocks: paragraph | list | table. */
export function parseDescription(text) {
  const raw = String(text || '')
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  const blocks = [];
  let i = 0;
  while (i < raw.length) {
    if (isTableRow(raw[i])) {
      const rows = [];
      while (i < raw.length && isTableRow(raw[i])) {
        rows.push(splitCells(raw[i]));
        i += 1;
      }
      blocks.push(...buildTables(rows));
    } else if (isBullet(raw[i])) {
      const items = [];
      while (i < raw.length && isBullet(raw[i])) {
        items.push(raw[i].trim().replace(/^[*-]\s+/, ''));
        i += 1;
      }
      blocks.push({ type: 'list', items });
    } else {
      blocks.push({ type: 'p', text: raw[i] });
      i += 1;
    }
  }
  return blocks;
}

/**
 * Split a string into emphasis spans: {text, bold?, italic?}. Markers can't span
 * other markers (`[^*]` inner) — enough for SRD copy, and never throws.
 */
export function parseInline(text) {
  const s = String(text || '');
  const re = /\*\*\*([^*]+?)\*\*\*|\*\*([^*]+?)\*\*|\*([^*]+?)\*/g;
  const out = [];
  let last = 0;
  let m;
  while ((m = re.exec(s)) !== null) {
    if (m.index > last) out.push({ text: s.slice(last, m.index) });
    if (m[1] != null) out.push({ text: m[1], bold: true, italic: true });
    else if (m[2] != null) out.push({ text: m[2], bold: true });
    else out.push({ text: m[3], italic: true });
    last = re.lastIndex;
  }
  if (last < s.length) out.push({ text: s.slice(last) });
  return out;
}
