#!/usr/bin/env python3
"""Reference scorer for mind probe 2 (2026-11-15). Fable 5.2's, committed verbatim.

usage: reference-mind-score.py <raw.json> <mind-probes.json> [arm ...]
"""
import json, sys, collections

TIERS = ['feeble', 'ordinary', 'capable', 'formidable']
MIND = ['INT', 'WIS', 'CHA']


def band(score, bands):
    for t in TIERS:
        lo, hi = bands[t]
        if lo <= score <= hi:
            return t
    raise ValueError(score)


def score(raw, key, arm):
    bands = key['bands']
    broken, fixed, unfixed = [], [], []
    silent, quiet_pairs, harmed = [], [], []
    detail = []
    for p in key['prompts']:
        o = raw['out'].get(p['id'])
        if not o or arm not in o:
            continue
        rolls = [r for r in o[arm] if not r.get('err')]
        if not rolls:
            continue
        for k in MIND:
            spec = p['mind'][k]
            card_t = band(int(o['card'][k]), bands)
            said = [(r.get('tiers') or {}).get(k) for r in rolls]
            result = [s if s in TIERS else card_t for s in said]   # unsaid / no answer -> the card stands
            n = len(result)
            tag = f"{p['id']}.{k}"
            majority = n // 2 + 1                                   # 3 of 5
            most = n - 1 if n >= 4 else n                           # 4 of 5
            if spec.get('words'):
                okset = set(spec['expect']) | set(spec.get('tolerate', []))
                wrong_n = sum(1 for t in result if t not in okset)
                card_wrong = card_t not in okset
                if card_wrong:
                    broken.append(tag)
                    (fixed if (n - wrong_n) >= most else unfixed).append(tag)
                elif wrong_n >= majority:
                    harmed.append(tag)
                detail.append((tag, 'words', card_t, ''.join((s or '-')[0] if s != 'formidable' else 'F' for s in said),
                               f"card {'WRONG' if card_wrong else 'ok'}; result wrong on {wrong_n}/{n}"))
            else:
                dist = [abs(TIERS.index(t) - TIERS.index(card_t)) for t in result]
                quiet_n = sum(1 for d in dist if d == 0)
                far_n = sum(1 for d in dist if d >= 2)
                silent.append(tag)
                if quiet_n >= most:
                    quiet_pairs.append(tag)
                if far_n >= majority:
                    harmed.append(tag)
                detail.append((tag, 'silent', card_t, ''.join((s or '-')[0] if s != 'formidable' else 'F' for s in said),
                               f"quiet on {quiet_n}/{n}, far on {far_n}/{n}"))
    need_quiet = -(-len(silent) * 3 // 4)                           # three-quarters, rounded up
    named = 'rank-thing-in-the-well.INT'
    bars = {
        'fixes': (len(unfixed) <= 1 and len(broken) >= 1, f"{len(fixed)} of {len(broken)} pairs the card gets wrong are fixed; unfixed: {unfixed or 'none'}"),
        'quiet': (len(quiet_pairs) >= need_quiet and (named in quiet_pairs or named not in silent),
                  f"{len(quiet_pairs)} of {len(silent)} silent pairs stay quiet (need {need_quiet}); thing-in-the-well INT {'quiet' if named in quiet_pairs else 'NOT quiet'}"),
        'no harm': (not harmed, f"{len(harmed)} pairs harmed: {harmed or 'none'}"),
    }
    return bars, detail


if __name__ == '__main__':
    raw = json.load(open(sys.argv[1])); key = json.load(open(sys.argv[2]))
    arms = sys.argv[3:] or ['u', 'ua']
    for arm in arms:
        bars, detail = score(raw, key, arm)
        print(f"=== arm {arm} ===")
        for tag, kind, card_t, said, note in detail:
            print(f"  {tag:34} {kind:6} card {card_t:10} said {said:6} {note}")
        for name, (ok, note) in bars.items():
            print(f"  {name:8} {'PASS' if ok else 'FAIL'}  {note}")
        print(f"  BUILD MAY START ON THIS ARM: {'yes' if all(ok for ok, _ in bars.values()) else 'no'}\n")
