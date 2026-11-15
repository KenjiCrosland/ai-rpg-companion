# REFERENCE ONLY (Fable 5.2, 2026-11-14). Counts, across the saved fixture sheets, every attack whose hit bonus
# and damage modifier do not follow from ONE of the sheet's own ability scores at its proficiency bonus.
# Run from the repo root:  python3 scripts/reference-attack-arithmetic.py
# Result at 8ad4b97: 343 attack rows on 251 sheets, 340 follow; the 3 that do not are one class NPC (Kiln-Priest) three times.
# This is item 4's standing test: the number must not rise.
import json,glob,os,re,collections
F='src/tools/statblock-generator/reskin/__tests__/fixtures/runs'
def crnum(s):
    s=str(s).split()[0]
    if '/' in s: a,b=s.split('/'); return float(a)/float(b)
    try: return float(s)
    except: return None
def pbof(cr): return 2 if cr<1 else 2+int((cr-1)//4)
tot=collections.Counter(); bad=collections.Counter(); badrows=collections.Counter(); rows_tot=collections.Counter(); ex=collections.defaultdict(list)
for f in glob.glob(F+'/*/*.json'):
    d=json.load(open(f)); g=d.get('generation') or {}; path=(g.get('pipeline') or {}).get('path') or 'unrecorded'
    if d.get('stats'): S={k.upper():int(v if not isinstance(v,dict) else v.get('score')) for k,v in d['stats'].items()}
    else:
        m=re.findall(r'(STR|DEX|CON|INT|WIS|CHA)\s+(\d+)',str(d.get('attributes','')))
        if len(m)!=6: continue
        S={k:int(v) for k,v in m}
    cr=crnum(d.get('cr_str') or d.get('cr') or d.get('challenge_rating') or d.get('selectedChallengeRating'))
    if cr is None: continue
    pb=int(d.get('pb') or pbof(cr)); mods={k:(v-10)//2 for k,v in S.items()}
    rows=[r for rs in (d.get('sections') or {}).values() for r in (rs or [])] if d.get('sections') else [r for k in ('actions','bonus_actions','reactions','legendary_actions') for r in (d.get(k) or [])]
    tot[path]+=1; sheetbad=False
    for r in rows:
        t=str(r.get('text') or r.get('description') or '')
        m=re.search(r'Attack(?: Roll)?:?\*?\s*\+(\d+)',t) or re.search(r'\+(\d+) to hit',t)
        if not m: continue
        N=int(m.group(1)); dm=re.search(r'\(\d+d\d+ ([+-]) (\d+)\)',t); M=(int(dm.group(2))*(1 if dm.group(1)=='+' else -1)) if dm else None
        rows_tot[path]+=1
        ok=any(pb+mv==N and (M is None or mv==M) for mv in mods.values())
        if not ok:
            badrows[path]+=1; sheetbad=True
            if len(ex[path])<3: ex[path].append(f"{d.get('name')} (CR {cr:g}, PB+{pb}, {' '.join(f'{k}{v}' for k,v in S.items())}): {r.get('name')} +{N} dmg mod {M}")
    if sheetbad: bad[path]+=1
for p in tot: print(f"{p:11} sheets {tot[p]:3} | with an attack whose bonus or damage modifier matches no ability: {bad[p]:3} ({100*bad[p]//max(1,tot[p])}%) | rows {badrows[p]} of {rows_tot[p]}")
for p,l in ex.items():
    for e in l: print('   ',p,'-',e)
