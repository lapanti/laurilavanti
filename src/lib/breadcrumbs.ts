import type { Lang } from '../content/nav'

/** Trilingual breadcrumb labels shared by PostLayout and PageLayout. */
export const breadcrumbLabels: Record<'blog' | 'category' | 'home', Record<Lang, string>> = {
    blog: { en: 'Blog', fi: 'Blogi', sv: 'Blogg' },
    category: { en: 'Category', fi: 'Kategoria', sv: 'Kategori' },
    home: { en: 'Home', fi: 'Etusivu', sv: 'Hem' },
}
