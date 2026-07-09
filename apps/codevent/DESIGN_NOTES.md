# codevent — Design Notes

Rebuild of the codevent.co.kr landing page ("마닐라 COD 대박 프로모션"), originally
published with **Figma Sites**. V1 of this app vendored the Figma-rendered DOM verbatim;
it was then rebuilt by hand (current version) because the original shipped **every string
as flattened SVG paths** and carried Figma's baked frame heights (≈1,400px of dead black
below the footer).

## Current architecture

- [src/pages/index.astro](./src/pages/index.astro) — the whole page. All copy is real,
  selectable HTML text, transcribed from the Figma Sites JSON (layer names carry the full
  strings) and verified against live-site screenshots. Original spelling/typos preserved
  verbatim (e.g. 방문날자, 즐길실수, 카카오톨, 통신판매매업).
- [src/styles/global.css](./src/styles/global.css) — Tailwind v4 theme:
  - **Type hierarchy**: fluid `--text-*` tokens (display / h1 / h2 / eyebrow / lead /
    body / caption / legal) that clamp from the 375px design to the 1280px design.
    Change a size once there and it applies page-wide.
  - Palette tokens sampled from the original (`ink`, `night`, `paper`, `brand`, `mint`, `flame`).
  - `word-break: keep-all` on body — Korean wraps at spaces, never mid-word.
  - `.reveal` — appear-on-scroll (fade + rise, 0.6s OUT_CUBIC), driven by a small
    IntersectionObserver script in index.astro; disabled under `prefers-reduced-motion`.
- Font: **Pretendard Variable** (npm `pretendard`, dynamic-subset CSS) — repo convention.
  The original mixed several baked fonts (incl. a licensed batang); Pretendard replaces
  them with one consistent family.
- Layout is natural document flow — page height is content-driven, so the original's
  trailing black void is gone.

## Assets

- **Raster (R2)**: 20 images, converted PNG → WebP (q92), bucket `singlesad-assets`,
  prefix `codevent/`, via `PUBLIC_ASSETS_BASE_URL`
  (`https://pub-1746e96cddfa492aa447bff1169a1f62.r2.dev`).
- **Local SVGs** ([public/assets/](./public/assets/)): only 7 true graphics —
  `step-01…06.svg` (progress rings) and `icon-discount-arrow.svg`. Note these exports
  have `width/height="100%"` + `preserveAspectRatio="none"` baked in, so always give
  them explicit CSS dimensions (`w-8 h-8` etc.), never `w-auto`.

## Links (unchanged from original)

- Hero CTA "프로모션 참여하기" → `https://qr.kakao.com/talk/qdHvdBS9RxXfVO7VbZQK.a.fDwg-`
- Floating Kakao button, Q&A "카카오톡 문의하기", final "프로모션 참가하기"
  → `https://open.kakao.com/o/s3SKR3fi` (all `target="_blank"`)

## Intentional deviations from the original render

1. Real text instead of ~160 flattened text-SVGs; one font family; fluid type scale.
2. No trailing dead space (original footer had 800px baked bottom padding).
3. **혜택02 "NAIA 공항 픽업" section omitted**: it exists in the Figma file but is
   clipped invisible at *all* breakpoints on the live site (parent frame height excludes
   it — verified 375/800/1280). Its copy + images (`04_benefit02_naia_t1/t3.webp` on R2)
   are ready if the client wants it restored.
4. Fun-cards section: original had two half-clipped duplicate rows; rebuilt as a clean
   2-col (mobile) / 4-col (desktop) grid of the four unique cards.
5. Hover micro-states from Figma are approximated (simple scale/color transitions).
7. Organization pass (client-approved UI tweaks, no content removed): hero offer grouped
   in a translucent price panel with baseline-aligned tabular prices; hero CTA shown at
   every breakpoint; eligibility block styled as a card; "2박/3박 숙박권" discount line
   visible on mobile too; numbered STEP labels; visible "A." markers in Q&A; long
   paragraphs left-aligned; consistent rounded corners on content images; footer
   restructured as a label/value ledger (stacked on mobile, two pairs per row on md+ —
   the original's ㅣ separators became grid structure).
6. `robots: noindex` kept to match the original — remove in index.astro when the new
   domain should be indexed. `og:url` still points at codevent.co.kr; update with the
   new domain.

## Source-of-truth extraction (for future re-syncs)

Figma Sites exposes page data at `https://codevent.co.kr/_json/<bundle>/_index.json`
(node tree, full text in layer names, links, image refs) and assets at
`/_assets/v11/<hash>.<ext>`. Composite SVGs were transcribed by rendering them with
headless Chrome; layouts verified against full-page screenshots of the live site at
375/800/1280.
