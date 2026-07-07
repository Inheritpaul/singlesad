# Breakpoint convention

These breakpoints are project-wide. Do not change them per client.

Every client site in this monorepo uses the same 3 breakpoints (4 layout zones). Fonts, colors, and layout differ per client — breakpoints do not.

## The 4 zones

| Zone          | Range            | Tailwind prefix | Figma frame width |
| ------------- | ---------------- | --------------- | ----------------- |
| Mobile        | < 768px          | (base, no prefix) | 390px             |
| Tablet        | 768px – 1279px   | `md:`           | 1024px            |
| Desktop       | 1280px – 1919px  | `xl:`           | 1440px            |
| Large display | ≥ 1920px         | `2xl:`          | 1920px            |

## The 3 Tailwind screen names

- `md:` — tablet and up (≥ 768px)
- `xl:` — desktop and up (≥ 1280px)
- `2xl:` — large display and up (≥ 1920px)

No `sm:`, no `lg:`, no other breakpoints. Tailwind's default breakpoints are intentionally cleared.

## Source of truth

Breakpoints live in [`src/styles/global.css`](./src/styles/global.css) under the `@theme` block:

```css
@theme {
  --breakpoint-*: initial;
  --breakpoint-md: 768px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1920px;
}
```

This project uses Tailwind v4 with the `@tailwindcss/vite` plugin (CSS-first config). There is no `tailwind.config.mjs` — the Vite plugin does not read JS config unless an explicit `@config` directive is added to the CSS, which we intentionally do not do.

## Design in Figma at these widths

- 390px (mobile)
- 1024px (tablet)
- 1440px (desktop)
- 1920px (large display)
