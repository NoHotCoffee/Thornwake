# Handoff: Thornwake — "Hearthstead" mobile RPG UI

## Overview

Thornwake is an idle/incremental mobile RPG: the player levels six skills (Combat, Woodcutting, Mining, Fishing, Cooking, Smithing), travels a node map, gathers resources on timers, fights monsters, cooks and smiths, trades at a stall, and works a quest board.

This handoff covers a full visual redesign of the existing single-file prototype (`thornwake_original.html`). The information architecture is unchanged except for one addition: a **Hero sheet** (character screen), reached by tapping the player's name in the status bar. The bottom nav stays at six items.

The direction is called **Hearthstead**: warm oiled-timber surfaces, honey amber accents, sage and teal for information, terracotta for danger. Panels are chamfered plate with a lit 2px accent rail down the left edge, colour-coded by skill. Progress bars read as molten metal with a bright leading edge. Every emoji in the original has been replaced with a custom flat glyph set.

## About the design files

The files in this bundle are **design references created in HTML** — prototypes showing intended look and behaviour, not production code to copy directly. The task is to **recreate these designs in the target codebase's existing environment** (React, Vue, SwiftUI, native, etc.) using its established patterns and libraries. If no environment exists yet, pick the most appropriate framework and implement there.

`Thornwake UI - Emberdark.dc.html` is a **design canvas**: eight 400×832px phone frames laid out side by side, each showing one screen in a representative state. It is not a runnable app — there is no game logic in it. `thornwake_original.html` is the working prototype with the real game logic and the old visuals; use it for behaviour, and the canvas for appearance.

Two earlier exploratory directions are included for context only (`direction-a-*`, `direction-c-*`). They were not chosen. Do not implement them.

## Fidelity

**High fidelity.** Colours, type, spacing, glyphs, and states are final. Recreate pixel-accurately using the codebase's own primitives. All measurements below are in CSS px at a 400px-wide viewport.

---

## Global shell

Every screen is a vertical flex column, full viewport height:

1. **Status bar (HUD)** — fixed at top, `flex-shrink: 0`
2. **Active-action strip** — optional, only present when a gathering/cooking action is running (see Travel)
3. **Content** — `flex: 1`, scrolls, `padding: 14px 13px`
4. **Bottom nav** — fixed at bottom, `flex-shrink: 0`

Frame background: `#332920`. Content background is a layered radial:
`radial-gradient(ellipse 130% 45% at 50% 0%, #3d3123, #332920 70%), #332920`
Combat overrides this to a warmer flush: `radial-gradient(ellipse 120% 50% at 50% 18%, #432f26, #332920 72%), #332920`.
Hearth uses `radial-gradient(ellipse 120% 40% at 50% 0%, #4a3a27, #332920 70%), #332920`.
Shop uses `radial-gradient(ellipse 130% 45% at 50% 0%, #373224, #332920 70%), #332920`.

### The chamfer

The signature shape. Two opposite corners are cut. Applied to cards, buttons, icon tiles, avatars.

```css
/* card, 11px cut */
clip-path: polygon(0 0, calc(100% - 11px) 0, 100% 11px, 100% 100%, 11px 100%, 0 calc(100% - 11px));
/* button, 9px cut */
clip-path: polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 9px 100%, 0 calc(100% - 9px));
/* small tile, 7-8px cut */
clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
/* avatar / combatant portrait — all four corners */
clip-path: polygon(14% 0, 86% 0, 100% 14%, 100% 86%, 86% 100%, 14% 100%, 0 86%, 0 14%);
/* HUD player avatar — softer octagon */
clip-path: polygon(22% 0, 78% 0, 100% 22%, 100% 78%, 78% 100%, 22% 100%, 0 78%, 0 22%);
```

If `clip-path` is impractical in the target environment, an 8-point border with 2px cut corners is an acceptable fallback; do not substitute `border-radius`.

### The accent rail

Every content card carries a 2px vertical bar on its left edge, inset from the chamfers, in the colour of whatever the card is about:

```css
position: absolute; left: 0; top: 11px; bottom: 11px; width: 2px;
background: <accent>; box-shadow: 0 0 9px <accent at 50-60% alpha>;
```

