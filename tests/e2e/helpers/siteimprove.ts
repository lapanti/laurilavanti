import type { Page } from '@playwright/test'

import { expect } from '@playwright/test'
import { Playwright } from '@siteimprove/alfa-playwright'
import { Audit } from '@siteimprove/alfa-test-utils'

export async function checkSiteImprove(page: Page): Promise<void> {
    const document = await page.evaluateHandle(() => window.document)
    const alfaPage = await Playwright.toPage(document)
    const alfaResult = await Audit.run(alfaPage)

    const failingRules = [...alfaResult.resultAggregates].filter(([, counts]) => counts.failed > 0)
    const summary = failingRules.map(([ruleId, counts]) => `  - ${ruleId} (${counts.failed} failed)`).join('\n')

    expect(failingRules, `SiteImprove violations:\n${summary}`).toHaveLength(0)
}
