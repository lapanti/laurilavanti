import React from 'react'
import tw from 'twin.macro'

import Link from '../Link'

const Nav = tw.nav`
    flex flex-row items-center justify-between h-full my-0 mx-4.5
`

const NavLink = tw(Link)`
    text-navLink hover:text-accent active:text-accent
`

const LogoLink = tw(NavLink)`
    flex flex-row items-center text-2xl font-semibold
`

const Svg = tw.svg`
    h-9 w-9
`

const Title = tw.span`
    hidden 700:inline 700:ml-2 mr-4.5
`

const List = tw.ul`
    flex flex-row items-center h-full
`

const Item = tw.li`
    mr-2 h-full
`

const MainLink = tw(NavLink)`
text-xl flex items-center h-full
`

const MAIN_NAV = [
    {
        title: 'Minusta',
        url: '/minusta',
    },
    {
        title: 'Blogi',
        url: '/blogi',
    },
    {
        title: 'Ota yhteyttä',
        url: '/ota-yhteytta',
    },
]

interface Props {
    className?: string
}

const HeaderComponent = ({ className }: Props): JSX.Element => (
    <header className={className}>
        <Nav>
            <LogoLink to="/">
                <Svg>
                    <use xlinkHref="#logo" />
                </Svg>
                <Title>Lauri Lavanti</Title>
            </LogoLink>
            <List>
                {MAIN_NAV.map((nav) => (
                    <Item key={nav.url}>
                        <MainLink partiallyActive activeStyle={{ textDecoration: 'underline' }} to={nav.url}>
                            {nav.title}
                        </MainLink>
                    </Item>
                ))}
            </List>
        </Nav>
    </header>
)

HeaderComponent.displayName = 'Header'

const Header = tw(HeaderComponent)`
  grid-in-header flex flex-col justify-center shadow max-w-screen-fullhd w-full my-0 mx-auto sticky top-0 bg-white z-50
`

export default Header
