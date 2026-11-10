/* ========================================================
   Dominion Hour · Prophetic Impartation · interactive layer
   ======================================================== */

/* ---------- TIMELINE (expand/collapse) ---------- */
document.querySelectorAll('.tl-item').forEach((item) => {
  const btn = item.querySelector('.tl-dot');
  const head = item.querySelector('.tl-head');
  const body = item.querySelector('.tl-body');
  const toggle = () => {
    const isOpen = item.classList.toggle('open');
    body.hidden = !isOpen;
    btn.setAttribute('aria-expanded', String(isOpen));
  };
  btn.addEventListener('click', toggle);
  head.addEventListener('click', toggle);
});

/* ---------- SCRIPTURE TABS ---------- */
const tabs = document.querySelectorAll('.tabs .tab');
const panels = document.querySelectorAll('.panel');
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    panels.forEach((p) => p.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const id = tab.dataset.tab;
    document.getElementById(id).classList.add('active');
  });
});

/* ---------- SMOOTH SCROLL FOR TOP NAV & STAT CARDS ---------- */
document.querySelectorAll('.top-nav a, .hero-cta a, [data-scroll]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });

      /* Stat card "2 Kings 3" → also activate the first Scripture Vault tab */
      if (a.classList.contains('stat')) {
        const label = (a.textContent || '').toLowerCase();
        if (label.includes('2 kings')) {
          const first = document.querySelector('.tab[data-tab="s1"]');
          if (first) first.click();
        }
      }
    }
  });
});

/* ---------- CHART: Two Reports ---------- */
window.addEventListener('load', () => {
  const ctx = document.getElementById('reportChart');
  if (!ctx || typeof Chart === 'undefined') return;
  const gold = '#C9A24B';
  const navy = '#0B1F3A';
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: [
        'Sees the Promise',
        'Trusts the Word',
        'Magnifies God',
        'Confronts the Giants',
        'Believes for Overflow'
      ],
      datasets: [
        {
          label: 'Faith Report (Joshua & Caleb)',
          data: [10, 10, 10, 9, 10],
          backgroundColor: 'rgba(201,162,75,.32)',
          borderColor: gold, borderWidth: 2,
          pointBackgroundColor: gold, pointRadius: 4
        },
        {
          label: 'Fear Report (Ten spies)',
          data: [4, 3, 2, 1, 2],
          backgroundColor: 'rgba(11,31,58,.20)',
          borderColor: navy, borderWidth: 2,
          pointBackgroundColor: navy, pointRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0B1F3A',
          titleColor: '#E4C070',
          bodyColor: '#FBF6EB',
          padding: 12
        }
      },
      scales: {
        r: {
          suggestedMin: 0, suggestedMax: 10,
          angleLines: { color: 'rgba(11,31,58,.15)' },
          grid: { color: 'rgba(11,31,58,.10)' },
          pointLabels: { color: '#0B1F3A', font: { size: 12, weight: '600' } },
          ticks: { display: false, stepSize: 2 }
        }
      }
    }
  });
  // Force a min-height on canvas for responsiveness
  ctx.style.minHeight = '320px';
});