Card is `position: relative`. On the "ready to claim" quest the rail is 3px and glows harder (`0 0 14px`).

### Standard card

```css
background: linear-gradient(160deg, <light>, <dark>);
border: 1px solid <border>;
box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 2px 6px rgba(0,0,0,.6);
padding: 10-12px;
```

Card gradient/border pairs, by subject:

| Subject | Gradient | Border | Rail |
|---|---|---|---|
| Neutral | `#453828` → `#332a1f` | `#684f30` | `#cbb28a` |
| Combat | `#4a382b` → `#33261e` | `#644732` | `#c86a3a` |
| Woodcutting | `#3d402a` → `#313524` | `#615833` | `#8fbb5a` |
| Mining | `#3e3c28` → `#332c1f` | `#615833` | `#eda23c` |
| Fishing | `#3b3d2c` → `#302c20` | `#5d5433` | `#63a396` |
| Cooking | `#4a3a27` → `#34271c` | `#6b4a2c` | `#eda23c` |
| Smithing | `#453829` → `#342a20` | `#634a43` | `#c6a3d8` |
| Gold / shop | `#4c3c25` → `#352a1d` | `#83662f` | `#ffc46b` |
| Locked | `#373224` → `#2f291f`, `border: 1px dashed #5e4b2d`, `opacity: .5`, no rail | | |

### Bars

Every progress/health bar is a molten channel:

```css
/* trough */
height: 6-15px; background: #241c13; border: 1px solid #6b5436;
box-shadow: inset 0 2px 4px rgba(0,0,0,.9);
/* fill — absolutely positioned, inset 1px, width = percentage */
background: linear-gradient(180deg, <hi>, <mid> 40-45%, <lo>);
box-shadow: 0 0 12px <mid at 55%>;
/* diagonal sheen overlay, same width */
background-image: repeating-linear-gradient(115deg, rgba(255,255,255,.2) 0 3px, transparent 3px 9px);
/* leading edge — only on an actively running action */
left: calc(<pct> - 2px); width: 3px; background: <near-white>; box-shadow: 0 0 10-12px <hi>;
```

Fill ramps: HP `#ff9b6b → #d47340 40% → #94512c`. XP `#ffd28a → #e2952c`. Woodcutting `#d3eda8 → #8fbb5a 45% → #4a7229`. Mining/Cooking `#ffd0a4 → #eda23c 45% → #a86a1c`. Smithing `#e0cbe8 → #ad8bc6`.

On combat bars, the amount just lost is shown as a ghost segment immediately right of the fill: `background: rgba(255,120,90,.28)`.

### Section headers

Repeated throughout the content area:

```
[6×6px diamond, rotate(45deg), colour of the section, box-shadow 0 0 8px at 80% when accent]
[label — Cinzel 700, 11px, letter-spacing .22em, color #d0c0a1]
[1px rule, flex: 1, linear-gradient(90deg, #5c4830, transparent)]
gap: 9px; margin: 16-20px 0 11px;
```

---

## Screens

### 01 — Town

The home screen. Location blurb with a Rest & Heal action, then the six skill cards.

- **Location card** — neutral card, ember rail. Body copy 14px/1.6 `#c6b797`. Then a full-width primary green button: `linear-gradient(180deg,#7cad50,#4a7229)`, `border: 1px solid #4d7a33`, text `#f2f8ea` 700 13.5px, `letter-spacing: .11em`, uppercase, `padding: 12px`, 9px chamfer, `box-shadow: inset 0 1px 0 rgba(220,255,190,.3), 0 0 16px rgba(124,173,80,.22)`. Copy: "Rest & Heal".
- **Skill card** (×6) — 50×50px progress ring, then name + xp, then percentage. Layout: `display: flex; align-items: center; gap: 12px`.
  - Ring: SVG 50×50, `transform: rotate(-90deg)`. Track `circle r=21 stroke=#4a3a26 stroke-width=5.5`. Fill same geometry, skill colour, `stroke-linecap: round`, `stroke-dasharray: 131.9`, `stroke-dashoffset: 131.9 × (1 − progress)`.
  - Inside the ring, centred: a 28×28px tile, `linear-gradient(150deg, <tile-hi>, <tile-lo>)`, 1px skill-tinted border, holding the 15px skill glyph.
  - Level badge, bottom-right of the ring, offset `bottom:-3px; right:-4px`: `linear-gradient(180deg, <light>, <dark>)`, dark text, JetBrains Mono 700 9.5px, `padding: 0 5px`, `border: 1px solid #332920`, 3px chamfer.
  - Name: Cinzel 700 14.5px `#e8e2d6`. Sub: JetBrains Mono 10.5px `#b6a583`, format `1,240 / 2,180 xp`. Percentage: JetBrains Mono 700 11.5px in the skill's light tint.
  - **Near-max treatment** — when a skill is ≥90%: add `0 0 22px rgba(237,162,60,.09)` to the card shadow and a pulsing heat halo behind the ring: `inset: -7px; border-radius: 50%; background: radial-gradient(circle, rgba(237,162,60,.32), transparent 66%); animation: heat 2.4s ease-in-out infinite`.

