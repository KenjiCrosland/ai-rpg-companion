import { translateStatblock, validateTranslationResponse } from '../../format-2024/generate.mjs';

const block = {
  name: 'Stone Golem', format: '2024', type: 'Construct', alignment: 'Unaligned', languages: "Understands Common but can't speak", senses: 'darkvision 120 ft.; Passive Perception 14',
  ac: 18, hp: 220, stats: { STR: 22, DEX: 9, CON: 20, INT: 3, WIS: 11, CHA: 1 },
  sections: { Traits: [{ name: 'Immutable Form', text: "The golem can't shape-shift." }], Actions: [{ name: 'Slam', text: '*Melee Attack Roll:* +10, reach 5 ft. 33 (6d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.' }], Reactions: [] },
};
const german = {
  header: { name: 'Steingolem', type: 'Konstrukt', alignment: 'Neutral', languages: 'Versteht Gemeinsprache, kann aber nicht sprechen', senses: 'Dunkelsicht 120 ft.; Passive Wahrnehmung 14' },
  sections: { Traits: [{ name: 'Unveränderliche Gestalt', text: 'Der Golem kann seine Gestalt nicht wandeln.' }], Actions: [{ name: 'Hieb', text: '*Nahkampfangriffswurf:* +10, Reichweite 5 ft. 33 (6d8 + 6) Wuchtschaden plus 9 (2d8) Energieschaden.' }] },
};