/* ---------- QUIZ ---------- */
const QUESTIONS = [
  {
    q: 'Prophet Prince opened with: what did Elisha call for before the word of the LORD came upon him?',
    choices: ['A scroll', 'A minstrel', 'A prophet', 'A priest'],
    answer: 1,
    verse: '“But now bring me a minstrel. And it came to pass, when the minstrel played, that the hand of the LORD came upon him.” — 2 Kings 3:15 KJV'
  },
  {
    q: 'What phrase did Prophet Prince return to again and again from 2 Kings 3:18?',
    choices: [
      '“Nothing is impossible with God.”',
      '“This is but a light thing in the sight of the LORD.”',
      '“Faith comes by hearing.”',
      '“Peace, be still.”'
    ],
    answer: 1,
    verse: '“And this is but a light thing in the sight of the LORD: he will deliver the Moabites also into your hand.” — 2 Kings 3:18 KJV'
  },
  {
    q: 'God told the three kings He would give them water without which two things?',
    choices: ['Wind and rain', 'Sword and shield', 'Sun and moon', 'Prayer and fasting'],
    answer: 0,
    verse: '“Ye shall not see wind, neither shall ye see rain; yet that valley shall be filled with water.” — 2 Kings 3:17 KJV'
  },
  {
    q: 'Which Bible pair did Prophet Prince use to show that closeness to the anointed brings blessing?',
    choices: ['Ruth and Boaz', 'David and Jonathan', 'Lot and Abraham', 'Peter and John'],
    answer: 2,
    verse: '“And Lot also, which went with Abram, had flocks, and herds, and tents.” — Genesis 13:5 KJV'
  },
  {
    q: 'In Numbers 13, how did the ten spies describe themselves before the giants?',
    choices: ['Warriors', 'Giants themselves', 'Grasshoppers', 'Lambs'],
    answer: 2,
    verse: '“And we were in our own sight as grasshoppers, and so we were in their sight.” — Numbers 13:33 KJV'
  },
  {
    q: 'What did Caleb say about the same land the ten spies rejected?',
    choices: [
      '“We must build an army first.”',
      '“Let us go up at once, and possess it; for we are well able to overcome it.”',
      '“Let us wait on the LORD.”',
      '“The giants are too many.”'
    ],
    answer: 1,
    verse: '“Let us go up at once, and possess it; for we are well able to overcome it.” — Numbers 13:30 KJV'
  },
  {
    q: 'Prophet Prince said the same Spirit that raised Christ from the dead — what?',
    choices: [
      'Sleeps until the last day.',
      'Dwells in you and quickens your mortal body.',
      'Comes only on Sundays.',
      'Was given only to apostles.'
    ],
    answer: 1,
    verse: '“…the Spirit of him that raised up Jesus from the dead… shall also quicken your mortal bodies.” — Romans 8:11 KJV'
  },
  {
    q: 'What did Jesus declare to Martha at the tomb of Lazarus?',
    choices: [
      '“I am the way and the truth.”',
      '“I am the bread of life.”',
      '“I am the resurrection, and the life.”',
      '“I am the good shepherd.”'
    ],
    answer: 2,
    verse: '“I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live.” — John 11:25 KJV'
  },
  {
    q: 'What did Prophet Prince tell every believer to declare out loud?',
    choices: [
      '“I am unstoppable.”',
      '“I am not a victim.”',
      '“I am successful.”',
      '“I deserve better.”'
    ],
    answer: 1,
    verse: 'Luke 10:19 KJV — “Behold, I give unto you power to tread on serpents… and nothing shall by any means hurt you.”'
  },
  {
    q: 'What double blessing did Elisha receive that Prophet Prince applied to us: “where others crawl, you will _____; where others run, you will _____”?',
    choices: [
      'walk / stand',
      'run / fly',
      'pray / prophesy',
      'rest / lead'
    ],
    answer: 1,
    verse: '“They shall run, and not be weary; and they shall walk, and not faint.” — Isaiah 40:31 KJV'
  }
];

const quizContent = document.getElementById('quiz-content');
const quizResult = document.getElementById('quiz-result');
const qBar = document.getElementById('qbar');
const qNum = document.getElementById('qnum');
const qTotal = document.getElementById('qtotal');
qTotal.textContent = QUESTIONS.length;

let qi = 0;
let score = 0;

function renderQuestion() {
  const q = QUESTIONS[qi];
  qNum.textContent = qi + 1;
  qBar.style.width = ((qi) / QUESTIONS.length * 100) + '%';
  quizContent.innerHTML = `
    <p class="qtext">${q.q}</p>
    <div class="qchoices" role="listbox">
      ${q.choices.map((c, i) => `<button class="qchoice" data-i="${i}">${c}</button>`).join('')}
    </div>
    <div class="qfeedback" id="qfeedback"></div>
    <div class="qnext" id="qnext-wrap" style="display:none;">
      <button class="btn btn-gold" id="qnext">${qi === QUESTIONS.length - 1 ? 'See Score →' : 'Next Question →'}</button>
    </div>
  `;
  const buttons = quizContent.querySelectorAll('.qchoice');
  const feedback = quizContent.querySelector('#qfeedback');
  const nextWrap = quizContent.querySelector('#qnext-wrap');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const chosen = Number(btn.dataset.i);
      buttons.forEach((b) => b.setAttribute('disabled', 'true'));
      if (chosen === q.answer) {
        btn.classList.add('correct');
        score++;
        feedback.innerHTML = `<strong>Amen.</strong> ${q.verse}`;
      } else {
        btn.classList.add('wrong');
        buttons[q.answer].classList.add('correct');
        feedback.innerHTML = `<strong>The Word says:</strong> ${q.verse}`;
      }
      feedback.classList.add('show');
      nextWrap.style.display = 'flex';
      qBar.style.width = ((qi + 1) / QUESTIONS.length * 100) + '%';
    });
  });
  quizContent.querySelector('#qnext').addEventListener('click', () => {
    qi++;
    if (qi >= QUESTIONS.length) {
      showResult();
    } else {
      renderQuestion();
    }
  });
}

function showResult() {
  quizContent.style.display = 'none';
  quizResult.hidden = false;
  const pct = Math.round((score / QUESTIONS.length) * 100);
  document.getElementById('quiz-score-line').textContent = `${score} / ${QUESTIONS.length} · ${pct}%`;
  let word = '';
  if (pct === 100) word = '🏆 Full marks — you carry the Word in your mouth. Go and declare it.';
  else if (pct >= 80) word = '🕊️ Very strong. Review the two you missed and re-read 2 Kings 3.';
  else if (pct >= 60) word = '📖 Good foundation. Sit with the Recall Sheet this week and try again.';
  else word = '🙏 The Word is still ministering. Read the workbook, listen again, and come back.';
  document.getElementById('quiz-score-word').textContent = word;
}