### 02 — Hero sheet (NEW)

Replaces the HUD with a back-header, keeps the bottom nav.

- **Header** — `linear-gradient(180deg,#4c3d2a,#372c20)`, 12px 13px, `display: flex; gap: 11px`. 34×34px back button (8px chamfer, `linear-gradient(180deg,#4d3e2b,#332a1f)`, `border: 1px solid #7a6339`, 16px chevron-left at stroke-width 2.4). Title "The Hero's Ledger" Cinzel 700 17px `#f0ebe0`; sub "ADVENTURER · COMBAT LV 12" JetBrains Mono 9.5px `.12em` `#a69573`. 2px ember gradient hairline along the bottom edge, same as the HUD.
- **Portrait** — 150px wide, 196px tall, 14px chamfer, `radial-gradient(ellipse 70% 60% at 50% 32%, #4f402d, #231b14 78%)`, `border: 1px solid #72593c`, `inset 0 0 40px rgba(0,0,0,.9)`. A warm floor wash across the bottom 52%: `linear-gradient(180deg, rgba(237,162,60,0), rgba(237,162,60,.13))`. 112px hero glyph centred, `drop-shadow(0 0 16px rgba(255,140,60,.28))`. Equipped-weapon glyph top-left in `#ffc46b`; empty armour slot top-right as a dashed-stroke shield in `#5c4830`. HP label + 9px bar pinned to the bottom over a `rgba(8,10,12,.92)` scrim.
- **Stat cards** — Attack and Defence stacked to the right of the portrait, `gap: 8px`. Label JetBrains Mono 8.5px `.14em` `#bfaf8c`; value JetBrains Mono 700 26px (Attack `#ff8f6e` with `text-shadow: 0 0 14px rgba(240,160,80,.35)`, Defence `#b9cf95`); a 26px glyph in a dimmed tint on the right; derivation line JetBrains Mono 9.5px `#a69573`, e.g. "12 level + 14 weapon".
- **Carried** — two equipment slots side by side, `gap: 9px`. Filled slot uses the gold card with a 38px glyph tile; slot label 8.5px `.14em`, item name Cinzel 700 13px, effect line JetBrains Mono 10px `#ffc46b`. Empty slot: `#2f291f` background, `1px dashed #5c4830`, dashed inner tile, all text `#726445`, name "Empty", hint "buy at the stall".
- **Ledger of skills** — a table on `#271f17`, `border: 1px solid #4a3a22`, `inset 0 2px 8px rgba(0,0,0,.8)`. Each row `padding: 8px 10px`, `gap: 9px`, divided by `1px solid #2f2921`: a 2px×22px colour chip, 16px glyph, name (13px `#dccfb6`), a 74px 5px mini-bar, then level right-aligned in JetBrains Mono 700 13px. The active skill row gets a tinted background (`rgba(200,106,58,.06)` for Combat) and its name goes `#e8e2d6` 600.
- **Three stat tiles** — Foes Felled / Quests Done / Places Known, `flex: 1` each, `#271f17` + `1px solid #4a3a22`, label 8.5px, value JetBrains Mono 700 17px.

### 03 — Travel

