import type { ReactNode } from 'react'

import '@fontsource/ibm-plex-mono/700.css'

import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { sizes, typographics } from '../lib/styles'

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
    ...typographics.h2,
    gridColumnStart: 3,
    marginTop: sizes[1],
})

export default H2
