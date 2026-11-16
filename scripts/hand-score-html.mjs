/**
 * HAND-SCORE THE AUDIT'S DROPPED FINDINGS — one card at a time, three keys, markdown out.
 *
 * The audit raises findings the confidence gate throws away before any fix runs. The owner's
 * ACT / IGNORE / WRONG on each is the number that sets Item R's gate weights (HANDOVER-2026-11-11).
 * A 40-row markdown table was unwieldy; this is the same corpus as cards.
 *
 *   node --import ./scripts/alias-loader.mjs scripts/hand-score-html.mjs [--runs <glob>] [--out <path>] [--kinds free,authored]
 *
 * --kinds narrows to row kinds (free row · authored · template · chassis · print). The owner's read of
 * 2026-11-11: chassis and print findings are classified by measurement (a chassis finding is a one-time
 * catalog edit or the audit arguing with WotC; a print finding is a paste check), so the cards worth a
 * human score are the FREE ROWS — the only bucket a repair can reach and the gate's point system must
 * be right about. Scores persist per finding, so a narrowed page keeps what the full page recorded.
 *   open scripts/smoke-evidence/hand-score.html
 *
 * Keys: A act · I ignore · W wrong · ← → move · U undo · C focus the comment box. A comment is optional
 * and rides with the score into the markdown. Scores and comments persist in the browser (localStorage)
 * so a session can stop and resume. "Copy markdown" puts the tally + per-item table on the clipboard.
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const RUNS = opt('--runs', '2026-11-1');
const OUT = opt('--out', 'scripts/smoke-evidence/hand-score.html');
const KINDS = opt('--kinds', null)?.split(',').map((k) => k.trim().replace(/^free$/, 'free row')) ?? null;

const items = [];
for (const d of fs.readdirSync('smoke-out').filter((x) => x.includes(RUNS))) {
  const dir = path.join('smoke-out', d);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const f of fs.readdirSync(dir).filter((x) => /^\d+-.*\.md$/.test(x))) {
    let m; try { const raw = JSON.parse(fs.readFileSync(path.join(dir, f.replace(/\.md$/, '.json')), 'utf8')); m = raw.monster ?? raw; } catch { continue; }
    if (!m?.sections) continue;
    const t = fs.readFileSync(path.join(dir, f), 'utf8');
    const rows = Object.entries(m.sections).flatMap(([sec, es]) => (es ?? []).map((e) => [String(e.name ?? '').replace(/ \(.*\)$/, ''), sec, e])).sort((a, b) => b[0].length - a[0].length);
    for (const d2 of t.matchAll(/audit finding below confidence gate: ([^\n]{0,500})/g)) {
      const line = d2[1];
      const hit = rows.find(([n]) => n && (line.startsWith(`${n} `) || line.startsWith(`${n}.`)));
      if (!hit) continue;
      const [n, sec, e] = hit;
      const kind = e.print ? 'print' : (e.freeRow || e.authoredSeat) ? 'free row' : (e.template || e.library) ? 'template' : e.authored ? 'authored' : 'chassis';
      items.push({ id: `${d}/${f}/${n}/${items.length}`, run: d, sheet: m.name, cr: m.cr_str ?? String(m.cr ?? ''), sec, row: e.name, kind, text: String(e.text ?? ''), issue: line.slice(n.length).replace(/^[.:\s]+/, '') });
    }
  }
}
if (KINDS) { const keep = items.filter((x) => KINDS.includes(x.kind)); items.length = 0; items.push(...keep); }
// a stable shuffle so the first cards are not all one run
let seed = 11; const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
for (let i = items.length - 1; i > 0; i -= 1) { const j = Math.floor(rnd() * (i + 1)); [items[i], items[j]] = [items[j], items[i]]; }

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Hand-score — dropped audit findings</title>
<style>
  :root{--ink:#2b2420;--paper:#f6f1e7;--card:#fffdf8;--line:#d9cfbf;--act:#8a2f1f;--ign:#6b6150;--wrong:#1f4f8a;--muted:#7a6f62}
  body{margin:0;background:var(--paper);color:var(--ink);font:15px/1.45 Georgia,"Iowan Old Style",serif}
  header{position:sticky;top:0;background:var(--paper);border-bottom:1px solid var(--line);padding:10px 18px;display:flex;gap:18px;align-items:center;flex-wrap:wrap}
  header b{font-size:17px} .tally span{display:inline-block;margin-right:12px} .tally .a{color:var(--act)} .tally .w{color:var(--wrong)}
  main{max-width:860px;margin:18px auto;padding:0 18px}
  .card{background:var(--card);border:1px solid var(--line);border-radius:6px;padding:18px 20px;box-shadow:0 1px 0 rgba(0,0,0,.04)}
  .meta{color:var(--muted);font-size:13px;display:flex;gap:14px;flex-wrap:wrap} .kind{border:1px solid var(--line);border-radius:10px;padding:0 8px}
  .kind.free{border-color:var(--act);color:var(--act)}
  h2{margin:8px 0 10px;font-size:20px} .row{background:#f1eadc;border-left:3px solid var(--line);padding:10px 12px;margin:8px 0;font-size:14.5px}
  .issue{margin:12px 0 4px} .issue:before{content:"the audit says: ";color:var(--muted);font-style:italic}
  .btns{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap} button{font:inherit;padding:9px 16px;border-radius:5px;border:1px solid var(--line);background:#fff;cursor:pointer}
  button.act{border-color:var(--act);color:var(--act)} button.ign{color:var(--ign)} button.wrong{border-color:var(--wrong);color:var(--wrong)} button.on{color:#fff}
  button.act.on{background:var(--act)} button.ign.on{background:var(--ign)} button.wrong.on{background:var(--wrong)}
  .nav{margin-left:auto;display:flex;gap:8px} kbd{font:12px ui-monospace,Menlo,monospace;border:1px solid var(--line);border-radius:3px;padding:0 5px;background:#fff;color:var(--muted)}
  textarea#md{width:100%;height:220px;margin-top:14px;font:12.5px ui-monospace,Menlo,monospace;display:none}
  textarea.note{width:100%;box-sizing:border-box;min-height:58px;margin-top:12px;padding:8px 10px;font:inherit;font-size:14px;border:1px solid var(--line);border-radius:5px;background:#fff;resize:vertical}
  .note::placeholder{color:#b3a996;font-style:italic}
  .done{text-align:center;color:var(--muted);margin:30px 0}
</style></head><body>
<header><b>Hand-score${KINDS ? ` — ${KINDS.join(' + ')} only` : ''}</b><span id="pos"></span><span class="tally" id="tally"></span>
  <span style="margin-left:auto"><button id="copy">Copy markdown</button> <button id="reset" title="clear every score">Reset</button></span></header>
<main><div id="card"></div><textarea id="md" readonly></textarea>
<p class="done"><kbd>A</kbd> act &nbsp; <kbd>I</kbd> ignore &nbsp; <kbd>W</kbd> wrong &nbsp; <kbd>C</kbd> comment (<kbd>Esc</kbd> leaves it) &nbsp; <kbd>←</kbd><kbd>→</kbd> move &nbsp; <kbd>U</kbd> undo — scores and notes stay in this browser until Reset.</p></main>
<script>
const ITEMS=${JSON.stringify(items)};
const KEY='hand-score-dropped-findings-2026-11-11';
let scores={}; try{scores=JSON.parse(localStorage.getItem(KEY)||'{}')}catch{}
let notes={}; try{notes=JSON.parse(localStorage.getItem(KEY+':notes')||'{}')}catch{}
let i=Math.max(0,ITEMS.findIndex(x=>!scores[x.id])); if(i<0)i=0;
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(scores));localStorage.setItem(KEY+':notes',JSON.stringify(notes))}catch{}};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function render(){
  const it=ITEMS[i]; if(!it){document.getElementById('card').innerHTML='<p class="done">All scored. Copy markdown above.</p>';tally();return;}
  const s=scores[it.id];
  document.getElementById('card').innerHTML=\`<div class="card">
    <div class="meta"><span>\${esc(it.sheet)} (CR \${esc(it.cr)})</span><span>\${esc(it.sec)}</span><span class="kind \${it.kind==='free row'?'free':''}">\${esc(it.kind)}\${it.kind==='free row'?' — repairable today':''}</span><span style="margin-left:auto">\${esc(it.run)}</span></div>
    <h2>\${esc(it.row)}</h2><div class="row">\${esc(it.text)}</div>
    <p class="issue">\${esc(it.issue)}</p>
    <textarea class="note" id="note" placeholder="your note — why, or what the fix should have been (optional; C to focus)">\${esc(notes[it.id]||'')}</textarea>
    <div class="btns"><button class="act \${s==='ACT'?'on':''}" data-s="ACT">ACT — a GM hits this</button><button class="ign \${s==='IGNORE'?'on':''}" data-s="IGNORE">IGNORE — a nit</button><button class="wrong \${s==='WRONG'?'on':''}" data-s="WRONG">WRONG — audit mistaken</button>
    <span class="nav"><button data-nav="-1">←</button><button data-nav="1">→</button></span></div></div>\`;
  document.getElementById('pos').textContent=\`\${i+1} / \${ITEMS.length}\`; tally();
  const nb=document.getElementById('note'); if(nb){nb.addEventListener('input',()=>{const it2=ITEMS[i]; if(!it2)return; if(nb.value.trim())notes[it2.id]=nb.value.trim(); else delete notes[it2.id]; save();});
    nb.addEventListener('keydown',e=>{if(e.key==='Escape'){nb.blur();e.preventDefault();}});}
}
function tally(){const c={ACT:0,IGNORE:0,WRONG:0};for(const v of Object.values(scores))c[v]=(c[v]||0)+1;
  document.getElementById('tally').innerHTML=\`<span class="a">ACT \${c.ACT}</span><span>IGNORE \${c.IGNORE}</span><span class="w">WRONG \${c.WRONG}</span><span>· \${Object.keys(scores).length} scored</span>\`;}
function score(s){const it=ITEMS[i];if(!it)return;scores[it.id]=s;save();i=Math.min(i+1,ITEMS.length);render();}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  if(b.dataset.s)score(b.dataset.s); else if(b.dataset.nav){i=Math.max(0,Math.min(ITEMS.length-1,i+Number(b.dataset.nav)));render();}
  else if(b.id==='copy')copyMd(); else if(b.id==='reset'&&confirm('Clear every score and note?')){scores={};notes={};save();i=0;render();}});
document.addEventListener('keydown',e=>{if(e.target.tagName==='TEXTAREA')return;const k=e.key.toLowerCase();
  if(k==='c'){const nb=document.getElementById('note');if(nb){nb.focus();e.preventDefault();}return;}
  if(k==='a')score('ACT');else if(k==='i')score('IGNORE');else if(k==='w')score('WRONG');
  else if(e.key==='ArrowRight')i=Math.min(ITEMS.length-1,i+1),render();else if(e.key==='ArrowLeft')i=Math.max(0,i-1),render();
  else if(k==='u'){const prev=ITEMS.slice(0,i).reverse().find(x=>scores[x.id]);if(prev){delete scores[prev.id];save();i=ITEMS.indexOf(prev);render();}}});
function copyMd(){
  const scored=ITEMS.filter(x=>scores[x.id]); const c={ACT:0,IGNORE:0,WRONG:0}; const byKind={};
  for(const x of scored){c[scores[x.id]]++; if(scores[x.id]==='ACT')byKind[x.kind]=(byKind[x.kind]||0)+1;}
  const pct=n=>scored.length?Math.round(n/scored.length*100)+'%':'—';
  const lines=['# Hand-score — findings the confidence gate dropped','',\`Scored \${scored.length} of \${ITEMS.length}.\`,'',
    \`- **ACT** \${c.ACT} (\${pct(c.ACT)}) — the fix should have run\`,\`- **IGNORE** \${c.IGNORE} (\${pct(c.IGNORE)})\`,\`- **WRONG** \${c.WRONG} (\${pct(c.WRONG)})\`,'',
    'ACT by row kind: '+Object.entries(byKind).map(([k,v])=>\`\${k} \${v}\`).join(' · ')+' (only a free row is repairable today)','',
    '| score | sheet (CR) | row [kind] | the audit says | your note |','|---|---|---|---|---|',
    ...scored.map(x=>\`| \${scores[x.id]} | \${x.sheet} (\${x.cr}) | **\${x.row}** [\${x.kind}] | \${x.issue.replace(/\\|/g,'/').slice(0,200)} | \${(notes[x.id]||'').replace(/\\|/g,'/').replace(/\\n+/g,' ')} |\`),
    ...(scored.some(x=>notes[x.id])?['','## Notes','',...scored.filter(x=>notes[x.id]).map(x=>\`- **\${x.row}** (\${x.sheet}, \${scores[x.id]}): \${notes[x.id].replace(/\\n+/g,' ')}\`)]:[])];
  const md=lines.join('\\n'); const ta=document.getElementById('md'); ta.value=md; ta.style.display='block';
  navigator.clipboard?.writeText(md).then(()=>{document.getElementById('copy').textContent='Copied ✓';setTimeout(()=>document.getElementById('copy').textContent='Copy markdown',1500)}).catch(()=>{ta.select()});
}
render();
</script></body></html>`;
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html);
console.log(`${items.length} findings → ${OUT}`);
