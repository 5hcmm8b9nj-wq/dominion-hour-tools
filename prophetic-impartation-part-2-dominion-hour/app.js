/* ========================================================
   Dominion Hour with Prophet Prince Amo David
   Prophetic Impartation Part 2 — The Transfer of the Anointing
   Interactive layer
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

      /* Stat card "2 Kings 2" → also activate the first Scripture Vault tab */
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

/* ---------- CHART: Mantle Carrier vs Ordinary Servant ---------- */
window.addEventListener('load', () => {
  const ctx = document.getElementById('reportChart');
  if (!ctx || typeof Chart === 'undefined') return;
  const gold = '#C9A24B';
  const navy = '#0B1F3A';
  const isNarrow = window.innerWidth < 700;
  const fullLabels = [
    ['Honor for the', 'anointed'],
    'Loyal service',
    'Faith-defense',
    ['Patience with', 'God’s timing'],
    ['Willingness to walk', 'over Jordan']
  ];
  const shortLabels = ['Honor', 'Loyalty', 'Faith', 'Patience', 'The Walk'];
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: isNarrow ? shortLabels : fullLabels,
      datasets: [
        {
          label: 'Elisha — Double Portion',
          data: [10, 10, 10, 9, 10],
          backgroundColor: 'rgba(201,162,75,.32)',
          borderColor: gold, borderWidth: 2,
          pointBackgroundColor: gold, pointRadius: 4
        },
        {
          label: 'Ordinary Servant — No Mantle',
          data: [3, 2, 3, 2, 1],
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
          pointLabels: { color: '#0B1F3A', font: { size: isNarrow ? 11 : 12, weight: '600' } },
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
    q: 'What did Elisha ask Elijah for at the Jordan?',
    choices: ['A double portion of thy spirit', 'A new mantle', 'Silver and gold', 'A chariot of fire'],
    answer: 0,
    verse: '“And Elisha said, I pray thee, let a double portion of thy spirit be upon me.” — 2 Kings 2:9 KJV'
  },
  {
    q: 'What object did Elijah wrap up and use to smite the waters?',
    choices: ['His staff', 'His mantle', 'His girdle', 'A branch'],
    answer: 1,
    verse: '“And Elijah took his mantle, and wrapped it together, and smote the waters, and they were divided hither and thither.” — 2 Kings 2:8 KJV'
  },
  {
    q: 'When Elisha smote the water with the mantle, what did he cry out?',
    choices: [
      '“Peace, be still.”',
      '“Where is the LORD God of Elijah?”',
      '“Let the waters part.”',
      '“My father, my father.”'
    ],
    answer: 1,
    verse: '“And he took the mantle of Elijah that fell from him, and smote the waters, and said, Where is the LORD God of Elijah? and when he also had smitten the waters, they parted hither and thither: and Elisha went over.” — 2 Kings 2:14 KJV'
  },
  {
    q: 'How did Elisha honor Elijah, according to 2 Kings 3:11?',
    choices: [
      'He carried his scrolls',
      'He poured water on the hands of Elijah',
      'He built him an altar',
      'He paid his tithes'
    ],
    answer: 1,
    verse: '“…Here is Elisha the son of Shaphat, which poured water on the hands of Elijah.” — 2 Kings 3:11 KJV'
  },
  {
    q: 'Prophet Prince Amo David named four qualities that qualify a person to receive the mantle. Which is NOT one of them?',
    choices: ['Honor', 'Loyal Service', 'Silence', 'Patience', 'Defense of the Faith'],
    answer: 2,
    verse: 'The four qualities taught were Honor, Loyal Service, Defense of the Faith, and Patience — “But let patience have her perfect work.” — James 1:4 KJV'
  },
  {
    q: 'From Gilgal to Bethel to Jericho to Jordan — what phrase did Elisha keep repeating?',
    choices: [
      '“I will not leave thee”',
      '“Send me, Lord”',
      '“Teach me thy ways”',
      '“Give me the mantle”'
    ],
    answer: 0,
    verse: '“And Elisha said unto him, As the LORD liveth, and as thy soul liveth, I will not leave thee.” — 2 Kings 2:2 KJV'
  },
  {
    q: 'How many in Israel did God preserve who had not bowed to Baal?',
    choices: ['Twelve', 'One hundred', 'Seven thousand', 'Twelve thousand'],
    answer: 2,
    verse: '“Yet I have left me seven thousand in Israel, all the knees which have not bowed unto Baal, and every mouth which hath not kissed him.” — 1 Kings 19:18 KJV'
  },
  {
    q: 'Prophet Prince Amo David said “the oil of divine favor” does two things — speak AND ______?',
    choices: ['Accelerate', 'Multiply', 'Whisper', 'Sing'],
    answer: 0,
    verse: '“Divine acceleration, allowing you to pass delays.” — “But my horn shalt thou exalt like the horn of an unicorn: I shall be anointed with fresh oil.” Psalm 92:10 KJV'
  },
  {
    q: 'Who walked on the water at the word of Jesus, used as the picture of walking over your Jordan?',
    choices: ['John', 'Peter', 'Thomas', 'James'],
    answer: 1,
    verse: '“And he said, Come. And when Peter was come down out of the ship, he walked on the water, to go to Jesus.” — Matthew 14:29 KJV'
  },
  {
    q: 'What did Prophet Prince Amo David say about being lukewarm?',
    choices: [
      '“Lukewarm is a season everyone passes through.”',
      '“I refuse to be lukewarm. I connect to the fire of the Holy Ghost.”',
      '“Lukewarm believers still receive the mantle.”',
      '“Wait quietly until the fire comes.”'
    ],
    answer: 1,
    verse: '“…he shall baptize you with the Holy Ghost, and with fire.” — Matthew 3:11 KJV'
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
  else if (pct >= 80) word = '🕊️ Very strong. Review the ones you missed and re-read 2 Kings 2.';
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
    text: 'I receive the transfer. I receive the mantle. I receive the double portion of the Spirit upon my life.',
    verse: '“And Elisha said, I pray thee, let a double portion of thy spirit be upon me.”',
    ref: '2 Kings 2:9 KJV'
  },
  {
    text: 'I refuse to be lukewarm. I connect to the fire of the Holy Ghost. I will not backslide.',
    verse: '“I indeed baptize you with water unto repentance: but he that cometh after me is mightier than I, whose shoes I am not worthy to bear: he shall baptize you with the Holy Ghost, and with fire.”',
    ref: 'Matthew 3:11 KJV'
  },
  {
    text: 'I am not an ordinary person. I carry the power of God. I am empowered for possible things.',
    verse: '“But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth.”',
    ref: 'Acts 1:8 KJV'
  },
  {
    text: 'Every closed door in my life — I command you to open now, in the name of Jesus.',
    verse: '“…he that hath the key of David, he that openeth, and no man shutteth; and shutteth, and no man openeth.”',
    ref: 'Revelation 3:7 KJV'
  },
  {
    text: 'Every delay assigned against my destiny is broken. I move at the pace of Heaven.',
    verse: '“For yet a little while, and he that shall come will come, and will not tarry.”',
    ref: 'Hebrews 10:37 KJV'
  },
  {
    text: 'Every dormant prophetic word over my life is activated today, in the name of Jesus.',
    verse: '“So shall my word be that goeth forth out of my mouth: it shall not return unto me void, but it shall accomplish that which I please, and it shall prosper in the thing whereto I sent it.”',
    ref: 'Isaiah 55:11 KJV'
  },
  {
    text: 'I honor God. I honor His servants. I honor those He has set over me. My honor opens my reward.',
    verse: '“Honour thy father and thy mother: that thy days may be long upon the land which the LORD thy God giveth thee.”',
    ref: 'Exodus 20:12 KJV'
  },
  {
    text: 'I am a loyal servant. I do not leave, I do not expose, I do not betray. I stand.',
    verse: '“And Elisha said unto him, As the LORD liveth, and as thy soul liveth, I will not leave thee.”',
    ref: '2 Kings 2:2 KJV'
  },
  {
    text: 'I am a defender of the faith. I am a sign and a wonder in my generation.',
    verse: '“Behold, I and the children whom the LORD hath given me are for signs and for wonders in Israel from the LORD of hosts, which dwelleth in mount Zion.”',
    ref: 'Isaiah 8:18 KJV'
  },
  {
    text: 'I wait upon the LORD. I mount up as an eagle. I run and am not weary. I walk and do not faint.',
    verse: '“But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.”',
    ref: 'Isaiah 40:31 KJV'
  },
  {
    text: 'Oil of divine favor speaks for me. Divine acceleration passes every delay. Grace, favor, and fresh oil rest upon my head.',
    verse: '“But my horn shalt thou exalt like the horn of an unicorn: I shall be anointed with fresh oil.”',
    ref: 'Psalm 92:10 KJV'
  },
  {
    text: 'Just as You told Peter, ‘Come’ — I hear Your voice today. I walk over every impossible thing You have called me to walk over.',
    verse: '“And he said, Come. And when Peter was come down out of the ship, he walked on the water, to go to Jesus.”',
    ref: 'Matthew 14:29 KJV'
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
