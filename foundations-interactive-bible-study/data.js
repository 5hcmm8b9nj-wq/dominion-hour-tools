// =========================================================
// Foundations Bible Study — Scripture & Commentary Database
// Verified from Bible Gateway, bible-api.com (KJV/ESV/NIV/NKJV/WEB)
// Commentary excerpts from public-domain / reputable evangelical
// sources (Barnes' Notes, Ellicott's Commentary, Cambridge Bible,
// Benson Commentary) via BibleHub.
// =========================================================

var FOUNDATIONS_DATA = {

  // -----------------------------------------------------------
  // TIMELINE — chronological Foundation-narrative events
  // Approximate dates follow common conservative/traditional
  // biblical chronology (Ussher-informed but rounded).
  // -----------------------------------------------------------
  timeline: [
    {
      id: "t-creation",
      date: "In the beginning",
      era: "Creation",
      approx_bc: -4000,
      title: "God Lays the Foundations of the Earth",
      passage: "Job 38:4; Psalm 102:25",
      summary: "The LORD Himself is the first Foundation-Layer. Before any human ever built, God set the pillars of the earth. Every human 'foundation' echoes His original architecture.",
      key_verse: "Where wast thou when I laid the foundations of the earth? declare, if thou hast understanding. — Job 38:4 (KJV)",
      theme_tags: ["divine architecture", "creation", "origin"]
    },
    {
      id: "t-babel",
      date: "After the flood",
      era: "Patriarchs",
      approx_bc: -2200,
      title: "The Tower of Babel — A Foundation of Pride",
      passage: "Genesis 11:1-9",
      summary: "Men in Shinar say, 'Go to, let us build us a city and a tower...let us make us a name.' The first recorded human building project apart from God's covenant collapses because its foundation was human ambition, not divine call. The LORD confounds their language.",
      key_verse: "Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name. — Genesis 11:4 (KJV)",
      theme_tags: ["pride", "false foundation", "self-exaltation"]
    },
    {
      id: "t-terah",
      date: "c. 2100 BC",
      era: "Patriarchs",
      approx_bc: -2100,
      title: "The Lineage of Terah",
      passage: "Genesis 11:24-32",
      summary: "The Bible pauses the Babel judgment to introduce a genealogy — Nahor begat Terah, and Terah begat Abram, Nahor, and Haran. In one lifetime the family carries both ancestral idolatry (Joshua 24:2 notes Terah served other gods) and the seed of the coming covenant. Terah begins the journey to Canaan but stops short at Haran and dies there. His son Abram will finish the journey his father could not.",
      key_verse: "And Terah took Abram his son...to go into the land of Canaan; and they came unto Haran, and dwelt there...and Terah died in Haran. — Genesis 11:31-32 (KJV)",
      theme_tags: ["lineage", "generational transition", "incomplete obedience", "legacy"]
    },
    {
      id: "t-abrahamic-call",
      date: "c. 2091 BC",
      era: "Patriarchs",
      approx_bc: -2091,
      title: "The Call of Abram — A New Foundation Line",
      passage: "Genesis 12:1-4",
      summary: "God calls Abram out of his father's house. Where Terah stopped at Haran, Abram continues. A new spiritual foundation is laid — 'in thee shall all families of the earth be blessed.' This is the covenant on which the entire Old Testament rests.",
      key_verse: "Get thee out of thy country, and from thy kindred, and from thy father's house, unto a land that I will shew thee. — Genesis 12:1 (KJV)",
      theme_tags: ["covenant", "separation", "new beginning", "call"]
    },
    {
      id: "t-jericho-fall",
      date: "c. 1406 BC",
      era: "Conquest",
      approx_bc: -1406,
      title: "Jericho's Walls Fall and Joshua's Curse",
      passage: "Joshua 6:20, 26",
      summary: "The walls of Jericho collapse at the shout of Israel. Joshua then pronounces a solemn oath: whoever rebuilds this city will lay its foundation at the cost of his firstborn and set up its gates at the cost of his youngest. The site is placed under 'cherem' — devoted to destruction — never to be raised again.",
      key_verse: "Cursed be the man before the LORD, that riseth up and buildeth this city Jericho: he shall lay the foundation thereof in his firstborn, and in his youngest son shall he set up the gates of it. — Joshua 6:26 (KJV)",
      theme_tags: ["prophetic word", "curse", "dedication to destruction", "sacred boundary"]
    },
    {
      id: "t-solomon-temple",
      date: "c. 966 BC",
      era: "Kingdom",
      approx_bc: -966,
      title: "Solomon Lays the Temple Foundation",
      passage: "1 Kings 6:37; 1 Kings 5:17",
      summary: "In the fourth year of Solomon's reign the foundation of the LORD's house is laid with great and costly stones, hewn stones, to make the foundation. A foundation of worship and reverence — the counterpart to every corrupt foundation in Scripture.",
      key_verse: "And the king commanded, and they brought great stones, costly stones, and hewed stones, to lay the foundation of the house. — 1 Kings 5:17 (KJV)",
      theme_tags: ["worship", "temple", "reverent building"]
    },
    {
      id: "t-hiel-jericho",
      date: "c. 870 BC",
      era: "Divided Kingdom",
      approx_bc: -870,
      title: "Hiel of Bethel Rebuilds Jericho",
      passage: "1 Kings 16:34",
      summary: "In the days of wicked King Ahab, Hiel the Bethelite defies Joshua's ancient oath. He rebuilds Jericho — and loses his firstborn Abiram when he lays the foundation and his youngest Segub when he sets up the gates. A curse spoken 500+ years earlier lands with perfect precision. The narrative is a living warning: what we build on cursed ground exacts a generational cost.",
      key_verse: "In his days did Hiel the Bethelite build Jericho: he laid the foundation thereof in Abiram his firstborn, and set up the gates thereof in his youngest son Segub, according to the word of the LORD, which he spake by Joshua the son of Nun. — 1 Kings 16:34 (KJV)",
      theme_tags: ["cursed foundation", "generational cost", "prophetic fulfillment", "defiance of God's word"]
    },
    {
      id: "t-elisha-heals",
      date: "c. 850 BC",
      era: "Divided Kingdom",
      approx_bc: -850,
      title: "Elisha Heals the Waters of Jericho",
      passage: "2 Kings 2:19-22",
      summary: "The men of Jericho tell Elisha the water is bad and the ground barren. Elisha casts salt into the spring and declares, 'Thus saith the LORD, I have healed these waters.' Even ground under an ancient curse can be healed by a prophetic word carrying God's authority. Restoration is available where judgment once stood.",
      key_verse: "So the waters were healed unto this day, according to the saying of Elisha which he spake. — 2 Kings 2:22 (KJV)",
      theme_tags: ["healing", "prophetic reversal", "restoration"]
    },
    {
      id: "t-psalm-11",
      date: "c. 1000 BC",
      era: "Kingdom",
      approx_bc: -1000,
      title: "David: 'If the Foundations Be Destroyed'",
      passage: "Psalm 11:3",
      summary: "David asks the piercing question that every generation must answer: when the moral and covenantal foundations of a society are torn down, what recourse does the righteous have? The Psalm answers itself — the LORD is in His holy temple; the LORD's throne is in heaven. God's foundation is never destroyed.",
      key_verse: "If the foundations be destroyed, what can the righteous do? — Psalm 11:3 (KJV)",
      theme_tags: ["moral foundation", "societal collapse", "trust in God"]
    },
    {
      id: "t-isaiah-repair",
      date: "c. 700 BC",
      era: "Prophets",
      approx_bc: -700,
      title: "Isaiah — The Repairer of the Breach",
      passage: "Isaiah 58:12",
      summary: "Isaiah prophesies a new title for God's people: 'The repairer of the breach, the restorer of paths to dwell in.' Those who fast and act justly will raise up the foundations of many generations — restoring what previous generations tore down. Legacy work is spiritual work.",
      key_verse: "And they that shall be of thee shall build the old waste places: thou shalt raise up the foundations of many generations. — Isaiah 58:12 (KJV)",
      theme_tags: ["restoration", "generational repair", "legacy"]
    },
    {
      id: "t-return-foundation",
      date: "c. 536 BC",
      era: "Return",
      approx_bc: -536,
      title: "The Foundation of the Second Temple",
      passage: "Ezra 3:10-13",
      summary: "The returning exiles lay the foundation of the second temple. The old men who had seen the first temple weep aloud; the young rejoice. Foundation-laying is always a mixture of grief for what was lost and hope for what will be — a picture of every legacy work.",
      key_verse: "And when the builders laid the foundation of the temple of the LORD...all the people shouted with a great shout, when they praised the LORD, because the foundation of the house of the LORD was laid. — Ezra 3:10-11 (KJV)",
      theme_tags: ["restoration", "renewal", "grief and joy"]
    },
    {
      id: "t-christ-rock",
      date: "c. AD 30",
      era: "Gospels",
      approx_bc: 30,
      title: "Christ — The Wise Builder and The Rock",
      passage: "Matthew 7:24-27",
      summary: "Jesus closes the Sermon on the Mount with the parable of the two builders. Hearing His words is not enough — doing them is what puts a life on rock. The final image of His most famous sermon is architectural: a house that stands versus a house that falls with a great crash.",
      key_verse: "Therefore whosoever heareth these sayings of mine, and doeth them, I will liken him unto a wise man, which built his house upon a rock. — Matthew 7:24 (KJV)",
      theme_tags: ["obedience", "Christ the Rock", "spiritual architecture"]
    },
    {
      id: "t-paul-foundation",
      date: "c. AD 55",
      era: "Apostolic",
      approx_bc: 55,
      title: "Paul — 'Other Foundation Can No Man Lay'",
      passage: "1 Corinthians 3:10-15",
      summary: "Paul, the wise master builder, declares the only true foundation of the Church: Jesus Christ. What we build upon that foundation — gold, silver, precious stones, or wood, hay, stubble — will be tried by fire. Every ministry, every family, every life is a superstructure resting on Christ.",
      key_verse: "For other foundation can no man lay than that is laid, which is Jesus Christ. — 1 Corinthians 3:11 (KJV)",
      theme_tags: ["Christ the foundation", "ministry testing", "eternal reward"]
    },
    {
      id: "t-ephesians-household",
      date: "c. AD 62",
      era: "Apostolic",
      approx_bc: 62,
      title: "Built on Apostles and Prophets, Christ the Cornerstone",
      passage: "Ephesians 2:19-22",
      summary: "Paul describes the Church as a temple 'fitly framed together' — every believer a living stone. The foundation is the apostles and prophets; Jesus Christ Himself is the chief cornerstone. Spiritual architecture is corporate: no believer stands alone.",
      key_verse: "And are built upon the foundation of the apostles and prophets, Jesus Christ himself being the chief corner stone. — Ephesians 2:20 (KJV)",
      theme_tags: ["corporate identity", "cornerstone", "living temple"]
    },
    {
      id: "t-hebrews-city",
      date: "c. AD 68",
      era: "Apostolic",
      approx_bc: 68,
      title: "The City That Hath Foundations",
      passage: "Hebrews 11:10",
      summary: "Abraham, who left Ur, spent his life in tents — yet he 'looked for a city which hath foundations, whose builder and maker is God.' The final foundation in Scripture is not a physical structure but the eternal city prepared by God. Every faithful builder in Scripture points forward to it.",
      key_verse: "For he looked for a city which hath foundations, whose builder and maker is God. — Hebrews 11:10 (KJV)",
      theme_tags: ["eternal city", "faith", "God the builder", "consummation"]
    }
  ],

  // -----------------------------------------------------------
  // VERSE COMPARISON DATABASE
  // Multi-translation text for key Foundations passages.
  // Sources: Bible Gateway (KJV, ESV, NIV, NKJV) & bible-api.com
  // (KJV, World English Bible — public domain).
  // -----------------------------------------------------------
  verses: [
    {
      ref: "1 Kings 16:34",
      title: "Hiel Rebuilds Jericho",
      translations: {
        KJV: "In his days did Hiel the Bethelite build Jericho: he laid the foundation thereof in Abiram his firstborn, and set up the gates thereof in his youngest son Segub, according to the word of the LORD, which he spake by Joshua the son of Nun.",
        NKJV: "In his days Hiel of Bethel built Jericho. He laid its foundation with Abiram his firstborn, and with his youngest son Segub he set up its gates, according to the word of the LORD, which He had spoken through Joshua the son of Nun.",
        ESV: "In his days Hiel of Bethel built Jericho. He laid its foundation at the cost of Abiram his firstborn, and set up its gates at the cost of his youngest son Segub, according to the word of the LORD, which he spoke by Joshua the son of Nun.",
        NIV: "In Ahab's time, Hiel of Bethel rebuilt Jericho. He laid its foundations at the cost of his firstborn son Abiram, and he set up its gates at the cost of his youngest son Segub, in accordance with the word of the LORD spoken by Joshua son of Nun."
      }
    },
    {
      ref: "Joshua 6:26",
      title: "Joshua's Oath Over Jericho",
      translations: {
        KJV: "And Joshua adjured them at that time, saying, Cursed be the man before the LORD, that riseth up and buildeth this city Jericho: he shall lay the foundation thereof in his firstborn, and in his youngest son shall he set up the gates of it.",
        NKJV: "Then Joshua charged them at that time, saying, \"Cursed be the man before the LORD who rises up and builds this city Jericho; he shall lay its foundation with his firstborn, and with his youngest he shall set up its gates.\"",
        WEB: "Joshua commanded them with an oath at that time, saying, \"Cursed is the man before Yahweh, who rises up and builds this city Jericho. With the loss of his firstborn he will lay its foundation, and with the loss of his youngest son he will set up its gates.\""
      }
    },
    {
      ref: "Genesis 11:31-32",
      title: "Terah's Incomplete Journey",
      translations: {
        KJV: "And Terah took Abram his son, and Lot the son of Haran his son's son, and Sarai his daughter in law, his son Abram's wife; and they went forth with them from Ur of the Chaldees, to go into the land of Canaan; and they came unto Haran, and dwelt there. And the days of Terah were two hundred and five years: and Terah died in Haran."
      }
    },
    {
      ref: "Psalm 11:3",
      title: "If the Foundations Be Destroyed",
      translations: {
        KJV: "If the foundations be destroyed, what can the righteous do?",
        NKJV: "If the foundations are destroyed, What can the righteous do?",
        ESV: "if the foundations are destroyed, what can the righteous do?",
        NIV: "When the foundations are being destroyed, what can the righteous do?"
      }
    },
    {
      ref: "Isaiah 58:12",
      title: "Repairer of the Breach",
      translations: {
        KJV: "And they that shall be of thee shall build the old waste places: thou shalt raise up the foundations of many generations; and thou shalt be called, The repairer of the breach, The restorer of paths to dwell in.",
        ESV: "And your ancient ruins shall be rebuilt; you shall raise up the foundations of many generations; you shall be called the repairer of the breach, the restorer of streets to dwell in.",
        NIV: "Your people will rebuild the ancient ruins and will raise up the age-old foundations; you will be called Repairer of Broken Walls, Restorer of Streets with Dwellings."
      }
    },
    {
      ref: "Matthew 7:24-27",
      title: "The Wise and Foolish Builders",
      translations: {
        KJV: "Therefore whosoever heareth these sayings of mine, and doeth them, I will liken him unto a wise man, which built his house upon a rock: And the rain descended, and the floods came, and the winds blew, and beat upon that house; and it fell not: for it was founded upon a rock. And every one that heareth these sayings of mine, and doeth them not, shall be likened unto a foolish man, which built his house upon the sand: And the rain descended, and the floods came, and the winds blew, and beat upon that house; and it fell: and great was the fall of it.",
        ESV: "\"Everyone then who hears these words of mine and does them will be like a wise man who built his house on the rock. And the rain fell, and the floods came, and the winds blew and beat on that house, but it did not fall, because it had been founded on the rock. And everyone who hears these words of mine and does not do them will be like a foolish man who built his house on the sand. And the rain fell, and the floods came, and the winds blew and beat against that house, and it fell, and great was the fall of it.\"",
        NIV: "\"Therefore everyone who hears these words of mine and puts them into practice is like a wise man who built his house on the rock. The rain came down, the streams rose, and the winds blew and beat against that house; yet it did not fall, because it had its foundation on the rock. But everyone who hears these words of mine and does not put them into practice is like a foolish man who built his house on sand. The rain came down, the streams rose, and the winds blew and beat against that house, and it fell with a great crash.\""
      }
    },
    {
      ref: "1 Corinthians 3:10-11",
      title: "Christ the Only Foundation",
      translations: {
        KJV: "According to the grace of God which is given unto me, as a wise masterbuilder, I have laid the foundation, and another buildeth thereon. But let every man take heed how he buildeth thereupon. For other foundation can no man lay than that is laid, which is Jesus Christ."
      }
    },
    {
      ref: "Ephesians 2:19-22",
      title: "Christ the Chief Cornerstone",
      translations: {
        KJV: "Now therefore ye are no more strangers and foreigners, but fellowcitizens with the saints, and of the household of God; And are built upon the foundation of the apostles and prophets, Jesus Christ himself being the chief corner stone; In whom all the building fitly framed together groweth unto an holy temple in the Lord: In whom ye also are builded together for an habitation of God through the Spirit."
      }
    },
    {
      ref: "Hebrews 11:10",
      title: "The City That Hath Foundations",
      translations: {
        KJV: "For he looked for a city which hath foundations, whose builder and maker is God."
      }
    },
    {
      ref: "Psalm 127:1",
      title: "Except the Lord Build the House",
      translations: {
        KJV: "Except the LORD build the house, they labour in vain that build it: except the LORD keep the city, the watchman waketh but in vain."
      }
    }
  ],

  // -----------------------------------------------------------
  // COMMENTARY DATABASE (searchable)
  // Excerpts from public-domain / reputable Christian commentaries:
  // Barnes' Notes, Ellicott's Commentary for English Readers,
  // Cambridge Bible for Schools & Colleges, Benson Commentary,
  // Matthew Henry (Concise). All sourced through BibleHub.
  // -----------------------------------------------------------
  commentary: [
    {
      id: "c-1kings-16-34-ellicott",
      ref: "1 Kings 16:34",
      author: "Ellicott's Commentary",
      excerpt: "This marks both the growth of prosperity and power, and the neglect of the old curse of Joshua (Joshua 6:26). The place had not, it would appear, been entirely deserted. But it was now made — what it continued to be even down to the time of Herod — an important place. Its natural advantages were great. It stood in a position well watered, and accordingly of great beauty and fruitfulness (\"the city of palm trees\"), and was, moreover, a city of military consequence, as commanding the pass from the valley of the Jordan to the high ground of Ai and Bethel. Its being rebuilt by a Bethelite, evidently under the patronage of Ahab, is one of the indications of a half-dependent condition of the Southern kingdom at this time.",
      themes: ["cursed foundation", "prophetic fulfillment", "Ahab", "Jericho"]
    },
    {
      id: "c-joshua-6-26-benson",
      ref: "Joshua 6:26",
      author: "Benson Commentary",
      excerpt: "Joshua adjured them at that time — Hebrew, jashbang, he made them to swear. As soon as the city was destroyed, it seems, he convened the heads of the tribes, to signify to them that it was the will of God this idolatrous city should never be rebuilt, and then engaged them to take an oath that they would leave it in the state in which it then was. He shall lay the foundation thereof in his firstborn — Meaning, that God would so punish the presumption of the rebuilder that his eldest son should die when he began the work, and his youngest when he finished it.",
      themes: ["oath", "prophetic word", "presumption", "generational cost"]
    },
    {
      id: "c-joshua-6-26-ellicott",
      ref: "Joshua 6:26",
      author: "Ellicott's Commentary",
      excerpt: "As the marginal reference indicates, the curse of Joshua was not incurred until Hiel the Bethelite built the city, in the reign of Ahab. But the \"city of palm-trees\" is (somewhat doubtfully) identified with Jericho, and this was occupied by the Moabites under Eglon, not very long after the time of Joshua (Judges 3:13), and seems to have been Eglon's residence, where he was slain by Ehud. The curse, fulfilled upon Hiel and his family, appears to have been finally removed by the intercession of Elisha (2 Kings 2:18-22), at the request of the inhabitants.",
      themes: ["curse", "removal by prophetic intercession", "Elisha", "Jericho"]
    },
    {
      id: "c-psalm-11-3-ellicott",
      ref: "Psalm 11:3",
      author: "Ellicott's Commentary",
      excerpt: "The foundations — By this word must be understood the principles of morality, which are the foundation of society. Symmachus and Jerome render \"laws.\" The image is of a house shattered by an earthquake; in such a case how find safety? A suggested emendation, involving but a slight change in the Hebrew letters, would produce, however, a far better sense: \"If the foundations be destroyed, what will become of the tower, or superstructure?\"",
      themes: ["moral foundation", "societal collapse", "principles of society"]
    },
    {
      id: "c-psalm-11-3-benson",
      ref: "Psalm 11:3",
      author: "Benson Commentary",
      excerpt: "This is thought to be spoken by the same persons, discouraging David from making any further resistance, by the consideration that all the foundations of law, and justice, and religion in the kingdom were now overthrown by Saul, and there was nothing to be looked for but universal ruin. But David, in the following verses, does not yield to this despair. He turns his eye upward — 'The LORD is in his holy temple, the LORD's throne is in heaven.' God's throne is a foundation that no earthly tumult can shake.",
      themes: ["despair vs faith", "God's throne", "immovable foundation"]
    },
    {
      id: "c-isaiah-58-12-ellicott",
      ref: "Isaiah 58:12",
      author: "Ellicott's Commentary",
      excerpt: "Shall build the old waste places — The prophet contemplates primarily the restoration of the public and private buildings of Jerusalem, but the words have obviously a wider spiritual application. The foundations of many generations — i.e., those that had been lying in ruins, with no superstructure, for even a longer period than the seventy years of exile. Thou shalt be called — This was to be the special work, and was to constitute the enduring fame, of the new Israel.",
      themes: ["restoration", "generational repair", "spiritual application", "legacy"]
    },
    {
      id: "c-isaiah-58-12-barnes",
      ref: "Isaiah 58:12",
      author: "Barnes' Notes",
      excerpt: "Shall build the old waste places — Shall repair the old ruins, and restore the desolate cities and fields to their former beauty. This language is taken from the condition of Judea during the long captivity at Babylon. The land would have been desolated by the Chaldeans, and lain waste for a period of seventy years. Of course, in that time cities would fall to ruin, and fields would be overrun with briars and thorns. To restore them to their former beauty would be a work of great difficulty and cost — yet God promises His people this very ministry.",
      themes: ["exile and return", "restoration ministry", "generational work"]
    },
    {
      id: "c-1cor-3-11-barnes",
      ref: "1 Corinthians 3:11",
      author: "Barnes' Notes",
      excerpt: "Can no man lay — That is, there is no other true foundation. Which is Jesus Christ — Christ is often called the foundation; the stone; the cornerstone upon which the church is reared (Isaiah 28:16; Matthew 21:42; Acts 4:11; Ephesians 2:20; 2 Timothy 2:19; 1 Peter 2:6). The meaning is, that no true church can be reared which does not embrace and hold the true doctrines respecting him — those which pertain to his incarnation, his divine nature, his instructions, his example, his atonement, his resurrection, and ascension. The reason why no true church can be established without embracing the truth as it is in Christ is, that it is by him only that people can be saved.",
      themes: ["Christ the foundation", "true doctrine", "church"]
    },
    {
      id: "c-matt-7-mhc",
      ref: "Matthew 7:24-27",
      author: "Matthew Henry (Concise)",
      excerpt: "He is a wise man, who builds his house upon the rock. Christ is the Rock, the only foundation for a soul to build upon. Those who hear Christ's sayings and do them not, build upon the sand — they profess Christianity, but do not obey. When storms come — trouble, sickness, death, judgment — the house on sand collapses. The rain and the floods will come to every builder. The only difference between the wise and foolish is the foundation.",
      themes: ["obedience", "Christ the Rock", "testing", "final judgment"]
    },
    {
      id: "c-terah-mhc",
      ref: "Genesis 11:31-32",
      author: "Matthew Henry (Concise)",
      excerpt: "Terah went out of Ur of the Chaldees, with a design to come into the land of Canaan; but he came to Haran, and dwelt there. Perhaps he was unwilling to leave his kindred and country, or the journey was too tiresome. Many set out well in the ways of God, but do not persevere. It was not until Terah was dead that Abram removed from Haran, according to God's command. God will call us to press forward though our kindred stay behind.",
      themes: ["incomplete obedience", "generational transition", "perseverance", "Terah"]
    },
    {
      id: "c-eph-2-mhc",
      ref: "Ephesians 2:19-22",
      author: "Matthew Henry (Concise)",
      excerpt: "The apostles and prophets are the foundation, as they were employed to reveal the mind of Christ, and to gather churches upon that revelation. But Christ himself is the chief corner-stone. All the parts of this building are framed together by the wisdom and power of the great Architect. All true believers, both Jews and Gentiles, are the living stones. In him the whole building is fitly framed together — not by human contrivance, but by divine appointment.",
      themes: ["cornerstone", "apostolic foundation", "corporate church", "living stones"]
    }
  ],

  // -----------------------------------------------------------
  // THEMATIC APPLICATIONS — the "spiritual architecture" bridge
  // between biblical narratives and modern deliverance-ministry
  // study.
  // -----------------------------------------------------------
  themes: [
    {
      id: "th-legacy",
      title: "Legacy — What We Inherit and What We Pass On",
      anchor_verse: "Isaiah 58:12",
      summary: "Every believer inherits a foundation from previous generations and lays a foundation for the next. Terah's story shows the cost of stopping short; Isaiah 58 shows the calling of the 'repairer of the breach' — one who raises up the foundations of many generations. Legacy is the second half of foundations.",
      reflection: [
        "What foundations did I inherit from my family that need to be repaired?",
        "What foundations am I laying today that the next generation will build on?",
        "Where has God called me to be a 'restorer of paths to dwell in'?"
      ]
    },
    {
      id: "th-spiritual-arch",
      title: "Spiritual Architecture — Building on the Right Foundation",
      anchor_verse: "1 Corinthians 3:10-11 · Matthew 7:24-27",
      summary: "Paul calls himself a 'wise masterbuilder.' Jesus warns that hearing without doing is building on sand. Spiritual architecture is the deliberate construction of a life, family, or ministry on Christ the Rock — with materials (gold, silver, precious stones) that will survive the fire of testing.",
      reflection: [
        "What am I currently building? Is Christ the foundation, or something else?",
        "What 'building materials' — habits, teachings, relationships — am I using?",
        "Would my structure stand a storm, or is it framed on sand?"
      ]
    },
    {
      id: "th-cursed-ground",
      title: "Cursed Foundations — When Ground Must Be Redeemed",
      anchor_verse: "Joshua 6:26 · 1 Kings 16:34 · 2 Kings 2:19-22",
      summary: "Jericho is the Bible's clearest case of a cursed foundation. Joshua's oath stood for 500+ years. Hiel ignored it and paid with his sons. But Elisha's ministry showed the ground itself could be healed. Cursed foundations are real — and so is the prophetic authority to break them through Christ.",
      reflection: [
        "Are there 'cursed foundations' — patterns, oaths, or dedications — in my family line?",
        "What has been declared over my life that must be tested against God's word?",
        "How does Elisha's ministry model the healing of ground marked by past judgment?"
      ]
    },
    {
      id: "th-eternal-city",
      title: "The Eternal Foundation — The City God Builds",
      anchor_verse: "Hebrews 11:10",
      summary: "Abraham lived in tents but looked toward a city with foundations. Every foundation in Scripture — Jericho, the temple, the church — is provisional. Only one foundation is eternal: the city whose builder and maker is God. All spiritual architecture points there.",
      reflection: [
        "How does the reality of the eternal city shape what I build today?",
        "Where am I tempted to invest as though this life's foundations were final?",
        "What would change if I lived as one 'looking for a city which hath foundations'?"
      ]
    }
  ]
};

// Freeze so downstream can't accidentally mutate
Object.freeze(FOUNDATIONS_DATA);
window.FOUNDATIONS_DATA = FOUNDATIONS_DATA;
