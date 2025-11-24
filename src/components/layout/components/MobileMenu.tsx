import type { MainNav } from '../../../types/contentful'

import { Squash as Hamburger } from 'hamburger-react'
import { useState } from 'react'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { breakpoints, colors, CONTENT_PADDING, HEADER_SIZE, sizes } from '../../../lib/styles'
import MainNavigationLink from '../header/components/MainNavigationLink'
import NavigationLink from '../header/components/NavigationLink'

const ANIMATION_DURATION = 0.3
const ANIMATION_EASING = 'ease-in-out'

const HamburgerContainer = styled.div({
    '> .hamburger-react': {
        marginLeft: 'auto',
    },

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

const Menu = styled.div<{ $hideBackgroundAndTitle?: boolean; $isOpen: boolean }>(
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
        background:
            'linear-gradient(90deg,rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.15) 25%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 100%)',
        backgroundColor: colors.evening,
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
    ({ $isOpen, $hideBackgroundAndTitle }) => ({
        [NavigationLink]: {
            opacity: $isOpen ? 100 : 0,
        },
        background: $hideBackgroundAndTitle
            ? `linear-gradient(0deg, ${colors.evening} 85%, rgba(255, 255, 255, 0) 100%)`
            : 'linear-gradient(90deg,rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.15) 25%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 100%)',
        backgroundColor: !$hideBackgroundAndTitle ? colors.evening : '',
        height: $isOpen ? `calc(100dvh - ${HEADER_SIZE})` : '0',
    })
)

interface Props {
    className?: string
    hideBackgroundAndTitle?: boolean
    links: MainNav['links']
}

const MobileMenuComponent = ({ className, hideBackgroundAndTitle, links }: Props): JSX.Element => {
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    return (
        <>
            <HamburgerContainer className={className}>
                {!hideBackgroundAndTitle && <MainNavigationLink />}
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
            <Menu $hideBackgroundAndTitle={hideBackgroundAndTitle} $isOpen={isMobileOpen} className={className}>
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
