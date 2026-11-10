// 12 mantles from Prophet Prince Amo David — Dominion Hour, 31 August 2026.
// Each mantle has: color coding, an emoji, a simple-language summary,
// picture-symbol strip (for Watch mode), scripture in full KJV, prayer, declaration, reflection.

const MANTLES = [
  {
    n: 1, key: "prophetic-voice", emoji: "📣",
    color: { accent: "#7a3e1d", bg: "#fff8ed", border: "#e9d4b0" }, // rust
    title: "The Prophetic-Voice Mantle",
    sub: "Say it. New season, new sound.",
    simple: "Speak the new thing God is doing. Do not keep saying yesterday's problem.",
    pics: [
      { ico: "🗣️", cap: "Speak" },
      { ico: "🌱", cap: "New" },
      { ico: "🌊", cap: "Rivers" },
    ],
    what: "The teaching opened with a call to prophesy the new season out loud. Do not remain silent — release words that describe what God is about to do, not what has been.",
    scriptures: [
      { ref: "Isaiah 43:18–19 (KJV)", text: "Remember ye not the former things, neither consider the things of old. Behold, I will do a new thing; now it shall spring forth; shall ye not know it? I will even make a way in the wilderness, and rivers in the desert." },
      { ref: "Numbers 23:19–20 (KJV)", text: "God is not a man, that he should lie; neither the son of man, that he should repent: hath he said, and shall he not do it? or hath he spoken, and shall he not make it good? Behold, I have received commandment to bless: and he hath blessed; and I cannot reverse it." },
    ],
    prayer: "Father, put a prophetic voice on me. Take yesterday's speech out of my mouth and put the language of the new season in. Let every blessing You have commanded over my life come to pass. In Jesus' name. Amen.",
    declaration: "I carry a prophetic voice. I speak the new thing. What God has blessed cannot be reversed.",
    reflection: "What sentence about my life do I need to stop repeating so a new one can come out?",
  },
  {
    n: 2, key: "dry-bones", emoji: "🦴",
    color: { accent: "#5a4b8a", bg: "#f4f1fb", border: "#d6ccec" }, // violet
    title: "The Dry-Bones Prophesying Mantle",
    sub: "Speak life to what looks dead.",
    simple: "Talk to what looks dead in your life. Tell it to live again.",
    pics: [
      { ico: "🦴", cap: "Dry" },
      { ico: "💨", cap: "Breath" },
      { ico: "🪖", cap: "Army" },
    ],
    what: "Ezekiel's valley was released as a picture of dead projects, marriages, businesses and callings. The mantle is authority to prophesy to the dry places until breath returns.",
    scriptures: [
      { ref: "Ezekiel 37:3–5 (KJV)", text: "And he said unto me, Son of man, can these bones live? And I answered, O Lord God, thou knowest. Again he said unto me, Prophesy upon these bones, and say unto them, O ye dry bones, hear the word of the Lord. Thus saith the Lord God unto these bones; Behold, I will cause breath to enter into you, and ye shall live." },
      { ref: "Ezekiel 37:10 (KJV)", text: "So I prophesied as he commanded me, and the breath came into them, and they lived, and stood up upon their feet, an exceeding great army." },
    ],
    prayer: "Father, teach my mouth to prophesy over the dry bones of my life. Send Your breath into every dead thing and let it stand up as an exceeding great army for Your glory. In Jesus' name. Amen.",
    declaration: "I prophesy to the dry bones of my life: live, breathe, and stand up as an army of the Lord.",
    reflection: "Name one dry place in your life. What will you say to it today?",
  },
  {
    n: 3, key: "dominion", emoji: "👑",
    color: { accent: "#8a3535", bg: "#fff2ef", border: "#eecac4" }, // deep red
    title: "The Dominion-Restoration Mantle",
    sub: "The yoke breaks off your neck.",
    simple: "Anything ruling over your life without God's permission is coming off today.",
    pics: [
      { ico: "⛓️", cap: "Yoke" },
      { ico: "💥", cap: "Break" },
      { ico: "🦁", cap: "Rule" },
    ],
    what: "Isaac's prophecy over Esau — 'thou shalt break his yoke from off thy neck' — was released as a mantle to restore dominion over every area where the enemy has been ruling by default.",
    scriptures: [
      { ref: "Genesis 27:40 (KJV)", text: "And by thy sword shalt thou live, and shalt serve thy brother; and it shall come to pass when thou shalt have the dominion, that thou shalt break his yoke from off thy neck." },
      { ref: "Luke 10:19 (KJV)", text: "Behold, I give unto you power to tread on serpents and scorpions, and over all the power of the enemy: and nothing shall by any means hurt you." },
    ],
    prayer: "Father, restore every area of dominion I have surrendered. Let every yoke on my neck break by the anointing. I take authority over serpents, scorpions and all the power of the enemy. In Jesus' name. Amen.",
    declaration: "Every yoke on my neck is broken. I walk in the dominion Jesus paid for me.",
    reflection: "Where has fear or fatigue been ruling me? I hand that ground back to Jesus.",
  },
  {
    n: 4, key: "consecration-dew", emoji: "💧",
    color: { accent: "#2f6f5f", bg: "#eef8f4", border: "#c6e3d8" }, // green
    title: "Consecration & Dew-of-Heaven Mantle",
    sub: "Set apart. Refreshed daily.",
    simple: "When you live set-apart for God, His fresh refreshing falls on you every morning.",
    pics: [
      { ico: "🕊️", cap: "Set apart" },
      { ico: "💧", cap: "Dew" },
      { ico: "🌾", cap: "Field" },
    ],
    what: "Where the brethren dwell in unity the Lord commands the blessing — 'even life for evermore.' The mantle joins consecration with the dew of heaven that Isaac smelled on Jacob's garment.",
    scriptures: [
      { ref: "Psalm 133:1–3 (KJV)", text: "Behold, how good and how pleasant it is for brethren to dwell together in unity! It is like the precious ointment upon the head, that ran down upon the beard, even Aaron's beard: that went down to the skirts of his garments; As the dew of Hermon, and as the dew that descended upon the mountains of Zion: for there the Lord commanded the blessing, even life for evermore." },
      { ref: "Genesis 27:27–28 (KJV)", text: "And he came near, and kissed him: and he smelled the smell of his raiment, and blessed him, and said, See, the smell of my son is as the smell of a field which the Lord hath blessed: Therefore God give thee of the dew of heaven, and of the fatness of the earth, and plenty of corn and wine." },
    ],
    prayer: "Father, consecrate me. Wash me from the smell of the world and let me carry the fragrance of a field You have blessed. Send Your dew on my life every morning. In Jesus' name. Amen.",
    declaration: "I am consecrated. The dew of heaven rests on me. The Lord has commanded the blessing over my life.",
    reflection: "What one thing will I set apart today so heaven can rest on me tomorrow?",
  },
  {
    n: 5, key: "blossom", emoji: "🌸",
    color: { accent: "#a83a68", bg: "#fdeff5", border: "#f2c9dc" }, // pink
    title: "The Blossom Mantle",
    sub: "Fruit in your season, not before.",
    simple: "You will bloom on time. Nothing you do in God will be wasted.",
    pics: [
      { ico: "🌳", cap: "Rooted" },
      { ico: "🌸", cap: "Blossom" },
      { ico: "🍎", cap: "Fruit" },
    ],
    what: "The tree planted by rivers of water brings forth fruit in its season, and its leaf does not wither. This mantle silences the accusation that your season has passed you by.",
    scriptures: [
      { ref: "Psalm 1:3 (KJV)", text: "And he shall be like a tree planted by the rivers of water, that bringeth forth his fruit in his season; his leaf also shall not wither; and whatsoever he doeth shall prosper." },
      { ref: "Isaiah 27:6 (KJV)", text: "He shall cause them that come of Jacob to take root: Israel shall blossom and bud, and fill the face of the world with fruit." },
    ],
    prayer: "Father, plant me deep by Your rivers. Let me blossom and bud and fill my sphere with fruit that remains. Nothing about my life will wither. In Jesus' name. Amen.",
    declaration: "I am rooted, I blossom, I bear fruit in my season. Whatever I do prospers.",
    reflection: "What am I quietly afraid is too late? I hand that fear to the Lord of the harvest.",
  },
  {
    n: 6, key: "silence-accuser", emoji: "🛡️",
    color: { accent: "#1f5b8a", bg: "#eaf3fb", border: "#c1d9ee" }, // blue
    title: "Silence-the-Accuser Mantle",
    sub: "Filthy garments come off. Change of raiment.",
    simple: "The devil cannot keep bringing up your past. Jesus already answered for it.",
    pics: [
      { ico: "🩸", cap: "Blood" },
      { ico: "👕", cap: "New robe" },
      { ico: "🤐", cap: "Silenced" },
    ],
    what: "Joshua the high priest stood in filthy garments while Satan accused him — the Lord silenced Satan and clothed Joshua in a change of raiment. This mantle uses the blood of the Lamb and the word of testimony to shut every accusing mouth.",
    scriptures: [
      { ref: "Revelation 12:10–11 (KJV)", text: "And I heard a loud voice saying in heaven, Now is come salvation, and strength, and the kingdom of our God, and the power of his Christ: for the accuser of our brethren is cast down, which accused them before our God day and night. And they overcame him by the blood of the Lamb, and by the word of their testimony; and they loved not their lives unto the death." },
      { ref: "Zechariah 3:3–4 (KJV)", text: "Now Joshua was clothed with filthy garments, and stood before the angel. And he answered and spake unto those that stood before him, saying, Take away the filthy garments from him. And unto him he said, Behold, I have caused thine iniquity to pass from thee, and I will clothe thee with change of raiment." },
    ],
    prayer: "Father, silence every accusing voice against me by the blood of the Lamb and the word of my testimony. Take off every filthy garment and clothe me with a change of raiment. In Jesus' name. Amen.",
    declaration: "By the blood of the Lamb and the word of my testimony, every accuser is silenced. I wear a change of raiment.",
    reflection: "What accusation have I been agreeing with? I renounce it and receive the new robe.",
  },
  {
    n: 7, key: "favor-currency", emoji: "🌟",
    color: { accent: "#b17208", bg: "#fdf3d9", border: "#efd48c" }, // gold
    title: "Favor-as-Currency Mantle",
    sub: "Doors open before you speak.",
    simple: "God's favor will pay in places where your money cannot reach.",
    pics: [
      { ico: "🌟", cap: "Favor" },
      { ico: "🚪", cap: "Doors" },
      { ico: "🤝", cap: "Kindness" },
    ],
    what: "The beauty of the Lord and the favor written on the tablet of the heart open doors money cannot open. The mantle is walking in the goodwill of God with man.",
    scriptures: [
      { ref: "Psalm 90:17 (KJV)", text: "And let the beauty of the Lord our God be upon us: and establish thou the work of our hands upon us; yea, the work of our hands establish thou it." },
      { ref: "Proverbs 3:3–4 (KJV)", text: "Let not mercy and truth forsake thee: bind them about thy neck; write them upon the table of thine heart: So shalt thou find favour and good understanding in the sight of God and man." },
    ],
    prayer: "Father, let Your beauty rest on me and let favor go before me. Establish the work of my hands. Open doors that no man can shut. In Jesus' name. Amen.",
    declaration: "Favor is my currency. The beauty of the Lord is upon me. Doors open before I speak.",
    reflection: "What door am I trusting God to open by favor and not by striving?",
  },
  {
    n: 8, key: "instant-faith", emoji: "🔥",
    color: { accent: "#c04a1e", bg: "#fdefe7", border: "#f2c7ae" }, // orange
    title: "Instant-Manifestation Faith",
    sub: "Believe you receive when you pray.",
    simple: "When you pray, believe you have it already. That is faith.",
    pics: [
      { ico: "🙏", cap: "Pray" },
      { ico: "✅", cap: "Received" },
      { ico: "🎁", cap: "Manifest" },
    ],
    what: "This mantle collapses the delay between prayer and manifestation. The Lord Jesus taught us to believe we receive when we pray, not when we see.",
    scriptures: [
      { ref: "Mark 11:24 (KJV)", text: "Therefore I say unto you, What things soever ye desire, when ye pray, believe that ye receive them, and ye shall have them." },
      { ref: "Hebrews 11:1 (KJV)", text: "Now faith is the substance of things hoped for, the evidence of things not seen." },
    ],
    prayer: "Father, give me faith that receives at the point of prayer. Let what I desire according to Your will manifest without delay. In Jesus' name. Amen.",
    declaration: "When I pray, I receive. My faith is the substance of what I have hoped for.",
    reflection: "What prayer have I been repeating without receiving? Today I close the prayer with 'It is done.'",
  },
  {
    n: 9, key: "shunammite", emoji: "🔍",
    color: { accent: "#3a6b3a", bg: "#eef6ec", border: "#c9dfc4" }, // deep green
    title: "The Shunammite Discernment Mantle",
    sub: "See a holy man of God.",
    simple: "God will help you recognize a real man or woman of God and honor them.",
    pics: [
      { ico: "👁️", cap: "Discern" },
      { ico: "🛏️", cap: "Prepare" },
      { ico: "🏆", cap: "Reward" },
    ],
    what: "The Shunammite woman perceived Elisha as a holy man of God and prepared a room for him — and she received a son. This mantle is discernment to recognize and honor genuine ministry.",
    scriptures: [
      { ref: "2 Kings 4:9 (KJV)", text: "And she said unto her husband, Behold now, I perceive that this is an holy man of God, which passeth by us continually." },
      { ref: "2 Chronicles 20:20 (KJV)", text: "…Believe in the Lord your God, so shall ye be established; believe his prophets, so shall ye prosper." },
    ],
    prayer: "Father, give me the Shunammite's eye. Let me perceive Your servants, honor them properly, and prosper by believing Your prophets. In Jesus' name. Amen.",
    declaration: "I perceive holy men of God. I honor rightly. I am established, and I prosper.",
    reflection: "How can I honor genuine ministry in my life this week — with time, resources, or attention?",
  },
  {
    n: 10, key: "moses-mountain", emoji: "🙌",
    color: { accent: "#5a4a2a", bg: "#f6f0e0", border: "#dfd2ae" }, // bronze
    title: "Moses-on-the-Mountain Intercession",
    sub: "Lifted hands. Battles won.",
    simple: "Someone praying for you can change what happens in your day.",
    pics: [
      { ico: "🙌", cap: "Lifted hands" },
      { ico: "⛰️", cap: "Mountain" },
      { ico: "🕊️", cap: "Victory" },
    ],
    what: "While Joshua fought in the valley, Moses' lifted hands from the mountain determined the outcome. Aaron and Hur held his hands steady. This mantle is intercessory endurance for others.",
    scriptures: [
      { ref: "Exodus 17:11–12 (KJV)", text: "And it came to pass, when Moses held up his hand, that Israel prevailed: and when he let down his hand, Amalek prevailed. But Moses' hands were heavy; and they took a stone, and put it under him, and he sat thereon; and Aaron and Hur stayed up his hands, the one on the one side, and the other on the other side; and his hands were steady until the going down of the sun." },
      { ref: "James 5:16 (KJV)", text: "…The effectual fervent prayer of a righteous man availeth much." },
    ],
    prayer: "Father, put me on the mountain of intercession. Steady my hands until the going down of the sun. Let my effectual fervent prayer avail much for those I love. In Jesus' name. Amen.",
    declaration: "My hands are lifted. My prayers prevail. Those I intercede for win their battles.",
    reflection: "Whose hands do I need to hold up in prayer today?",
  },
  {
    n: 11, key: "dream-altar", emoji: "🌙",
    color: { accent: "#4a2e6b", bg: "#f1ecf7", border: "#d2c5e5" }, // deep purple
    title: "Dream-Altar Breaking Mantle",
    sub: "Every altar calling your name — silenced.",
    simple: "No hidden altar can keep calling your name at night. The blood of Jesus shuts it.",
    pics: [
      { ico: "🌙", cap: "Night" },
      { ico: "🩸", cap: "Blood" },
      { ico: "🔕", cap: "Silenced" },
    ],
    what: "The teaching prayed against every altar being used to call people's names in dreams and reframed the vision of a faceless hand delivering something as an angel of the Lord bringing breakthrough. Authority to silence such altars by the blood — without identifying any human being from a dream.",
    scriptures: [
      { ref: "Isaiah 54:17 (KJV)", text: "No weapon that is formed against thee shall prosper; and every tongue that shall rise against thee in judgment thou shalt condemn. This is the heritage of the servants of the Lord, and their righteousness is of me, saith the Lord." },
      { ref: "Job 33:15–16 (KJV)", text: "In a dream, in a vision of the night, when deep sleep falleth upon men, in slumberings upon the bed; Then he openeth the ears of men, and sealeth their instruction." },
    ],
    prayer: "Father, by the blood of Jesus I silence every altar that has been used to call my name in the night. Let every weapon formed against me fail and every tongue raised in judgment against me be condemned. Seal Your instruction in my dreams and let every angelic delivery meant for me land in my hands. In Jesus' name. Amen.",
    declaration: "Every altar calling my name is silenced by the blood of Jesus. No weapon formed against me prospers. What heaven has sent me lands in my hands.",
    reflection: "Handle dream figures as prayer prompts, not verdicts. What am I renouncing without accusing any person?",
  },
  {
    n: 12, key: "covenant-sacrifice", emoji: "🕯️",
    color: { accent: "#8a4a0f", bg: "#fdf1de", border: "#efd0a0" }, // amber
    title: "The Covenant-Sacrifice Mantle",
    sub: "The seed that closes chapters.",
    simple: "A seed sown to God on purpose can close an old chapter and open a new one.",
    pics: [
      { ico: "🌱", cap: "Seed" },
      { ico: "🕯️", cap: "Altar" },
      { ico: "📖", cap: "New chapter" },
    ],
    what: "Covenant sacrifice was released as the altar that closes the old chapter and opens the new — Hannah's vow, Solomon's Gibeon offering, and the gathering of those who make covenant with God by sacrifice. First-fruit, tithe, seed and offering as worship — not superstition.",
    scriptures: [
      { ref: "Psalm 50:5 (KJV)", text: "Gather my saints together unto me; those that have made a covenant with me by sacrifice." },
      { ref: "1 Samuel 1:11 (KJV)", text: "And she vowed a vow, and said, O Lord of hosts, if thou wilt indeed look on the affliction of thine handmaid, and remember me, and not forget thine handmaid, but wilt give unto thine handmaid a man child, then I will give him unto the Lord all the days of his life…" },
    ],
    prayer: "Father, gather me among those who make covenant with You by sacrifice. Let every seed I sow in this season close the chapter of disgrace, weakness and delay, and open a chapter of good news, testimonies and breakthroughs. In Jesus' name. Amen.",
    declaration: "I make covenant with the Lord by sacrifice. My seed closes the old chapter and opens a new chapter of good news.",
    reflection: "What one act of worshipful sacrifice will I offer to seal this season?",
  },
];
