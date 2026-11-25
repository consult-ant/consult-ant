# consult-ant design system

This is the shared visual baseline for the portfolio and its collection pages. Use it for new pages that belong to the main site; standalone games and visualisations can keep their own art direction.

## Foundations

- Use the colors and fonts already defined in `style.css` under `:root`; add or change a token there rather than scattering new values through page styles.
- Use the `--space-*`, `--radius-*`, and `--text-*` scales for new UI spacing, corners, and control text.
- Use the shared `.wrap`, heading, navigation, and footer styles for portfolio pages.
- Keep the dark palette, light text, and blue accent. Check contrast whenever adding a color.
- Keep layouts responsive and use semantic HTML.

## Buttons

Load `style.css` and use `.button` with one of these variants:

- `.button--primary`: the main action in a section or form.
- `.button--secondary`: an alternative action that should remain clearly visible.
- `.button--quiet`: a lower-emphasis action.

Use an `<a>` for navigation and a `<button type="button">` or `<button type="submit">` for actions. Use the native `disabled` attribute for unavailable buttons. Keep labels short and descriptive; mark decorative icons as hidden from assistive technology. The shared styles provide a 44px minimum height, visible keyboard focus, and hover/disabled treatments.

Prefer one primary action per group. Do not make every link look like a button.

## Reference

Open [`design-system.html`](./design-system.html) to see the button variants and their states in context.
