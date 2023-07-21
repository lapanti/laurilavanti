/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        fontFamily: {
            sans: `"IBM Plex Sans"`,
            mono: `"IBM Plex Mono"`,
            heading: `"Signika Negative"`,
        },
        screens: {
            biggerthenphone: '479px',
            700: '700px',
            750: '750px',
            1200: '1200px',
            fullhd: '1920px',
        },
        colors: {
            greenDarkBackground: 'rgb(40, 71, 52)',
            greenDarkText: 'rgb(0, 104, 69)',
            greenBright: 'rgb(0, 150, 57)',
            greenLight: 'rgb(217, 234, 154)',
            black: 'rgb(0, 0, 0)',
            gray: 'rgb(235, 235, 236)',
            white: 'rgb(255, 255, 255)',
            fire: 'rgb(240, 100, 0)',
            evening: 'rgb(0, 98, 114)',
            moss: 'rgb(90, 94, 0)',
            ocher: 'rgb(218, 170, 0)',
            plum: 'rgb(112, 39, 61)',
            peach: 'rgb(248, 207, 169)',
            sky: 'rgb(187, 221, 230)',
            oats: 'rgb(228, 215, 126)',
            sand: 'rgb(214, 210, 196)',
            fb: '#4267B2',
            twitter: '#1DA1F2',
            instagram: '#E4405F',
            linkedin: '#0E76A8',
            mastodon: '#6363ff',
            rss: '#EE802F',
            transparent: 'transparent',
        },
        extend: {
            spacing: {
                4.5: '1.125rem',
                18: '4.5rem',
                164: '41rem',
            },
            gridTemplateAreas: {
                layout: [' main ', 'footer'],
            },
            gridTemplateRows: {
                layout: '1fr 6rem',
            },
            gridTemplateColumns: {
                article: '1fr 0.5rem min(80ch, calc(100% - 1.125rem)) 0.5rem 1fr',
            },
        },
    },
    plugins: [require('@savvywombat/tailwindcss-grid-areas')],
}
