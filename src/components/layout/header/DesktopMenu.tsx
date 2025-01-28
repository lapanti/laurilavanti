import type { MainNav } from '../../../types/contentful'

import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { CONTENT_PADDING, CONTENT_SIZE, sizes } from '../../../lib/styles'
import MainNavigationLink from './components/MainNavigationLink'
import NavigationLink from './components/NavigationLink'

/** Half of desktop header */
const Half = styled.div<{ $end?: boolean }>(
    {
        alignItems: 'center',
        display: 'flex',
        gap: sizes[2.5],
        width: '50%',
    },
    ({ $end }) => ({
        justifyContent: $end ? 'flex-end' : 'flex-start',
    })
)

interface Props {
    className?: string
    links: MainNav['links']
}

const DesktopMenuComponent = ({ className, links }: Props): JSX.Element => (
    <div className={className}>
        <Half>
            <MainNavigationLink />
        </Half>
        <Half $end>
            {links.map((link) => (
                <NavigationLink {...link} key={link.slug} />
            ))}
        </Half>
    </div>
)

DesktopMenuComponent.displayName = 'DesktopMenu'

const DesktopMenu = styled(DesktopMenuComponent)({
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto',
    paddingLeft: CONTENT_PADDING,
    paddingRight: CONTENT_PADDING,
    width: CONTENT_SIZE,
})

export default DesktopMenu
