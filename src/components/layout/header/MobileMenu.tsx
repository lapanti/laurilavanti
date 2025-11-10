import type { MainNav } from '../../../types/contentful'

import { Squash as Hamburger } from 'hamburger-react'
import { useState } from 'react'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { breakpoints, colors, CONTENT_PADDING, HEADER_SIZE, sizes } from '../../../lib/styles'
import MainNavigationLink from './components/MainNavigationLink'
import NavigationLink from './components/NavigationLink'

const ANIMATION_DURATION = 0.3
const ANIMATION_EASING = 'ease-in-out'

const HamburgerContainer = styled.div({
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: CONTENT_PADDING,
    marginRight: CONTENT_PADDING,
    [breakpoints[1200].min]: {
        display: 'none',
    },
})

const Menu = styled.div<{ $isOpen: boolean }>(
    {
        '@media (prefers-reduced-motion)': {
            transition: undefined,
        },
        [NavigationLink]: {
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
        [NavigationLink]: {
            opacity: $isOpen ? 100 : 0,
        },
        height: $isOpen ? `calc(100vh - ${HEADER_SIZE})` : '0',
    })
)

interface Props {
    className?: string
    isFrontPage?: boolean
    links: MainNav['links']
}

const MobileMenuComponent = ({ className, isFrontPage, links }: Props): JSX.Element => {
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    return (
        <>
            <HamburgerContainer className={className}>
                <MainNavigationLink isFrontPage={isFrontPage} />
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
            <Menu $isOpen={isMobileOpen} className={className}>
                {links.map((nav) => (
                    <NavigationLink {...nav} key={nav.slug} />
                ))}
            </Menu>
        </>
    )
}

MobileMenuComponent.displayName = 'MobileMenu'

const MobileMenu = styled(MobileMenuComponent)({})

export default MobileMenu