describe('the translation pass (owner 2026-10-01): one extra call, numbers held, per-row fallback', () => {
  test('a well-formed answer translates prose, names and header strings; the English block rides along; labels key by code', async () => {
    const out = await translateStatblock(block, 'German', async (prompt, validate) => { expect(validate(JSON.stringify(german))).toBe(true); expect(prompt).toMatch(/German/); return JSON.stringify(german); });
    expect(out.name).toBe('Steingolem'); expect(out.sections.Actions[0].name).toBe('Hieb'); expect(out.sections.Actions[0].text).toMatch(/Wuchtschaden/);
    expect(out.language).toBe('de'); expect(out.english.name).toBe('Stone Golem'); expect(out.english.sections.Actions[0].name).toBe('Slam');
    expect(out.ac).toBe(18); expect(out.stats.STR).toBe(22);
  });
  test('a row whose numbers moved keeps its English; the rest still translates', async () => {
    const bad = JSON.parse(JSON.stringify(german)); bad.sections.Actions[0].text = '*Nahkampfangriffswurf:* +10, Reichweite 5 ft. 33 (6d8 + 6) Wuchtschaden plus 9 (3d8) Energieschaden.';
    const out = await translateStatblock(block, 'German', async () => JSON.stringify(bad));
    expect(out.sections.Actions[0].name).toBe('Slam'); expect(out.sections.Actions[0].text).toMatch(/Bludgeoning/);
    expect(out.sections.Traits[0].name).toBe('Unveränderliche Gestalt');
    expect(out._translationNotes).toMatch(/Slam/);
  });
  test('number words may become digits: "three attacks" -> "3回" keeps the row; a dropped number does not', async () => {
    const b2 = { ...block, sections: { ...block.sections, Actions: [{ name: 'Multiattack', text: 'The golem makes three attacks, using Slam or Force Bolt in any combination.' }, { name: 'Slam', text: '*Melee Attack Roll:* +10, reach 5 ft. 33 (6d8 + 6) Bludgeoning damage.' }] } };
    const ja = { header: { name: 'ストーン・ゴーレム' }, sections: { Traits: [{ name: '不変の姿', text: 'ゴーレムは姿を変えられない。' }], Actions: [{ name: 'マルチアタック', text: 'ゴーレムはスラムまたはフォース・ボルトを任意に組み合わせて3回の攻撃を行う。' }, { name: 'スラム', text: '*近接攻撃ロール：* +10、間合い 5フィート。33 (6d8 + 6) 殴打ダメージ。' }] } };
    const out = await translateStatblock(b2, 'Japanese', async () => JSON.stringify(ja));
    expect(out.sections.Actions[0].name).toBe('マルチアタック'); expect(out.sections.Actions[1].text).toMatch(/フィート/); expect(out.language).toBe('ja');
    const lazy = JSON.parse(JSON.stringify(ja)); lazy.sections.Actions[0].name = 'Multiattack';
    expect((await translateStatblock(b2, 'Japanese', async () => JSON.stringify(lazy))).sections.Actions[0].name).toBe('マルチアタック'); // the table backstops the one fixed name the model keeps
    const dropped = JSON.parse(JSON.stringify(ja)); dropped.sections.Actions[1].text = '*近接攻撃ロール：* +10、間合い 5フィート。33 (6d8) 殴打ダメージ。';
    const out2 = await translateStatblock(b2, 'Japanese', async () => JSON.stringify(dropped));
    expect(out2.sections.Actions[1].name).toBe('Slam'); expect(out2.sections.Actions[0].name).toBe('マルチアタック');
  });
  test('a distance that came back in metres still counts (German prints 1,5 m for 5 ft.); a changed die still falls back', async () => {
    const b3 = { ...block, senses: 'darkvision 60 ft.; Passive Perception 15', sections: { Traits: [], Actions: [
      { name: 'Thrown Blade', text: '*Ranged Attack Roll:* +6, range 30/90 ft. 7 (1d8 + 3) Slashing damage.' },
      { name: 'Reaping Fan (Recharge 5-6)', text: 'It hurls a blade at a point within 90 feet. *Dexterity Saving Throw*: DC 13, each creature in a 5-foot-radius Sphere. *Failure:* 28 (8d6) Piercing damage.' },
    ] } };
    const de = { header: { name: 'Stahlzehnt', senses: 'Dunkelsicht 18 m; Passive Wahrnehmung 15' }, sections: { Actions: [
      { name: 'Geworfene Klinge', text: '*Fernkampfangriffswurf:* +6, Reichweite 9/27 m. 7 (1d8 + 3) Hiebschaden.' },
      { name: 'Schnitterfächer (Aufladung 5-6)', text: 'Er schleudert eine Klinge auf einen Punkt in 27 m Entfernung. *Geschicklichkeitsrettungswurf*: SG 13, jede Kreatur in einer Kugel mit 1,5 m Radius. *Misserfolg:* 28 (8d6) Stichschaden.' },
    ] } };
    const out = await translateStatblock(b3, 'German', async () => JSON.stringify(de));
    expect(out.sections.Actions.map((e) => e.name)).toEqual(['Geworfene Klinge', 'Schnitterfächer (Aufladung 5-6)']);
    expect(out.senses).toMatch(/Dunkelsicht/);
    const changed = JSON.parse(JSON.stringify(de)); changed.sections.Actions[1].text = changed.sections.Actions[1].text.replace('28 (8d6)', '35 (10d6)');
    const out2 = await translateStatblock(b3, 'German', async () => JSON.stringify(changed));
    expect(out2.sections.Actions[1].name).toBe('Reaping Fan (Recharge 5-6)'); expect(out2.sections.Actions[0].name).toBe('Geworfene Klinge');
  });
  test('the validator refuses a wrong shape: a missing section, an empty text, non-JSON', () => {
    expect(validateTranslationResponse(JSON.stringify(german), block)).toBe(true);
    const noTraits = JSON.parse(JSON.stringify(german)); delete noTraits.sections.Traits; expect(validateTranslationResponse(JSON.stringify(noTraits), block)).toBe(false);
    const empty = JSON.parse(JSON.stringify(german)); empty.sections.Actions[0].text = ' '; expect(validateTranslationResponse(JSON.stringify(empty), block)).toBe(false);
    expect(validateTranslationResponse('not json', block)).toBe(false);
  });
  test('an unknown language still translates the prose; the label code falls back to the first two letters', async () => {
    const out = await translateStatblock(block, 'Klingon', async () => JSON.stringify(german));
    expect(out.language).toBe('kl'); expect(out.language_name).toBe('Klingon');
  });
});
