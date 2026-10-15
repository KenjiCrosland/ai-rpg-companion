/**
 * Stage 3 — scaling. The donor's numbers move to the target CR along the
 * business card's lines; dice re-derive from the card's summed budget so
 * sustained + amortized nova land in band TOGETHER (the whole point).
 */
import { cardBudget, withinBudget } from './card-budgets.mjs';
import { attackDamageDiceFor, saveDamageDiceFor, hpFormulaFor } from '../format-2024/dice.mjs';
import { DONORS } from './donors.mjs';
import { namesMelee, weaponProp } from './weapons.mjs';

export function pickDonor(cr, style = null, archetype) {
  // archetype is REQUIRED (owner, 2026-08-26: "kill the default") — a
  // silent skirmisher default is how a mis-wired brute pipeline would
  // invisibly draw the wrong chassis. Fail loudly instead; every caller
  // states which archetype it wants.
  if (!archetype) throw new Error('pickDonor requires an explicit archetype — no silent default');
  const mine = DONORS.filter((d) => (d.archetypes ?? []).includes(archetype));
  const pool = mine.filter((d) => (style ? d.style === style : !d.style));
  const fallback = mine.filter((d) => !d.style);
  const from = (list) => list.filter((d) => d.cr <= cr).sort((a, b) => b.cr - a.cr)[0] ?? list[0];
  // THE LEGENDARY TIER (high-cr batch 2026-10-02): from CR 17 a sheet carries the
  // kit, so the pick prefers a legendary rung — the nearest one, a rung above the
  // CR included (a CR 17 mounted skirmisher scaled the kit-less 13 rung up while
  // the 18 rung sat one step away; its 2014 sheet shipped with no legendary actions)
  const fromTier = (list) => {
    if (cr < 17) return from(list);
    const kit = list.filter((d) => d.legendary);
    if (!kit.length) return from(list);
    return kit.slice().sort((a, b) => Math.abs(a.cr - cr) - Math.abs(b.cr - cr) || b.cr - a.cr)[0];
  };
  return (pool.length ? fromTier(pool) : fromTier(fallback)) ?? from(fallback);
}

// group 2's first alternative is the caster family's HYBRID row (2024's
// signature caster grammar, corpus sweep 2026-09-02: "Melee or Ranged
// Attack Roll: +9, reach 5 ft. or range 150 ft." — Mage/Archmage/Lich/
// Solar); it must swallow both range clauses' periods or the damage
// number never parses and the row never rescales.
// the optional "(with Advantage ...)" group is the LURKER family's
// ambush idiom (corpus sweep 2026-09-04: 9 print sightings — the
// Doppelganger's "(with Advantage during the first round of each
// combat)", the Mimic's grappled-prey form, the sharks' blood-scent) —
// it sits between +N and the reach clause and must be swallowed or the
// damage never parses, same surgery the hybrid row needed.
const ATTACK_RE = /(\+\d+)(?: \(with Advantage[^)]*\))?(, reach \d+ ft\. or range [\d/]+ ft\.|, reach [^.]+|, range [^.]+)? ?\.? (\d+) \((\d+d\d+(?:\s*\+\s*\d+)?)\) ([\w{}]+) damage/;

