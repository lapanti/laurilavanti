import React from 'react'
import { Helmet } from 'react-helmet'
import tw, { GlobalStyles } from 'twin.macro'

import Footer from './page/Footer'
import Header from './page/Header'
import Svgs from './page/Svgs'

const Main = tw.main`
    grid-in-main
`

interface Props {
    className?: string
}

const PageComponent = ({ className, children }: React.PropsWithChildren<Props>): JSX.Element => (
    <>
        <GlobalStyles />
        <div className={className}>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Helmet>
            <Header />

            <Main>{children}</Main>

            <Footer />

            <Svgs />
        </div>
    </>
)

PageComponent.displayName = 'Page'

const Page = tw(PageComponent)`
    grid grid-areas-layout grid-rows-layout grid-cols-1 gap-4.5 min-h-screen relative
`

export default Page
