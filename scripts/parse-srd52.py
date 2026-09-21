#!/usr/bin/env python3
"""Parse SRD 5.2.1 markdown monster blocks -> JSON, with validation flags."""
import re, json, math, sys
from fractions import Fraction

SRC = ["dndsrd5.2_markdown/src/12_MonstersA-Z.md", "dndsrd5.2_markdown/src/13_Animals.md"]

CR_XP = {0:10, Fraction(1,8):25, Fraction(1,4):50, Fraction(1,2):100, 1:200, 2:450, 3:700,
         4:1100, 5:1800, 6:2300, 7:2900, 8:3900, 9:5000, 10:5900, 11:7200, 12:8400,
         13:10000, 14:11500, 15:13000, 16:15000, 17:18000, 18:20000, 19:22000, 20:25000,
         21:33000, 22:41000, 23:50000, 24:62000, 25:75000, 26:90000, 27:105000, 28:120000,
         29:135000, 30:155000}

def pb_for_cr(cr):
    if cr < 5: return 2
    return 2 + int((math.ceil(cr) - 1) // 4)

def parse_cr(s):
    s = s.strip()
    if "/" in s:
        return Fraction(s)
    return int(s)

def avg_dice(expr):
    # e.g. "20d10 + 40", "12d10+24", "6d10 + 18", "8d12"
    m = re.match(r"\s*(\d+)d(\d+)\s*([+-]\s*\d+)?\s*$", expr)
    if not m: return None
    n, d = int(m.group(1)), int(m.group(2))
    mod = int(m.group(3).replace(" ", "")) if m.group(3) else 0
    return math.floor(n * (d + 1) / 2) + mod

def split_blocks(text):
    blocks = re.split(r"^## ", text, flags=re.M)
    return [b for b in blocks[1:]]

def parse_block(raw, source):
    lines = raw.split("\n")
    name = lines[0].strip()
    body = "\n".join(lines[1:])
    mon = {"name": name, "source_file": source, "flags": []}

    m = re.search(r"^\*(.+?)\*\s*$", body, re.M)
    if m:
        meta = m.group(1)
        mm = re.match(r"(Tiny|Small|Medium|Large|Huge|Gargantuan)(?:\s+or\s+\w+)?\s+([^,]+),\s*(.+)", meta)
        if mm:
            mon["size"] = mm.group(1)
            type_part = mm.group(2).strip()
            tm = re.match(r"(.+?)\s*\((.+)\)", type_part)
            if tm:
                mon["type"], mon["subtype"] = tm.group(1), tm.group(2)
            else:
                mon["type"] = type_part
            mon["alignment"] = mm.group(3).strip()
        else:
            mon["flags"].append(f"unparsed meta line: {meta}")

    def bullet(label):
        m = re.search(r"^- \*\*" + label + r"[:\*]*\**:?\s*(.+)$", body, re.M)
        return m.group(1).strip() if m else None

    ac = bullet("Armor Class")
    if ac:
        m = re.match(r"(\d+)", ac)
        mon["ac"] = int(m.group(1)) if m else None
        mon["ac_note"] = ac
    hp = bullet("Hit Points")
    if hp:
        m = re.match(r"(\d+)\s*\(([^)]+)\)", hp)
        if m:
            mon["hp"] = int(m.group(1))
            mon["hp_formula"] = m.group(2)
            calc = avg_dice(m.group(2))
            if calc is not None and calc != mon["hp"]:
                mon["flags"].append(f"HP mismatch: listed {mon['hp']}, formula {mon['hp_formula']} = {calc}")
        else:
            m2 = re.match(r"(\d+)", hp)
            mon["hp"] = int(m2.group(1)) if m2 else None
    mon["speed"] = bullet("Speed")
    init = bullet("Initiative")
    if init:
        m = re.match(r"([+-]\d+)\s*\((\d+)\)", init)
        if m:
            mon["initiative_bonus"] = int(m.group(1))
            mon["initiative_score"] = int(m.group(2))

    # ability table
    stats = {}
    saves = {}
    for m in re.finditer(r"^\|\s*(STR|DEX|CON|INT|WIS|CHA)\s*\|\s*(\d+)\s*\|\s*([+-]?\d+)\s*\|\s*([+-]?\d+)\s*\|", body, re.M):
        ab, score, mod, save = m.group(1), int(m.group(2)), int(m.group(3)), int(m.group(4))
        stats[ab] = score
        saves[ab] = save
        true_mod = (score - 10) // 2
        if mod != true_mod:
            mon["flags"].append(f"{ab} mod listed {mod}, computed {true_mod}")
    mon["stats"] = stats
    mon["saves"] = saves

    for label, key in [("Skills","skills"),("Resistances","resistances"),("Immunities","immunities"),
                       ("Vulnerabilities","vulnerabilities"),("Senses","senses"),("Languages","languages"),
                       ("Gear","gear")]:
        v = bullet(label)
        if v: mon[key] = v

    m = re.search(r"^- \*\*CR\*\*\s*([0-9/]+)\s*\(XP\s*([\d,]+)(?:,? or [\d,]+(?: in lair)?)?\s*(?:;\s*PB\s*\+(\d+))?\)", body, re.M)
    if m:
        cr = parse_cr(m.group(1))
        mon["cr"] = float(cr)
        mon["cr_str"] = m.group(1)
        mon["xp"] = int(m.group(2).replace(",", ""))
        expected_xp = CR_XP.get(cr)
        if expected_xp and mon["xp"] != expected_xp:
            mon["flags"].append(f"XP listed {mon['xp']}, table says {expected_xp}")
        listed_pb = int(m.group(3)) if m.group(3) else None
        expected_pb = pb_for_cr(cr)
        mon["pb"] = listed_pb if listed_pb else expected_pb
        if listed_pb is None:
            mon["flags"].append("PB not listed; computed from CR")
        elif listed_pb != expected_pb:
            mon["flags"].append(f"PB listed +{listed_pb}, CR table says +{expected_pb}")
    else:
        mon["flags"].append("CR line not parsed")

    # save validation: save should be mod or mod+PB (flag otherwise)
    if "pb" in mon:
        for ab, save in saves.items():
            true_mod = (stats[ab] - 10) // 2
            if save not in (true_mod, true_mod + mon["pb"], true_mod + 2*mon["pb"]):
                mon["flags"].append(f"{ab} save {save:+d} not mod({true_mod:+d}) or mod+PB")

    # sections
    sections = {}
    parts = re.split(r"^### (.+)$", body, flags=re.M)
    for i in range(1, len(parts), 2):
        sec_name = parts[i].strip()
        sec_body = parts[i+1]
        entries = []
        for em in re.finditer(r"^\*\*\*(.+?)\.?\*\*\*\s*(.*?)(?=^\*\*\*|\Z)", sec_body, re.M | re.S):
            entries.append({"name": em.group(1).strip(), "text": em.group(2).strip()})
        sections[sec_name] = entries
    mon["sections"] = sections

    # derived combat numbers
    atk_bonuses, dcs, dmg_avgs = [], [], []
    for sec in ("Actions", "Bonus Actions", "Legendary Actions", "Reactions"):
        for e in sections.get(sec, []):
            for am in re.finditer(r"Attack Roll:\*?\s*\+(\d+)", e["text"]):
                atk_bonuses.append(int(am.group(1)))
            for dm in re.finditer(r"DC\s+(\d+)", e["text"]):
                dcs.append(int(dm.group(1)))
            for gm in re.finditer(r"(\d+)\s*\(\d+d\d+(?:\s*[+-]\s*\d+)?\)", e["text"]):
                dmg_avgs.append(int(gm.group(1)))
    mon["derived"] = {
        "max_attack_bonus": max(atk_bonuses) if atk_bonuses else None,
        "max_dc": max(dcs) if dcs else None,
        "max_single_hit": max(dmg_avgs) if dmg_avgs else None,
        "n_traits": len(sections.get("Traits", [])),
        "n_actions": len(sections.get("Actions", [])),
        "has_multiattack": any(e["name"].startswith("Multiattack") for e in sections.get("Actions", [])),
        "has_bonus_actions": "Bonus Actions" in sections,
        "has_reactions": "Reactions" in sections,
        "has_legendary": "Legendary Actions" in sections,
        "has_spellcasting": any("Spellcasting" in e["name"] for sec in sections.values() for e in sec),
    }
    return mon

monsters = []
for src in SRC:
    text = open(src).read()
    for raw in split_blocks(text):
        if raw.strip():
            monsters.append(parse_block(raw, src.split("/")[-1]))

with open("/home/claude/srd52-monsters.json", "w") as f:
    json.dump(monsters, f, indent=1)

flagged = [m for m in monsters if m["flags"]]
print(f"Parsed {len(monsters)} blocks; {len(flagged)} with flags")
for m in flagged[:25]:
    print(f"  {m['name']}: {m['flags']}")
crs = [m for m in monsters if "cr" not in m]
print(f"Missing CR: {[m['name'] for m in crs]}")
