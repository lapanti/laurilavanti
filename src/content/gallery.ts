import type { Lang } from './nav'

export interface GalleryPhoto {
    /** Localised description of the thumbnail (the neliö crop). */
    alt: Record<Lang, string>
    /** Cloudflare Images slugs for each aspect crop of the same photo. */
    crops: { nelio: string; pysty: string; vaaka: string }
    id: string
    photographer: string
}

/**
 * Media gallery: five photos from Markus Isomeri's 2026 photoshoot, each offered in
 * three aspect crops (neliö 1:1, pysty portrait, vaaka landscape). Cleared for
 * download under CC BY-SA 4.0 — see the LICENSE file and the /media page.
 */
export const galleryPhotos: GalleryPhoto[] = [
    {
        alt: {
            en: 'Lauri Lavanti smiling at the camera in a close-up portrait, with the dark seating rows of an Aalto University auditorium behind him.',
            fi: 'Lauri Lavanti hymyilee kameralle lähikuvassa, taustalla Aalto-yliopiston auditorion tummat penkkirivit.',
            sv: 'Lauri Lavanti ler mot kameran i en närbild, med de mörka bänkraderna i en föreläsningssal på Aalto-universitetet i bakgrunden.',
        },
        crops: {
            nelio: 'Lauri-Lavanti-aalto-yliopiston-paarakennuksen-auditoriossa-hymyilee-nelio',
            pysty: 'Lauri-Lavanti-aalto-yliopiston-paarakennuksen-auditoriossa-hymyilee-pysty',
            vaaka: 'Lauri-Lavanti-aalto-yliopiston-paarakennuksen-auditoriossa-hymyilee-vaaka',
        },
        id: 'aalto-auditorio',
        photographer: 'Markus Isomeri',
    },
    {
        alt: {
            en: 'Lauri Lavanti looking straight into the camera in front of a board-formed concrete wall, wearing a navy blazer and a floral shirt.',
            fi: 'Lauri Lavanti katsoo suoraan kameraan betoniseinän edessä, yllään tummansininen pikkutakki ja kukkakuvioinen paita.',
            sv: 'Lauri Lavanti tittar rakt in i kameran framför en betongvägg, klädd i en marinblå kavaj och en blommig skjorta.',
        },
        crops: {
            nelio: 'Lauri-Lavanti-dipolissa-kivimuurin-edessa-katse-kameraan-nelio',
            pysty: 'Lauri-Lavanti-dipolissa-kivimuurin-edessa-katse-kameraan-pysty',
            vaaka: 'Lauri-Lavanti-dipolissa-kivimuurin-edessa-katse-kameraan-vaaka',
        },
        id: 'dipoli-katse-kameraan',
        photographer: 'Markus Isomeri',
    },
    {
        alt: {
            en: 'Lauri Lavanti gazing thoughtfully upwards in front of a board-formed concrete wall, wearing a navy blazer and a floral shirt.',
            fi: 'Lauri Lavanti katsoo mietteliäänä ylöspäin betoniseinän edessä, yllään tummansininen pikkutakki ja kukkakuvioinen paita.',
            sv: 'Lauri Lavanti blickar eftertänksamt uppåt framför en betongvägg, klädd i en marinblå kavaj och en blommig skjorta.',
        },
        crops: {
            nelio: 'Lauri-Lavanti-dipolissa-kivimuurin-edessa-mietteliaana-nelio',
            pysty: 'Lauri-Lavanti-dipolissa-kivimuurin-edessa-mietteliaana-pysty',
            vaaka: 'Lauri-Lavanti-dipolissa-kivimuurin-edessa-mietteliaana-vaaka',
        },
        id: 'dipoli-mietteliaana',
        photographer: 'Markus Isomeri',
    },
    {
        alt: {
            en: 'Lauri Lavanti smiling gently in front of the glass facade of the Dipoli building, framed by warm wooden mullions.',
            fi: 'Lauri Lavanti hymyilee kevyesti Dipolin lasijulkisivun edessä, taustalla lämpimät puiset ikkunapuitteet.',
            sv: 'Lauri Lavanti ler lätt framför Dipolis glasfasad, inramad av varma träspröjsar.',
        },
        crops: {
            nelio: 'Lauri-Lavanti-dipolissa-lasijulkisivun-edessa-nelio',
            pysty: 'Lauri-Lavanti-dipolissa-lasijulkisivun-edessa-pystykuva',
            vaaka: 'Lauri-Lavanti-dipolissa-lasijulkisivun-edessa-veistoksen-vieressa',
        },
        id: 'dipoli-lasijulkisivu',
        photographer: 'Markus Isomeri',
    },
    {
        alt: {
            en: 'Lauri Lavanti sitting on outdoor stone steps with a laptop on his lap, smiling at the camera, wearing a navy blazer and beige chinos.',
            fi: 'Lauri Lavanti istuu ulkoportailla kannettava tietokone sylissään ja hymyilee kameralle, yllään tummansininen pikkutakki ja beiget housut.',
            sv: 'Lauri Lavanti sitter på en utomhustrappa med en bärbar dator i knäet och ler mot kameran, klädd i en marinblå kavaj och beiga byxor.',
        },
        crops: {
            nelio: 'Lauri-Lavanti-kannettavan-tietokoneen-aarella-nelio',
            pysty: 'Lauri-Lavanti-tyoskentelee-portailla-koko-vartalo',
            vaaka: 'Lauri-Lavanti-tyoskentelee-portailla-vaaka',
        },
        id: 'portailla',
        photographer: 'Markus Isomeri',
    },
]
