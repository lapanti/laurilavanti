import test from '@playwright/test'

const blogiTagRedirects: Array<[string, string]> = [
    ['/blogi/opetus/', '/fi/category/education/'],
    ['/blogi/varhaiskasvatus/', '/fi/category/early-childhood-education/'],
    ['/blogi/valtuustoaloite/', '/fi/category/council-motion/'],
    ['/blogi/teknologia/', '/fi/category/technology/'],
    ['/blogi/infra/', '/fi/category/infrastructure/'],
    ['/blogi/kuntavaalit2025/', '/fi/category/municipal-elections-2025/'],
    ['/blogi/sosiaalinen-media/', '/fi/category/social-media/'],
    ['/blogi/maahanmuutto/', '/fi/category/immigration/'],
    ['/blogi/tasa-arvo-ja-yhdenvertaisuus/', '/fi/category/equality-and-non-discrimination/'],
    ['/blogi/lansirata/', '/fi/category/west-railway/'],
    ['/blogi/yksityisyydensuoja/', '/fi/category/privacy/'],
    ['/blogi/kirkkonummi/', '/fi/category/kirkkonummi/'],
    ['/blogi/digitalisaatio/', '/fi/category/digitalisation/'],
    ['/blogi/kuntavaalit/', '/fi/category/kuntavaalit/'],
    ['/blogi/lansi-uusimaa/', '/fi/category/western-uusimaa/'],
    ['/blogi/tekoaly/', '/fi/category/artificial-intelligence/'],
    ['/blogi/liikenne/', '/fi/category/transportation/'],
    ['/blogi/aluevaalit2025/', '/fi/category/regional-elections-2025/'],
    ['/blogi/osuuskauppavaalit/', '/fi/category/coop-elections/'],
    ['/blogi/aluevaalit/', '/fi/category/aluevaalit/'],
    ['/blogi/aluevaalit2022/', '/fi/category/regional-elections-2022/'],
    ['/blogi/soteuudistus/', '/fi/category/health-and-social-reform/'],
]

const kategoriaTagRedirects: Array<[string, string]> = [
    // Legacy ID before tag was renamed to sosiaalinen-media
    ['/kategoria/sosiaalinenMedia/', '/fi/category/social-media/'],
    ['/kategoria/aluevaalit2022/', '/fi/category/regional-elections-2022/'],
    ['/kategoria/aluevaalit2025/', '/fi/category/regional-elections-2025/'],
    ['/kategoria/digitaalinen-itsenaisyys/', '/fi/category/digital-independence/'],
    ['/kategoria/digitalisaatio/', '/fi/category/digitalisation/'],
    ['/kategoria/infra/', '/fi/category/infrastructure/'],
    ['/kategoria/kaavoitus/', '/fi/category/urban-planning/'],
    ['/kategoria/kirkkonummi/', '/fi/category/kirkkonummi/'],
    ['/kategoria/kuntavaalit2025/', '/fi/category/municipal-elections-2025/'],
    ['/kategoria/lansirata/', '/fi/category/west-railway/'],
    ['/kategoria/lansi-uusimaa/', '/fi/category/western-uusimaa/'],
    ['/kategoria/liikenne/', '/fi/category/transportation/'],
    ['/kategoria/maahanmuutto/', '/fi/category/immigration/'],
    ['/kategoria/opetus/', '/fi/category/education/'],
    ['/kategoria/osuuskauppavaalit/', '/fi/category/coop-elections/'],
    ['/kategoria/perusturva/', '/fi/category/basic-welfare/'],
    ['/kategoria/sivistys/', '/fi/category/culture-and-education/'],
    ['/kategoria/sosiaalinen-media/', '/fi/category/social-media/'],
    ['/kategoria/soteuudistus/', '/fi/category/health-and-social-reform/'],
    ['/kategoria/tasa-arvo-ja-yhdenvertaisuus/', '/fi/category/equality-and-non-discrimination/'],
    ['/kategoria/teknologia/', '/fi/category/technology/'],
    ['/kategoria/tekoaly/', '/fi/category/artificial-intelligence/'],
    ['/kategoria/valtuustoaloite/', '/fi/category/council-motion/'],
    ['/kategoria/varhaiskasvatus/', '/fi/category/early-childhood-education/'],
    ['/kategoria/yksityisyydensuoja/', '/fi/category/privacy/'],
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
