/**
 * Arabic-inspired register — consolidated single-file definition.
 *
 * Surface label "Arabic-inspired" with substantive scope locked to the
 * 6th-century Jahiliyyah period (roughly 500-622 CE): tribal Bedouin
 * culture of Hejaz/Najd, settled mercantile-tribal culture of the
 * Hejaz cities, the South Arabian kingdoms (Saba, Himyar, Qataban,
 * Hadramaut), the Persian Gulf pearl-diving cultures, and the
 * Nabataean/Ghassanid Christian-Arab north. Anything after the Hijra
 * of 622 CE is out of scope — the cultural-notes prose enforces this
 * even though the surface label doesn't say "pre-Islamic." Arabian
 * Nights material (Baghdad bazaars, sultans, viziers, magic carpets,
 * genies in bottles, harems in the Hollywood sense) is Islamic-era
 * and out of scope despite being what training data reaches for by
 * default.
 *
 * The wrinkle absent from the Tier 1 ancient registers: this
 * register's polytheistic religion is extinct as worship, but its
 * vocabulary lives on theologically inside Islam, which has roughly
 * 1.9 billion contemporary adherents. The Quran explicitly names
 * Wadd, Suwa', Yaghuth, Ya'uq, and Nasr as false idols (Surah Nuh
 * 71:23). The Three Goddesses (al-Lat, al-Uzza, Manat) are the
 * subject of one of the most theologically fraught episodes in
 * Islamic history (the so-called "Satanic Verses" incident). Hubal
 * was the chief idol of the Kaaba destroyed at the Hijra. These
 * deities are NOT theologically neutral the way Tiamat or Marduk
 * are. The register uses RESTRICTED deity handling rather than the
 * active-engagement extinct-religion epithet pattern: no fictional
 * patrons named after them, constructed alternatives only for active
 * religious life.
 *
 * Whitelist scope is `'all-characters'` — every named character in
 * the output (primary and secondary) must come from the curated
 * pool. The looser `'primary'` default lets the LLM construct
 * secondary names freehand, which reliably produces Islamic-coded
 * vocabulary even when individual names look invented. This is the
 * pilot register for the strict scope.
 *
 * Anti-cliché counter-steering: training data tagged "Arabic" is
 * heavily contaminated by Arabian Nights material (Baghdad-era,
 * Islamic, post-622) and modern Middle Eastern framing. The
 * WESTERN-FANTASY-AND-ISLAMIC-ERA-DEFAULTS-TO-AVOID block does the
 * heaviest lifting in this register — pulling the model toward
 * 6th-century material is harder than for any of the Tier 1 ancient
 * registers because the orientalist pull is so strong.
 *
 * The previous combined `Arabic/Persian-inspired` register (older
 * inline minimal entry without protections) and the standalone
 * `Persian-inspired` register were both removed when this consolidation
 * landed. Persian-specific protected handling will return as its own
 * file when it gets its own pool and cultural notes.
 */

