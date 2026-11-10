// September Ember-Months Prophetic Blueprint
// Daily rhythm mapping the 12 mantles across the four Ember months (Sept–Dec 2026).
// Each week centers on one mantle; the 7-day rhythm is the same every week.

const DAILY_RHYTHM = [
  { day: "Mon", theme: "Word",         ico: "📖", prompt: "Read the mantle's scriptures out loud twice — slowly." },
  { day: "Tue", theme: "Warfare",      ico: "⚔️", prompt: "Pray the mantle's prayer in tongues and understanding." },
  { day: "Wed", theme: "Watch",        ico: "👁️", prompt: "Journal what you saw or heard this week. Any dreams? Test them against Scripture." },
  { day: "Thu", theme: "Thanksgiving", ico: "🙌", prompt: "Thank God for a specific thing the mantle has already started to do." },
  { day: "Fri", theme: "Fasting",      ico: "🕊️", prompt: "Skip one meal (as your health allows). Give that time to prayer and the declaration." },
  { day: "Sat", theme: "Sowing",       ico: "🌱", prompt: "Sow a seed on purpose — first-fruit, offering, or an act of service." },
  { day: "Sun", theme: "Sealing",      ico: "🕯️", prompt: "In church or online service, receive the word and repeat the declaration all day." },
];

const BLUEPRINT_WEEKS = [
  // SEPTEMBER — foundation weeks
  { w: 1,  from: "Tue Sep 01", to: "Mon Sep 07", month: "September", mantleN: 1,  focus: "Open my mouth" },
  { w: 2,  from: "Tue Sep 08", to: "Mon Sep 14", month: "September", mantleN: 2,  focus: "Prophesy over the dry places" },
  { w: 3,  from: "Tue Sep 15", to: "Mon Sep 21", month: "September", mantleN: 3,  focus: "Take back dominion" },
  { w: 4,  from: "Tue Sep 22", to: "Mon Sep 28", month: "September", mantleN: 4,  focus: "Consecration and dew" },
  // OCTOBER — increase weeks
  { w: 5,  from: "Tue Sep 29", to: "Mon Oct 05", month: "September / October", mantleN: 5,  focus: "Blossom in season" },
  { w: 6,  from: "Tue Oct 06", to: "Mon Oct 12", month: "October",   mantleN: 6,  focus: "Silence the accuser" },
  { w: 7,  from: "Tue Oct 13", to: "Mon Oct 19", month: "October",   mantleN: 7,  focus: "Favor opens doors" },
  { w: 8,  from: "Tue Oct 20", to: "Mon Oct 26", month: "October",   mantleN: 8,  focus: "Believe you receive" },
  // NOVEMBER — discernment & intercession weeks
  { w: 9,  from: "Tue Oct 27", to: "Mon Nov 02", month: "October / November", mantleN: 9,  focus: "Perceive holy vessels" },
  { w: 10, from: "Tue Nov 03", to: "Mon Nov 09", month: "November",  mantleN: 10, focus: "Hold up hands on the mountain" },
  { w: 11, from: "Tue Nov 10", to: "Mon Nov 16", month: "November",  mantleN: 11, focus: "Silence night altars" },
  { w: 12, from: "Tue Nov 17", to: "Mon Nov 23", month: "November",  mantleN: 12, focus: "Covenant sacrifice" },
  // DECEMBER — repetition, sealing, harvest
  { w: 13, from: "Tue Nov 24", to: "Mon Nov 30", month: "November",  mantleN: 1,  focus: "Prophesy the harvest sound" },
  { w: 14, from: "Tue Dec 01", to: "Mon Dec 07", month: "December",  mantleN: 5,  focus: "Fruit that remains" },
  { w: 15, from: "Tue Dec 08", to: "Mon Dec 14", month: "December",  mantleN: 7,  focus: "Year-end favor" },
  { w: 16, from: "Tue Dec 15", to: "Mon Dec 21", month: "December",  mantleN: 8,  focus: "Manifest before year ends" },
  { w: 17, from: "Tue Dec 22", to: "Mon Dec 28", month: "December",  mantleN: 12, focus: "Close chapters by sacrifice" },
  { w: 18, from: "Tue Dec 29", to: "Thu Dec 31", month: "December",  mantleN: 0,  focus: "Watchnight — receive all 12 mantles again (Job 33 sealing)" },
];