document.getElementById('restart-quiz').addEventListener('click', () => {
  qi = 0; score = 0;
  quizResult.hidden = true;
  quizContent.style.display = 'block';
  renderQuestion();
});

renderQuestion();

/* ---------- DECLARATIONS ---------- */
const DECS = [
  {
    text: 'I am not a victim. I am a son (daughter) of God, filled with the Spirit of Him who raised Christ from the dead.',
    verse: '“But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name.”',
    ref: 'John 1:12 KJV'
  },
  {
    text: 'The valley of my life shall be filled with water — without wind, without rain — for this is but a light thing in the sight of my God.',
    verse: '“For thus saith the LORD, Ye shall not see wind, neither shall ye see rain; yet that valley shall be filled with water… And this is but a light thing in the sight of the LORD.”',
    ref: '2 Kings 3:17–18 KJV'
  },
  {
    text: 'Every Moabite spirit assigned against my destiny is delivered into my hand today, in Jesus\u2019 name.',
    verse: '“And this is but a light thing in the sight of the LORD: he will deliver the Moabites also into your hand.”',
    ref: '2 Kings 3:18 KJV'
  },
  {
    text: 'I refuse the grasshopper report over my life. I magnify the LORD, and my giants shrink before the Word of God.',
    verse: '“O magnify the LORD with me, and let us exalt his name together.”',
    ref: 'Psalm 34:3 KJV'
  },
  {
    text: 'I am connected to the anointing. Like Lot with Abraham, the overflow of the Kingdom reaches me.',
    verse: '“And Lot also, which went with Abram, had flocks, and herds, and tents.”',
    ref: 'Genesis 13:5 KJV'
  },
  {
    text: 'I receive the impartation of the Holy Ghost — victory, blessing, and dominion by the Spirit of the Lord.',
    verse: '“But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me…”',
    ref: 'Acts 1:8 KJV'
  },
  {
    text: 'The grace to do more is on me. Where others crawl, I run; where others run, I fly.',
    verse: '“But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.”',
    ref: 'Isaiah 40:31 KJV'
  },
  {
    text: 'My hands are anointed. Whatever I put my hand to shall prosper by the grace of Jesus Christ.',
    verse: '“The LORD shall command the blessing upon thee in thy storehouses, and in all that thou settest thine hand unto.”',
    ref: 'Deuteronomy 28:8 KJV'
  },
  {
    text: 'My doorpost is marked by the blood of Jesus. No plague, no destroyer, no evil arrow shall enter my dwelling.',
    verse: '“And when I see the blood, I will pass over you, and the plague shall not be upon you to destroy you, when I smite the land of Egypt.”',
    ref: 'Exodus 12:13 KJV'
  },
  {
    text: 'The Potter is not finished with me. Every broken place in my life is being re-formed for glory.',
    verse: '“And the vessel that he made of clay was marred in the hand of the potter: so he made it again another vessel, as seemed good to the potter to make it.”',
    ref: 'Jeremiah 18:4 KJV'
  },
  {
    text: 'I tread on serpents and scorpions, and nothing shall by any means hurt me — for this is my inheritance in Christ.',
    verse: '“Behold, I give unto you power to tread on serpents and scorpions, and over all the power of the enemy: and nothing shall by any means hurt you.”',
    ref: 'Luke 10:19 KJV'
  },
  {
    text: 'Jesus is the resurrection and the life. Every dead thing in me, in my family, and in my calling rises today. Amen.',
    verse: '“Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live.”',
    ref: 'John 11:25 KJV'
  }
];

const decGrid = document.getElementById('decGrid');
DECS.forEach((d, i) => {
  const el = document.createElement('div');
  el.className = 'dec-card' + (i === 0 ? ' active' : '');
  el.setAttribute('role', 'button');
  el.setAttribute('tabindex', '0');
  el.dataset.i = i;
  el.innerHTML = `
    <div class="dec-num">${String(i + 1).padStart(2, '0')}</div>
    <p class="dec-text">&ldquo;${d.text}&rdquo;</p>
    <div class="dec-verse">
      <p class="dec-verse-text">${d.verse}</p>
      <p class="dec-verse-ref">— ${d.ref}</p>
    </div>`;
  decGrid.appendChild(el);
});

let decIdx = 0;
const decCards = () => document.querySelectorAll('.dec-card');
function highlightDec(i) {
  decIdx = ((i % DECS.length) + DECS.length) % DECS.length;
  decCards().forEach((c) => c.classList.toggle('active', Number(c.dataset.i) === decIdx));
  decCards()[decIdx].scrollIntoView({ behavior: 'smooth', block: 'center' });
}
decGrid.addEventListener('click', (e) => {
  const card = e.target.closest('.dec-card');
  if (!card) return;
  highlightDec(Number(card.dataset.i));
});
decGrid.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const card = e.target.closest('.dec-card');
  if (!card) return;
  e.preventDefault();
  highlightDec(Number(card.dataset.i));
});
document.getElementById('next-dec').addEventListener('click', () => highlightDec(decIdx + 1));
document.getElementById('prev-dec').addEventListener('click', () => highlightDec(decIdx - 1));
