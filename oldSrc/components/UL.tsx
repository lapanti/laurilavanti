import type { ReactNode } from 'react'

import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { sizes } from '../lib/styles'

interface Props {
    className?: string
    children: ReactNode
}

const ULComponent = ({ className, children }: Props): JSX.Element => <ul className={className}>{children}</ul>

ULComponent.displayName = 'UL'

const UL = styled(ULComponent)({
    '> li:not(:first-child)': {
        marginTop: sizes[0.5],
    },
    gridColumnStart: 3,
    listStyle: 'none',
    position: 'relative',
})

export default UL
