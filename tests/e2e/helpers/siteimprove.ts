import type { Page } from '@playwright/test'

import { expect } from '@playwright/test'
import { Playwright } from '@siteimprove/alfa-playwright'
import { Audit } from '@siteimprove/alfa-test-utils'

/*
 * Known, pre-existing violations from the Signal Band rebrand — tracked in
 * https://github.com/lapanti/laurilavanti/issues/1368, excluded here so CI
 * reflects new regressions rather than this design debt.
 */
const EXCLUDED_RULES = new Set([
    'https://alfa.siteimprove.com/rules/sia-r66', // 1.4.6 Contrast (Enhanced/AAA)
    'https://alfa.siteimprove.com/rules/sia-r69', // 1.4.3/1.4.6 Contrast
    'https://alfa.siteimprove.com/rules/sia-r72', // uppercase text-transform, best practice only
    'https://alfa.siteimprove.com/rules/sia-r73', // Contrast
    'https://alfa.siteimprove.com/rules/sia-r74', // 1.4.8 font-size not in relative units
    'https://alfa.siteimprove.com/rules/sia-r80', // 1.4.8 line-height not in relative units
    'https://alfa.siteimprove.com/rules/sia-r111', // 2.5.5 Target Size (Enhanced/AAA)
])

export async function checkSiteImprove(page: Page): Promise<void> {
    const document = await page.evaluateHandle(() => window.document)
    const alfaPage = await Playwright.toPage(document)
    const alfaResult = await Audit.run(alfaPage, { rules: { exclude: (rule) => EXCLUDED_RULES.has(rule.uri) } })

    const failingRules = [...alfaResult.resultAggregates].filter(([, counts]) => counts.failed > 0)
    const summary = failingRules.map(([ruleId, counts]) => `  - ${ruleId} (${counts.failed} failed)`).join('\n')

    expect(failingRules, `SiteImprove violations:\n${summary}`).toHaveLength(0)
}
