#!/usr/bin/env python3
"""Merge the SRD's Reactions sections into src/data/srd52-monsters.json.

THE 19 MISSING REACTIONS (owner, 2026-11-12: "Goblin boss has redirect in both. I looked it up.")

The corpus was parsed from springbov/dndsrd5.2_markdown, whose conversion carries only 3
"### Reactions" sections — so our corpus gave reactions to 3 of 329 monsters and the Goblin Boss,
the Knight, the Shield Guardian and 16 more lost theirs. The parser was right; the source was short.
See scripts/srd-source/README.md for the provenance.

MERGE, DO NOT RE-PARSE. oldmanumby/dnd.srd.5.2.1 has all 22 in this parser's own entry idiom, but it
writes "*Hit:*" on 312 attack rows where our corpus does not: re-parsing everything would move the
print text that every gate, template cite and test reads.

PYTHON, NOT JS, and that is the point. A JSON round-trip through node rewrites 251 CR values from
10.0 to 10 (JS has one number type) and cannot reproduce indent=1 — a 47,000-line diff for 19 rows.
Python reads 10.0 as a float and writes it back unchanged, so the diff is the 19 insertions and
nothing else.

    python3 scripts/merge-srd-reactions.py [--write]
"""
import json, re, sys

SRC = "scripts/srd-source/oldmanumby-monsters-A-Z.md"
CORPUS = "src/data/srd52-monsters.json"
write = "--write" in sys.argv

md = open(SRC).read()
before_text = open(CORPUS).read()
corpus = json.loads(before_text)

# the source's shape: "# Name", "## Section", "***Entry.*** text"
found = {}
for block in re.split(r"^# (?=\S)", md, flags=re.M)[1:]:
    name = block.split("\n", 1)[0].strip()
    m = re.search(r"^## Reactions\n(.*?)(?=^## |\Z)", block, re.M | re.S)
    if not m:
        continue
    rows = [
        {"name": n.strip(), "text": re.sub(r"\s+", " ", t).strip()}
        for n, t in re.findall(r"\*\*\*(.+?)\.?\*\*\*\s*(.*?)(?=\*\*\*|\Z)", m.group(1), re.S)
    ]
    rows = [r for r in rows if r["name"] and r["text"]]
    if rows:
        found[name] = rows

by_name = {m["name"].lower(): m for m in corpus}
applied, already, missed = [], [], []
for name, rows in found.items():
    m = by_name.get(name.lower())
    if not m:
        missed.append(name)
    elif m["sections"].get("Reactions"):
        already.append(f'{m["name"]} (kept: {", ".join(r["name"] for r in m["sections"]["Reactions"])})')
    else:
        m["sections"]["Reactions"] = rows
        if "derived" in m:
            m["derived"]["has_reactions"] = True
        applied.append(f'{m["name"]}: {", ".join(r["name"] for r in rows)}')

# nothing but Reactions (and its derived flag) may move
def stripped(data):
    out = json.loads(json.dumps(data))
    for mm in out:
        mm["sections"].pop("Reactions", None)
        if "derived" in mm:
            mm["derived"].pop("has_reactions", None)
    return out

untouched = stripped(corpus) == stripped(json.loads(before_text))

print(f"source: {len(found)} monsters with a Reactions section")
print(f"applied {len(applied)}:")
[print(f"  {a}") for a in applied]
if already:
    print(f"already had one (left alone) {len(already)}:")
    [print(f"  {a}") for a in already]
if missed:
    print("NOT IN OUR CORPUS (skipped): " + ", ".join(missed))
print(f"everything but Reactions byte-identical: {'yes' if untouched else 'NO — refusing'}")

with_r = [m for m in corpus if m["sections"].get("Reactions")]
def check(label, ok):
    print(f"  {'ok  ' if ok else 'FAIL'} {label}")
check(f"22 monsters carry a Reactions section ({len(with_r)})", len(with_r) == 22)
check("Goblin Boss has Redirect Attack", any(r["name"] == "Redirect Attack" for r in by_name["goblin boss"]["sections"].get("Reactions", [])))
check("Knight has Parry", any(r["name"] == "Parry" for r in by_name["knight"]["sections"].get("Reactions", [])))
check("Shield Guardian has Protection", any("Protection" in r["name"] for r in by_name["shield guardian"]["sections"].get("Reactions", [])))
check("every reaction states a Trigger and a Response, or casts a spell",
      all("*Trigger:*" in r["text"] or "casts" in r["text"] for m in with_r for r in m["sections"]["Reactions"]))

if not write:
    print("\n(dry run — pass --write to apply)")
    sys.exit(0)
if not untouched:
    sys.exit("refusing to write: something outside Reactions changed")
reserialized = json.dumps(json.loads(before_text), indent=2, ensure_ascii=False) + "\n"
if reserialized != before_text:
    sys.exit("refusing to write: this serializer does not reproduce the file as it stands — the diff would be the whole corpus")
# THE FILE'S FORMAT IS MEASURED, NOT ASSUMED. `parse-srd52.py` ends with indent=1, but the file in
# the repo is indent=2 + ensure_ascii=False + a trailing newline — reproduced byte for byte by
# re-serializing the unmodified corpus and comparing (the first cut trusted the parser's comment and
# produced a 47,000-line diff for 19 insertions).
with open(CORPUS, "w") as f:
    json.dump(corpus, f, indent=2, ensure_ascii=False)
    f.write("\n")
print(f"\nwrote {CORPUS}")
