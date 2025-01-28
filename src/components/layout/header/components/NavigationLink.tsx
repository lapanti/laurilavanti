import type { MainNav } from '../../../../types/contentful'

import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { colors, fontFamilies, fontSizes } from '../../../../lib/styles'
import InternalLink from '../../../InternalLink'

type Link = Omit<MainNav['links'][number], 'contentful_id'>

interface Props extends Link {
    className?: string
}

const NavigationLinkComponent = ({ className, title, navigationTitle, slug }: Props): JSX.Element => (
    <InternalLink
        $color={colors.peach}
        activeStyle={{ textDecoration: 'underline' }}
        className={className}
        title={title}
        to={`/${slug}/`}
        partiallyActive
    >
        {navigationTitle ?? title}
    </InternalLink>
)

NavigationLinkComponent.displayName = 'NavigationLink'

const NavigationLink = styled(NavigationLinkComponent)({
    ...fontSizes[1.5],
    fontFamily: fontFamilies.sans,
})

export default NavigationLink
