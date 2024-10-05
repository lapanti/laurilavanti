import type { ReactNode } from 'react'

import React from 'react'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { fontFamilies, fontSizes, fontWeights } from '../lib/styles'

interface Props {
    className?: string
    children: ReactNode
    itemProp?: string
}

const H2Component = ({ className, children, itemProp }: Props): JSX.Element => (
    <h2
        className={className}
        id={children?.toString().toLowerCase().replace(/\s/gi, '-').replace(/ä/gi, 'a').replace(/ö/gi, 'o')}
        itemProp={itemProp}
    >
        {children}
    </h2>
)

H2Component.displayName = 'H2'

const H2 = styled(H2Component)({
    gridColumnStart: 3,
    fontFamily: fontFamilies.mono,
    fontWeight: fontWeights.bold,
    ...fontSizes[1.75],
})

export default H2