- **Active-action strip** (between HUD and content) — `#3d3123`, `border-bottom: 1px solid #684f30`, `padding: 8px 13px`, `gap: 9px`: resource glyph, resource name (11.5px 600), a 6px inline progress bar, and a small STOP button (`#403322`, `1px solid #7a6339`, JetBrains Mono 700 9px `.1em`, `padding: 4px 8px`). This strip persists across screens while an action runs — it is how the player knows something is ticking while they browse elsewhere.
- **Map** — 400×285 SVG in a `#271f17` well with `1px solid #5c4830` and 4px padding.
  - Background `radial-gradient` centred at 50%/72%: `#3e3124` → `#2b231b`.
  - Four terrain regions as organic blob paths, each a vertical gradient with a 1px stroke: forest `#324224 → #233019` stroke `#5b8148`; rock `#4a4433 → #332a18` stroke `#7b6d4a`; water `#3b5a54 → #2a403c` stroke `#6f9a90`; fallow/bramble `#5c3c2c → #3a2920` stroke `#a05c3c`, dashed `6 4`. Terrain hue must stay distinguishable — these four are load-bearing, not decorative.
  - Sparse texture ticks over each region at `opacity: .45`.
  - Roads: known routes `#eda23c` 2.4px round-capped; unknown routes `#5c5033` 2px `stroke-dasharray: 3 7`.
  - Nodes are 24px hexagons (`M x,y-12 L x+10,y-6 L x+10,y+6 L x,y+12 L x-10,y+6 L x-10,y-6 Z`), fill a dark tint of their biome, stroke the biome accent at 1.5px, with a 14px glyph inside and a Cinzel 700 9px label offset 12px away. Label stroke-halo: `paint-order: stroke; stroke: #2b231b; stroke-width: 3.5`.
  - Thornwake (home) is larger, gold-stroked at 1.8px, label 10px. The current node gets a pulsing ring: `circle r=17`, biome stroke, `animation: pulsering 1.9s ease-out infinite` from `scale(.75) opacity(.85)` to `scale(1.5) opacity(0)`, `transform-origin` at the node centre.
  - Undiscovered nodes: `#282216` fill, `1px dashed #5c5033`, a lock glyph, label "???", whole group at `opacity: .62`.
  - 15 nodes total, 10 known. Compass rosette bottom-right at `opacity: .65`.
- **Location card** — glyph + name (Cinzel 700 16px), blurb 13.5px/1.6, then a skill line: JetBrains Mono 10.5px in the skill colour, format `WOODCUTTING LV 31 · 1,240/2,180 XP`.
- **Resource card** — 44px glyph tile, name + `+22 xp · yields Willow Log`, and a Stop/Gather button. Below it the molten bar with the leading edge. Terracotta button = stop (`linear-gradient(180deg,#c26a36,#7d4a1e)`, `1px solid #7d4a22`, `#ffe8d8`); gathering starts with the same button shape in the biome colour.
- **Locked resource** — locked card treatment, lock glyph, requirement in JetBrains Mono 11px: `REQUIRES WOODCUTTING 50`.

### 04 — Combat

