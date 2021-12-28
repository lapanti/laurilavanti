import React from 'react'
import tw from 'twin.macro'

const Text = tw.h4`
    text-forestGreen text-4xl 700:text-6xl 1200:text-8xl font-bold
`

interface Props {
    className?: string
}

const NumberComponent = ({ className }: Props): JSX.Element => (
    <aside className={className}>
        <Text>404</Text>
    </aside>
)

NumberComponent.displayName = 'Number'

const Number = tw(NumberComponent)`
    flex items-center justify-center bg-white border-forestGreen border-4 rounded-full w-18 h-18 700:w-28 700:h-28 1200:w-44 1200:h-44
`

export default Number
