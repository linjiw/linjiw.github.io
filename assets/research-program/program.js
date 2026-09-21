(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const projects = [...document.querySelectorAll('.project')];
  const search = $('#search'), lane = $('#lane');
  function filter() {
    const q = search.value.trim().toLocaleLowerCase();
    let n = 0;
    projects.forEach(p => {
      p.hidden = !(p.textContent.toLocaleLowerCase().includes(q) && (lane.value === 'All areas' || p.dataset.lane === lane.value));
      if (!p.hidden) n++;
    });
    $('#count').textContent = `${n} of ${projects.length} tracks shown`;
    $('#empty').hidden = n !== 0;
  }
  search.addEventListener('input', filter); lane.addEventListener('change', filter);
  $('#reset').addEventListener('click', () => { search.value = ''; lane.value = 'All areas'; filter(); });
  function revealHash() {
    const id = decodeURIComponent(location.hash.slice(1));
    const target = projects.find(p => p.id === id);
    if (target && target.hidden) { search.value = ''; lane.value = 'All areas'; filter(); target.scrollIntoView(); }
  }
  window.addEventListener('hashchange', revealHash);
  document.querySelectorAll('.jump-list a').forEach(a => a.addEventListener('click', () => { search.value = ''; lane.value = 'All areas'; filter(); }));
  const studies = {
    clearance: { title: 'Complete-task coverage · six requests', max: 6, rows: [['Fixed local duck',5,'5/6'],['Fixed IK lowered',5,'5/6'],['Geometry shadow rule',2,'2/6','shadow'],['Finite-ledger shadow rule',0,'0/6','shadow']], note: 'Twelve fixed executions, two candidates per request. Brown bars combine pre-action shadow choices with measured fixed outcomes; they are not public rollouts. Both fixed references fail on the same request. No method establishes a safe clearance interval.', source:'/kimonav/clearance/' },
    student: { title: 'Unaided task completions · twelve tasks per arm', max:12, rows:[['Initializer',10,'10/12'],['Demonstration replay',10,'10/12'],['History correction',8,'8/12']], note:'The coherent-history learning panel. Assisted continuations from learner histories had support, but training on corrections did not earn promotion. These are related development contexts, not independent held-out scene families.', source:'/assets/research-program/sources/m2s-learning.txt' },
    terrain: { title:'Soil failures · lower is better', max:60, rows:[['Starting policy',56,'56 failures'],['Staged shallow-to-deep practice',53,'53 failures'],['Direct deep-soil training',54,'54 failures']], note:'Fixed-duration runs with resets, across three reused development clips and three soil families at 14 cm depth. These counts are not binomial trials or success rates. Both candidates fail promotion; matched retained budgets omit extra discarded compute from interruptions.', source:'/assets/research-program/sources/terrain.txt' },
    flow: { title:'Checker milliseconds per valid return · lower is better', max:40, rows:[['Uniform16 + exact fallback',20.136,'20.136 ms'],['Exact continuous checking',38.147,'38.147 ms']], note:'Both preserve 375/432 scene–model returns on the same reused candidate bank. Three frozen fits on 144 scenes; CPU batch timings vary across repetitions. These are checker-only measurements, not end-to-end online latency or robot execution.', source:'/assets/research-program/sources/flow-hybrid.txt' }
  };
  function chart() {
    const s = studies[$('#study').value];
    const container = $('#chart'); container.replaceChildren();
    const title = document.createElement('h3'); title.className='chart-title'; title.textContent=s.title; container.append(title);
    s.rows.forEach(([label,value,display,kind]) => {
      const row=document.createElement('div'), caption=document.createElement('div'); caption.className='bar-label';
      const name=document.createElement('span'), number=document.createElement('strong'); name.textContent=label; number.textContent=display; caption.append(name,number);
      const track=document.createElement('div'), bar=document.createElement('div'); track.className='bar-track'; track.setAttribute('aria-hidden','true'); bar.className='bar'+(kind?' '+kind:''); bar.style.width=`${value/s.max*100}%`; track.append(bar); row.append(caption,track); container.append(row);
    });
    const note=document.createElement('p'); note.className='chart-note'; note.textContent=s.note+' ';
    const link=document.createElement('a'); link.href=s.source; link.textContent='Read the source ↗'; note.append(link); container.append(note);
  }
  $('#study').addEventListener('change',chart); chart(); revealHash();
})();
