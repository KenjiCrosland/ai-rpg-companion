import { toLegacyModel } from '@/tools/statblock-generator/format-2024/generate.mjs';

export function convertToImprovedInitiative(monster) {
    // 2024-format blocks: run the legacy-shape mapping through the normal
    // path, then upgrade with what the 2024 model knows natively — the
    // schema has first-class BonusActions and InitiativeModifier fields
    // (https://github.com/cynicaloptimist/improved-initiative), so 2024
    // exports carry MORE fidelity than 2014 ones.
    if (monster?.format === '2024') {
        const legacy = toLegacyModel(monster);
        const out = convertToImprovedInitiative({
            ...legacy,
            abilities: legacy.abilities ?? [],
            actions: legacy.actions ?? [],
            condition_immunities: legacy.condition_immunities ?? '',
            senses: legacy.senses ?? '',
            languages: legacy.languages ?? '\u2014',
            saving_throws: legacy.saving_throws ?? '',
            skills: legacy.skills ?? '',
            format: '2014',
        });
        out.InitiativeModifier = monster.initiative_bonus ?? 0;
        const bySection = (sec) => (monster.sections?.[sec] ?? [])
            .map((e) => ({ Name: e.name, Content: e.text }));
        out.BonusActions = bySection('Bonus Actions');
        out.Reactions = bySection('Reactions');
        // The legacy fold put suffixed copies under Traits — drop them.
        out.Traits = out.Traits.filter((t) => !/\((?:Bonus Action|Reaction)\)$/i.test(t.Name));
        return out;
    }
    const hpRegex = /(\d+)\s\((.*)\)/;
    const attributeRegex = /([A-Z]{3})\s(\d+)/g;
    const savingThrowsRegex = /(\w+)\s\+(\d+)/g;
    const skillsRegex = /(\w+)\s\+(\d+)/g;
    const sensesRegex = /(\w+ \d+ ft.)/g;
    const challengeRegex = /(\d+)\s\((.*)\)/;

    const output = {
        "Source": "", // There's no source info in the input object
        "Type": monster.type_and_alignment,
        "HP": {
            "Value": Number(hpRegex.exec(monster.hit_points)[1]),
            "Notes": hpRegex.exec(monster.hit_points)[2]
        },
        "AC": monster.armor_class ? {
            "Value": Number(monster.armor_class.match(/\d+/)[0]),
            "Notes": (monster.armor_class.match(/\((.*?)\)/) || [])[1] || ""
          } : {"Value": null, "Notes": ""},          
        "InitiativeModifier": 0, // There's no initiative info in the input object
        "InitiativeAdvantage": false, // There's no initiative info in the input object
        "Speed": [monster.speed],
        "Abilities": {},
        "DamageVulnerabilities": [], // There's no damage vulnerabilities info in the input object
        "DamageResistances": monster.damage_resistances ? [monster.damage_resistances] : [],
        "DamageImmunities": monster.damage_immunities ? [monster.damage_immunities] : [],
        "ConditionImmunities": (monster.condition_immunities ?? '').split(', ').filter(Boolean),
        "Saves": [],
        "Skills": [],
        "Senses": monster.senses.match(sensesRegex) ? monster.senses.match(sensesRegex) : [],
        "Languages": [monster.languages],
        "Challenge": challengeRegex.exec(monster.challenge_rating)[1],
        "Traits": monster.abilities.map(ability => ({ "Name": ability.name, "Content": ability.description })),
        "Actions": monster.actions.map(action => ({ "Name": action.name, "Content": action.description })),
        "BonusActions": [], // There's no bonus actions info in the input object
        "Reactions": [], // There's no reactions info in the input object
        "LegendaryActions": monster?.legendary_actions?.map(action => ({ "Name": action.name, "Content": action.description })),
        "MythicActions": [], // There's no mythic actions info in the input object
        "Description": "",
        "Player": "",
        "Version": "3.6.10", // There's no version info in the input object
        "ImageURL": "" // There's no image URL in the input object
    };

    let match;
    while ((match = attributeRegex.exec(monster.attributes)) !== null) {
        // Now we capitalize only the first letter and make the rest lowercase
        const abilityName = match[1].charAt(0) + match[1].slice(1).toLowerCase();
        output.Abilities[abilityName] = Number(match[2]);
    }

    while ((match = savingThrowsRegex.exec(monster.saving_throws)) !== null) {
        output.Saves.push({ "Name": match[1], "Modifier": Number(match[2]) });
    }

    while ((match = skillsRegex.exec(monster.skills)) !== null) {
        output.Skills.push({ "Name": match[1], "Modifier": Number(match[2]) });
    }

    return output;
}
