// @ts-check
import { defineConfig } from 'astro/config'

import icon from 'astro-icon'

import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

import partytown from '@astrojs/partytown'

// https://astro.build/config
export default defineConfig({
    site: 'https://laurilavanti.fi/',
    redirects: {
        '/kategoria/sosiaalinenMedia/': '/fi/category/social-media/',
        '/kategoria/aluevaalit2022/': '/fi/category/regional-elections-2022/',
        '/kategoria/aluevaalit2025/': '/fi/category/regional-elections-2025/',
        '/kategoria/digitaalinen-itsenaisyys/': '/fi/category/digital-independence/',
        '/kategoria/digitalisaatio/': '/fi/category/digitalisation/',
        '/kategoria/infra/': '/fi/category/infrastructure/',
        '/kategoria/kaavoitus/': '/fi/category/urban-planning/',
        '/kategoria/kirkkonummi/': '/fi/category/kirkkonummi/',
        '/kategoria/kuntavaalit2025/': '/fi/category/municipal-elections-2025/',
        '/kategoria/lansirata/': '/fi/category/west-railway/',
        '/kategoria/lansi-uusimaa/': '/fi/category/western-uusimaa/',
        '/kategoria/liikenne/': '/fi/category/transportation/',
        '/kategoria/maahanmuutto/': '/fi/category/immigration/',
        '/kategoria/opetus/': '/fi/category/education/',
        '/kategoria/osuuskauppavaalit/': '/fi/category/coop-elections/',
        '/kategoria/perusturva/': '/fi/category/basic-welfare/',
        '/kategoria/sivistys/': '/fi/category/culture-and-education/',
        '/kategoria/sosiaalinen-media/': '/fi/category/social-media/',
        '/kategoria/soteuudistus/': '/fi/category/health-and-social-reform/',
        '/kategoria/tasa-arvo-ja-yhdenvertaisuus/': '/fi/category/equality-and-non-discrimination/',
        '/kategoria/teknologia/': '/fi/category/technology/',
        '/kategoria/tekoaly/': '/fi/category/artificial-intelligence/',
        '/kategoria/valtuustoaloite/': '/fi/category/council-motion/',
        '/kategoria/varhaiskasvatus/': '/fi/category/early-childhood-education/',
        '/kategoria/yksityisyydensuoja/': '/fi/category/privacy/',
        '/blogi/opetus/': '/fi/category/education/',
        '/blogi/varhaiskasvatus/': '/fi/category/early-childhood-education/',
        '/blogi/valtuustoaloite/': '/fi/category/council-motion/',
        '/blogi/teknologia/': '/fi/category/technology/',
        '/blogi/infra/': '/fi/category/infrastructure/',
        '/blogi/kuntavaalit2025/': '/fi/category/municipal-elections-2025/',
        '/blogi/sosiaalinen-media/': '/fi/category/social-media/',
        '/blogi/maahanmuutto/': '/fi/category/immigration/',
        '/blogi/tasa-arvo-ja-yhdenvertaisuus/': '/fi/category/equality-and-non-discrimination/',
        '/blogi/lansirata/': '/fi/category/west-railway/',
        '/blogi/yksityisyydensuoja/': '/fi/category/privacy/',
        '/blogi/kirkkonummi/': '/fi/category/kirkkonummi/',
        '/blogi/digitalisaatio/': '/fi/category/digitalisation/',
        '/blogi/kuntavaalit/': '/fi/category/kuntavaalit/',
        '/blogi/lansi-uusimaa/': '/fi/category/western-uusimaa/',
        '/blogi/tekoaly/': '/fi/category/artificial-intelligence/',
        '/blogi/liikenne/': '/fi/category/transportation/',
        '/blogi/aluevaalit2025/': '/fi/category/regional-elections-2025/',
        '/blogi/osuuskauppavaalit/': '/fi/category/coop-elections/',
        '/blogi/aluevaalit/': '/fi/category/aluevaalit/',
        '/blogi/aluevaalit2022/': '/fi/category/regional-elections-2022/',
        '/blogi/soteuudistus/': '/fi/category/health-and-social-reform/',
        // Issue #1058 — English tag ID redirects (old Finnish category URLs → new English ones)
        '/fi/category/aluevaalit2022/': '/fi/category/regional-elections-2022/',
        '/en/category/aluevaalit2022/': '/en/category/regional-elections-2022/',
        '/sv/category/aluevaalit2022/': '/sv/category/regional-elections-2022/',
        '/fi/category/aluevaalit2025/': '/fi/category/regional-elections-2025/',
        '/en/category/aluevaalit2025/': '/en/category/regional-elections-2025/',
        '/sv/category/aluevaalit2025/': '/sv/category/regional-elections-2025/',
        '/fi/category/digitaalinen-itsenaisyys/': '/fi/category/digital-independence/',
        '/en/category/digitaalinen-itsenaisyys/': '/en/category/digital-independence/',
        '/sv/category/digitaalinen-itsenaisyys/': '/sv/category/digital-independence/',
        '/fi/category/digitalisaatio/': '/fi/category/digitalisation/',
        '/en/category/digitalisaatio/': '/en/category/digitalisation/',
        '/sv/category/digitalisaatio/': '/sv/category/digitalisation/',
        '/fi/category/infra/': '/fi/category/infrastructure/',
        '/en/category/infra/': '/en/category/infrastructure/',
        '/sv/category/infra/': '/sv/category/infrastructure/',
        '/fi/category/kaavoitus/': '/fi/category/urban-planning/',
        '/en/category/kaavoitus/': '/en/category/urban-planning/',
        '/sv/category/kaavoitus/': '/sv/category/urban-planning/',
        '/fi/category/kuntavaalit2025/': '/fi/category/municipal-elections-2025/',
        '/en/category/kuntavaalit2025/': '/en/category/municipal-elections-2025/',
        '/sv/category/kuntavaalit2025/': '/sv/category/municipal-elections-2025/',
        '/fi/category/lansirata/': '/fi/category/west-railway/',
        '/en/category/lansirata/': '/en/category/west-railway/',
        '/sv/category/lansirata/': '/sv/category/west-railway/',
        '/fi/category/lansi-uusimaa/': '/fi/category/western-uusimaa/',
        '/en/category/lansi-uusimaa/': '/en/category/western-uusimaa/',
        '/sv/category/lansi-uusimaa/': '/sv/category/western-uusimaa/',
        '/fi/category/liikenne/': '/fi/category/transportation/',
        '/en/category/liikenne/': '/en/category/transportation/',
        '/sv/category/liikenne/': '/sv/category/transportation/',
        '/fi/category/maahanmuutto/': '/fi/category/immigration/',
        '/en/category/maahanmuutto/': '/en/category/immigration/',
        '/sv/category/maahanmuutto/': '/sv/category/immigration/',
        '/fi/category/opetus/': '/fi/category/education/',
        '/en/category/opetus/': '/en/category/education/',
        '/sv/category/opetus/': '/sv/category/education/',
        '/fi/category/osuuskauppavaalit/': '/fi/category/coop-elections/',
        '/en/category/osuuskauppavaalit/': '/en/category/coop-elections/',
        '/sv/category/osuuskauppavaalit/': '/sv/category/coop-elections/',
        '/fi/category/perusturva/': '/fi/category/basic-welfare/',
        '/en/category/perusturva/': '/en/category/basic-welfare/',
        '/sv/category/perusturva/': '/sv/category/basic-welfare/',
        '/fi/category/sivistys/': '/fi/category/culture-and-education/',
        '/en/category/sivistys/': '/en/category/culture-and-education/',
        '/sv/category/sivistys/': '/sv/category/culture-and-education/',
        '/fi/category/sosiaalinen-media/': '/fi/category/social-media/',
        '/en/category/sosiaalinen-media/': '/en/category/social-media/',
        '/sv/category/sosiaalinen-media/': '/sv/category/social-media/',
        '/fi/category/soteuudistus/': '/fi/category/health-and-social-reform/',
        '/en/category/soteuudistus/': '/en/category/health-and-social-reform/',
        '/sv/category/soteuudistus/': '/sv/category/health-and-social-reform/',
        '/fi/category/tasa-arvo-ja-yhdenvertaisuus/': '/fi/category/equality-and-non-discrimination/',
        '/en/category/tasa-arvo-ja-yhdenvertaisuus/': '/en/category/equality-and-non-discrimination/',
        '/sv/category/tasa-arvo-ja-yhdenvertaisuus/': '/sv/category/equality-and-non-discrimination/',
        '/fi/category/teknologia/': '/fi/category/technology/',
        '/en/category/teknologia/': '/en/category/technology/',
        '/sv/category/teknologia/': '/sv/category/technology/',
        '/fi/category/tekoaly/': '/fi/category/artificial-intelligence/',
        '/en/category/tekoaly/': '/en/category/artificial-intelligence/',
        '/sv/category/tekoaly/': '/sv/category/artificial-intelligence/',
        '/fi/category/valtuustoaloite/': '/fi/category/council-motion/',
        '/en/category/valtuustoaloite/': '/en/category/council-motion/',
        '/sv/category/valtuustoaloite/': '/sv/category/council-motion/',
        '/fi/category/varhaiskasvatus/': '/fi/category/early-childhood-education/',
        '/en/category/varhaiskasvatus/': '/en/category/early-childhood-education/',
        '/sv/category/varhaiskasvatus/': '/sv/category/early-childhood-education/',
        '/fi/category/yksityisyydensuoja/': '/fi/category/privacy/',
        '/en/category/yksityisyydensuoja/': '/en/category/privacy/',
        '/sv/category/yksityisyydensuoja/': '/sv/category/privacy/',
        '/': '/fi/',
        '/blogi/': '/fi/blog/',
        '/ota-yhteytta/': '/fi/contact/',
        '/minusta/': '/fi/about/',
        '/om-mig/': '/sv/about/',
        '/about-me/': '/en/about/',
        '/blogi/kotihoidon-tuen-kuntalisa/': '/fi/blog/1/kotihoidon-tuen-kuntalisa/',
        '/blogi/kirkkonummi-lisa-on-sinunkin-etusi/': '/fi/blog/2/kirkkonummi-lisa-on-sinunkin-etusi/',
        '/blogi/varhaiskasvatuksen-kerhotoiminta/': '/fi/blog/3/varhaiskasvatuksen-kerhotoiminta/',
        '/blogi/varhaiskasvatuksen-riittavyydesta-ei-saa-tinkia/':
            '/fi/blog/4/varhaiskasvatuksen-riittavyydesta-ei-saa-tinkia/',
        '/blogi/hyvin-suunniteltu-on-puoliksi-tehty-mutta/': '/fi/blog/5/hyvin-suunniteltu-on-puoliksi-tehty-mutta/',
        '/blogi/paivakodit-kaipaavat-opettajia/': '/fi/blog/6/paivakodit-kaipaavat-opettajia/',
        '/blogi/ehdolle-aluevaaleihin/': '/fi/blog/7/ehdolle-aluevaaleihin/',
        '/blogi/perusturvajaosto-mika-se-on/': '/fi/blog/8/perusturvajaosto-mika-se-on/',
        '/blogi/mita-jos-terveyskeskusta-ei-olisikaan/': '/fi/blog/9/mita-jos-terveyskeskusta-ei-olisikaan/',
        '/blogi/sote-on-hyvinvointiyhteiskunnan-kulmakivi/': '/fi/blog/10/sote-on-hyvinvointiyhteiskunnan-kulmakivi/',
        '/blogi/terveys-kuuluu-kaikille/': '/fi/blog/11/terveys-kuuluu-kaikille/',
        '/blogi/lahiluontoa-pitaa-vaalia/': '/fi/blog/12/lahiluontoa-pitaa-vaalia/',
        '/blogi/ennen-oli-paremmin/': '/fi/blog/13/ennen-oli-paremmin/',
        '/blogi/puheilla-muovaamme-todellisuutta/': '/fi/blog/14/puheilla-muovaamme-todellisuutta/',
        '/blogi/kunnan-pitaa-suunnitella-pitkajanteisesti/': '/fi/blog/15/kunnan-pitaa-suunnitella-pitkajanteisesti/',
        '/blogi/uusi-vuosi-tuttu-talvikunnossapito/': '/fi/blog/16/uusi-vuosi-tuttu-talvikunnossapito/',
        '/blogi/luontomme-on-valttimme-vuodesta-toiseen/': '/fi/blog/17/luontomme-on-valttimme-vuodesta-toiseen/',
        '/blogi/osuuskauppavaalit-koskettavat-meita-kaikkia/':
            '/fi/blog/18/osuuskauppavaalit-koskettavat-meita-kaikkia/',
        '/blogi/lapsista-saastaminen-ei-kannata/': '/fi/blog/19/lapsista-saastaminen-ei-kannata/',
        '/blogi/kuntavaalit-ja-aluevaalit-2025/': '/fi/blog/20/kuntavaalit-ja-aluevaalit-2025/',
        '/blogi/vastuu-on-meidan-aikuisten/': '/fi/blog/21/vastuu-on-meidan-aikuisten/',
        '/blogi/yksi-askel-eteen-kaksi-taakse/': '/fi/blog/22/yksi-askel-eteen-kaksi-taakse/',
        '/blogi/maahanmuuttokeskustelusta/': '/fi/blog/23/maahanmuuttokeskustelusta/',
        '/blogi/esseita-maahanmuutosta-maahanmuuton-maarasta/':
            '/fi/blog/24/esseita-maahanmuutosta-maahanmuuton-maarasta/',
        '/blogi/onnea-suomi/': '/fi/blog/25/onnea-suomi/',
        '/blogi/perhesiteeseen-perustuvasta-maahanmuutosta/': '/fi/blog/26/perhesiteeseen-perustuvasta-maahanmuutosta/',
        '/blogi/koulutusko-erityissuojelussa/': '/fi/blog/27/koulutusko-erityissuojelussa/',
        '/blogi/tyoperaisesta-maahanmuutosta/': '/fi/blog/28/tyoperaisesta-maahanmuutosta/',
        '/blogi/ulkomailta-opiskelemaan-tulleista/': '/fi/blog/29/ulkomailta-opiskelemaan-tulleista/',
        '/blogi/turvapaikan-saaneista/': '/fi/blog/30/turvapaikan-saaneista/',
        '/blogi/turvapaikanhakijoista/': '/fi/blog/31/turvapaikanhakijoista/',
        '/blogi/yhdessa-olemme-vahvempia/': '/fi/blog/32/yhdessa-olemme-vahvempia/',
        '/blogi/kuntavaaleissa-ratkaistaan-arjen-asioita/': '/fi/blog/33/kuntavaaleissa-ratkaistaan-arjen-asioita/',
        '/blogi/luulo-ei-ole-tiedon-vaarti/': '/fi/blog/34/luulo-ei-ole-tiedon-vaarti/',
        '/blogi/kasvava-kunta-tarvitsee-elinvoimaisen-keskustan/':
            '/fi/blog/35/kasvava-kunta-tarvitsee-elinvoimaisen-keskustan/',
        '/blogi/ehdoton-ei-toisen-asteen-lukukausimaksuille/':
            '/fi/blog/36/ehdoton-ei-toisen-asteen-lukukausimaksuille/',
        '/blogi/koulutus-on-kunnan-tarkein-tehtava/': '/fi/blog/37/koulutus-on-kunnan-tarkein-tehtava/',
        '/blogi/kylma-riihi-kirkkonummelle/': '/fi/blog/38/kylma-riihi-kirkkonummelle/',
        '/blogi/valtuustoaloite-vuosittainen-pride-liputus-kirkkonummelle/':
            '/fi/blog/39/valtuustoaloite-vuosittainen-pride-liputus-kirkkonummelle/',
        '/blogi/jokaisella-on-oikeus-olla-ylpea-olemassaolostaan/':
            '/fi/blog/40/jokaisella-on-oikeus-olla-ylpea-olemassaolostaan/',
        '/blogi/joukkoliikenne-ei-voi-kallistua-loputtomiin/':
            '/fi/blog/41/joukkoliikenne-ei-voi-kallistua-loputtomiin/',
        '/blogi/myytteja-maahanmuutosta/': '/fi/blog/42/myytteja-maahanmuutosta/',
        '/blogi/kuka-paattaa-mista-puhumma/': '/fi/blog/43/kuka-paattaa-mista-puhumma/',
        '/blogi/tekoaly-ei-pysty-mihin-tahansa/': '/fi/blog/44/tekoaly-ei-pysty-mihin-tahansa/',
        '/blogi/perusoikeuksia-ei-pida-purkaa-perusteettomasti/':
            '/fi/blog/45/perusoikeuksia-ei-pida-purkaa-perusteettomasti/',
        '/blogi/aanestin-lansiradan-puolesta/': '/fi/blog/46/aanestin-lansiradan-puolesta/',
        '/blogi/vuosi-2026-on-tekoalyn/': '/fi/blog/47/vuosi-2026-on-tekoalyn/',
        '/blogi/passien-biometristen-tunnisteiden-kayttoa-ei-pida-laajentaa/':
            '/fi/blog/48/passien-biometristen-tunnisteiden-kayttoa-ei-pida-laajentaa/',
        '/blogi/sivistyksen-talo-lyyra-avaa-uusia-mahdollisuuksia-ja-nayttaa-suuntaa/':
            '/fi/blog/49/sivistyksen-talo-lyyra-avaa-uusia-mahdollisuuksia-ja-nayttaa-suuntaa/',
        '/blogi/lansirata-paatos-nosti-esiin-ongelmia-kirkkonummen-pitkajanteisessa-strategisessa-kehittamisessa/':
            '/fi/blog/50/lansirata-paatos-nosti-esiin-ongelmia-kirkkonummen-pitkajanteisessa-strategisessa-kehittamisessa/',
        // Issue #1077 — wrong-locale slug redirects (Google-indexed 404s)
        '/en/blog/17/luontomme-on-valttimme-vuodesta-toiseen/':
            '/en/blog/17/our-nature-is-our-trump-card-year-after-year/',
        '/fi/blog/25/congratulations-finland/': '/fi/blog/25/onnea-suomi/',
        '/sv/blog/15/kunnan-pitaa-suunnitella-pitkajanteisesti/':
            '/sv/blog/15/kommunen-maste-planera-langsiktigt/',
        '/sv/blog/14/puheilla-muovaamme-todellisuutta/': '/sv/blog/14/med-ord-formar-vi-verkligheten/',
        '/en/blog/52/kirkkonummi-on-tanaan-tasa-arvoisempi-kuin-eilen/':
            '/en/blog/52/kirkkonummi-is-more-equal-today-than-yesterday/',
        '/sv/blog/52/kirkkonummi-on-tanaan-tasa-arvoisempi-kuin-eilen/':
            '/sv/blog/52/kyrsklatt-ar-mer-jamlikt-idag-an-det-var-igar/',
        '/sv/blog/18/osuuskauppavaalit-koskettavat-meita-kaikkia/': '/sv/blog/18/vbo-valen-beror-oss-alla/',
        '/en/blog/46/aanestin-lansiradan-puolesta/': '/en/blog/46/i-voted-for-the-western-rail-link/',
        '/sv/blog/46/aanestin-lansiradan-puolesta/': '/sv/blog/46/jag-rostade-for-vasternabanan/',
        '/sv/blog/48/passien-biometristen-tunnisteiden-kayttoa-ei-pida-laajentaa/':
            '/sv/blog/48/anvandningen-av-biometriska-identifierare-i-pass-far-inte-utvidgas/',
        '/en/blog/48/passien-biometristen-tunnisteiden-kayttoa-ei-pida-laajentaa/':
            '/en/blog/48/the-use-of-biometric-identifiers-in-passports-must-not-be-expanded/',
        '/sv/blog/49/sivistyksen-talo-lyyra-avaa-uusia-mahdollisuuksia-ja-nayttaa-suuntaa/':
            '/sv/blog/49/lyyra-bildningens-hus-oppnar-nya-mojligheter-och-visar-vagen/',
        '/sv/blog/51/digitaalinen-itsenaisyys-on-valttamattomyys/':
            '/sv/blog/51/digital-sjalvstandighet-ar-en-nodvandighet/',
        '/en/blog/16/uusi-vuosi-tuttu-talvikunnossapito/': '/en/blog/16/new-year-familiar-winter-maintenance/',
        // Issue #1078 — top-level election campaign page redirects
        '/kuntavaalit-ja-aluevaalit-2025/': '/fi/blog/20/kuntavaalit-ja-aluevaalit-2025/',
        '/municipal-elections-and-county-elections-2025/':
            '/en/blog/20/municipal-and-regional-elections-2025/',
        '/kommunalvalet-och-valfardsomradesvalet-2025/': '/sv/blog/20/kommun-och-valfardsvalet-2025/',
    },
    trailingSlash: 'always',
    output: 'static',
    compressHTML: true,

    build: {
        inlineStylesheets: 'always',
    },

    prefetch: {
        prefetchAll: true,
        defaultStrategy: 'hover',
    },

    i18n: {
        defaultLocale: 'fi',
        locales: ['en', 'fi', 'sv'],
        routing: {
            prefixDefaultLocale: true,
        },
    },

    image: {
        service: { entrypoint: 'astro/assets/services/noop' },
    },

    integrations: [
        mdx(),
        icon({ include: { 'fa7-brands': ['*'] } }),
        sitemap({
            filter: (page) =>
                // Exclude bare /{lang}/blog/{id}/ redirect pages
                !/\/(en|fi|sv)\/blog\/\d+\/$/.test(page) &&
                // Exclude old /kategoria/ redirect pages
                !/\/kategoria\//.test(page) &&
                // Exclude recommendations pages for now
                !/\/(en|fi|sv)\/recommendations\//.test(page),
        }),
        partytown(),
    ],
})
