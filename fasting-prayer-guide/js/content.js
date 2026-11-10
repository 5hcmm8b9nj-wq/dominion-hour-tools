/* Fasting & Prayer Guide — content
   L137 Deliverance Ministry International · Dominion Hour */
(function () {
  const S = {
    cruSteps: ["Cru — How to Begin Your Fast", "https://www.cru.org/us/en/train-and-grow/spiritual-growth/fasting/7-steps-to-fasting.2.html"],
    cruSched: ["Cru — Put Yourself on a Schedule", "https://www.cru.org/us/en/train-and-grow/spiritual-growth/fasting/7-steps-to-fasting.3.html"],
    cruTypes: ["Cru — What Length and Type of Fast Are Right for You", "https://www.cru.org/us/en/train-and-grow/spiritual-growth/fasting/personal-guide-to-fasting.4.html"],
    cruBiblical: ["Cru — What Is Biblical Fasting?", "https://www.cru.org/us/en/train-and-grow/spiritual-growth/fasting/biblical-fasting.html"],
    dgPurpose: ["Desiring God — The Secret Benefit of Fasting", "https://www.desiringgod.org/articles/the-secret-benefit-of-fasting"],
    dgWhy: ["Desiring God — Why Do Christians Fast?", "https://www.desiringgod.org/interviews/why-do-christians-fast"],
    dgIdols: ["Desiring God — What Is the Purpose of Fasting?", "https://www.desiringgod.org/interviews/what-is-the-purpose-of-fasting"],
    csl: ["C.S. Lewis Institute — The Place of Fasting in the Christian Life", "https://www.cslewisinstitute.org/resources/the-place-of-fasting-in-the-christian-life/"],
    ligDidache: ["Ligonier Ministries — The Didache", "https://learn.ligonier.org/articles/didache"],
    jfTips: ["Jentezen Franklin — Fasting Tips", "https://jentezenfranklin.org/fastingtips"],
    jfTypes: ["Jentezen Franklin — Three Types of Fasts in Scripture (Charisma)", "https://mycharisma.com/culture/jentezen-franklin-3-different-types-of-fasts-in-scripture/"],
    jfPost: ["The Christian Post — Jentezen Franklin on 21 Days of Fasting", "https://www.christianpost.com/news/pastor-jentezen-franklin-calls-for-21-days-of-fasting-and-prayer-turn-back-to-god.html"],
    gq: ["GotQuestions — Mutual Consent in 1 Corinthians 7:5", "https://www.gotquestions.org/mutual-consent.html"],
    nia: ["National Institute on Aging (NIH) — Research on Intermittent Fasting", "https://www.nia.nih.gov/news/research-intermittent-fasting-shows-health-benefits"],
    hop: ["Johns Hopkins Medicine — Intermittent Fasting: Is It for You?", "https://www.hopkinsmedicine.org/news/articles/2020/01/intermittent-fasting-is-it-for-you"],
    hopDiab: ["Johns Hopkins Diabetes Info — An Overview of Intermittent Fasting", "https://hopkinsdiabetesinfo.org/an-overview-of-intermittent-fasting/"],
    hopTRE: ["Johns Hopkins Hub — Study Challenges Benefits of Intermittent Fasting (2024)", "https://hub.jhu.edu/2024/04/22/study-challenges-intermittent-fasting/"],
    caff: ["Johns Hopkins Gazette — Caffeine Withdrawal Recognized as a Disorder", "https://pages.jh.edu/gazette/2004/04oct04/04cafein.html"],
    bmj: ["BMJ (via NIH PubMed Central) — Refeeding Syndrome: What It Is and How to Prevent It", "https://pmc.ncbi.nlm.nih.gov/articles/PMC2440847/"],
    islamicRelief: ["Islamic Relief — What Is Suhoor?", "https://islamic-relief.org/giving/islamic-giving/ramadan/suhoor/"],
    chabad: ["Chabad.org — Seudah Hamafseket, the Pre-Fast Meal", "https://www.chabad.org/library/article_cdo/aid/5238268/jewish/Seudah-Hamafseket.htm"],
    piper: ["John Piper — A Hunger for God (free PDF)", "https://www.desiringgod.org/books/a-hunger-for-god"],
    prince: ["Derek Prince — Shaping History Through Prayer and Fasting", "https://www.derekprince.com/books/shaping-history-through-prayer-and-fasting"],
    jfPdf: ["Jentezen Franklin — Fasting Resources", "https://jentezenfranklin.org/fastingpdf"],
    bibleGateway: ["Bible Gateway — King James Version", "https://www.biblegateway.com/versions/King-James-Version-KJV-Bible/"]
  };
  const L = (k) => `<a href="${S[k][1]}" target="_blank" rel="noopener">${S[k][0]}</a>`;

  const C = {};
  C.S = S;

  /* ---------- WHAT FASTING IS (levels) ---------- */
  C.definition = {
    simple: `<p>Fasting means choosing not to eat for a little while so you can spend that time with God. When your tummy feels hungry, let it remind you to pray. It is a way of telling God, “I need You even more than I need my food.”</p><p>Jesus fasted too. When the devil tempted Him with bread, He answered with God's Word.</p>`,
    teen: `<p>Fasting is going without food (and sometimes drink) for a set time, on purpose, to seek God. It is not a diet, and it is not a way to look holy in front of people. Jesus told His followers to keep it between them and the Father.</p><p>The hunger becomes a reminder to pray. Every time you would normally eat or reach for something, you turn to God instead.</p>`,
    adult: `<p>The Old Testament word for fasting, <em>tsom</em>, and the New Testament word, <em>nesteuo</em>, both mean to abstain from food (${L("csl")}). Christian fasting is voluntarily going without food for a set period for a spiritual purpose: to humble ourselves, to repent, to seek God's direction, to intercede for others, and to worship.</p><p>Prayer gives fasting its meaning. Desiring God puts it plainly: without a spiritual purpose, fasting is just going hungry (${L("dgPurpose")}).</p>`,
    deeper: `<p>Fasting runs through both testaments. On the Day of Atonement Israel was commanded to “afflict your souls” (Leviticus 16:29), and David links that language directly to fasting: “I humbled my soul with fasting” (Psalm 35:13).</p><p>Jesus assumes His people will fast. He says “when ye fast,” not “if ye fast” (Matthew 6:16), and He says that after the Bridegroom is taken away, “then shall they fast” (Matthew 9:15). The church in Acts fasted while ministering to the Lord and when sending out workers (Acts 13:2-3; 14:23).</p><p>Fasting never earns forgiveness or forces God's hand. In Isaiah 58 God rejects a fast joined to oppression and quarrelling, and in Zechariah 7:5 He asks, “did ye at all fast unto me, even to me?” Fasting expresses our dependence on God; it does not replace faith in Christ (${L("dgWhy")}).</p>`,
    refs: ["Psalm 35:13", "Matthew 6:16-18", "Matthew 9:14-15"]
  };

  /* ---------- ORIGINS TIMELINE ---------- */
  C.timeline = [
    { era: "The Law", title: "Moses on the mountain", refs: ["Exodus 34:28", "Deuteronomy 9:9"], note: "Moses was with the LORD forty days and forty nights without bread or water while God gave the covenant. This was a supernatural fast, sustained by God, and it is not a pattern to copy in our own strength." },
    { era: "The Law", title: "The Day of Atonement", refs: ["Leviticus 16:29-31", "Leviticus 23:27-28"], note: "The one fast commanded in the Law of Moses. Once a year all Israel was to “afflict your souls” before the LORD as atonement was made for their sins." },
    { era: "Judges", title: "Israel seeks direction before battle", refs: ["Judges 20:26"], note: "The people wept, sat before the LORD, and fasted until evening as they asked whether to go up to battle." },
    { era: "Kingdom", title: "Samuel gathers Israel at Mizpeh", refs: ["1 Samuel 7:6"], note: "A national fast of repentance. The people poured out water before the LORD and confessed, “We have sinned against the LORD.”" },
    { era: "Kingdom", title: "David intercedes for his child", refs: ["2 Samuel 12:16", "2 Samuel 12:22-23", "2 Samuel 12:20"], note: "David fasted and lay on the earth pleading for his son. When the child died, he rose, washed, worshipped, and accepted God's answer. Fasting is humble asking, not demanding." },
    { era: "Kingdom", title: "Elijah strengthened for the journey", refs: ["1 Kings 19:8"], note: "After eating food God provided, Elijah went in the strength of that meat forty days and forty nights to Horeb, the mount of God." },
    { era: "Kingdom", title: "Jehoshaphat proclaims a fast", refs: ["2 Chronicles 20:3-4"], note: "Facing a great army, the king set himself to seek the LORD and proclaimed a fast throughout all Judah. The whole nation gathered to ask help of the LORD." },
    { era: "Exile & Return", title: "Daniel's fasts", refs: ["Daniel 1:12", "Daniel 9:3", "Daniel 10:2-3", "Daniel 10:12"], note: "Daniel ate pulse and water rather than the king's food, sought God with fasting, sackcloth and ashes for his people, and later mourned three full weeks eating no pleasant bread, flesh, or wine. The angel told him his words were heard from the first day." },
    { era: "Exile & Return", title: "Esther's three-day fast", refs: ["Esther 4:16"], note: "Before going to the king uninvited to plead for her people, Esther asked the Jews to fast for her, neither eating nor drinking for three days, night or day." },
    { era: "Exile & Return", title: "Ezra at the river of Ahava", refs: ["Ezra 8:21-23"], note: "Ezra proclaimed a fast to seek a right way for the families and their goods on a dangerous journey. “So we fasted and besought our God for this: and he was intreated of us.”" },
    { era: "Exile & Return", title: "Nehemiah weeps for Jerusalem", refs: ["Nehemiah 1:4"], note: "Hearing that the walls of Jerusalem were broken down, Nehemiah mourned certain days, fasted, and prayed before the God of heaven." },
    { era: "Prophets", title: "Nineveh repents", refs: ["Jonah 3:5-10"], note: "At Jonah's preaching, the people of Nineveh believed God and proclaimed a fast from the greatest to the least. God saw their works, that they turned from their evil way." },
    { era: "Prophets", title: "Joel calls a solemn assembly", refs: ["Joel 2:12-13", "Joel 2:15-16"], note: "God calls His people to turn to Him with all their heart, with fasting, weeping, and mourning, and to rend their hearts and not their garments." },
    { era: "Prophets", title: "The fast God chooses", refs: ["Isaiah 58:3-5", "Isaiah 58:6-7", "Isaiah 58:8-9", "Isaiah 58:10-12"], note: "God exposes fasting mixed with strife and oppression, then describes the fast He has chosen: loosing bands of wickedness, freeing the oppressed, feeding the hungry, and caring for our own flesh. Promises of light, health, guidance, and restoration follow." },
    { era: "Prophets", title: "Did ye fast unto me?", refs: ["Zechariah 7:5"], note: "God asks whether years of religious fasting were truly for Him. The question still searches the heart today." },
    { era: "Gospels", title: "Anna in the temple", refs: ["Luke 2:37"], note: "A widow of about eighty-four years who served God with fastings and prayers night and day, and who saw the infant Jesus." },
    { era: "Gospels", title: "Jesus in the wilderness", refs: ["Matthew 4:1-4", "Luke 4:1-2", "Luke 4:14"], note: "Led by the Spirit, Jesus fasted forty days and was tempted. He answered the devil with Scripture: man shall not live by bread alone. He returned in the power of the Spirit." },
    { era: "Gospels", title: "Jesus teaches on fasting", refs: ["Matthew 6:16-18", "Matthew 9:14-15", "Matthew 17:19-21", "Mark 9:29"], note: "Jesus teaches us to fast in secret, says His disciples will fast after He is taken away, and links prayer and fasting with casting out a stubborn spirit." },
    { era: "Early Church", title: "Saul of Tarsus after Damascus", refs: ["Acts 9:9"], note: "After meeting the risen Christ, Saul was three days without sight, and neither did eat nor drink." },
    { era: "Early Church", title: "The church at Antioch", refs: ["Acts 13:2-3", "Acts 14:23"], note: "While the leaders ministered to the Lord and fasted, the Holy Ghost spoke. Fasting accompanied the sending of Barnabas and Saul and the appointing of elders." },
    { era: "Early Church", title: "Paul in fastings often", refs: ["2 Corinthians 11:27"], note: "Paul lists fasting among the marks of his ministry, alongside weariness, watching, hunger and thirst." },
    { era: "Church History", title: "The Didache: Wednesday and Friday", refs: [], note: `The Didache, an early Christian teaching manual, instructed believers to fast on Wednesdays and Fridays, and to fast before baptism (${L("ligDidache")}). Regular weekly fasting has been part of Christian practice since the earliest centuries.` }
  ];

  /* ---------- BENEFITS ---------- */
  C.benefitsSpiritual = [
    { t: "It humbles the heart", d: "Fasting is one of the clearest ways Scripture shows a person humbling himself before God.", refs: ["Psalm 35:13", "Ezra 8:21-23"] },
    { t: "It turns us back to God", d: "Fasting has always gone with repentance: turning from sin and returning to the Lord with the whole heart.", refs: ["Joel 2:12-13", "1 Samuel 7:6", "Jonah 3:5-10"] },
    { t: "It strengthens prayer and intercession", d: "Fasting adds earnestness to prayer. Ezra, Esther and Daniel all fasted when the need was great.", refs: ["Esther 4:16", "Daniel 9:3"] },
    { t: "It opens us to God's direction", d: "The church at Antioch received direction from the Holy Ghost while ministering to the Lord and fasting.", refs: ["Acts 13:2-3", "Acts 14:23", "Judges 20:26"] },
    { t: "It strengthens us against temptation", d: "Jesus fasted and overcame the devil with the Word. Fasting trains the body to follow the spirit.", refs: ["Matthew 4:1-4", "1 Corinthians 9:27"] },
    { t: "It joins prayer that breaks yokes", d: "God's chosen fast looses the bands of wickedness and lets the oppressed go free. Jesus spoke of prayer and fasting when a stubborn spirit would not leave.", refs: ["Isaiah 58:6-7", "Matthew 17:19-21", "Mark 9:29"] },
    { t: "Light, health and guidance follow", d: "God attaches promises to the fast He chooses: light breaking forth, health springing up, answered prayer, continual guidance, and rebuilding of old waste places.", refs: ["Isaiah 58:8-9", "Isaiah 58:10-12"] },
    { t: "It shows us what controls us", d: `When the comfort of food is removed, what is in the heart rises to the surface. Desiring God describes fasting as a way of exposing hidden idols (${L("dgIdols")}).`, refs: ["1 Corinthians 6:12"] },
    { t: "It deepens hunger for God", d: "Physical hunger becomes a picture of a deeper hunger: for God Himself, His Word, and the coming of His Son.", refs: ["Psalm 63:1", "John 4:32-34", "Deuteronomy 8:3"] },
    { t: "The Father rewards it", d: "Jesus promises that the Father who sees in secret will reward openly. The reward begins with God Himself.", refs: ["Matthew 6:16-18", "Hebrews 11:6"] },
    { t: "It unites God's people", d: "When a church or family fasts together, they seek God with one heart for one purpose.", refs: ["Joel 2:15-16", "2 Chronicles 20:3-4"] }
  ];
  C.benefitsPhysical = [
    { t: "Metabolic switching", d: `Researchers describe a “metabolic switch” during fasting, when the body moves from burning glucose to burning ketones from fat. Studies link this with better blood sugar regulation, greater stress resistance and reduced inflammation (${L("nia")}).` },
    { t: "Heart and blood measures", d: `A body of research led by Johns Hopkins neuroscientist Mark Mattson suggests intermittent fasting may help lower blood pressure and cholesterol, though the research is still in its early stages (${L("hop")}).` },
    { t: "Breaking a habit's hold", d: `Many people discover how dependent they are on caffeine and sugar. Cru notes that withdrawal from caffeine and sugar may cause headaches, and that the first two or three days are usually the hardest (${L("cruSched")}).` },
    { t: "An honest word", d: `Physical results are not the main reason Christians fast. A 2024 Johns Hopkins trial found that time-restricted eating produced about the same weight loss as a usual eating pattern when calories were kept equal (${L("hopTRE")}). The NIH also notes that more research is needed on long-term fasting (${L("nia")}).` }
  ];
  C.notFasting = [
    { t: "Not a hunger strike against God", d: "Fasting does not force God to act. Israel complained, “Wherefore have we fasted… and thou seest not?” God answered by pointing to their conduct.", refs: ["Isaiah 58:3-5"] },
    { t: "Not a performance", d: "Jesus warns against a sad face and a disfigured appearance meant to show people we are fasting.", refs: ["Matthew 6:16-18"] },
    { t: "Not a way to earn righteousness", d: "The Pharisee boasted, “I fast twice in the week.” The humble tax collector went home justified instead.", refs: ["Luke 18:12", "Colossians 2:20-23"] },
    { t: "Not a cover for sin or strife", d: "God asks whether our fasting is truly unto Him. Fasting while quarrelling or oppressing others is not the fast He chooses.", refs: ["Zechariah 7:5", "Isaiah 58:3-5"] },
    { t: "Not just a diet", d: "Fasting may affect the body, but its aim is the Lord. Without prayer and a spiritual purpose, it is only going hungry.", refs: ["Matthew 4:1-4"] }
  ];

  /* ---------- TYPES OF FASTS ---------- */
  C.types = [
    { id: "normal", name: "Normal fast", tag: "Water only", level: ["intermediate", "advanced"], what: "No food of any kind. You drink water, and plenty of it. This is the fast Jesus kept in the wilderness: He “did eat nothing” and “afterward hungered” (Luke 4:2). Scripture mentions His hunger, not thirst.", allow: ["Water"], avoid: ["All food", "Juice, coffee, tea and sweetened drinks"], refs: ["Luke 4:2"], caution: `Cru advises consulting your physician before any fast lasting longer than three days (${L("cruBiblical")}). Water-only fasts lasting more than several days need complete rest and medical supervision (${L("cruTypes")}).` },
    { id: "liquid", name: "Liquid fast (full fast)", tag: "Water, juice, clear broth", level: ["beginner", "intermediate", "advanced"], what: `No solid food. Water, 100% fruit or vegetable juice, and clear broth are taken to keep up strength. Jentezen Franklin calls this a full fast (${L("jfTips")}), and Bill Bright recommended water and juice for extended fasts because it provides more energy while still denying the desire for solid food (${L("cruTypes")}).`, allow: ["Water", "100% fruit or vegetable juice (diluted if acidic)", "Clear vegetable broth", "Caffeine-free herbal tea"], avoid: ["Solid food", "Coffee and caffeinated tea", "Soft drinks and energy drinks"], refs: [], caution: "Consult your doctor first if you take medication or have a health condition, and for any fast longer than three days." },
    { id: "absolute", name: "Absolute fast", tag: "No food, no water", level: ["advanced"], what: "Nothing at all is taken, solid or liquid. Esther called a three-day absolute fast, and Saul neither ate nor drank for three days after meeting Christ.", allow: ["Nothing"], avoid: ["All food", "All drink, including water"], refs: ["Esther 4:16", "Acts 9:9"], caution: `Never go beyond three days. If you are new to fasting, Cru says never to undertake an absolute fast without first consulting both a spiritual mentor and a medical professional (${L("cruTypes")}).` },
    { id: "supernatural", name: "Supernatural absolute fast", tag: "Forty days, no food or water", level: [], what: "Moses and Elijah were sustained by God for forty days. Moses “did neither eat bread, nor drink water.” This was a miracle of God's sustaining power.", allow: [], avoid: [], refs: ["Exodus 34:28", "Deuteronomy 9:9", "1 Kings 19:8"], caution: "This is recorded so we may see God's power, not so we may attempt it. Do not try to go without water beyond three days." },
    { id: "daniel", name: "Daniel fast (partial fast)", tag: "Vegetables, fruit, grains, water", level: ["beginner", "intermediate", "advanced"], what: `A partial fast based on Daniel, who ate pulse and water (Daniel 1:12) and later ate “no pleasant bread, neither came flesh nor wine” in his mouth for three full weeks (Daniel 10:2-3). Today it usually means no meat, no sweets and no bread, with fruits, vegetables and water (${L("jfTips")}). Commonly kept for 10 or 21 days.`, allow: ["All fruits and vegetables", "Whole grains such as brown rice, oats and quinoa", "Beans, lentils and other legumes", "Nuts and seeds", "Water"], avoid: ["Meat, poultry and fish", "Sweets and sugar", "Bread and baked goods", "Wine and alcohol", "Coffee, soft drinks and energy drinks", "Fried and heavily processed foods"], refs: ["Daniel 1:12", "Daniel 1:15", "Daniel 10:2-3"], caution: "Check with your doctor first if you have a medical condition, are pregnant, or take medication." },
    { id: "timed", name: "Set-hours fast", tag: "e.g. 6 a.m. to 12, 3 or 6 p.m.", level: ["beginner", "intermediate"], what: `No food from a set hour in the morning until a set hour later in the day, often 6 a.m. to noon, 6 a.m. to 3 p.m., or sunrise to sunset (${L("jfTips")}). Israel at Bethel “fasted that day until even.” Jentezen Franklin notes that hours spent sleeping do not count toward the fast (${L("jfTypes")}).`, allow: ["Water during fasting hours", "A simple, modest meal when the fast ends for the day"], avoid: ["Food during the fasting hours", "Feasting when the hours end"], refs: ["Judges 20:26"], caution: "A good first fast for most healthy adults. Consult your doctor if you take medication that must be taken with food." },
    { id: "corporate", name: "Corporate fast", tag: "A church or family together", level: ["beginner", "intermediate", "advanced"], what: "A fast proclaimed for a whole body of believers, for one purpose, at the same time. Each person chooses a type of fast that is safe for them, and the group prays together.", allow: ["Whatever type of fast each person can safely keep"], avoid: ["Pressuring others beyond what they can safely do"], refs: ["Joel 2:15-16", "2 Chronicles 20:3-4", "Jonah 3:5-10", "Acts 13:2-3"], caution: "Leaders should give people options, including partial fasts for those with health limitations." },
    { id: "private", name: "Private fast", tag: "Between you and the Father", level: ["beginner", "intermediate", "advanced"], what: "A personal fast for a personal purpose, kept quietly. Jesus says to wash your face and anoint your head so that you do not appear to people to fast.", allow: [], avoid: ["Announcing or posting about your fast", "Complaining about hunger"], refs: ["Matthew 6:16-18"], caution: "Tell those who need to know: your spouse or household, someone who holds you accountable, and your doctor if needed." },
    { id: "regular", name: "Regular fast", tag: "A weekly or monthly rhythm", level: ["beginner", "intermediate", "advanced"], what: `A planned rhythm such as one meal a day, one day a week, or one week a month, as Cru suggests for building up gradually (${L("cruTypes")}). The early church fasted on Wednesdays and Fridays (${L("ligDidache")}).`, allow: ["Depends on the type of fast chosen for that day"], avoid: ["Letting the rhythm become a ritual without prayer"], refs: ["Luke 2:37", "2 Corinthians 11:27"], caution: "Keep the purpose fresh. A regular fast is for seeking God, not ticking a box." },
    { id: "marital", name: "Marital abstinence by consent", tag: "Married couples only", level: ["beginner", "intermediate", "advanced"], what: "A husband and wife may agree to set aside intimacy for a limited time to give themselves to fasting and prayer, and then come together again.", allow: [], avoid: ["One spouse deciding alone", "An open-ended period with no end date"], refs: ["1 Corinthians 7:5", "Exodus 19:15", "Joel 2:15-16"], caution: "Both must agree, it must be for a set time, and it must be for prayer. See the Questions section for more." },
    { id: "abstain", name: "Setting aside other things", tag: "Media, entertainment, habits", level: ["beginner", "intermediate", "advanced"], what: `In the Bible, fasting refers to food. Setting aside things like social media, TV or video games is better described as abstaining from something that competes for your heart (${L("csl")}). It is a valuable discipline alongside a food fast. If your health prevents fasting from food, Jentezen Franklin suggests fasting something else and concentrating on prayer and Bible study (${L("jfTips")}).`, allow: [], avoid: ["Whatever you have chosen to set aside: TikTok, scrolling, TV, movies, games, shopping"], refs: ["1 Corinthians 6:12", "Psalm 119:37"], caution: "Replace the time with prayer and the Word, or the empty space will simply fill with something else." }
  ];

  /* ---------- STAGES ---------- */
  C.stages = {
    beginner: {
      name: "Beginner", sub: "First steps", color: "green",
      who: "You have never fasted, or only a few times. The goal at this stage is to learn to turn hunger into prayer and to build a habit of meeting with God.",
      fasts: ["Skip one meal and spend that time in prayer and the Word", "A set-hours fast: no food from 6 a.m. to 12 noon, then 6 a.m. to 3 p.m.", "One day from sunrise to sunset with water", "A Daniel fast for 3 to 7 days", "Give up one item (coffee, sweets or soft drinks) plus one distraction such as TikTok"],
      length: "1 to 3 days, or a 7-day partial fast",
      schedule: [["Morning", "15 to 20 minutes: praise, read the day's Scripture, pray your purpose."], ["Mealtime", "Use the time you would eat for prayer. Drink water."], ["Evening", "Thank God, write one thing He showed you, pray for your family."]],
      expect: "Hunger pangs, some irritability, and possibly a headache if you normally drink coffee. This is normal. Drink water and rest.",
      breaking: "End with a small glass of juice or a piece of fruit, then a light meal. Do not feast.",
      refs: ["Matthew 6:16-18", "Joel 2:12-13", "Psalm 63:1"],
      plan: [
        ["Purpose", "Why am I fasting? Write it down.", "Matthew 6:16-18"],
        ["Repentance", "Let the Holy Spirit search your heart.", "Joel 2:12-13"],
        ["Hunger for God", "Turn every hunger pang into prayer.", "Matthew 4:1-4"],
        ["Forgiveness", "Release anyone who has hurt you.", "Mark 11:25"],
        ["Direction", "Ask God for a right way for you and your family.", "Ezra 8:21-23"],
        ["Compassion", "Do one practical act of kindness today.", "Isaiah 58:6-7"],
        ["Thanksgiving", "Thank God for what He has done this week.", "Psalm 100:4"]
      ]
    },
    intermediate: {
      name: "Intermediate", sub: "Building strength", color: "teal",
      who: "You have completed several short fasts and want to go deeper and longer, with more structure in prayer and study.",
      fasts: ["A 21-day Daniel fast", "A 24-hour fast (evening meal to evening meal)", "A 1 to 3 day liquid or water fast", "A weekly fast day, such as Wednesday or Friday", "A family or church corporate fast"],
      length: "1 to 3 day full fasts, or 10 to 21 day partial fasts",
      schedule: [["Morning", "Praise and worship, Bible reading, and prayer for God's will and your purpose."], ["Noon", "Return to prayer and the Word. Take a short prayer walk."], ["Evening", "Unhurried time seeking God's face. Pray with others who are fasting. Avoid television and distractions."]],
      expect: "The first two or three days are usually the hardest. You may feel weak, tired or irritable. Many then experience a sense of well-being physically and spiritually.",
      breaking: "Break with juice or fruit, then small portions of soup, yogurt, cooked vegetables, and fruit over a day or two. Chew well and stop at the first sign of fullness.",
      refs: ["Daniel 10:2-3", "Daniel 10:12", "Acts 13:2-3"],
      sourceNote: "Schedule adapted from Cru's sample fasting schedule."
    },
    advanced: {
      name: "Advanced", sub: "Seasons of consecration", color: "ember",
      who: "You are mature in prayer, experienced in fasting, medically cleared, and walking under pastoral oversight. God has placed a specific burden on you.",
      fasts: ["A 3-day absolute fast, only if clearly led, healthy, and never longer than three days", "A 7 to 21 day liquid fast", "A 40-day fast combining liquid days and Daniel-fast days, only under medical supervision", "Extended seasons of intercession for family, church and nation"],
      length: "3 to 40 days, with medical advice for anything over 3 days",
      schedule: [["Before dawn", "Extended worship and intercession. Pray through a long passage such as Isaiah 58 or Daniel 9."], ["Daytime", "Rest as much as possible. Moderate walking only. Drink plenty of liquids."], ["Evening", "Corporate prayer if fasting with others. Journal what God is saying. Pray for leaders and nations."]],
      expect: "Weakness and dizziness are possible. Limit physical activity. Watch carefully for warning signs and stop if you become unwell.",
      breaking: "Take several days. Continue with juices for a day or more, then broth and soft foods, then small meals. After many days with little or no food, the body is at risk of refeeding problems, so plan how to break the fast with your doctor.",
      refs: ["Esther 4:16", "Daniel 9:3", "Isaiah 58:8-9"],
      sourceNote: "Safety guidance from Cru and the BMJ review on refeeding syndrome."
    }
  };

  C.safety = {
    who: [
      "Pregnant or breastfeeding women",
      "People with type 1 diabetes, or anyone taking insulin or other blood-sugar-lowering medication",
      "Anyone with a current or past eating disorder",
      "Young children",
      "Frail older adults",
      "People with anemia, heart, kidney or liver disease, or another chronic illness",
      "Anyone taking prescription medication"
    ],
    whoSrc: `Based on ${L("hopDiab")} and ${L("cruBiblical")}.`,
    stop: [
      "Fainting, or feeling you are about to faint",
      "Chest pain or a racing, irregular heartbeat",
      "Confusion or severe dizziness",
      "Vomiting or being unable to keep water down",
      "Any symptom that worries you"
    ],
    rules: [
      "Never stop prescribed medication without your doctor.",
      "Never go without water for more than three days.",
      "See your doctor before any fast longer than three days.",
      "Build up slowly. Start small and grow."
    ]
  };

  /* ---------- QUESTIONS & ANSWERS ---------- */
  C.faq = [
    { cat: "Food & drink", q: "Muslims eat a big meal before they fast. Should I eat heavily before I fast?",
      a: `<p>During Ramadan, Muslims eat <strong>suhoor</strong>, a meal before dawn, and then fast from dawn to sunset. Even Muslim organisations recommend that it be balanced and nutritious, with slow-release foods and water, rather than a feast (${L("islamicRelief")}). Jewish families also eat a pre-fast meal before Yom Kippur, made of easily digested foods (${L("chabad")}).</p>
      <p><strong>What does the Bible say?</strong> Scripture does not command a meal before a fast, and it does not forbid one. Eating a normal, sensible meal before you begin is fine.</p>
      <p>What Scripture warns against is overindulging. Jesus warns against hearts “overcharged with surfeiting” (overeating), and Proverbs warns against being among “riotous eaters of flesh.” Loading up so that you will not feel hungry misses the point. Biblical fasting is “afflicting the soul” and humbling yourself. The hunger is part of what reminds you to pray.</p>
      <p><strong>Practical help:</strong> Cru advises eating smaller meals before a fast, avoiding high-fat and sugary foods, and eating raw fruits and vegetables for two days beforehand (${L("cruSteps")}).</p>
      <p>Remember also that Christian fasting is different in purpose. We do not fast to earn merit or acceptance. We fast as people already accepted through Jesus Christ, seeking more of Him.</p>`,
      refs: ["Luke 21:34", "Proverbs 23:20-21", "Leviticus 16:29-31", "Psalm 35:13"] },

    { cat: "Food & drink", q: "Can I drink coffee during a fast?",
      a: `<p>It depends on the fast you have chosen.</p>
      <ul><li><strong>Water fast or Daniel fast:</strong> no coffee. Cru notes that water is best, and that coffee and tea stimulate the nervous system (${L("cruBiblical")}).</li>
      <li><strong>Liquid fast:</strong> choose water, juice, broth, and caffeine-free herbal tea instead.</li>
      <li><strong>“Give up one item” fast:</strong> coffee is often exactly what people give up (${L("jfTips")}).</li></ul>
      <p><strong>Expect withdrawal.</strong> Johns Hopkins researchers found that stopping caffeine can cause headache, fatigue and difficulty concentrating, usually starting 12 to 24 hours after the last cup, peaking within one to two days and lasting two to nine days, even for people who drink only about one cup a day (${L("caff")}). The same researchers recommend cutting down gradually.</p>
      <p><strong>So taper first.</strong> Reduce your coffee over the week before your fast.</p>
      <p>If you find you cannot go one morning without it, that itself is worth bringing to God. Paul said he would not be brought under the power of anything, even lawful things.</p>`,
      refs: ["1 Corinthians 6:12"] },

    { cat: "Marriage", q: "We are married. Should we stop having sex while we fast?",
      a: `<p>Scripture allows a married couple to abstain for a time of fasting and prayer, but only under the conditions in 1 Corinthians 7:5:</p>
      <ol><li><strong>“With consent”</strong>: both husband and wife agree. One spouse may not impose it on the other. Paul calls withholding without agreement “defrauding.”</li>
      <li><strong>“For a time”</strong>: agree on a start and an end.</li>
      <li><strong>“That ye may give yourselves to fasting and prayer”</strong>: the purpose is to seek God.</li>
      <li><strong>“Come together again”</strong>: when the time ends, resume your normal married life so that Satan does not tempt you.</li></ol>
      <p>GotQuestions summarises it well: abstinence must be by mutual consent, for a spiritual purpose, and only for a determined amount of time (${L("gq")}). There is Old Testament precedent too: before God came down on Sinai, the people were told “come not at your wives,” and Joel called even the bridegroom and bride out of their chamber for the solemn assembly.</p>
      <p><strong>Practical:</strong> pray and talk together before the fast and agree on the days. If one of you is not ready, the other can still fast from food and keep the marriage bed. Honouring your spouse also honours God.</p>`,
      refs: ["1 Corinthians 7:5", "Exodus 19:15", "Joel 2:15-16"] },

    { cat: "Phone & media", q: "Should I stop taking phone calls while fasting?",
      a: `<p>There is no rule in Scripture against phone calls. Fasting does not mean cutting off your family, your job, or people who need you. Jesus taught that we should look normal while fasting, so ordinary life carries on.</p>
      <p>But a fast is a good time to guard your mouth and your time:</p>
      <ul><li>Put your phone on do-not-disturb during your set prayer times, and return calls afterwards.</li>
      <li>Avoid long idle conversations, gossip and arguments. Isaiah 58 rebukes those who “fast for strife and debate.”</li>
      <li>Do not use calls to complain about being hungry.</li>
      <li>Use calls to encourage someone, or to pray with a fasting partner.</li></ul>`,
      refs: ["Matthew 6:16-18", "Proverbs 10:19", "James 1:19", "Psalm 141:3", "Isaiah 58:3-5"] },

    { cat: "Phone & media", q: "Can I give up TikTok or scrolling instead of food? Does that count as fasting?",
      a: `<p>An honest answer: in the Bible, the words for fasting mean going without food. Setting aside social media is better described as abstaining from something that competes for your heart (${L("csl")}).</p>
      <p>That does not make it less valuable. Paul said, “I will not be brought under the power of any.” If scrolling has a hold on you, laying it down is a real act of obedience.</p>
      <p><strong>The best approach is both:</strong> fast from food and fast from scrolling, and give the time to prayer and the Word.</p>
      <p>If your health does not allow you to fast from food, Jentezen Franklin suggests fasting something else and concentrating on prayer and Bible study (${L("jfTips")}). God sees the heart.</p>
      <p><strong>Practical:</strong> delete the app for the length of your fast, or set a strict screen-time limit. Do not post about your fast.</p>`,
      refs: ["1 Corinthians 6:12", "Psalm 119:37", "Matthew 6:16-18"] },

    { cat: "Phone & media", q: "Should I watch movies or TV while I am fasting?",
      a: `<p>Cru's fasting schedule advises avoiding television or any other distraction that may dampen your spiritual focus (${L("cruSched")}). The time freed up by not eating is meant to be given to God.</p>
      <p>Scripture does not set a rule about screens, but it gives clear principles: set no wicked thing before your eyes, think on things that are true, honest, just, pure and lovely, and redeem the time.</p>
      <p>If you need something to watch or listen to, choose worship, Bible teaching, sermons and testimonies. Jentezen Franklin encourages spending time listening to praise and worship during a fast (${L("jfTips")}).</p>`,
      refs: ["Psalm 101:3", "Philippians 4:8", "Ephesians 5:15-16", "Colossians 3:2"] },

    { cat: "Phone & media", q: "Can I listen to music during a fast?",
      a: `<p>Yes, worship music is a great help during a fast. For other music, ask a simple question: does this draw my heart to God, or away from Him? Many people set aside secular music for the length of the fast to keep their focus.</p>`,
      refs: ["Colossians 3:2", "Philippians 4:8"] },

    { cat: "Daily life", q: "Can I go to work, school or the gym while fasting?",
      a: `<p>Yes, you can work and study. Jesus' instruction to wash your face and look normal assumes ordinary life continues.</p>
      <p>Cru advises limiting physical activity, exercising only moderately (walking one to three miles if comfortable), and resting as much as your schedule allows (${L("cruSched")}). Avoid heavy exercise on a water or absolute fast. When choosing set fasting hours, think about your work and sleep schedule (${L("jfTips")}).</p>`,
      refs: ["Matthew 6:16-18"] },

    { cat: "Daily life", q: "Should I tell people that I am fasting?",
      a: `<p>Jesus taught us not to advertise our fasting. Do not post about it or make a show of it.</p>
      <p>But some people do need to know: your spouse and household, a pastor or trusted person who can pray with you and hold you accountable, and your doctor if you have health concerns. Cru recommends writing down your commitments and sharing them with someone you trust (${L("cruSteps")}). In a corporate fast, of course, everyone knows, because the fast is proclaimed to all.</p>`,
      refs: ["Matthew 6:16-18", "Joel 2:15-16"] },

    { cat: "Daily life", q: "Can I brush my teeth, shower and dress normally?",
      a: `<p>Yes. Jesus said, “anoint thine head, and wash thy face.” Take care of yourself as normal so that your fast stays between you and your Father.</p>`,
      refs: ["Matthew 6:16-18"] },

    { cat: "Daily life", q: "What should I do with the time I would normally spend eating?",
      a: `<p>Give it to God. Pray, read the Bible, worship, and listen. Cru suggests a simple rhythm: begin the day in praise and the Word, return to prayer at noon, and spend an unhurried time seeking God's face in the evening (${L("cruSched")}).</p>
      <p>Isaiah 58 also points outward: share your bread with the hungry. Consider giving the money you save on meals to feed someone in need.</p>`,
      refs: ["Isaiah 58:6-7", "Mark 1:35", "Psalm 55:17"] },

    { cat: "Health", q: "I take medication. Can I fast?",
      a: `<p>Never stop prescribed medication without your doctor. Cru says medication should be withdrawn only under a physician's supervision (${L("cruSteps")}).</p>
      <p>This matters most for diabetes: people taking insulin or sulfonylureas are at immediate risk of low blood sugar when fasting (${L("hopDiab")}). Talk to your doctor and choose a fast together, such as a Daniel fast or setting aside a habit, with extra time in prayer.</p>
      <p>Seeking wise counsel is biblical, not a lack of faith.</p>`,
      refs: ["Proverbs 11:14", "1 Corinthians 6:19-20"] },

    { cat: "Health", q: "Who should not fast from food?",
      a: `<p>Johns Hopkins diabetes educators list women who are pregnant or breastfeeding, frail older adults, young children, people with eating disorders, and people with type 1 diabetes among those who should not follow fasting regimens (${L("hopDiab")}). Cru adds that anyone with pregnancy, anemia or other chronic health problems should never fast without consulting a physician (${L("cruBiblical")}).</p>
      <p>If that is you, you can still seek God with your whole heart: set aside a habit or form of entertainment, give extra time to prayer and Scripture, and practise the outward fast of Isaiah 58 by caring for others. The LORD looks on the heart.</p>`,
      refs: ["1 Samuel 16:7", "Isaiah 58:6-7", "1 Corinthians 6:19-20"] },

    { cat: "Health", q: "Can children fast?",
      a: `<p>Young children should not do food fasts (${L("hopDiab")}). They can take part in age-appropriate ways: giving up sweets, video games or cartoons for a day, and praying with the family at mealtimes. Joel called the children to the solemn assembly too.</p>
      <p>Teenagers, with a parent's permission, may skip one meal or keep a set-hours fast. Keep it joyful and focused on God, never frightening.</p>`,
      refs: ["Joel 2:15-16"] },

    { cat: "Health", q: "How do I handle hunger and headaches?",
      a: `<p>Cru notes that the first two or three days are usually the hardest. Expect passing hunger pangs or dizziness, and headaches from caffeine and sugar withdrawal. If you feel hunger pangs, increase your liquids (${L("cruSched")}). Sleep early and rest (${L("cruBiblical")}).</p>
      <p>Turn each hunger pang into a prayer. Jesus answered hunger with the Word: “Man shall not live by bread alone.” Consult your doctor if you are unsure about any headache or bodily reaction.</p>`,
      refs: ["Matthew 4:1-4", "Deuteronomy 8:3", "Isaiah 40:31"] },

    { cat: "Health", q: "Can I drink water on a fast?",
      a: `<p>Yes, on every type of fast except an absolute fast, and you should drink plenty. Cru strongly advises drinking plenty of liquids (${L("cruTypes")}).</p>
      <p>An absolute fast (no water) appears in Scripture for three days, as with Esther and Saul. Never go beyond three days without water, and do not attempt it as a beginner.</p>`,
      refs: ["Esther 4:16", "Acts 9:9"] },

    { cat: "Before & after", q: "How long should I fast?",
      a: `<p>Start slowly: one meal a day, one day a week, or one week a month, then build up (${L("cruTypes")}). Jentezen Franklin notes that most people can fast one to three days, and some feel grace to go 21 to 40 days, but beginners should start slow (${L("jfTips")}).</p>
      <p>As Bill Bright wrote, fasting is about the condition of the heart, not the number of days (${L("cruTypes")}).</p>`,
      refs: ["Matthew 6:16-18"] },

    { cat: "Before & after", q: "How do I break my fast?",
      a: `<p>Gently. For a fast of a day or two, Cru suggests starting with a small glass of fruit juice, then small amounts of easily digested foods such as yogurt, soup, fresh fruit and cooked vegetables. For longer fasts, continue with juices for a day or more before adding more substantial food. Chew well and stop at the first sense of fullness (${L("cruBiblical")}).</p>
      <p><strong>After long fasts, be careful.</strong> A BMJ review notes that anyone who has had little or no food for more than five days is at risk of refeeding problems, which are dangerous shifts in body salts when food is restarted (${L("bmj")}). Plan the end of any long fast with your doctor.</p>
      <p>And end with thanksgiving. Keep the new habits of prayer, and keep obeying what God showed you.</p>`,
      refs: ["Psalm 100:4", "Galatians 6:9"] },

    { cat: "Before & after", q: "I broke my fast early, or ate without thinking. Have I failed?",
      a: `<p>No. God's mercies are new every morning. Confess it if needed, receive His forgiveness, and continue from where you are.</p>
      <p>Two lessons: be careful what you vow, because Scripture says it is better not to vow than to vow and not pay; and start with a fast you can complete. Jentezen Franklin puts it simply: it is better to do what you can and not break it than to aim too high and break the whole fast (${L("jfPost")}).</p>`,
      refs: ["Lamentations 3:22-23", "1 John 1:9", "Ecclesiastes 5:4-5", "Hebrews 4:16"] },

    { cat: "Understanding", q: "Will fasting make God do what I want?",
      a: `<p>No. Fasting humbles us before God; it does not twist His arm. In Isaiah 58 the people asked why God did not respond to their fasting, and He pointed to their behaviour. David fasted for his child, and when the child died he rose, washed, and worshipped.</p>
      <p>God does reward those who diligently seek Him, but He answers in His wisdom: yes, no, or wait. Desiring God reminds us that the greatest reward of fasting is God Himself (${L("dgPurpose")}).</p>`,
      refs: ["Isaiah 58:3-5", "2 Samuel 12:20", "Hebrews 11:6"] },

    { cat: "Understanding", q: "Is the Daniel fast a real fast?",
      a: `<p>Yes. It is a partial fast drawn from Daniel 10:2-3, where Daniel ate no pleasant bread, meat or wine for three weeks. Bill Bright describes it as a partial fast in Scripture (${L("cruTypes")}). Today it usually means fruits, vegetables, grains, legumes and water, without meat, sweets or bread (${L("jfTips")}).</p>`,
      refs: ["Daniel 10:2-3", "Daniel 1:12"] },

    { cat: "Understanding", q: "Does fasting help in deliverance and spiritual warfare?",
      a: `<p>Jesus linked prayer and fasting with casting out a spirit His disciples could not move, and Isaiah 58 describes the fast God chooses as loosing the bands of wickedness and breaking every yoke.</p>
      <p>Notice that Jesus first named the root as unbelief. Fasting has no power of its own. All authority is in the name of Jesus Christ and His finished work. Fasting humbles us, strengthens faith, and sharpens prayer, so that we stand in the victory Christ has already won.</p>`,
      refs: ["Matthew 17:19-21", "Mark 9:29", "Isaiah 58:6-7", "Revelation 12:11"] },

    { cat: "Understanding", q: "Is Christian fasting the same as Ramadan or Lent?",
      a: `<p>No. Ramadan is a month of dawn-to-sunset fasting required in Islam. Lent is a season observed in many church traditions. Neither is commanded in the New Testament.</p>
      <p>Christian fasting, as Jesus taught it, is voluntary, done in secret before the Father, and rooted in a relationship with God through Christ, not in earning favour. Believers are free to fast in seasons, and many churches set times of corporate fasting, but no one should judge another over days.</p>`,
      refs: ["Matthew 6:16-18", "Romans 14:5-6", "Colossians 2:20-23"] }
  ];

  /* ---------- PRAYER FLOW ---------- */
  C.prayerFlow = [
    { n: 1, t: "Praise and worship", p: "Lord, You are holy and worthy of all praise. I come into Your gates with thanksgiving and into Your courts with praise.", refs: ["Psalm 100:4"] },
    { n: 2, t: "Thanksgiving", p: "Father, thank You for Your mercy, Your provision, and the gift of salvation through Jesus Christ. Thank You for this time set apart to seek You.", refs: ["Lamentations 3:22-23"] },
    { n: 3, t: "Confession of sins", p: "Lord, search my heart. I confess my sins to You and turn from them. Thank You that You are faithful and just to forgive me and cleanse me.", refs: ["1 John 1:9", "Joel 2:12-13"] },
    { n: 4, t: "Forgive others", p: "Father, I choose to forgive those who have hurt me. I release them to You. Lead me away from bitterness, strife and revenge.", refs: ["Mark 11:25", "Matthew 6:14-15"] },
    { n: 5, t: "Invite the Holy Spirit", p: "Holy Spirit, I welcome You. Help me to pray as I ought, guide me into all truth, and help me to hear and obey.", refs: ["Romans 8:26", "John 16:13"] },
    { n: 6, t: "The Word", p: "Read the Scripture for today slowly, out loud if you can. Ask: what is God saying to me here? Write it down.", refs: ["Matthew 4:4"] },
    { n: 7, t: "Prayer points and declarations", p: "Pray through your purpose for this fast and the prayer points below. Then speak the declarations aloud.", refs: ["Isaiah 58:6-7", "Jeremiah 29:13"] },
    { n: 8, t: "Sealing", p: "Lord Jesus, I cover this time of prayer, my family, and everything I have prayed for with Your precious blood. I overcome by the blood of the Lamb and the word of my testimony. In Jesus' name, amen.", refs: ["Revelation 12:11"] }
  ];

  C.prayerPoints = [
    { t: "Consecration", items: ["Lord, I present my body as a living sacrifice. Set me apart for You.", "Renew my mind so that I may prove Your good, acceptable and perfect will."], refs: ["Romans 12:1-2"] },
    { t: "Repentance", items: ["Lord, turn me back to You with all my heart.", "Show me any sin I have excused, and give me grace to turn from it."], refs: ["Joel 2:12-13", "1 John 1:9"] },
    { t: "Direction", items: ["Father, show me a right way for me, for my little ones, and for all my substance.", "Holy Spirit, speak clearly as I minister to You."], refs: ["Ezra 8:21-23", "Acts 13:2-3"] },
    { t: "Freedom and deliverance", items: ["In the name of Jesus, let every band of wickedness be loosed and every heavy burden be undone.", "Let the oppressed in my family go free, and let every yoke be broken."], refs: ["Isaiah 58:6-7", "Mark 9:29"] },
    { t: "Healing and restoration", items: ["Lord, let my light break forth as the morning and my health spring forth speedily.", "Build again the old waste places in my life and family."], refs: ["Isaiah 58:8-9", "Isaiah 58:10-12"] },
    { t: "Family", items: ["Lord, I bring my household before You. Save, heal and keep each one.", "Let our home be a place of prayer."], refs: ["Joel 2:15-16"] },
    { t: "Leaders and ministry", items: ["Lord, strengthen Pastor Kiky Ocansey and Prophet Prince Amo David. Guide L137 Deliverance Ministry and Dominion Hour.", "Bring freedom to the oppressed, comfort to the afflicted, and lead many to salvation in Jesus Christ."], refs: ["Acts 13:2-3", "Ephesians 6:18"] },
    { t: "Nations", items: ["Lord, as Your people humble themselves and pray, hear from heaven, forgive, and heal the land."], refs: ["2 Chronicles 7:14"] },
    { t: "Ending the fast", items: ["Father, thank You for meeting with me. Help me continue in prayer, compassion and obedience after this fast."], refs: ["Galatians 6:9", "Matthew 6:10"] }
  ];

  C.declarations = [
    { d: "Man shall not live by bread alone, but by every word that proceedeth out of the mouth of God. I live by the Word of God.", r: "Matthew 4:4" },
    { d: "I loose the bands of wickedness. I undo the heavy burdens. I declare that the oppressed go free and every yoke is broken, in the name of Jesus.", r: "Isaiah 58:6-7" },
    { d: "My light shall break forth as the morning, and my health shall spring forth speedily. My righteousness goes before me, and the glory of the LORD is my rereward.", r: "Isaiah 58:8-9" },
    { d: "When I call, the LORD shall answer. When I cry, He shall say, Here I am.", r: "Isaiah 58:8-9" },
    { d: "The LORD shall guide me continually and satisfy my soul in drought. I shall be like a watered garden, like a spring of water whose waters fail not.", r: "Isaiah 58:10-12" },
    { d: "I wait upon the LORD. I renew my strength. I mount up with wings as eagles. I run and am not weary; I walk and do not faint.", r: "Isaiah 40:31" },
    { d: "My Father, which seeth in secret, shall reward me openly.", r: "Matthew 6:16-18" },
    { d: "I keep under my body and bring it into subjection. My appetite does not rule me; the Spirit of God leads me.", r: "1 Corinthians 9:27" },
    { d: "I overcome by the blood of the Lamb and by the word of my testimony.", r: "Revelation 12:11" },
    { d: "For with God nothing shall be impossible.", r: "Luke 1:37" }
  ];

  /* ---------- DAILY SCRIPTURE ROTATION (for plans) ---------- */
  C.dailyRotation = [
    ["Purpose", "Matthew 6:16-18"], ["Return to God", "Joel 2:12-13"], ["Bread alone", "Matthew 4:1-4"],
    ["The fast God chooses", "Isaiah 58:6-7"], ["Light and health", "Isaiah 58:8-9"], ["A right way", "Ezra 8:21-23"],
    ["Courage", "Esther 4:16"], ["Heard from day one", "Daniel 10:12"], ["Humility", "Psalm 35:13"],
    ["Thirst for God", "Psalm 63:1"], ["Forgiveness", "Mark 11:25"], ["The Spirit speaks", "Acts 13:2-3"],
    ["Repentance", "Jonah 3:5-10"], ["Watered garden", "Isaiah 58:10-12"], ["Discipline", "1 Corinthians 9:27"],
    ["Seek Me", "Jeremiah 29:13"], ["New strength", "Isaiah 40:31"], ["Living sacrifice", "Romans 12:1-2"],
    ["Draw nigh", "James 4:8"], ["Persevere", "Galatians 6:9"], ["Nothing impossible", "Luke 1:37"]
  ];

  /* ---------- QUIZ ---------- */
  C.quiz = [
    { type: "mc", q: "Who asked her people to fast three days, neither eating nor drinking, before she went in to the king?", o: ["Ruth", "Esther", "Anna", "Deborah"], a: 1, e: "Esther 4:16. Esther called an absolute fast before risking her life to plead for her people.", ref: "Esther 4:16" },
    { type: "tf", q: "In the Bible, the Hebrew and Greek words for fasting both mean going without food.", a: true, e: "True. Tsom (Hebrew) and nesteuo (Greek) both mean to abstain from food. Setting aside other things is a good discipline, but biblical fasting refers to food." },
    { type: "mc", q: "During his three-week fast, what did Daniel go without?", o: ["Water and bread", "Pleasant bread, flesh and wine", "All food and water", "Only meat"], a: 1, e: "Daniel 10:3: “I ate no pleasant bread, neither came flesh nor wine in my mouth.”", ref: "Daniel 10:2-3" },
    { type: "fill", q: "Complete Isaiah 58:6: “Is not this the fast that I have ______?”", a: ["chosen"], e: "“Is not this the fast that I have chosen? to loose the bands of wickedness, to undo the heavy burdens, and to let the oppressed go free, and that ye break every yoke?”", ref: "Isaiah 58:6-7" },
    { type: "mc", q: "According to Jesus, how should you look when you fast?", o: ["Sad, so people pray for you", "Anoint your head and wash your face", "Wear sackcloth in public", "Tell your friends so they can join"], a: 1, e: "Matthew 6:17-18. Jesus teaches us to look normal so that the fast is seen by the Father in secret.", ref: "Matthew 6:16-18" },
    { type: "scenario", q: "You want to abstain from intimacy during your fast, but your spouse is not in agreement. What does 1 Corinthians 7:5 teach?", o: ["Abstain anyway; God comes first", "Abstain only by mutual consent, for a set time, then come together again", "Married people cannot fast", "Stop the fast completely"], a: 1, e: "Paul says “except it be with consent for a time.” Abstaining without your spouse's agreement is called defrauding. You can still fast from food.", ref: "1 Corinthians 7:5" },
    { type: "tf", q: "If you have enough faith, an absolute fast with no water can safely last a week.", a: false, e: "False. Moses and Elijah's forty-day fasts were supernatural. Never go without water for more than three days." },
    { type: "order", q: "Put these steps for breaking a longer fast in the right order.", items: ["Small glass of diluted fruit juice", "Juices and clear broth for a day or more", "Small portions of soup, yogurt and soft fruit", "Cooked vegetables and small meals", "Return to normal meals gradually"], e: "Break a fast gently. Cru advises continuing with juices for a day or more, then introducing small amounts of easily digested foods." },
    { type: "scenario", q: "A friend with diabetes who takes insulin wants to begin a 3-day water fast tomorrow. What is the wise counsel?", o: ["Go ahead; God will protect you", "Stop insulin during the fast", "Speak to a doctor first and choose a safe fast together", "Fast only at night"], a: 2, e: "People on insulin are at immediate risk of low blood sugar when fasting. Never stop medication without a doctor. A Daniel fast or setting aside a habit, with extra prayer, may be a better choice." },
    { type: "mc", q: "The Didache, an early Christian teaching, told believers to fast on which days?", o: ["Monday and Thursday", "Wednesday and Friday", "Saturday and Sunday", "Every day of the week"], a: 1, e: "Wednesday and Friday. The early church kept a weekly rhythm of fasting." },
    { type: "scenario", q: "On day two of your fast you have a pounding headache. You normally drink three cups of coffee a day. What is most likely happening?", o: ["A spiritual attack only", "Caffeine withdrawal", "You must break the fast immediately", "Fasting is not for you"], a: 1, e: "Caffeine withdrawal usually starts 12 to 24 hours after the last cup and peaks within one to two days. Drink water, rest, and next time taper down before you begin. See a doctor if you are concerned." },
    { type: "fill", q: "Complete Matthew 4:4: “Man shall not live by ______ alone.”", a: ["bread"], e: "“…but by every word that proceedeth out of the mouth of God.”", ref: "Matthew 4:1-4" }
  ];

  C.flashcards = [
    ["Matthew 6:17-18", "Matthew 6:16-18"], ["Isaiah 58:6", "Isaiah 58:6-7"], ["Joel 2:12-13", "Joel 2:12-13"],
    ["Matthew 4:4", "Matthew 4:4"], ["Ezra 8:21-23", "Ezra 8:21-23"], ["Psalm 35:13", "Psalm 35:13"],
    ["Acts 13:2-3", "Acts 13:2-3"], ["1 Corinthians 7:5", "1 Corinthians 7:5"], ["Isaiah 58:8", "Isaiah 58:8-9"], ["Luke 1:37", "Luke 1:37"]
  ];

  C.scriptureGroups = [
    ["Origins of fasting", ["Exodus 34:28", "Deuteronomy 9:9", "Leviticus 16:29-31", "Leviticus 23:27-28", "Judges 20:26", "1 Samuel 7:6", "2 Samuel 12:16", "1 Kings 19:8"]],
    ["Fasting in crisis and intercession", ["2 Chronicles 20:3-4", "Ezra 8:21-23", "Nehemiah 1:4", "Esther 4:16", "Daniel 9:3", "Jonah 3:5-10", "2 Chronicles 7:14"]],
    ["The fast God chooses", ["Isaiah 58:3-5", "Isaiah 58:6-7", "Isaiah 58:8-9", "Isaiah 58:10-12", "Zechariah 7:5", "Joel 2:12-13", "Joel 2:15-16"]],
    ["Jesus and fasting", ["Matthew 4:1-4", "Luke 4:1-2", "Luke 4:14", "Matthew 6:16-18", "Matthew 9:14-15", "Matthew 17:19-21", "Mark 9:29"]],
    ["The early church", ["Luke 2:37", "Acts 9:9", "Acts 13:2-3", "Acts 14:23", "2 Corinthians 11:27"]],
    ["Partial fasting", ["Daniel 1:12", "Daniel 1:15", "Daniel 10:2-3", "Daniel 10:12"]],
    ["Marriage and fasting", ["1 Corinthians 7:5", "Exodus 19:15"]],
    ["Guarding eyes, ears and mouth", ["Psalm 119:37", "Psalm 101:3", "Job 31:1", "Philippians 4:8", "Colossians 3:2", "Ephesians 5:15-16", "Psalm 141:3", "Proverbs 10:19", "James 1:19"]],
    ["Self-control and the body", ["1 Corinthians 6:12", "1 Corinthians 6:19-20", "1 Corinthians 9:27", "Luke 21:34", "Proverbs 23:20-21", "Galatians 5:22-23", "Matthew 26:41"]],
    ["Hunger for God", ["Psalm 63:1", "Deuteronomy 8:3", "John 4:32-34", "Jeremiah 29:13", "James 4:8", "Hebrews 11:6", "Isaiah 40:31"]],
    ["Grace when we stumble", ["Lamentations 3:22-23", "1 John 1:9", "Hebrews 4:16", "Ecclesiastes 5:4-5"]]
  ];

  C.reading = [
    { a: "John Piper", t: "A Hunger for God: Desiring God through Fasting and Prayer", d: "Fasting as an expression of longing for God, and how ordinary appetites can compete with that desire.", r: "What is drawing my attention away from God?", k: "piper" },
    { a: "Derek Prince", t: "Shaping History Through Prayer and Fasting", d: "Prayer and fasting in intercession for families, churches and nations, drawing on Scripture and history.", r: "How can my prayers reach beyond my own needs?", k: "prince" },
    { a: "Jentezen Franklin", t: "Fasting", d: "Fasting joined with prayer, the biblical types of fasts, and practical preparation, with an emphasis on relationship with God.", r: "How will I make room for prayer during this fast?", k: "jfPdf" },
    { a: "Bill Bright (Cru)", t: "7 Basic Steps to Successful Fasting and Prayer", d: "Setting an objective, preparing spiritually and physically, keeping a schedule, and ending a fast safely.", r: "What is my objective for this fast?", k: "cruSteps" }
  ];

  window.CONTENT = C;
})();
