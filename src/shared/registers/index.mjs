/**
 * Register registry aggregator — single source of truth for every
 * register in the system.
 *
 * The aggregator combines two sources:
 *
 *   1. Inline `minimalRegisters` entries below — registers whose data
 *      footprint is just a descriptor (and possibly a `protected` flag
 *      and a `promptArchitecture: 'catchall'` tag). They have no name
 *      pools, no avoid-lists, no cultural-notes prose, so a dedicated
 *      file would be ~4 lines of boilerplate. They stay inline.
 *
 *   2. Per-register modules in `./` — registers with structured data
 *      that warranted their own file (character/place/spirit pools,
 *      avoid-lists, cultural notes, curation history). Imported and
 *      appended to `ALL_REGISTERS`.
 *
 * Promotion is one-way: if a minimal register ever grows a pool, an
 * avoid-list, or rich cultural notes, cut its entry from
 * `minimalRegisters` and add a new file with an `xxxRegister` export.
 *
 * Each entry in `ALL_REGISTERS` is an object carrying whichever of the
 * following fields apply:
 *
 *   prefix                  — startsWith key (e.g., 'Maori-inspired')
 *   descriptor              — line that flows into `registerList`
 *   protected               — true if gated by `enableProtectedRegisters`
 *   promptArchitecture      — 'catchall' | 'pool' | undefined (universal-invent)
 *   characterPool           — curated character-name array
 *   characterPoolStrictness — 'mandatory' | 'preferred'
 *   placePool, spiritPool   — pool-architecture-only (Yoruba, Andean)
 *   itemNameAvoidList       — sacred-term avoid-list (catchall registers)
 *   culturalNotes           — register-specific prose
 *   fantasyRaceKey          — origin axis (Orcish, Goblinoid, Elven, Dwarven)
 *   thematic                — true for cosmic-genre registers
 *                              (Aberrant, Abyssal, Infernal, Primordial)
 *   itemNameGuidance,       — pool-prompt extras (Yoruba, Andean)
 *   spellingReminder,
 *   properNounsPoolOnly,
 *   cultureName,
 *   pools                   — pool-prompt label structure
 *
 * Consumers (register-list, character-whitelist-registry, catchall-
 * prompt, pool-prompt, register-whitelists) iterate `ALL_REGISTERS`
 * and pick the fields they care about, ignoring the rest. Missing
 * fields = the register doesn't participate in that mechanism.
 */

import { aberrantRegister }   from './aberrant.mjs';
import { abyssalRegister }    from './abyssal.mjs';
import { andeanRegister }     from './andean.mjs';
import { draconicRegister }   from './draconic.mjs';
import { dwarvenRegister }    from './dwarven.mjs';
import { elvenRegister }      from './elven.mjs';
import { goblinoidRegister }  from './goblinoid.mjs';
import { infernalRegister }   from './infernal.mjs';
import { maoriRegister }      from './maori.mjs';
import { orcishRegister }     from './orcish.mjs';
import { arabicRegister }     from './arabic.mjs';
import { primordialRegister } from './primordial.mjs';
import { yorubaRegister }     from './yoruba.mjs';

/**
 * Descriptor-only registers (and a few that only carry a `protected` /
 * `promptArchitecture` flag in addition). Kept inline because each
 * entry is one line and a dedicated file would be mostly boilerplate.
 *
 * All catchall-tier protected registers without curated pools live
 * here. Maori is the exception — it has a character pool, an item-
 * name avoid-list, and curator-facing prose, so it lives in
 * `./maori.mjs` and is appended below.
 */
