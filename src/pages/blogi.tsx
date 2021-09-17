import type { PageProps } from 'gatsby'

import React from 'react'

import ExcerptList from '../components/ExcerptList'
import Page from '../components/Page'

const Blog = ({ location }: PageProps): JSX.Element => (
    <Page title="Blogi" location={location}>
        <ExcerptList />
    </Page>
)

export default Blog
