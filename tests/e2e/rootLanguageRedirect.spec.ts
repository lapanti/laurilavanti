import test from '@playwright/test'

const cases: Array<[string, string]> = [
    ['en-US', '/fi/'], // non-Swedish locales fall back to default
    ['sv-SE', '/sv/'],
    ['fi-FI', '/fi/'],
    ['de-DE', '/fi/'], // non-Swedish locales fall back to default
]

for (const [locale, expected] of cases) {
    test.describe(`root redirect — ${locale}`, () => {
        test.use({ locale })

        test(`redirects / to ${expected}`, async ({ page }) => {
            await page.goto('/')
            await test.expect(page).toHaveURL(expected)
        })
    })
}
