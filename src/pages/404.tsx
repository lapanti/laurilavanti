import React from 'react'
import styled from 'styled-components'

import ExcerptList from '../components/ExcerptList'
import Layout from '../components/Layout'
import { fontSizes, sizes } from '../lib/styles'

const H1 = styled.h1({
    gridColumnStart: 3,
    marginBottom: sizes[1],
    marginTop: sizes[2],
    ...fontSizes['2xl'],
})

const FourZeroFour = (): JSX.Element => (
    <Layout title="">
        <H1>Etsimääsi sivua ei valitettavasti löytynyt, olisiko se joku seuraavista?</H1>
        <ExcerptList limit={5} />
    </Layout>
)

export default FourZeroFour