const minimalRegisters = [
  // Western-canonical (universal-invent path; no protection layer needed)
  // Deity-mode classification: pre-Christian European traditions are
  // 'active-engagement' (extinct religion, deity names appear sparingly
  // as historical-mythological reference; active religious life uses
  // constructed epithets). Christian-era craft registers (Italian-
  // Renaissance, Middle-High-German-inspired, Old-Occitan) have no
  // deity-mode set — they're not religion-coded in fantasy use.
  //
  // Static `(e.g., Name1, Name2, Name3)` example tails removed across
  // these descriptors. Production showed the LLM cargo-culting them
  // verbatim across many generations (three Thyrsions in a row for
  // Greek-inspired, etc.) — same anchoring failure that drove
  // `rotateRegisterExamples` for fictional palettes. Without whitelist-
  // backed rotation, static example tails just become anchors. The
  // structural descriptor ("vowel-rich Te Reo phonetics," "harsh
  // consonants," "Mabinogion-era Welsh") teaches the register
  // phonology; the LLM's training supplies fresh names per generation.
  { prefix: 'Latin-inspired',                descriptor: 'Latin-inspired: formal, structured', deityMode: 'active-engagement', creatureTradition: 'Roman-flavored threats: lemures (restless dead haunting old families), manes (ancestral shades demanding rites), larvae (malicious ghosts of the unburied), strix (witch-bird that drinks blood), di inferi (the lower powers), augury-corrupted beasts of omen, basilisks of the Pliny tradition, lamia in their Roman form, hippogriff-coded chimerae. Lean civic-and-rite: the dungeon often connects to neglected pieties or broken patrician oaths.', creatureTraditionByTier: { complicating: ['lemures', 'strix', 'larvae'], significant: ['lamia (Roman)', 'augury-corrupted beasts of omen', 'manes en masse'], scary: ['Pliny-tradition basilisks', 'hippogriff-coded chimerae', 'di inferi incarnate'] }, materialTradition: 'bronze, terracotta, lead, marble, olive oil, wine-stained amphora-shards, bitumen, lime mortar' },
  { prefix: 'Italian-Renaissance-inspired',  descriptor: 'Italian-Renaissance-inspired: Renaissance-era Italian inventor-craftsperson register', creatureTradition: 'Renaissance-bestiary threats: alchemical homunculi (failed and escaped), basilisco, classical-revival chimerae and hydras under apothecary study, animated cabinet-of-curiosities pieces (cogwork, anatomical wax that walks), library-haunts of the failed humanist, mandragora made flesh. Cabinet-of-wonders and apothecary-lab framing; not religious-horror.', creatureTraditionByTier: { complicating: ['mandragora made flesh', 'escaped lab-rats', 'lesser library-haunts'], significant: ['alchemical homunculi', 'basilisco', 'animated cabinet-of-curiosities pieces'], scary: ['classical-revival chimerae', 'hydras under apothecary study', 'anatomical-wax walkers'] }, materialTradition: 'beaten copper, mercury, vermilion pigment, wax tablets, gilded brass, alchemical glassware, vellum, lead solder' },
  { prefix: 'Greek-inspired',                descriptor: 'Greek-inspired: mythological weight, melodic', deityMode: 'active-engagement', creatureTradition: 'Hellenic mythological threats: lamia, empusa, sirens of the rocky coast, harpyiai, gorgons (Stheno, Euryale, and their lesser kin), centaurs of the wild ranges, kerkopes (trickster-thieves), the Lernean hydra and its lesser cousins, scylla-and-charybdis-coded sea-things, the kindred of Echidna. Genius-loci (nymphs and dryads gone hostile) for natural dungeons; chthonic shades for tomb-dungeons.', creatureTraditionByTier: { complicating: ['kerkopes', 'lesser harpyiai', 'genius-loci nymphs gone mild-hostile'], significant: ['centaurs of the wild', 'sirens', 'lamia', 'empusa'], scary: ['gorgons (Stheno, Euryale)', 'Lernean hydra', 'kindred of Echidna', 'scylla-and-charybdis-coded sea-things'] }, materialTradition: 'marble, bronze patina, olive oil, wine-stained terracotta, gold leaf, kykeon-residue, alabaster, ash from sacrificial tripods' },
  { prefix: 'Slavic-inspired',               descriptor: 'Slavic-inspired: archaic consonant clusters, dramatic vowels; folkloric texture includes leshy (forest-lords), rusalka (drowned spirits), domovoi (household-guardians), kikimora (attic-spirits), vodyanoy (river-kings), koshchei (undying threats), baba yaga (witch-figures), zmey (serpent-dragons), the Firebird. Avoid defaulting to Orthodox-church historical fiction.', deityMode: 'active-engagement', creatureTradition: 'Slavic folkloric threats: leshy (forest-lords who turn travelers in circles), rusalka (drowned women clinging to riverbanks), vodyanoy (river-kings demanding tribute), domovoi (household guardians turned hostile), kikimora (attic-spirits and night-pressers), baba yaga (hut-on-chicken-legs, child-eaters), koshchei the deathless (whose life is hidden in nested vessels), zmey (multi-headed dragon-serpents), vila (storm-and-meadow spirits), the Firebird as omen. The supernatural identity is folk-magic, NOT church-magic.', creatureTraditionByTier: { complicating: ['domovoi corrupted', 'kikimora', 'leshy (minor)'], significant: ['rusalka', 'vodyanoy', 'vila', 'leshy (major)'], scary: ['baba yaga', 'koshchei the deathless', 'zmey-dragon', 'the Firebird as omen'] }, materialTradition: 'birch bark, oak ash, pine pitch, samovar copper, beeswax, iron rust, frozen mud, smoked leather' },
  { prefix: 'Old-Slavic-inspired',           descriptor: 'Old-Slavic-inspired: pre-Christian archaic Slavic register, woodland-spirit tradition. Folklore: leshy and vila in the woods, rusalka in rivers, domovoi in homes, baba yaga in deep forests, koshchei and zmey as threats, Perun-style sky-powers, the Firebird as omen. The pre-Christian framing means folk-magic is the public religion, not a survival underneath Orthodox cover.', deityMode: 'active-engagement', creatureTradition: 'pre-Christian Slavic threats: leshy of the deep forest, vila (storm-spirits of the meadow), rusalka in the rivers and lakes, vodyanoy in deep water, domovoi corrupted into hostility, baba yaga, koshchei the deathless, zmey-dragons, perun-storm-beasts (thunder-touched creatures), kikimora. Folk-magic is the public religion, not a survival.', creatureTraditionByTier: { complicating: ['domovoi corrupted', 'kikimora', 'leshy (minor)'], significant: ['vila storm-spirits', 'rusalka', 'vodyanoy', 'leshy (major)'], scary: ['baba yaga', 'koshchei the deathless', 'zmey-dragon', 'perun-storm-beasts'] }, materialTradition: 'birch bark, oak ash, pine pitch, beeswax, iron rust, frozen mud, smoked leather, kvass-fermented wood' },
  { prefix: 'Russian-inspired',              descriptor: 'Russian-inspired: patronymic structures, Cyrillic phonetics rendered; folkloric texture includes leshy (forest-lords), rusalka (drowned spirits) in rivers and lakes, domovoi (household-spirits) behind every stove, vodyanoy (water-tsars) in deep waters, kikimora in attics, baba yaga in the deep taiga, koshchei the undying, zmey-dragons in caves, the Firebird as omen. Do NOT default to Orthodox-church historical fiction (Old Believer villages, Patriarchs, kopecks, schismatics) — the supernatural is the texture, not the church politics.', deityMode: 'active-engagement', creatureTradition: 'Russian folkloric threats: leshy (forest-lords in the deep taiga), rusalka in rivers and lakes, vodyanoy (water-tsars), domovoi behind the stove, kikimora in the attic, baba yaga deep in the taiga, koshchei the undying, zmey-dragons in caves, the Firebird as omen, the bayan-storm-things, the witch-folk of the swamps. Folk-magic, not church-politics.', creatureTraditionByTier: { complicating: ['domovoi corrupted', 'kikimora', 'leshy (minor)'], significant: ['rusalka', 'vodyanoy water-tsars', 'witch-folk of the swamps', 'leshy (major)'], scary: ['baba yaga', 'koshchei the undying', 'zmey-dragon', 'the Firebird as omen'] }, materialTradition: 'birch bark, oak ash, pine pitch, samovar copper, beeswax, iron rust, frozen mud, smoked leather' },
  { prefix: 'Romanian-inspired',             descriptor: 'Romanian-inspired: Latin-rooted with Slavic influence', deityMode: 'active-engagement', creatureTradition: 'Romanian folkloric threats: strigoi (the restless dead who walk by night), moroi (lesser strigoi, children of the cursed), pricolici (werewolf-kind cursed for blood-debts), iele (dancing forest-women who steal voices), vârcolac (eclipse-eating shadows), balaur (multi-headed dragon-serpents), zmeu (shape-changing antagonists of folktale), solomonari (storm-rider necromancers). Carpathian-and-forest framing; not the Hollywood vampire archetype.', creatureTraditionByTier: { complicating: ['moroi', 'iele', 'lesser pricolici'], significant: ['pricolici (war-pack)', 'vârcolac eclipse-shadows', 'solomonari storm-riders'], scary: ['strigoi major', 'balaur multi-headed dragon-serpent', 'zmeu the shape-changer'] }, materialTradition: 'salt brine, cave calcite, iron oxide, cave pearl formations, smoke-cured wood, sheep-tallow, sulfur-stained limestone' },
  { prefix: 'Hungarian-inspired',            descriptor: 'Hungarian-inspired: distinctive vowel harmony, Magyar register', deityMode: 'active-engagement', creatureTradition: 'Magyar folkloric threats: lidérc (succubus-like night-spirit that exhausts sleepers), garabonciás (storm-rider sorcerer summoning thunder-creatures), táltos shamans gone wrong, sárkány (multi-headed Hungarian dragon), fene (formless dread/disease-spirit), boszorkány (witches binding the dead), the dragon-folk of the great rivers. Steppe-and-puszta and Carpathian-frontier framing.', creatureTraditionByTier: { complicating: ['lesser lidérc', 'puszta-spirits', 'corrupted táltos apprentices'], significant: ['boszorkány (witches binding the dead)', 'táltos shamans gone wrong', 'garabonciás storm-summoners'], scary: ['sárkány multi-headed dragon', 'fene the formless dread', 'dragon-folk of the great rivers'] }, materialTradition: 'river-clay, paprika-stained linen, iron, wood-smoke ash, horse-leather, peat-smoke, beaten copper' },
  { prefix: 'Finnish-inspired',              descriptor: 'Finnish-inspired: vowel harmony, double consonants, agglutinative compounds', deityMode: 'active-engagement', creatureTradition: 'Kalevala-tradition threats: hiisi (forest-giants, originators of evil), kalma (death-spirits of corpses), näkki (water-creatures dragging swimmers down), tuonelan virta (the river of Tuonela and its things), Tuonetar\'s spawn (the queen of death and her brood), painajainen (night-mares riding sleepers), peikko (trolls of the deep forest), marras (death-omen creatures), Louhi\'s hag-coded sendings. Runic-magic framing — songs as binding power.', creatureTraditionByTier: { complicating: ['marras (death-omen)', 'painajainen', 'lesser peikko'], significant: ['peikko (trolls of the deep forest)', 'näkki', 'kalma death-spirits'], scary: ['hiisi forest-giants', "Tuonetar's spawn", "Louhi's hag-sendings", 'things of tuonelan virta'] }, materialTradition: 'pine tar, birch bark, lake ice, iron slag, frozen mud, bog-water, rune-carved bone' },
  { prefix: 'Norse-inspired',                descriptor: 'Norse-inspired: harsh consonants, primal force', deityMode: 'active-engagement', creatureTradition: 'Norse mythological threats: draugr (the restless mound-dead, hoarding their grave-goods), jötunn (giants of frost and stone), lindworm (limbless serpents in the deep places), nøkk (water-singer luring travelers), huldra (forest-women with hollow backs), fossegrim (the waterfall fiddler), fylgja (animal soul-companions, malign when severed), vættir (place-spirits), mara (nightmare-rider), niðing-wolves, valravn (battlefield-ravens corrupted), the trolls of the high country. The supernatural identity is fate-bound and lineage-bound.', creatureTraditionByTier: { complicating: ['vættir', 'mara', 'fylgja (severed)'], significant: ['nøkk', 'huldra', 'fossegrim', 'niðing-wolves', 'valravn'], scary: ['draugr (major)', 'jötunn', 'lindworm', 'trolls of the high country'] }, materialTradition: 'ice, amber, iron rust, bone ash, pine resin, frozen blood, smoke-cured fish, runic-carved stone' },
  { prefix: 'Old-Norse-inspired',            descriptor: 'Old-Norse-inspired: Eddaic register, archaic compound names, kennings', deityMode: 'active-engagement', creatureTradition: 'Eddaic threats: draugr (mound-dead bound to their hoards), haugbúi (sworn barrow-dwellers), jötunn (frost and stone giants of the elder world), lindworm, nøkk, huldra, fossegrim, fenrisúlfr-line wolves, fylgja and hamingja gone severed, vættir, the trolls of Jǫtunheimar and the deeper night, valravn, mara. The dungeon often reads as a barrow, a frost-hall, or a place where an ancient binding has worn thin.', creatureTraditionByTier: { complicating: ['vættir', 'mara', 'fylgja and hamingja severed'], significant: ['nøkk', 'huldra', 'fossegrim', 'valravn', 'haugbúi'], scary: ['draugr', 'jötunn', 'lindworm', 'fenrisúlfr-line wolves', 'trolls of Jǫtunheimar'] }, materialTradition: 'ice, amber, iron rust, bone ash, pine resin, frozen blood, smoke-cured fish, runic-carved stone' },
  { prefix: 'Gothic-inspired',               descriptor: 'Gothic-inspired: earliest documented Germanic register, archaic and ancient-feeling, distinct from Old Norse', deityMode: 'active-engagement', creatureTradition: 'archaic Germanic threats: untoten (the unrested ancient dead), gardlöfa-coded barrow-dwellers, draco-form serpents of the migration-era folktales, wolf-of-the-tribe-line creatures, the swine-warriors of broken oaths, the witch-folk who weave fates with bones. Migration-era and pre-Christian framing.', creatureTraditionByTier: { complicating: ['witch-folk (lesser fate-weavers)', 'broken-oath revenants'], significant: ['gardlöfa-coded barrow-dwellers', 'swine-warriors of broken oaths', 'wolf-of-the-tribe creatures'], scary: ['untoten of the ancient unrested', 'draco-form serpents of the migration-era'] }, materialTradition: 'hammered iron, hammered gold, smoke-stained wood, oath-ash, river-stones, mead-stained antler, lime-wash plaster' },
  { prefix: 'Anglo-Saxon-inspired',          descriptor: 'Anglo-Saxon-inspired: Old English compound names, alliterative patterns', deityMode: 'active-engagement', creatureTradition: 'Beowulf-tradition threats: wyrm (fire-drakes hoarding under earth), þyrs (giants of the moor), scucca (devil-things stalking the lonely road), nicor (water-monsters in the meres, Grendel-kin), grendels (mere-walkers of monstrous blood), ælf (corrupted otherworld-folk), dweorg (dwarf-spirits of stone and night), the corpse-walking eotenas, mara (nightmare-press). Mead-hall framing with the long enemy in the dark outside.', creatureTraditionByTier: { complicating: ['mara (nightmare-press)', 'dweorg (lesser)', 'lesser ælf'], significant: ['scucca (devil-things)', 'ælf (corrupted otherworld-folk)', 'nicor (water-monsters)'], scary: ['wyrm (fire-drake)', 'þyrs (giants of the moor)', 'grendels', 'eotenas (corpse-walking)'] }, materialTradition: 'wattle-and-daub, smoke-blackened oak, iron rivets, mead-honey, sea-salt, ring-mail rust, peat ash' },
  { prefix: 'Germanic-inspired',             descriptor: 'Germanic-inspired: guttural, industrial', deityMode: 'active-engagement', creatureTradition: 'continental Germanic folkloric threats: kobold (Germanic mine-spirit, mischief-or-malice), alp (night-rider that crushes sleepers), dweorh, untot (the unrested dead), nachzehrer (gnawing dead in the family vault), schwarzalben (dark-elves of the deep places), schratt (forest-spirit, capricious), wechselbalg (changelings left in human cradles). Forest-and-mine framing; the supernatural is local and family-bound.', creatureTraditionByTier: { complicating: ['kobold (mine-spirit)', 'wechselbalg (changelings)', 'lesser schratt'], significant: ['alp (night-rider)', 'dweorh', 'schratt (major)'], scary: ['nachzehrer (gnawing dead)', 'schwarzalben (dark-elves of the deep)', 'untot (ancient)'] }, materialTradition: 'iron ore, coal soot, knotted leather, pine pitch, kobold-mine dust, forge-slag, hammered tin' },
  { prefix: 'Old-High-German-inspired',      descriptor: 'Old-High-German-inspired: continental Germanic, archaic register', deityMode: 'active-engagement', creatureTradition: 'archaic Germanic threats: kobold (mine-spirit), schratt (forest-spirit), wiht (creature/wight of liminal places), alpgeist (nightmare-rider), drache and lindwurm in the deep places, untot, the swearing-and-broken-oath haunts. Charlemagne-era frontier framing.', creatureTraditionByTier: { complicating: ['kobold (mine-spirit)', 'wiht (liminal-place creature)', 'lesser schratt'], significant: ['schratt (major)', 'alpgeist (nightmare-rider)', 'untot'], scary: ['drache', 'lindwurm', 'swearing-and-broken-oath haunts (major)'] }, materialTradition: 'pitch, oak, iron, fortress mortar, hunting-lamp oil, wolf-fur, sealing-wax, sheep-tallow' },
  { prefix: 'Middle-High-German-inspired',   descriptor: 'Middle-High-German-inspired: medieval continental Germanic, Nibelungenlied-era register', creatureTradition: 'Nibelungenlied-tradition threats: drache and lindwurm (the hoard-guarding dragons), untot, kobold, alp, riese (giants of the high passes), the night-women, dwarven-shade hoard-guardians, the king-bound dragon-curses, treacherous shape-changers of the courtly romance. Knightly-and-fey framing.', creatureTraditionByTier: { complicating: ['kobold', 'alp', 'lesser shape-changers of the courtly romance'], significant: ['night-women', 'dwarven-shade hoard-guardians', 'untot of the courtly dead'], scary: ['drache', 'lindwurm', 'riese (giants of the high passes)', 'king-bound dragon-curses'] }, materialTradition: 'Nibelung-coin verdigris, mailed iron, oak, dragon-scale shed, hunting-lamp oil, blood-tempered steel, fortress mortar' },
  { prefix: 'Celtic-inspired',               descriptor: 'Celtic-inspired: soft consonants, nature references', deityMode: 'active-engagement', creatureTradition: 'Celtic folkloric threats: bean sídhe (banshees presaging death), púca (shape-changing trickster, dangerous or kindly), Tylwyth Teg / aos sí (the fair folk in their courts), cù sìth (otherworld hounds), kelpie / each-uisce (water-horses that drown riders), gan ceann (the headless rider), abhartach (the undying chieftain), changelings and stolen children. The Otherworld bleeds through; the dungeon is often a sí-mound, a fairy hill, or a place where time runs sideways.', creatureTraditionByTier: { complicating: ['lesser bean sídhe', 'changelings'], significant: ['púca', 'cù sìth', 'kelpie / each-uisce', 'gan ceann (headless rider)'], scary: ['abhartach (undying chieftain)', 'aos sí courts gone hostile', 'Tylwyth Teg in royal force'] }, materialTradition: 'peat, bog water, silver tarnish, hawthorn sap, cold stone condensation, river-stones, oak-gall ink' },
  { prefix: 'Welsh-inspired',                descriptor: 'Welsh-inspired: soft consonants (ll, dd, ch), vowel-rich, mythic-poetic register', deityMode: 'active-engagement', creatureTradition: 'Welsh folkloric threats: afanc (lake-monster of the deep mere), cŵn annwn (otherworld hounds whose horns presage death), gwyllgi (black hound on the lonely road), ceffyl dŵr (water horse), Tylwyth Teg (the fair folk), brenin llwyd (the grey king of the mists), cyhyraeth (banshee-figure), gwrachod (witches of the high passes), the changelings left in cradles. Annwn-and-mist framing.', creatureTraditionByTier: { complicating: ['changelings', 'cyhyraeth (lesser banshee-figure)'], significant: ['gwyllgi (black hound)', 'ceffyl dŵr (water horse)', 'gwrachod (witches of the high passes)'], scary: ['afanc (lake-monster of the deep mere)', 'cŵn annwn', 'brenin llwyd (the grey king of the mists)', 'Tylwyth Teg in court force'] }, materialTradition: 'peat, bog water, silver tarnish, hawthorn sap, cold stone condensation, slate dust, lichen-stained granite' },
  { prefix: 'Middle-Welsh-inspired',         descriptor: 'Middle-Welsh-inspired: Mabinogion-era Welsh, soft consonants (ll, dd, ch), mythic-poetic register, fey-folk tradition', deityMode: 'active-engagement', creatureTradition: 'Mabinogion-tradition threats: afanc, cŵn annwn, the Twrch Trwyth (the great boar with the comb and razor between his ears), the questing beast, addanc-kin in the deep water, gwiber-serpents, the Tylwyth Teg of the deep wood and their courts, the wraith-armies of Annwn, the changeling-corrupted heirs. The Otherworld is geographically near and politically engaged.', creatureTraditionByTier: { complicating: ['changeling-corrupted heirs', 'lesser gwiber-serpents'], significant: ['gwiber-serpents', 'questing beast', 'Tylwyth Teg of the deep wood'], scary: ['Twrch Trwyth', 'afanc', 'cŵn annwn', 'addanc-kin in the deep water', 'wraith-armies of Annwn'] }, materialTradition: 'peat, bog water, silver tarnish, hawthorn sap, cold stone condensation, slate dust, lichen-stained granite' },
  { prefix: 'Irish-inspired',                descriptor: 'Irish-inspired: Gaeilge phonetics, fey-folk register, sí-tradition', deityMode: 'active-engagement', creatureTradition: 'Irish folkloric threats: púca (shape-changing trickster), banshee (bean sí, presaging death), dullahan (the headless rider with a whip of spine), abhartach (the undying tyrant who must be buried head-down), each-uisce (water-horse that drowns its rider), leannán sí (fairy-lover that consumes the beloved), dobhar-chú (water-hound, otter-shaped killer), sluagh (the host of the unforgiven dead), changelings. Sí-mound dungeons; the Otherworld pressing through.', creatureTraditionByTier: { complicating: ['changelings', 'lesser púca'], significant: ['púca', 'banshee (bean sí)', 'each-uisce', 'dobhar-chú (water-hound)'], scary: ['dullahan', 'abhartach (undying tyrant)', 'leannán sí', 'sluagh'] }, materialTradition: 'peat, bog water, silver tarnish, hawthorn sap, cold stone condensation, river-stones, oak-gall ink' },
  { prefix: 'Old-Irish-inspired',            descriptor: 'Old-Irish-inspired: pre-modern Gaeilge phonetics, Mythological Cycle register, sí-tradition', deityMode: 'active-engagement', creatureTradition: 'Mythological-Cycle threats: fomóraigh (chaos-giants of the deep sea, one-eyed and misshapen), púca, banshee, dullahan, each-uisce, leannán sí, sluagh, the kindred of Balor (single-eyed slayers), draoithe (corrupted druid-figures), abhartach, dobhar-chú, the children of Lir-coded changelings. Pre-Christian framing: the Otherworld is the older order, not folklore-as-survival.', creatureTraditionByTier: { complicating: ['children-of-Lir-coded changelings', 'lesser púca'], significant: ['púca', 'banshee', 'each-uisce', 'dobhar-chú', 'draoithe (corrupted druids)'], scary: ['fomóraigh (chaos-giants of the deep sea)', 'kindred of Balor', 'dullahan', 'abhartach', 'sluagh in host'] }, materialTradition: 'peat, bog water, silver tarnish, hawthorn sap, cold stone condensation, river-stones, oak-gall ink' },
  { prefix: 'Old-Occitan-inspired',          descriptor: 'Old-Occitan-inspired: troubadour register, courtly love poetry, refined Mediterranean aesthetic', creatureTradition: 'Occitan-bestiary threats: drac (river-dragon of the troubadour cities), basilisc (cockatrice of the cathedral cloister), gargoyles animated by old oaths, the cathar-coded heretic-spirits hunted by inquisitorial wraiths, the courtly-romance bestiary (manticore, amphisbaena, wyvern of the romance), the lovers-cursed-into-beasts of the courtly tradition. Cathedral-and-romance framing.', creatureTraditionByTier: { complicating: ['lesser gargoyles', 'cathar-coded heretic-spirits'], significant: ['basilisc', 'drac (river-dragon, lesser)', 'lovers-cursed-into-beasts'], scary: ['drac (major river-dragon)', 'manticore of the romance', 'amphisbaena', 'wyvern of the courtly tradition'] }, materialTradition: 'stained glass, beeswax candles, vellum, gold-thread, basilic-blood vermilion, cedar incense, gilt-illuminated parchment' },

  // Ancient extinct-religion Mediterranean traditions. Non-protected
  // (no living-community appropriation standing). Public-domain deity
  // and historical-figure names CAN appear directly, overriding the
  // generator's default invent-fictional rule for these registers.
  // Descriptors run longer than the Western-canonical entries to give
  // the LLM both phonological signal and grounded material-culture
  // specificity — these traditions are less embedded in default-fantasy
  // training than Latin / Greek / Norse, so the prompt does the
  // teaching.
  {
    prefix: 'Mesopotamian-inspired',
    descriptor: 'Mesopotamian-inspired: ancient Sumerian / Akkadian / Babylonian register. Phonology uses theophoric compounds (Bel-, Nabu-, Nin-, Shamshi-, Marduk-, Ashur-) and characteristic Akkadian -u / -um endings; Sumerian draws on -lugal / -en honorifics. Material culture is ziggurats, lapis-lazuli inlay, cuneiform tablets, cedar from the high mountains, reed boats, palm-wine, irrigation canals, baked-brick walls. Public-domain historical figures (Gilgamesh, Enkidu, Sargon, Hammurabi, Nebuchadnezzar) and public-domain texts (the Gilgamesh epic, the Enuma Elish) can appear directly. Real deities (Marduk, Ishtar, Anu, Enki, Tiamat, Nergal, Ereshkigal) are authorized for SPARING historical-mythological reference per the deity-handling block — see that block for the usage rule.',
    creatureTradition: 'Mesopotamian mythological threats: ūtukku (vengeful ghost-demons of the unburied dead), edimmu (restless dead of those wronged), gallu (underworld-demons dragging souls down), mušḫuššu (the snake-dragon of Marduk), lamashtu (child-stealing demoness), asakku (disease-bringing spirits), lilītu (night-demonesses), pazuzu-figures (wind-demons, paradoxically protective against lamashtu), girtablilu (scorpion-men), apsû-spawn from the deep waters, anzû (the storm-bird thief of tablets-of-fate). Ziggurat-and-canal framing.',
    creatureTraditionByTier: {
      complicating: ['asakku (disease-bringing spirits)', 'lilītu (night-demonesses)', 'lesser edimmu'],
      significant:  ['edimmu', 'gallu (underworld-demons)', 'girtablilu (scorpion-men)', 'lamashtu (lesser)'],
      scary:        ['ūtukku', 'mušḫuššu (Marduk\'s snake-dragon)', 'pazuzu-figures', 'apsû-spawn', 'anzû (storm-bird)'],
    },
    materialTradition: 'bitumen, fired clay, lapis lazuli, salt, copper verdigris, palm resin, baked brick, cuneiform-inscribed tablets',
    deityMode: 'active-engagement',
    // Real authentic epithets drawn from Mesopotamian texts (Enuma
    // Elish, Hammurabi's hymns, royal inscriptions, the Erra Epic).
    // Mixed formats — some are attested titles, some are common
    // formal epithets, some are domain-attribute phrases. Using
    // real-tradition epithets is itself a form of sparing engagement:
    // the epithet evokes the deity without naming them directly, in
    // the same idiom the culture itself used.
    deityEpithets: [
      'Lord of Fifty Names',          // Marduk, Enuma Elish
      'Bull-Calf of the Sun',         // Shamash imagery
      'Queen of Heaven',              // Ishtar / Inanna
      'Lady of Battles',              // Ishtar
      'the Morning Star',             // Ishtar (Venus)
      'Father of the Gods',           // Anu
      'the Just Judge',               // Shamash
      'the Cunning One',              // Enki / Ea
      'the Merciful Lord',            // common Marduk epithet
      'Lord of the Wide Earth',       // Enlil
    ],
  },
  {
    prefix: 'Phoenician-Punic-inspired',
    descriptor: 'Phoenician-Punic-inspired: ancient Mediterranean sea-trading register, Canaanite-family phonology with -baal / -melek / -bal / -shem compounds and characteristic doubled consonants. SCOPING: this register produces Phoenician-flavored FANTASY settings that GMs can drop into their own worlds, NOT historical fiction about ancient Tyre/Sidon/Carthage. Characters LIVE in constructed fantasy settings; real cultural patterns are TEXTURE, real historical specifics are NOT setting material. Cultural texture (use freely): purple-dye works with murex vats, cedar-built bireme ships, alphabet-inscribed bronze, salt-and-fish trade, silver shekel coinage, suffete magistrate system, council-of-elders governance, glass-blowing, the general trade-pattern of distant silver routes. Real deities (Baal, Tanit, Melqart, Astarte, Eshmun, Yamm, Baal-Hammon) may appear ONLY as occasional historical-mythological references in lore — never as the active patron deities of the setting; see the deity-handling block. PROHIBITED — do NOT use these directly: real historical figures as named characters or referenced ancestors (Hannibal Barca, Hamilcar, Hasdrubal, Dido, Pygmalion, Hiram, Mago, the Suffetes of specific historical periods); real historical events (the Punic Wars, Battle of Zama, sack of Carthage, the Barcid invasion); real geographic anchors as direct settings, neighbors, or trade routes (Tyre, Sidon, Carthage, Utica, Tarshish, the Punic Mediterranean coast, Numidia, Iberia-as-Tarshish). Construct fantasy place names using the register\'s phonological patterns (e.g., -baal / -melek / -shem compounds, doubled consonants) and use generic terms ("the distant silver coast," "the inland confederacy," "the war-elephant lands") for trade partners and neighbors rather than naming real ones.',
    creatureTradition: 'Phoenician-Punic-flavored threats lean sea-and-underworld: tannin (the great sea-serpents of the deep), lilim (night-things in the lonely places), the spawn of Yamm (chaos-coiled sea-children), the rephaim-coded restless royal dead in their funerary vaults, the murex-bleeding sea-things that crawl out of dye-vats gone wrong, the dwellers under Mot\'s dominion in the dry land. Sea-trade-and-underworld framing; trade-route lore as the dungeon\'s economic engine.',
    creatureTraditionByTier: {
      complicating: ['lesser lilim', 'lesser dye-vat sea-things'],
      significant:  ['rephaim-coded restless royal dead', 'murex-bleeding sea-things', 'lilim (major)'],
      scary:        ['tannin (great sea-serpent)', 'spawn of Yamm', "dwellers under Mot's dominion"],
    },
    materialTradition: 'murex purple-dye, cedar-pitch, silver shekel, sea-salt, alphabet-inscribed bronze, glass, bitumen, smoked sailcloth',
    deityMode: 'active-engagement',
    // Real authentic epithets drawn from Ugaritic / Phoenician texts,
    // Punic inscriptions, and classical-author records of Phoenician
    // religious practice.
    deityEpithets: [
      'the Cloud-Rider',              // Baal, Ugaritic
      'Prince of the Sea',            // Yamm
      'King of the City',             // Melqart (literal meaning)
      'Lord of Healing',              // Eshmun
      'the Lady',                     // Tanit, principal title
      'Face of Baal',                 // Tanit
      'the Eighth',                   // Eshmun (one of eight gods of Sidon)
      'Lord of the Furnaces',         // Melqart, smith association
      'Queen of Heaven',              // Astarte (shared with Mesopotamian)
      'the Storm-Bull',               // Baal imagery
    ],
  },
  {
    prefix: 'Egyptian-inspired',
    descriptor: 'Egyptian-inspired (pharaonic period only): ancient Egyptian register, Middle and New Kingdom theophoric compounds (-amun, -ra, -hotep, -mose, -djer, -ankh) and -et / -mut feminine endings. Material culture is faience, lapis-and-carnelian inlay, papyrus reed-pens, palm-wine, alabaster, electrum, granite obelisks, linen sails on the great river, ankh and djed amulets, kohl, painted cedar coffins. Public-domain historical figures (Imhotep, Hatshepsut, Akhenaten, Nefertiti, Ramses, Thutmose, Senmut) can appear directly. Real deities (Ra, Isis, Osiris, Anubis, Thoth, Bastet, Sekhmet, Set, Hathor, Horus) are authorized for SPARING historical-mythological reference per the deity-handling block. AVOID Orientalist genre tropes regardless of mood: mummy-curse plotlines, evil-sorcerous-pharaoh framing, exotic-seductress characterizations, and pyramids-built-by-slaves backstories. Tomb-builders were paid workers; pharaohs are political figures, not horror antagonists; magic in this register is ritual-formal, not sinister-occult.',
    creatureTradition: 'Egyptian mythological threats: ammit (the devourer of unworthy souls), serpopards (the long-necked guardians of liminal places), apophis-coiled serpents (the chaos-serpent and his lesser kin), the serpents of the Duat (the night-river underworld), sehaqeq-figures (form-shifting demons of the funerary texts), akh gone wrong (the unrested ancestral dead), the bau (claiming-spirits of those denied proper rites), sphinx-guardians (the bound rid­dle-keepers), heka-corrupted constructs (servants of broken rites). NOT mummy-curse plots — Egyptian dungeons run on ritual-failure and chaos-incursion, not Orientalist horror.',
    creatureTraditionByTier: {
      complicating: ['sehaqeq-figures (form-shifting demons)', 'lesser heka-corrupted constructs', 'lesser bau'],
      significant:  ['akh gone wrong', 'bau (claiming-spirits)', 'serpopards', 'heka-corrupted constructs (major)'],
      scary:        ['ammit (devourer of unworthy souls)', 'apophis-coiled serpents', 'serpents of the Duat', 'sphinx-guardians'],
    },
    materialTradition: 'natron, bitumen, linen, alabaster dust, kohl, faience, lapis-and-carnelian inlay, papyrus reed',
    deityMode: 'active-engagement',
    // Real authentic epithets drawn from the Pyramid Texts, the Book
    // of the Dead, temple inscriptions, and personal stelae.
    deityEpithets: [
      'Falcon of the Two Horizons',   // Horakhty / Horus
      'Lady of the Sycamore',         // Hathor
      'Mistress of the West',         // Hathor / Isis
      'Foremost of the Westerners',   // Osiris (Khentyamentiu)
      'Lord of the Sacred Land',      // Anubis
      'He upon his Mountain',         // Anubis
      'the Green One',                // Osiris
      'Lady of Ten Thousand Names',   // Isis
      'Three Times Great',            // Thoth (Trismegistus)
      'the Red One',                  // Set
      'Lord of All',                  // Ra
      'She Who Loves Silence',        // Bastet / Sekhmet quiescent
    ],
  },
  {
    prefix: 'Etruscan-inspired',
    descriptor: 'Etruscan-inspired: pre-Roman Italian register from the central-Tyrrhenian civilization that preceded and tutored early Rome. Distinctive non-Indo-European phonology with -na / -nu / -uchnei / -etre / -ena suffixes, and characteristic doubled consonants. Material culture is bucchero blackware pottery, painted tomb frescoes, bronze hand-mirrors with engraved scenes, iron weaponry, terracotta sculpture, gold-granulation jewelry, divination through liver-reading (haruspicy) and lightning-observation (fulgury). Public-domain historical figures (Tarquinius Priscus, Lars Porsena, Vel Saties, Tanaquil, the haruspex priest-class) can appear directly. Real deities (Tinia, Uni, Menrva, Voltumna, Aita, Vanth, Charun) are authorized for SPARING historical-mythological reference per the deity-handling block.',
    creatureTradition: 'Etruscan funerary-tradition threats: Tuchulcha (the underworld attendant with snake-tipped hair and a hawk\'s beak), Charun-figures (mallet-wielding death-attendants), Vanth (winged underworld guides turned hostile), lasae (lesser death-attendants), mantus-shades (the underworld\'s mid-rank dead), haruspex-prophesied unrest (omens given form), the lightning-touched things called up by fulgury gone wrong, the painted-tomb fresco-figures stirring from their walls. Necropolis-and-haruspex framing.',
    creatureTraditionByTier: {
      complicating: ['lasae (lesser death-attendants)', 'mantus-shades (lesser)', 'lesser fresco-figures'],
      significant:  ['mantus-shades (major)', 'haruspex-prophesied unrest', 'painted-tomb fresco-figures'],
      scary:        ['Tuchulcha', 'Charun-figures', 'Vanth gone hostile', 'lightning-touched fulgury-things'],
    },
    materialTradition: 'bucchero blackware, bronze mirror, terracotta, painted plaster, gold-granulation, fulgurite, haruspex-bronze, sheep-liver clay model',
    deityMode: 'active-engagement',
    // Etruscan deity-literature is largely lost (the Etruscan corpus
    // beyond inscriptions doesn't survive). Epithets below mix
    // iconographically-attested attributes (the Bolt-Hurler for Tinia
    // who threw lightning, the Hammer-Bearer for Charun who carried a
    // mallet, the Winged Watcher for Vanth who had eyes on her wings)
    // with descriptive forms grounded in the haruspex divination
    // practice. Less directly attested than the Mesopotamian /
    // Egyptian lists; expand here when better sources surface.
    deityEpithets: [
      'the Bolt-Hurler',              // Tinia, lightning-thrower
      'the Hammer-Bearer',            // Charun, mallet attribute
      'the Winged Watcher',           // Vanth, eye-feathered wings
      'Queen of the Bronze Mirror',   // Turan / Uni, mirror dedications
      'the Twelvefold Sky',           // Etruscan 16-region cosmos abbreviated
      'Lord of the Striking Heaven',  // Tinia, sky god
      'the Door-Keeper of the Necropolis',
      'the Veiled One',               // Vanth funerary aspect
    ],
  },

  // Protected registers (catchall-tier — density rules apply, no curated pool)
  // Deity-mode classification: most protected catchall registers cover
  // living religious traditions and are 'restricted' (no real deity
  // names anywhere). The Arabic register (per-file, see `./arabic.mjs`)
  // is protected and restricted-mode; its previous combined form
  // (`Arabic/Persian-inspired`) and the standalone `Persian-inspired`
  // entry were both removed when the consolidated Arabic file landed.
  // Persian-specific handling will return as its own per-file register
  // when it gets a pool and cultural notes.
  { prefix: 'Caucasian-inspired',            descriptor: 'Caucasian-inspired: mountain-peoples register drawing on Georgian/Ossetian/Chechen phonetics',                                                                       protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Atlas-Berber-inspired',         descriptor: 'Atlas-Berber-inspired: Amazigh register, North African mountain-craft tradition',                                                                       protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Pamir-inspired',                descriptor: 'Pamir-inspired: high-Central-Asian mountain register, Persian-adjacent',                                                                                                protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Japanese-inspired',             descriptor: 'Japanese-inspired: clean syllables, natural imagery',                                                                                                                                                                                protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Chinese-inspired',              descriptor: 'Chinese-inspired: tonal, philosophical',                                                                                                                                                                                              protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Korean-inspired',               descriptor: 'Korean-inspired: structured, balanced',                                                                                                                                                                                                protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Mongolian-inspired',            descriptor: 'Mongolian-inspired: bold, sweeping',                                                                                                                    protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Tibetan-inspired',              descriptor: 'Tibetan-inspired: aspirated, contemplative',                                                                                                            protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Hindi/Sanskrit-inspired',       descriptor: 'Hindi/Sanskrit-inspired: melodic, ceremonial',                                                                                                          protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Thai-inspired',                 descriptor: 'Thai-inspired: tonal, flowing',                                                                                                                                                                                                            protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Hawaiian-inspired',             descriptor: "Hawaiian-inspired: 'Ōlelo Hawai'i phonetics with okina and macron, place-coded",                                                                       protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Akan-inspired',                 descriptor: 'Akan-inspired: day-name traditions, Ghanaian register',                                                                                                 protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Igbo-inspired',                 descriptor: 'Igbo-inspired: tonal Nigerian register',                                                                                                                                                                                                  protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Swahili-inspired',              descriptor: 'Swahili-inspired (East African): rolling rhythm',                                                                                                                                                                                          protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Maya-inspired',                 descriptor: 'Maya-inspired: glottal stops and aspirated consonants, day-name structures',                                                                            protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Aztec/Nahuatl-inspired',        descriptor: 'Aztec/Nahuatl-inspired: tl-clusters and compound words, deity-and-place naming',                                                                        protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Lakota-inspired',               descriptor: 'Lakota-inspired: descriptive compound names, sacred-natural register',                                                                                  protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },

  // Fictional fantasy without curated pools (universal-invent path)
  { prefix: 'Gnomish',                       descriptor: 'Gnomish: clever, playful, percussive phonology — doubled consonants, sibilant clusters, syllables that tick like clockwork. Compound shapes pair a tinker-verb-root (fizz, cog, gear, spring, tin, gizmo) with a mechanism-noun or whimsical suffix (-wocket, -worth, -berlin, -nipper, -spline). Derive fresh names from the phonology; do not copy from prior generations.', creatureTradition: 'gnomish dungeons run on the abandoned-laboratory ecology: clockwork constructs (sprung-wound, half-broken, still patrolling their last orders), animated mechanisms (the boiler that won\'t stop, the loom that weaves on its own), escaped tinker-creations (modified rats, doubled-tailed lab beasts, glow-fungi gone hostile), fizz-and-spark elementals (small bound elementals leaking from broken vessels), scrap-golems assembled from leftover parts, gear-haunts (the ghosts of failed prototypes), accidental homunculi from spilled experiments, and the badger / squirrel / mole familiars gone wild. Whimsical-not-grim — even the threats have a workshop-disaster quality.', creatureTraditionByTier: { complicating: ['glow-fungi gone hostile', 'modified rats', 'doubled-tailed lab beasts', 'lesser fizz-and-spark elementals'], significant: ['gear-haunts (failed-prototype ghosts)', 'accidental homunculi', 'fizz-and-spark elementals (major)', 'badger / squirrel / mole familiars gone wild'], scary: ['clockwork constructs (major)', 'scrap-golems (assembled from leftover parts)', "animated mechanisms (boiler-that-won't-stop, loom-that-weaves-on-its-own)"] }, materialTradition: 'gear grease, coal dust, brass filings, lumen residue, clockwork oil, glass-blown alembics, sprung copper wire' },
  { prefix: 'Technomagical',                 descriptor: 'Technomagical: clinical and theatrical naming — compound register-of-art names that pair an arcane-mechanical prefix (Arcana-, Aether-, Volt-, Spectro-, Chrono-, Magneto-, Helio-, Cryo-) with an industrial-or-mystical noun (forge, spire, cog, weave, vault, lattice, coil). Model-number suffixes (Mark IV, Type B, Series III) acceptable when context fits. Derive fresh names from the phonology; do not copy from prior generations.', creatureTradition: 'technomagical dungeons run on the arcanopunk laboratory: golem-iterations (Mark IV, Type B, Series III — model-numbered constructs), spell-engine constructs, voltaic and aetheric elementals leaked from containment, chrono-displaced beasts (creatures pulled from elsewhere in time), modified familiars (cats with brass throats, ravens with clockwork eyes), aetheric ghosts of failed experiments, security-warden golems still running their last directive, the contained-but-leaking experimental subjects in their numbered cells. Clinical-and-theatrical framing.', creatureTraditionByTier: { complicating: ['modified familiars (lesser)', 'lesser aetheric ghosts', 'maintenance-rank constructs'], significant: ['chrono-displaced beasts', 'modified familiars (major)', 'spell-engine constructs', 'aetheric ghost (major)'], scary: ['golem-iterations (Mark IV / Type B / Series III)', 'voltaic and aetheric elementals', 'security-warden golems', 'contained experimental subjects'] }, materialTradition: 'gear grease, coal dust, brass filings, lumen residue, clockwork oil, copper coils, aether-stained glass, numbered brass plaques' },
];

