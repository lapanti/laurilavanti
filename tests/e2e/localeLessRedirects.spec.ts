import type { APIRequestContext, APIResponse } from '@playwright/test'

import { expect, test } from '@playwright/test'

const candidateUrl = process.env.E2E_URL

const requestWithoutRedirects = (request: APIRequestContext, pathname: string) =>
    request.get(pathname, { maxRedirects: 0 })

const expectRedirect = async (response: APIResponse, expectedPath: string) => {
    expect(response.status()).toBe(301)

    const location = response.headers().location
    expect(location).toBeDefined()
    expect(new URL(location!, candidateUrl).pathname).toBe(new URL(expectedPath, candidateUrl).pathname)
    expect(new URL(location!, candidateUrl).search).toBe(new URL(expectedPath, candidateUrl).search)
}

test.describe('Cloudflare locale-less Finnish aliases', () => {
    test.skip(!candidateUrl, 'Requires a deployed Cloudflare candidate')

    for (const source of ['/about', '/about/']) {
        test(`${source} redirects directly to the canonical Finnish page`, async ({ request }) => {
            const response = await requestWithoutRedirects(request, source)

            await expectRedirect(response, '/fi/about/')
        })
    }

    test('preserves the query string on a direct redirect', async ({ request }) => {
        const response = await requestWithoutRedirects(request, '/about?source=test')

        await expectRedirect(response, '/fi/about/?source=test')
    })

    for (const source of ['/not-a-real-page', '/not-a-real-page/']) {
        test(`${source} remains missing`, async ({ request }) => {
            const response = await requestWithoutRedirects(request, source)

            expect(response.status()).toBe(404)
            expect(response.headers().location).toBeUndefined()
        })
    }
})
