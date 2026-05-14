export default {
    '*/**/*.{js,jsx,ts,tsx,astro}': ['eslint'],
    '*/**/*.mdx': (files) => [
        `scripts/mdx-validate.sh ${files.map((f) => `"${f}"`).join(' ')}`,
    ],
    '*/**/*.{js,jsx,ts,tsx,astro,mdx}': (files) =>
        `vitest related --run ${files.map((f) => `"${f}"`).join(' ')}`,
}
