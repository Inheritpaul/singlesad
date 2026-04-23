# firstprusiosuncheon — Design Notes

Synthesis of the four Figma frames (file `pMwKjLwKwbAJknj9caMlNU`) plus Paul's clarifications (Part A/B of the Phase 2 brief).

Frames read:
- Mobile 390 — node `69:12549`
- Tablet 1024 — node `69:5412`
- Desktop 1440 — node `60:89` (canonical)
- Large 1920 — node `69:122`

**Decisions** (settled — no longer open questions):
- Desktop section order is used at all breakpoints.
- Environment is its own distinct section (not merged into Overview).
- Single hero image, no carousel.
- Legal typo `2ㅔ36조` corrected to `제26조`.
- R2 paths preserve Figma layer names verbatim (including the `84D/02_type_84B_*.webp` filename pattern — designer typo preserved by instruction).
- Font: `@fontsource-variable/pretendard` npm package.
- No `<form>` elements; only phone (`tel:010-9986-9830`) and KakaoTalk (`https://google.com`) links as placeholder URLs.

---

## 1. Section plan (top → bottom)

Canonical order used at every breakpoint.

| # | id | Section | Purpose |
|---|---|---|---|
| 1 | — | Header (dark teal) | Logo + "청약 및 분양 문의하기" CTA + phone/kakao contacts |
| 2 | — | Hero | Full-bleed building photo, builder logos, "순천 푸르지오 더 퍼스트" headline, decorative dot pattern |
| — | — | **Sticky secondary nav** (visible on all breakpoints) | Anchor links to #brand / #overview / #type / #utility / #contact. Offset 100px base, 60px md+ |
| 3 | — | Benefits (brown gradient) | "주인이 될 기회" headline, two benefit cards (1.5억 / 입주 축하금), repeat phone + kakao CTAs. Laurel wreaths flanking headline |
| 4 | `brand` | Brand | THE BRAND heading, tagline, "브랜드 파워" 01–04 numbered achievements |
| 5 | `overview` | Overview / PRIDE6 | OVERVIEW heading, 6 PRIDE feature cards (icon + title + desc), detail-spec table |
| 6 | — | Surrounding Environment | "순천 푸르지오 주변 환경" — 5-row list + shared map image |
| 7 | `type` | Type | TYPE heading, intro copy, 7 unit-type cards (84A/B/C/D, 111A/B/C) |
| 8 | `utility` | Utility & Infra | UTILITY & INFRA heading, 3 feature cards + 3 facility photos |
| 9 | `contact` | Footer / Contact | Repeat CTA, site + model-house addresses, 시행/시공 logos, project-summary line, legal disclaimers, footer map |

---

## 2. Responsive behaviour per section

Defaults = mobile 390. `md:` ≥768. `xl:` ≥1280. `2xl:` ≥1920. Content widths: `max-w-[1200px]` on xl, `max-w-[1400px]` on 2xl, centered `mx-auto`. Horizontal gutters: `px-5` (20px) on base, `px-[60px]` on md+.

| Section | base (mobile) | md: (tablet) | xl: (desktop) | 2xl: (large) |
|---|---|---|---|---|
| Header | 1-line top bar; phone + kakao on 40px secondary bar below | single 60px bar, all inline | same | same |
| Sticky nav | visible, `sticky top-[100px]` | `sticky top-[60px]` | same | same |
| Hero | 390-wide image, headline beneath | 1024-wide image, overlay text | full-bleed, 1200px content | full-bleed, 1400px content |
| Benefits | 1-col (cards stacked) | 2-col | 2-col @ 1200 | 2-col @ 1400 |
| Brand | stacked teal-left-text → white-right-list | 2-col split | 2-col split | 2-col split |
| PRIDE6 | 1-col (6 cards stacked) | 2-col | 3-col + adjacent spec table + floor plan | 3-col @ 1400 |
| Environment | **1-col list (5 rows) then full-width map below** | **2-col: 5-row list left, shared map right** | 2-col | 2-col @ 1400 |
| Type | **7 cards stacked vertically at all breakpoints**. Gallery inside the 4 gallery-bearing cards (84A/84D/111A/111C) is a horizontal scroll-snap strip on every breakpoint | same | same | same |
| Utility & Infra | 1-col (photos + 3 cards stacked) | 2-col | 3-col cards + hero facility photo | 3-col @ 1400 |
| Footer | stacked | 2-col (contact left, map right) | 2-col | 2-col @ 1400 |

