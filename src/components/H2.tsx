import React from 'react'
import tw from 'twin.macro'

interface Props {
    className?: string
    children: string
}

const H2Component = ({ className, children }: Props): JSX.Element => (
    <h2 className={className} id={children.toLowerCase().replace(' ', '-').replace('ä', 'a').replace('ö', 'o')}>
        {children}
    </h2>
)

H2Component.displayName = 'H2'

const H2 = tw(H2Component)`
    col-start-3 font-bold text-xl
`

export default H2
