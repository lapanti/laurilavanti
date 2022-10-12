import type { ReactNode } from 'react'

import React from 'react'
import tw from 'twin.macro'

interface Props {
    className?: string
    children: ReactNode
    itemProp?: string
}

const H2Component = ({ className, children, itemProp }: Props): JSX.Element => (
    <h2
        className={className}
        itemProp={itemProp}
        id={children?.toString().toLowerCase().replace(/\s/gi, '-').replace(/ä/gi, 'a').replace(/ö/gi, 'o')}
    >
        {children}
    </h2>
)

H2Component.displayName = 'H2'

const H2 = tw(H2Component)`
    col-start-3 font-heading font-bold text-4xl
`

export default H2
