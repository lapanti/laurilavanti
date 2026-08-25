import { Window } from 'happy-dom'
import { describe, expect, it } from 'vitest'

import { initializeMobileMenus } from './mobileMenu'

const renderMenu = () => {
    const window = new Window()
    const document = window.document as unknown as Document
    document.body.innerHTML = `
        <div data-mobile-menu>
            <button
                aria-controls="mobile-primary-navigation"
                aria-expanded="false"
                aria-label="Open menu"
                class="menu-toggle"
                data-close-label="Close menu"
                data-open-label="Open menu"
                type="button"
            ></button>
            <nav class="links" hidden id="mobile-primary-navigation">
                <a href="/next/">Next</a>
            </nav>
        </div>
    `

    const container = document.querySelector<HTMLElement>('[data-mobile-menu]')
    const button = document.querySelector<HTMLButtonElement>('.menu-toggle')
    const menu = document.querySelector<HTMLElement>('.links')
    const link = document.querySelector<HTMLAnchorElement>('.links a')
    if (!container || !button || !menu || !link) throw new Error('Mobile menu fixture is incomplete')

    initializeMobileMenus(document)

    return { button, container, document, link, menu, window }
}

describe('initializeMobileMenus', () => {
    it('toggles the controlled menu and localized button state', () => {
        const { button, menu } = renderMenu()

        button.click()

        expect(button).toHaveAttribute('aria-expanded', 'true')
        expect(button).toHaveAttribute('aria-label', 'Close menu')
        expect(menu).not.toHaveAttribute('hidden')

        button.click()

        expect(button).toHaveAttribute('aria-expanded', 'false')
        expect(button).toHaveAttribute('aria-label', 'Open menu')
        expect(menu).toHaveAttribute('hidden')
    })

    it('closes on Escape and returns focus to the disclosure button', () => {
        const { button, container, document, menu, window } = renderMenu()
        button.click()

        const event = new window.KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }) as unknown as KeyboardEvent
        container.dispatchEvent(event)

        expect(button).toHaveAttribute('aria-expanded', 'false')
        expect(menu).toHaveAttribute('hidden')
        expect(document.activeElement).toBe(button)
    })

    it('closes before an activated link reaches document navigation handling', () => {
        const { button, document, link, menu } = renderMenu()
        button.click()
        let expandedAtNavigation: string | null = null
        document.addEventListener(
            'click',
            (event) => {
                event.preventDefault()
                expandedAtNavigation = button.getAttribute('aria-expanded')
            },
            { once: true }
        )

        link.click()

        expect(expandedAtNavigation).toBe('false')
        expect(menu).toHaveAttribute('hidden')
    })
})
