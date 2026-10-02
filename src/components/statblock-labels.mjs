// Card labels per output language — the interim i18n (owner, 2026-10-01):
// the translation pass rewrites the PROSE of a finished block in one extra
// call; the card's fixed labels come from this table, keyed by the block's
// `language` code. Unknown languages fall back to English labels while the
// prose still translates. Terms follow the official translations of the
// 5e rules where they exist (German: RK/TP/HG/EP/ÜB; French: CA/PV/FP/PX/BM).
export const LANGUAGE_CODES = {
  english: 'en', german: 'de', deutsch: 'de', french: 'fr', français: 'fr', francais: 'fr', spanish: 'es', español: 'es', espanol: 'es',
  italian: 'it', italiano: 'it', portuguese: 'pt', português: 'pt', portugues: 'pt', dutch: 'nl', polish: 'pl', japanese: 'ja', chinese: 'zh', russian: 'ru', korean: 'ko',
};
export const languageCodeFor = (name) => LANGUAGE_CODES[String(name ?? '').trim().toLowerCase()] ?? null;

const EN = {
  multiattack: 'Multiattack',
  ac: 'AC', initiative: 'Initiative', hp: 'HP', speed: 'Speed', mod: 'MOD', save: 'SAVE', cr: 'CR', xp: 'XP', pb: 'PB', none: 'None',
  skills: 'Skills', vulnerabilities: 'Vulnerabilities', resistances: 'Resistances', immunities: 'Immunities', gear: 'Gear', senses: 'Senses', languages: 'Languages',
  sections: { Traits: 'Traits', Actions: 'Actions', 'Bonus Actions': 'Bonus Actions', Reactions: 'Reactions', 'Legendary Actions': 'Legendary Actions' },
  abilities: { STR: 'STR', DEX: 'DEX', CON: 'CON', INT: 'INT', WIS: 'WIS', CHA: 'CHA' },
  legendaryUses: "Legendary Action Uses: {n}. Immediately after another creature's turn, it can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.",
};
export const CARD_LABELS = {
  en: EN,
  de: {
    multiattack: 'Multiangriff',
    ac: 'RK', initiative: 'Initiative', hp: 'TP', speed: 'Bewegungsrate', mod: 'MOD', save: 'RW', cr: 'HG', xp: 'EP', pb: 'ÜB', none: 'Keine',
    skills: 'Fertigkeiten', vulnerabilities: 'Verwundbarkeiten', resistances: 'Resistenzen', immunities: 'Immunitäten', gear: 'Ausrüstung', senses: 'Sinne', languages: 'Sprachen',
    sections: { Traits: 'Eigenschaften', Actions: 'Aktionen', 'Bonus Actions': 'Bonusaktionen', Reactions: 'Reaktionen', 'Legendary Actions': 'Legendäre Aktionen' },
    abilities: { STR: 'STÄ', DEX: 'GES', CON: 'KON', INT: 'INT', WIS: 'WEI', CHA: 'CHA' },
    legendaryUses: 'Legendäre Aktionen: {n} Einsätze. Unmittelbar nach dem Zug einer anderen Kreatur kann es einen Einsatz verbrauchen, um eine der folgenden Aktionen auszuführen. Zu Beginn jedes seiner Züge erhält es alle verbrauchten Einsätze zurück.',
  },
  fr: {
    multiattack: 'Attaques multiples',
    ac: 'CA', initiative: 'Initiative', hp: 'PV', speed: 'Vitesse', mod: 'MOD', save: 'JS', cr: 'FP', xp: 'PX', pb: 'BM', none: 'Aucune',
    skills: 'Compétences', vulnerabilities: 'Vulnérabilités', resistances: 'Résistances', immunities: 'Immunités', gear: 'Équipement', senses: 'Sens', languages: 'Langues',
    sections: { Traits: 'Traits', Actions: 'Actions', 'Bonus Actions': 'Actions bonus', Reactions: 'Réactions', 'Legendary Actions': 'Actions légendaires' },
    abilities: { STR: 'FOR', DEX: 'DEX', CON: 'CON', INT: 'INT', WIS: 'SAG', CHA: 'CHA' },
    legendaryUses: "Utilisations d'actions légendaires : {n}. Immédiatement après le tour d'une autre créature, elle peut dépenser une utilisation pour effectuer l'une des actions suivantes. Elle récupère toutes les utilisations dépensées au début de chacun de ses tours.",
  },
  es: {
    multiattack: 'Ataque múltiple',
    ac: 'CA', initiative: 'Iniciativa', hp: 'PG', speed: 'Velocidad', mod: 'MOD', save: 'SALV', cr: 'VD', xp: 'PX', pb: 'BC', none: 'Ninguno',
    skills: 'Habilidades', vulnerabilities: 'Vulnerabilidades', resistances: 'Resistencias', immunities: 'Inmunidades', gear: 'Equipo', senses: 'Sentidos', languages: 'Idiomas',
    sections: { Traits: 'Rasgos', Actions: 'Acciones', 'Bonus Actions': 'Acciones adicionales', Reactions: 'Reacciones', 'Legendary Actions': 'Acciones legendarias' },
    abilities: { STR: 'FUE', DEX: 'DES', CON: 'CON', INT: 'INT', WIS: 'SAB', CHA: 'CAR' },
    legendaryUses: 'Usos de acciones legendarias: {n}. Inmediatamente después del turno de otra criatura, puede gastar un uso para realizar una de las siguientes acciones. Recupera todos los usos gastados al comienzo de cada uno de sus turnos.',
  },
  it: {
    multiattack: 'Multiattacco',
    ac: 'CA', initiative: 'Iniziativa', hp: 'PF', speed: 'Velocità', mod: 'MOD', save: 'TS', cr: 'GS', xp: 'PE', pb: 'BC', none: 'Nessuno',
    skills: 'Abilità', vulnerabilities: 'Vulnerabilità', resistances: 'Resistenze', immunities: 'Immunità', gear: 'Equipaggiamento', senses: 'Sensi', languages: 'Linguaggi',
    sections: { Traits: 'Tratti', Actions: 'Azioni', 'Bonus Actions': 'Azioni bonus', Reactions: 'Reazioni', 'Legendary Actions': 'Azioni leggendarie' },
    abilities: { STR: 'FOR', DEX: 'DES', CON: 'COS', INT: 'INT', WIS: 'SAG', CHA: 'CAR' },
    legendaryUses: "Usi delle azioni leggendarie: {n}. Immediatamente dopo il turno di un'altra creatura, può spendere un uso per compiere una delle azioni seguenti. Recupera tutti gli usi spesi all'inizio di ciascuno dei suoi turni.",
  },
  ja: {
    multiattack: 'マルチアタック',
    ac: 'AC', initiative: 'イニシアチブ', hp: 'HP', speed: '移動速度', mod: '修正', save: 'セーヴ', cr: '脅威度', xp: 'XP', pb: '習熟', none: 'なし',
    skills: '技能', vulnerabilities: '脆弱性', resistances: '抵抗', immunities: '完全耐性', gear: '装備', senses: '感覚', languages: '言語',
    sections: { Traits: '特徴', Actions: 'アクション', 'Bonus Actions': 'ボーナス・アクション', Reactions: 'リアクション', 'Legendary Actions': '伝説的アクション' },
    abilities: { STR: '筋力', DEX: '敏捷', CON: '耐久', INT: '知力', WIS: '判断', CHA: '魅力' },
    legendaryUses: '伝説的アクションの使用回数：{n}。他のクリーチャーのターンの直後に、使用回数を1回消費して以下のアクションのいずれかを行える。使用回数は自身の各ターンの開始時にすべて回復する。',
  },
  pt: {
    multiattack: 'Ataques múltiplos',
    ac: 'CA', initiative: 'Iniciativa', hp: 'PV', speed: 'Deslocamento', mod: 'MOD', save: 'RES', cr: 'ND', xp: 'XP', pb: 'BP', none: 'Nenhum',
    skills: 'Perícias', vulnerabilities: 'Vulnerabilidades', resistances: 'Resistências', immunities: 'Imunidades', gear: 'Equipamento', senses: 'Sentidos', languages: 'Idiomas',
    sections: { Traits: 'Características', Actions: 'Ações', 'Bonus Actions': 'Ações bônus', Reactions: 'Reações', 'Legendary Actions': 'Ações lendárias' },
    abilities: { STR: 'FOR', DEX: 'DES', CON: 'CON', INT: 'INT', WIS: 'SAB', CHA: 'CAR' },
    legendaryUses: 'Usos de ações lendárias: {n}. Imediatamente após o turno de outra criatura, ela pode gastar um uso para realizar uma das ações a seguir. Ela recupera todos os usos gastos no início de cada um de seus turnos.',
  },
};
export function labelsFor(code) {
  const t = CARD_LABELS[code] ?? null;
  return t ? { ...EN, ...t, sections: { ...EN.sections, ...t.sections }, abilities: { ...EN.abilities, ...t.abilities } } : EN;
}
