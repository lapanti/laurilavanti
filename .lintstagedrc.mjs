export default {
    '*/**/*.{js,jsx,ts,tsx,astro}': ['eslint'],
    '*/**/*.mdx': (files) => [
        `node scripts/check-long-words.mjs ${files.map((f) => `"${f}"`).join(' ')}`,
        'node scripts/validate-translations.mjs',
        'node scripts/validate-titles.mjs',
    ],
    '*/**/*.{js,jsx,ts,tsx,astro,mdx}': (files) =>
        `vitest related --run ${files.map((f) => `"${f}"`).join(' ')}`,
}
