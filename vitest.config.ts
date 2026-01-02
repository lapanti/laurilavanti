/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config' // eslint-disable-line import/no-unresolved
import path from 'path'

export default getViteConfig({
    test: {
        environment: 'happy-dom',
        resolveSnapshotPath: (testPath, snapshotExtension) => {
            const finalTestPath = testPath.replace('src', `tests${path.sep}__snapshots__`)

            return `${finalTestPath}${snapshotExtension}`
        },
        setupFiles: ['./tests/setup.ts'],
    },
})
