export default {
    '*/**/*.{js,jsx,ts,tsx,astro}': ['eslint'],
    '*/**/*.mdx': (files) => [
        `scripts/mdx-validate.sh ${files.map((f) => `"${f}"`).join(' ')}`,
        `node scripts/check-overflow.mjs ${files.map((f) => `"${f}"`).join(' ')}`,
    ],
    '**/content/tags/*.ts': (files) =>
        `node scripts/check-overflow.mjs ${files.map((f) => `"${f}"`).join(' ')}`,
    '*/**/*.{js,jsx,ts,tsx,astro}': (files) =>
        `vitest related --run ${files.map((f) => `"${f}"`).join(' ')}`,
}
