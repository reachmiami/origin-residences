/**
 * Pre-build secret guard.
 *
 * Everything named PUBLIC_* is inlined into client JavaScript by Astro and is
 * readable by any visitor. A Follow Up Boss API key in one of those variables
 * would hand the entire CRM to the internet.
 *
 * This runs before every build and refuses to continue if a PUBLIC_ value
 * looks like a real credential rather than a publishable relay key.
 */
import fs from 'node:fs';
import path from 'node:path';

const ENV_FILES = ['.env', '.env.production', '.env.local'];
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Shapes that mean "this is a secret", not "this is a public form key". */
const SECRET_SHAPES = [
  { re: /^[a-z]{2,5}_[A-Za-z0-9]{16,}$/, why: 'prefixed API-key format (e.g. xxx_…)' },
  { re: /^sk[-_]/i, why: 'secret-key prefix' },
  { re: /^Bearer\s/i, why: 'bearer token' },
  { re: /^[A-Za-z0-9+/]{40,}={0,2}$/, why: 'long base64 credential' },
  { re: /^eyJ[A-Za-z0-9_-]+\./, why: 'JWT' },
];

const problems = [];

for (const file of ENV_FILES) {
  const full = path.resolve(process.cwd(), file);
  if (!fs.existsSync(full)) continue;

  for (const raw of fs.readFileSync(full, 'utf8').split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;

    const eq = line.indexOf('=');
    if (eq === -1) continue;

    const key = line.slice(0, eq).trim();
    const value = line.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '');
    if (!key.startsWith('PUBLIC_') || !value) continue;

    // Name-based check: nothing CRM-ish belongs in a PUBLIC_ variable.
    if (/FUB|FOLLOW.?UP|API.?KEY|SECRET|TOKEN|PASSWORD/i.test(key)) {
      problems.push(`${file}: ${key} is PUBLIC_ but its name implies a credential.`);
      continue;
    }

    // Shape-based check: the relay key is the one PUBLIC_ value we expect, and
    // real relay access keys are UUIDs.
    if (key === 'PUBLIC_FORM_RELAY_KEY' && !UUID.test(value)) {
      const hit = SECRET_SHAPES.find((s) => s.re.test(value));
      problems.push(
        `${file}: PUBLIC_FORM_RELAY_KEY is not a UUID` +
          (hit ? ` and matches a ${hit.why}.` : '.') +
          '\n      Relay access keys (Web3Forms, Formspree, Basin) are UUIDs.' +
          '\n      If you pasted a Follow Up Boss API key here, remove it and rotate it.',
      );
      continue;
    }

    const hit = SECRET_SHAPES.find((s) => s.re.test(value));
    if (hit) problems.push(`${file}: ${key} looks like a ${hit.why}.`);
  }
}

if (problems.length) {
  console.error('\n\x1b[41m\x1b[97m  BUILD BLOCKED — possible secret in a PUBLIC_ variable  \x1b[0m\n');
  for (const p of problems) console.error(`  ✗ ${p}`);
  console.error(
    '\n  PUBLIC_* values are inlined into client JavaScript and are readable by\n' +
      '  every visitor. See FOLLOW-UP-BOSS.md for the correct setup.\n',
  );
  process.exit(1);
}

console.log('✓ env check passed — no credentials in PUBLIC_ variables');