- Two 104×104px combatant portraits either side of a `VS` (Cinzel 900 14px `#c86a3a`, `text-shadow: 0 0 14px rgba(196,110,54,.8)`, offset down 40px). Player portrait: `radial-gradient(circle at 42% 30%, #3b452c, #20241a 76%)`, `2px solid #5d6340`; a warm uplight overlay `radial-gradient(circle at 50% 120%, rgba(237,162,60,.16), transparent 60%)`. Enemy: `radial-gradient(circle at 42% 30%, #523830, #3a2920 76%)`, `2px solid #7a4632`, `0 0 22px rgba(196,120,60,.22)`. 58px glyph at stroke-width 1.5.
- Name Cinzel 700 13px, then an 11px HP bar with the ghost-damage segment, then `31 / 68` in JetBrains Mono 10px `#bfaf8c`.
- **Floating damage number** — absolutely positioned above the struck portrait, JetBrains Mono 700 26px `#ffd0b0`, `text-shadow: 0 0 18px rgba(240,150,70,1), 0 2px 4px rgba(0,0,0,.9)`, `animation: emberrise 1.4s ease-out` (rises 16px, fades, scales .6→1). Fire once per hit.
- **Combat log** — fixed 126px tall, `#1d1711`, `1px solid #4a3a22`, `inset 0 2px 10px rgba(0,0,0,.95)`, JetBrains Mono 11.5px/1.8. Lines fade with age: newest `#ffd6a0` with a soft glow, then `#bfaf8c`, `#a69573`, `#63563c`, oldest `#877750`. Newest at the bottom.
- **Action row** — Attack takes `flex: 2` (terracotta, 14px, `.13em`, uppercase) with a slow specular sweep: an absolutely positioned 40%-wide `linear-gradient(90deg, transparent, rgba(255,220,190,.22), transparent)` running `sweep 3.2s ease-in-out infinite` (translateX −100% → 220%; parent needs `overflow: hidden`). Eat is green-tinted (`#3a4526 → #252e16`, text `#b8dd86`), Flee neutral. Both `flex: 1`.
- **Also prowling here** — enemy roster cards: 42px portrait tile, name, `LV 35 · 100 HP`, a difficulty chip (`DEADLY` = dark text on `#c86a3a`, JetBrains Mono 700 8.5px `.1em`, `padding: 1px 5px`), and a Fight button.

### 05 — Hearth (cooking + smithing)

- **Location card** — cooking card, ember rail, with a pulsing heat halo behind the 24px flame glyph (`heat 2.2s`).
- **Cook card** — as the resource card, but the ingredient tile gets a flame licking up from beneath: a 16×8px `radial-gradient(ellipse at 50% 100%, rgba(255,140,60,.85), transparent 70%)` at `bottom: -4px`, `animation: heat 1.6s ease-in-out infinite`. Sub-line format `+8 xp · 14 raw in the satchel`.
- **Nothing to cook** — same card, unglowing rail (`#7a4a1e`), sub-line `+3 xp · none in the satchel`, and a disabled button: `#372c20`, `1px solid #4c3a22`, text `#7b6c4c`, no shadow.
- **Emberforge section** — smithing cards for smelting bars and forging gear. Purple primary button: `linear-gradient(180deg,#ad8bc6,#75568c)`, `1px solid #7f6690`, text `#f4ecff`, `box-shadow: inset 0 1px 0 rgba(240,220,255,.35), 0 0 16px rgba(169,127,208,.28)`. Recipe line mixes costs inline: `+36 ATK · 5 Mythril Bars · 800g` with the gold amount in `#ffc46b` JetBrains Mono.

### 06 — Stall (shop)

- **Vendor card** — gold card, stall glyph, name, one line of vendor character.
- **Buy/Sell toggle** — two equal halves in a `#271f17` box with `1px solid #5c4830`. Active half: `linear-gradient(180deg,#ffd28a,#d09a2c)`, text `#241c04` 700 12.5px `.12em` uppercase. Inactive: transparent, text `#b6a583`.
- **Item row** — glyph tile, name, effect line (`+14 ATK` gold, `+6 DEF` sage), then a right-aligned price (coin glyph + JetBrains Mono 700 14px `#ffc46b`) with a Buy button beneath it. Gold primary button: `linear-gradient(180deg,#ffd28a,#d09a2c)`, `1px solid #9a7420`, text `#241c04`, `inset 0 1px 0 rgba(255,245,210,.6), 0 0 14px rgba(255,180,80,.25)`.
- **Already equipped** — a `HELD` chip (dark text on `#cbb28a`) next to the name; price replaced by an em dash in `#a69573`; no button.
- **Level-gated** — locked card treatment, `REQUIRES COMBAT 45`.
- **The Ledger (sell side)** — compact table rows: glyph, `Willow Log ×42` (the count in JetBrains Mono `#a69573`), total value `420g` in `#ffc46b`, and a `SELL ALL` button (`#403322`, `1px solid #7a6339`, JetBrains Mono 700 9.5px).

### 07 — Quest board

Header shows progress: `THE BOARD — 3 OF 5 SETTLED`. Four card states, in this order:

