import React from 'react'
import tw from 'twin.macro'

import ExcerptList from '../components/ExcerptList'
import Page from '../components/Page'

const H1 = tw.h1`
    col-start-3 text-2xl mb-4
`

const FourZeroFour = (): JSX.Element => (
    <Page>
        <H1>Etsimääsi sivua ei valitettavasti löytynyt, olisiko se joku seuraavista?</H1>
        <ExcerptList limit={5} />
    </Page>
)

export default FourZeroFour
