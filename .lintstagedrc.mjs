export default {
    '*/**/*.{js,jsx,ts,tsx,astro}': ['eslint'],
    '*/**/*.mdx': (files) => [
        `scripts/mdx-validate.sh ${files.map((f) => `"${f}"`).join(' ')}`,
        `node scripts/check-overflow.mjs ${files.map((f) => `"${f}"`).join(' ')}`,
    ],
    '**/content/tags/*.ts': (files) =>
        `node scripts/check-overflow.mjs ${files.map((f) => `"${f}"`).join(' ')}`,
    '*/**/*.{js,jsx,ts,tsx,astro,mdx}': (files) =>
        files.length > 20
            ? 'vitest --run'
            : `vitest related --run ${files.map((f) => `"${f}"`).join(' ')}`,
}
