import type { MainNav } from '../../types/contentful'

import { graphql, useStaticQuery } from 'gatsby'
import { Squash as Hamburger } from 'hamburger-react'
import React, { useState } from 'react'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { breakpoints, colors, CONTENT_PADDING, CONTENT_SIZE, HEADER_SIZE, sizes, zIndices } from '../../lib/styles'
import NavLink from './header/NavLink'

const ANIMATION_DURATION = 0.3
const ANIMATION_EASING = 'ease-in-out'

const HamburgerContainer = styled.div({
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    marginRight: sizes[1.75],
    [breakpoints[1200].min]: {
        display: 'none',
    },
})

const MobileMenu = styled.div<{ $isOpen: boolean }>(
    {
        '@media (prefers-reduced-motion)': {
            transition: undefined,
        },
        [NavLink]: {
            '@media (prefers-reduced-motion)': {
                transition: undefined,
            },
            transition: `opacity ${ANIMATION_DURATION}s ${ANIMATION_EASING}`,
        },
        alignItems: 'center',
        background: colors.evening,
        display: 'flex',
        flexDirection: 'column',
        gap: sizes[2.5],
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'absolute',
        top: HEADER_SIZE,
        transition: `height ${ANIMATION_DURATION}s ${ANIMATION_EASING}`,
        width: '100vw',
        /** Hide the whole thing on desktop */
        [breakpoints[1200].min]: {
            display: 'none',
        },
    },
    ({ $isOpen }) => ({
        [NavLink]: {
            opacity: $isOpen ? 100 : 0,
        },
        height: $isOpen ? `calc(100vh - ${HEADER_SIZE})` : '0',
    })
)

const DesktopMenu = styled.div({
    display: 'none',
    /** Show the whole thing only on desktop */
    [breakpoints[1200].min]: {
        display: 'flex',
        flexDirection: 'row',
        margin: 'auto',
        paddingLeft: CONTENT_PADDING,
        paddingRight: CONTENT_PADDING,
        width: CONTENT_SIZE,
    },
})

/** Half of desktop header */
const Half = styled.div<{ $end?: boolean }>(
    {
        display: 'none',
        [breakpoints[1200].min]: {
            alignItems: 'center',
            display: 'flex',
            gap: sizes[2.5],
            width: '50%',
        },
    },
    ({ $end }) => ({
        justifyContent: $end ? 'flex-end' : 'flex-start',
    })
)

interface Props {
    className?: string
}

const HeaderComponent = ({ className }: Props): JSX.Element => {
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

    const [isMobileOpen, setIsMobileOpen] = useState(false)

    return (
        <header className={className}>
            <HamburgerContainer>
                <Hamburger
                    color={colors.peach}
                    distance="sm"
                    duration={ANIMATION_DURATION}
                    easing={ANIMATION_EASING}
                    label={isMobileOpen ? 'Sulje valikko' : 'Avaa valikko'}
                    size={40}
                    toggle={setIsMobileOpen}
                    toggled={isMobileOpen}
                />
            </HamburgerContainer>
            <MobileMenu $isOpen={isMobileOpen}>
                <NavLink slug="index" title="Lauri Lavanti" isFrontPage />
                {data.contentfulMainNav.links
                    .filter(({ slug }) => slug !== 'index')
                    .map((nav) => (
                        <NavLink {...nav} key={nav.slug} />
                    ))}
            </MobileMenu>
            <DesktopMenu>
                <Half>
                    <NavLink slug="index" title="Lauri Lavanti" isFrontPage />
                </Half>
                <Half $end>
                    {data.contentfulMainNav.links
                        .filter(({ slug }) => slug !== 'index')
                        .map((nav) => (
                            <NavLink {...nav} key={nav.slug} />
                        ))}
                </Half>
            </DesktopMenu>
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
