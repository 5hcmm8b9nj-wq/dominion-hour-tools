# Build Notes — Provoking The Divine Covenant

**By Prophet Prince Amo David · Dominion Hour Ministries International**

A polished, high-contrast, mobile-first single-page interactive companion site for the
deliverance-ministry sermon "Provoking The Divine Covenant." Static HTML/CSS/JS, no build step.

## Deploy
- **Preview URL (`/computer/a`):** https://www.perplexity.ai/computer/a/provoking-the-divine-covenant-kNQBTIYYTnaEXx4uga8kTA
- **Asset id:** `90d4014c-8618-4e76-845f-1e2e81af244c`
- Deployed via `deploy_website` with project path `/home/user/workspace/provoking-divine-covenant/site`, site name "Provoking The Divine Covenant", entry point `index.html`.
- **Not published** — the main agent will handle publishing if desired.

> To surface the live preview as a component in the main chat, the parent agent must call
> `deploy_website` itself with the same arguments (project_path, site_name="Provoking The Divine Covenant", entry_point="index.html").

## Design direction
- **Palette (bright, high-contrast, WCAG AA):** cream background `#FBF8F2`, near-black body `#1A1712`,
  deep royal navy `#16224A`, warm gold `#C6941E` (deep gold `#9A6E0E` for AA text on cream),
  burgundy `#8A1B2E` reserved for warfare/declaration emphasis. Light mode only (per audience preference —
  no dark/muted theme).
- **Type:** Zodiak (serif display, Fontshare) for headings + General Sans (body, Fontshare). Body floor 17px,
  generous line-height, 44px+ touch targets, focus rings, balanced/pretty text wrapping.
- **Custom SVG logo:** covenant mark = censer flame + open scroll, inline in header and footer. No cross graphic.
- **Hero image:** generated (`assets/hero.png`) — stone altar at dawn with open scroll + censer, golden light,
  navy sky. No people/faces, no occult, no cross.
- **Branding:** "Dominion Hour Ministries International" + "By Prophet Prince Amo David" in header/footer.
  No L137 branding anywhere.

## Sections (single scrolling page, sticky nav that jumps to each)
1. **Hero** — title, subtitle, one-line theme, "Begin" + "Go to the Declarations" buttons.
2. **Opening Sequence** — 4 steps (Praise/Thanksgiving, Confession, Invite the Holy Spirit, Teaching) with
   full KJV verses (1 Thess 5:17-18, Psalm 92:1-2, Psalm 51:1-3, Acts 2:1-4).
3. **The Teaching** — six movements, each a card with full KJV anchor scripture + inline 1-2 sentence
   explanation (Deut 7:9-15; Exodus 2:23-25; 1 Sam 18:1-4 + 2 Sam 9:1-7; Gen 17:1-13 + Gal 3:13-17;
   2 Sam 24:24 + Eph 1:13).
4. **Word Study: Lodebar** — tap-to-reveal card ("no word / no pasture / nothing" → carried to the King's table).
5. **Interactive Tools** (solo-first, no scorekeeping, no shame, localStorage progress):
   - **Covenant vs Covenant** — 6 tap-to-flip cards (burgundy demonic/ancestral claim → navy higher-covenant answer).
   - **Are You Provoking the Covenant?** — 8 tap statements, gentle closing message, no score/shame,
     "I'd rather just read" link + clear-answers button.
   - **Out of Lodebar** — 4-step tap-through journey (Lodebar → Covenant remembered → The King sends for you →
     Seated at the table), each with a line + KJV fragment and a progress track.
   - **The Declaration Wall** — 15 tap-to-highlight declarations + "Listen & Pray Aloud" audio player.
6. **Renunciation Prayer** — full prayer in a callout with a "Listen & Pray Aloud" audio button.
7. **Communion & Anointing Oil** — two sacrament cards (communion invokes covenant; oil = seal of the Holy Spirit,
   Eph 1:13) + short fasting safety note.
8. **Footer** — Dominion Hour branding, Prophet Prince credit, "share this room" line, KJV note.

## Audio
- `audio/declarations.mp3` (1:54) — declaration wall + persistent bar.
- `audio/renunciation.mp3` — renunciation section.
- Per-section "Listen & Pray Aloud" players + a persistent bottom audio bar that mirrors the active track and
  can be closed. Graceful fallback text shows if a file is missing/404 (fetch probe + media error/stalled events);
  fallback stays hidden when files load.

## Technical
- `localStorage` used for progress (flips, self-check, journey step, lit declarations), wrapped in a try/catch
  safe-store with in-memory fallback so it never crashes a sandboxed iframe.
- Scroll-reveal via IntersectionObserver; `prefers-reduced-motion` respected.
- Mobile: hamburger menu, single-column tool grids, big touch targets.

## QA
- Playwright screenshots at 1280px and 375px across all sections.
- Fixed flip-card sizing bug (faces now share a CSS grid cell so the taller face sets height; text no longer
  overlaps/clips).
- Verified: no console/page errors, single h1, hero alt text, skip link, aria labels on icon buttons,
  Zodiak/General Sans fonts loaded, audio playback + persistent bar, and localStorage persistence across reload.

## Files
`index.html`, `base.css`, `style.css`, `app.js`, `assets/hero.png`, `audio/declarations.mp3`, `audio/renunciation.mp3`.

## Source
All content drawn strictly from `/home/user/workspace/provoking-divine-covenant/CONTENT-SPEC.md` (sermon transcript +
KJV Bible). No invented doctrine, no other religions, no new-age material.
