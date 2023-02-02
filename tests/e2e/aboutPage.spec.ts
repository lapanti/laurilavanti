import test from '@playwright/test'

import { AboutPage } from './helpers/aboutPage'

test.describe('About Page', () => {
    test('should render', async ({ page }) => {
        const aboutPage = new AboutPage(page)
        await aboutPage.goTo()

        await aboutPage.checkMainNavigation()

        await aboutPage.checkTitles()

        await aboutPage.checkFooter()
    })
})
