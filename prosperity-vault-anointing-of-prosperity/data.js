/* Anointing of Prosperity — Interactive Companion (Prosperity Vault)
   Prophet Prince Amo David · Dominion Hour · Clubhouse · August 28, 2026
   All Scripture KJV. Content preserved from the original transcript. */

window.APP = {
  meta: {
    ministry: "Dominion Hour",
    minister: "Prophet Prince Amo David",
    title: "The Anointing of Prosperity",
    subtitle: "and the Power of Covenant",
    date: "August 28, 2026",
    platform: "Clubhouse",
    tagline: "Twelve Prosperity Keys. One Vault. One Anointed Life."
  },

  // 🔑 Twelve Prosperity Keys — the main unlockable path
  keys: [
    { id: "k1", num: 1, icon: "🌳", title: "There Is an Oil That Prospers",
      idea: "There is an anointing called the anointing of prosperity. When it settles on you, you become a tree planted by the rivers of water — fruitful in season, leaf never withering, and whatsoever you do prospers.",
      refs: ["Psalm 1:1-3", "3 John 2"],
      unlock: "I receive the anointing that prospers the work of my hands." },
    { id: "k2", num: 2, icon: "🙌", title: "The Gate Is Thanksgiving",
      idea: "You enter His gates with thanksgiving and His courts with praise. Don't keep your thanksgiving to yourself. He shares His glory with no man.",
      refs: ["Psalm 100:1-5", "Psalm 103:8-14"],
      unlock: "I lift my voice and bless the Lord — He is good, and His mercy endureth for ever." },
    { id: "k3", num: 3, icon: "🔥", title: "The Fire and the Comforter",
      idea: "Our God is a consuming fire. Then Jesus says, I will pray the Father, and He shall give you another Comforter — the Spirit of truth who dwells in you and shall be in you.",
      refs: ["Hebrews 12:29", "John 14:16-17", "Romans 8:14-15"],
      unlock: "Holy Ghost, take charge. Take pre-eminence over my life today." },
    { id: "k4", num: 4, icon: "📢", title: "Good News Prospers You",
      idea: "The Spirit of the Lord anoints to preach good news — good news that carries you from poverty to riches, sickness to healing, weakness to strength. The word doesn't just deliver you; it prospers you.",
      refs: ["Luke 4:18", "Isaiah 61:1-3"],
      unlock: "The gospel is prospering me — spirit, soul, body, home and work." },
    { id: "k5", num: 5, icon: "👑", title: "Oil On the Head Crowns Your Life",
      idea: "The head carries destiny. When the Lord anoints your head with oil, He is saying, I am crowning your life. Whatsoever you touch shall prosper.",
      refs: ["Psalm 23:5-6", "Deuteronomy 8:18"],
      unlock: "My head is anointed. My cup runneth over. My hands prosper." },
    { id: "k6", num: 6, icon: "🫙", title: "The Widow's Pot of Oil",
      idea: "The widow had nothing but a pot of oil. God does not need the rain to fill your valley — His power alone multiplies what is already in your hand.",
      refs: ["2 Kings 4:1-7", "2 Kings 3:16-17", "Ephesians 1:3"],
      unlock: "God is multiplying the little in my hand into overflow." },
    { id: "k7", num: 7, icon: "🦁", title: "The Young Lions Lack — But Not You",
      idea: "The young lions are strong, they have connections, they know how to hunt — yet they lack. But they that seek the Lord shall not want any good thing. Seek first the kingdom, and every other thing is added.",
      refs: ["Psalm 34:6-10", "Matthew 6:33", "Psalm 37:25"],
      unlock: "I seek Him first. I shall not want any good thing." },
    { id: "k8", num: 8, icon: "🧭", title: "You Have Dwelt Long Enough",
      idea: "The Lord said at Horeb, Ye have dwelt long enough in this mount. Turn, take your journey, and go in and possess the land. Any condition that refuses to change is changing by reason of the anointing.",
      refs: ["Deuteronomy 1:6-8", "Psalm 44:1-4"],
      unlock: "I am moving forward. Victory over poverty, delay, stagnation and setback." },
    { id: "k9", num: 9, icon: "🌾", title: "Isaac's Hundredfold — Covenant, Not Conditions",
      idea: "In a famine, Isaac sowed and received a hundredfold in the same year. Behind the sowing was covenant: the Lord was with him, and divine favour found him.",
      refs: ["Genesis 26:1-5", "Genesis 26:12-14", "Deuteronomy 8:18"],
      unlock: "Covenant is my backing. Favour is finding me — even in a dry season." },
    { id: "k10", num: 10, icon: "🧂", title: "Covenant of Salt: Preservation",
      idea: "David's kingdom was preserved by a covenant of salt — salt means preservation. It was covenant that brought Israel out of captivity; God remembered His covenant. Personal covenant gives personal favour.",
      refs: ["Psalm 50:5", "2 Chronicles 13:5", "Exodus 2:24", "2 Samuel 24:24-25"],
      unlock: "By covenant I am preserved — my family, my finances, my future." },
    { id: "k11", num: 11, icon: "🪟", title: "Rahab: One Covenant, One Household Saved",
      idea: "By virtue of covenant, a whole household was preserved when a city fell. You are crying because a gate is shut — but your enemies are already faint-hearted because of you.",
      refs: ["Joshua 2:8-14", "Joshua 6:25", "Psalm 18:17"],
      unlock: "My covenant covers my father's house, my mother's house, my children." },
    { id: "k12", num: 12, icon: "🛡️", title: "Guard the Oil and Possess",
      idea: "Do not hearken to the wrong voice — Adam and Eve lost their place that way. The anointing can be leaked and can be contaminated. Hold the oil, march forward, and possess your possession.",
      refs: ["Genesis 2:16-17", "Genesis 3:4-5", "Isaiah 45:1-3", "John 6:66-69"],
      unlock: "I hold the oil. I keep the covenant. I possess my possession." }
  ],

  // 📖 Scriptures — tap to reveal, KJV in full, verified
  scriptures: [
    { ref: "Psalm 1:1-3", text: "1 Blessed is the man that walketh not in the counsel of the ungodly, nor standeth in the way of sinners, nor sitteth in the seat of the scornful.\n2 But his delight is in the law of the Lord; and in his law doth he meditate day and night.\n3 And he shall be like a tree planted by the rivers of water, that bringeth forth his fruit in his season; his leaf also shall not wither; and whatsoever he doeth shall prosper." },
    { ref: "3 John 2", text: "2 Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth." },
    { ref: "Psalm 100:1-5", text: "1 Make a joyful noise unto the Lord, all ye lands.\n2 Serve the Lord with gladness: come before his presence with singing.\n3 Know ye that the Lord he is God: it is he that hath made us, and not we ourselves; we are his people, and the sheep of his pasture.\n4 Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name.\n5 For the Lord is good; his mercy is everlasting; and his truth endureth to all generations." },
    { ref: "Psalm 103:8-14", text: "8 The Lord is merciful and gracious, slow to anger, and plenteous in mercy.\n9 He will not always chide: neither will he keep his anger for ever.\n10 He hath not dealt with us after our sins; nor rewarded us according to our iniquities.\n11 For as the heaven is high above the earth, so great is his mercy toward them that fear him.\n12 As far as the east is from the west, so far hath he removed our transgressions from us.\n13 Like as a father pitieth his children, so the Lord pitieth them that fear him.\n14 For he knoweth our frame; he remembereth that we are dust." },
    { ref: "Hebrews 12:29", text: "29 For our God is a consuming fire." },
    { ref: "John 14:16-17", text: "16 And I will pray the Father, and he shall give you another Comforter, that he may abide with you for ever;\n17 Even the Spirit of truth; whom the world cannot receive, because it seeth him not, neither knoweth him: but ye know him; for he dwelleth with you, and shall be in you." },
    { ref: "Romans 8:14-15", text: "14 For as many as are led by the Spirit of God, they are the sons of God.\n15 For ye have not received the spirit of bondage again to fear; but ye have received the Spirit of adoption, whereby we cry, Abba, Father." },
    { ref: "Luke 4:18", text: "18 The Spirit of the Lord is upon me, because he hath anointed me to preach the gospel to the poor; he hath sent me to heal the brokenhearted, to preach deliverance to the captives, and recovering of sight to the blind, to set at liberty them that are bruised," },
    { ref: "Isaiah 61:1-3", text: "1 The Spirit of the Lord God is upon me; because the Lord hath anointed me to preach good tidings unto the meek; he hath sent me to bind up the brokenhearted, to proclaim liberty to the captives, and the opening of the prison to them that are bound;\n2 To proclaim the acceptable year of the Lord, and the day of vengeance of our God; to comfort all that mourn;\n3 To appoint unto them that mourn in Zion, to give unto them beauty for ashes, the oil of joy for mourning, the garment of praise for the spirit of heaviness; that they might be called trees of righteousness, the planting of the Lord, that he might be glorified." },
    { ref: "Deuteronomy 8:18", text: "18 But thou shalt remember the Lord thy God: for it is he that giveth thee power to get wealth, that he may establish his covenant which he sware unto thy fathers, as it is this day." },
    { ref: "Psalm 23:5-6", text: "5 Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.\n6 Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the Lord for ever." },
    { ref: "2 Kings 4:1-7", text: "1 Now there cried a certain woman of the wives of the sons of the prophets unto Elisha, saying, Thy servant my husband is dead; and thou knowest that thy servant did fear the Lord: and the creditor is come to take unto him my two sons to be bondmen.\n2 And Elisha said unto her, What shall I do for thee? tell me, what hast thou in the house? And she said, Thine handmaid hath not any thing in the house, save a pot of oil.\n3 Then he said, Go, borrow thee vessels abroad of all thy neighbours, even empty vessels; borrow not a few.\n4 And when thou art come in, thou shalt shut the door upon thee and upon thy sons, and shalt pour out into all those vessels, and thou shalt set aside that which is full.\n5 So she went from him, and shut the door upon her and upon her sons, who brought the vessels to her; and she poured out.\n6 And it came to pass, when the vessels were full, that she said unto her son, Bring me yet a vessel. And he said unto her, There is not a vessel more. And the oil stayed.\n7 Then she came and told the man of God. And he said, Go, sell the oil, and pay thy debt, and live thou and thy children of the rest." },
    { ref: "2 Kings 3:16-17", text: "16 And he said, Thus saith the Lord, Make this valley full of ditches.\n17 For thus saith the Lord, Ye shall not see wind, neither shall ye see rain; yet that valley shall be filled with water, that ye may drink, both ye, and your cattle, and your beasts." },
    { ref: "Ephesians 1:3", text: "3 Blessed be the God and Father of our Lord Jesus Christ, who hath blessed us with all spiritual blessings in heavenly places in Christ:" },
    { ref: "Psalm 34:6-10", text: "6 This poor man cried, and the Lord heard him, and saved him out of all his troubles.\n7 The angel of the Lord encampeth round about them that fear him, and delivereth them.\n8 O taste and see that the Lord is good: blessed is the man that trusteth in him.\n9 O fear the Lord, ye his saints: for there is no want to them that fear him.\n10 The young lions do lack, and suffer hunger: but they that seek the Lord shall not want any good thing." },
    { ref: "Matthew 6:33", text: "33 But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you." },
    { ref: "Psalm 37:25", text: "25 I have been young, and now am old; yet have I not seen the righteous forsaken, nor his seed begging bread." },
    { ref: "Deuteronomy 1:6-8", text: "6 The Lord our God spake unto us in Horeb, saying, Ye have dwelt long enough in this mount:\n7 Turn you, and take your journey, and go to the mount of the Amorites, and unto all the places nigh thereunto, in the plain, in the hills, and in the vale, and in the south, and by the sea side, to the land of the Canaanites, and unto Lebanon, unto the great river, the river Euphrates.\n8 Behold, I have set the land before you: go in and possess the land which the Lord sware unto your fathers, Abraham, Isaac, and Jacob, to give unto them and to their seed after them." },
    { ref: "Psalm 44:1-4", text: "1 We have heard with our ears, O God, our fathers have told us, what work thou didst in their days, in the times of old.\n2 How thou didst drive out the heathen with thy hand, and plantedst them; how thou didst afflict the people, and cast them out.\n3 For they got not the land in possession by their own sword, neither did their own arm save them: but thy right hand, and thine arm, and the light of thy countenance, because thou hadst a favour unto them.\n4 Thou art my King, O God: command deliverances for Jacob." },
    { ref: "Genesis 26:1-5", text: "1 And there was a famine in the land, beside the first famine that was in the days of Abraham. And Isaac went unto Abimelech king of the Philistines unto Gerar.\n2 And the Lord appeared unto him, and said, Go not down into Egypt; dwell in the land which I shall tell thee of:\n3 Sojourn in this land, and I will be with thee, and will bless thee; for unto thee, and unto thy seed, I will give all these countries, and I will perform the oath which I sware unto Abraham thy father;\n4 And I will make thy seed to multiply as the stars of heaven, and will give unto thy seed all these countries; and in thy seed shall all the nations of the earth be blessed;\n5 Because that Abraham obeyed my voice, and kept my charge, my commandments, my statutes, and my laws." },
    { ref: "Genesis 26:12-14", text: "12 Then Isaac sowed in that land, and received in the same year an hundredfold: and the Lord blessed him.\n13 And the man waxed great, and went forward, and grew until he became very great:\n14 For he had possession of flocks, and possession of herds, and great store of servants: and the Philistines envied him." },
    { ref: "Psalm 50:5", text: "5 Gather my saints together unto me; those that have made a covenant with me by sacrifice." },
    { ref: "2 Chronicles 13:5", text: "5 Ought ye not to know that the Lord God of Israel gave the kingdom over Israel to David for ever, even to him and to his sons by a covenant of salt?" },
    { ref: "Exodus 2:24", text: "24 And God heard their groaning, and God remembered his covenant with Abraham, with Isaac, and with Jacob." },
    { ref: "2 Samuel 24:24-25", text: "24 And the king said unto Araunah, Nay; but I will surely buy it of thee at a price: neither will I offer burnt offerings unto the Lord my God of that which doth cost me nothing. So David bought the threshingfloor and the oxen for fifty shekels of silver.\n25 And David built there an altar unto the Lord, and offered burnt offerings and peace offerings. So the Lord was intreated for the land, and the plague was stayed from Israel." },
    { ref: "Joshua 2:8-14", text: "8 And before they were laid down, she came up unto them upon the roof;\n9 And she said unto the men, I know that the Lord hath given you the land, and that your terror is fallen upon us, and that all the inhabitants of the land faint because of you.\n10 For we have heard how the Lord dried up the water of the Red sea for you, when ye came out of Egypt; and what ye did unto the two kings of the Amorites, that were on the other side Jordan, Sihon and Og, whom ye utterly destroyed.\n11 And as soon as we had heard these things, our hearts did melt, neither did there remain any more courage in any man, because of you: for the Lord your God, he is God in heaven above, and in earth beneath.\n12 Now therefore, I pray you, swear unto me by the Lord, since I have shewed you kindness, that ye will also shew kindness unto my father's house, and give me a true token:\n13 And that ye will save alive my father, and my mother, and my brethren, and my sisters, and all that they have, and deliver our lives from death.\n14 And the men answered her, Our life for yours, if ye utter not this our business. And it shall be, when the Lord hath given us the land, that we will deal kindly and truly with thee." },
    { ref: "Joshua 6:25", text: "25 And Joshua saved Rahab the harlot alive, and her father's household, and all that she had; and she dwelleth in Israel even unto this day; because she hid the messengers, which Joshua sent to spy out Jericho." },
    { ref: "Psalm 18:17", text: "17 He delivered me from my strong enemy, and from them which hated me: for they were too strong for me." },
    { ref: "Genesis 2:16-17", text: "16 And the Lord God commanded the man, saying, Of every tree of the garden thou mayest freely eat:\n17 But of the tree of the knowledge of good and evil, thou shalt not eat of it: for in the day that thou eatest thereof thou shalt surely die." },
    { ref: "Genesis 3:4-5", text: "4 And the serpent said unto the woman, Ye shall not surely die:\n5 For God doth know that in the day ye eat thereof, then your eyes shall be opened, and ye shall be as gods, knowing good and evil." },
    { ref: "Isaiah 45:1-3", text: "1 Thus saith the Lord to his anointed, to Cyrus, whose right hand I have holden, to subdue nations before him; and I will loose the loins of kings, to open before him the two leaved gates; and the gates shall not be shut;\n2 I will go before thee, and make the crooked places straight: I will break in pieces the gates of brass, and cut in sunder the bars of iron:\n3 And I will give thee the treasures of darkness, and hidden riches of secret places, that thou mayest know that I, the Lord, which call thee by thy name, am the God of Israel." },
    { ref: "John 6:66-69", text: "66 From that time many of his disciples went back, and walked no more with him.\n67 Then said Jesus unto the twelve, Will ye also go away?\n68 Then Simon Peter answered him, Lord, to whom shall we go? thou hast the words of eternal life.\n69 And we believe and are sure that thou art that Christ, the Son of the living God." }
  ],

  // 🎧 Short teaching audio clips (spoken by the browser voice)
  clips: [
    { id: "c1", title: "There is an anointing that prospers", sec: 20,
      body: "There is an anointing called the anointing of prosperity. When that anointing settles on you, you become like a tree planted by the riverside. The leaves shall not wither. Whatsoever you touch shall prosper. It will not come on a silver platter. You must fast. You must seek the face of God for this anointing to be released upon you." },
    { id: "c2", title: "What prosperity really means", sec: 18,
      body: "Prosperity means to thrive, to flourish, and to experience a wholeness of success across all areas of life. The opposite of prosperity is unsuccessful, impoverished, destitute, lacking the basic necessities. The Lord wants you to prosper — not only in one area, but in every area of your life." },
    { id: "c3", title: "Oil upon the head", sec: 22,
      body: "It is the head that carries destiny. So when the Lord releases the oil of prosperity, the oil of favour upon your head, He is saying, I am crowning your life. Thou anointest my head with oil, my cup runneth over. Surely goodness and mercy shall follow me all the days of my life." },
    { id: "c4", title: "The widow's pot of oil", sec: 22,
      body: "By the wisdom of God she knew how best to arrange the pots and vessels. But only the power of God could cause the oil to multiply. God does not need our natural conditions to be perfect. He does not need the rain to fill our valleys, nor the wind to make our ditches run over. His power alone is enough to produce our miracles." },
    { id: "c5", title: "The secret behind Isaac's hundredfold", sec: 22,
      body: "Isaac sowed in the land, and the Lord blessed his work with a hundredfold harvest in the same year of famine. But behind the sowing there was something deeper: the Lord was with him, and divine favour found him. Covenant is what binds God to come to your rescue when everything is not working." },
    { id: "c6", title: "Personal covenant and preservation", sec: 22,
      body: "All of us are in covenant with God through the shed blood of Jesus. But there are people who have a personal covenant with God. It can be through fasting and prayer, through evangelism, through sacrifice, or simply through obeying prophetic instruction. Salt means preservation. David's kingdom was preserved by a covenant of preservation." },
    { id: "c7", title: "Rahab — one covenant, whole household", sec: 22,
      body: "Rahab said, I know that the Lord hath given you the land, and that your terror is fallen upon us. She asked for a true token: swear that you will save alive my father, my mother, my brothers, my sisters, and all that they have. And by virtue of covenant, her entire family was preserved when a city fell." },
    { id: "c8", title: "Guard the oil, possess the land", sec: 20,
      body: "You have received an anointing. Do not let anyone take it from you. Do not do the things that let the enemy leak the anointing, because the anointing can be leaked, and it can be contaminated. Keep the oil and march forward. Possess your possession." }
  ],

  // 💰 Real-life financial and life scenarios
  scenarios: [
    { title: "The unexpected bill",
      situation: "Your car breaks down two days before rent is due. Your account balance is short. A friend hints at a fast-cash arrangement that feels off in your spirit.",
      options: [
        { label: "Take the fast-cash arrangement quietly, it's just this once.", ok: false,
          why: "This is exactly the voice the Prophet warned about — the voice that contradicts what God has said. Adam and Eve hearkened to the wrong voice and lost their place. What comes in through compromise leaks out through pressure." },
        { label: "Pray, tell God plainly, and ask Him for wisdom, favour and a Kingdom door — even if it means humbling yourself to ask for time.", ok: true,
          why: "This poor man cried, and the Lord heard him, and saved him out of all his troubles. Covenant is what binds God to come when everything is not working." },
        { label: "Do nothing and wait — hope it will disappear.", ok: false,
          why: "The Lord says, Ye have dwelt long enough. Move forward and possess. Faith is active, not passive." }
      ]},
    { title: "The 'small' pot of oil",
      situation: "You've been asking God for a big breakthrough, but honestly the only thing in your hand right now is a small skill people already appreciate.",
      options: [
        { label: "Wait for something bigger and more impressive before starting.", ok: false,
          why: "The widow had nothing but a pot of oil, and God multiplied what was already in her hand. Despise not the day of small beginnings." },
        { label: "Bring out what is in your hand, borrow the 'empty vessels' (customers, contacts, opportunities), shut the door and pour.", ok: true,
          why: "God does not need the wind or the rain to fill your valley. His power multiplies the little that is in your hand." },
        { label: "Copy someone else's business exactly and hope for the same result.", ok: false,
          why: "The oil in your hand is your assignment, not somebody else's. Covenant favours who God calls you to be, not an imitation." }
      ]},
    { title: "The 'hidden' opportunity",
      situation: "You're offered a very lucrative role — but you'd have to keep quiet about your faith, and the leadership is openly hostile to Christ.",
      options: [
        { label: "Accept and hide your faith — 'God understands the season'.", ok: false,
          why: "Peter said, Lord, to whom shall we go? Thou hast the words of eternal life. The anointing can be leaked, and it can be contaminated. Guard the oil." },
        { label: "Pray it through and decline if you cannot walk in your covenant openly, trusting God to open another door.", ok: true,
          why: "The Lord who opens the two-leaved gates and cuts in sunder the bars of iron is bigger than one contract. He anoints and He advances His own." },
        { label: "Accept and preach loudly in every meeting to prove you're bold.", ok: false,
          why: "Wisdom is also part of the anointing. God gives strategies as well as boldness." }
      ]},
    { title: "The stagnant year",
      situation: "You look at your career, your prayer life and your finances and the honest word is 'stuck'. Nothing has moved in twelve months.",
      options: [
        { label: "Accept it as your portion — some people just have hard lives.", ok: false,
          why: "The spirit of retrogression keeps people stuck in one place — no advancement, no increase. That is not God's portion for you." },
        { label: "Renew your covenant: enter a defined season of fasting, prayer, giving and obedience to specific prophetic instructions.", ok: true,
          why: "Gather my saints together unto me; those that have made a covenant with me by sacrifice. Personal covenant produces personal favour." },
        { label: "Copy someone else's testimony video by video and expect their result.", ok: false,
          why: "You cannot download somebody else's covenant. You must walk yours." }
      ]},
    { title: "Debt on the doorstep",
      situation: "Creditors are pressing. You have real bills, real people counting on you, and the shame is loud.",
      options: [
        { label: "Hide, avoid the calls, and pretend it isn't happening.", ok: false,
          why: "Shame keeps people bound. Bring the debt into the light in prayer and in wise counsel." },
        { label: "Do like the widow — bring it to the man of God, obey the instruction, and honour God with even the little that comes in.", ok: true,
          why: "The Lord said to the widow, Go, sell the oil, and pay thy debt, and live thou and thy children of the rest. God's provision paid the debt and had rest left over." },
        { label: "Take on a bigger loan to cover the small ones.", ok: false,
          why: "Multiplying debt without covenant strategy multiplies the yoke, not the harvest." }
      ]},
    { title: "The family you carry",
      situation: "You are the one in the family everyone leans on. When you prosper, many will be blessed. And you know spiritually there has been resistance to your rise.",
      options: [
        { label: "Shrink so nobody feels envious.", ok: false,
          why: "You cannot preserve a household from a low place. Rahab was preserved because she stood up in covenant, not because she stayed small." },
        { label: "Enter into covenant like Rahab did — for your father's house, your mother's house, your children — and ask God for a true token.", ok: true,
          why: "By virtue of covenant her whole family was saved when the city fell. Your covenant can cover people who cannot yet cover themselves." },
        { label: "Cut everyone off so nobody can slow you down.", ok: false,
          why: "The anointing that prospers you is also given to bless others. Wisdom sets boundaries; covenant carries family." }
      ]}
  ],

  // ⚖️ Kingdom vs. worldly prosperity
  compare: [
    { kingdom: "Prospers spirit, soul, body, home, work and health — wholeness of success in every area.",
      worldly: "Prospers one area (usually money) and quietly drains the others." },
    { kingdom: "Rests on covenant with God through the blood of Jesus, plus personal covenant.",
      worldly: "Rests on secret agreements, hidden allegiances and human networks." },
    { kingdom: "God is the source: it is He that giveth thee power to get wealth.",
      worldly: "Man is the source: 'my hand, my brain, my hustle.'" },
    { kingdom: "Uses the little in your hand — a pot of oil — and multiplies it.",
      worldly: "Despises small beginnings and chases shortcuts." },
    { kingdom: "Comes with rest on every side; the anointing lifts burdens and brings ease.",
      worldly: "Comes with sleeplessness, anxiety and a growing yoke." },
    { kingdom: "Preserves the household — father, mother, brethren, children.",
      worldly: "Isolates and eventually costs relationships." },
    { kingdom: "Extends to generations — covenant lives on to your children's children.",
      worldly: "Ends when the covenant with darkness ends — wealth collapses when the deal breaks." },
    { kingdom: "Grows in secret places of prayer, fasting, giving and obedience.",
      worldly: "Grows in secret societies, compromise and sin." }
  ],

  // 🔥 Swipe-through declarations
  declarations: [
    "By the reason of the anointing of prosperity upon my head, today I break the curse in the name of Jesus Christ.",
    "From today I am moving forward. I am advancing. I am prospering. Today my life is blessed in all areas of my life.",
    "This hand of mine shall touch money, in the name of Jesus Christ.",
    "I am buying new properties on every side — new houses, new cars, new businesses, in the name of Jesus.",
    "My Father, by the covenant of prosperity, I prosper in all areas of my life.",
    "I receive financial abundance. Money comes to me. Money comes to me by divine covenant.",
    "I do not struggle to get money. My life attracts wealth, in the name of Jesus.",
    "I am entering into my season of prosperity, for it is the Lord who gives us power to make wealth.",
    "I decree and declare victory over poverty, victory over delay, victory over stagnation, victory over setback.",
    "The old chapter of lack, of poverty, of weakness, of sickness and disease, of tears and lament — it is over.",
    "I am in a new chapter: full of praises, new songs, abundance of God's goodness, victory and the glory of God.",
    "I shall prosper in my ministry, my marriage, my finances, my body, my soul and my spirit.",
    "My case is different. My case is different. My case is different.",
    "By covenant I am preserved. By covenant I am blessed. By covenant my family is covered.",
    "What is mine is mine. It shall not be given to another.",
    "Angels are positioned by God to help me in this month of September.",
    "I am covered by the blood of Jesus. I hold the oil. I keep the oil. I march forward and possess my possession."
  ],

  // 🧠 Quick Bible quizzes
  quiz: [
    { q: "According to the teaching, what does the word prosperity mean?", a: ["Money and property only", "To thrive, to flourish, and to experience a wholeness of success across all areas of life", "Never facing any battle", "A quiet, comfortable life"], correct: 1,
      why: "Prosperity is thriving and flourishing — spirit, soul, body, home, work and health — not one narrow area." },
    { q: "Which scripture reminds us that God gives the power to get wealth?", a: ["Psalm 100:4", "Deuteronomy 8:18", "Hebrews 12:29", "Genesis 2:17"], correct: 1,
      why: "Deuteronomy 8:18 — He gives that power so that He may establish His covenant." },
    { q: "What did the widow in 2 Kings 4 have left in her house?", a: ["A bag of silver", "A pot of oil", "A field of grain", "Two sons only"], correct: 1,
      why: "Thine handmaid hath not any thing in the house, save a pot of oil. God multiplied the little in her hand." },
    { q: "What was the real secret behind Isaac's hundredfold harvest in a famine?", a: ["Superior farming", "Early rain", "Covenant — the Lord was with him", "A loan"], correct: 2,
      why: "He sowed, but behind the sowing was covenant. Covenant is what binds God to come to your rescue when everything is not working." },
    { q: "Why is the oil poured upon the head?", a: ["Because the head carries destiny — God crowns the life", "It is only tradition", "To make the person look different", "Because the hands are unclean"], correct: 0,
      why: "The head controls destiny. When the Lord releases the oil upon your head, He is saying, I am crowning your life." },
    { q: "How did the fathers possess the land in Psalm 44?", a: ["By sword and skill", "By God's right hand, arm and the light of His countenance", "By buying it", "By treaty"], correct: 1,
      why: "They got not the land in possession by their own sword… but Thy right hand, and Thine arm, and the light of Thy countenance." },
    { q: "What preserved Rahab and her whole father's household?", a: ["Her wealth", "Her position", "The covenant with the spies", "The walls of Jericho"], correct: 2,
      why: "Joshua saved Rahab and her father's household alive because she hid the spies and asked for a true token — a covenant." },
    { q: "What does the covenant of salt signify?", a: ["Seasoning", "Preservation", "Sacrifice", "Cleansing"], correct: 1,
      why: "Salt means preservation. David's kingdom was preserved by a covenant of preservation." },
    { q: "Who shall not want any good thing (Psalm 34:10)?", a: ["The young lions", "The well-connected", "They that seek the Lord", "The wealthy merchants"], correct: 2,
      why: "The young lions do lack, but they that seek the Lord shall not want any good thing." },
    { q: "What is the spirit of retrogression?", a: ["A spirit that gets people stuck with no advancement and no increase", "A physical sickness", "A financial system", "A form of fear only"], correct: 0,
      why: "It keeps people stuck in one place — no advancement, no increase — cast out by the power of the Holy Ghost." },
    { q: "What lost Adam and Eve what God had given them?", a: ["Poverty", "Hearkening to the voice of the serpent", "Hunger", "The garden itself"], correct: 1,
      why: "They hearkened to a voice that contradicted the word of God, and lost their place." },
    { q: "What must you do after receiving the anointing?", a: ["Stay silent forever", "Hold it, guard it from leaks and contamination, and possess your possession", "Wait passively", "Give the oil away"], correct: 1,
      why: "The anointing can be leaked and contaminated. Keep the oil, march forward and possess." }
  ],

  // 🧩 Fill-in-the-blank verses
  fill: [
    { text: "\"And he shall be like a tree planted by the rivers of water, that bringeth forth his fruit in his season; his leaf also shall not wither; and whatsoever he doeth shall ______.\"", ref: "Psalm 1:3", answer: "prosper" },
    { text: "\"Beloved, I ______ above all things that thou mayest prosper and be in health, even as thy soul prospereth.\"", ref: "3 John 2", answer: "wish" },
    { text: "\"But thou shalt remember the Lord thy God: for it is he that giveth thee power to get ______, that he may establish his covenant.\"", ref: "Deuteronomy 8:18", answer: "wealth" },
    { text: "\"Thou anointest my head with oil; my cup runneth ______.\"", ref: "Psalm 23:5", answer: "over" },
    { text: "\"Thine handmaid hath not any thing in the house, save a pot of ______.\"", ref: "2 Kings 4:2", answer: "oil" },
    { text: "\"The young lions do lack, and suffer hunger: but they that seek the Lord shall not want any good ______.\"", ref: "Psalm 34:10", answer: "thing" },
    { text: "\"But seek ye ______ the kingdom of God, and his righteousness; and all these things shall be added unto you.\"", ref: "Matthew 6:33", answer: "first" },
    { text: "\"Ye have dwelt long enough in this ______.\"", ref: "Deuteronomy 1:6", answer: "mount" },
    { text: "\"For they got not the land in possession by their own ______, neither did their own arm save them.\"", ref: "Psalm 44:3", answer: "sword" },
    { text: "\"Ought ye not to know that the Lord God of Israel gave the kingdom over Israel to David for ever, even to him and to his sons by a covenant of ______?\"", ref: "2 Chronicles 13:5", answer: "salt" }
  ],

  // 🎯 Personal application questions
  application: [
    "Which area of my life am I quietly accepting less than covenant provides — spirit, body, work, home, finances or health?",
    "What 'pot of oil' is already in my hand that I have been despising?",
    "Which condition have I dwelt in long enough? What is the one step forward I will take this week?",
    "Which voice have I been hearkening to that contradicts what God has said about me?",
    "What is my personal covenant with God this month — in prayer, fasting, giving, evangelism or obedience?",
    "Whose household will be preserved because of the covenant I keep?",
    "Where is the anointing on my life at risk of leaking? What will I stop doing this week to guard the oil?"
  ],

  // 🏆 Final knowledge challenge (a harder round; picks from a pool)
  finalChallenge: [
    { q: "In one line: what does the anointing of prosperity produce?", a: ["Cosmetic wealth", "A tree by the rivers of water — fruit in season, leaf that does not wither, and whatsoever the person does prospers", "A quiet lifestyle", "Ministry titles"], correct: 1,
      why: "Psalm 1:1-3 is the picture the Prophet used." },
    { q: "Fill in: 'Money comes to me by divine ______.'", a: ["hustle", "covenant", "connection", "algorithm"], correct: 1,
      why: "Money comes to me by divine covenant — the declaration is a covenant confession." },
    { q: "What did God tell Isaac when he was in a land of famine?", a: ["Move to Egypt", "Wait for the rain", "Dwell in the land; I will be with thee and will bless thee", "Change your career"], correct: 2,
      why: "Genesis 26 — the same covenant that prospered the father came upon the son." },
    { q: "In the widow's story, what did the oil stop doing?", a: ["It stopped flowing when there were no more vessels", "It went bad", "It caught fire", "It was stolen"], correct: 0,
      why: "There is not a vessel more. And the oil stayed. God multiplies to the level of the vessels you bring." },
    { q: "Which of these is NOT a way to enter a personal covenant with God as the Prophet described?", a: ["Fasting and prayer", "Evangelism", "Obeying prophetic instruction", "Signing a paper agreement with another believer"], correct: 3,
      why: "He listed fasting/prayer, evangelism, sacrifice, and obeying prophetic instruction — never a paper contract with another believer." },
    { q: "What did Rahab ask the spies for?", a: ["Gold", "A true token — a covenant to save alive her whole family", "Passage to another land", "Weapons"], correct: 1,
      why: "Swear unto me by the Lord… and give me a true token — the covenant that preserved her house." },
    { q: "'It shall not be by your ______ neither your power, but by the power of God.'", a: ["might", "wisdom", "network", "hustle"], correct: 0,
      why: "Echo of Zechariah 4:6, quoted by the Prophet during the sealing." },
    { q: "How does covenant prosperity differ from worldly prosperity in one word?", a: ["Speed", "Wholeness", "Fame", "Volume"], correct: 1,
      why: "Kingdom prosperity is wholeness — spirit, soul, body, home, work and household — not one area at the expense of the rest." },
    { q: "The head is anointed because…", a: ["It is the biggest part of the body", "The head carries destiny — God is crowning the life", "The oil settles best there", "It is a Middle Eastern custom only"], correct: 1,
      why: "It is the head that controls destiny; the oil upon the head is God crowning the life." },
    { q: "What must the believer do with the anointing after receiving it?", a: ["Announce it publicly", "Keep it, guard it from leaks and contamination, and possess", "Pass it on immediately", "Store it silently for years"], correct: 1,
      why: "The anointing can be leaked and contaminated. Keep the oil and march forward — possess your possession." }
  ],

  // 📱 Shareable lesson cards (short, WhatsApp-friendly quotes)
  cards: [
    { line: "There is an anointing called the anointing of prosperity. When it settles on you, you become a tree by the rivers of water — and whatsoever you do prospers.", ref: "Psalm 1:3" },
    { line: "Prosperity is not money alone — it is to thrive and flourish in spirit, soul, body, home, work and health.", ref: "3 John 2" },
    { line: "It is the head that carries destiny. When God anoints your head with oil, He is saying, I am crowning your life.", ref: "Psalm 23:5" },
    { line: "God does not need the wind or the rain to fill your valley — His power multiplies the little in your hand.", ref: "2 Kings 4:1-7" },
    { line: "Behind Isaac's hundredfold in famine was covenant: the Lord was with him, and divine favour found him.", ref: "Genesis 26:12" },
    { line: "David's kingdom was preserved by a covenant of salt. Salt means preservation.", ref: "2 Chronicles 13:5" },
    { line: "By virtue of covenant, one woman's whole household was saved when a city fell.", ref: "Joshua 6:25" },
    { line: "Ye have dwelt long enough in this mount. Turn, take your journey, and possess the land.", ref: "Deuteronomy 1:6-8" },
    { line: "Seek ye first the kingdom of God, and all these things shall be added unto you.", ref: "Matthew 6:33" },
    { line: "The anointing can be leaked and contaminated. Keep the oil, march forward, possess your possession.", ref: "" }
  ]
};
