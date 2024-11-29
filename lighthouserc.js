module.exports = {
    ci: {
        assert: {
            assertions: {
                'is-crawlable': 'off',
                'lcp-lazy-loaded': 'off',
                'unused-css-rules': 'off',
                'uses-rel-preconnect': 'off',
            },
            preset: 'lighthouse:recommended',
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
}
