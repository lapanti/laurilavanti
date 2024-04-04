import type { MainNav } from '../../types/contentful'

import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import DesktopNavigation from './header/DesktopNavigation'
import MobileNavigation from './header/MobileNavigation'

interface Props {
    isFrontPage?: boolean
}

const Header = ({ isFrontPage }: Props): JSX.Element => {
    const data = useStaticQuery<{ contentfulMainNav: MainNav }>(graphql`
        {
            contentfulMainNav(titleToBeIgnored: { eq: "Main nav" }) {
                links {
                    contentful_id
                    title
                    slug
                }
            }
        }
    `)

    return (
        <>
            <MobileNavigation links={data.contentfulMainNav.links} isFrontPage={isFrontPage} />
            <DesktopNavigation links={data.contentfulMainNav.links} />
        </>
    )
}

export default Header
