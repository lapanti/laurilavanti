import test from '@playwright/test'

const blogiTagRedirects: Array<[string, string]> = [
    ['/blogi/opetus/', '/fi/kategoria/opetus/'],
    ['/blogi/varhaiskasvatus/', '/fi/kategoria/varhaiskasvatus/'],
    ['/blogi/valtuustoaloite/', '/fi/kategoria/valtuustoaloite/'],
    ['/blogi/teknologia/', '/fi/kategoria/teknologia/'],
    ['/blogi/infra/', '/fi/kategoria/infra/'],
    ['/blogi/kuntavaalit2025/', '/fi/kategoria/kuntavaalit-2025/'],
    ['/blogi/sosiaalinen-media/', '/fi/kategoria/sosiaalinen-media/'],
    ['/blogi/maahanmuutto/', '/fi/kategoria/maahanmuutto/'],
    ['/blogi/tasa-arvo-ja-yhdenvertaisuus/', '/fi/kategoria/tasa-arvo/'],
    ['/blogi/lansirata/', '/fi/kategoria/lansirata/'],
    ['/blogi/yksityisyydensuoja/', '/fi/kategoria/yksityisyydensuoja/'],
    ['/blogi/kirkkonummi/', '/fi/kategoria/kirkkonummi/'],
    ['/blogi/digitalisaatio/', '/fi/kategoria/digitalisaatio/'],
    ['/blogi/lansi-uusimaa/', '/fi/kategoria/lansi-uusimaa/'],
    ['/blogi/tekoaly/', '/fi/kategoria/tekoaly/'],
    ['/blogi/liikenne/', '/fi/kategoria/liikenne/'],
    ['/blogi/aluevaalit2025/', '/fi/kategoria/aluevaalit-2025/'],
    ['/blogi/osuuskauppavaalit/', '/fi/kategoria/osuuskauppavaalit/'],
    ['/blogi/aluevaalit2022/', '/fi/kategoria/aluevaalit-2022/'],
    ['/blogi/soteuudistus/', '/fi/kategoria/sote-uudistus/'],
]

const kategoriaTagRedirects: Array<[string, string]> = [
    // Legacy ID before tag was renamed to sosiaalinen-media
    ['/kategoria/sosiaalinenMedia/', '/fi/kategoria/sosiaalinen-media/'],
    ['/kategoria/aluevaalit2022/', '/fi/kategoria/aluevaalit-2022/'],
    ['/kategoria/aluevaalit2025/', '/fi/kategoria/aluevaalit-2025/'],
    ['/kategoria/digitaalinen-itsenaisyys/', '/fi/kategoria/digitaalinen-itsenaisyys/'],
    ['/kategoria/digitalisaatio/', '/fi/kategoria/digitalisaatio/'],
    ['/kategoria/infra/', '/fi/kategoria/infra/'],
    ['/kategoria/kaavoitus/', '/fi/kategoria/kaavoitus/'],
    ['/kategoria/kirkkonummi/', '/fi/kategoria/kirkkonummi/'],
    ['/kategoria/kuntavaalit2025/', '/fi/kategoria/kuntavaalit-2025/'],
    ['/kategoria/lansirata/', '/fi/kategoria/lansirata/'],
    ['/kategoria/lansi-uusimaa/', '/fi/kategoria/lansi-uusimaa/'],
    ['/kategoria/liikenne/', '/fi/kategoria/liikenne/'],
    ['/kategoria/maahanmuutto/', '/fi/kategoria/maahanmuutto/'],
    ['/kategoria/opetus/', '/fi/kategoria/opetus/'],
    ['/kategoria/osuuskauppavaalit/', '/fi/kategoria/osuuskauppavaalit/'],
    ['/kategoria/perusturva/', '/fi/kategoria/perusturva/'],
    ['/kategoria/sivistys/', '/fi/kategoria/kulttuuri/'],
    ['/kategoria/sosiaalinen-media/', '/fi/kategoria/sosiaalinen-media/'],
    ['/kategoria/soteuudistus/', '/fi/kategoria/sote-uudistus/'],
    ['/kategoria/tasa-arvo-ja-yhdenvertaisuus/', '/fi/kategoria/tasa-arvo/'],
    ['/kategoria/teknologia/', '/fi/kategoria/teknologia/'],
    ['/kategoria/tekoaly/', '/fi/kategoria/tekoaly/'],
    ['/kategoria/valtuustoaloite/', '/fi/kategoria/valtuustoaloite/'],
    ['/kategoria/varhaiskasvatus/', '/fi/kategoria/varhaiskasvatus/'],
    ['/kategoria/yksityisyydensuoja/', '/fi/kategoria/yksityisyydensuoja/'],
]

test.describe('Legacy /blogi/{tag}/ redirects', () => {
    for (const [from, to] of blogiTagRedirects) {
        test(`redirects ${from} → ${to}`, async ({ page }) => {
            await page.goto(from)
            await test.expect(page).toHaveURL(to)
        })
    }
})

test.describe('Legacy /kategoria/{tag}/ redirects', () => {
    for (const [from, to] of kategoriaTagRedirects) {
        test(`redirects ${from} → ${to}`, async ({ page }) => {
            await page.goto(from)
            await test.expect(page).toHaveURL(to)
        })
    }
})

// Issue #1288 — topics merged into blog
const topicsRedirects: Array<[string, string]> = [
    ['/en/topics/', '/en/blog/'],
    ['/fi/topics/', '/fi/blog/'],
    ['/sv/topics/', '/sv/blog/'],
]

test.describe('/[lang]/topics/ redirects', () => {
    for (const [from, to] of topicsRedirects) {
        test(`redirects ${from} → ${to}`, async ({ page }) => {
            await page.goto(from)
            await test.expect(page).toHaveURL(to)
        })
    }
})
