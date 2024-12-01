module.exports = {
    ci: {
        assert: {
            assertions: {
                'is-crawlable': 'off',
                'unused-css-rules': 'off',
                'uses-responsive-images': 'off',
            },
            preset: 'lighthouse:recommended',
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
}
