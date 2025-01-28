import type { MainNav } from '../../../types/contentful'

import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { colors, fontFamilies, fontSizes } from '../../../lib/styles'
import InternalLink from '../../InternalLink'

interface Props {
    className?: string
    title: string
    hideIfCurrent?: boolean
}

const MainNavigationLinkComponent = ({ className, title, hideIfCurrent }: Props): JSX.Element => (
    <InternalLink
        $color={colors.peach}
        activeStyle={hideIfCurrent ? { visibility: 'hidden' } : undefined}
        className={className}
        title={title}
        to="/"
    >
        {title}
    </InternalLink>
)

MainNavigationLinkComponent.displayName = 'MainNavigationLink'

const MainNavigationLink = styled(MainNavigationLinkComponent)({
    ...fontSizes[1.75],
    fontFamily: fontFamilies.heading,
})

export default MainNavigationLink
