---
name: cuzmayb
description: 반도체 공부와 프로젝트 기록. A personal notebook of semiconductor work.
colors:
  white-kit: "#ffffff"
  navy-ink: "#13213c"
  slate-muted: "#5b6478"
  pitch-line: "#dfe2e8"
  paper: "#f6f7f9"
  st-george-red: "#c8102e"
typography:
  display:
    fontFamily: "Space Grotesk, Pretendard Variable, sans-serif"
    fontSize: "clamp(60px, 10vw, 128px)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.06em"
  page-display:
    fontSize: "clamp(56px, 12vw, 96px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.04em"
  year:
    fontSize: "96px"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.05em"
  headline:
    fontSize: "32px"
    fontWeight: 700
    letterSpacing: "-0.02em"
  post-title:
    fontSize: "clamp(32px, 5vw, 48px)"
    fontWeight: 600
    lineHeight: 1.17
    letterSpacing: "-0.03em"
  body-long:
    fontSize: "18px"
    lineHeight: 1.67
  section:
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.4
  title:
    fontSize: "19px"
    fontWeight: 700
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Pretendard Variable, Pretendard, -apple-system, Apple SD Gothic Neo, Noto Sans KR, sans-serif"
    fontSize: "16.5px"
    fontWeight: 400
    lineHeight: 1.7
  ui:
    fontSize: "14px"
    fontWeight: 400
  label:
    fontSize: "13px"
    fontWeight: 400
rounded:
  sm: "4px"
  md: "8px"
  lg: "16px"
  pill: "999px"
spacing:
  gutter: "16px"
  item: "20px"
  section: "48px"
components:
  nav-link:
    textColor: "{colors.slate-muted}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  filter-chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.slate-muted}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  filter-chip-active:
    backgroundColor: "{colors.navy-ink}"
    textColor: "{colors.white-kit}"
    rounded: "{rounded.pill}"
  tag:
    textColor: "{colors.slate-muted}"
    rounded: "{rounded.pill}"
    padding: "0 8px"
  home-nav:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.pill}"
    padding: "4px"
  findings-box:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.md}"
    padding: "16px 20px"
  figure:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.md}"
---

# Design System: cuzmayb

## Overview

**Creative North Star: "The Sectioned Notebook" (provisional)**

A lab notebook the owner rereads: dates, conditions, numbers and limits written plainly, with cross-sections and 3D renders of the actual work as the pictures worth looking at. The palette borrows England's colours (white kit, navy, St George red) as the owner's own mark; nothing else from football or Oasis appears on the page.

The page is quiet so the content can be dense. One column, generous line height, tables kept as tables. Colour is rare: navy carries the text, red marks time and the logo.

**Key Characteristics:**
- Single 760px reading column, flat surfaces, hairline dividers.
- Navy ink on pure white. Light by default; night mode is opt-in from the home switch and remembered.
- St George red reserved for dates, the timeline nodes, the logo and focus. Text selection is a light-blue block (`--select`).
- Stacked-die logo mark (four offset bars).

## Colors

White, navy and one red: England's colours, used sparingly.

