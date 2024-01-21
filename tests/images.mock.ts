import type { ImageDataLike } from 'gatsby-plugin-image'

export const mainImage: ImageDataLike = {
    childImageSharp: {
        gatsbyImageData: {
            images: {
                sources: [
                    {
                        srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/5aPvGwEnquvx8jkXJmkYE5/25e52ab22adc2730dce65ab3686cf060/Lauri-Lavanti-21-9.jpg?w=1008&h=432&q=50&fm=webp 1008w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/5aPvGwEnquvx8jkXJmkYE5/25e52ab22adc2730dce65ab3686cf060/Lauri-Lavanti-21-9.jpg?w=2016&h=864&q=50&fm=webp 2016w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/5aPvGwEnquvx8jkXJmkYE5/25e52ab22adc2730dce65ab3686cf060/Lauri-Lavanti-21-9.jpg?w=4000&h=1714&q=50&fm=webp 4000w',
                        sizes: '(min-width: 4032px) 4032px, 100vw',
                        type: 'image/webp',
                    },
                ],
                fallback: {
                    src: 'https://images.ctfassets.net/44t6u1r4zgqq/5aPvGwEnquvx8jkXJmkYE5/25e52ab22adc2730dce65ab3686cf060/Lauri-Lavanti-21-9.jpg?w=1008&h=432&fl=progressive&q=50&fm=jpg',
                    srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/5aPvGwEnquvx8jkXJmkYE5/25e52ab22adc2730dce65ab3686cf060/Lauri-Lavanti-21-9.jpg?w=1008&h=432&fl=progressive&q=50&fm=jpg 1008w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/5aPvGwEnquvx8jkXJmkYE5/25e52ab22adc2730dce65ab3686cf060/Lauri-Lavanti-21-9.jpg?w=2016&h=864&fl=progressive&q=50&fm=jpg 2016w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/5aPvGwEnquvx8jkXJmkYE5/25e52ab22adc2730dce65ab3686cf060/Lauri-Lavanti-21-9.jpg?w=4000&h=1714&fl=progressive&q=50&fm=jpg 4000w',
                    sizes: '(min-width: 4032px) 4032px, 100vw',
                },
            },
            layout: 'constrained',
            width: 4032,
            height: 1728,
            placeholder: {
                fallback:
                    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAJABQDAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABQT/xAAiEAACAQIGAwEAAAAAAAAAAAABAhEAAwQFEhMxcTI1QXL/xAAYAQEAAwEAAAAAAAAAAAAAAAADAAIEAf/EABsRAQACAwEBAAAAAAAAAAAAAAABAgMRMSES/9oADAMBAAIRAxEAPwA6zlpYFt6BMERxQ7X+TOZ4BsFhVu7qvpUK2lYHdTLTUbHb3kASzIYVWjn6aBWfV9vxPVLLQQz71dj8iu5OQO/Atrg91msN/9k=',
            },
        },
    },
} as unknown as ImageDataLike

export const mainImageDescription: string = 'Kuva Lauri Lavannista, taustalla näkyy metsää'
