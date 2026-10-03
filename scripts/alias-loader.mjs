// `@/` → `src/` for plain-node scripts that import engine modules (the Vite/Jest
// alias); JSON modules load without an import attribute the way Vite allows.
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';
register('data:text/javascript,' + encodeURIComponent(`
  import { pathToFileURL } from 'node:url';
  import { readFileSync } from 'node:fs';
  const SRC = ${JSON.stringify(pathToFileURL(process.cwd() + '/src/').href)};
  export async function resolve(specifier, context, next) {
    if (specifier.startsWith('@/')) return next(SRC + specifier.slice(2), context);
    return next(specifier, context);
  }
  export async function load(url, context, next) {
    if (url.endsWith('.json')) return { format: 'json', source: readFileSync(new URL(url)), shortCircuit: true };
    return next(url, context);
  }
`), pathToFileURL('./'));