Smooth scroll: `scroll-behavior: smooth` on `<html>`, `scroll-padding-top: 100px` base / `60px` md+.

---

## 3. Asset inventory

All raster assets load from `${import.meta.env.PUBLIC_ASSETS_BASE_URL}/firstprusiosuncheon/<path>`. Paths preserved verbatim from Figma layer names.

### 3.1 Overview, Environment, Utility, Footer — rasters

| # | Section | Path (relative to firstprusiosuncheon/) | Notes |
|---|---|---|---|
| 1 | Hero | `01_overview_prusio01.webp` | Full-bleed hero |
| 2 | PRIDE6/misc | `01_overview_prusio02.webp` | Site overview |
| 3 | PRIDE6/misc | `01_overview_prusio03.webp` | Floor plan illustration |
| 4 | Environment (INFRA) | `01_overview_prusio04.webp` | Thumbnail |
| 5 | Environment (TRAFFIC) | `01_overview_prusio05.webp` | Thumbnail |
| 6 | Environment (PLAN) | `01_overview_prusio06.webp` | Thumbnail |
| 7 | Environment (GREEN) | `01_overview_prusio07.webp` | Thumbnail |
| 8 | Environment (EDU) | `01_overview_prusio08.webp` | Thumbnail |
| 9 | Environment (shared map) | `01_overview_prusio09.webp` | Large map image shown once to the right of the 5-row list (md+) or below (base) |
| 10 | Type header | `02_type_01.webp` | Section intro image |
| 11 | Utility | `03_utility_01.webp` | Facility hero |
| 12 | Utility | `03_utility_02.webp` | Secondary |
| 13 | Utility | `03_utility_03.webp` | Secondary |
| 14 | Footer | `04_footer_map.webp` | Site + model-house map |
| 15 | Footer | `04_footer_koreatrust-logo.webp` | Korea Trust certification logo |

### 3.2 Type card assets (per type)

Exact paths per Figma layer names. Only types 84A, 84D, 111A, 111C have horizontal-scroll galleries inside their card. The 84D gallery filenames use an `_84B_` prefix — **not a typo on my end, exactly as Figma labels them** (designer organizational quirk).

| Type | Illustration | Location map | Gallery photos (N images) |
|---|---|---|---|
| 84A | `84A/02_type_illustration_84A.webp` | `84A/02_type_map_84A.webp` | `84A/02_type_84A_01.webp` … `84A/02_type_84A_19.webp` (19) |
| 84B | `02_type_illustration_84B.webp` | `02_type_map_84B.webp` | — (no gallery) |
| 84C | `02_type_illustration_84C.webp` | `02_type_map_84C.webp` | — (no gallery) |
| 84D | `84D/02_type_illustration_84D.webp` | `84D/02_type_map_84D.webp` | `84D/02_type_84B_01.webp` … `84D/02_type_84B_16.webp` (16) — note `_84B_` prefix per Figma |
| 111A | `111A/02_type_illustration_111A.webp` | `111A/02_type_map_111A.webp` | `111A/02_type_111A_01.webp` … `111A/02_type_111A_19.webp` (19) |
| 111B | `02_type_illustration_111B.webp` | `111B/02_type_map_111B.webp` | — (no gallery) |
| 111C | `02_type_illustration_111C.webp` | `111C/02_type_map_111C.webp` | `111C/02_type_111C_01.webp` … `111C/02_type_111C_24.webp` (24) |

Total gallery images: 19 + 16 + 19 + 24 = **78 gallery photos**.

### 3.3 SVG / inline vectors

Six logos/icons are supplied by Paul and will be inlined verbatim at each usage site:

