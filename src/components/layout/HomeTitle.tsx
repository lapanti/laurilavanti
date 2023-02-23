import React from 'react'
/** @ts-expect-error twin.macro typings are incomplete :/ */
import tw, { styled } from 'twin.macro'

const H1 = tw.h1`
    col-start-3 flex flex-col justify-end mb-4 overflow-visible
`

const Word = tw.span`
    flex
`

const Letter = styled.span(({ index }: { index: number }) => [
    {
        textShadow: 'black 1px 1px 1px',
        animation: `slidein 1.${1 - index / 10}s ease-in-out`,
    },
    tw`
        w-10 flex justify-center
    `,
])

/*
const Rest = tw.span`
    text-3xl flex items-end
`*/

interface Props {
    className?: string
}

const HomeTitleComponent = ({ className }: Props) => (
    <div className={className}>
        <H1 aria-label="Lauri Lavanti">
            {[
                ['L', 'aatu'],
                ['A', 'voimuus'],
                ['U', 'teliaisuus'],
                ['R', 'ehellisyys'],
                ['I', 'nhimillisyys'],
            ].map(([firstLetter /*, rest*/], i) => (
                <Word key={firstLetter}>
                    <Letter index={i}>{firstLetter}</Letter>
                    {/*<Rest>{rest}</Rest>*/}
                </Word>
            ))}
        </H1>
    </div>
)

HomeTitleComponent.displayName = 'HomeTitle'

const HomeTitle = tw(HomeTitleComponent)`
    grid grid-cols-article
    col-span-full -mt-164 h-164 z-40 max-w-screen-fullhd mx-auto w-full
    text-6xl font-heading font-black text-white
    bg-gradient-to-r from-[rgba(0,0,0,.85)] via-[rgba(0,0,0,.05)]
    overflow-hidden
`

export default HomeTitle
