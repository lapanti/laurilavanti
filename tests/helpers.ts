import type { ContainerRenderOptions } from 'astro/container'

import { experimental_AstroContainer as AstroContainer } from 'astro/container' // eslint-disable-line import/no-unresolved

type AstroComponentFactory = Parameters<AstroContainer['renderToString']>[0]

type ComponentContainerRenderOptions<T extends AstroComponentFactory> = Omit<ContainerRenderOptions, 'props'> & {
    // @ts-expect-error ComponentProps expects a type that extends a function of arity 1, but AstroComponentFactory is a function of arity 3.
    props?: ComponentProps<T>
}

/**
 * Based on https://angelika.me/2025/02/01/astro-component-unit-tests/
 *
 * @param Component
 * @param options
 * @returns
 */
export const renderAstroComponent = async <T extends AstroComponentFactory>(
    Component: T,
    options: ComponentContainerRenderOptions<T> = {}
) => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Component, options)

    const div = document.createElement('div')
    div.innerHTML = result
    return div
}
