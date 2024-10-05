import { createGlobalStyle } from 'styled-components'

import { colors, fontFamilies, fontWeights, sizes } from '../../lib/styles'

const GlobalStyle = createGlobalStyle({
    '*, ::before, ::after': {
        borderColor: 'currentcolor',
        borderStyle: 'solid',
        borderWidth: sizes[0],
        boxSizing: 'border-box',
    },
    '@font-face': {
        fontDisplay: 'swap',
        fontFamily: fontFamilies.heading,
        fontStyle: 'normal',
        fontWeight: fontWeights.black,
        src: 'url(/fonts/Krana_Fat_B.otf) format("opentype")',
    },
    a: {
        color: 'inherit',
        textDecoration: 'inherit',
    },
    'blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre': {
        margin: sizes[0],
    },
    body: {
        lineHeight: 'inherit',
        margin: sizes[0],
    },
    'button, [role="button"]': {
        cursor: 'pointer',
    },
    'button, [type="button"], [type="reset"], [type="submit"]': {
        appearance: 'button',
        backgroundColor: colors.transparent,
        backgroundImage: 'none',
    },
    'button, input, optgroup, select, textarea': {
        color: 'inherit',
        fontFamily: 'inherit',
        fontFeatureSettings: 'inherit',
        fontSize: '100%',
        fontVariationSettings: 'inherit',
        fontWeight: 'inherit',
        lineHeight: 'inherit',
        margin: sizes[0],
        padding: sizes[0],
    },
    'button, select': {
        textTransform: 'none',
    },
    'h1, h2, h3, h4, h5, h6': {
        fontSize: 'inherit',
        fontWeight: 'inherit',
    },
    hr: {
        borderTopWidth: '1px',
        color: 'inherit',
        height: sizes[0],
    },
    html: {
        fontDisplay: 'swap',
        fontFamily: fontFamilies.sans,
        fontFeatureSettings: 'normal',
        fontVariationSettings: 'normal',
        lineHeight: 1.5,
        tabSize: 4,
    },
    'img, svg, video, canvas, audio, iframe, embed, object': {
        display: 'block',
        verticalAlign: 'middle',
    },
    'ol, ul, menu': {
        listStyle: 'none',
        margin: sizes[0],
        padding: sizes[0],
    },
})

export default GlobalStyle
