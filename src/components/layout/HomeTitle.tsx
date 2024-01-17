import React from 'react'
import styled, { css, keyframes } from 'styled-components'

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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginBottom: sizes[4],
    overflow: 'visible',
})

const Word = styled.span({
    display: 'flex',
})

const slideIn = keyframes`
    from {
        transform: translateX(-20rem);
    }

    to {
        transform: translateX(0);
    }
`

const Letter = styled.span<{ index: number }>(
    {
        textShadow: 'black 1px 1px 1px',
        width: sizes[10],
        display: 'flex',
        justifyContent: 'center',
    },
    ({ index }) => css`
        animation: ${slideIn} 1 ${1 - index / 10}s ease-in-out;
    `
)

interface Props {
    className?: string
}

const HomeTitleComponent = ({ className }: Props) => (
    <div className={className}>
        <H1 aria-label="Lauri Lavanti">
            {['L', 'A', 'U', 'R', 'I'].map((firstLetter, i) => (
                <Word key={firstLetter}>
                    <Letter index={i}>{firstLetter}</Letter>
                </Word>
            ))}
        </H1>
    </div>
)

HomeTitleComponent.displayName = 'HomeTitle'

const HomeTitle = styled(HomeTitleComponent)({
    zIndex: zIndices[40],
    gridColumn: '1 / -1',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: `-${sizes[164]}`,
    display: 'grid',
    height: sizes[164],
    width: '100%',
    maxWidth: sizes.fullHd,
    gridTemplateColumns: gridTemplateColumnsArticle,
    overflow: 'hidden',
    backgroundImage: gradients.fromLeftToRight,
    fontFamily: fontFamilies.heading,
    fontWeight: fontWeights.black,
    color: colors.white,
    ...fontSizes['6xl'],
})

export default HomeTitle