export const arabicRegister = {
  prefix: 'Arabic-inspired',
  descriptor: 'Arabic-inspired: 6th-century pre-Islamic tribal Bedouin and oasis kingdoms, pre-Quranic vocabulary',
  protected: true,
  promptArchitecture: 'catchall',

  /**
   * Laqab-style descriptive epithets, kunya-style honorifics (Abu X /
   * Umm X), and Dhu/Dhat ("possessor of X") constructions following
   * attested pre-Islamic Arabic naming patterns. Entries are
   * STRUCTURALLY bynames (descriptive epithets or honorifics), not
   * given names — which matches how many pre-Islamic figures are
   * actually known to history (al-A'sha "the night-blind," al-Khansa
   * "the snub-nosed," Abu Lahab "father of the flame"). Use pool
   * entries directly, unmodified — no honorifics added, no further
   * compounding, no extraction of pool-entry parts to recombine.
   *
   * Animal + geographic compounds (Asad al-Sahra "Lion of the
   * Wilderness," Saqr al-Najd "Falcon of Najd") are the most
   * distinctive and lowest-collision-risk pattern. Simpler patterns
   * (Sayf al-X, single laqab al-X) collide more readily with attested
   * historical figures and are flagged inline for verification.
   *
   * Avoids:
   *   - Names of attested pre-Islamic poets (Imru' al-Qais, Antarah,
   *     Tarafa, Zuhayr, Labid, al-Khansa, Hatim al-Tai, al-A'sha)
   *   - Names significant in early Islamic history (Muhammad, Ahmad,
   *     Ali, Fatima, Aisha, Khadija, Hussein, Hassan, Umar, Abu
   *     Bakr, Uthman, etc.)
   *   - Theophoric constructions using pre-Islamic deity names (Abd
   *     Manat, Wahb al-Lat, Zayd Manat) — religious-coded
   *   - Theophoric constructions using Islamic divine names
   *     (Abd-Allah, Abd al-Rahman, Abd al-Karim, etc.) — both
   *     anachronistic and theologically charged
   *   - The 99 Names of Allah used as laqab (al-Rahman, al-Karim,
   *     al-Hakim, al-Quddus, al-Aziz, al-Sabur) — these read as
   *     divine reference, not character description
   *   - Common modern Arab given names — anachronistic AND function as
   *     primary identity markers in modern Muslim communities
   */
  characterPool: [
    // Animal + geographic compounds — most distinctive pattern
    'Asad al-Sahra',     // Lion of the Wilderness
    'Asad al-Wadi',      // Lion of the Valley
    'Asad al-Jabal',     // Lion of the Mountain
    'Saqr al-Najd',      // Falcon of Najd
    'Saqr al-Layl',      // Falcon of the Night
    'Saqr al-Riih',      // Falcon of the Wind
    'Dhi\'b al-Hajar',   // Wolf of the Stone
    'Dhi\'b al-Khala',   // Wolf of the Empty Land
    'Fahd al-Sahra',     // Cheetah of the Wilderness
    'Ghazal al-Wadi',    // Gazelle of the Valley
    'Nimr al-Jabal',     // Leopard of the Mountain
    'Faras al-Riih',     // Mare of the Wind
    'Naqa al-Sahra',     // She-Camel of the Wilderness

    // Weapon + geographic compounds — VERIFY for collisions with
    // historical sword-names and Islamic-era laqab patterns
    'Sayf al-Sahra',     // Sword of the Wilderness — VERIFY
    'Rumh al-Najd',      // Spear of Najd
    'Qaws al-Hilal',     // Bow of the Crescent

    // Kunya-style (Abu X / Umm X) — "father of X" / "mother of X"
    'Abu al-Saqr',       // Father of the Falcon
    'Abu al-Rumh',       // Father of the Spear
    'Abu al-Tha\'lab',   // Father of the Fox
    'Abu al-Akhdar',     // Father of the Green One
    'Umm al-Nujum',      // Mother of the Stars
    'Umm al-Hilal',      // Mother of the Crescent
    'Umm al-Sabah',      // Mother of the Dawn
    'Umm al-Layli',      // Mother of the Nights

    // Dhu / Dhat ("possessor of X") — distinctive pre-Islamic
    // construction (compare Dhu al-Qarnayn, Dhu al-Faqar from
    // attested sources — these specific compounds are avoided)
    'Dhu al-Khimar',     // He of the Headcloth — VERIFY
    'Dhat al-Khalkhal',  // She of the Anklet
    'Dhat al-Nujum',     // She of the Stars
    'Dhu al-Suyuf',      // He of the Swords

    // Laqab-style (al-X) — single descriptive epithet, structurally
    // matches al-A'sha / al-Khansa pattern
    'al-Akhdar',         // the Green One
    'al-Tayyar',         // the Flyer
    'al-Sariy',          // the Night-Traveler — VERIFY
    'al-Asmar',          // the Brown One
  ],

  characterPoolStrictness: 'mandatory',

  /**
   * Whitelist scope — controls which character names the pool governs.
   *
   *   'primary' (default, omitted)
   *     The pool supplies the lore's single named character. Secondary
   *     characters can be named freehand in the register's morphology
   *     OR described by role.
   *
   *   'all-characters'
   *     ALL named characters in the output (primary + every secondary)
   *     must come from the pool. The LLM is forbidden from inventing
   *     any register-language name. Secondary characters either draw
   *     additional entries from the same pool, or get described by
   *     role only. This is the protective architecture for registers
   *     where freehand name construction reliably surfaces culturally-
   *     loaded vocabulary (Islamic-coded terms in Arabic-flavored
   *     freehand, even when individual production names look invented).
   *     See the catchall-prompt builder for prompt-side enforcement.
   */
  whitelistScope: 'all-characters',

  /**
   * Restricted-mode deity handling. The pre-Islamic Arabian
   * polytheistic religion is extinct as worship, but the specific
   * named deities carry contemporary Islamic theological weight that
   * the typical extinct-religion active-engagement pattern does not
   * respect. Treat as: no fictional patrons or character epithets
   * invoking them, no use as item-name components, no item-blessing
   * frames. Constructed alternative deities only for active religious
   * life (described by epithet — "the desert sky-father," "the
   * morning-star goddess of the eastern tribes"). Occasional
   * historical-mythological reference in lore (similar to how
   * Mesopotamian gods can appear as historical reference but not as
   * fictional character patrons) is acceptable for less Quranically-
   * named deities, but Wadd / Suwa' / Yaghuth / Ya'uq / Nasr are
   * specifically Quranic and should be omitted entirely.
   */
  deityMode: 'restricted',

  /**
   * Pre-Islamic Arabian deities the LLM must NEVER use as fictional
   * patrons, epithets, or item references. Ordered roughly by
   * theological charge in contemporary Islam: the Three Goddesses and
   * Hubal at the top (most LLM stereotype pull, most theologically
   * charged), then the Quranically-named idols, then south Arabian
   * and other named pre-Islamic deities.
   *
   * The word "Allah" is on the list despite Allah being attested as a
   * pre-Islamic high god in Mecca. The contemporary theological
   * weight of the word makes the historically-accurate use
   * indistinguishable from the Islamic use to a modern reader. Use
   * "the high god of the tribe," "the desert sky-father," or
   * constructed alternatives instead.
   */
  deityAvoidList: [
    // The Three Goddesses ("Daughters of Allah") — highest charge
    'al-Lat', 'Allat', 'Al-Lat',
    'al-Uzza', 'Al-Uzza', 'Uzza',
    'Manat', 'Manah',
    // Chief Meccan deity
    'Hubal',
    // Quranically-named pre-Islamic idols (Surah Nuh 71:23)
    'Wadd', 'Suwa\'', 'Suwa', 'Yaghuth', 'Ya\'uq', 'Yauq', 'Nasr',
    // South Arabian chief deities
    'Almaqah', 'Athtar', 'Amm',
    'Haubas', 'Dhat-Himyam', 'Dhat-Badan',
    // Other named pre-Islamic deities
    'Dushara', 'Manaf', 'Quzah', 'Sa\'d', 'Sad',
    // Islamic divine name — never use, even in pre-Islamic historical sense
    'Allah',
  ],

  /**
   * Sacred or theologically-charged terms that MUST NOT appear as
   * components of item names. Two distinct categories combined here:
   *
   * (1) Quranic / Islamic-theological vocabulary. DeepSeek will reach
   *     for these because its "Arabic" training data is dominated by
   *     Islamic-era material. These are anachronistic for the period
   *     AND theologically charged for contemporary Muslims.
   *
   * (2) Pre-Islamic religious vocabulary that survived into Islam
   *     with heavy theological weight. These have pre-Islamic
   *     origins but their Islamic resonance dominates contemporary
   *     usage to the point where the original pre-Islamic sense is
   *     no longer accessible to a modern reader.
   *
   * Distinct from the Maori register's cultural-vocabulary fence-off:
   * there, the avoid-list protected sacred Te Reo from being used as
   * fictional decoration. Here, the avoid-list protects against
   * Islamic-vocabulary contamination of a pre-Islamic register —
   * different failure mode (period pollution rather than sacred-as-
   * decoration), same architectural shape.
   */
  itemNameAvoidList: [
    // Islamic divine name and 99 Names of Allah commonly used as flavor
    'Allah', 'allah',
    'Rahman', 'rahman',
    'Rahim', 'rahim',
    'Malik', 'malik',
    'Quddus', 'quddus',
    'Karim', 'karim',
    'Hakim', 'hakim',
    'Sabur', 'sabur',
    'Hadi', 'hadi',
    'Aziz', 'aziz',

    // 99 Names of Allah — al-X form. Production output produced
    // "Qaws al-Samad" because the cultural-notes directive listed
    // these as prose but the LLM didn't apply the categorical rule.
    // Structural enumeration here is the backup the directive needs.
    'al-Awwal', 'al-Akhir', 'al-Wahid', 'al-Ahad', 'al-Samad',
    'al-Hayy', 'al-Qayyum', 'al-Aliyy', 'al-Azim', 'al-Ghafur',
    'al-Wadud', 'al-Majid', 'al-Fattah', 'al-Alim', 'al-Latif',
    'al-Khabir', 'al-Halim', 'al-Shakur', 'al-Hafiz', 'al-Wakil',
    'al-Matin', 'al-Wali', 'al-Hamid', 'al-Mubdi', 'al-Muhyi',
    'al-Mumit', 'al-Qadir', 'al-Zahir', 'al-Batin', 'al-Muta\'ali',
    'al-Barr', 'al-Tawwab', 'al-Afuw', 'al-Ra\'uf', 'al-Jami',
    'al-Ghani', 'al-Nur', 'al-Badi', 'al-Baqi', 'al-Warith',
    'al-Qadim', 'al-Wahhab', 'al-Razzaq', 'al-Salam', 'al-Mu\'min',
    'al-Muhaymin', 'al-Jabbar', 'al-Mutakabbir', 'al-Khaliq', 'al-Basir',
    'al-Sami', 'al-Adl', 'al-Haqq', 'al-Mubin',

    // Islamic-period religious institutions and practices
    'masjid', 'mosque',
    'mihrab', 'minbar', 'minaret',
    'muezzin', 'adhan', 'salat',
    'qibla', 'jumu\'a',
    'madrasa', 'imam', 'ulama',
    'caliph', 'khalifa', 'sultan', 'vizier', 'wazir',
    'sharia', 'fiqh', 'sunnah', 'hadith',
    'zakat', 'sadaqa', 'sawm',
    'hajj', 'umrah', 'ihram',
    'kaaba', 'ka\'ba',
    'shahada', 'iman', 'islam',
    'ummah', 'jihad', 'fitna',
    'dhikr', 'du\'a', 'fatwa',
    'haram', 'halal', 'najis',
    'jannah', 'jahannam',
    'iblis', 'shaitan',
    'sufi', 'dervish', 'tariqa', 'sheikh', 'shaikh',

    // Primary Islamic identity markers — NEVER use as item-name
    // components. Surfaced after production output produced
    // "Sifr al-Muslimi" via the Arabic register.
    'Muslim', 'muslim',
    'Muslimi', 'muslimi',
    'Muslimin', 'muslimin',
    'Mu\'min', 'mu\'min',

    // Quranic vocabulary used as fictional name components — same
    // origin as the Muslimi surfacing above.
    'Ashrar', 'ashrar',
    'Sifr', 'sifr',

    // Common Arabic Islamic phrases used as flavor
    'bismillah', 'alhamdulillah', 'inshallah', 'insha\'allah',
    'mashallah', 'masha\'allah',
    'subhanallah', 'astaghfirullah',

    // Pre-Islamic vocab now theologically dominated by Islamic usage
    'jinn', 'jinni', 'djinn',
    'malak', 'angel',
  ],

  /**
   * LLM-facing register guidance. Plumbed into the catchall prompt
   * by `buildCatchallPromptBlock` — these sections set the cultural
   * frame the LLM works within. Voice is direct second-person
   * imperative: tell the LLM what to do, not describe how the LLM
   * behaves.
   */
  culturalNotes: `Pre-Islamic Arabian (Jahiliyyah-era) is the tribal Bedouin, oasis-mercantile, and South Arabian kingdom culture of the Arabian Peninsula in roughly 500-622 CE, before the rise of Islam. Engage with this period specifically: tribal poetry recited at the great market of Ukaz, caravan trade in frankincense and myrrh, polytheistic religious life at sacred stones and tribal precincts, the honor culture of muruwwah, and the complex sedentary civilizations of Yemen (Saba, Himyar, Qataban, Hadramaut). Do NOT engage with Arabian Nights material (Baghdad-era Islamic, 9th century onward), the Caliphate, modern Middle Eastern contexts, or Islamic religious life — these are familiar but anachronistic and culturally inappropriate for this register.

PERIOD SCOPE. The window is 6th-century pre-Hijra Arabian Peninsula. Anything after the Hijra of 622 CE — caliphs, viziers, sultans, mosques, the Five Pillars of Islam, hajj as Islamic ritual, Sufi mystics, dervishes, magic carpets, genies in bottles, harems in the Hollywood sense — is out of scope. Region scope spans Hejaz (western desert and the cities of Mecca, Yathrib, Ta'if), Najd (central plateau), Yemen (south Arabia with monsoon agriculture and stone-built cities like Sana'a and Ma'rib), Hadramaut (frankincense country), eastern Arabia and the Persian Gulf pearl-diving culture, and the Nabataean and Ghassanid Christian Arab north. Pre-Islamic Arabia was not monolithic — it had sedentary and nomadic populations, multiple religions (polytheism, Christianity in the north and at Najran, Judaism in Yathrib and Yemen, Zoroastrian influence in the east), and three or four distinct regional cultures. Do NOT flatten these into a single "Arabian" texture.

NAMING SCOPE. Character names follow laqab-style descriptive epithets (al-X "the X-one"), kunya-style honorifics (Abu X / Umm X "father of X" / "mother of X"), and Dhu/Dhat constructions ("he/she of X"). These are STRUCTURALLY bynames rather than given names — matching how many pre-Islamic figures are known to history (al-A'sha "the night-blind," al-Khansa "the snub-nosed," Abu Lahab "father of the flame"). Use whitelist entries directly, unmodified — do NOT add honorifics, do NOT compound further, do NOT extract parts of pool entries to recombine. Do NOT use: real names of attested pre-Islamic poets (Imru' al-Qais, Antarah, Tarafa, Zuhayr, Labid, al-Khansa, Hatim al-Tai); names significant in early Islamic history (Muhammad, Ahmad, Ali, Fatima, Aisha, Khadija, Hussein, Hassan, Umar, Abu Bakr, Uthman); theophoric constructions using pre-Islamic deity names (Abd Manat, Wahb al-Lat); theophoric constructions using Islamic divine names (Abd-Allah, Abd al-Rahman, Abd al-Karim); the 99 Names of Allah used as laqab (al-Rahman, al-Karim, al-Hakim — these read as divine reference, not character description); or common modern Arab given names — they are both anachronistic for the period AND serve as primary identity markers in modern Muslim communities. These rules apply to ALL characters mentioned anywhere in the output — primary character names governed by the whitelist, AND secondary characters named in lore prose (apprentices, masters, ancestors, historical figures, named relatives, named adversaries). Production output produced 'Yathrib bint Karif' (Yathrib is the pre-Islamic name of Medina, a sacred Islamic site) and 'Faridah bint Qays' (Faridah is a common modern Arab given name; Qays is associated with named pre-Islamic figures). Secondary lore characters get the same scope as the primary character — laqab-style epithets, kunya-style honorifics, or Dhu/Dhat constructions; no real place-names as personal names; no modern Arab given names; no theophoric constructions; no real pre-Islamic poet names.

SACRED-BOUNDARY COMMITMENT. The pre-Islamic Arabian polytheistic religion is extinct as worship, but its named deities carry contemporary Islamic theological weight that ordinary extinct-religion handling does not respect. The Quran explicitly names five pre-Islamic idols as false gods (Wadd, Suwa', Yaghuth, Ya'uq, Nasr in Surah Nuh 71:23). The Three Goddesses (al-Lat, al-Uzza, Manat) are the subject of one of the most theologically fraught episodes in Islamic history. Hubal was the chief idol of the Kaaba destroyed at the Hijra. Do NOT name fictional patrons after these deities. Do NOT use them as item-name components. Do NOT use them in character epithets. Do NOT frame items as "blessed by [deity-name]." For active religious life, construct alternative deities described by epithet — "the desert sky-father," "the morning-star goddess of the eastern tribes," "the keeper of the sacred precinct." The word "Allah" MUST NOT appear in any context, including the historically-attested pre-Islamic sense in which Allah was worshipped as a high god in Mecca — the contemporary theological weight makes the historically-accurate use indistinguishable from the Islamic use to a modern reader. Substitute "the high god of the tribe," "the desert sky-father," or constructed alternatives. The 99 Names of Allah (al-Awwal, al-Akhir, al-Wahid, al-Ahad, al-Samad, al-Hayy, al-Qayyum, al-Aliyy, al-Azim, al-Ghafur, al-Wadud, al-Majid, al-Fattah, al-Alim, al-Latif, al-Khabir, al-Halim, al-Shakur, al-Hafiz, al-Wakil, al-Matin, al-Wali, al-Hamid, al-Mubdi, al-Muhyi, al-Mumit, al-Qadir, al-Zahir, al-Batin, al-Muta'ali, al-Barr, al-Tawwab, al-Afuw, al-Ra'uf, al-Jami, al-Ghani, al-Nur, al-Badi, al-Baqi, al-Warith — and many more) carry Islamic divine attribution even when used as item-name modifiers, place-name modifiers, or character laqab. Do not use 'al-' + any divine attribute as a name component. When an exalted-quality modifier is needed, substitute a non-theological descriptive ('the steadfast,' 'the ancient,' 'the unbroken') or a tribal/geographic anchor ('of the Banu Najd,' 'of the high-pass').

ENGLISH-FALLBACK FOR PLACES AND DEITIES. Real Islamic-sacred sites in the pre-Islamic Arabian peninsula carry contemporary religious significance and are off-limits as fictional anchors: Mecca, Medina/Yathrib, the Kaaba, Mount Hira, Mount Arafat, Mount Uhud, the Zamzam well, Mina, Muzdalifah. Other pre-Islamic historical sites (Sana'a, Ma'rib and its dam, Tarim, Petra, Palmyra, Hatra, the kingdoms of Saba and Himyar and Qataban and Hadramaut, the pearl-diving centers of Bahrain) may appear as occasional historical-mythological reference, but characters live in constructed primary settings. Render place names in English-descriptive form drawing on geographic and material specificity ("the basalt-cliff oasis," "the frankincense town," "the salt-flat market," "the broken-tower port") rather than as real place names. Render constructed deities, sacred precincts, and tribal genealogies in English-descriptive form ("the morning-star goddess of the eastern tribes," "the sacred stone of the high-pass," "the sons of the salt-bearer") rather than naming them in Arabic with real-sounding theophoric or sacred constructions. Use ONE Arabic-style character name + ONE Arabic-style item name per generation; everything else stays in culturally-grounded English.

META-CATEGORY LABELS — CURATOR-FACING ONLY, NEVER IN OUTPUT. The terms 'Arabian,' 'south Arabian,' 'Bedouin,' 'Nabataean,' 'Ghassanid,' 'Lakhmid,' 'Pre-Islamic,' 'Hejaz,' 'Najd,' 'Yemen' (used as a regional label), 'Hadramaut' (used as a regional label rather than as the named kingdom) appear throughout this guidance to orient you to the register's scope and substantive cultural context. These are CURATOR-meta terms used to teach you the register — they are NOT in-world vocabulary the lore should use. They MUST NOT appear in output prose. Substitute in-world descriptors:
- 'Arabian' → 'of the desert peoples,' 'of the southern lands,' or a specific tribal/geographic descriptor
- 'south Arabian' → 'of the southern kingdoms,' 'of the highland kingdoms,' 'of the frankincense lands'
- 'Bedouin' → 'tent-dwelling,' 'of the dune-pastures,' 'of the moving camps'
- 'Nabataean' / 'Ghassanid' / 'Lakhmid' → 'of the northern caravan-cities,' 'of the trade-roads between the kingdoms'
- 'Pre-Islamic' / 'Jahiliyyah' → 'of the old time,' 'before the unification of the tribes,' a specific tribal-era marker
- 'Hejaz' / 'Najd' / 'Yemen' (as regions) → 'the western desert,' 'the central plateau,' 'the southern monsoon-lands'
The distinction: SPECIFIC historical kingdoms (Saba, Himyar, Qataban, Hadramaut as the named kingdom) and SPECIFIC named sites (Sana'a, Ma'rib, Petra, Palmyra, Tarim) remain permissible as occasional historical-mythological reference per the rule above. BROAD regional, ethnic, and era labels are not. If you find yourself reaching for 'a south Arabian X' or 'a Bedouin Y' in output, substitute the in-world descriptor before continuing.

ITEM-NAMING VOCABULARY. When constructing an Arabic-style item name, reach for material, environmental, and craft vocabulary specific to 6th-century Arabia — sayf (sword, the pre-Islamic straight double-edged sword, NOT scimitar), rumh (spear), qaws (bow), nabl (arrow), turs (shield), khimar (headcloth), bisht (cloak), khanjar (dagger), naqa (she-camel), faras (horse), saqr (falcon), khayma (tent), wadi (valley), jabal (mountain), sahra (desert/wilderness), waha (oasis), nahar (river), bahr (sea), najm (star), hilal (crescent moon), shams (sun), qamar (moon), riih (wind), raml (sand), hajar (stone), lubban (frankincense), murr (myrrh), lu'lu' (pearl), dhahab (gold), fidda (silver), nuhas (copper), hadid (iron). The pre-Islamic Arabic sword was straight and double-edged — scimitars and curved blades are much later (Mamluk/Ottoman). Famous pre-Islamic swords had individual names with histories; surface that depth in item lore. Use 'vellum' or 'parchment' rather than 'papyrus' (Egyptian) for written items. Use 'souk' rather than 'bazaar' (Persian/Islamic-era) for market settings.

CREATURE SCOPING. Reach for in-period fauna and mythological creatures: Arabian oryx, sand cat, Nubian ibex, Arabian leopard, falcon (saqr), Arabian horse, camel, ostrich, gazelle, hyena, jerboa, viper, scorpion. Mythological creatures within scope: ghoul (a wilderness shape-shifter that lures travelers, pre-Islamic in origin), nasnas (a half-being of the deserts), hinn (wilderness spirit-beings, the muse-inspiration sense rather than the Islamic-cosmology sense), si'lat (female desert shape-shifters). Do NOT use creatures from other cultural contexts the LLM treats as 'vaguely Eastern': scarabs (Egyptian), sphinxes (Egyptian), manticores (Persian-Greek), rukh as the Sindbad-roc (Islamic-era Arabian Nights), Persian simurghs, djinn-in-bottles (Islamic-era Arabian Nights). Production output produced scarabs and manticores in pre-Islamic Arabian items — the LLM treats 'vaguely Eastern' as Arabian and it isn't.

FAVORED NARRATIVE FORMS. Item lore MUST follow ONE of the four narrative arcs below. The arc names what the lore is ABOUT — the central event of the item's history and the source of its weight. Pick the arc that best fits the item's mood and material; write freely within the arc's conceptual frame. Anything that doesn't fit one of these four shapes is not acceptable in this register — if the item's natural shape doesn't fit any arc, the register is mismatched and a different register should be chosen.

Tribal names, place names, and lineage eponyms use English-descriptive form per the ENGLISH-FALLBACK rule above — do NOT compose 'Banu [whitelist-entry]' or other Arabic-eponym tribal forms. Whitelist entries are character names only, never tribal-name components. The lineage, precinct, gift, or attestation must be named and specific; unnamed characters in generic backstory do not anchor.

(1) TRIBAL-LINEAGE TRANSMISSION. The item's history is a chain of named bearers across named generations of a single tribal lineage. Each bearer (from the whitelist) is identified by what they did with the item or what happened around them while carrying it. The item gains weight through accumulation across generations. There is typically no inventor or creator-figure — the item's origin predates the lineage's memory of it, or its making is a smaller event subordinate to the long chain of bearers. The lineage is named in English-descriptive form ('the salt-flat herders,' 'the high-pass smiths,' 'the frankincense-road traders').

(2) SACRED-PRECINCT PROVENANCE. The item was struck off, cut from, woven at, or quarried within a named sacred precinct during the sacred month — a great ansab where tribes gathered, an oasis precinct under the four-month truce, a high-pass sanctuary, or a sacred-truce market site. The precinct's significance attaches to the item by material continuity. The maker is named (whitelist); the precinct is in English-descriptive form. The item's current state is tied to what has since happened to the precinct — still standing, abandoned, silenced, lost to feud, or rumored destroyed.

(3) HOSPITALITY EXCHANGE. The item changes hands at the diyafa-fire, the sacred-month market, or a similar hospitality-bound context. The exchange may be gift (giver and receiver both from the whitelist), settlement of an obligation (tha'r resolved through diyya, an oath honored or broken), or a stranger's gift left and never reclaimed. The hospitality frame gives the item its weight — it carries the memory of the exchange and the obligation that surrounded it. No magical binding, no spirit-capture, no curse-of-the-bargain — the weight is the cultural obligation itself.

(4) SHA'IR ATTESTATION. The item is named in the verses of a named sha'ir (whitelist). It may be an object that figured in the recitation (a cup passed at the gathering, a staff held while reciting, an inscribed plate set at the diyafa-fire) or an object the verses chronicle (a sword that bore a tribe's defiance, a bow whose lineage the sha'ir traced through madih or hija). The item's weight comes from being named in the recorded poetic tradition — the verses persist, and so does the item's place in them. The sha'ir does not bind anything into the item; the verses describe and praise.

FAILURE MODES TO EXCLUDE BY CONCEPT (these can appear inside an otherwise-correct arc; the prohibition is the concept, not just the word):

- Spirit-binding / essence-capture. Items in this register are NEVER containers for bound entities, captured spirits, sealed essences, or imprisoned anythings — regardless of what the bound thing is called (jinn, desert-spirit, breath, song, name, memory, fire, the unseen muse, the wilderness spirit). Substituting a different word for the bound entity does not satisfy this prohibition; the concept is the container-binding arc itself, where the item's power derives from holding/sealing/binding something inside it. The arc must work through material continuity, lineage transmission, hospitality obligation, or poetic record — not through binding-into-vessel.

- Tragic-craftsman / failed-experiment. Items in this register did NOT come into being through a craftsperson's failed attempt at a greater work. Power comes from the cultural weight of the four arcs above, not from the dangerous byproduct of an attempted creation. Substituting different vocabulary for "failed experiment" (an attempt that went wrong, a working that wasn't completed, a vessel that broke its intended use) does not satisfy this prohibition; the concept is the tragic-creation arc itself. The item is what it was meant to be; its weight comes from who carried it and what they did with it.

- Generic catastrophe origin. Items in this register do not originate from 'the Collapse of X,' 'the Great Sundering,' 'the Fall of the City of Y,' or analogous magical-disaster framings under any naming. Catastrophes can happen TO an item already in circulation, but they are not the arc itself. Items in this register sit inside a culture organized by tribal lineage, the honor code of muruwwah (the cluster of virtues: bravery, generosity, eloquence, loyalty, hospitality), the sacred obligation of diyafa (hospitality so absolute that even an enemy who reaches your fire is protected for three days), and the social mechanism of tha'r (blood vengeance), which obligates entire tribes to pursue justice for slain members — settled either by retaliation or by diyya (blood-price, typically paid in camels). Items move between people through inheritance, gift in hospitality contexts, capture in justified raids (ghazu was a regulated practice, not chaos), or trade in specific named markets — Ukaz being the most famous, a sacred-truce market where poetry competitions were held and tribal feuds paused during the sacred months. Famous swords have individual names with histories of who carried them and what they accomplished. Items connect to specific tribal lineages and to specific sacred precincts — sacred stones (ansab) where tribes gathered, sacred markets where blood feuds paused during the four sacred months. Poetry threads through everything: the sha'ir (tribal poet) was a quasi-mystical figure understood to be inspired by an attendant spirit (render this as "the unseen muse" or "the wilderness spirit who whispers verse"; do NOT use "jinn"), tasked with carrying tribal honor in verse, satirizing enemies in hija (invective poetry that could devastate reputations), and elegizing the dead in ritha. Items associated with poetic recitation carry weight — the staff held while reciting, the cloak worn at Ukaz, the inscribed cup passed at gatherings. Hospitality items (the great copper milk-vessel passed at the diyafa-fire, the inscribed plate set out for guests, the carved bone scoop) connect to the cultural obligation that gives them meaning. South Arabian material is distinctively different from Bedouin material — the kingdoms of Saba, Himyar, Qataban, and Hadramaut had monumental stone architecture, advanced irrigation (the Marib Dam irrigated approximately 25,000 acres), gold and silver work, and frankincense as the basis of their wealth. Items from south Arabian contexts can be refined and urban — incense burners of carved alabaster, gold disc jewelry, inscribed stone tablets in a forgotten angular script. Items from Bedouin contexts are leather, wool, beaten metal, and bone. The pearl-diving culture of the Persian Gulf produced distinctive items — diving stones, carved bone nose-clips, woven date-frond baskets for live oysters, inscribed shells. The frankincense road from Hadramaut north produced specific caravan equipment — woven palm-leaf saddlebags, inscribed copper trade-tokens, camel-bone counting tallies. Tribal markings (wasm) burned into camels or carved into objects served as ownership and lineage markers — the closest pre-Islamic equivalent to heraldry, a distinctive design element worth surfacing. Power in items comes from lineage (a sword passed through five generations of named warriors of a specific tribe), from association with a poet's praise (a cup inscribed with the verses of the sha'ir who praised the bearer's grandfather at Ukaz), or from sacred-precinct provenance (a stone struck off a great ansab during the sacred month).

WESTERN-FANTASY AND ISLAMIC-ERA DEFAULTS TO AVOID. Many "Arabian" tropes in popular fiction come from Arabian Nights material (9th-century Baghdad, Islamic-era) and modern Middle Eastern imagery, both out of period and culturally inappropriate for pre-Islamic content. Do NOT use: magic carpets, genies in bottles or lamps, "open sesame" tropes, harems in the Hollywood sense, sultans, viziers (wuzara), caliphs, dervishes whirling, Sufi mystics, fakirs, snake-charmers, scimitars and curved swords, turbans as marker (the keffiyeh and the ghutra existed but functioned differently), belly-dancers, the "thief of Baghdad" archetype — all Islamic-era and out of scope. Do NOT use Islamic religious institutions or vocabulary: mosques, minarets, mihrabs, calls to prayer, prayer beads, the crescent-and-star symbol (Ottoman, much later), prayer rugs facing Mecca, recitations of Quranic verses, "Allah," "inshallah," "bismillah," "alhamdulillah." Handle "jinn" with care: pre-Islamic Arabs did believe in spirit-beings of the wilderness, and the sha'ir was sometimes said to be inspired by such a spirit, but "jinn" carries heavy Islamic theological weight today (jinn are real beings in Islamic cosmology, named in the Quran with an entire surah devoted to them). Substitute "desert spirits," "wilderness presences," "the unseen ones," or "the muses of the rocks" when the spirit-inspiration sense is needed; do NOT use "jinn" in the bottle-bound sense at all. Do NOT treat the Kaaba, Mecca, Medina, the Zamzam well, or named pilgrimage sites as fictional reference points — these are active Islamic sacred sites with billions of contemporary practitioners. Do NOT import Western political vocabulary: kings, queens, princes, princesses, knights, wizards, witches, warlocks. Do NOT use Western religious-functionary titles either — priest, priestess, cleric, monk, nun, abbot, abbess, friar, chaplain. Religious specialists in this register are the kahin (soothsayer/diviner), the keeper of a named sacred precinct, the warden of a sacred stone (ansab), the elder of a tribal lineage, or the sayyid of a temple-town in the south Arabian context. Production output produced 'earth-priests who guarded the vault' — substitute 'the kahin who tended the vault,' 'the wardens of the vault-precinct,' or 'the elders of the salt-clan who kept the vault.' Pre-Islamic Arabian leadership ran through tribal shaykhs (elders), sayyid (chief), malik (king, used historically in south Arabian kingdoms and in the Lakhmid and Ghassanid contexts), mukarrib (priest-king in south Arabian context), and qayl (tribal chief). Esoteric specialists were the kahin (soothsayer/diviner, distinct from poet) and the sha'ir (tribal poet, inspired by an attendant muse-spirit). Frame these by their cultural function ("the kahin of the western tribe," "the sayyid of the salt-flat caravan," "the sha'ir of the high-pass," "the elder of the spear-bearers") rather than reaching for European political vocabulary. For craft and specialist roles specifically, reach for haddad (smith), najjar (carpenter/woodworker), naqqash (carver/engraver), katib (scribe), tajir (trader/merchant), ghaws (pearl-diver), khabir (caravan guide), tabib (healer), sa'i (messenger). Production output produced 'forge-mages' as a fantasy-class substitute; substitute 'high-desert smiths' or 'the haddad-elders of [tribe]' instead. Do NOT use the spirit-bound-into-object trope — this is closer to the Islamic-era jinn-in-bottle trope than to pre-Islamic spirit-cosmology, where spirits were of-place rather than container-bound. Do NOT write items as "blessed by [god name]" using real pre-Islamic deity names. Do NOT default to market-purchase frames — items here move through inheritance, gift in hospitality contexts, capture in justified raids, or trade in specific named markets (Ukaz, the south Arabian frankincense ports). Do NOT use Bedouin-as-caricature: pre-Islamic Arabia was not all desert nomads, and even the Bedouin tribes had complex social structures, learned poets, named ancestors, and economic interdependence with sedentary communities. Do NOT flatten the four major regional cultures (Hejaz tribes, Najd Bedouin, South Arabian kingdoms, North Arabian Christian Arabs) into a single "Arabian" texture — each had distinct material culture, religious practice, and political organization. Do NOT use the orientalist "decadent East" trope — wealthy, sensuous, cruel, mysterious. Wealth in south Arabia was real and impressive; the moral framing of it as decadent-versus-virtuous-West is the trope to avoid. Do NOT use the "harsh desert as moral test" framing where Arabian characters are defined primarily by their endurance of suffering — this flattens a complex civilization to a single character note. Do NOT write women as silent or veiled-as-Islamic-marker — pre-Islamic Arab women included the famed poet al-Khansa, traders like Khadija (before her marriage to Muhammad), and queens of the south Arabian kingdoms; veiling existed in some forms but its Islamic religious significance is anachronistic. Do not reference Latin alphabet letters or Roman numerals as inscriptions, owner-marks, or initials on items in this register — Arabic-coded objects shouldn't bear 'a W' or 'an A' or other Latin letters as cultural decoration. If an inscription or owner-mark is needed, describe it by visual character without naming a real-world script: 'a scratched tribal wasm,' 'a single carved sigil,' 'a row of angular notches,' 'spidery glyphs in an old highland alphabet,' 'a coiled mark in dots and angles,' 'a small geometric figure cut into the surface,' 'a thumbprint of pressed clay,' 'a chevron-and-dot lineage mark.' The pre-Islamic Arabian scripts that historically existed don't need to be named in user-facing lore — describe what the marks look like, not which historical alphabet they belong to.`,
};
