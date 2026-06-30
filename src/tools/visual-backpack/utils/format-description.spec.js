import { parseDescription, parseInline } from './format-description.mjs';

describe('parseInline — emphasis spans', () => {
  it('splits the three emphasis levels and plain runs', () => {
    expect(parseInline('***Spell Absorption.*** While holding')).toEqual([
      { text: 'Spell Absorption.', bold: true, italic: true },
      { text: ' While holding' },
    ]);
    expect(parseInline('a **bold** and *italic* end')).toEqual([
      { text: 'a ' },
      { text: 'bold', bold: true },
      { text: ' and ' },
      { text: 'italic', italic: true },
      { text: ' end' },
    ]);
  });

  it('returns a single plain span when there is no markup', () => {
    expect(parseInline('just text')).toEqual([{ text: 'just text' }]);
    expect(parseInline('')).toEqual([]);
  });
});

describe('parseDescription — blocks', () => {
  it('separates paragraphs', () => {
    const blocks = parseDescription('First para.\n\nSecond para.');
    expect(blocks).toEqual([
      { type: 'p', text: 'First para.' },
      { type: 'p', text: 'Second para.' },
    ]);
  });

  it('regroups blank-line-separated pipe rows into one table (header + body, separator dropped)', () => {
    // SRD joins source lines with blank lines, so each row is its own block.
    const md = [
      'Some intro.',
      '| Distance | Damage |',
      '|---|---|',
      '| 10 ft. or closer | 8 × charges |',
      '| 11 to 20 ft. | 6 × charges |',
    ].join('\n\n');
    const blocks = parseDescription(md);
    expect(blocks[0]).toEqual({ type: 'p', text: 'Some intro.' });
    expect(blocks[1]).toEqual({
      type: 'table',
      headers: ['Distance', 'Damage'],
      rows: [
        ['10 ft. or closer', '8 × charges'],
        ['11 to 20 ft.', '6 × charges'],
      ],
    });
  });

  it('parses body rows that omit the trailing pipe (SRD style)', () => {
    const md = ['| Face | Effect |', '|---|---|', '| 1 | Gases blocked'].join('\n\n');
    expect(parseDescription(md)).toEqual([
      { type: 'table', headers: ['Face', 'Effect'], rows: [['1', 'Gases blocked']] },
    ]);
  });

  it('splits two back-to-back tables (e.g. Cube of Force)', () => {
    const md = [
      '| Face | Charges |',
      '|---|---|',
      '| 1 | 1',
      '| Spell | Charges Lost |',
      '|---|---|',
      '| Disintegrate | 1d12',
    ].join('\n\n');
    const tables = parseDescription(md);
    expect(tables).toHaveLength(2);
    expect(tables[0]).toEqual({ type: 'table', headers: ['Face', 'Charges'], rows: [['1', '1']] });
    expect(tables[1]).toEqual({ type: 'table', headers: ['Spell', 'Charges Lost'], rows: [['Disintegrate', '1d12']] });
  });

  it('drops a table that has no body rows', () => {
    expect(parseDescription('| A | B |\n\n|---|---|')).toEqual([]);
  });

  it('groups consecutive bullet lines into one list (* or - markers)', () => {
    const md = 'Benefits:\n\n* You resist cold.\n\n* You ignore ice terrain.';
    expect(parseDescription(md)).toEqual([
      { type: 'p', text: 'Benefits:' },
      { type: 'list', items: ['You resist cold.', 'You ignore ice terrain.'] },
    ]);
  });
});
