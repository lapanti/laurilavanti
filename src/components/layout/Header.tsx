import type { MainNav } from '../../types/contentful'

import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import tw from 'twin.macro'

import InternalLink from '../InternalLink'

const Input = tw.input`
    invisible fixed top-0 -right-96 w-px h-px border-none border-0 outline-none
`

const Label = tw.label`
    cursor-pointer
    h-12 w-12 mt-2 mr-2
    flex items-center justify-center
`

const OpenLabel = tw(Label)`
    box-border bg-opacity-75 bg-white rounded-md rounded-tl-sm rounded-br-sm
`

const Svg = tw.svg`
    h-8 w-8
`

const Nav = tw.nav`
    fixed top-0
    invisible -right-64
    w-60 h-screen flex flex-col items-end
    bg-lightGrey
    peer-checked:visible peer-checked:right-0 transition-all duration-300 ease-in
`

const CloseLabel = tw(Label)`
    
`

const NavLink = tw(InternalLink)`
    w-full pl-4 mt-4 first-of-type:mt-0
    text-xl text-navLink hover:text-accent active:text-accent
`

interface Props {
    className?: string
}

const INPUT_ID = 'toggle-main-navigation'

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
    return (
        <header className={className}>
            <Input id={INPUT_ID} type="checkbox" className="peer" />
            <OpenLabel htmlFor={INPUT_ID}>
                <Svg>
                    <use xlinkHref="#icon-bars" />
                </Svg>
            </OpenLabel>
            <Nav>
                <CloseLabel htmlFor={INPUT_ID}>
                    <Svg>
                        <use xlinkHref="#icon-bars" />
                    </Svg>
                </CloseLabel>
                {data.contentfulMainNav.links.map((nav) => (
                    <NavLink
                        key={nav.slug}
                        partiallyActive
                        activeStyle={{ textDecoration: 'underline' }}
                        to={`/${nav.slug}`}
                    >
                        {nav.title}
                    </NavLink>
                ))}
            </Nav>
        </header>
    )
}

HeaderComponent.displayName = 'Header'

const Header = tw(HeaderComponent)`
  flex justify-end box-border w-full max-w-screen-fullhd fixed z-50 select-none 
`

export default Header
