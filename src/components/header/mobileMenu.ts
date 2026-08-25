export const initializeMobileMenu = (container: HTMLElement) => {
    const button = container.querySelector<HTMLButtonElement>('.menu-toggle')
    const menu = container.querySelector<HTMLElement>('.links')

    if (!button || !menu) return

    const { closeLabel, openLabel } = button.dataset
    if (!openLabel || !closeLabel) return

    const isOpen = () => button.getAttribute('aria-expanded') === 'true'
    const setOpen = (open: boolean, returnFocus = false) => {
        if (open) {
            menu.hidden = false
            menu.getBoundingClientRect()
        }

        button.setAttribute('aria-expanded', String(open))
        button.setAttribute('aria-label', open ? closeLabel : openLabel)

        if (!open) menu.hidden = true
        if (returnFocus) button.focus()
    }

    button.addEventListener('click', () => setOpen(!isOpen()))
    container.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isOpen()) setOpen(false, true)
    })
    menu.addEventListener('click', (event) => {
        const target = event.target as Element | null
        if (target?.closest('a')) setOpen(false)
    })
}

export const initializeMobileMenus = (root: ParentNode = document) => {
    root.querySelectorAll<HTMLElement>('[data-mobile-menu]').forEach(initializeMobileMenu)
}

if (typeof document !== 'undefined') initializeMobileMenus()
