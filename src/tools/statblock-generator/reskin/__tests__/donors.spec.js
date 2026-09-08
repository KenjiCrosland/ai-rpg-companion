/**
 * The donor chassis are held to the same laws as everything else — the
 * card's summed budget and the sprint's measured print shapes. The math is
 * enforced here, not trusted at authoring time.
 */
import { DONORS } from '../donors.mjs';
import { cardBudget, withinBudget } from '../card-budgets.mjs';

const avgOf = (text) => [...text.matchAll(/(\d+) \(\d+d\d+(?:\s*\+\s*\d+)?\)/g)].reduce((n, m) => n + Number(m[1]), 0);

describe('every template declares its provenance: cited XOR invented', () => {
  test('the catalog discipline applies to whole templates too', () => {
    for (const d of DONORS) {
      expect(`${d.id}: ${Boolean(d.cite) !== Boolean(d.invented) ? 'ok' : 'BAD PROVENANCE'}`).toBe(`${d.id}: ok`);
    }
  });
});

describe('authored donors obey the card', () => {
  for (const d of DONORS) {
    describe(d.id, () => {
      const rows = Object.entries(d.sections).flatMap(([sec, es]) => es.map((e) => ({ sec, ...e })));
      const card = cardBudget(d.cr, { legendary: !!d.legendary });

      test('AC, HP, attack, DC sit on the card line (±1 where the card rounds)', () => {
        // ac_offset = the brute sweep's measured discount (armor traded for meat)
        expect(Math.abs(d.ac - card.ac - (d.ac_offset ?? 0))).toBeLessThanOrEqual(1);
        expect(Math.abs(d.hp - card.hp * (d.hp_scale ?? 1))).toBeLessThanOrEqual(15); // hp_scale = the measured flight tax (flyers 0.98 vs grounded 1.08) or the brute meat premium (1.1)
        expect(d.atk).toBe(card.atk);
        expect(Math.abs(d.dc - card.dc)).toBeLessThanOrEqual(1);
      });

      test('the summed damage budget lands in band', () => {
        // no Multiattack = the print low-CR brute shape (Ogre, Rhino): one hit
        const ma = rows.find((r) => r.name === 'Multiattack');
        const attacks = ma ? Number(/makes (\w+)/.exec(ma.text)[1]
          .replace('two', 2).replace('three', 3).replace('four', 4)) : 1;
        // the card's fight model prices HIGHEST-damage options: casters
        // swing the hybrid row (their only row), the defender's hybrid
        // javelin is a sidearm beside a bigger longsword (2026-09-08)
        const primary = ['Hybrid Attack', 'Melee Attack']
          .map((n) => rows.find((r) => r.name === n)).filter(Boolean)
          .sort((a, b) => avgOf(b.text) - avgOf(a.text))[0];
        const perHit = avgOf(primary.text);
        let sustained = attacks * perHit;
        for (const r of rows.filter((x) => x.sec === 'Legendary Actions' && !x.rules)) {
          if (/one (?:Melee Attack|Hybrid Attack)/.test(r.text)) sustained += perHit;
          if (/makes one Ranged Attack/.test(r.text)) sustained += avgOf(rows.find((x) => x.name === 'Ranged Attack').text);
        }
        const novas = rows.filter((r) => r.gate).map((r) => ({ avg: avgOf(r.text), gate: r.gate }));
        const { ok, target, actual } = withinBudget(d.cr, sustained, novas, { legendary: !!d.legendary, dprScale: d.dpr_scale ?? 1 });
        expect(`${d.id}: ${actual} vs ${target} -> ${ok ? 'in band' : 'OUT OF BAND'}`)
          .toBe(`${d.id}: ${actual} vs ${target} -> in band`);
      });

      test('print shapes: melee floor, one Recharge, unique names, a wildcard slot', () => {
        if (d.cr >= 5) expect(rows.some((r) => /Melee (?:or Ranged )?Attack Roll/.test(r.text))).toBe(true);
        expect(rows.filter((r) => /Recharge/.test(r.gate ?? '')).length).toBeLessThanOrEqual(1);
        const names = rows.map((r) => r.name);
        expect(new Set(names).size).toBe(names.length);
        expect(rows.filter((r) => r.wildcard_slot).length).toBe(1);
      });

      if (d.archetypes.includes('skirmisher')) {
        test('skirmisher shape: the exit bonus action is the identity', () => {
          expect(rows.some((r) => r.sec === 'Bonus Actions' && /Dash, Disengage, or Hide/.test(r.text))).toBe(true);
        });
      }

      if (d.archetypes.includes('brute')) {
        test('brute shape (sweep 2026-08-26): no escape suite, no reactions, <=2 same-row attacks, lean traits', () => {
          expect(rows.some((r) => /Dash, Disengage, or Hide/.test(r.text))).toBe(false);
          expect(rows.some((r) => r.sec === 'Reactions')).toBe(false); // 0/40 print brutes have reactions
          // print's brute multiattack: SAME-ROW when the block is melee-only
          // (Dragon Turtle three bites), the OR-FORM when a ranged twin
          // exists — every print giant with a throw does this (Hill/Frost/
          // Stone/Fire Giant, Iron Golem), 2026-08-27
          const ma = rows.find((r) => r.name === 'Multiattack');
          const hasRanged = rows.some((r) => /Ranged Attack Roll/.test(r.text));
          if (ma && hasRanged) expect(ma.text).toMatch(/using Melee Attack or Ranged Attack in any combination/);
          else if (ma) expect(ma.text).toMatch(/makes (?:two|three) Melee Attack attacks/);
          expect(rows.filter((r) => r.sec === 'Traits' && !r.rules).length).toBeLessThanOrEqual(1); // half of print brutes have ZERO traits
          expect(d.ac_offset).toBeLessThanOrEqual(0); // armor traded for meat; the discount shrinks to 0 at the golem/titan tier
          expect(d.hp_scale).toBeGreaterThan(1);
          // reach 10 is the giant/big-golem pattern (Hill Giant, Stone
          // Golem); print's chargers gore and grapplers bite at reach 5
          // (Gorgon, Croc), and the Flesh Golem slams at 5 (Medium)
          if ((d.cr >= 5 && !d.style) || (d.cr >= 9 && d.style === 'juggernaut')) {
            expect(rows.find((r) => r.name === 'Melee Attack').text).toMatch(/reach 10 ft/);
          }
        });
      }

      if (d.archetypes.includes('caster')) {
        test('caster shape (corpus sweep 2026-09-02): glass cannon, spell row aboard, mind-struck', () => {
          // the INVERSE trade from brute: AC under the card, HP 0.8-0.9x
          expect(d.ac_offset).toBeLessThanOrEqual(0);
          expect(d.hp_scale).toBeLessThan(1);
          expect(d.hp_scale).toBeGreaterThanOrEqual(0.75);
          // the Spellcasting row is CHASSIS (rules-true, template-fed) —
          // the checkbox organ must never double it
          const sc = rows.filter((r) => r.name === 'Spellcasting');
          expect(sc).toHaveLength(1);
          expect(sc[0].rules).toBe(true);
          expect(sc[0].text).toMatch(/\{spell_at_will\}/);
          // the plain (burst) line carries the family's signature hybrid row
          if (!d.style) expect(rows.some((r) => /Melee or Ranged Attack Roll/.test(r.text))).toBe(true);
          // casters keep their print reaction where authored (Mage's
          // Protective Magic shape) — the no-reaction law is brute's
          expect(rows.some((r) => r.sec === 'Reactions' && !/Trigger/.test(r.text))).toBe(false);
        });
      }

      if (d.archetypes.includes('lurker')) {
        test('lurker shape (corpus sweep 2026-09-04): under-card defenses, ambush grammar, conditioned hide', () => {
          // the family signature: defenses UNDER the card, paid by tech
          // (Incorporeal, disguise, attach) — except the trap line's
          // armored stillness (the Roper runs AC +4 at near-card HP)
          if (d.style !== 'trap') {
            expect(d.ac_offset).toBeLessThanOrEqual(-1);
            expect(d.hp_scale).toBeLessThanOrEqual(0.8);
          }
          // every lurker hides: Stealth on the sheet
          expect(d.skills).toMatch(/Stealth \+\d+/);
          // the phantom line: native hover flight, the incorporeal cost
          // clause, and the LIGHT BANE (the family's foil)
          if (d.style === 'phantom') {
            expect(d.speed).toMatch(/Fly \d+ ft\. \(hover\)/);
            expect(rows.some((r) => /takes 5 \(1d10\) Force damage if it ends its turn inside/.test(r.text))).toBe(true);
            expect(rows.some((r) => /[Ss]unlight/.test(r.name) || /[Ss]unlight/.test(r.text))).toBe(true);
            expect(d.hp_scale).toBeLessThan(0.9); // the deep-scale flight rule keys on this
            // print pairs the discount WITH the header suite (Specter/
            // Wraith/Ghost, 2026-09-05) — the immunities are chassis
            // data, never a wildcard's to grant
            expect(d.defense_suite.conditions).toEqual(expect.arrayContaining(['Grappled', 'Prone', 'Restrained']));
            expect(d.defense_suite.resist).toEqual(expect.arrayContaining(['Bludgeoning', 'Piercing', 'Slashing']));
          }
          // THE RIDER RE-SEATING (critic + corpus, 2026-09-04): the fiat
          // first-round rider is ONE print block's grammar (Doppelganger,
          // whose disguise is the state it prices) — it lives on lurker-2
          // alone. Traps carry the grappled-form (4 print sightings:
          // Mimic/Ankheg/Bugbear x2). The Assassin-shaped seats carry NO
          // advantage rider: hidden-attacker advantage is a core rule,
          // and their ambush economy is rider damage + the hide-cycle.
          if (d.id === 'lurker-2') {
            expect(rows.some((r) => /\(with Advantage during the first round of each combat\)/.test(r.text))).toBe(true);
          } else if (d.style === 'trap') {
            expect(rows.some((r) => /\(with Advantage if the target is Grappled/.test(r.text))).toBe(true);
          } else {
            expect(rows.some((r) => /\(with Advantage during the first round/.test(r.text))).toBe(false);
          }
          // the hide-cycle is CONDITIONED (Shadow Stealth's gate) — the
          // stalker line's bonus action, never the skirmisher's free suite
          if (!d.style) {
            expect(rows.some((r) => r.name === 'Umbral Step' && /While in Dim Light or Darkness/.test(r.text))).toBe(true);
          }
          expect(rows.some((r) => /Dash, Disengage, or Hide/.test(r.text))).toBe(false); // the skirmisher suite stays out
        });
      }

      if (d.archetypes.includes('defender')) {
        test('defender shape (corpus sweep 2026-09-08): armor over the card, the ward tax, no reactions — Parry is retired', () => {
          // the family signature: AC OVER the card (Knight 18 at CR 3,
          // Guard Captain 18 at CR 4), paid by under-card HP and damage
          if (!d.style) {
            expect(d.ac_offset).toBeGreaterThanOrEqual(2);
            expect(d.hp_scale).toBeLessThan(1);
            // the leader half: the ally-buff emanation, gated on the
            // aura claim (Hobgoblin Captain's grammar)
            expect(rows.some((r) => r.gated_on === 'aura' && /Emanation originating from the creature/.test(r.text))).toBe(true);
          }
          // the warden line: the Bound transfer link (Shield Guardian's
          // passive — NOT a reaction) + the measured damage discount
          if (d.style === 'warden') {
            expect(rows.some((r) => r.rules && /half of any damage the ward takes \(round up\) is transferred to the creature/.test(r.text))).toBe(true);
            expect(d.dpr_scale).toBeLessThanOrEqual(0.8);
            expect(d.ac_offset).toBeLessThanOrEqual(1);
            expect(d.hp_scale).toBeGreaterThanOrEqual(1);
          }
          // SRD 5.2 retired the reaction-protector (Parry 0/329; the
          // 2026-09-02 pin's premise was 2014 memory) — no authored
          // Reactions anywhere in the family; answer-back lives in the
          // legendary menu
          expect(rows.some((r) => r.sec === 'Reactions')).toBe(false);
          expect(rows.some((r) => /Dash, Disengage, or Hide/.test(r.text))).toBe(false);
        });
      }

      if (d.legendary) {
        test('the legendary menu: 3 options, at least one unlocked, generic-skirmisher economy', () => {
          const legs = rows.filter((r) => r.sec === 'Legendary Actions' && !r.rules);
          expect(legs.length).toBe(3);
          expect(legs.some((r) => !/can't take this action again/.test(r.text))).toBe(true);
        });
      }
    });
  }
});

describe('the mounted template line: full compositions, shape-frames as authoring vocabulary', () => {
  const { pickDonor: pdm } = require('../scale.mjs');
  test('style-matched selection with plain fallback', () => {
    expect(pdm(8, 'mounted', 'skirmisher').id).toBe('skirmisher-8-mounted');
    expect(pdm(10, 'mounted', 'skirmisher').id).toBe('skirmisher-8-mounted');
    expect(pdm(22, 'mounted', 'skirmisher').id).toBe('skirmisher-18-mounted');
    expect(pdm(8, 'hurler', 'skirmisher').id).toBe('skirmisher-8-hurler');
    expect(pdm(8, 'skulker', 'skirmisher').id).toBe('skirmisher-8-skulker');
    expect(pdm(3, 'hurler', 'skirmisher').id).toBe('skirmisher-8-hurler'); // below the line's floor -> its lowest seat
    expect(pdm(8, 'winged', 'skirmisher').id).toBe('skirmisher-8-winged'); // the winged line landed 2026-08-19
    expect(pdm(20, 'winged', 'skirmisher').id).toBe('skirmisher-18-winged'); // legendary seat scales up
    expect(pdm(20, 'hurler', 'skirmisher').id).toBe('skirmisher-18-hurler'); // hurler legendary seat closes the 18+ gap
    expect(pdm(8, 'burrower', 'skirmisher').id).toBe('skirmisher-8'); // a style with no line still falls to plain
    expect(() => pdm(8, null)).toThrow(/explicit archetype/); // no silent default (owner, 2026-08-26)
    expect(pdm(8, null, 'skirmisher').id).toBe('skirmisher-8');
  });
  test('archetype pools never cross: a blank skirmisher roll can\'t draw an ogre', () => {
    expect(pdm(2, null, 'skirmisher').id).toBe('skirmisher-1');
    expect(pdm(5, null, 'skirmisher').id).toBe('skirmisher-3');
    expect(pdm(2, null, 'brute').id).toBe('brute-2');
    expect(pdm(6, null, 'brute').id).toBe('brute-5');
    expect(pdm(11, null, 'brute').id).toBe('brute-9');
    expect(pdm(2, 'charger', 'brute').id).toBe('brute-2-charger');
    expect(pdm(9, 'grappler', 'brute').id).toBe('brute-8-grappler');
    expect(pdm(7, 'juggernaut', 'brute').id).toBe('brute-5-juggernaut');
    expect(pdm(5, 'regenerator', 'brute').id).toBe('brute-5-regenerator');
    expect(pdm(8, 'skulker', 'brute').id).toBe('brute-5'); // no brute skulker line -> brute plain, never a skirmisher
    // the high-CR expansion seats (2026-08-27)
    expect(pdm(12, 'charger', 'brute').id).toBe('brute-11-charger');
    expect(pdm(16, 'grappler', 'brute').id).toBe('brute-15-grappler');
    expect(pdm(12, 'regenerator', 'brute').id).toBe('brute-10-regenerator');
    expect(pdm(18, null, 'brute').id).toBe('brute-17'); // the boss seat, legendary menu aboard
    expect(pdm(25, null, 'brute').id).toBe('brute-21');
    // the legendary style seats (owner, 2026-09-01: "a sub archetype for
    // every CR" — the skirmisher one-legendary-seat-per-line rule, applied
    // to brute after the Fused Monarchy drew brute-16-juggernaut at CR 21)
    expect(pdm(17, 'charger', 'brute').id).toBe('brute-17-charger');
    expect(pdm(21, 'juggernaut', 'brute').id).toBe('brute-17-juggernaut');
    expect(pdm(18, 'juggernaut', 'brute').id).toBe('brute-17-juggernaut'); // no longer the non-legendary 16 seat
    expect(pdm(16, 'juggernaut', 'brute').id).toBe('brute-16-juggernaut'); // below the boundary the line is unchanged
    expect(pdm(25, 'grappler', 'brute').id).toBe('brute-17-grappler');
    expect(pdm(20, 'regenerator', 'brute').id).toBe('brute-17-regenerator');
  });

  test('the brute engines are aboard: charge->prone->trample, grapple->swallow, regeneration off-switch', () => {
    const { DONORS: D } = require('../donors.mjs');
    const brutes = D.filter((d) => (d.archetypes ?? []).includes('brute'));
    expect(brutes.length).toBe(21);
    // the caster family (corpus sweep 2026-09-02): one chassis pool for
    // both the Artillery and Controller menu entries (style PRIORS)
    const casters = D.filter((d) => (d.archetypes ?? []).includes('caster'));
    expect(casters.length).toBe(8);
    expect(pdm(6, null, 'caster').id).toBe('caster-6');
    expect(pdm(3, null, 'caster').id).toBe('caster-6'); // below the floor -> lowest seat
    expect(pdm(15, null, 'caster').id).toBe('caster-12');
    expect(pdm(24, null, 'caster').id).toBe('caster-21'); // the Lich seat — a CITED legendary caster boss
    expect(pdm(5, 'warpriest', 'caster').id).toBe('caster-2-warpriest');
    expect(pdm(21, 'warpriest', 'caster').id).toBe('caster-21-warpriest');
    expect(pdm(10, 'binder', 'caster').id).toBe('caster-8-binder');
    expect(pdm(20, 'binder', 'caster').id).toBe('caster-17-binder');
    expect(pdm(8, 'skulker', 'caster').id).toBe('caster-6'); // no such line -> plain, never cross-family
    // the lurker family (corpus sweep 2026-09-04): plain = stalker,
    // 'phantom' and 'trap' style lines, invented 17 seats (no print
    // lurker above CR 8 — the defender-like ceiling, brute playbook)
    const lurkers = D.filter((d) => (d.archetypes ?? []).includes('lurker'));
    expect(lurkers.length).toBe(11);
    expect(pdm(2, null, 'lurker').id).toBe('lurker-2');
    expect(pdm(5, null, 'lurker').id).toBe('lurker-5'); // the mid seat (first smoke: lurker-2 was serving CR 3-6)
    expect(pdm(12, null, 'lurker').id).toBe('lurker-8');
    expect(pdm(20, null, 'lurker').id).toBe('lurker-17');
    expect(pdm(3, 'phantom', 'lurker').id).toBe('lurker-1-phantom');
    expect(pdm(9, 'phantom', 'lurker').id).toBe('lurker-5-phantom');
    expect(pdm(22, 'phantom', 'lurker').id).toBe('lurker-17-phantom');
    expect(pdm(4, 'trap', 'lurker').id).toBe('lurker-2-trap');
    expect(pdm(6, 'trap', 'lurker').id).toBe('lurker-5-trap');
    expect(pdm(10, 'trap', 'lurker').id).toBe('lurker-8-trap');
    expect(pdm(18, 'trap', 'lurker').id).toBe('lurker-17-trap');
    expect(pdm(8, 'skulker', 'lurker').id).toBe('lurker-8'); // no cross-family style bleed
    // the defender family (corpus sweep 2026-09-08): plain = soldier
    // (Knight/Guard Captain), 'warden' (Shield Guardian), invented 17s
    const defenders = D.filter((d) => (d.archetypes ?? []).includes('defender'));
    expect(defenders.length).toBe(7);
    expect(pdm(1, null, 'defender').id).toBe('defender-1');
    expect(pdm(4, null, 'defender').id).toBe('defender-3');
    expect(pdm(9, null, 'defender').id).toBe('defender-5');
    expect(pdm(20, null, 'defender').id).toBe('defender-17');
    expect(pdm(4, 'warden', 'defender').id).toBe('defender-3-warden');
    expect(pdm(10, 'warden', 'defender').id).toBe('defender-7-warden');
    expect(pdm(21, 'warden', 'defender').id).toBe('defender-17-warden');
    expect(pdm(5, 'skulker', 'defender').id).toBe('defender-5'); // no cross-family style bleed
    // the skirmisher rule holds family-wide (owner, 2026-09-01): every
    // style line tops out in a legendary seat
    for (const arch of ['skirmisher', 'brute', 'caster', 'lurker', 'defender']) {
      const fam = D.filter((d) => (d.archetypes ?? []).includes(arch));
      for (const style of new Set(fam.map((d) => d.style).filter(Boolean))) {
        const line = fam.filter((d) => d.style === style).sort((a, b) => b.cr - a.cr);
        expect(`${arch}/${style}: ${line[0].legendary ? 'legendary top seat' : 'NO LEGENDARY SEAT'}`)
          .toBe(`${arch}/${style}: legendary top seat`);
      }
    }
    for (const d of brutes.filter((x) => x.style === 'charger')) {
      const rows = Object.values(d.sections).flat();
      expect(rows.find((e) => e.name === 'Melee Attack').text).toMatch(/moved 20\+ feet straight toward/);
      expect(rows.some((e) => /Prone condition\. \*Failure:\*/.test(e.text))).toBe(true); // trample eats the Prone the charge creates
    }
    const swallower = D.find((d) => d.id === 'brute-8-grappler');
    const sw = Object.values(swallower.sections).flat().find((e) => /swallows/.test(e.text));
    expect(sw.text).toMatch(/regurgitate/); // the swallow engine states its exit
    expect(sw.text).toMatch(/only one creature swallowed at a time/);
    const regen = D.find((d) => d.id === 'brute-5-regenerator');
    const rg = Object.values(regen.sections).flat().find((e) => e.name === 'Regeneration');
    expect(rg.rules).toBe(true); // print-standard name, never renamed
    expect(rg.text).toMatch(/doesn't function on the creature's next turn/); // the off-switch
  });

  test('every mounted template carries the charger identity: trample nova, charge rider, runner speed', () => {
    const { DONORS: D } = require('../donors.mjs');
    const mounted = D.filter((d) => d.style === 'mounted');
    expect(mounted.length).toBe(4);
    for (const d of mounted) {
      const rows = Object.values(d.sections).flat();
      expect(rows.some((e) => /move through the spaces/.test(e.text))).toBe(true);
      expect(rows.find((e) => e.name === 'Melee Attack').text).toMatch(/straight line toward/);
      expect(d.speed).not.toMatch(/Climb/);
    }
  });
});

describe('lurker scaling machinery (2026-09-04): ambush grammar survives the scaler, phantoms keep their discount', () => {
  const { pickDonor: pdl, scaleDonor: sdl } = require('../scale.mjs');
  const { cardBudget: cbl } = require('../card-budgets.mjs');

  test('the inline ambush parenthetical is preserved AND the attack bonus re-stamps through it', () => {
    const s = sdl(pdl(2, null, 'lurker'), 12, { mechanics: [] });
    const row = Object.values(s.sections).flat().find((e) => e.name === 'Melee Attack');
    expect(row.text).toMatch(/\+10 \(with Advantage during the first round of each combat\), reach/);
    // and the damage re-diced to the new CR (not the authored 8) — the
    // 60/40 rider split fires, so sum BOTH clauses
    const total = [...row.text.matchAll(/(\d+) \(\d+d\d+(?:\s*\+\s*\d+)?\)/g)].reduce((n, m) => n + Number(m[1]), 0);
    expect(total).toBeGreaterThan(12);
  });

  test('a damage-less attack row re-stamps its bonus — the Grasping Limb', () => {
    const s = sdl(pdl(5, 'trap', 'lurker'), 13, { mechanics: [] });
    const limb = Object.values(s.sections).flat().find((e) => e.name === 'Grasping Limb');
    expect(limb.text).toMatch(/Attack Roll:\* \+10/); // card atk at 13 (4+6), not the authored +6
  });

  test('the phantom deep-scale: hp_scale IS the total, the flight tax never double-charges', () => {
    const s = sdl(pdl(5, 'phantom', 'lurker'), 5, { mechanics: [] });
    expect(s.hp).toBe(Math.round(cbl(5, {}).hp * 0.7)); // 0.7x flat — not 0.7 x 0.9
    // and the winged skirmisher path is untouched (its tax still charges once)
    const w = sdl(pdl(8, 'winged', 'skirmisher'), 8, { mechanics: [] });
    expect(w.hp).toBe(Math.round(cbl(8, {}).hp * 0.9));
  });
});
