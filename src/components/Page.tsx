import React from 'react'
import { Helmet } from 'react-helmet'

import Footer from './page/Footer'
import Header from './page/Header'
import Svgs from './page/Svgs'

const Page = ({ children }: React.PropsWithChildren<Record<string, unknown>>): JSX.Element => (
    <>
        <Helmet>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Helmet>
        <Header />

        <main>{children}</main>

        <Footer />

        <Svgs />
    </>
)

export default Page
