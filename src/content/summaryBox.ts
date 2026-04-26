import type { Lang } from './nav'

interface SummaryBoxContent {
    collapseLabel: string
    expandLabel: string
}

export const summaryBoxContent: Record<Lang, SummaryBoxContent> = {
    en: { collapseLabel: 'Less', expandLabel: 'More' },
    fi: { collapseLabel: 'Vähemmän', expandLabel: 'Lisää' },
    sv: { collapseLabel: 'Mindre', expandLabel: 'Mer' },
}
