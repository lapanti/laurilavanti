import {
    breakpoints,
    colors,
    fontFamilies,
    fontSizes,
    fontWeights,
    gradients,
    gridAreas,
    gridTemplateAreasLayout,
    gridTemplateColumns,
    gridTemplateColumnsArticle,
    gridTemplateRowsLayout,
    shadows,
    sizes,
    transitions,
    zIndices,
} from './styles'

describe('styles lib', () => {
    describe('breakpoints', () => {
        it('should match snapshot', () => {
            expect(breakpoints).toMatchSnapshot()
        })
    })

    describe('spacing', () => {
        describe('sizes', () => {
            it('should match snapshot', () => {
                expect(sizes).toMatchSnapshot()
            })
        })

        describe('zIndices', () => {
            it('should match snapshot', () => {
                expect(zIndices).toMatchSnapshot()
            })
        })
    })

    describe('grid variables', () => {
        describe('gridAreas', () => {
            it('should match snapshot', () => {
                expect(gridAreas).toMatchSnapshot()
            })
        })

        describe('gridTemplateAreasLayout', () => {
            it('should match snapshot', () => {
                expect(gridTemplateAreasLayout).toMatchSnapshot()
            })
        })

        describe('gridTemplateRowsLayout', () => {
            it('should match snapshot', () => {
                expect(gridTemplateRowsLayout).toMatchSnapshot()
            })
        })

        describe('gridTemplateColumns', () => {
            it('should match snapshot', () => {
                expect(gridTemplateColumns).toMatchSnapshot()
            })
        })

        describe('gridTemplateColumnsArticle', () => {
            it('should match snapshot', () => {
                expect(gridTemplateColumnsArticle).toMatchSnapshot()
            })
        })
    })

    describe('colors', () => {
        describe('colors', () => {
            it('should match snapshot', () => {
                expect(colors).toMatchSnapshot()
            })
        })

        describe('gradients', () => {
            it('should match snapshot', () => {
                expect(gradients).toMatchSnapshot()
            })
        })

        describe('shadows', () => {
            it('should match snapshot', () => {
                expect(shadows).toMatchSnapshot()
            })
        })
    })

    describe('fonts', () => {
        describe('fontSizes', () => {
            it('should match snapshot', () => {
                expect(fontSizes).toMatchSnapshot()
            })
        })

        describe('fontFamilies', () => {
            it('should match snapshot', () => {
                expect(fontFamilies).toMatchSnapshot()
            })
        })

        describe('fontWeights', () => {
            it('should match snapshot', () => {
                expect(fontWeights).toMatchSnapshot()
            })
        })
    })

    describe('transitions', () => {
        it('should match snapshot', () => {
            expect(transitions).toMatchSnapshot()
        })
    })
})
