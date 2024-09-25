import React from 'react'
import styled from 'styled-components'

import {
    colors,
    fontFamilies,
    fontSizes,
    fontWeights,
    gradients,
    gridTemplateColumnsArticle,
    sizes,
    zIndices,
} from '../../lib/styles'

const H1 = styled.h1({
    gridColumnStart: 3,
    fontFamily: fontFamilies.sans,
    fontWeight: fontWeights.black,
    color: colors.white,
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: sizes[1],
    ...fontSizes['6xl'],
})

interface Props {
    className?: string
    title: string
}

const TitleComponent = ({ className, title }: Props): JSX.Element => (
    <section className={className}>
        <H1 itemProp="headline">{title}</H1>
    </section>
)

TitleComponent.displayName = 'Title'

const Title = styled(TitleComponent)({
    display: 'grid',
    gridTemplateColumns: gridTemplateColumnsArticle,
    gridColumn: '1 / -1',
    marginTop: `-${sizes[14]}`,
    zIndex: zIndices[40],
    maxWidth: `min(100%, ${sizes.fullHd})`,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    backgroundImage: gradients.fromBlackToTop,
})

export default Title
