/* ============================================================
   DOMINION HOUR WITH PROPHET PRINCE — INTERACTIVE WORKBOOK CONTENT
   Template file. Duplicate this folder for each new teaching,
   then replace every [bracketed placeholder] and sample item.
   Rules: KJV only, full verses. NEVER include the transcript
   (no transcript page, download, panel or full-service reproduction).
   Use only occasional short, accurate quotations. Never invent a
   quotation, revelation or prophetic statement.
   ============================================================ */
window.WORKBOOK = {
  id: "dominion-hour-template",             // change per teaching, e.g. "dh-2026-10-holy-anointing"
  ministry: {
    brand: "Dominion Hour with Prophet Prince",
    speaker: "Prophet Prince Amo David",
    tagline: "An interactive study companion",
    openingLine: "An interactive study companion following a Dominion Hour service with Prophet Prince Amo David."
  },
  title: "Walking in Dominion",
  serviceDate: "[Service date]",
  mainScripture: "Genesis 1:28",
  heroImage: "hero.jpg",
  heroAlt: "A golden crown and a horn of anointing oil on deep blue cloth under bright heavenly light",
  intro: "This study companion helps you take the message deeper, one short section at a time. Read, meditate on the Scripture, and respond. [Replace with a 2–3 sentence summary of the approved teaching.]",
  templateNotice: "TEMPLATE PREVIEW — highlighted [brackets] mark text to replace with the approved teaching. Sample narration uses a natural AI voice and must be replaced with VoicePrompt recordings before release.",
  teachingLabel: "The message",
  blankNamePhrase: "my loved ones",
  voice: { note: "Sample narration (natural AI voice). Replace with VoicePrompt recordings before release." },

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
  printable: "downloads/Dominion-Hour-Workbook-Printable.pdf",


  openingAudio: "audio/00-welcome.mp3",
  sections: [
    {
      id: "s1", image: "images/s1.jpg", imageAlt: "A golden jewelled sceptre on blue velvet before a sunrise over green earth and rivers", title: "Created for Dominion",
      purpose: "Purpose: to see what God gave mankind from the beginning.",
      teaching: ["[Message point 1 — a concise summary of what Prophet Prince taught, in plain language.]"],
      scripture: [{ ref: "Genesis 1:28", text: "And God blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it: and have dominion over the fish of the sea, and over the fowl of the air, and over every living thing that moveth upon the earth." }],
      activity: { label: "Reflect", prompt: "Where do you need to walk in God's blessing and dominion right now?",
        fields: [{ id: "r1", label: "My area of life", placeholder: "Family, work, health, ministry…" }, { id: "r2", label: "What Genesis 1:28 says to me about it" }] },
      audio: "audio/01-section.mp3"
    },
    {
      id: "s2", image: "images/s2.jpg", imageAlt: "Two golden jewelled keys and a signet ring on blue velvet under heavenly light", title: "Authority in His Name",
      purpose: "Purpose: to understand the authority Jesus gives His disciples.",
      teaching: ["[Message point 2 — summary of the teaching on spiritual authority.]"],
      scripture: [
        { ref: "Luke 10:19", text: "Behold, I give unto you power to tread on serpents and scorpions, and over all the power of the enemy: and nothing shall by any means hurt you." },
        { ref: "Matthew 16:19", text: "And I will give unto thee the keys of the kingdom of heaven: and whatsoever thou shalt bind on earth shall be bound in heaven: and whatsoever thou shalt loose on earth shall be loosed in heaven." }
      ],
      activity: { type: "select", id: "steps", label: "Choose", prompt: "Which steps will you take this week? Tick all that apply.",
        options: ["Pray daily in the name of Jesus", "Speak the Scriptures from this message aloud", "Pray for my household", "Fellowship with other believers", "[Practical step from the message]"],
        fields: [{ id: "a1", label: "One thing I will do differently" }] },
      audio: "audio/02-section.mp3"
    },
    {
      id: "s3", image: "images/s3.jpg", imageAlt: "An open doorway of a home with a golden lamp and an open Bible, framed by blue velvet drapes", title: "My House Shall Serve the Lord",
      purpose: "Purpose: to stand in faith for your household.",
      teaching: ["[Message point 3 — summary of the teaching on praying for your household.]"],
      scripture: [
        { ref: "Joshua 24:15", text: "And if it seem evil unto you to serve the LORD, choose you this day whom ye will serve; whether the gods which your fathers served that were on the other side of the flood, or the gods of the Amorites, in whose land ye dwell: but as for me and my house, we will serve the LORD." },
        { ref: "Acts 16:31", text: "And they said, Believe on the Lord Jesus Christ, and thou shalt be saved, and thy house." }
      ],
      activity: { label: "Apply", prompt: "Write a short prayer for your household.",
        fields: [{ id: "p1", label: "My prayer", placeholder: "Lord, as for me and my house…" }] },
      audio: "audio/03-section.mp3"
    }
  ],

  quiz: {
    image: "images/quiz.jpg", imageAlt: "An open Bible with gilded pages, a golden quill and an oil lamp on blue velvet",
    audio: "audio/04-quiz.mp3",
    beginner: [
      { q: "In Genesis 1:28, God told mankind to subdue the earth and to have what?", options: ["Fear", "Dominion", "Silence"], answer: 1, explain: "God said, “subdue it: and have dominion.” (Genesis 1:28)" },
      { q: "In Luke 10:19, Jesus gives power over…", options: ["All the power of the enemy", "Some of the enemy's power", "Only small troubles"], answer: 0, explain: "“…and over all the power of the enemy: and nothing shall by any means hurt you.” (Luke 10:19)" },
      { q: "Joshua said, “As for me and my house…”", options: ["We will wait and see", "We will serve the LORD", "We will serve our fathers' gods"], answer: 1, explain: "“…but as for me and my house, we will serve the LORD.” (Joshua 24:15)" }
    ],
    intermediate: [
      { q: "According to Matthew 16:19, what happens to what is bound on earth?", options: ["It shall be bound in heaven", "It is forgotten", "It returns later"], answer: 0, explain: "“Whatsoever thou shalt bind on earth shall be bound in heaven.”" },
      { q: "In Acts 16:31, who shall be saved when you believe on the Lord Jesus Christ?", options: ["Only you", "You and your house", "Only your children"], answer: 1, explain: "“Believe on the Lord Jesus Christ, and thou shalt be saved, and thy house.”" },
      { q: "[Intermediate question drawn from the message]", options: ["[Option A]", "[Option B]", "[Option C]"], answer: 0, explain: "[Explanation supported by the message or Scripture.]" }
    ],
    advanced: [
      { q: "A believer feels powerless against attacks on their family. Which Scripture from this workbook best speaks to their authority?", options: ["Luke 10:19", "Genesis 1:28 only", "None of them"], answer: 0, explain: "Luke 10:19 speaks directly of power “over all the power of the enemy.”" },
      { q: "Someone wants to pray for their household but feels they must first convince everyone. Based on Joshua 24:15, where does the commitment begin?", options: ["With the whole family agreeing", "With a personal choice: “as for me and my house”", "With a church leader"], answer: 1, explain: "Joshua made a personal decision first and spoke it over his house." },
      { q: "[Advanced scenario drawn from the message]", options: ["[Option A]", "[Option B]", "[Option C]"], answer: 0, explain: "[Explanation supported by the message or Scripture.]" }
    ]
  },

  declarationsAudio: "audio/05-declarations.mp3",
  declarationsImage: "images/decl.jpg", declarationsImageAlt: "A golden horn and a flask pouring anointing oil onto blue velvet, with a crown behind",
  declarations: [
    { text: "In the name of Jesus, I declare that as for me and {NAMES}, we will serve the LORD.", ref: "Joshua 24:15" },
    { text: "In the name of Jesus, I declare that {NAMES} shall be saved, for I believe on the Lord Jesus Christ.", ref: "Acts 16:31" },
    { text: "In the name of Jesus, I declare that nothing shall by any means hurt {NAMES}.", ref: "Luke 10:19" },
    { text: "[Declaration exactly as spoken in the service. Write NAMES in braces where loved ones are named.]", ref: "[Reference]" }
  ],
  myWorkAudio: "audio/06-mywork.mp3",
  helpAudio: "audio/07-help.mp3",
  help: { contact: "" } // Add a real ministry contact only if supplied. Never invent one.
};
