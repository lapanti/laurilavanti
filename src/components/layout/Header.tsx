import type { MainNav } from '../../types/contentful'

import { graphql, useStaticQuery } from 'gatsby'
import { Squash as Hamburger } from 'hamburger-react'
import React, { useState } from 'react'
import styled from 'styled-components'

import { breakpoints, colors, HEADER_SIZE, sizes, zIndices } from '../../lib/styles'
import NavLink from './header/NavLink'

const ANIMATION_DURATION = 0.3
const ANIMATION_EASING = 'ease-in-out'

const HamburgerContainer = styled.div({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: sizes[1.75],
    [breakpoints[1200].min]: {
        display: 'none',
    },
})

const MobileMenu = styled.div<{ $isOpen: boolean }>(
    {
        background: colors.evening,
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: sizes[2.5],
        top: HEADER_SIZE,
        width: '100vw',
        overflow: 'hidden',

        transition: `height ${ANIMATION_DURATION}s ${ANIMATION_EASING}`,
        '@media (prefers-reduced-motion)': {
            transition: undefined,
        },

        /** Hide the whole thing on desktop */
        [breakpoints[1200].min]: {
            display: 'none',
        },

        [NavLink]: {
            transition: `opacity ${ANIMATION_DURATION}s ${ANIMATION_EASING}`,
            '@media (prefers-reduced-motion)': {
                transition: undefined,
            },
        },
    },
    ({ $isOpen }) => ({
        height: $isOpen ? `calc(100vh - ${HEADER_SIZE})` : '0',
        [NavLink]: {
            opacity: $isOpen ? 100 : 0,
        },
    })
)

/** Half of desktop header */
const Half = styled.div({
    display: 'none',
    [breakpoints[1200].min]: {
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: sizes[2.5],
    },
})

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
            <Half>
                <NavLink slug="index" title="Lauri Lavanti" isFrontPage />
            </Half>
            <Half>
                {data.contentfulMainNav.links
                    .filter(({ slug }) => slug !== 'index')
                    .map((nav) => (
                        <NavLink {...nav} key={nav.slug} />
                    ))}
            </Half>
        </header>
    )
}

HeaderComponent.displayName = 'Header'

const Header = styled(HeaderComponent)({
    backgroundColor: colors.evening,
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    height: HEADER_SIZE,
    width: '100%',
    position: 'fixed',
    zIndex: zIndices[50],
    userSelect: 'none',
})

export default Header
