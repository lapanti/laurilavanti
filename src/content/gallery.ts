import type { Lang } from './nav'

export interface GalleryPhoto {
    /** Localised description of the thumbnail (the first available crop). */
    alt: Record<Lang, string>
    /** Cloudflare Images slugs per aspect crop. At least one of the three must be present. */
    crops: Partial<Record<'nelio' | 'pysty' | 'vaaka', string>>
    id: string
    /** Omit when no photographer credit applies (e.g. in-house/studio shots). */
    photographer?: string
}

/**
 * Media gallery: photos of Lauri Lavanti cleared for download under CC BY-SA 4.0 —
 * see the LICENSE file and the /media page. Most are Markus Isomeri's 2026
 * photoshoot, each offered in three aspect crops (neliö 1:1, pysty portrait, vaaka
 * landscape); the 2026 campaign studio portraits are single pysty frames instead.
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
    {
        alt: {
            en: 'Official studio portrait of Lauri Lavanti against a white background, standing with hands clasped, wearing a navy blazer and a floral shirt.',
            fi: 'Virallinen studiokuva Lauri Lavannista valkoista taustaa vasten, kädet yhdessä edessä, yllään tummansininen pikkutakki ja kukkakuvioinen paita.',
            sv: 'Officiellt studioporträtt av Lauri Lavanti mot vit bakgrund, stående med händerna knäppta, klädd i en marinblå kavaj och en blommig skjorta.',
        },
        crops: {
            pysty: 'Lauri-Lavanti-virallinen-puoluekuva',
        },
        id: 'virallinen-puoluekuva',
    },
    {
        alt: {
            en: 'Studio portrait of Lauri Lavanti against a white background, one hand in his pocket, looking slightly to the side, wearing a navy blazer and a floral shirt.',
            fi: 'Studiokuva Lauri Lavannista valkoista taustaa vasten, toinen käsi taskussa, katse hieman sivulle, yllään tummansininen pikkutakki ja kukkakuvioinen paita.',
            sv: 'Studioporträtt av Lauri Lavanti mot vit bakgrund, ena handen i fickan, blicken lätt åt sidan, klädd i en marinblå kavaj och en blommig skjorta.',
        },
        crops: {
            pysty: 'Lauri-Lavanti-studiokuvassa-kasi-taskussa-katse-vasemmalle',
        },
        id: 'studio-katse-vasemmalle',
    },
    {
        alt: {
            en: 'Studio portrait of Lauri Lavanti against a white background, jacket open with a small pin visible on the lapel, wearing a navy blazer and a floral shirt.',
            fi: 'Studiokuva Lauri Lavannista valkoista taustaa vasten, takki auki ja pieni rintamerkki näkyvissä rinnuksessa, yllään tummansininen pikkutakki ja kukkakuvioinen paita.',
            sv: 'Studioporträtt av Lauri Lavanti mot vit bakgrund, kavajen öppen med en liten pin synlig på slaget, klädd i en marinblå kavaj och en blommig skjorta.',
        },
        crops: {
            pysty: 'Lauri-Lavanti-studiokuvassa-rintamerkki-nakyvissa',
        },
        id: 'studio-rintamerkki',
    },
    {
        alt: {
            en: 'Studio portrait of Lauri Lavanti against a white background, standing at a three-quarter turn with one hand in his pocket, wearing a navy blazer and a floral shirt.',
            fi: 'Studiokuva Lauri Lavannista valkoista taustaa vasten, seisoo hieman sivuttain toinen käsi taskussa, yllään tummansininen pikkutakki ja kukkakuvioinen paita.',
            sv: 'Studioporträtt av Lauri Lavanti mot vit bakgrund, stående lätt vriden i sidled med ena handen i fickan, klädd i en marinblå kavaj och en blommig skjorta.',
        },
        crops: {
            pysty: 'Lauri-Lavanti-studiokuvassa-sivuttain-kasi-taskussa',
        },
        id: 'studio-sivuttain',
    },
]
