#!/usr/bin/env python3
"""Restore the missing noun in the Water Elemental's Whelm (2026-11-13).

THE ROW. `src/data/srd-monsters.json` (the 2014 corpus, 327 monsters / 970 rows),
Water Elemental / Whelm, final sentence:

    A creature within 5 feet of the elemental can pull a creature or object out of it
    by taking an action to make a DC 14 Strength and succeeding.

"make a DC 14 Strength" has no noun. A GM cannot tell what to roll, and the sentence is
not grammatical. The fix is one word: Strength -> Strength check.

THIS CORRECTS THE SOURCE, NOT OUR TRANSCRIPTION. Checked 2026-11-13:

  * 5thsrd.org  — "to make a DC 14 Strength and succeeding"   (no "check")
  * Roll20      — same omission (reported by the reviewer)
  * D&D Wiki    — "DC 14 Strength check"  (a wiki, editable, so the weakest witness)

Two independent SRD 5.1 mirrors carry the omission exactly as we do, so our copy is
faithful and SRD 5.1 itself is missing the word. NEITHER THE REVIEWER NOR I OPENED THE
OFFICIAL SRD 5.1 PDF; if someone does and it reads "Strength check", then the mirrors
and our copy share a transcription error instead, and this script's reasoning (not its
edit) should be corrected.

Either way the shipped row needs the noun: the corpus is pasted verbatim onto sheets
that borrow the body, and `save-unrollable` flags it as the one remaining finding over
the 2014 corpus.

Run:  python3 scripts/repair-srd2014-whelm.py [--dry-run]
"""
import json
import sys
from pathlib import Path

PATH = Path("src/data/srd-monsters.json")
DRY = "--dry-run" in sys.argv

MONSTER = "Water Elemental"
ROW = "Whelm"
OLD = "to make a DC 14 Strength and succeeding"
NEW = "to make a DC 14 Strength check and succeeding"


def rows(doc):
    monsters = doc if isinstance(doc, list) else doc.get("monsters", list(doc.values()))
    for m in monsters:
        buckets = [m.get("actions"), m.get("special_abilities"), m.get("reactions"),
                   m.get("legendary_actions"), *(m.get("sections") or {}).values()]
        for b in buckets:
            for r in (b or []):
                yield m.get("name"), r


def text_of(r):
    for k in ("description", "text", "desc"):
        if isinstance(r.get(k), str):
            return k, r[k]
    return None, None


def main():
    original = PATH.read_text(encoding="utf-8")
    doc = json.loads(original)

    # THE SERIALIZER MUST ROUND-TRIP BEFORE ANYTHING IS WRITTEN. Settings are measured
    # against this file, not assumed from the other corpus — a JS rewrite once
    # reformatted every number and indent in a sibling file.
    for indent in (2, 4, None):
        for ensure in (False, True):
            candidate = json.dumps(doc, indent=indent, ensure_ascii=ensure)
            for tail in ("\n", ""):
                if candidate + tail == original:
                    dump = lambda d, i=indent, e=ensure, t=tail: json.dumps(d, indent=i, ensure_ascii=e) + t
                    break
            else:
                continue
            break
        else:
            continue
        break
    else:
        sys.exit("REFUSED: no (indent, ensure_ascii, trailing-newline) combination reproduces the file byte for byte")

    before = {(n, r.get("name"), i): text_of(r)[1] for i, (n, r) in enumerate(rows(doc))}

    hits = [r for n, r in rows(doc) if n == MONSTER and str(r.get("name", "")).startswith(ROW)]
    if len(hits) != 1:
        sys.exit(f"REFUSED: {MONSTER} / {ROW} matched {len(hits)} rows, expected 1")
    key, text = text_of(hits[0])
    if key is None:
        sys.exit(f"REFUSED: {MONSTER} / {ROW} carries no text field")
    if NEW in text:
        print("  already repaired")
        return
    if text.count(OLD) != 1:
        sys.exit(f"REFUSED: the old fragment appears {text.count(OLD)} times, expected 1")
    hits[0][key] = text.replace(OLD, NEW)

    after = {(n, r.get("name"), i): text_of(r)[1] for i, (n, r) in enumerate(rows(doc))}
    if set(before) != set(after):
        sys.exit("REFUSED: the set of rows changed")
    changed = [k for k in before if before[k] != after[k]]
    if len(changed) != 1:
        sys.exit(f"REFUSED: {len(changed)} rows differ, expected 1")
    print(f"rows in corpus: {len(before)} · changed: 1 · untouched: {len(before) - 1}")
    print(f"  {MONSTER} / {hits[0].get('name')} — 'DC 14 Strength' -> 'DC 14 Strength check'")

    out = dump(doc)
    if DRY:
        print("\n--dry-run: nothing written")
        return
    PATH.write_text(out, encoding="utf-8")
    if json.loads(PATH.read_text(encoding="utf-8")) != doc:
        sys.exit("REFUSED: the written file does not re-parse to the repaired document")
    print("written and re-parsed clean")


if __name__ == "__main__":
    main()
