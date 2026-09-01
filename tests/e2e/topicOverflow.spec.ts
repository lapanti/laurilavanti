import { expect, test } from '@playwright/test'

/*
 * Backstop for scripts/check-overflow.mjs: the static check models the topic
 * heading geometry (font, column width) as constants, so a CSS change it cannot
 * see — a narrower column, a larger font — would silently invalidate it. Here
 * every unbreakable segment of every rendered topic heading is measured with
 * the heading's actual computed styles and must fit the heading's actual width.
 * Overflow never scrolls (overflow-wrap: break-word breaks mid-word instead),
 * which is exactly the visual bug this guards against.
 */

const BLOG_PATHS = ['/fi/blog/', '/sv/blog/', '/en/blog/']

interface TopicHeadingMeasurement {
    headingWidth: number
    text: string
    widestSegment: string
    widestSegmentWidth: number
}

for (const path of BLOG_PATHS) {
    test(`topic headings fit their column on ${path}`, async ({ page }) => {
        await page.goto(path)
        await expect(page.locator('.topic-h').first()).toBeVisible()

        const measurements: TopicHeadingMeasurement[] = await page.evaluate(async () => {
            await document.fonts.ready
            const results = []
            for (const heading of document.querySelectorAll<HTMLElement>('.topic-h')) {
                const styles = getComputedStyle(heading)
                const probe = document.createElement('span')
                probe.style.fontFamily = styles.fontFamily
                probe.style.fontSize = styles.fontSize
                probe.style.fontWeight = styles.fontWeight
                probe.style.letterSpacing = styles.letterSpacing
                probe.style.textTransform = styles.textTransform
                probe.style.whiteSpace = 'pre'
                probe.style.position = 'absolute'
                probe.style.visibility = 'hidden'
                document.body.appendChild(probe)

                const text = heading.textContent ?? ''
                let widestSegment = ''
                let widestSegmentWidth = 0
                for (const segment of text.split(/[\s­–—:-]+/).filter(Boolean)) {
                    probe.textContent = segment
                    const width = probe.getBoundingClientRect().width
                    if (width > widestSegmentWidth) {
                        widestSegmentWidth = width
                        widestSegment = segment
                    }
                }
                probe.remove()

                results.push({ headingWidth: heading.clientWidth, text, widestSegment, widestSegmentWidth })
            }
            return results
        })

        expect(measurements.length).toBeGreaterThan(0)
        for (const { headingWidth, text, widestSegment, widestSegmentWidth } of measurements) {
            expect
                .soft(widestSegmentWidth, `"${widestSegment}" in heading "${text}" (column ${headingWidth}px)`)
                .toBeLessThanOrEqual(headingWidth + 1)
        }
    })
}
