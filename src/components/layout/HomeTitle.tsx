import React from 'react'
/** @ts-expect-error twin.macro typings are incomplete :/ */
import tw, { styled } from 'twin.macro'

import Paragraph from '../Paragraph'

const TitleContainer = tw.div`
    grid grid-cols-article 700:grid-cols-article700 750:grid-cols-article750
    col-span-full -mt-164 h-164 z-40
    text-6xl font-bold text-lightGrey
    bg-gradient-to-r from-[rgba(0,0,0,.85)] via-[rgba(0,0,0,.05)]
`

const H1 = tw.h1`
    col-start-3 flex flex-col justify-end mb-4 overflow-hidden
`

const Word = tw.span`
    flex
`

const Letter = styled.span([
    `text-shadow: black 1px 1px 1px`,
    tw`
        w-10 flex justify-center
    `,
])

const EntryP = tw(Paragraph)`
    col-start-3 mt-4
`

/*
const Rest = tw.span`
    text-3xl flex items-end
`*/

const HomeTitle = () => (
    <>
        <TitleContainer>
            <H1 aria-label="Lauri Lavanti">
                {[
                    ['L', 'aatu'],
                    ['A', 'voimuus'],
                    ['U', 'teliaisuus'],
                    ['R', 'ehellisyys'],
                    ['I', 'nhimillisyys'],
                ].map(([firstLetter /*, rest*/]) => (
                    <Word key={firstLetter}>
                        <Letter>{firstLetter}</Letter>
                        {/*<Rest>{rest}</Rest>*/}
                    </Word>
                ))}
            </H1>
        </TitleContainer>
        <EntryP>
            Kirkkonummelainen paikallispolitiikkaa harrastava diplomi-insinööri. Kahden lapsen isä ja
            ohjelmistokehittäjä.
        </EntryP>
    </>
)

export default HomeTitle
