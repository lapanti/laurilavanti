import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

import { auditDist, loadDistState, parseRedirects } from './dist-contracts.mjs'

const temporaryDirectories: string[] = []

const createDist = async (files: Record<string, string>) => {
    const distDir = await mkdtemp(join(tmpdir(), 'dist-contracts-'))
    temporaryDirectories.push(distDir)

    for (const [relativePath, content] of Object.entries(files)) {
        const file = join(distDir, relativePath)
        await mkdir(dirname(file), { recursive: true })
        await writeFile(file, content)
    }

    return distDir
}

afterEach(async () => {
    await Promise.all(
        temporaryDirectories.splice(0).map((directory) => rm(directory, { force: true, recursive: true }))
    )
})

describe('parseRedirects', () => {
    it('parses comments and reports malformed declarations', () => {
        const result = parseRedirects('# comment\n/old/ /fi/about/ 301\ninvalid line\n')

        expect(result.rules).toEqual([{ destination: '/fi/about/', line: 2, source: '/old/', status: 301 }])
        expect(result.findings.map(({ code }) => code)).toEqual(['redirect-syntax'])
    })
})

describe('loadDistState', () => {
    it('discovers canonical routes, redirect stubs, and assets from dist', async () => {
        const distDir = await createDist({
            _redirects: '/old/ /fi/about/ 301\n',
            'asset.png': 'image',
            'fi/about/index.html': '<p>About</p>',
            'fi/index.html': '<p>Home</p>',
            'old/index.html': '<meta http-equiv="refresh" content="0;url=/fi/about/">',
        })

        const state = await loadDistState({ distDir })

        expect([...state.canonicalRoutes].sort()).toEqual(['/fi/', '/fi/about/'])
        expect([...state.redirectSources]).toEqual(['/old/'])
        expect([...state.assetPaths]).toContain('/asset.png')
    })
})

describe('auditDist', () => {
    it('accepts canonical links, assets, and direct redirect targets', async () => {
        const distDir = await createDist({
            _redirects: '/old/ /fi/about/ 301\n',
            'asset.png': 'image',
            'fi/about/index.html': '<a href="/fi/">Home</a>',
            'fi/index.html': '<a href="/fi/about/">About</a><a href="/asset.png">Asset</a>',
            'old/index.html': '<a href="/fi/about/">Redirect</a>',
        })

        await expect(auditDist({ distDir })).resolves.toEqual([])
    })

    it('reports chains, conflicts, and invalid local links', async () => {
        const distDir = await createDist({
            _redirects: [
                '/old/ /legacy/ 301',
                '/legacy/ /fi/about/ 301',
                '/duplicate/ /fi/about/ 301',
                '/duplicate/ /fi/ 301',
            ].join('\n'),
            'fi/about/index.html': '<p>About</p>',
            'fi/index.html': [
                '<a href="/old/">Redirect</a>',
                '<a href="/fi/about">No slash</a>',
                '<a href="http://localhost:4321/fi/">Localhost</a>',
                '<a href="/missing/">Missing</a>',
            ].join(''),
            'legacy/index.html': '<p>Legacy</p>',
            'old/index.html': '<p>Old</p>',
        })

        const findings = await auditDist({ distDir })
        const codes = findings.map(({ code }) => code)

        expect(codes).toEqual(
            expect.arrayContaining([
                'link-localhost',
                'link-noncanonical',
                'link-redirect',
                'link-target-missing',
                'redirect-chain',
                'redirect-conflict',
            ])
        )
    })
})
