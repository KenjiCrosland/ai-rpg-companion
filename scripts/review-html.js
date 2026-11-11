/* The page. Reads the embedded run, renders a card per sheet, keeps verdicts in localStorage,
   exports a markdown table in the critic's shape so the two reads can be diffed.
   The only arithmetic here is hit chance against a target AC — a reading aid. Every other number
   comes from `checkBlock` (one owner for the computation). */
(function () {
  var RUN = JSON.parse(document.getElementById('run-data').textContent);
  var KEY = 'review:' + RUN.run;
  var state = {};
  try { state = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { state = {}; }
  var filter = 'all';
  var save = function () { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };
  var st = function (i) { return (state[i] = state[i] || { verdict: '', note: '', flags: {} }); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
  var mod = function (v) { return Math.floor((Number(v) - 10) / 2); };
  var sgn = function (n) { return (n >= 0 ? '+' : '') + n; };
  var el = function (tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  /* ---- the block, in print's shape ---- */
  function renderBlock(s) {
    var h = s.header, w = el('div', 'block');
    var inits = h.initiative_bonus == null ? '' : ' <b>Initiative</b> ' + sgn(h.initiative_bonus) + ' (' + (10 + Number(h.initiative_bonus)) + ')';
    w.appendChild(el('div', 'nm', esc(s.name)));
    w.appendChild(el('div', 'sub', esc([h.size, h.type].filter(Boolean).join(' ') + (h.alignment ? ', ' + h.alignment : ''))));
    w.appendChild(el('hr'));
    w.appendChild(el('div', 'line', '<b>AC</b> ' + esc(h.ac) + inits));
    w.appendChild(el('div', 'line', '<b>HP</b> ' + esc(h.hp) + (h.hp_formula ? ' (' + esc(h.hp_formula) + ')' : '')));
    w.appendChild(el('div', 'line', '<b>Speed</b> ' + esc(h.speed)));
    var ABIL = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'], t = el('table', 'abil');
    t.innerHTML = '<tr><th></th>' + ABIL.map(function (a) { return '<th>' + a + '</th>'; }).join('') + '</tr>'
      + '<tr><th>score</th>' + ABIL.map(function (a) { return '<td>' + esc(h.stats[a]) + '</td>'; }).join('') + '</tr>'
      + '<tr><th>mod</th>' + ABIL.map(function (a) { return '<td>' + sgn(mod(h.stats[a])) + '</td>'; }).join('') + '</tr>'
      + '<tr><th>save</th>' + ABIL.map(function (a) { return '<td>' + (h.saves && h.saves[a] != null ? sgn(h.saves[a]) : sgn(mod(h.stats[a]))) + '</td>'; }).join('') + '</tr>';
    w.appendChild(t);
    [['Skills', h.skills], ['Immunities', h.immunities], ['Resistances', h.resistances], ['Vulnerabilities', h.vulnerabilities], ['Senses', h.senses], ['Languages', h.languages]]
      .forEach(function (p) { if (p[1]) w.appendChild(el('div', 'line', '<b>' + p[0] + '</b> ' + esc(p[1]))); });
    w.appendChild(el('div', 'line', '<b>CR</b> ' + esc(h.cr) + (h.xp ? ' (XP ' + esc(h.xp) : '') + (h.pb ? '; PB ' + sgn(h.pb) + ')' : h.xp ? ')' : '')));
    Object.keys(s.sections).forEach(function (secName) {
      var sec = el('div', 'sec');
      // 2014 PRINTS NO "TRAITS" HEADING (owner, 2026-11-10): the trait list sits unlabelled under the
      // Challenge line and the first heading is Actions. 'Traits' is the engine's internal section key,
      // shared by both editions — printing it here showed a 2014 card a heading it never carries, and
      // a bonus action written in the trait list as 2014 does was read as "in the wrong section".
      // Bonus Actions is a 2024 heading too; 2014 folds those into the trait list as prose.
      var unlabelled2014 = s.format === '2014' && (secName === 'Traits' || secName === 'Bonus Actions');
      if (unlabelled2014) sec.appendChild(el('div', 'sec-note', '(' + esc(secName.toLowerCase()) + ' — printed with no heading in 2014)'));
      else sec.appendChild(el('h3', null, esc(secName)));
      s.sections[secName].forEach(function (r, ri) {
        var id = secName + '/' + r.name, flagged = st(s.idx).flags[id];
        var row = el('div', 'row' + (flagged ? ' flagged' : ''));
        var tags = r.tags.map(function (tg) {
          var c = /GM-asked/.test(tg[0]) ? ' gm' : /free row/.test(tg[0]) ? ' free' : /print/.test(tg[0]) ? ' print' : '';
          return '<span class="tag' + c + '" title="' + esc(tg[1]) + '">' + esc(tg[0]) + '</span>';
        }).join('');
        row.innerHTML = '<span class="rn">' + esc(r.name) + '.</span> ' + esc(r.text) + '<span class="tags">' + tags + '</span>';
        row.querySelector('.rn').onclick = function () {
          var S = st(s.idx);
          if (S.flags[id] == null) { S.flags[id] = ''; } else { delete S.flags[id]; }
          save(); render();
        };
        if (flagged != null) {
          var nb = el('input', 'note'); nb.type = 'text'; nb.value = flagged; nb.placeholder = 'what is wrong with this row?';
          nb.oninput = function () { st(s.idx).flags[id] = nb.value; save(); };
          row.appendChild(nb);
        }
        sec.appendChild(row);
      });
      w.appendChild(sec);
    });
    return w;
  }

  /* ---- numbers + DPR ---- */
  function renderNumbers(s) {
    var d = el('div'), rd = s.read, b = s.card;
    if (!rd) { d.appendChild(el('div', 'warn', 'the checker could not read this sheet' + (s.error ? ': ' + esc(s.error) : ''))); return d; }
    var cls = function (v, lo, hi) { return v == null || lo == null ? '' : (v < lo || v > hi) ? ' class="bad"' : ' class="good"'; };
    var kv = el('dl', 'kv');
    var lab = Number(s.header.cr), read = Number(rd.read);
    kv.innerHTML =
      '<dt>label CR</dt><dd>' + esc(s.header.cr) + '</dd>'
      + '<dt>reads as</dt><dd' + (Math.abs(read - lab) >= 1.5 ? ' class="bad"' : '') + '>CR ' + rd.read + '  <span style="color:var(--dim)">(def ' + rd.def + ' / off ' + rd.off + ')</span></dd>'
      + (b ? '<dt>AC</dt><dd' + (Math.abs(Number(s.header.ac) - b.ac) >= 3 ? ' class="softc"' : '') + '>' + esc(s.header.ac) + ' <span style="color:var(--dim)">(card ' + b.ac + ')</span></dd>'
        + '<dt>HP</dt><dd' + cls(Number(s.header.hp), b.hpLo, b.hpHi) + '>' + esc(s.header.hp) + ' <span style="color:var(--dim)">(card ' + b.hp + ', path ' + b.hpLo + '–' + b.hpHi + ')</span></dd>'
        + '<dt>round</dt><dd' + cls(rd.sustained, b.dprLo, b.dprHi) + '>' + rd.sustained + ' <span style="color:var(--dim)">(card ' + b.dpr + ', path ' + b.dprLo + '–' + b.dprHi + (b.legendary ? ', legendary +25%' : '') + ')</span></dd>'
        + '<dt>attack</dt><dd>' + sgn(rd.atkBest) + ' <span style="color:var(--dim)">(card ' + sgn(b.atk) + (s.printAt && s.printAt.atkMid ? '; print at CR ' + esc(s.header.cr) + ' runs ' + sgn(s.printAt.atk[0]) + ' to ' + sgn(s.printAt.atk[1]) + ', median ' + sgn(s.printAt.atkMid) : '') + ')</span></dd>'
        + '<dt>best DC</dt><dd>' + rd.dcBest + ' <span style="color:var(--dim)">(card ' + b.dc + (s.printAt && s.printAt.dcMid ? '; print ' + s.printAt.dc[0] + '–' + s.printAt.dc[1] + ', median ' + s.printAt.dcMid : '') + ')</span></dd>' : '')
      + (rd.nova ? '<dt>nova</dt><dd>' + esc(rd.nova.name || '?') + (rd.nova.gate ? ' <span style="color:var(--dim)">' + esc(rd.nova.gate) + (rd.nova.area ? ' · area' : '') + '</span>' : '') + (rd.nova.avg != null ? ' ' + rd.nova.avg : '') + '</dd>' : '')
      + '<dt>attacks</dt><dd>' + rd.attacks + ' × ' + esc(rd.used && rd.used.name) + ' (' + (rd.used && rd.used.avg) + ')</dd>';
    d.appendChild(kv);

    /* the DPR calculator. Our own gate priced an at-will area swap at zero, which is how three
       hot sheets read in band — so the swap is selectable here and the round re-prices live. */
    var calc = el('div', 'dpr');
    var defAC = b ? b.ac : 15;
    calc.innerHTML = '<label style="font-size:12px;color:var(--dim)">target AC <b class="acv">' + defAC + '</b></label>';
    var slider = el('input'); slider.type = 'range'; slider.min = 10; slider.max = 22; slider.value = defAC;
    calc.appendChild(slider);
    var IS_ATK_OUTER = /Attack Roll|(?:Melee|Ranged) (?:Weapon|Spell) Attack:/;
    var swaps = [], multi = null;
    Object.keys(s.sections).forEach(function (k) {
      s.sections[k].forEach(function (r) {
        if (/^Multiattack/.test(r.name)) multi = r;
        if (IS_ATK_OUTER.test(r.text)) return;
        if (multi && new RegExp('\\b' + r.name.replace(/ \(.*\)$/, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b').test(multi.text)) swaps.push(r);
      });
    });
    var swapSel = null;
    if (swaps.length) {
      var sw = el('div', 'swap'); sw.innerHTML = 'replace one attack with: ';
      swapSel = el('select'); swapSel.innerHTML = '<option value="">— nothing (attacks only) —</option>'
        + swaps.map(function (r, i) { return '<option value="' + i + '">' + esc(r.name) + '</option>'; }).join('');
      sw.appendChild(swapSel); calc.appendChild(sw);
    }
    var tbl = el('table'); calc.appendChild(tbl);
    /* BOTH PRINTINGS. 2024 writes "*Melee Attack Roll:* +10, reach…"; 2014 writes "Melee Weapon
       Attack: +10 to hit, reach…". Half of a sweep is 2014 (20 of 40 on sweep 3, 29 of the 56
       attack rows), and a reader that knows only one idiom renders an EMPTY calculator on those
       cards while looking fine — the two-printings trap (memory: a-parser-reporting-zero). */
    var IS_ATK = /Attack Roll|(?:Melee|Ranged) (?:Weapon|Spell) Attack:/;
    var atkRows = [];
    Object.keys(s.sections).forEach(function (k) { s.sections[k].forEach(function (r) { if (IS_ATK.test(r.text)) atkRows.push(r); }); });
    var avgOf = function (txt) { var m = txt.match(/\d+ \(\d+d\d+(?: [+-] \d+)?\)/g) || []; return m.reduce(function (a, p) { return a + Number(/^(\d+)/.exec(p)[1]); }, 0); };
    var bonusOf = function (txt) {
      var m = /Attack Roll:\*? ([+-]\d+)/.exec(txt) || /Attack:\*? ([+-]\d+) to hit/.exec(txt);
      return m ? Number(m[1]) : null;
    };
    function draw() {
      var ac = Number(slider.value); calc.querySelector('.acv').textContent = ac;
      var used = rd.used && rd.used.name, n = rd.attacks || 1;
      var main = atkRows.filter(function (r) { return r.name === used; })[0] || atkRows[0];
      var swapR = swapSel && swapSel.value !== '' ? swaps[Number(swapSel.value)] : null;
      var rows = '', total = 0;
      if (main) {
        var ab = bonusOf(main.text), hit = ab == null ? null : Math.max(0.05, Math.min(0.95, (21 - (ac - ab)) / 20));
        var av = avgOf(main.text), count = swapR ? Math.max(0, n - 1) : n;
        var exp = hit == null ? av * count : av * hit * count;
        total += exp;
        rows += '<tr><td>' + esc(main.name) + ' ×' + count + '</td><td>' + (hit == null ? '—' : Math.round(hit * 100) + '%') + '</td><td>' + av + '</td><td>' + exp.toFixed(1) + '</td></tr>';
      }
      if (swapR) {
        var sv = avgOf(swapR.text);
        // case-insensitive: 2014 writes "cone" lowercase, and a capitalised test read print's own
        // dragon breaths as single-target (memory: a-parser-reporting-zero, 2026-11-05)
        var area = /\b(?:cone|line|emanation|sphere|cube|cylinder)\b|each creature (?:within|in)/i.test(swapR.text);
        var targets = area ? 2 : 1;
        var e2 = sv * 0.73 * targets; // a save for half: ~ the usual read
        total += e2;
        rows += '<tr><td>' + esc(swapR.name) + (area ? ' <span style="color:var(--bad)">· area ×' + targets + '</span>' : '') + '</td><td>save</td><td>' + sv + '</td><td>' + e2.toFixed(1) + '</td></tr>';
      }
      var three = total * 3 + (rd.nova && rd.nova.avg != null ? Number(rd.nova.avg) * (rd.nova.area ? 2 : 1) : 0);
      /* TWO DIFFERENT NUMBERS, BOTH RIGHT, so they are labelled: the checker's `sustained` above
         is RAW damage (what the CARD is built from — its fight model prices a round as if every
         attack hits and every save fails),
         while this total applies hit chance at the chosen AC. Gormak reads 106 raw and 76
         expected at AC 17; the comparison that matters is 42 -> 76 when the area swap is taken. */
      tbl.innerHTML = '<tr><th>row</th><th>hit</th><th>avg</th><th>expected</th></tr>' + rows
        + '<tr class="tot"><td>round at AC ' + ac + ' <span style="font-weight:400;color:var(--dim)">(expected)</span></td><td></td><td></td><td>' + total.toFixed(1) + '</td></tr>'
        + '<tr><td style="color:var(--dim)">checker\'s raw round</td><td></td><td></td><td>' + rd.sustained + '</td></tr>'
        + '<tr><td style="color:var(--dim)">three rounds' + (rd.nova ? ' + nova once' : '') + '</td><td></td><td></td><td>' + three.toFixed(0) + '</td></tr>'
        /* THE CARD IS THE AUTHORITY (owner, 2026-11-10). Was the 2014 DMG band, which runs hot
           against the 2024 MM and read every sheet cold. Blog of Holding v2: CR 1-20 is 7.5/CR
           damage rounded up to 5 and 15 + 15/CR hit points, +25% damage for a legendary. The
           orange path is the design target; outside it is an outlier, not a defect. */
        + (b ? '<tr><td style="color:var(--dim)">card dpr at CR ' + esc(s.header.cr) + (b.legendary ? ' (legendary +25%)' : '') + '</td><td></td><td></td><td><b>' + b.dpr + '</b> <span style="color:var(--dim)">path ' + b.dprLo + '–' + b.dprHi + '</span></td></tr>'
             + '<tr><td style="color:var(--dim)">card hp at CR ' + esc(s.header.cr) + '</td><td></td><td></td><td><b>' + b.hp + '</b> <span style="color:var(--dim)">path ' + b.hpLo + '–' + b.hpHi + '</span>' + (s.header.hp ? '  ·  sheet ' + esc(s.header.hp) : '') + '</td></tr>'
             + '<tr><td style="color:var(--dim)">card ac / atk / dc</td><td></td><td></td><td>' + b.ac + ' / +' + b.atk + ' / ' + b.dc + '</td></tr>' : '');
    }
    slider.oninput = draw; if (swapSel) swapSel.onchange = draw; draw();
    d.appendChild(calc);
    return d;
  }

  function renderReceipts(s) {
    var d = el('div'), fid = s.fidelity;
    if (fid) {
      var ul = el('ul', 'find');
      (fid.credits || []).forEach(function (c) {
        var got = c.row ? 'answered by <b>' + esc(c.row) + '</b>' : c.note ? '<span class="softc">' + esc(c.note) + '</span>' : '<span class="good">credited</span>';
        ul.appendChild(el('li', null, '<code>' + esc(c.clause) + '</code> — ' + got));
      });
      (fid.dropped || []).forEach(function (c) { ul.appendChild(el('li', null, '<code>' + esc(c) + '</code> — <span class="bad">dropped</span>')); });
      (fid.brokenLacks || []).forEach(function (c) { ul.appendChild(el('li', null, '<code>' + esc(c.text || c) + '</code> — <span class="bad">absence not honoured</span>')); });
      if (!ul.children.length) ul.appendChild(el('li', null, '<span style="color:var(--dim)">no clauses recorded</span>'));
      d.appendChild(el('div', null, '<b style="font-size:12px">what was typed → what answers it</b>'));
      d.appendChild(ul);
      if (fid.total) d.appendChild(el('div', null, '<span style="color:var(--dim);font-size:12px">covered ' + fid.covered + ' of ' + fid.total + '</span>'));
    }
    var f = s.findings.filter(function (x) { return x.severity === 'fail'; });
    var so = s.findings.filter(function (x) { return x.severity !== 'fail'; });
    [['FAIL', f, 'bad'], ['SOFT', so, 'softc']].forEach(function (p) {
      if (!p[1].length) return;
      d.appendChild(el('div', null, '<b class="' + p[2] + '" style="font-size:12px">' + p[0] + ' ' + p[1].length + '</b>'));
      var u = el('ul', 'find');
      p[1].forEach(function (x) { u.appendChild(el('li', null, '<code>' + esc(x.rule) + '</code> ' + esc(x.message || ''))); });
      d.appendChild(u);
    });
    if (!f.length && !so.length) d.appendChild(el('div', null, '<span class="good" style="font-size:12px">checker clean</span>'));
    return d;
  }

  function renderTrace(s) {
    var d = el('div'), box = el('input'); box.type = 'text'; box.placeholder = 'filter the trace…';
    box.style.cssText = 'width:100%;font:11px ui-monospace,Menlo,monospace;padding:.2rem;margin-bottom:.3rem';
    var pre = el('div', 'trace');
    var DEC = /refused|withheld|dropped|STAYS|leaves|gated|not claimed|names no absence/;
    function draw() {
      var q = box.value.toLowerCase();
      pre.innerHTML = '';
      s.trace.filter(function (l) { return !q || l.toLowerCase().indexOf(q) >= 0; })
        .forEach(function (l) { pre.appendChild(el('div', DEC.test(l) ? 'dec' : null, esc(l))); });
    }
    box.oninput = draw; draw();
    d.appendChild(box); d.appendChild(pre);
    return d;
  }

  function panel(title, open, body) {
    var p = el('details', 'panel'); p.open = open;
    p.appendChild(el('summary', null, title));
    var w = el('div'); w.appendChild(body); p.appendChild(w);
    return p;
  }

  function render() {
    var app = document.getElementById('app'); app.innerHTML = '';
    var tally = { Keeper: 0, Runs: 0, Tweak: 0, Fix: 0 };
    RUN.sheets.forEach(function (s) { var v = (state[s.idx] || {}).verdict; if (v) tally[v]++; });
    var done = Object.keys(tally).reduce(function (a, k) { return a + tally[k]; }, 0);

    var top = el('header', 'top');
    top.appendChild(el('h1', null, esc(RUN.run)));
    top.appendChild(el('span', 'tally', 'Keeper ' + tally.Keeper + ' · Runs ' + tally.Runs + ' · Tweak ' + tally.Tweak + ' · Fix ' + tally.Fix + '  —  ' + done + '/' + RUN.sheets.length + ' read'));
    [['all', 'all'], ['fails', 'checker FAIL'], ['unread', 'unread'], ['flagged', 'flagged']].forEach(function (p) {
      var b = el('button', filter === p[0] ? 'on' : null, p[1]);
      b.onclick = function () { filter = p[0]; render(); };
      top.appendChild(b);
    });
    var ex = el('button', null, 'copy markdown');
    ex.onclick = function () {
      var lines = ['| # | sheet | typed | path | checker | verdict | note | flagged rows |', '|---|---|---|---|---|---|---|---|'];
      RUN.sheets.forEach(function (s) {
        var S = state[s.idx] || { flags: {} };
        var fl = Object.keys(S.flags || {}).map(function (k) { return k + (S.flags[k] ? ' (' + S.flags[k] + ')' : ''); }).join('; ');
        lines.push('| ' + s.idx + ' | ' + s.name + ' | `' + (s.input || '') + '` | ' + s.pathKind + ' | '
          + (s.findings.filter(function (x) { return x.severity === 'fail'; }).length ? 'FAIL ' + s.findings.filter(function (x) { return x.severity === 'fail'; }).map(function (x) { return x.rule; }).join(' ') : 'ok')
          + ' | ' + (S.verdict || '') + ' | ' + (S.note || '').replace(/\|/g, '/') + ' | ' + fl.replace(/\|/g, '/') + ' |');
      });
      lines.push('', 'Keeper ' + tally.Keeper + ' · Runs ' + tally.Runs + ' · Tweak ' + tally.Tweak + ' · Fix ' + tally.Fix + '  (' + RUN.run + ')');
      var txt = lines.join('\n');
      navigator.clipboard && navigator.clipboard.writeText(txt).then(function () { ex.textContent = 'copied ✓'; setTimeout(function () { ex.textContent = 'copy markdown'; }, 1500); },
        function () { window.prompt('copy:', txt); });
    };
    top.appendChild(ex);
    app.appendChild(top);

    var wrap = el('div', 'wrap'), nav = el('nav', 'index'), main = el('main');
    var shown = RUN.sheets.filter(function (s) {
      var S = state[s.idx] || {};
      if (filter === 'fails') return s.findings.some(function (x) { return x.severity === 'fail'; });
      if (filter === 'unread') return !S.verdict;
      if (filter === 'flagged') return Object.keys(S.flags || {}).length;
      return true;
    });
    RUN.sheets.forEach(function (s) {
      var S = state[s.idx] || {};
      var nf = s.findings.filter(function (x) { return x.severity === 'fail'; }).length;
      var ed = '<span class="ed ed-' + esc(s.format) + '">' + esc(s.format) + '</span>';
      var a = el('a', null, '<b>' + s.idx + '</b> ' + esc(s.name) + ' ' + ed + '<br><span class="chips">' + esc(s.pathKind)
        + (nf ? ' · <span class="bad">FAIL ' + nf + '</span>' : '') + (S.verdict ? ' · ' + S.verdict : '') + '</span>');
      a.href = '#s' + s.idx; nav.appendChild(a);
    });
    shown.forEach(function (s) {
      var S = st(s.idx);
      var card = el('section', 'sheet' + (S.verdict ? ' done' : '') + (s.format === '2014' ? ' ed2014' : '')); card.id = 's' + s.idx;
      var hd = el('div', 'hd');
      hd.innerHTML = '<h2>' + s.idx + '. ' + esc(s.name) + ' <span class="ed ed-' + esc(s.format) + '">' + esc(s.format) + '</span></h2><span class="typed">' + esc(s.input || '(no input line)') + '</span>'
        + '<span style="color:var(--dim);font-size:12px">' + esc(s.pathLine || s.pathKind) + ' · ' + esc(s.donor) + '</span>';
      card.appendChild(hd);
      if (!s.rowCount) card.appendChild(el('div', 'warn', 'this sheet read ZERO rows — the reader missed its printing'));
      var cols = el('div', 'cols');
      cols.appendChild(renderBlock(s));
      var right = el('div');
      right.appendChild(panel('Numbers &amp; DPR', true, renderNumbers(s)));
      right.appendChild(panel('Receipts &amp; checker', true, renderReceipts(s)));
      right.appendChild(panel('Trace (' + s.trace.length + ' lines)', false, renderTrace(s)));
      cols.appendChild(right);
      card.appendChild(cols);
      var v = el('div', 'verdict');
      ['Keeper', 'Runs', 'Tweak', 'Fix'].forEach(function (k) {
        var b = el('button', 'v-' + k + (S.verdict === k ? ' on' : ''), k);
        b.onclick = function () { S.verdict = S.verdict === k ? '' : k; save(); render(); };
        v.appendChild(b);
      });
      var n = el('input'); n.type = 'text'; n.value = S.note || ''; n.placeholder = 'note for this sheet';
      n.oninput = function () { S.note = n.value; save(); };
      v.appendChild(n);
      card.appendChild(v);
      main.appendChild(card);
    });
    if (!shown.length) main.appendChild(el('p', null, '<span style="color:var(--dim)">nothing matches this filter.</span>'));
    wrap.appendChild(nav); wrap.appendChild(main); app.appendChild(wrap);
  }

  document.addEventListener('keydown', function (e) {
    if (/input|select|textarea/i.test((e.target.tagName || ''))) return;
    if (e.key !== 'j' && e.key !== 'k') return;
    var cards = [].slice.call(document.querySelectorAll('.sheet'));
    var y = window.scrollY + 60;
    var i = cards.findIndex(function (c) { return c.offsetTop > y; });
    var t = e.key === 'j' ? cards[i] : cards[Math.max(0, (i === -1 ? cards.length : i) - 2)];
    if (t) window.scrollTo({ top: t.offsetTop - 50, behavior: 'smooth' });
  });

  render();
})();