| Asset | Usage |
|---|---|
| `prusio-logo` | Header left, hero center, footer |
| `daewoo-logo` | Hero partner row, footer 시공 logo |
| `suncheondc-logo` | Hero partner row, footer 시행 logo |
| `icon-phone` | Header contact bar, Benefits CTA button, footer 전화 문의하기 |
| `icon-kakaotalk` | Header contact bar, Benefits CTA button, footer 카카오톡 문의하기 |
| `laurel-wreath` | Benefits section headline (left) + mirrored copy on the right (`transform: scaleX(-1)`) |

Missing SVGs (Paul will supply later) — each marked with a TODO placeholder in `index.astro`:

1. `prusio-pattern` — decorative dot pattern in hero + brand section
2. 6× PRIDE icons: location / mart / train / leaf / shield / home-layout
3. 3× Utility icons: design / eco / safety
4. 5× Environment icons: INFRA / TRAFFIC / PLAN / GREEN / EDU

---

## 4. Typography

**Family**: `Pretendard Variable`. Installed via `@fontsource-variable/pretendard` and imported in `Base.astro` frontmatter. Tailwind body default = Pretendard Variable.

Weights used: Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700), ExtraBold (800).

Size scale (ballpark — final values tuned in implementation):

| Role | Mobile | Tablet | Desktop | Large |
|---|---|---|---|---|
| Hero headline | 40px | 56px | 60px | 72px |
| Section heading (OVERVIEW / TYPE / THE BRAND / UTILITY & INFRA) | 24px | 28px | 32px | 32px |
| Subheading | 18px | 20px | 22px | 24px |
| Body | 14px | 15px | 16px | 16px |
| Small / label / spec | 12px | 13px | 14px | 14px |

Letter-spacing: `tracking-[1.5px]` on English all-caps labels, `tracking-[-0.4px]` on hero headline.

---

## 5. Color tokens (hex via Tailwind arbitrary values)

| Role | Hex | Primary uses |
|---|---|---|
| Teal 900 | `#003e3e` | Header gradient bottom, deep accent |
| Teal 800 | `#015151` | Darker accent text |
| Teal 700 | `#005252` | Buttons, CTAs, dividers, prusio-logo fill (`#084F51` in logo SVG, close relative) |
| Teal 500 | `#41847f` | Muted section labels |
| Cyan 50  | `#f2ffff` | Soft CTA surfaces |
| Brown 900 | `#635446` | Benefits gradient start |
| Brown 700 | `#7c6c5e` | Brown gradient mid/end |
| Brown 500 | `#8c7c6e` | Warm divider / benefits gradient top |
| Gray 900 | `#323434` | Table borders |
| Gray 800 | `#434143` | Primary body text |
| Gray 500 | `#6a696a` | Secondary text |
| Gray 100 | `#ebedeb` | Panel bg |
| White | `#ffffff` | Main bg / inverted text |
| Type 84A | `#00b342` | Badge |
| Type 84B | `#bee1b0` | Badge |
| Type 84C | `#448426` | Badge |
| Type 84D | `#2e581a` | Badge |
| Type 111A | `#88abe0` | Badge |
| Type 111B | `#3373ca` | Badge |
| Type 111C | `#024f7d` | Badge |
| Sticky-nav surface | `rgba(255,255,255,0.75)` + `backdrop-blur` | Sticky menu |

Gradients:
- Header: `linear-gradient(to bottom, #005252, #003e3e)` (60px)
- Benefits: `linear-gradient(to bottom, #635446, #7b6b5d, #8c7c6e 62%)`
- Utility header band: `linear-gradient(to bottom, #8c7c6e, #7c6c5e)`

---

## 6. Korean copy (verbatim — preserved exactly)

Hero: `첫 푸르지오 순천의 중심이 되다` / `순천 푸르지오 더 퍼스트`

Benefits: `순천 푸르지오 더 퍼스트의 주인이 될 기회` / `다시 찾아오지 않을 엄청난 혜택 2가지` / `아파트 분양 지원 혜택 최대 1.5억 원` / `입주 축하금 역대급 최대 지원` / `순천 푸르지오 더 퍼스트 분양 관련 문의하기`

