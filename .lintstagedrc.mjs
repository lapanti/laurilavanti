export default {
    '*/**/*.{js,jsx,ts,tsx,astro}': ['eslint'],
    '*/**/*.mdx': (files) => [
        `scripts/mdx-validate.sh ${files.map((f) => `"${f}"`).join(' ')}`,
        `node scripts/check-overflow.mjs ${files.map((f) => `"${f}"`).join(' ')}`,
        'node --experimental-strip-types scripts/checks/redirects.mjs',
    ],
    '**/content/tags/*.ts': (files) => [
        `node scripts/check-overflow.mjs ${files.map((f) => `"${f}"`).join(' ')}`,
        'node --experimental-strip-types scripts/checks/redirects.mjs',
    ],
    'src/lib/redirects.ts': () => 'node --experimental-strip-types scripts/checks/redirects.mjs',
    '*/**/*.{js,jsx,ts,tsx,astro}': (files) =>
        `vitest related --run ${files.map((f) => `"${f}"`).join(' ')}`,
}
