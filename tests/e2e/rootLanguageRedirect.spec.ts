import test from '@playwright/test'

const cases: Array<[string, string]> = [
    ['en-US', '/en/'],
    ['sv-SE', '/sv/'],
    ['fi-FI', '/fi/'],
    ['de-DE', '/fi/'], // unmatched locale falls back to default
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
