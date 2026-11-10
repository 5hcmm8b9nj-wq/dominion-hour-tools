/* =====================================================
   Bible Verses Used for Teaching on New Seasons Part 2
   ===================================================== */

// ---- Mobile nav toggle ----
const menuBtn = document.getElementById('menuBtn');
const siteNav = document.getElementById('siteNav');
menuBtn.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
});
// close nav after clicking a link (mobile)
siteNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    if (window.innerWidth < 720) {
      siteNav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
});

// ---- Psalm 51 verses (KJV in full) with personal responses ----
const psalm51 = [
  {
    v: "Have mercy upon me, O God, according to thy lovingkindness: according unto the multitude of thy tender mercies blot out my transgressions.",
    r: "Father, have mercy on me. Blot out every act of rebellion I have committed against You. I plead the multitude of Your tender mercies over my life."
  },
  {
    v: "Wash me throughly from mine iniquity, and cleanse me from my sin.",
    r: "Lord, wash me throughly — not partially, not on the surface. Cleanse every hidden sin. Wash out every twisted pattern of iniquity operating in my life."
  },
  {
    v: "For I acknowledge my transgressions: and my sin is ever before me.",
    r: "Father, I refuse to cover my sin. I acknowledge every transgression by name — pride, lust, anger, unforgiveness, bitterness, lying, gossip, fornication, adultery, pornography, fear, unbelief, occult involvement, ungodly soul ties, word curses, envy, jealousy, idolatry, love of money, rebellion, disobedience, neglect of prayer, neglect of the Word."
  },
  {
    v: "Against thee, thee only, have I sinned, and done this evil in thy sight: that thou mightest be justified when thou speakest, and be clear when thou judgest.",
    r: "Lord, I have sinned against You first. Even when I hurt others, I sinned against You. You are righteous when You judge. I stand under Your mercy."
  },
  {
    v: "Behold, I was shapen in iniquity; and in sin did my mother conceive me.",
    r: "Father, I acknowledge that iniquity was in me before I chose it. I acknowledge every generational pattern of sin flowing through my bloodline. I bring it to the cross."
  },
  {
    v: "Behold, thou desirest truth in the inward parts: and in the hidden part thou shalt make me to know wisdom.",
    r: "Lord, You want truth in my inward parts — not performance. Expose every hidden thing in me. Teach me wisdom in the hidden place."
  },
  {
    v: "Purge me with hyssop, and I shall be clean: wash me, and I shall be whiter than snow.",
    r: "Purge me by the blood of Jesus. I shall be clean. I shall be whiter than snow."
  },
  {
    v: "Make me to hear joy and gladness; that the bones which thou hast broken may rejoice.",
    r: "Lord, restore joy to me. Every bone You have broken through conviction — cause it to rejoice again."
  },
  {
    v: "Hide thy face from my sins, and blot out all mine iniquities.",
    r: "Father, hide Your face from my sins. Blot them out. Remember them no more."
  },
  {
    v: "Create in me a clean heart, O God; and renew a right spirit within me.",
    r: "Lord, create — not repair — a clean heart in me. Renew a right spirit within me."
  },
  {
    v: "Cast me not away from thy presence; and take not thy holy spirit from me.",
    r: "Father, do not cast me away. Do not remove Your Holy Spirit from me. Keep me in Your presence."
  },
  {
    v: "Restore unto me the joy of thy salvation; and uphold me with thy free spirit.",
    r: "Restore the joy of my salvation. Uphold me by Your free Spirit."
  },
  {
    v: "Then will I teach transgressors thy ways; and sinners shall be converted unto thee.",
    r: "After You wash me, I will teach others Your ways. Sinners will be converted through my testimony."
  },
  {
    v: "Deliver me from bloodguiltiness, O God, thou God of my salvation: and my tongue shall sing aloud of thy righteousness.",
    r: "Deliver me from every bloodguilt — every innocent blood shed knowingly or unknowingly, by me or my bloodline. My tongue shall sing Your righteousness."
  },
  {
    v: "O Lord, open thou my lips; and my mouth shall shew forth thy praise.",
    r: "Open my lips, Lord. My mouth shall show forth Your praise."
  },
  {
    v: "For thou desirest not sacrifice; else would I give it: thou delightest not in burnt offering.",
    r: "Lord, You do not want religious performance from me. You want my heart."
  },
  {
    v: "The sacrifices of God are a broken spirit: a broken and a contrite heart, O God, thou wilt not despise.",
    r: "Father, I come with a broken and contrite heart. You will not despise me."
  },
  {
    v: "Do good in thy good pleasure unto Zion: build thou the walls of Jerusalem.",
    r: "Build the walls of my life again. Build up every broken place."
  },
  {
    v: "Then shalt thou be pleased with the sacrifices of righteousness, with burnt offering and whole burnt offering: then shall they offer bullocks upon thine altar.",
    r: "Then my life will be a sacrifice of righteousness pleasing to You."
  }
];

