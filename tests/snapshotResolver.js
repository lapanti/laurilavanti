const path = require('path')

module.exports = {
    /** Resolve path from test to snapshot path. The inverse of @see resolveTestPath */
    resolveSnapshotPath: (testPath, snapshotExtension) => {
        if (testPath.includes('src')) {
            return `${testPath.replace('src', `tests${path.sep}__snapshots__`)}${snapshotExtension}`
        }
        // Remove this block of code after all tests live under `src/`
        return `${path.dirname(testPath)}${path.sep}__snapshots__${path.sep}${path.basename(
            testPath
        )}${snapshotExtension}`
    },
    /** Resolve path from snapshot to test. The inverse of @see resolveTestPath */
    resolveTestPath: (snapshotFilePath, snapshotExtension) => {
        if (snapshotFilePath.includes(`tests${path.sep}__snapshots__`)) {
            return snapshotFilePath.replace(`tests${path.sep}__snapshots__`, 'src').slice(0, -snapshotExtension.length)
        }
        // Remove this block of code after all tests live under `src/`
        return snapshotFilePath.replace('__snapshots__', '').slice(0, -snapshotExtension.length)
    },
    /** Example test path used for preflight check of previous */
    testPathForConsistencyCheck: 'src/components/Link.spec.tsx',
}
