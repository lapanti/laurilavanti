module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
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
                layout: '4.5rem 1fr 6.75rem',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@savvywombat/tailwindcss-grid-areas')],
}