export function scaleDonor(donor, cr, { legendary = donor.legendary, movement = [], mechanics = null, dprScale = 1, edition = null, concept = '' } = {}) {
  const card = cardBudget(cr, { legendary: !!legendary, edition }); // a 2014 sheet prices against the DMG table (2026-10-02)
  const scaled = JSON.parse(JSON.stringify(donor));
  // THE 2014 DAMAGE LINE (owner + critic 2026-09-14): 2014's table runs
  // ~5 damage/CR vs 2024's ~7.5 — direct-2014 generations pass 0.7
  // (5/7.5 = 0.667; the band's upper half). Uniform across archetypes:
  // the ratio belongs to the edition's table, the archetypes' relative
  // identities live in the donors. Compounds with donor taxes (ward).
  if (dprScale !== 1) scaled.dpr_scale = (scaled.dpr_scale ?? 1) * dprScale;
  // CONCEPT GATING (owner "let's do it", 2026-08-24): rows tagged gated_on
  // ship only when the concept call listed that mechanic. mechanics=null
  // (blank path, direct callers) = ungated; an ARRAY gates — including []
  // (default closed: print's default is no gaze and no teleport). Both
  // gated rows sit outside summedDPR, so omission is budget-neutral.
  scaled.gated_out = [];
  if (Array.isArray(mechanics)) {
    for (const [sec, es] of Object.entries(scaled.sections)) {
      scaled.sections[sec] = es.filter((e) => {
        if (!e.gated_on || mechanics.includes(e.gated_on)) return true;
        scaled.gated_out.push(`${e.name} (${e.gated_on})`);
        return false;
      });
    }
  }
  // ESCAPE-ROW STANDARDIZATION (owner + print, 2026-08-26): seven bespoke
  // names shipped on one verbatim sentence — the one repetition the
  // owner's eye caught across the probe set. Print's cure is
  // standardization, not variety: shared mechanics share names (corpus:
  // Cunning Action x2, Nimble Escape x6, Deathless Agility x2). Skulkers
  // keep Hide under print's own name; every other style drops Hide (a
  // mount, a Large ogre, a mid-air flyer have no business hiding —
  // owner: "mounts shouldn't hide") under the owner's "[Adjective]
  // Agility" house family. rules:true takes the row out of the rename
  // pool; the audit's NEVER_RENAME covers the names.
  const AGILITY_NAME = { mounted: 'Mounted Agility', winged: 'Aerial Agility', hurler: 'Fleet Agility' };
  for (const es of Object.values(scaled.sections)) {
    for (const e of es) {
      if (/takes the Dash, Disengage, or Hide action/.test(e.text)) {
        if (scaled.style === 'skulker') e.name = 'Cunning Action';
        else {
          e.name = AGILITY_NAME[scaled.style] ?? 'Fleet Agility';
          e.text = e.text.replace('the Dash, Disengage, or Hide action', 'the Dash or Disengage action');
        }
        e.rules = true;
      } else if (/takes the Disengage or Hide action/.test(e.text)) {
        // the legendary escape: 0/329 print legendaries grant
        // Disengage/Hide — the row is our invention, so its NAME
        // standardizes like the bonus-action suite (5 bespoke names
        // shipped on one verbatim sentence). Print has no name to
        // borrow and "Nimble Escape" means the goblin BONUS action;
        // 'Withdraw' is the function name. Skulkers keep Hide.
        e.name = 'Withdraw';
        if (scaled.style !== 'skulker') e.text = e.text.replace('the Disengage or Hide action', 'the Dash or Disengage action');
        e.rules = true;
      }
    }
  }
  // CON carries more of the HP load as CR climbs (batch review: 38 dice
  // on CON 14 at CR 20 — peers run CON 20-26 on 24-31 dice)
  scaled.stats.CON = Math.max(scaled.stats.CON, 12 + Math.floor(cr / 2));
  scaled.cr = cr;
  // the donor's declared card spend (brute sweep, 2026-08-26: AC runs
  // 2-3 UNDER the card, HP ~1.1 over — armor traded for meat). WINGED
  // donors' hp_scale documents the speed-keyed flight tax that this
  // function already charges below — never charge it twice.
  scaled.ac = card.ac + (donor.ac_offset ?? 0);
  // a native-Fly donor with a DEEP hp_scale (< 0.9) applies it as the
  // TOTAL discount, flight tax included (the lurker phantoms, 2026-09-04:
  // Ghost runs 0.6x of card — Incorporeal + hover ARE the armor; the
  // winged 0.98 path below is untouched, its tax still charges once)
  const deepScale = donor.hp_scale && donor.hp_scale < 0.9 && /Fly/i.test(donor.speed ?? '');
  // a deep discount eases at the legendary tier: print's incorporeals stop at CR 4 (the Ghost's 0.6), and a CR 24 phantom at 0.69 of card sat 25% under print's floor (checker sweep 2026-10-02) — 0.85 is the Lich's own ratio
  // print's own deep discounts end at CR 6 (Ghost 4, Wraith 5, Invisible Stalker 6): from CR 7 a discount keeps at least 0.85 of the card (goldens gate table 2026-10-02: a CR 7 lurker at 82 HP, a CR 13 warden at 161, both under print's floor)
  const hpScale = donor.hp_scale ? (cr >= 7 ? Math.max(donor.hp_scale, 0.85) : donor.hp_scale) : null;
  scaled.hp = (hpScale && (deepScale || !/Fly/i.test(donor.speed ?? '')))
    ? Math.round(card.hp * hpScale) : card.hp;
  scaled.atk = card.atk; scaled.dc = card.dc;
  // full print ladder: the old ceiling of 6 shipped wrong PB/saves/skills
  // on every CR 21+ block (Stormfall +6 at CR 22, lint-caught 2026-08-20)
  scaled.pb = cr >= 29 ? 9 : cr >= 25 ? 8 : cr >= 21 ? 7 : cr >= 17 ? 6 : cr >= 13 ? 5 : cr >= 9 ? 4 : cr >= 5 ? 3 : 2;
  // The concept call's movement grant: a flying concept on a grounded
  // chassis gains Fly (hover) — print's ghost idiom (Wraith, Fly 60
  // hover on an ordinary frame). Winged-style donors carry Fly natively.
  const walkFt = Number((/^(\d+)/.exec(scaled.speed) ?? [0, 30])[1]);
  if (movement.includes('fly') && !/Fly/.test(scaled.speed)) {
    scaled.speed = `${scaled.speed.replace(/,\s*$/, '')}, Fly ${walkFt} ft. (hover)`;
  }
  // burrow/swim were interviewed but never consumed (the Burrower shipped
  // "while underground" gates with no Burrow speed, 2026-08-25). No tax —
  // print prices wings, not fins or claws.
  if (movement.includes('burrow') && !/Burrow/i.test(scaled.speed)) {
    scaled.speed = `${scaled.speed.replace(/,\s*$/, '')}, Burrow 30 ft.`;
  }
  if (movement.includes('swim') && !/Swim/i.test(scaled.speed)) {
    scaled.speed = `${scaled.speed.replace(/,\s*$/, '')}, Swim ${walkFt} ft.`;
  }
  // THE FLIGHT TAX — one rule, keyed on the SHEET, not the source (owner
  // call 2026-08-19: "a flight tax generally makes sense"). Any chassis
  // whose final speed carries Fly pays the measured 10% (flyers 0.98 of
  // card HP vs grounded 1.08, corpus sweep). Winged donors, movement
  // grants, and any future wings all price identically.
  // the flight tax stops at the legendary tier: print's CR 17+ fliers are not lighter (Balor 287 at 19, Pit Fiend 337 at 20, Solar 363 at 21) and a taxed skirmisher-18 sat under print's lowest HP (checker 2026-10-02)
  // and never on top of the legendary HP trade (dragon-15 at CR 15: 240 × 0.8 × 0.9 = 173 against the Adult Green's 207)
  if (/Fly/.test(scaled.speed) && !deepScale && cr < 17 && !(legendary && cr >= 13)) scaled.hp = Math.round(scaled.hp * 0.9);
  // discounts never STACK below 0.85 of the card from CR 7 (a hovering CR 13 warden paid the ward tax and the flight tax to 0.77 and sat under print's floor — goldens gate table 2026-10-02)
  if (cr >= 7) scaled.hp = Math.max(scaled.hp, Math.round(card.hp * 0.85));
  // a 2014 sheet's HP is the DMG band after the AC trade — the donors' hp_scale
  // and the flight tax are 2024-card calibrations that left four of five 2014
  // sheets under the band (owner's numbers check, 2026-10-02)
  if (edition === '2014') scaled.hp = card.hp; // print's 2014 median at the CR (the SRD 5.1), not the table's band after an AC trade — a CR 1 goblin sat at 77 HP where print 2014 is 19–37 (critic's release audit 2026-10-03)
  // STAT COHERENCE (raise-only, the skeleton path's idiom): a reader
  // recomputes attack = striker mod + PB, so the striker stat rises to
  // pay the card's attack bonus. The DC stays at card — print lets DCs
  // float +-1 off-stat, and attack+DC cannot both cohere to one stat.
  {
    const targetMod = scaled.atk - scaled.pb;
    // casters strike with the MIND (corpus sweep 2026-09-02: Archmage +9
    // = INT 5 + PB 4; raising DEX instead ships a DEX-20 wizard)
    const isCaster = (donor.archetypes ?? []).includes('caster');
    // A CASTER WHO CARRIES A WEAPON NEEDS THE ARM FOR IT (critic, 2026-10-14:
    // Lady Merivane swung a greatsword at +8 off WIS 20 with STR 12, because a
    // caster line keys every attack to the mind). Print's own warpriest, the
    // Priest, swings its Mace off STR 16. When the GM's words name a mundane
    // melee weapon, the striker is physical and the mind keeps the DC.
    const armed = namesMelee(concept);
    // THE WARPRIEST LINE IS A WEAPON LINE: its chassis carries a melee row the
    // model will name a mace or a sword, so the arm has to be fitted before that
    // name exists. Print's Priest is STR 16 and WIS 16 — it swings off one and
    // casts off the other (critic, 2026-10-14: Vareth's Mace rolled +7 off WIS).
    const weaponLine = String(donor.style ?? '') === 'warpriest';
    const byStats = scaled.stats.DEX >= scaled.stats.STR ? 'DEX' : 'STR';
    const striker = armed
      ? (weaponProp(concept)?.finesse ? byStats : 'STR')
      : (isCaster && !weaponLine ? ['INT', 'WIS', 'CHA'].sort((a, b) => scaled.stats[b] - scaled.stats[a])[0] : byStats);
    // EXACT-fit, both directions (2026-09-11: the Cistern Lurker's
    // authored Str 18 derived +7 beside a +6 card stamp at CR 5 — donor
    // stats are ours to move; raise-only was the slot path's rule for
    // MODEL-supplied stats)
    if (Math.floor((scaled.stats[striker] - 10) / 2) !== targetMod) scaled.stats[striker] = 10 + targetMod * 2;
    scaled.striker_stat = striker;
    // skills re-derive from the FINAL stats so Stealth/Perception match
    // what a reader computes (donor skill strings are seat-authored).
    // FULL skill map + expertise preservation (critic 2026-09-09: the
    // Gloomburrow kept Arcana +6 where Int/PB derive +8 — the old map
    // had five skills, so Arcana shipped verbatim; and the old flattener
    // ATE authored expertise — the lurker's Assassin-cite Stealth +11
    // shipped as bare mod+PB. Surplus over the DONOR's own derivation
    // is expertise and survives the rescale.)
    const mod = (k) => Math.floor((scaled.stats[k] - 10) / 2);
    const donorMod = (k) => Math.floor((donor.stats[k] - 10) / 2);
    const SKILL_STAT = { Athletics: 'STR', Acrobatics: 'DEX', 'Sleight of Hand': 'DEX', Stealth: 'DEX', Arcana: 'INT', History: 'INT', Investigation: 'INT', Nature: 'INT', Religion: 'INT', 'Animal Handling': 'WIS', Insight: 'WIS', Medicine: 'WIS', Perception: 'WIS', Survival: 'WIS', Deception: 'CHA', Intimidation: 'CHA', Performance: 'CHA', Persuasion: 'CHA' };
    scaled.skills = String(scaled.skills ?? '').split(',').map((t) => t.trim().replace(/^([A-Za-z][A-Za-z' ]*?)\s*\+(\d+)$/, (m0, name, n) => {
      const st = SKILL_STAT[name.trim()];
      if (!st) return m0;
      // expertise is recognized ONLY as the convention (surplus exactly
      // = donor PB, the double-proficiency shape) and scales as PB;
      // any other surplus is authoring slop and flattens as before
      const expertise = Number(n) - donorMod(st) - donor.pb === donor.pb ? scaled.pb : 0;
      return `${name.trim()} +${mod(st) + scaled.pb + expertise}`;
    })).join(', ');
  }

  // Damage split: the donor's SHAPE decides the ratio (how much of the
  // budget its nova carries); the card decides the total. Solve per-hit
  // damage so summedDPR hits the card's dpr, holding the donor's attack
  // count and nova-to-sustained ratio.
  // below CR 1/2 print makes ONE attack (corpus 2026-10-01: 2 of 79 blocks at CR <= 1/4 carry Multiattack — Pseudodragon, Violet Fungus; 5 of 27 at CR 1/2): the row leaves before the per-hit solver prices the budget into one swing (a CR 1/4 kobold made two, critic form-ten)
  if (cr < 0.5) for (const es of Object.values(scaled.sections)) { const mi = es.findIndex((e) => e.name === 'Multiattack'); if (mi >= 0) es.splice(mi, 1); }
  // below CR 5 print makes at most TWO attacks (corpus 2026-10-01: of 216 blocks under CR 5 only the Manticore makes three) — a CR 2 hedge-witch made three
  if (cr < 5) for (const es of Object.values(scaled.sections)) for (const e of es) if (e.name === 'Multiattack' && /makes three\b/.test(e.text ?? '')) e.text = e.text.replace(/makes three\b/, 'makes two');
  const rows = Object.entries(scaled.sections).flatMap(([sec, es]) => es.map((e) => ({ sec, e })));
  const multi = rows.find((r) => r.e.name === 'Multiattack');
  const attacks = multi ? Number(/makes (\w+)/.exec(multi.e.text)[1].replace('two', 2).replace('three', 3).replace('four', 4)) : 1;
  // A ONCE-PER-ROUND LEGENDARY FIRES ONCE (bodies + high-cr, 2026-10-15). The
  // donors already carry print's own brake — "The creature can't take this
  // action again" — and the checker honours it (`once ? 1 : uses/cost`). This
  // filter did not, so a donor with one free repeat row and one braked row was
  // priced as two free ones: six extra attacks where the checker counts four.
  const legendaryRepeat = rows.filter((r) => r.sec === 'Legendary Actions' && /makes one (Melee Attack|Ranged Attack|Hybrid Attack)/.test(r.e.text));
  const onceOnly = (t) => /can['’]t (?:take|use) this action again|once per round|only once/i.test(String(t ?? ''));
  const legendaryStrikes = legendaryRepeat.length;
  // DAMAGE-bearing gated rows only (the Aegis bug, 2026-09-09: the
  // per-hit solver priced the warden's 2/Day temp-HP blessing as a
  // damage nova and crushed every warden ~50% under budget — 8 (1d8+4)
  // fists on a CR 7). A gated support row is budget-neutral.
  const novaRows = rows.filter((r) => r.e.gate && /\d+ \(\d+d\d+(?:\s*\+\s*\d+)?\) [\w{}]+ damage/.test(r.e.text));
  // iterate per-hit until in band (coarse then fine — the dice snap anyway)
  const legendaryHits = legendaryRepeat.reduce((n, r) => n + (onceOnly(r.e.text) ? 1 : 3), 0); // the DMG counts every legendary use: a cost-1 strike row fires three times a round (critic's release audit 2026-10-03 — 2014 legendaries ran 1.5–2.3× the band with Multiattack solved to the band and three strikes on top; a 2024 lurker at 18 read +8 on offense, past print's +7 ceiling). Receipt: print 2024 legendaries sit at ~1.0× the legendary card by this count (Adult Brass 126 vs 125 at CR 13)
  let perHit = Math.max(4, Math.round(card.dpr / (attacks + legendaryHits + 1)));
  // PER-USE nova ceiling, measured against ALL printed single-entry
  // maxima (2026-08-18, the reviewer's non-dragon rider — which was
  // earned: 5.5xCR ran 75% over print at the top). Print's biggest
  // swings PLATEAU: CR 5 max 31, CR 8 49, CR 11 66 (Behir), then 55-88
  // from CR 13 through CR 30 (Ancient White 63 at 20, Tarrasque bellow
  // 78 at 30). min(6xCR, 70) tracks the line within a die at every
  // measured point. Reallocated budget lands in sustained, which is
  // bounded by the band by construction (summedDPR returns sustained
  // alone once the nova sinks beneath it).
  // Sloped plateau (batch two: 12/16/20 all shipped 71 — one number,
  // three tiers). NOTE the reviewer's "print ~91" is the 2014 figure; the
  // measured 5.2 maxima at CR 20 is 63. min(6xCR, 55+CR) varies within
  // the printed plateau: 66@11 (the Behir exactly), 67@12, 71@16, 75@20.
  const novaCeil = Math.min(Math.round(6 * cr), 55 + Math.round(cr));
  const novaAvgFor = (ph) => Math.min(Math.round(ph * attacks * 1.5), novaCeil);
  for (let i = 0; i < 40; i += 1) {
    // THE LOOP MUST COUNT WHAT THE SEED COUNTS (bodies, 2026-10-15). The seed
    // two blocks up divides the card by `attacks + legendaryHits + 1`, where
    // legendaryHits is the strike row times three — the DMG's own reading, and
    // the checker's. This line counted the row ONCE, so the loop drove per-hit
    // back up until the sheet was hot: the CR 15 storm dragon shipped a 32-point
    // bite where print's adult dragons at CR 13-16 deal 17-21, and its offense
    // read CR 23.
    const sustained = perHit * (attacks + legendaryHits);
    const novas = novaRows.map((r) => ({ avg: novaAvgFor(perHit), gate: r.e.gate }));
    const { ok, actual, target } = withinBudget(cr, sustained, novas, { legendary: !!legendary, dprScale: scaled.dpr_scale ?? 1, edition });
    // a scaled-down block (dprScale < 1) descends from the donor's
    // numbers — first-in-band from above is the band CEILING, ~20%
    // over the 2014 line (live 2026-09-14); keep descending to within
    // 110% of target. Unscaled generations keep the historical stop.
    if (ok && actual >= target * 0.9 && ((scaled.dpr_scale ?? 1) >= 1 || actual <= target * 1.1)) break;
    perHit += actual < target ? 1 : -1;
  }
  const dexMod = Math.floor((scaled.stats.DEX - 10) / 2);
  const strMod = Math.floor((scaled.stats.STR - 10) / 2);
  const strikerMod = Math.floor((scaled.stats[scaled.striker_stat ?? 'STR'] - 10) / 2);
  const isCasterDonor = (donor.archetypes ?? []).includes('caster');
  for (const { e } of rows) {
    if (!ATTACK_RE.test(e.text)) continue;
    // ONE stat per row (critic 2026-09-15, the Cliff Troll: +6 to hit
    // beside +4 damage — the to-hit keys the exact-fit striker while
    // Math.max(dex, str) read the donor's OTHER physical stat, still
    // high after a downscale only moves the striker). The flat bonus
    // follows the same stat the reader recomputes the attack from —
    // for casters and martials alike, that is the striker.
    const mod = strikerMod;
    // the dominated-twin price (batch four): a budget-identical ranged
    // option is strictly safer than the melee it mirrors, so the ranged
    // row pays ~15% (print's own premium: Frost Giant axe 28 vs bow 24)
    const rowBudget = /Ranged Attack Roll/.test(e.text) && !/Melee/.test(e.text)
      ? Math.max(3, Math.round(perHit * 0.85)) : perHit;
    const { avg, dice } = attackDamageDiceFor(rowBudget, Math.min(mod, rowBudget - 1));
    e.text = e.text
      .replace(/\+\d+((?: \(with Advantage[^)]*\))?), (reach|range)/, `+${card.atk}$1, $2`)
      .replace(/\d+ \(\d+d\d+(?:\s*\+\s*\d+)?\) ([\w{}]+) damage/, `${avg} (${dice}) $1 damage`);
    // THE ENERGY RIDER (owner TODO, landed 2026-08-18; the Assassin datum:
    // print tops up a skirmisher's thin base with per-hit riders — the 73%
    // "both" shape). The MELEE attack always scales as a split — 60% base
    // physical + 40% rider dice, sum = the solved per-hit, budget
    // unchanged — and the reskin model decides: a rider type fills
    // {damage_type_2}; "none" ships text_noRider, the full-budget single
    // clause. Priced either way, chosen by concept.
    if (/Melee Attack Roll/.test(e.text) && !e.gate) {
      e.text_noRider = e.text;
      const base = Math.max(2, Math.round(perHit * 0.6));
      const riderAvg = perHit - base;
      // no split on tiny budgets: two dice-snap floors overshoot a small
      // per-hit (live: CR 1/2 shipped 175% of band), and print's riders
      // start at the Assassin's tier anyway
      if (perHit >= 8 && riderAvg >= 3) {
        const b2 = attackDamageDiceFor(base, Math.min(mod, base - 1));
        const r2 = saveDamageDiceFor(riderAvg);
        e.text = e.text.replace(/\d+ \(\d+d\d+(?:\s*\+\s*\d+)?\) ([\w{}]+) damage/,
          `${b2.avg} (${b2.dice}) $1 damage plus ${r2.avg} (${r2.dice}) {damage_type_2} damage`);
      }
    }
  }
  for (const { e } of rows) {
    // the wildcard SLOT's chassis text is the verified fallback — it must
    // carry the scaled DC too (live: a CR 20 shipped its donor's DC 20)
    if (!e.gate) e.text = e.text.replace(/DC \d+/g, `DC ${card.dc}`);
    // DAMAGE-LESS attack rows (the trap line's Grasping Limb — Roper's
    // tentacle shape, 2026-09-04) never enter the re-dice loop, so their
    // attack bonus stamps here (idempotent on rows already re-stamped)
    if (!e.gate && /Attack Roll:\*/.test(e.text)) e.text = e.text.replace(/(Attack Roll:\* )\+\d+/, `$1+${card.atk}`);
    // UNGATED SAVE-DAMAGE ROWS RESCALE TOO (the Deacon, 2026-09-02: the
    // binder's Debuff Ray shipped its authored CR 8 dice — 18 (4d8) —
    // at CR 2 AND CR 11; the scaler only re-diced attack rows and gated
    // rows, and no earlier family had a damage-bearing ungated save row).
    // Budget: ~0.9x per-hit, print's own naga ratio (Poisonous Spittle
    // vs Bite). Rules rows (Trample, engines) keep their authored curves.
    if (!e.gate && !e.rules && !ATTACK_RE.test(e.text) && /Saving Throw/.test(e.text) && /\d+ \(\d+d\d+\)/.test(e.text)) {
      const { avg, dice } = saveDamageDiceFor(Math.max(3, Math.round(perHit * 0.9)));
      e.text = e.text.replace(/\d+ \(\d+d\d+\) ([\w{}]+) damage/, `${avg} (${dice}) $1 damage`);
    }
    if (e.gate) {
      const { avg, dice } = saveDamageDiceFor(novaAvgFor(perHit));
      e.text = e.text.replace(/DC \d+/g, `DC ${card.dc}`)
        .replace(/\d+ \(\d+d\d+\) ([\w{}]+) damage/, `${avg} (${dice}) $1 damage`);
      // support blessings scale too (critic 2026-09-10: the Unicorn's
      // 10 THP is a dead action on a CR 18 boss) — Temporary Hit Points
      // track per-hit, so the blessing stays worth an action at tier
      if (/Temporary Hit Points/.test(e.text)) {
        const thp = saveDamageDiceFor(Math.max(10, Math.round(perHit)));
        e.text = e.text.replace(/\d+ \(\d+d\d+\) Temporary Hit Points/, `${thp.avg} (${thp.dice}) Temporary Hit Points`);
      }
    }
  }
  // SWARM GRAMMAR (body-type sweep 2026-09-11): the Bloodied split —
  // "7 (2d6) damage, or 3 (1d6) if the creature is Bloodied" — is a
  // second damage clause the re-dicer never knew; it re-derives as half
  // of the re-diced main clause (print's own ratio on all 7 swarms)
  for (const es of Object.values(scaled.sections)) {
    for (const e of es) {
      const m = /, or \d+ \(\d+d\d+(?:\s*\+\s*\d+)?\)(?: \{damage_type\} damage)? if ([^.]{0,40}Bloodied)/.exec(e.text);
      if (!m) continue;
      const main = /(\d+) \(\d+d\d+(?:\s*\+\s*\d+)?\)/.exec(e.text);
      if (!main) continue;
      const half = saveDamageDiceFor(Math.max(1, Math.floor(Number(main[1]) / 2)));
      // the plus-rider rides the Bloodied half too, halved — print's split carries one type, but a rider the model added is not dropped on the half (the plague swarm's Poison vanished when Bloodied, critic form-ten 2026-10-01)
      const plus = /(?<=\{damage_type\} damage) plus (\d+) \((\d+d\d+)\) \{damage_type_2\} damage(?=, or )/.exec(e.text);
      const halfPlus = plus ? saveDamageDiceFor(Math.max(1, Math.floor(Number(plus[1]) / 2))) : null;
      e.text = e.text.replace(/, or \d+ \(\d+d\d+(?:\s*\+\s*\d+)?\)( \{damage_type\} damage)? if /, (m0, tok) => `, or ${half.avg} (${half.dice})${tok ?? ''}${halfPlus && tok ? ` plus ${halfPlus.avg} (${halfPlus.dice}) {damage_type_2} damage` : ''} if `);
    }
  }
  // escape DCs re-derive from the FINAL stats (2024 rule: 8 + Str mod
  // + PB; the Chandelier shipped a donor-authored 15 beside a derived
  // 17, critic 2026-09-13)
  {
    const escDC = 8 + Math.floor((scaled.stats.STR - 10) / 2) + scaled.pb;
    for (const es of Object.values(scaled.sections)) {
      for (const e of es) {
        if (/escape DC \d+/.test(e.text ?? '')) e.text = e.text.replace(/escape DC \d+/g, `escape DC ${escDC}`);
      }
    }
  }
  // the {dc} token stamps the card DC into authored row text (the
  // dragon Spellcasting header, 2026-09-14)
  for (const es of Object.values(scaled.sections)) {
    for (const e of es) {
      if (e.text?.includes('{dc}')) e.text = e.text.split('{dc}').join(String(scaled.dc));
      // the donor's "+N to hit with spell attacks" is a card number too
      // (the Prelate shipped +8 beside +9 rows, 2026-09-16); caster
      // donors only — their card attack IS the mental-stat derivation
      if ((donor.archetypes ?? []).includes('caster') && /to hit with spell attacks/.test(e.text ?? '')) {
        e.text = e.text.replace(/\+\d+ to hit with spell attacks/, `+${scaled.atk} to hit with spell attacks`);
      }
    }
  }
  const conMod = Math.floor((scaled.stats.CON - 10) / 2);
  scaled.hp_formula = hpFormulaFor(scaled.hp, scaled.size ?? 'Medium', conMod);
  scaled.per_hit = perHit;
  return scaled;
}
