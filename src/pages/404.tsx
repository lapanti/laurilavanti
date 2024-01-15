import React from 'react'
import styled from 'styled-components'

import ExcerptList from '../components/ExcerptList'
import Layout from '../components/Layout'
import { fontSizes, sizes } from '../lib/styles'

export const H1 = styled.h1({
    gridColumnStart: 3,
    marginBottom: sizes[4],
    marginTop: sizes[8],
    ...fontSizes['2xl'],
})

const FourZeroFour = (): JSX.Element => (
    <Layout>
        <H1>Etsimääsi sivua ei valitettavasti löytynyt, olisiko se joku seuraavista?</H1>
        <ExcerptList limit={5} />
    </Layout>
)

export default FourZeroFour
