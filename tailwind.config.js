module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            sans: '"Roboto"',
            serif: '"Roboto"',
        },
        screens: {
            700: '700px',
            750: '750px',
            fullhd: '1920px',
        },
        extend: {
            colors: {
                link: '#487F6D',
                navLink: '#0C5A48',
                accent: '#062D24',
                forestGreen: '#045a1c',
                lightGrey: '#e3e3e3',
                fb: '#4267B2',
                twitter: '#1DA1F2',
                linkedin: '#0E76A8',
                rss: '#EE802F',
            },
            spacing: {
                4.5: '1.125rem',
            },
            gridTemplateAreas: {
                layout: ['header', ' main ', 'footer'],
            },
            gridTemplateRows: {
                layout: '4.5rem 1fr 8rem',
            },
            gridTemplateColumns: {
                article: '1fr 0.5rem min(80ch, calc(100% - 1.125rem)) 0.5rem 1fr',
                article700: '1fr 1.125rem min(80ch, calc(100% - 2.25rem)) 1.125rem 1fr',
                article750: '1fr 2.25rem min(80ch, calc(100% - 4.5rem)) 2.25rem 1fr',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@savvywombat/tailwindcss-grid-areas')],
}
