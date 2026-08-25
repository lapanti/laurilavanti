import { afterEach, describe, expect, it, vi } from 'vitest'

const loadConfig = async (e2eUrl: string) => {
    vi.stubEnv('E2E_URL', e2eUrl)
    vi.resetModules()
    return (await import('../playwright.config')).default
}

afterEach(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
})

describe('Playwright E2E_URL configuration', () => {
    it('keeps local build-and-preview behavior when E2E_URL is absent', async () => {
        const config = await loadConfig('')

        expect(config.use).toMatchObject({ baseURL: 'http://localhost:4321' })
        expect(config.webServer).toMatchObject({
            command: 'npm run build && npm run preview',
            url: 'http://localhost:4321',
        })
    })

    it('normalizes a deployed HTTPS candidate and disables the local server', async () => {
        const config = await loadConfig('https://candidate.pages.dev')

        expect(config.use).toMatchObject({ baseURL: 'https://candidate.pages.dev/' })
        expect(config.webServer).toBeUndefined()
    })

    it.each([
        'candidate.pages.dev',
        'http://candidate.pages.dev',
        'https://user@example.com',
        'https://candidate.pages.dev/?preview=true',
        'https://candidate.pages.dev/#preview',
    ])('rejects invalid remote base URL %s', async (e2eUrl) => {
        await expect(loadConfig(e2eUrl)).rejects.toThrow('E2E_URL must be an absolute HTTPS URL')
    })
})
