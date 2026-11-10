/* ============================================================
   DOMINION HOUR WITH PROPHET PRINCE — INTERACTIVE WORKBOOK CONTENT
   Service: October 27, 2026 (Clubhouse) — Deliverance, Holy Spirit
   Anointing, and Prophetic Breakthrough. Built from the service
   summary supplied. No personal names of participants are included.
   Rules: KJV only, full verses. NEVER include the transcript
   (no transcript page, download, panel or full-service reproduction).
   Use only occasional short, accurate quotations. Never invent a
   quotation, revelation or prophetic statement.
   ============================================================ */
window.WORKBOOK = {
  id: "dh-2026-10-27-anointing-breakthrough",
  ministry: {
    brand: "Dominion Hour with Prophet Prince",
    speaker: "Prophet Prince Amo David",
    tagline: "An interactive study companion",
    openingLine: "An interactive study companion following a Dominion Hour service with Prophet Prince Amo David."
  },
  title: "Deliverance, Holy Spirit Anointing, and Prophetic Breakthrough",
  serviceDate: "Tuesday, October 27, 2026 · Clubhouse",
  mainScripture: "Isaiah 10:27",
  heroImage: "hero.jpg",
  heroAlt: "A golden crown and a horn of anointing oil on deep blue velvet under bright heavenly light",
  intro: "In this Dominion Hour prayer service, Prophet Prince Amo David led the house in thanksgiving, repentance and united prayer, and taught that the yoke is destroyed because of the anointing. The service called believers to holy restlessness, to seek a second touch from Jesus, and to receive the blessing of Joseph over their lives. Work through each short section, pray the declarations, and keep your notes on this device.",
  teachingLabel: "The message",
  blankNamePhrase: "my loved ones",
  voice: { note: "Narration: natural AI voice (sample). To be replaced with VoicePrompt recordings." },

  // Provisional blue and teal look. Will be matched to the Dominion Hour poster colours when supplied.
  theme: {
    "bg": "#F5FAFC", "surface": "#FFFFFF", "ink": "#0E1B2A", "ink-2": "#25384D", "muted": "#4A5D72", "heading": "#0B2E6B",
    "line": "#D9E7EF", "line-strong": "#AFC8D8", "shadow": "rgba(8,40,80,.16)",
    "primary": "#0F4FB8", "primary-ink": "#0B2E6B", "primary-soft": "#E3EEFC", "on-primary": "#FFFFFF",
    "accent": "#0B7C86", "accent-ink": "#075A61", "accent-soft": "#DDF4F5", "on-accent": "#FFFFFF",
    "hot": "#B8860B", "hot-ink": "#7A5806", "hot-soft": "#FFF4D6",
    "ok": "#1E7B45", "ok-soft": "#E5F5EC", "danger": "#B3261E", "danger-soft": "#FCE8E6",
    "warn": "#C8961E", "warn-soft": "#FFF4D6", "focus": "#E8B730",
    "display-font": "'Fraunces', 'Georgia', serif", "body-font": "'Manrope', 'Segoe UI', sans-serif", "display-weight": "800"
  },
  printable: "downloads/Dominion-Hour-2026-10-27-Printable.pdf",
  printFlow: true, // long service: sections flow on in the printable instead of one per page

  openingAudio: "audio/00-welcome.mp3",
  sections: [
    {
      id: "s1", image: "images/s1.jpg", imageAlt: "Golden light pouring through an open heaven onto a golden altar of incense", title: "Thanksgiving Opens the Heavens",
      purpose: "Purpose: to begin with praise for who God is.",
      teaching: [
        "The service opened with thanksgiving for God's presence, for angelic visitation, for open heavens and for a supernatural atmosphere. The house was encouraged to unmute and praise, and to keep going even when there is heaviness or uncertainty.",
        "From the prayer of Hannah in 1 Samuel 2, Prophet Prince lifted up the holiness of God. He is the One who exalts and judges, who weighs actions on His scales, and who lifts the lowly. The service also gave a caution to treat consecrated things with reverence."
      ],
      scripture: [
        { ref: "1 Samuel 2:2", text: "There is none holy as the LORD: for there is none beside thee: neither is there any rock like our God." },
        { ref: "1 Samuel 2:8", text: "He raiseth up the poor out of the dust, and lifteth up the beggar from the dunghill, to set them among princes, and to make them inherit the throne of glory: for the pillars of the earth are the LORD'S, and he hath set the world upon them." }
      ],
      activity: { label: "Give thanks", prompt: "Write three things you thank God for today, even if you feel heavy.",
        fields: [{ id: "t1", label: "I thank God for…", placeholder: "1. …  2. …  3. …" }, { id: "t2", label: "Where God has lifted me up before" }] },
      audio: "audio/01-section.mp3"
    },
    {
      id: "s2", image: "images/s2.jpg", imageAlt: "A clear crystal basin of water catching golden light on blue velvet", title: "Repentance and Cleansing",
      purpose: "Purpose: to come clean before God and be covered by the blood of Jesus.",
      teaching: [
        "Using Psalm 51, David's cry for mercy, the house repented together for secret sins and for sins they did not know about. The blood of Jesus was called upon for cleansing and for protection.",
        "Repentance keeps the heart clean so that prayer can flow freely and the presence of God can rest."
      ],
      scripture: [
        { ref: "Psalm 51:1–2", text: "Have mercy upon me, O God, according to thy lovingkindness: according unto the multitude of thy tender mercies blot out my transgressions. Wash me throughly from mine iniquity, and cleanse me from my sin." },
        { ref: "Psalm 51:10", text: "Create in me a clean heart, O God; and renew a right spirit within me." }
      ],
      activity: { label: "Pray", prompt: "Write a short, private prayer of repentance. It stays only on this device.",
        fields: [{ id: "c1", label: "Lord, cleanse me from…", placeholder: "Write as much or as little as you wish." }, { id: "c2", label: "Create in me a clean heart in this area" }] },
      audio: "audio/02-section.mp3"
    },
    {
      id: "s3", image: "images/s3.jpg", imageAlt: "Many golden lamps burning together in a circle on blue velvet under light from above", title: "One Heart, One Soul: Praying in Unity",
      purpose: "Purpose: to see what happens when believers pray together.",
      teaching: [
        "In Acts 4, when the believers prayed, the place was shaken. They were filled with the Holy Ghost, they were of one heart and one soul, and great grace was upon them all.",
        "The house was called to pray in the Holy Ghost and to invite God's presence into every part of daily life: in cars, offices, trains and buses, workplaces and marketplaces."
      ],
      scripture: [
        { ref: "Acts 4:31–33", text: "And when they had prayed, the place was shaken where they were assembled together; and they were all filled with the Holy Ghost, and they spake the word of God with boldness. And the multitude of them that believed were of one heart and of one soul: neither said any of them that ought of the things which he possessed was his own; but they had all things common. And with great power gave the apostles witness of the resurrection of the Lord Jesus: and great grace was upon them all." }
      ],
      activity: { type: "select", id: "places", label: "Choose", prompt: "Where will you invite God's presence this week? Tick all that apply.",
        options: ["In my car or on the bus or train", "At my workplace or office", "In the marketplace or where I do business", "In my home", "Joining the house in united prayer"],
        fields: [{ id: "u1", label: "One time each day I will pray in the Holy Ghost" }] },
      audio: "audio/03-section.mp3"
    },
    {
      id: "s4", image: "images/s4.jpg", imageAlt: "A heavy wooden yoke breaking apart as golden anointing oil pours over it", title: "The Yoke Is Destroyed Because of the Anointing",
      purpose: "Purpose: to understand how the anointing breaks burdens.",
      teaching: [
        "Zechariah 4:6 reminds us that victory comes not by human might or power, but by the Spirit of God. The anointing brings protection, a way of escape and victory. Prophet Prince noted that he will teach more on the advantages of the anointing in a future session.",
        "From Isaiah 10:27, he explained the picture of a yoke: it is put on an ox or a camel by someone stronger, and it carries a burden that is not its own. As believers grow spiritually, becoming \"fat\" through the anointing, the yoke can no longer hold and is destroyed.",
        "He also taught that repeated patterns in a family line, such as delayed marriage, financial crises and chronic disease, can be signs of captivity. These call for the anointing and for steady, persistent spiritual growth."
      ],
      scripture: [
        { ref: "Zechariah 4:6", text: "Then he answered and spake unto me, saying, This is the word of the LORD unto Zerubbabel, saying, Not by might, nor by power, but by my spirit, saith the LORD of hosts." },
        { ref: "Isaiah 10:27", text: "And it shall come to pass in that day, that his burden shall be taken away from off thy shoulder, and his yoke from off thy neck, and the yoke shall be destroyed because of the anointing." }
      ],
      activity: { label: "Discern", prompt: "Is there a pattern that keeps repeating in your life or family? Name it privately and bring it to God.",
        fields: [{ id: "y1", label: "A pattern I see", placeholder: "For example: delay, lack, sickness…" }, { id: "y2", label: "How I will grow in the Spirit this month", placeholder: "Prayer, the Word, fasting, fellowship…" }] },
      audio: "audio/04-section.mp3"
    },
    {
      id: "s5", image: "images/s5.jpg", imageAlt: "An open scroll and a golden lampstand shining boldly on blue velvet", title: "Boldness, Healing and Salvation in His Name",
      purpose: "Purpose: to see the power of a life that has been with Jesus.",
      teaching: [
        "In Acts 4, the authorities questioned Peter and John about a man who had been healed. The healing was credited to the name of Jesus Christ, and they declared that there is salvation in no other name.",
        "People took knowledge that they had been with Jesus. A living prayer life shows a real relationship with Jesus and the Holy Spirit, and God confirms that faith with signs and wonders."
      ],
      scripture: [
        { ref: "Acts 4:10", text: "Be it known unto you all, and to all the people of Israel, that by the name of Jesus Christ of Nazareth, whom ye crucified, whom God raised from the dead, even by him doth this man stand here before you whole." },
        { ref: "Acts 4:12", text: "Neither is there salvation in any other: for there is none other name under heaven given among men, whereby we must be saved." },
        { ref: "Acts 4:13", text: "Now when they saw the boldness of Peter and John, and perceived that they were unlearned and ignorant men, they marvelled; and they took knowledge of them, that they had been with Jesus." }
      ],
      activity: { label: "Reflect", prompt: "What would help people \"take knowledge\" that you have been with Jesus?",
        fields: [{ id: "b1", label: "My answer" }, { id: "b2", label: "One way I will grow closer to Jesus this week" }] },
      audio: "audio/05-section.mp3"
    },
    {
      id: "s6", image: "images/s6.jpg", imageAlt: "A heavy iron chain snapping apart in a burst of golden light over blue velvet", title: "Holy Restlessness: Breaking Loose",
      purpose: "Purpose: to refuse to stay under a yoke.",
      teaching: [
        "In Genesis 27, Esau cried out for a blessing. Isaac prophesied that Esau would serve his brother, but a day would come when he would break the yoke from off his neck. Prophet Prince pointed out that a yoke is placed on you by another. Freedom comes when you become restless enough to say, \"I can't take it anymore.\"",
        "This is holy restlessness. Like Hannah, who prayed with bitterness of soul and wept before the Lord, believers were urged to pray and fast with a clear target and to keep bringing their own petitions until breakthrough comes."
      ],
      quote: "I can't take it anymore.",
      scripture: [
        { ref: "Genesis 27:38", text: "And Esau said unto his father, Hast thou but one blessing, my father? bless me, even me also, O my father. And Esau lifted up his voice, and wept." },
        { ref: "Genesis 27:40", text: "And by thy sword shalt thou live, and shalt serve thy brother; and it shall come to pass when thou shalt have the dominion, that thou shalt break his yoke from off thy neck." },
        { ref: "1 Samuel 1:10", text: "And she was in bitterness of soul, and prayed unto the LORD, and wept sore." }
      ],
      activity: { label: "Target your prayer", prompt: "What can you not take anymore? Write your specific petition and your prayer and fasting plan.",
        fields: [{ id: "h1", label: "Lord, I can't take this anymore…" }, { id: "h2", label: "My prayer and fasting plan", placeholder: "When, how long, and what I will pray" }] },
      audio: "audio/06-section.mp3"
    },
    {
      id: "s7", image: "images/s7.jpg", imageAlt: "Golden sunrise breaking through blue morning mist over a calm lake and mountains", title: "The Second Touch",
      purpose: "Purpose: to seek Jesus until the work is complete.",
      teaching: [
        "In Mark 8, Jesus touched a blind man and he saw men as trees, walking. Jesus touched him a second time, and he saw every man clearly.",
        "The house was encouraged to seek a second touch, so that partial progress in marriage, finances, health and personal clarity becomes full restoration. Read Mark 8:22–25 aloud."
      ],
      scripture: [
        { ref: "Mark 8:22–25", text: "And he cometh to Bethsaida; and they bring a blind man unto him, and besought him to touch him. And he took the blind man by the hand, and led him out of the town; and when he had spit on his eyes, and put his hands upon him, he asked him if he saw ought. And he looked up, and said, I see men as trees, walking. After that he put his hands again upon his eyes, and made him look up: and he was restored, and saw every man clearly." }
      ],
      activity: { type: "select", id: "touch", label: "Choose", prompt: "Where do you need a second touch? Tick all that apply.",
        options: ["Marriage", "Finances", "Health", "Clarity and direction", "Ministry", "My children and family"],
        fields: [{ id: "st1", label: "What I see partly now, and what I am asking God to make clear" }] },
      audio: "audio/07-section.mp3"
    },
    {
      id: "s8", image: "images/s8.jpg", imageAlt: "A golden table laid with bread, grapes and a cup on blue velvet in warm light", title: "They That Seek the LORD Shall Not Want",
      purpose: "Purpose: to trust God for deliverance and provision.",
      teaching: [
        "Psalm 34 promises deliverance from all fears, and assures that God provides for those who fear Him. The young lions may lack and suffer hunger, but those who seek the Lord shall not lack any good thing.",
        "Believers were encouraged that as they seek God, they will not lack favour."
      ],
      scripture: [
        { ref: "Psalm 34:4–10", text: "I sought the LORD, and he heard me, and delivered me from all my fears. They looked unto him, and were lightened: and their faces were not ashamed. This poor man cried, and the LORD heard him, and saved him out of all his troubles. The angel of the LORD encampeth round about them that fear him, and delivereth them. O taste and see that the LORD is good: blessed is the man that trusteth in him. O fear the LORD, ye his saints: for there is no want to them that fear him. The young lions do lack, and suffer hunger: but they that seek the LORD shall not want any good thing." }
      ],
      activity: { label: "Trust", prompt: "Name a fear you are giving to God, and a need you are trusting Him to meet.",
        fields: [{ id: "f1", label: "The fear I give to God" }, { id: "f2", label: "The good thing I am seeking Him for" }] },
      audio: "audio/08-section.mp3"
    },
    {
      id: "s9", image: "images/s9.jpg", imageAlt: "A peaceful bed in a moonlit room guarded by soft golden light, with a small flask of oil on the side table", title: "Guarding Your Nights",
      purpose: "Purpose: to stand against wicked dreams and spirit-spouse attacks.",
      teaching: [
        "Prophet Prince taught that life is spiritual and that we must stay watchful. Believers were called to fast and pray against wicked dreams and spirit-spouse attacks.",
        "Those taking part were instructed to use anointing oil and garlic, to lightly anoint the bed and the room, and to rebuke any attack out loud in the name of Jesus.",
        "The Wednesday Fire Service on October 28, 2026 was announced, with fasting and prayer against demonic dreams. Please check the ministry's announcement for the exact time in your country."
      ],
      scripture: [
        { ref: "Psalm 34:7", text: "The angel of the LORD encampeth round about them that fear him, and delivereth them." }
      ],
      activity: { type: "select", id: "night", label: "Prepare", prompt: "Which steps will you take for your nights? Tick all that apply.",
        options: ["Pray before I sleep", "Lightly anoint my bed and room as instructed", "Rebuke any attack out loud in the name of Jesus", "Fast and pray as I am able", "Join the Wednesday Fire Service"],
        fields: [{ id: "n1", label: "Notes about my nights and what I am praying against" }] },
      audio: "audio/09-section.mp3"
    },
    {
      id: "s10", image: "images/s10.jpg", imageAlt: "A fruitful vine with golden grapes running over a stone wall beside a well, in bright light", title: "Receive the Blessing of Joseph",
      purpose: "Purpose: to make the blessing of Genesis 49 personal and keep moving forward.",
      teaching: [
        "The service closed with Genesis 49:22–26. Listeners were told to read it with their own name in the place of Joseph, to receive the blessing for themselves, and to declare that they will not fail.",
        "Prophetic declarations were made for favour to receive properties, houses, vineyards and cars, for acceleration that makes up for wasted years, and for growth in ministry.",
        "Keep moving forward. Keep gathering with the house, praying, fasting and giving into good ground. Study the Word, draw close to God for a fresh anointing, share your testimony, and invite others to join."
      ],
      scripture: [
        { ref: "Genesis 49:22–26", text: "Joseph is a fruitful bough, even a fruitful bough by a well; whose branches run over the wall: The archers have sorely grieved him, and shot at him, and hated him: But his bow abode in strength, and the arms of his hands were made strong by the hands of the mighty God of Jacob; (from thence is the shepherd, the stone of Israel:) Even by the God of thy father, who shall help thee; and by the Almighty, who shall bless thee with blessings of heaven above, blessings of the deep that lieth under, blessings of the breasts, and of the womb: The blessings of thy father have prevailed above the blessings of my progenitors unto the utmost bound of the everlasting hills: they shall be on the head of Joseph, and on the crown of the head of him that was separate from his brethren." }
      ],
      activity: { label: "Make it personal", prompt: "Write Genesis 49:22 with your own name in place of Joseph, then read it aloud.",
        fields: [{ id: "j1", label: "My blessing", placeholder: "(Your name) is a fruitful bough…" }, { id: "j2", label: "My next steps", placeholder: "Prayer, fasting, giving, fellowship, sharing my testimony…" }] },
      audio: "audio/10-section.mp3"
    }
  ],

  quiz: {
    image: "images/quiz.jpg", imageAlt: "An open Bible with gilded pages, a golden quill and an oil lamp on blue velvet",
    audio: "audio/11-quiz.mp3",
    beginner: [
      { q: "According to Isaiah 10:27, what destroys the yoke?", options: ["Hard work", "The anointing", "Time"], answer: 1, explain: "“…and the yoke shall be destroyed because of the anointing.” (Isaiah 10:27)" },
      { q: "Zechariah 4:6 says victory comes not by might, nor by power, but by…", options: ["My spirit, saith the LORD of hosts", "Many people", "Great wealth"], answer: 0, explain: "“Not by might, nor by power, but by my spirit, saith the LORD of hosts.”" },
      { q: "In Mark 8, how many times did Jesus touch the blind man's eyes before he saw every man clearly?", options: ["Once", "Twice", "Three times"], answer: 1, explain: "After the first touch he saw “men as trees, walking.” After the second touch he “saw every man clearly.”" },
      { q: "What happened when the believers prayed in Acts 4:31?", options: ["Nothing changed", "The place was shaken and they were filled with the Holy Ghost", "They went home"], answer: 1, explain: "“The place was shaken… and they were all filled with the Holy Ghost.”" }
    ],
    intermediate: [
      { q: "In the service, what did Prophet Prince say about where a yoke comes from?", options: ["You choose it for yourself", "It is placed on you by another", "It is a gift from God"], answer: 1, explain: "He taught that a yoke is imposed by another, as Isaac said Esau would break \"his yoke\" from off his neck." },
      { q: "What did the service call the attitude of refusing to stay under a burden any longer?", options: ["Holy restlessness", "Quiet waiting", "Giving up"], answer: 0, explain: "Holy restlessness: becoming restless enough to say, “I can't take it anymore,” and praying until breakthrough." },
      { q: "Whose example of targeted prayer and fasting was given?", options: ["Hannah", "Esau", "Isaac"], answer: 0, explain: "Hannah “prayed unto the LORD, and wept sore” (1 Samuel 1:10) until God answered." },
      { q: "When reading Genesis 49:22–26, what were listeners told to do?", options: ["Read it silently once", "Put their own name in place of Joseph", "Skip to verse 26"], answer: 1, explain: "They were told to replace “Joseph” with their own names and receive the blessing." }
    ],
    advanced: [
      { q: "A believer notices that delayed marriage and money troubles keep repeating in their family. Based on this service, what does this call for?", options: ["Accepting it as normal", "The anointing and steady spiritual growth", "Avoiding family completely"], answer: 1, explain: "Repeated family patterns were described as signs of captivity that require the anointing and persistent spiritual growth (Isaiah 10:27)." },
      { q: "Someone has seen some progress in their health but it is not complete. Which passage from the service speaks to this?", options: ["Mark 8:22–25, the second touch", "Genesis 27:38", "1 Samuel 2:2"], answer: 0, explain: "The second touch turns partial progress into full restoration: “he was restored, and saw every man clearly.”" },
      { q: "A believer keeps having troubling dreams. Which response matches the instructions in the service?", options: ["Ignore them", "Fast and pray, anoint the bed and room as instructed, and rebuke the attack out loud in Jesus' name", "Stop praying at night"], answer: 1, explain: "The service called for fasting and prayer, light anointing of the bed and room, and verbal rebuke in the name of Jesus." },
      { q: "Why did Peter and John's critics \"take knowledge\" of them in Acts 4:13?", options: ["They were highly educated", "They had been with Jesus", "They were wealthy"], answer: 1, explain: "“They took knowledge of them, that they had been with Jesus.” A living prayer life shows a real relationship with Him." }
    ]
  },

  declarationsAudio: "audio/12-declarations.mp3",
  declarationsImage: "images/decl.jpg", declarationsImageAlt: "A golden horn and a flask pouring anointing oil onto blue velvet, with a crown behind",
  declarations: [
    { text: "Not by might, nor by power, but by the Spirit of the LORD. I lean on the Holy Spirit, not on my own strength.", ref: "Zechariah 4:6" },
    { text: "In the name of Jesus, every burden is taken from off the shoulder of {NAMES}, and every yoke is destroyed because of the anointing.", ref: "Isaiah 10:27" },
    { text: "In the name of Jesus, I reject every yoke of delay, stagnation, disappointment and blocked progress over {NAMES}.", ref: "Isaiah 10:27" },
    { text: "I can't take it anymore. Today I break loose, and every yoke placed upon me is broken from off my neck.", ref: "Genesis 27:40" },
    { text: "Lord Jesus, give {NAMES} a second touch, until we are restored and see every thing clearly.", ref: "Mark 8:25" },
    { text: "The angel of the LORD encampeth round about {NAMES}. Every wicked dream and every attack in the night is rebuked in the name of Jesus.", ref: "Psalm 34:7" },
    { text: "We that seek the LORD shall not want any good thing.", ref: "Psalm 34:10" },
    { text: "I am a fruitful bough by a well. My bow abides in strength, the blessings of heaven are upon my head, and I will not fail.", ref: "Genesis 49:22–26" }
  ],
  myWorkAudio: "audio/13-mywork.mp3",
  helpAudio: "audio/14-help.mp3",
  help: { contact: "" } // Add a real ministry contact only if supplied. Never invent one.
};
