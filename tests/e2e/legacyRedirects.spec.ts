import test from '@playwright/test'

const blogiTagRedirects: Array<[string, string]> = [
    ['/blogi/opetus/', '/fi/category/opetus/'],
    ['/blogi/varhaiskasvatus/', '/fi/category/varhaiskasvatus/'],
    ['/blogi/valtuustoaloite/', '/fi/category/valtuustoaloite/'],
    ['/blogi/teknologia/', '/fi/category/teknologia/'],
    ['/blogi/infra/', '/fi/category/infra/'],
    ['/blogi/kuntavaalit2025/', '/fi/category/kuntavaalit2025/'],
    ['/blogi/sosiaalinen-media/', '/fi/category/sosiaalinen-media/'],
    ['/blogi/maahanmuutto/', '/fi/category/maahanmuutto/'],
    ['/blogi/tasa-arvo-ja-yhdenvertaisuus/', '/fi/category/tasa-arvo-ja-yhdenvertaisuus/'],
    ['/blogi/lansirata/', '/fi/category/lansirata/'],
    ['/blogi/yksityisyydensuoja/', '/fi/category/yksityisyydensuoja/'],
    ['/blogi/kirkkonummi/', '/fi/category/kirkkonummi/'],
    ['/blogi/digitalisaatio/', '/fi/category/digitalisaatio/'],
    ['/blogi/kuntavaalit/', '/fi/category/kuntavaalit/'],
    ['/blogi/lansi-uusimaa/', '/fi/category/lansi-uusimaa/'],
    ['/blogi/tekoaly/', '/fi/category/tekoaly/'],
    ['/blogi/liikenne/', '/fi/category/liikenne/'],
    ['/blogi/aluevaalit2025/', '/fi/category/aluevaalit2025/'],
    ['/blogi/osuuskauppavaalit/', '/fi/category/osuuskauppavaalit/'],
    ['/blogi/aluevaalit/', '/fi/category/aluevaalit/'],
    ['/blogi/aluevaalit2022/', '/fi/category/aluevaalit2022/'],
    ['/blogi/soteuudistus/', '/fi/category/soteuudistus/'],
]

const kategoriaTagRedirects: Array<[string, string]> = [
    // Legacy ID before tag was renamed to sosiaalinen-media
    ['/kategoria/sosiaalinenMedia/', '/fi/category/sosiaalinen-media/'],
    ['/kategoria/aluevaalit2022/', '/fi/category/aluevaalit2022/'],
    ['/kategoria/aluevaalit2025/', '/fi/category/aluevaalit2025/'],
    ['/kategoria/digitaalinen-itsenaisyys/', '/fi/category/digitaalinen-itsenaisyys/'],
    ['/kategoria/digitalisaatio/', '/fi/category/digitalisaatio/'],
    ['/kategoria/infra/', '/fi/category/infra/'],
    ['/kategoria/kaavoitus/', '/fi/category/kaavoitus/'],
    ['/kategoria/kirkkonummi/', '/fi/category/kirkkonummi/'],
    ['/kategoria/kuntavaalit2025/', '/fi/category/kuntavaalit2025/'],
    ['/kategoria/lansirata/', '/fi/category/lansirata/'],
    ['/kategoria/lansi-uusimaa/', '/fi/category/lansi-uusimaa/'],
    ['/kategoria/liikenne/', '/fi/category/liikenne/'],
    ['/kategoria/maahanmuutto/', '/fi/category/maahanmuutto/'],
    ['/kategoria/opetus/', '/fi/category/opetus/'],
    ['/kategoria/osuuskauppavaalit/', '/fi/category/osuuskauppavaalit/'],
    ['/kategoria/perusturva/', '/fi/category/perusturva/'],
    ['/kategoria/sivistys/', '/fi/category/sivistys/'],
    ['/kategoria/sosiaalinen-media/', '/fi/category/sosiaalinen-media/'],
    ['/kategoria/soteuudistus/', '/fi/category/soteuudistus/'],
    ['/kategoria/tasa-arvo-ja-yhdenvertaisuus/', '/fi/category/tasa-arvo-ja-yhdenvertaisuus/'],
    ['/kategoria/teknologia/', '/fi/category/teknologia/'],
    ['/kategoria/tekoaly/', '/fi/category/tekoaly/'],
    ['/kategoria/valtuustoaloite/', '/fi/category/valtuustoaloite/'],
    ['/kategoria/varhaiskasvatus/', '/fi/category/varhaiskasvatus/'],
    ['/kategoria/yksityisyydensuoja/', '/fi/category/yksityisyydensuoja/'],
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