### Primary
- **St George Red** (#c8102e): project dates on the timeline, timeline nodes, the hero logo, link text in articles, focus ring. Never a fill behind text blocks.

### Neutral
- **White Kit** (#ffffff): page background. The default background. Night mode (opt-in) swaps to navy #0d1526 with #eef0f4 text and #ef4a5c red.
- **Navy Ink** (#13213c): all body text and headings; active filter chip fill.
- **Slate Muted** (#5b6478): summaries, meta lines, nav links, tags.
- **Pitch Line** (#dfe2e8): dividers, chip borders, table borders.
- **Paper** (#f6f7f9): the faint grey surface for the home pill group, findings box, figure backdrop, chips and table headers.

### Named Rules
**The Matchday Red Rule.** Red appears on at most a few small elements per screen: dates, nodes, the mark, links. If a screen looks red, it is wrong.

## Typography

**Display Font:** Space Grotesk 600 (the name on the home page), via next/font.
**Body Font:** Pretendard Variable (npm package, dynamic subset, served from the site), with system Korean fallbacks.

**Character:** Plain, legible Korean text. `word-break: keep-all` keeps Korean words whole.

### Hierarchy
- **Display** (Space Grotesk 600, clamp(60px, 10vw, 128px), 1, −0.06em): the name on the home page only. 128px on desktop, 60px on phones.
- **Page display** (700, clamp(56px, 12vw, 96px)): the Projects page title, as in the reference.
- **Year** (700, 96px, muted): the year on the projects rail.
- **Headline** (700, 32px): page and article titles, and the About greeting.
- **Post title** (600, clamp(32px, 5vw, 48px)): blog post titles, as in the reference.
- **Body long** (400, 18px, 1.67): blog post and About prose, the reference's long-read size.
- **Section** (700, 22px): h2 inside articles; these also feed the in-page table of contents.
- **Title** (700, 19px): list item titles on the timeline and post lists, h3 in articles, the home line.
- **Body** (400, 16.5px, 1.7): article prose, within the 760px column.
- **UI** (400, 14px): navigation, contact links, table text, box headings, back links, table of contents.
- **Label** (400, 13px): meta lines, tags, status, captions, footer.

### Named Rules
**The Seven Steps Rule.** Every font size is one of 116 (display) / 96 / 32 / 22 / 19 / 16.5 / 14 / 13 px. A new size needs a reason written here first.

## Layout

One centered column, max 760px, 16px side gutter, 32px top and 80px bottom padding. Sticky header with blurred background and a hairline bottom border. Projects use a vertical timeline: a 2px rail on the left with square red-outlined nodes. Lists separate items with top hairlines and 20px padding. Tables scroll horizontally inside articles rather than overflowing the page.

## Elevation & Depth

Flat. Depth comes from hairline borders and the sticky header's translucent backdrop.

**The One Lifted Pill Rule.** Exactly one surface casts a shadow: the home menu pill (white on white), `0 1px 2px rgb(19 33 60 / 0.06), 0 8px 24px rgb(19 33 60 / 0.08)` (night: `0 1px 2px rgb(0 0 0 / 0.4), 0 8px 24px rgb(0 0 0 / 0.3)`). Floating notices (toast, hint) reuse the small first layer. Everything else is flat; the hover highlight inside the pill is a grey fill, not a shadow.

## Shapes

Small radii (4px code chips, 3px timeline nodes, 0.8px logo bars) and full pills for nav links, filter chips and tags.

## Components

### Home
- Centered on the first screen: red stacked-die mark (156px, 80 on phones), the name at display size, the tagline "반도체 공부와 프로젝트 기록" in muted title size, then one pill group (15px items) holding 프로젝트 / 블로그 / 소개 on a paper surface with a hairline border, then contact icons (GitHub, Email; 24px). Two groups: identity (mark, name, tagline; visible gaps 16 / 28) and navigation (pill, icons; 20), separated by one 48px interval. No header on the home page; the pill group is the navigation.

### Exploded view (/package, opened by a double click on empty space on the home page)
- The HBM team's research package model redrawn as flat-shaded slabs in CSS 3D (lib/exploded.tsx, data in lib/pkg.ts): white, paper and navy tints with navy hairline edges; mold and oxide are dashed clear shells. The drawing has its own lighting, which the flat UI around it does not: one light from the upper left front (each face its own shade, sides darkening toward the foot, a bright rim inside the top edge) and a faint drafting grid as the floor. No cast shadows. Each material has a skin (polished silicon with a streak of light and a seal ring, ball-shaded bumps, a laminated board, woven thermal paste, a glass lid, speckled mold resin). Faces carry real structure as gradient skins: bump arrays, the TSV column and memory banks on DRAM dies, the PHY block on the base die. Red marks the selected part and the signal path; the power path is ink.
- On a wide screen the page fits the window with no scroll. Drag turns it, the Spread slider opens the layers upward and pushes off-centre parts outward, a part with an inner structure opens a deeper level (package, HBM stack, GPU die, interposer signal lines). Thickness is on a log scale; real values sit in the part list. 1080px wide, wider than the reading column.

### Home switches
- Top right, fixed: KO / EN / 中 as plain text buttons (selected = full ink, semibold) and a borderless night-mode button whose moon turns into a sun. No boxes, like the reference. Language is the address (/…, /en/…, /zh/…) and each button is a link to the same page in that language; the night-mode choice persists in localStorage and applies before paint.

### Motion
- Ease: `cubic-bezier(0.16, 1, 0.3, 1)` (`--ease-out`) for anything that moves; plain `ease-out` for colour and small fades.
- Durations are four tokens in `app/globals.css`: `--d-press` 80 ms (pressing in), `--d-color` 150 ms (colour, border, background, small fades), `--d-move` 220 ms (press release, puck, arrows, lifts, menus), `--d-panel` 320 ms (header, drawer, dashes, dialogs). Only explanatory one-offs keep their own length: logo stack 580 ms, node pulse 480 ms, hold ring 1.33 s, package spread 640 ms, home entrance 520 ms.
- Only `transform`, `opacity`, `translate` and `clip-path` move HTML elements; colours may fade. Nothing animates `width`, `height`, `top` or a shadow. The two exceptions are line drawing inside small SVGs (the hold ring, the notepad's ink), which has no transform equivalent.
- Press: scale 0.96 in 80 ms, back in 220 ms.
- Home first screen: one entrance, top to bottom. Mark rises 14px, name 12px (50 ms later), tagline 8px (90 ms), menu 6px (120 ms), icons fade only (140 ms); 520 ms each. The page-level fade is off on the home page so there is one entrance, not two.
- Page change: the new page fades in over 220 ms (opacity only).
- Logo: on hover each die starts at rest, lifts 2 user units (ease-in, ~100 ms) and re-seats with expo-out (580 ms total), bottom first, 90 ms stagger. A started stack always finishes; leaving mid-way does not snap it.
- Pill groups: one puck slides to the hovered or focused item (220 ms) and settles back on the current page; first appearance fades in place. The puck is a layer the size of the group, cut to the item with `clip-path`.
- Timeline node: the card in view lights its node like a pad under the bond head (red fill, scale 1.35, soft heat ring) and sends one 480 ms pulse outward; reduced motion drops the pulse. Timeline row hover: node fills red and scales 1.15; thumbnail zooms 1.025 inside a still frame. Arrows nudge 3px toward where they go.
- Drag release: the dragged home logo springs back with `cubic-bezier(0.34, 1.56, 0.64, 1)` over 640 ms. This is the only overshoot curve, because it answers a physical pull (rubber band reach 120px). Nothing else bounces.
- Home logo: tap re-stacks; hold 1.33 s fills a red ring (thermocompression bond) and shows a toast with the layer count. The sixteenth bond completes the stack (HBM4) and, 0.9 s later, opens the package view at /package.
- Home: the cursor is a small red die. While the mouse moves, a pill-shaped note (fully rounded like the menu, no tail) sits right above the p-n junction strip; the first-press label and the toast use the same box, and on the home page the toast is drawn in the note's own slot, so it stays above the strip at any window size or scroll position (its note crossfades every 4 s between "두 번 클릭 시 패키지 모식도" and "로고를 꾹 누르면 본딩"). It rises in from below (220 ms), leaves after 8 s of stillness or on a click, key or scroll, and comes back on the next movement.
- Inner pages: header slides away while scrolling down and returns on scroll up (320 ms). On project pages the section pill sticks under the header and rides up by transform when the header leaves. On the projects list the rail shows the year and month of the card in view; the current row's dash lengthens by scale.
- Articles: 2px red reading-progress bar at the very top; copy menu (URL / Markdown) with toast; floating TOC on screens 1180px and wider, the section in view gets a longer red dash; code blocks get a copy button on hover; images open in a lightbox (Esc or click to close).
- Home title: links to About; hover shows "소개 →" under it. No hover-to-navigate (accidental).
- Intro video: tapping the home logo opens a 680x480 rounded card over a dimmed, blurred backdrop, playing the configured YouTube clip muted, looped, without controls (privacy-enhanced embed). Esc or a click outside closes it. Set in lib/site.ts `introVideo`; with none set, a tap restacks the logo.
- Back button: in-page anchor links scroll with replaceState, so Back leaves the page instead of walking through sections.
- Toast: rises in, rests, and fades out in one 2.2 s animation. About page drawings (notepad, runner) run only while on screen and resume where they stopped.
- Reduced motion: every animation and transition is off. State changes are cuts, and each loop rests on its still frame.

### Navigation
- **Style:** on inner pages, a sticky header whose contents align to the 760px column: brand mark + "cuzmayb" left, four pill links right. Muted text; hover and the current page (`aria-current="page"`) fill with the line colour and darken text.

### Figure
- Project cover image: full column width, hairline border, 8px radius, paper backdrop, 13px muted caption stating what the picture is and where it came from. On the timeline the same image appears as a 16:9 thumbnail.

### Findings box
- Under the lede on project pages: hairline-bordered paper box, 8px radius, a 14px muted "핵심 결과" heading, 3 to 4 bullets with the key numbers and one limit. Never a coloured side border.

### Chips (filters and tags)
- **Filter chip:** pill, paper surface, line border, muted text. Active (`aria-pressed`) inverts to navy fill with white text.
- **Tag:** small pill outline, muted text, prefixed with # on posts.

### Timeline (signature)
- 2px rail, square nodes with a red 2px outline on the page background, red tabular date above each title.

## Do's and Don'ts

### Do:
- **Do** keep red for dates, nodes, the logo, links and focus.
- **Do** keep numbers in tables with units, as written in the source notes.
- **Do** let cross-sections, plots and renders from the actual work be the images.

### Don't:
- **Don't** use England or FA crests, three-lions motifs, kit logos, Oasis band or album artwork, or song lyrics beyond "because, maybe".
- **Don't** add shadows or cards; the system is flat. The one exception is the lifted pill (see Elevation & Depth).
- **Don't** use a coloured border thicker than 1px on the side of a block.
