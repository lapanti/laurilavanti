import { expect, test } from '@playwright/test'
import { globSync } from 'fs'

const blogPostUrls = globSync('src/pages/{fi,sv,en}/blog/*/*/index.mdx').map((f) =>
    f.replace('src/pages', '').replace('/index.mdx', '/')
)

test.describe('Blog posts — no horizontal scroll on mobile', () => {
    for (const url of blogPostUrls) {
        test(`should not overflow: ${url}`, async ({ page }) => {
            await page.goto(url)
            await page.waitForSelector('h1')

            const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
            const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
            expect(scrollWidth).toBeLessThanOrEqual(clientWidth)
        })
    }
})
