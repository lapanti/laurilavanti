import type { ReactNode } from 'react'

import '@fontsource/ibm-plex-mono/700.css'

import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { fontFamilies, fontSizes, fontWeights } from '../lib/styles'

interface Props {
    className?: string
    children: ReactNode
    itemProp?: string
}

const H3Component = ({ className, children, itemProp }: Props): JSX.Element => (
    <h3
        className={className}
        id={children?.toString().toLowerCase().replace(/\s/gi, '-').replace(/ä/gi, 'a').replace(/ö/gi, 'o')}
        itemProp={itemProp}
    >
        {children}
    </h3>
)

H3Component.displayName = 'H3'

const H3 = styled(H3Component)({
    fontFamily: fontFamilies.mono,
    fontWeight: fontWeights.bold,
    gridColumnStart: 3,
    ...fontSizes[1.5],
})

export default H3
