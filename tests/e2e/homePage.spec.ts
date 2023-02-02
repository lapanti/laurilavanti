import { test } from '@playwright/test'

import { HomePage } from './helpers/homePage'

test.describe('Home Page', () => {
    test('should render', async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.goHome()

        await homePage.checkTitles()
    })
})