1. **Ready to claim** — brightest card on the board: `#503f24 → #38291a`, `border: 1px solid #94702d`, `0 0 26px rgba(255,180,80,.14)`, 3px gold rail glowing at `0 0 14px`. A `READY` chip with a check glyph on gold. Objective panel: `#211a13`, `1px solid #725729`, label row `DEFEAT 8 BANDITS` / `8 / 8`, then a segmented tally — one `flex: 1` 5px segment per required kill, `gap: 3px`, filled `#ffc46b` with `0 0 6px` glow, unfilled `#4a3a22`. Reward line JetBrains Mono 10px: `REWARD — 340 GOLD · 260 COMBAT XP · NEW LOCATION`. Full-width gold Claim Reward button.
2. **In hand** — neutral card, sage `#cbb28a` rail and chip (`IN HAND`), unfilled tally.
3. **Settled** — collapsed to a single row: `#2b2219`, green rail, check glyph, title in `#a69573` with `line-through` in `#6c5b3b`, `SETTLED` on the right.
4. **Locked** — dashed card, lock glyph, title `#726445`, prerequisite in JetBrains Mono 10px: `FINISH "INTO THE DEEP" FIRST`.

### 08 — Satchel

- **Item grid** — `grid-template-columns: repeat(4, 1fr)`, `gap: 8px`, `aspect-ratio: 1` tiles, 9px chamfer. Filled tiles use their resource's card gradient + border, a 27px glyph, and a count bottom-right (JetBrains Mono 700 10.5px `#f0ebe0`, `text-shadow: 0 1px 2px #000`). Empty slots: `#271f17`, `1px dashed #4a3a22`, nothing inside. Show 12 slots.
- **New-item marker** — a 5px ember diamond at `top: 3px; left: 4px` with `0 0 6px` glow, plus `0 0 16px rgba(237,162,60,.14)` on the tile.
- **Consumable card** — cooked-food card with an Eat button (green primary), sub-line `6 in hand · mends 14 HP`.
- **Worn** — the same two equipment slots as the Hero sheet, in compact form (36px tiles, no effect line).
- **Toast** — centred pill: `#3a3a20ee`, `1px solid #d09a2c`, text `#ffd28a` Cinzel 700 12.5px, `padding: 9px 16px`, 9px chamfer, `box-shadow: 0 4px 18px rgba(0,0,0,.6), 0 0 22px rgba(255,180,80,.15)`, led by a 5px ember diamond. Copy pattern: `Smithing level up — now 67`. Should appear on level-up, quest completion, and rare drops, then auto-dismiss.

---

## Status bar (HUD)

`linear-gradient(180deg,#4c3d2a,#372c20 60%,#2e251b)`, `border-bottom: 1px solid #000`, `box-shadow: inset 0 1px 0 rgba(255,255,255,.07), 0 3px 10px rgba(0,0,0,.7)`, `padding: 11px 13px 10px`. A 2px `linear-gradient(90deg, transparent, #eda23c, transparent)` at `opacity: .5` sits on the bottom edge.

- **Left, tappable — this is the Hero sheet entry point.** 36px avatar (octagon chamfer, `linear-gradient(145deg,#4f402d,#2c2318)`, `1px solid #7a6339`, `0 0 12px rgba(237,162,60,.14)`, 19px hero glyph in `#ffc78f`). Then the player name (Cinzel 700 15.5px `#f0ebe0`, `text-shadow: 0 0 14px rgba(255,140,60,.22)`) followed by a 9px chevron-right in `#a69573` at stroke-width 3 — the affordance. Beneath: a combat-level chip (`CB 12`, dark text on `#cbb28a`, JetBrains Mono 700 9px `.1em`) and the current location in 10.5px uppercase `#a69573`, truncating with ellipsis.
- **Right** — coin glyph, `GOLD` label (JetBrains Mono 8px `.16em`), amount (JetBrains Mono 700 16px `#ffc46b`, `text-shadow: 0 0 10px rgba(255,170,60,.3)`), behind a `1px solid #4c3a22` divider with `padding-left: 10px`.
- **Bars** — HP (15px, 4px chamfer on opposite corners, value `43 / 68` centred in white 9.5px) and XP (6px, no label text), each preceded by a 19px-wide JetBrains Mono 700 9px label.
- **Rivet row** — five 4px `#5c4a30` dots, `justify-content: space-between`, `padding: 0 6px 4px`, each with `inset 0 1px 1px rgba(255,255,255,.25)`.

