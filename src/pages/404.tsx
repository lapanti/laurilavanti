import React from 'react'
import tw from 'twin.macro'

import ExcerptList from '../components/ExcerptList'
import Layout from '../components/Layout'

const H1 = tw.h1`
    col-start-3 text-2xl mb-4
`

const FourZeroFour = (): JSX.Element => (
    <Layout>
        <H1>Etsimääsi sivua ei valitettavasti löytynyt, olisiko se joku seuraavista?</H1>
        <ExcerptList limit={5} />
    </Layout>
)

export default FourZeroFour
