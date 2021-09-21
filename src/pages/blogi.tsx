import React from 'react'

import ExcerptList from '../components/ExcerptList'
import Page from '../components/Page'
import { WEBPAGE } from '../types/jsonld'

const Blog = (): JSX.Element => (
    <Page title="Blogi" pathname="/blogi" type={WEBPAGE}>
        <ExcerptList />
    </Page>
)

export default Blog
