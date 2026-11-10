// Build per-section audio scripts with mixed Adam (declarations) + Brian (teaching) voices.
// Outputs:
//   /tmp/audio_jobs.json  — list of { section_id, segments: [{voice, text}], ... }
// Then a separate script will iterate and call ElevenLabs.

const fs = require('fs');
const vm = require('vm');

const ADAM_ID = 'pNInz6obpgDQGcFmaJgB';     // Dominant, firm — declarations
const BRIAN_ID = 'nPczCjzI2devNBz1zQrb';    // Deep, resonant, comforting — teaching

const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync('/home/user/workspace/altar-site/content.js','utf8'), sandbox);
const wb = sandbox.window.WORKBOOK;

// Classify each block type as ADAM (commanding) or BRIAN (warm)
const ADAM_TYPES = new Set(['prayer', 'declaration', 'key', 'warning']);
const BRIAN_TYPES = new Set(['lead', 'p', 'h', 'teaching', 'scripture', 'bullets', 'comparison', 'assignment', 'todo', 'reflect', 'endmark']);

function classify(b) {
  if (ADAM_TYPES.has(b.t)) return 'ADAM';
  if (BRIAN_TYPES.has(b.t)) return 'BRIAN';
  return 'BRIAN';
}

function blockToText(b) {
  if (['lead','p','h','key','teaching','warning','prayer','declaration','reflect'].includes(b.t)) return b.v;
  if (b.t === 'scripture') return ((b.ref||'') + '. ' + b.v);
  if (b.t === 'bullets') return b.v.join('. ');
  if (b.t === 'comparison') return b.headers[0]+': '+b.left.join('. ')+'. '+b.headers[1]+': '+b.right.join('. ');
  if (b.t === 'assignment') return b.title + '. ' + b.items.join('. ');
  if (b.t === 'todo') return 'Things to do. ' + b.v.join('. ');
  if (b.t === 'endmark') return b.v;
  return '';
}

const jobs = [];
let secIndex = 0;
(wb.parts || []).forEach(part => {
  (part.sections || []).forEach(sec => {
    secIndex++;
    const segments = [];
    // Title — Brian
    segments.push({ voice: 'BRIAN', voice_id: BRIAN_ID, text: sec.title + '.' });
    (sec.blocks || []).forEach(b => {
      const t = blockToText(b);
      if (!t || !t.trim()) return;
      const v = classify(b);
      const voice_id = v === 'ADAM' ? ADAM_ID : BRIAN_ID;
      segments.push({ voice: v, voice_id, text: t });
    });
    // Merge consecutive same-voice segments to reduce API calls
    const merged = [];
    segments.forEach(s => {
      if (merged.length && merged[merged.length-1].voice === s.voice) {
        merged[merged.length-1].text += ' ' + s.text;
      } else {
        merged.push({ ...s });
      }
    });
    const totalChars = merged.reduce((a,s)=>a+s.text.length,0);
    jobs.push({
      idx: secIndex,
      section_id: 's' + secIndex,
      part_title: part.title,
      section_title: sec.title,
      segments: merged,
      totalChars
    });
  });
});

fs.writeFileSync('/tmp/audio_jobs.json', JSON.stringify(jobs, null, 2));
console.log('Sections:', jobs.length);
console.log('Total segments to render:', jobs.reduce((a,j)=>a+j.segments.length,0));
console.log('Total characters to render:', jobs.reduce((a,j)=>a+j.totalChars,0));
console.log();
console.log('Per-section breakdown:');
jobs.forEach(j => {
  const adam = j.segments.filter(s=>s.voice==='ADAM').reduce((a,s)=>a+s.text.length,0);
  const brian = j.segments.filter(s=>s.voice==='BRIAN').reduce((a,s)=>a+s.text.length,0);
  console.log('  ' + j.idx + '. ' + j.section_title + ' — Adam ' + adam + 'ch, Brian ' + brian + 'ch (' + j.segments.length + ' segs)');
});
