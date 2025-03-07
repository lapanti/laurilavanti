import type { ComponentProps } from 'react'

import { render, screen } from '@testing-library/react'

import { inFrontOfWoodsImage, smilingImage, smilingImageDescription } from '../../../tests/images.mock'
import TitleBanner from './TitleBanner'

describe('<TitleBanner />', () => {
    const mockTitle = 'Banner title'
    const mockPublishDate = '4.10.2024'
    const mockTags = ['kirkkonummi', 'kuntavaalit']

    const renderHelper = ({
        backgroundImage,
        communalElectionNumber,
        imageAlt,
        imageData,
        leftAlignedTitle,
        publishDate,
        regionalElectionNumber,
        showMeta,
        tags,
        title,
    }: Partial<ComponentProps<typeof TitleBanner>> = {}) =>
        render(
            <TitleBanner
                backgroundImage={backgroundImage}
                communalElectionNumber={communalElectionNumber ?? null}
                imageAlt={imageAlt}
                imageData={imageData}
                leftAlignedTitle={leftAlignedTitle ?? false}
                publishDate={publishDate}
                regionalElectionNumber={regionalElectionNumber ?? null}
                showMeta={showMeta}
                tags={tags}
                title={title ?? mockTitle}
            />
        )

    describe.each([
        ['left aligned', true],
        ['right aligned', false],
    ])('%s', (_, leftAlignedTitle) => {
        it('should render minimal', () => {
            const { container } = renderHelper({ leftAlignedTitle })

            expect(container.firstChild).toMatchSnapshot()
        })

        it('should render', () => {
            const { container } = renderHelper({
                backgroundImage: inFrontOfWoodsImage,
                communalElectionNumber: 999,
                imageAlt: smilingImageDescription,
                imageData: smilingImage,
                leftAlignedTitle,
                publishDate: mockPublishDate,
                regionalElectionNumber: 1234,
                showMeta: true,
                tags: mockTags,
                title: mockTitle,
            })

            expect(container.firstChild).toMatchSnapshot()
        })
    })

    it('should render image without alt', () => {
        renderHelper({ backgroundImage: inFrontOfWoodsImage, imageData: smilingImage })

        // When no alt, image has role "presentation" and the background image is already there, so should find 2 pieces
        expect(screen.getAllByRole('presentation')).toHaveLength(2)
    })

    it('should render image with alt', () => {
        renderHelper({
            backgroundImage: inFrontOfWoodsImage,
            imageAlt: smilingImageDescription,
            imageData: smilingImage,
        })

        expect(screen.getByRole('presentation')).toBeInTheDocument()
        expect(screen.getByRole('img', { name: smilingImageDescription })).toBeInTheDocument()
    })

    it('should render title', () => {
        const title = 'This is a test title'
        renderHelper({ title })

        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
    })

    it('should render election numbers', () => {
        const communalElectionNumber = 999
        const regionalElectionNumber = 1234
        renderHelper({ communalElectionNumber, regionalElectionNumber })

        expect(screen.getByText(`${communalElectionNumber}`)).toBeInTheDocument()
        expect(screen.getByText(`${regionalElectionNumber}`)).toBeInTheDocument()
    })

    it('should not render meta, even if present, when no show meta', () => {
        renderHelper({ publishDate: mockPublishDate, tags: mockTags })

        expect(screen.queryByText(mockPublishDate)).toBeNull()
        mockTags.forEach((tag) => expect(screen.queryByRole('link', { name: `#${tag}` })).toBeNull())
    })

    it('should "render" meta', () => {
        const { container } = renderHelper({ showMeta: true })

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render meta', () => {
        renderHelper({ publishDate: mockPublishDate, showMeta: true, tags: mockTags })

        expect(screen.getByText(mockPublishDate)).toBeInTheDocument()
        mockTags.forEach((tag) =>
            expect(screen.getByRole('link', { name: `#${tag}` })).toHaveAttribute('href', `/kategoria/${tag}/`)
        )
    })
})
