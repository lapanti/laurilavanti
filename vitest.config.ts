/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config' // eslint-disable-line import/no-unresolved
import path from 'path'
import { configDefaults } from 'vitest/config'

export default getViteConfig(
    {
        test: {
            environment: 'happy-dom',
            exclude: [...configDefaults.exclude, 'tests/e2e/**'],
            resolveSnapshotPath: (testPath, snapshotExtension) => {
                const finalTestPath = testPath.replace('src', `tests${path.sep}__snapshots__`)

                return `${finalTestPath}${snapshotExtension}`
            },
            setupFiles: ['./tests/setup.ts'],
        },
    },
    {
        devToolbar: {
            enabled: false,
        },
    }
)