## Bottom nav

`linear-gradient(180deg,#423527,#302620)`, `border-top: 1px solid #6b5436`, `box-shadow: 0 -2px 10px rgba(0,0,0,.7)`, `padding: 6px 2px 8px`. Six equal `flex: 1` items: Town, Travel, Cook, Shop, Quests, Bag. Each is a centred column, `gap: 3px`, `padding: 6px 0` — 21px glyph over a 9px 700 `.07em` uppercase label.

- Active: colour `#ffd6a0`, plus a 2px `#eda23c` bar pinned to the item's top edge, inset 24% on both sides, `box-shadow: 0 0 8px rgba(237,162,60,.8)`.
- Inactive: colour `#a69573`.
- Notification badge: 7px ember diamond at `top: 3px; right: 23%`, `box-shadow: 0 0 7px rgba(237,162,60,.9)`. Shown on Quests when a quest is claimable.

At 400px this gives ~66px targets; at 375px ~62px. Keep six items — the Hero sheet deliberately does not get a tab, so it does not go to seven.

---

## Interactions & behaviour

Behaviour is unchanged from `thornwake_original.html`; read it for exact rules. Summary:

- **Gathering / cooking / smelting** — tapping an action starts a timer loop; each tick grants xp and an item. The card's bar animates, the leading edge appears, the HUD XP bar advances, and the active-action strip appears at the top of every screen. The button becomes Stop. Starting a new action cancels the old one.
- **Combat** — turn ticks on an interval. Each exchange appends to the log and fires the floating damage number. Player death should route back to Town at partial HP. Fleeing ends the encounter.
- **Navigation** — the six nav items swap the content pane; the HUD and nav persist. Tapping the HUD name pushes the Hero sheet (a full-screen push with a back affordance, not a tab). Tapping a known map node travels there; unknown nodes are inert.
- **Progression gates** — locked resources, shop items and quests render in the locked treatment with an explicit requirement string. They must be visible, not hidden, so the player can see what they are working toward.
- **Toasts** — level-up, quest claim, and rare drops. Auto-dismiss after ~2.5s.

### Animations

| Name | Use | Spec |
|---|---|---|
| `heat` | Near-max skill halo, hearth flame | `opacity: .45 → 1 → .45`, 1.6–2.4s, `ease-in-out`, infinite |
| `emberrise` | Floating damage number | `translateY(4px) scale(.6) opacity(0)` → `opacity(.9)` at 30% → `translateY(-16px) scale(1) opacity(0)`, 1.4s, `ease-out` |
| `sweep` | Specular pass over the Attack button | `translateX(-100% → 220%)`, 3.2s, `ease-in-out`, infinite |
| `pulsering` | Current map node | `scale(.75) opacity(.85)` → `scale(1.5) opacity(0)`, 1.9s, `ease-out`, infinite |

Bar fills should transition their width, ~120ms linear, so ticks read as motion rather than jumps. Respect `prefers-reduced-motion`: drop `heat`, `sweep` and `pulsering`; keep bar transitions and damage numbers.

## State

Per the original prototype: player (name, hp, maxHp, gold, combat level and xp), a skill record per skill (level, xp), inventory (item → count), equipment (weapon, armour), current location, discovered locations, the active action (kind, target, elapsed), the active combat encounter (enemy, hp, log), and quest progress. Plus one new UI flag for whether the Hero sheet is open. No data fetching — everything is local, and should persist across reloads.

## Design tokens

