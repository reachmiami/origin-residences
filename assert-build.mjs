/**
 * Guard: refuse to measure a dev server.
 *
 * Every verification script here is meant to run against a SERVED BUILD
 * (`npm run preview`). Pointed at `astro dev` instead they still produce
 * confident numbers — from Vite's in-memory module graph, which can lag the
 * source, serve a scoped style that was already deleted, or 504 on a
 * pre-bundled dependency so that GSAP never loads and every scroll-driven
 * measurement silently reads a page with no animation on it.
 *
 * This cost a whole debugging session: `npm run preview` cannot bind 4321 when
 * a dev server already holds it, so it quietly moved to another port while
 * every "preview" measurement was really hitting the dev server. The tell is
 * `@vite/client` in the HTML — a built page never contains it.
 *
 * Call once at the top of a script, before opening a browser.
 */
export async function assertBuild(baseUrl) {
  const url = new URL(baseUrl).origin;
  let html;
  try {
    html = await (await fetch(url + '/', { cache: 'no-store' })).text();
  } catch (e) {
    console.error(`\n✗ Nothing is serving ${url}\n  Start one:  npm run preview\n`);
    process.exit(2);
  }
  if (/@vite\/client|\/@vite\/|vite\/dist\/client/.test(html)) {
    console.error(
      `\n✗ ${url} is a DEV SERVER, not a build.\n` +
        `  These scripts measure a served build; a dev server reports numbers that\n` +
        `  look right and are not. Stop it and run:  npm run preview\n` +
        `  (If a dev server holds 4321, preview silently starts on another port —\n` +
        `   pass that port explicitly, e.g. node <script>.mjs http://localhost:4322)\n`,
    );
    process.exit(2);
  }
}
