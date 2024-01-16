import { createGlobalStyle } from 'styled-components'

import { colors, fontFamily, sizes } from '../../lib/styles'

const GlobalStyle = createGlobalStyle({
    '*, ::before, ::after': {
        boxSizing: 'border-box',
        borderWidth: sizes[0],
        borderStyle: 'solid',
        borderColor: 'currentcolor',
    },
    html: {
        lineHeight: 1.5,
        tabSize: 4,
        fontFamily: fontFamily.sans,
        fontFeatureSettings: 'normal',
        fontVariationSettings: 'normal',
    },
    body: {
        margin: sizes[0],
        lineHeight: 'inherit',
    },
    'ol, ul, menu': {
        listStyle: 'none',
        margin: sizes[0],
        padding: sizes[0],
    },
    'blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre': {
        margin: sizes[0],
    },
    'h1, h2, h3, h4, h5, h6': {
        fontSize: 'inherit',
        fontWeight: 'inherit',
    },
    'button, [role="button"]': {
        cursor: 'pointer',
    },
    'button, [type="button"], [type="reset"], [type="submit"]': {
        appearance: 'button',
        backgroundColor: colors.transparent,
        backgroundImage: 'none',
    },
    'button, select': {
        textTransform: 'none',
    },
    'button, input, optgroup, select, textarea': {
        fontFamily: 'inherit',
        fontFeatureSettings: 'inherit',
        fontVariationSettings: 'inherit',
        fontSize: '100%',
        fontWeight: 'inherit',
        lineHeight: 'inherit',
        color: 'inherit',
        margin: sizes[0],
        padding: sizes[0],
    },
    'img, svg, video, canvas, audio, iframe, embed, object': {
        display: 'block',
        verticalAlign: 'middle',
    },
    a: {
        color: 'inherit',
        textDecoration: 'inherit',
    },
    hr: {
        height: sizes[0],
        color: 'inherit',
        borderTopWidth: '1px',
    },
})

export default GlobalStyle
