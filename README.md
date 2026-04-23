# singlesad

## Breakpoint convention

These breakpoints are project-wide. Do not change them per client.

| Zone          | Range            | Tailwind prefix | Figma frame width |
| ------------- | ---------------- | --------------- | ----------------- |
| Mobile        | < 768px          | (base, no prefix) | 390px             |
| Tablet        | 768px – 1279px   | `md:`           | 1024px            |
| Desktop       | 1280px – 1919px  | `xl:`           | 1440px            |
| Large display | ≥ 1920px         | `2xl:`          | 1920px            |

Only `md:`, `xl:`, and `2xl:` are defined. No `sm:`, no `lg:`. Each client site keeps its own fonts, colors, and layout — breakpoints are the one shared convention.

See [apps/_starter/BREAKPOINTS.md](apps/_starter/BREAKPOINTS.md) for the full rationale.