const psalmList = document.querySelector('.psalm-list');
psalm51.forEach((item, i) => {
  const li = document.createElement('li');
  li.innerHTML = `
    <p class="verse-text">${item.v}</p>
    <details>
      <summary>Tap for personal response</summary>
      <p>${item.r}</p>
    </details>
  `;
  psalmList.appendChild(li);
});

// ---- Personal sin categories ----
const categories = [
  {
    icon: '🗣️',
    label: 'Sins of the Mouth',
    body: `Lying, gossip, slander, cursing others, complaining, murmuring, taking God’s name in vain, false vows, filthy speech, word curses spoken over myself and others.`,
    ref: 'Ephesians 4:29 (KJV)',
    scripture: 'Let no corrupt communication proceed out of your mouth, but that which is good to the use of edifying, that it may minister grace unto the hearers.'
  },
  {
    icon: '💭',
    label: 'Sins of the Mind',
    body: `Pride, envy, jealousy, lust, evil imaginations, unforgiveness, bitterness, revenge, fear, unbelief, doubt, double-mindedness.`,
    ref: '2 Corinthians 10:5 (KJV)',
    scripture: 'Casting down imaginations, and every high thing that exalteth itself against the knowledge of God, and bringing into captivity every thought to the obedience of Christ.'
  },
  {
    icon: '💔',
    label: 'Sins of the Heart',
    body: `Hardness of heart, rebellion, stubbornness, hatred, love of money, self-idolatry, ungodly ambition, resentment.`,
    ref: 'Jeremiah 17:9 (KJV)',
    scripture: 'The heart is deceitful above all things, and desperately wicked: who can know it?'
  },
  {
    icon: '🛌',
    label: 'Sins of the Body / Sexual Sins',
    body: `Fornication, adultery, pornography, masturbation, homosexuality, incest, ungodly soul ties, immodesty, defilement of the temple.`,
    ref: '1 Corinthians 6:18–19 (KJV)',
    scripture: 'Flee fornication. Every sin that a man doeth is without the body; but he that committeth fornication sinneth against his own body. What? know ye not that your body is the temple of the Holy Ghost which is in you, which ye have of God, and ye are not your own?'
  },
  {
    icon: '🔮',
    label: 'Occult, Idolatry & False Worship',
    body: `Witchcraft, sorcery, horoscopes, tarot, fortune telling, mediums, ouija boards, charms, amulets, freemasonry, ancestral worship, false religions, New Age practices, consulting familiar spirits.`,
    ref: 'Deuteronomy 18:10–12 (KJV)',
    scripture: 'There shall not be found among you any one that maketh his son or his daughter to pass through the fire, or that useth divination, or an observer of times, or an enchanter, or a witch, Or a charmer, or a consulter with familiar spirits, or a wizard, or a necromancer. For all that do these things are an abomination unto the LORD.'
  },
  {
    icon: '💰',
    label: 'Sins Against Others',
    body: `Stealing, cheating, false witness, dishonoring parents, murder (including with the tongue), abortion, oppression of the poor, robbing God in tithes and offerings.`,
    ref: 'Malachi 3:8 (KJV)',
    scripture: 'Will a man rob God? Yet ye have robbed me. But ye say, Wherein have we robbed thee? In tithes and offerings.'
  },
  {
    icon: '🚫',
    label: 'Sins of Omission — Things I Should Have Done',
    body: `Neglect of prayer, neglect of the Word, neglect of assembling with believers, neglect of witnessing, neglect of the poor, silence when I should have spoken.`,
    ref: 'James 4:17 (KJV)',
    scripture: 'Therefore to him that knoweth to do good, and doeth it not, to him it is sin.'
  }
];

const catContainer = document.querySelector('.categories');
categories.forEach(c => {
  const d = document.createElement('details');
  d.className = 'cat';
  d.innerHTML = `
    <summary>
      <span class="icon" aria-hidden="true">${c.icon}</span>
      <span class="label">${c.label}</span>
    </summary>
    <div class="cat-body">
      <p>${c.body}</p>
      <p class="mini-ref">${c.ref}</p>
      <blockquote class="mini-scripture">${c.scripture}</blockquote>
      <div class="confess-line">
        <strong>Father, I confess and turn away from:</strong>
        _______________________________________________
      </div>
    </div>
  `;
  catContainer.appendChild(d);
});
