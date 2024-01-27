import type { MainNav } from '../../types/contentful'

import { graphql, useStaticQuery } from 'gatsby'
import React, { useCallback, useState } from 'react'
import { FaBars, FaXmark } from 'react-icons/fa6'
import styled from 'styled-components'

import { colors, shadows, sizes, zIndices } from '../../lib/styles'
import H2 from '../H2'
import NavLink from './header/NavLink'

const Heading = styled(H2)<{ isVisible?: boolean }>(
    {
        padding: sizes[2],
        backgroundColor: colors.white75,
        borderRadius: sizes[1.5],
        borderTopRightRadius: sizes[0.5],
        borderBottomLeftRadius: sizes[0.5],
    },
    ({ isVisible }) => ({
        visibility: isVisible ? 'visible' : 'hidden',
    })
)

const CloseButton = styled.button({
    cursor: 'pointer',
    height: sizes[12],
    width: sizes[12],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

const OpenButton = styled(CloseButton)<{ $isOpen: boolean }>(
    {
        boxSizing: 'border-box',
        background: colors.white75,
        borderRadius: sizes[1.5],
        borderTopLeftRadius: sizes[0.5],
        borderBottomRightRadius: sizes[0.5],
        transition: 'all',
        transitionDuration: '300ms',
        transitionTimingFunction: 'ease-out',
    },
    ({ $isOpen }) => ({
        visibility: $isOpen ? 'hidden' : 'visible',
    })
)

const logoStyles = {
    height: sizes[8],
    width: sizes[8],
}

const Bars = styled(FaBars)(logoStyles)

const Close = styled(FaXmark)(logoStyles)

const CloseBG = styled(CloseButton)<{ $isOpen: boolean }>(
    {
        position: 'absolute',
        top: sizes[0],
        width: '100vw',
        height: '100vh',
        background: colors.transparent,
    },
    ({ $isOpen }) => ({
        visibility: $isOpen ? 'visible' : 'hidden',
        left: $isOpen ? sizes[0] : '100%',
    })
)

const Nav = styled.nav<{ $isOpen: boolean }>(
    {
        position: 'fixed',
        top: sizes[0],
        width: sizes[72],
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        background: colors.white90,
        transition: 'all',
        transitionDuration: '300ms',
        transitionTimingFunction: 'ease-in',
        boxShadow: shadows.base,
    },
    ({ $isOpen }) => ({
        visibility: $isOpen ? 'visible' : 'hidden',
        right: $isOpen ? sizes[0] : `-${sizes[80]}`,
    })
)

interface Props {
    className?: string
    isFrontPage?: boolean
}

const HeaderComponent = ({ className, isFrontPage }: Props): JSX.Element => {
    const data = useStaticQuery<{ contentfulMainNav: MainNav }>(graphql`
        query Header {
            contentfulMainNav(titleToBeIgnored: { eq: "Main nav" }) {
                links {
                    contentful_id
                    title
                    slug
                }
            }
        }
    `)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const openMenu = useCallback(() => setIsOpen(true), [])
    const closeMenu = useCallback(() => setIsOpen(false), [])

    return (
        <header className={className}>
            <OpenButton aria-label="Avaa valikko" onClick={openMenu} $isOpen={isOpen}>
                <Bars aria-hidden="true" />
            </OpenButton>
            <CloseBG onClick={closeMenu} aria-hidden="true" $isOpen={isOpen} />
            <Nav aria-expanded={isOpen} $isOpen={isOpen}>
                <CloseButton aria-label="Sulje valikko" onClick={closeMenu}>
                    <Close aria-hidden="true" />
                </CloseButton>
                {data.contentfulMainNav.links.map((nav) => (
                    <NavLink {...nav} key={nav.slug} />
                ))}
            </Nav>
            <Heading isVisible={!isFrontPage}>Lauri Lavanti</Heading>
        </header>
    )
}

HeaderComponent.displayName = 'Header'

const Header = styled(HeaderComponent)({
    display: 'flex',
    flexDirection: 'row-reverse',
    padding: sizes[2],
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    width: '100%',
    position: 'fixed',
    zIndex: zIndices[50],
    userSelect: 'none',
})

export default Header