/**
 * Full register registry. Iteration order is preserved: minimal
 * registers first (Western-canonical, then catchall-protected, then
 * fictional non-curated), then per-file registers grouped by
 * provenance.
 */
export const ALL_REGISTERS = [
  ...minimalRegisters,
  // Pool-architecture protected
  yorubaRegister,
  andeanRegister,
  // Catchall protected with curated pool
  maoriRegister,
  arabicRegister,
  // Fictional fantasy with curated pool
  elvenRegister,
  dwarvenRegister,
  draconicRegister,
  goblinoidRegister,
  orcishRegister,
  aberrantRegister,
  abyssalRegister,
  infernalRegister,
  primordialRegister,
];

/**
 * Registers that have a register descriptor. Most entries qualify;
 * the filter is defensive against any entry that lacks one (none do
 * currently — Dwarven was the last holdout, promoted in 2026-05).
 * Iteration of this list feeds `registerList` and `allLanguageRegisters`
 * downstream.
 */
export const REGISTERS_WITH_DESCRIPTOR = ALL_REGISTERS.filter(r => typeof r.descriptor === 'string');

/**
 * Convenience finder used by consumers that look up a register by
 * prefix-startsWith (the rest of the register machinery's lookup
 * convention).
 */
export function findRegisterByPrefix(selectedRegister) {
  if (typeof selectedRegister !== 'string') return null;
  return REGISTERS_WITH_DESCRIPTOR.find(r => selectedRegister.startsWith(r.prefix)) || null;
}
