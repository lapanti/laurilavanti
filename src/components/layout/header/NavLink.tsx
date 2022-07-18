import type { MainNav } from '../../../types/contentful'

import React from 'react'
import tw from 'twin.macro'

import InternalLink from '../../InternalLink'

type Link = MainNav['links'][number]

interface Props extends Link {
    className?: string
}

const NavLinkComponent = ({ className, title, slug }: Props): JSX.Element => (
    <InternalLink
        className={className}
        partiallyActive
        activeStyle={{ textDecoration: 'underline' }}
        to={slug === 'index' ? '/' : `/${slug}/`}
    >
        {title}
    </InternalLink>
)

NavLinkComponent.displayName = 'NavLink'

const NavLink = tw(NavLinkComponent)`
    w-full pl-8 mt-6 first-of-type:mt-0
    text-xl text-navLink hover:text-accent active:text-accent
`

export default NavLink
