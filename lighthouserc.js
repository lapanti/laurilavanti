module.exports = {
    ci: {
        collect: {
            startServerCommand: 'npm run develop',
            url: ['http://localhost:9000'],
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
}
