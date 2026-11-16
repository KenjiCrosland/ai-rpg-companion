// "A REACTION MASQUERADING AS A BONUS ACTION" (owner's read of the H7 twelve, 2026-11-11: the marsh
// swallower and the dune maw). `own-turn-punisher` / "Answering Sting" read: *one creature within 5
// feet that hit the creature with an attack roll since the end of the creature's last turn takes
// {burst} damage* — a reaction's trigger at a bonus action's price, and a fact the table must carry
// every round. Print has no such shape, as a bonus action or a reaction.
//
// It was also the most-dealt row in the engine — 17 of 31 library draws since 2026-11-10 — because
// it was the ONLY blind-dealable bonus-action seed a brute could be dealt. That is what this spec
// pins: not just that the seed is gone, but that the deck slot it monopolised is EMPTY, so a brute
// whose action slot is full ships no bonus action rather than this one.
import { LIBRARY_SEEDS } from '@/tools/statblock-generator/reskin/library.mjs';
import { TEMPLATES, blindDealable, templatesFor } from '@/tools/statblock-generator/reskin/templates.mjs';
import CORPUS from '@/data/srd52-monsters.json';

describe('the own-turn retaliation seed is retired', () => {
  test('it is off the shelf and out of the catalog', () => {
    expect(LIBRARY_SEEDS.find((s) => s.key === 'own-turn-punisher')?.retired).toBe(true);
    expect(TEMPLATES.find((t) => t.id === 'own-turn-punisher' || t.key === 'own-turn-punisher')).toBeUndefined();
  });

  // THE MEASUREMENT THAT CONDEMNED IT, stated exactly. Print never retaliates against "whoever hit
  // me since my last turn" — 0 of 329 blocks, in any section. It does punish a hit: the Black
  // Pudding's Corrosive Form damages a creature that hits it, as a PASSIVE trait resolving at the
  // moment of the hit, with nothing for the table to remember. The retired seed's defect is the
  // deferred trigger, not the retaliation.
  test('print carries no row that retaliates on "hit me since my last turn"', () => {
    const hits = [];
    for (const m of CORPUS) {
      for (const [sec, rows] of Object.entries(m.sections ?? {})) {
        for (const e of rows ?? []) {
          if (/that hit [^.]{0,60}since[^.]{0,40}last turn/i.test(e.text ?? '')) hits.push(`${m.name}/${sec}/${e.name}`);
        }
      }
    }
    expect(hits).toEqual([]);
  });

  // and the shape print DOES use stays available, so this spec cannot be read as "no retaliation"
  test('print does punish a hit — at the moment of the hit, with nothing to remember', () => {
    const immediate = CORPUS.flatMap((m) => Object.entries(m.sections ?? {}).flatMap(([sec, rows]) => (rows ?? [])
      .filter((e) => /(?:that hit|hits? (?:it|the \w+))[^.]{0,80}takes \d+/i.test(e.text ?? '') && !/last turn/i.test(e.text ?? ''))
      .map((e) => `${m.name}/${sec}/${e.name}`)));
    expect(immediate).toContain('Black Pudding/Traits/Corrosive Form');
  });

  // THE DECK SLOT STAYS EMPTY. If a bonus-action seed is ever made blind-dealable to a brute again,
  // it inherits this one's every-time deal — so that is a decision to make deliberately, with print
  // behind it, not something to re-acquire by adding a seed.
  test('a brute can be blind-dealt no bonus-action seed at all', () => {
    const dealable = TEMPLATES.filter((t) => t.kind === 'seed' && t.section === 'bonus_action' && blindDealable(t, 'brute'));
    expect(dealable.map((t) => t.id)).toEqual([]);
  });
});

