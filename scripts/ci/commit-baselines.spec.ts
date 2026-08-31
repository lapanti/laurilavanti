import { describe, expect, it } from 'vitest'

import { parsePorcelain } from './commit-baselines'

describe('parsePorcelain', () => {
    it('splits modified and untracked files into additions', () => {
        const status =
            ' M tests/e2e/blogPage.spec.ts-snapshots/blog-chromium-linux.png\n?? tests/e2e/newPage.spec.ts-snapshots/new-chromium-linux.png\n'
        expect(parsePorcelain(status)).toEqual({
            additions: [
                'tests/e2e/blogPage.spec.ts-snapshots/blog-chromium-linux.png',
                'tests/e2e/newPage.spec.ts-snapshots/new-chromium-linux.png',
            ],
            deletions: [],
        })
    })

    it('splits deleted files into deletions', () => {
        const status =
            ' D tests/e2e/oldPage.spec.ts-snapshots/old-chromium-linux.png\n M tests/e2e/blogPage.spec.ts-snapshots/blog.txt\n'
        expect(parsePorcelain(status)).toEqual({
            additions: ['tests/e2e/blogPage.spec.ts-snapshots/blog.txt'],
            deletions: ['tests/e2e/oldPage.spec.ts-snapshots/old-chromium-linux.png'],
        })
    })

    it('returns empty changes for empty status output', () => {
        expect(parsePorcelain('')).toEqual({ additions: [], deletions: [] })
        expect(parsePorcelain('\n')).toEqual({ additions: [], deletions: [] })
    })
})