**Surfaces** `#241d17` page · `#332920` frame · `#3d3123` raised · `#271f17` well · `#241c13` bar trough
**Borders** `#4a3a22` subtle · `#5e4b2d` default · `#684f30` card · `#6b5436` strong · `#7a6339` control
**Text** `#f0ebe0` primary · `#e8e2d6` heading · `#ede3cd` bright · `#dccfb6` body · `#c6b797` prose · `#bfaf8c` label · `#b6a583` muted · `#a69573` dim · `#8c7c58` disabled · `#7b6c4c` deep-disabled
**Accent — ember/honey** `#eda23c` primary · `#ffd6a0` light · `#ffc78f` mid · `#f5ad52` · `#a86a1c` dark
**Accent — gold** `#ffc46b` · `#ffd28a` light · `#d09a2c` mid · `#9a7420` dark
**Skills** Combat `#c86a3a` (light `#eeb98e`) · Woodcutting `#8fbb5a` (`#cfeaa6`) · Mining `#eda23c` (`#ffcd96`) · Fishing `#63a396` (`#a8d8cf`) · Cooking `#eda23c` (`#ffcd96`) · Smithing `#c6a3d8` (`#e0cbe8`)
**Semantic** danger `#c26a36` · success `#7cad50` · neutral chip `#cbb28a` · locked `#726445`
**Terrain** forest `#324224`/`#5b8148` · rock `#4a4433`/`#7b6d4a` · water `#3b5a54`/`#6f9a90` · bramble `#5c3c2c`/`#a05c3c`

**Type** — Cinzel 500/700/900 for names, titles, section headers and buttons that read as objects. Barlow 400/500/600/700 for prose and UI labels. JetBrains Mono 400/600/700 for every number, stat, requirement and log line. The rule: if it is a quantity or a machine fact, it is mono.
**Type scale** 8px · 8.5px · 9px · 9.5px · 10px · 10.5px · 11px · 11.5px · 12px · 12.5px · 13px · 13.5px · 14px · 14.5px · 15.5px · 16px · 17px · 26px
**Tracking** `.22em` section headers · `.13em` primary buttons · `.1em` chips and mono labels · `.07em` nav · `.03em` player name
**Spacing** 3 · 5 · 6 · 8 · 9 · 10 · 11 · 12 · 13 · 14 · 16 · 18 · 20
**Corners** none — chamfers only, at 3 / 7 / 8 / 9 / 10 / 11 / 12 / 14px
**Shadows** card `inset 0 1px 0 rgba(255,255,255,.06), 0 2px 6px rgba(0,0,0,.6)` · well `inset 0 2px 8px rgba(0,0,0,.8)` · trough `inset 0 2px 4px rgba(0,0,0,.9)` · frame `0 20px 50px rgba(0,0,0,.7)` · glow `0 0 <9–26>px <accent at .1–.3>`

## Assets

No raster assets, no icon font, no external images. The only external dependency is Google Fonts (Cinzel, Barlow, JetBrains Mono).

**Icons** — 32 hand-drawn glyphs on a 24×24 grid, defined once as `<symbol>` elements in a hidden SVG sprite at the top of the document and instanced with `<use href="#g-name">`. Each glyph is built from a translucent body (`fill: currentColor; opacity: .2`) plus its outline stroke, with occasional solid `currentColor` accents. Consumers set `fill: none; stroke: currentColor; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round`, so a glyph takes its colour from the surrounding text colour.

`g-hero g-coin g-house g-map g-flame g-stall g-scroll g-bag g-axe g-pick g-rod g-fish g-log g-ore g-bar g-meal g-hammer g-anvil g-sword g-shield g-lock g-tree g-rock g-wave g-skull g-beast g-ghost g-construct g-dragon g-bandit g-rat g-check`

Copy the sprite verbatim out of `Thornwake UI - Emberdark.dc.html` (the `<defs>` block near the top) rather than redrawing it. If the target platform cannot use an SVG sprite, extract each symbol into its own file or component, preserving the `currentColor` + `fill: none` contract.

## Files

| File | What it is |
|---|---|
| `Thornwake UI - Emberdark.dc.html` | **The design reference.** Eight phone frames, one per screen, plus the glyph sprite. Open in a browser. |
| `thornwake_original.html` | The working prototype: real game logic, old visuals. Source of truth for behaviour. |
| `direction-a-illuminated-ledger.dc.html` | Rejected exploration (parchment/ledger). Context only. |
| `direction-c-mossbound-woodcut.dc.html` | Rejected exploration (flat woodcut print). Context only. |
| `support.js` | Runtime for the `.dc.html` design files. Needed to open them; not part of the design. |

The `.dc.html` files are design documents — do not port their structure. Read them for values and treatments, and rebuild in the target framework.
