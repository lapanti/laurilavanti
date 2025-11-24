import type { MainNav } from '../../types/contentful'

import { graphql, useStaticQuery } from 'gatsby'
import { useMemo } from 'react'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { breakpoints, colors, HEADER_SIZE, zIndices } from '../../lib/styles'
import MobileMenu from './components/MobileMenu'
import DesktopMenu from './header/DesktopMenu'

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
    hideBackgroundAndTitle?: boolean
}

const HeaderComponent = ({ className, hideBackgroundAndTitle }: Props): JSX.Element => {
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
            <StyledMobileMenu hideBackgroundAndTitle={hideBackgroundAndTitle} links={links} />
            <StyledDesktopMenu links={links} />
        </header>
    )
}

HeaderComponent.displayName = 'Header'

const Header = styled(HeaderComponent)(
    {
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        height: HEADER_SIZE,
        userSelect: 'none',
        width: '100%',
        zIndex: zIndices[50],
    },
    ({ hideBackgroundAndTitle }) =>
        !hideBackgroundAndTitle
            ? {
                  background:
                      'linear-gradient(90deg,rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.15) 25%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 100%)',
                  backgroundColor: colors.evening,
                  boxShadow: 'hsla(0 0% 0% / 0.1) 0 0.5rem 1rem',
                  position: 'fixed',
              }
            : {
                  position: 'absolute',
              }
)

export default Header
