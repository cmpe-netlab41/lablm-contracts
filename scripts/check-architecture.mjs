import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = join(packageRoot, 'src');
const packageJson = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'));
const violations = [];
const allowedRuntimeDependencies = new Set(['zod']);
const allowedDevelopmentDependencies = new Set(['typescript', 'zod']);

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function resolveSourceImport(importer, specifier) {
  const candidate = resolve(dirname(importer), specifier);
  return [candidate, `${candidate}.ts`, join(candidate, 'index.ts')].find(existsSync);
}

for (const file of walk(sourceRoot).filter((path) => path.endsWith('.ts'))) {
  const contents = readFileSync(file, 'utf8');
  const moduleSpecifiers = contents.matchAll(/(?:from\s+|import\s*)['"]([^'"]+)['"]/g);

  for (const [, specifier] of moduleSpecifiers) {
    if (specifier === 'zod') continue;

    if (!specifier.startsWith('.')) {
      violations.push(`${relative(packageRoot, file)} imports forbidden package '${specifier}'`);
      continue;
    }

    const target = resolveSourceImport(file, specifier);
    if (!target) {
      violations.push(`${relative(packageRoot, file)} has unresolved import '${specifier}'`);
      continue;
    }

    const relativeTarget = relative(sourceRoot, target);
    if (relativeTarget === '..' || relativeTarget.startsWith(`..${sep}`)) {
      violations.push(`${relative(packageRoot, file)} escapes src through '${specifier}'`);
    }
  }
}

for (const section of ['dependencies', 'peerDependencies', 'optionalDependencies']) {
  for (const dependency of Object.keys(packageJson[section] ?? {})) {
    if (!allowedRuntimeDependencies.has(dependency)) {
      violations.push(`package.json ${section} contains forbidden dependency '${dependency}'`);
    }
  }
}

for (const dependency of Object.keys(packageJson.devDependencies ?? {})) {
  if (!allowedDevelopmentDependencies.has(dependency)) {
    violations.push(`package.json devDependencies contains unapproved dependency '${dependency}'`);
  }
}

for (const [subpath, target] of Object.entries(packageJson.exports ?? {})) {
  if (!subpath.startsWith('./') || typeof target !== 'object' || target === null) {
    violations.push(`package export '${subpath}' must be an explicit subpath object`);
    continue;
  }

  const expectedPrefix = `./dist/${subpath.slice(2)}/index`;
  if (target.types !== `${expectedPrefix}.d.ts` || target.default !== `${expectedPrefix}.js`) {
    violations.push(`package export '${subpath}' must map to matching dist index types/default files`);
  }

  const sourceIndex = join(sourceRoot, subpath.slice(2), 'index.ts');
  if (!existsSync(sourceIndex)) {
    violations.push(`package export '${subpath}' has no source index at ${relative(packageRoot, sourceIndex)}`);
  }
}

if (violations.length > 0) {
  console.error('Contract architecture violations:\n');
  for (const violation of violations) console.error(`- ${violation}`);
  process.exitCode = 1;
} else {
  console.log('Contract dependency direction and public export mappings are valid.');
}
