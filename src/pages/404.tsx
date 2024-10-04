import React from 'react'
import styled from 'styled-components'

import ExcerptList from '../components/ExcerptList'
import Layout from '../components/Layout'
import { fontSizes, HEADER_SIZE } from '../lib/styles'

const H1 = styled.h1({
    gridColumnStart: 3,
    marginTop: HEADER_SIZE,
    ...fontSizes['1.5'],
})

const FourZeroFour = (): JSX.Element => (
    <Layout title="" leftAlignedTitle>
        <H1>Etsimääsi sivua ei valitettavasti löytynyt, olisiko se joku seuraavista?</H1>
        <ExcerptList limit={8} />
    </Layout>
)

export default FourZeroFour
