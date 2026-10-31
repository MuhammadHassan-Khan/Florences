# Reference Analysis — oridomai.com (Oridom AI)

Phase-1 analysis of the reference site, captured live (viewport screenshot + computed styles)
to ground the visual direction for this build.

## Measured styles (computed)

| Token                | Reference value                          |
| -------------------- | ---------------------------------------- |
| Body background      | `rgb(247, 247, 244)` (warm off-white)    |
| Body text            | `rgb(28, 28, 40)` (near-navy ink)        |
| Hero                 | Dark inverted block on the light page    |
| H1 font              | Newsreader (serif), ~49px, regular weight |
| Body font            | Geist, 17px                              |
| Primary CTA          | Gold pill button `rgb(190, 148, 72)`, dark text |
| Header               | Fixed, transparent, ~61px tall, pill-shaped container |
| Layout               | ~790px content column, 9 stacked sections |
| Structure            | Nav · hero · mission · services · demo · proof · FAQ · contact · footer |

## Patterns adopted

1. **Inverted hero on a dark canvas** — the hero owns a deep background while content
   sections alternate light/dark bands. *(We inverted the whole palette: charcoal base with
   off-white type, per the project brief, instead of the reference's light base.)*
2. **Fixed header with a floating pill container** — inset from the viewport edges,
   backdrop-blurred, gains presence over content; hamburger + section nav below desktop.
3. **Section rhythm** — eyebrow → headline → lead → content grid; alternating background
   bands with hairline borders between them.
4. **Pill CTAs** — fully rounded buttons, one solid accent + one ghost outline.
5. **FAQ accordion** — full-width rows with chevrons, thin dividers.
6. **Numbered/pill detail chips** and generous whitespace (spacing scale 5 → 16).

## Deliberate differences (brief-driven)

| Reference                     | This site                                          |
| ----------------------------- | -------------------------------------------------- |
| Centered hero copy            | **Split hero**: copy left, founder portrait right (portrait is the brief's primary visual) |
| Serif display headlines       | **Modern sans** headlines (brief requirement)      |
| Gold accent on warm off-white | **Lime accent on charcoal** — restrained, technical |
| Services/proof sections       | Training, Workshops+Form, Demo, Products, Projects, Founder, Journey, FAQ, Contact |
| "What happens next" steps     | Kept (honest version) in the Contact section        |
| Real links/contact everywhere | Honest "not configured yet" states until supplied  |

## Notes

- No copy, branding assets, images, or code were reused from the reference — only layout
  ideas and design *relationships* (inverted hero, pill header, section rhythm).
- The reference's proof/statistics sections were intentionally **not** mirrored: this site
  publishes no statistics until real ones exist.
