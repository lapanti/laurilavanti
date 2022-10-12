import React from 'react'
import tw from 'twin.macro'

const H1 = tw.h1`
    col-start-3 text-6xl font-heading font-black m-0 flex items-end mb-4 text-white
`

interface Props {
    className?: string
    title: string
}

const TitleComponent = ({ className, title }: Props): JSX.Element => (
    <section className={className}>
        <H1 itemProp="headline">{title}</H1>
    </section>
)

TitleComponent.displayName = 'Title'

const Title = tw(TitleComponent)`
    grid grid-cols-article 700:grid-cols-article700 750:grid-cols-article750
    col-span-full -mt-56 z-40 max-w-screen-fullhd mx-auto w-full
    bg-gradient-to-t from-black
`

export default Title
