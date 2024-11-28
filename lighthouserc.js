module.exports = {
    ci: {
        collect: {
            startServerCommand: 'npm run develop',
            url: ['http://localhost:8000'],
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
}