// RETALIATION ITSELF IS NOT THE DEFECT — THE BONUS ACTION WAS (owner, 2026-11-11: "I like
// retaliation if it's in the right place… it should be a reaction, not a bonus action"). So the
// fiction the retired seed carried has a home: `answering-strike`, riposte's sibling. Riposte
// answers a MISS with a blade (a duelist's opening); this answers a HIT with the creature's own
// melee row — the thing a crocodile, an ooze or a troll does — which is why `brute` is on this one.
describe('the body answers a blow as a reaction', () => {
  const t = () => TEMPLATES.find((x) => x.id === 'answering-strike');
  const bite = { name: 'Bite', text: '*Melee Attack Roll:* +6, reach 5 ft. 12 (2d8 + 3) Piercing damage.' };
  const offered = (sections, archetype = 'brute') => templatesFor({
    archetype, cr: 6, movement: '30 ft.', type: 'Monstrosity', size: 'Large',
    sections: { Actions: [bite], ...sections }, section: 'reaction', trigger: null,
    concept: 'a bog hound that strikes back at whoever hits it',
  }).map((x) => x.id);

  test('it is a reaction, triggered by the hit itself — nothing for the table to remember', () => {
    expect(t().section).toBe('reaction');
    expect(t().trigger).toBe('on_being_hit');
    expect(Object.values(t().frames ?? {})[0]).toMatch(/\*Trigger:\* A creature within 5 feet of the creature hits it with a melee attack roll/);
  });

  test('a brute can be offered it — the archetype the retired seed served', () => {
    expect(offered({})).toContain('answering-strike');
    expect(t().roles).toContain('brute');
  });

  // THE LESSON OF THE ROW IT REPLACES. The seed landed on 17 of 31 library draws without anyone
  // choosing it, because it was the only card a brute could be DEALT. This one must be PICKED.
  test('it is not blind-dealable to anyone', () => {
    for (const role of ['brute', 'defender', 'lurker', 'skirmisher', 'caster', 'artillery', 'controller']) {
      expect(blindDealable(t(), role)).toBe(false);
    }
  });

  test('a sheet is never offered two answers to a blow', () => {
    const punisher = { name: 'Lacquered Answer', family: 'punisher', text: 'When a creature hits it, it answers.' };
    const searing = { name: 'Searing Hide', text: 'A creature that touches the creature or hits it with a melee attack while within 5 feet of it takes 7 (2d6) Fire damage.' };
    expect(offered({ Reactions: [punisher] })).not.toContain('answering-strike');
    expect(offered({ Traits: [searing] })).not.toContain('answering-strike'); // Heated Body IS this fiction, as print's trait
  });

  test('a creature with no melee row cannot strike back', () => {
    const caster = templatesFor({
      archetype: 'brute', cr: 6, movement: '30 ft.', type: 'Monstrosity', size: 'Large',
      sections: { Actions: [{ name: 'Mind Lash', text: '*Wisdom Saving Throw:* DC 14, one creature within 60 feet.' }] },
      section: 'reaction', trigger: null, concept: 'a thing that strikes back',
    }).map((x) => x.id);
    expect(caster).not.toContain('answering-strike');
  });
});

// THE WRITER GETS THE FACTS THE CATALOG GATES ON (owner, 2026-11-11: "please make the fix").
// `templatesFor` withholds a reaching pull from a body that grips, and a second row of a family the
// sheet already carries. The AUTHORING call picks from no menu, so neither gate reaches it — and
// three sheets in one day shipped the row the catalog would have refused. The same declared facts
// now go to it as sentences: the route call's own hold-shape enum, and each row's declared family.
describe('the authoring call is told what the body is', () => {
  const { declaredBodyFacts } = require('@/tools/statblock-generator/reskin/templates.mjs');
  const { buildSeatPrompt, buildRepairPrompt, buildFreeRowFixPrompt } = require('@/tools/statblock-generator/reskin/author.mjs');
  const searing = { name: 'Searing Hide', template: 'heated-body', text: 'A creature that touches it or hits it with a melee attack while within 5 feet of it takes 7 (2d6) Fire damage.' };
  const bite = { name: 'Bite', imposes: ['Grappled'], text: '*Melee Attack Roll:* +6, reach 5 ft. 12 (2d8 + 3) Piercing damage.' };

  test('a gripping body is told it cannot pull at range', () => {
    expect(declaredBodyFacts({ sections: { Actions: [bite] }, holdShape: 'grip' }).join(' ')).toMatch(/HOLDS BY GRIP/);
  });

  // `medium` commands mud or water and SHOULD pull at range — that is what the shape means; and
  // whether a thing that swallows the road may open a sinkhole is the owner's call, not a defect
  test('a reaching, containing or medium body is told nothing about pulling', () => {
    for (const shape of ['reach', 'contain', 'medium', null, undefined]) {
      expect(declaredBodyFacts({ sections: { Actions: [bite] }, holdShape: shape }).join(' ')).not.toMatch(/GRIP/);
    }
  });

  test('a row\'s declared family becomes a fact, naming the row that carries it', () => {
    const facts = declaredBodyFacts({ sections: { Traits: [searing] } }).join(' ');
    expect(facts).toMatch(/ALREADY DAMAGES WHOEVER TOUCHES IT/);
    expect(facts).toMatch(/"Searing Hide"/);
  });

  test('it reads the family through the template id, as the cap does', () => {
    expect(declaredBodyFacts({ sections: { Reactions: [{ name: 'Riposte', template: 'riposte', text: 'x' }] } }).join(' ')).toMatch(/ANSWERS A CREATURE THAT HITS OR MISSES IT.*"Riposte"/);
  });

  test('all three authoring prompts carry them, and say nothing when there are none', () => {
    const facts = declaredBodyFacts({ sections: { Traits: [searing] }, holdShape: 'grip' });
    const built = [
      buildSeatPrompt({ name: 'X', inline: 'Large Beast', cr: 5, sheet: 'S', idea: 'i', kind: 'a reaction', bodyFacts: facts }),
      buildRepairPrompt({ name: 'X', inline: 'Large Beast', clauses: [{ text: 'c' }], cr: 5, sheet: 'S', bodyFacts: facts }),
      buildFreeRowFixPrompt({ name: 'X', inline: 'Large Beast', cr: 5, sheet: 'S', row: { name: 'R', text: 't' }, bodyFacts: facts }),
    ];
    for (const p of built) { expect(p).toMatch(/WHAT THIS BODY IS/); expect(p).toMatch(/HOLDS BY GRIP/); }
    expect(buildSeatPrompt({ name: 'X', inline: 'y', cr: 5, sheet: 'S', idea: 'i' })).not.toMatch(/WHAT THIS BODY IS/);
  });
});