Brand: `THE BRAND` / `국내 시공능력 1위 · IF 디자인 어워드 본상 수상 · 아파트 브랜드 평판 2위` / `국내 정상급 프리미엄 주거 브랜드 푸르지오가 순천에 첫발을 내딛다` / `브랜드 파워` / `2010~2016 연속 주택공급실적 1위, 6년 연속` / `2020 한국서비스대상 종합대상 수상` / `세계 3대 디자인 어워드 IF 디자인 어워드 2020 커뮤니케이션 부문 WINNER`

Overview/PRIDE6: `OVERVIEW` / `지역 내 선호도가 높은 중대형 평형 위주 상품 구성` / `순천 푸르지오 더 퍼스트만의 PRIDE6`. Card titles: `순천의 중심에서 첫 푸르지오`, `집앞 마트권`, `KTX 역세권`, `쾌적한 숲세권`, `믿을 수 있는 선시공 후분양 사업`, `푸르지오만의 공간 혁신`. Spec table headings: `위치`, `지역지구`, `대지면적`, `건축규모`, `전용평형`.

Environment: `순천 푸르지오 주변 환경`. 5-row labels/titles/desc (INFRA/TRAFFIC/PLAN/GREEN/EDU).

Type: `TYPE` / `순천이 기다리던 놀라움과 새로움의 푸르지오 더 퍼스트` / `지하 3층부터 29층까지, 6개동 560세대` / `순천 푸르지오 더 퍼스트의 7가지 평형 정보`. Per type, badge + `<세대수>세대 ㅣ <PY>PY`.

Utility & Infra: `UTILITY & INFRA` / `생활의 품격을 높이는 푸르지오 더 퍼스트의 시설` / `입주민들을 위한 특별한 생활이 시작됩니다` / `한 차원 높은 자부심이 시작됩니다.` / Three feature cards (고품격 특화설계 / 친환경 단지 설계 / 안전한 이동을 반영한 공간 설계).

Contact / Footer: `1551-5601` (display only; `tel:` href goes to `010-9986-9830`), `@firstprusiosuncheon` (display; href goes to `https://google.com`), `전화 문의하기`, `카카오톡 문의하기`, `현 장 · 순천시 덕암동 142번지`, `견 본 주 택 · 순천시 풍덕동 303-1`, `시행` / `시공`.

Footer legal block — two paragraphs kept verbatim except the corrected typo `제26조` (was `2ㅔ36조`).

---

## 7. `<title>` and `<meta description>`

- `<title>`: `순천 푸르지오 더 퍼스트 | 첫 푸르지오, 순천의 중심이 되다`
- `<meta name="description">`: `순천시 덕암동 142번지 일원, 지하 3층 ~ 지상 29층 / 6개동 560세대. 순천 푸르지오 더 퍼스트 분양 정보 및 청약 문의.`

---

## 8. Confirmed decisions recap (no open questions — all previously raised items are settled)

1. Section order: desktop order applied at every breakpoint.
2. Sticky nav visible on mobile too (offset 100px base, 60px md+).
3. Type section is a vertical stack of 7 cards at every breakpoint; galleries inside the 4 gallery-bearing cards scroll horizontally with `snap-x snap-mandatory`, scrollbar hidden.
4. Environment: 2-col (list + shared map) on md+, 1-col with map below on base.
5. Hero: single image, no carousel.
6. Legal: `2ㅔ36조` → `제26조`.
7. `84D` gallery filenames use `_84B_` prefix — preserved verbatim from Figma.
8. Pretendard loaded via `@fontsource-variable/pretendard`.
9. Phone href → `tel:010-9986-9830` (with TODO comment). KakaoTalk href → `https://google.com` (with TODO comment). Display text unchanged.
10. Supplied inline SVGs (6): prusio-logo, daewoo-logo, suncheondc-logo, icon-phone, icon-kakaotalk, laurel-wreath. Others (prusio-pattern, PRIDE6 icons, Utility icons, Environment icons) rendered as clearly-marked TODO placeholders to be swapped later.
