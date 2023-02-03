import type { MainNav } from '../../types/contentful'

import { graphql, useStaticQuery } from 'gatsby'
import React, { useCallback, useState } from 'react'
/** @ts-expect-error twin.macro typings are incomplete :/ */
import tw, { styled } from 'twin.macro'

import H2 from '../H2'
import NavLink from './header/NavLink'

const Heading = styled(H2)(({ isVisible }: { isVisible: boolean }) => [
    tw`
    bg-opacity-75 bg-white p-2 rounded-md rounded-tr-sm rounded-bl-sm
`,
    isVisible ? tw`visible` : tw`invisible`,
])

const CloseButton = tw.button`
    cursor-pointer
    h-12 w-12
    flex items-center justify-center
`

const OpenButton = styled(CloseButton)(({ isOpen }: { isOpen: boolean }) => [
    tw`
        box-border bg-opacity-75 bg-white rounded-md rounded-tl-sm rounded-br-sm
        transition-all duration-300 ease-out
    `,
    isOpen ? tw`invisible` : tw`visible`,
])

const Svg = tw.svg`
    h-8 w-8
`

const CloseBG = styled(CloseButton)(({ isOpen }: { isOpen: boolean }) => [
    tw`
        absolute top-0 w-screen h-screen bg-transparent
    `,
    isOpen ? tw`visible left-0` : tw`invisible left-full`,
])

const Nav = styled.nav(({ isOpen }: { isOpen: boolean }) => [
    tw`
        fixed top-0
        w-72 h-screen flex flex-col items-end
        bg-opacity-90 bg-white
        transition-all duration-300 ease-in
        shadow
    `,
    isOpen ? tw`visible right-0` : tw`invisible -right-80`,
])

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
            <OpenButton aria-label="Avaa valikko" onClick={openMenu} isOpen={isOpen}>
                <Svg aria-hidden="true">
                    <use xlinkHref="#icon-bars" />
                </Svg>
            </OpenButton>
            <CloseBG onClick={closeMenu} aria-hidden="true" isOpen={isOpen} />
            <Nav aria-expanded={isOpen} isOpen={isOpen}>
                <CloseButton aria-label="Sulje valikko" onClick={closeMenu}>
                    <Svg aria-hidden="true">
                        <use xlinkHref="#icon-close" />
                    </Svg>
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

const Header = tw(HeaderComponent)`
  flex flex-row-reverse p-2 items-center justify-between box-border w-full fixed z-50 select-none 
`

export default Header
