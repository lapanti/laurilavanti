import type { Page } from '@playwright/test'

import { expect } from '@playwright/test'
import { Playwright } from '@siteimprove/alfa-playwright'
import { Audit } from '@siteimprove/alfa-test-utils'

/*
 * Signal Band rebrand a11y debt — tracked in
 * https://github.com/lapanti/laurilavanti/issues/1368. Rules are excluded here
 * only when meeting them would require changing the design system (palette or
 * component sizing); rules that can be met for free are enforced, not excluded.
 *
 * Enforced (fixed without any visual change):
 *  - sia-r74/sia-r80 (relative units, WCAG 1.4.8) — fixed in #1383;
 *    src/lib/relativeUnits.spec.ts guards against px creeping back in.
 *  - sia-r72 (no uppercase paragraphs) and sia-r73 (paragraph line-height ≥ 1.5,
 *    WCAG 1.4.8) — the uppercase kicker/meta labels that tripped both were moved
 *    off the `paragraph` role (<p> → <div>) and one prose quote's line-height
 *    was raised to 1.5. No palette or type-scale change.
 *  - sia-r69 (contrast 4.5:1, WCAG 1.4.3, AA) — earlier design edits cleared it
 *    everywhere except the two decorative "·" separators in the article meta
 *    line, which were redrawn as CSS circles (non-text) so the rule no longer
 *    applies. Same muted look, no palette change.
 *
 * Excluded (meeting them needs a design-system change we are deliberately not
 * making here):
 */
const EXCLUDED_RULES = new Set([
    // WCAG 1.4.6 enhanced contrast (7:1). Meeting it needs palette darkening.
    'https://alfa.siteimprove.com/rules/sia-r66',
    // WCAG 2.5.5 target size (44×44). Needs component sizing changes; inline links are exempt by the rule's own applicability.
    'https://alfa.siteimprove.com/rules/sia-r111',
])

export async function checkSiteImprove(page: Page): Promise<void> {
    const document = await page.evaluateHandle(() => window.document)
    const alfaPage = await Playwright.toPage(document)
    const alfaResult = await Audit.run(alfaPage, { rules: { exclude: (rule) => EXCLUDED_RULES.has(rule.uri) } })

    const failingRules = [...alfaResult.resultAggregates].filter(([, counts]) => counts.failed > 0)
    const summary = failingRules.map(([ruleId, counts]) => `  - ${ruleId} (${counts.failed} failed)`).join('\n')

    expect(failingRules, `SiteImprove violations:\n${summary}`).toHaveLength(0)
}
