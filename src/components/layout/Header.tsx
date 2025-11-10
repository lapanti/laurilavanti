import type { MainNav } from '../../types/contentful'

import { graphql, useStaticQuery } from 'gatsby'
import { useMemo } from 'react'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { breakpoints, colors, HEADER_SIZE, zIndices } from '../../lib/styles'
import DesktopMenu from './header/DesktopMenu'
import MobileMenu from './header/MobileMenu'

const StyledMobileMenu = styled(MobileMenu)({
    display: 'flex',
    // Hide mobile menu on desktop
    [breakpoints[1200].min]: {
        display: 'none',
    },
})

const StyledDesktopMenu = styled(DesktopMenu)({
    // Hide desktop menu on mobile
    display: 'none',
    [breakpoints[1200].min]: {
        display: 'flex',
    },
})

interface Props {
    className?: string
    isFrontPage?: boolean
}

const HeaderComponent = ({ className, isFrontPage }: Props): JSX.Element => {
    const data = useStaticQuery<{ contentfulMainNav: MainNav }>(graphql`
        {
            contentfulMainNav(titleToBeIgnored: { eq: "Main nav" }) {
                links {
                    contentful_id
                    title
                    navigationTitle
                    slug
                }
            }
        }
    `)

    const links = useMemo(
        () => data.contentfulMainNav.links.filter(({ slug }) => slug !== 'index'),
        [data.contentfulMainNav.links]
    )

    return (
        <header className={className}>
            <StyledMobileMenu isFrontPage={isFrontPage} links={links} />
            <StyledDesktopMenu links={links} />
        </header>
    )
}

HeaderComponent.displayName = 'Header'

const Header = styled(HeaderComponent)({
    backgroundColor: colors.evening,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    height: HEADER_SIZE,
    position: 'fixed',
    userSelect: 'none',
    width: '100%',
    zIndex: zIndices[50],
})

export default Header
