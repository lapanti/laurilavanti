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
        '/kategoria/sosiaalinenMedia/': '/fi/category/sosiaalinen-media/',
        '/kategoria/aluevaalit2022/': '/fi/category/aluevaalit2022/',
        '/kategoria/aluevaalit2025/': '/fi/category/aluevaalit2025/',
        '/kategoria/digitaalinen-itsenaisyys/': '/fi/category/digitaalinen-itsenaisyys/',
        '/kategoria/digitalisaatio/': '/fi/category/digitalisaatio/',
        '/kategoria/infra/': '/fi/category/infra/',
        '/kategoria/kaavoitus/': '/fi/category/kaavoitus/',
        '/kategoria/kirkkonummi/': '/fi/category/kirkkonummi/',
        '/kategoria/kuntavaalit2025/': '/fi/category/kuntavaalit2025/',
        '/kategoria/lansirata/': '/fi/category/lansirata/',
        '/kategoria/lansi-uusimaa/': '/fi/category/lansi-uusimaa/',
        '/kategoria/liikenne/': '/fi/category/liikenne/',
        '/kategoria/maahanmuutto/': '/fi/category/maahanmuutto/',
        '/kategoria/opetus/': '/fi/category/opetus/',
        '/kategoria/osuuskauppavaalit/': '/fi/category/osuuskauppavaalit/',
        '/kategoria/perusturva/': '/fi/category/perusturva/',
        '/kategoria/sivistys/': '/fi/category/sivistys/',
        '/kategoria/sosiaalinen-media/': '/fi/category/sosiaalinen-media/',
        '/kategoria/soteuudistus/': '/fi/category/soteuudistus/',
        '/kategoria/tasa-arvo-ja-yhdenvertaisuus/': '/fi/category/tasa-arvo-ja-yhdenvertaisuus/',
        '/kategoria/teknologia/': '/fi/category/teknologia/',
        '/kategoria/tekoaly/': '/fi/category/tekoaly/',
        '/kategoria/valtuustoaloite/': '/fi/category/valtuustoaloite/',
        '/kategoria/varhaiskasvatus/': '/fi/category/varhaiskasvatus/',
        '/kategoria/yksityisyydensuoja/': '/fi/category/yksityisyydensuoja/',
        '/blogi/opetus/': '/fi/category/opetus/',
        '/blogi/varhaiskasvatus/': '/fi/category/varhaiskasvatus/',
        '/blogi/valtuustoaloite/': '/fi/category/valtuustoaloite/',
        '/blogi/teknologia/': '/fi/category/teknologia/',
        '/blogi/infra/': '/fi/category/infra/',
        '/blogi/kuntavaalit2025/': '/fi/category/kuntavaalit2025/',
        '/blogi/sosiaalinen-media/': '/fi/category/sosiaalinen-media/',
        '/blogi/maahanmuutto/': '/fi/category/maahanmuutto/',
        '/blogi/tasa-arvo-ja-yhdenvertaisuus/': '/fi/category/tasa-arvo-ja-yhdenvertaisuus/',
        '/blogi/lansirata/': '/fi/category/lansirata/',
        '/blogi/yksityisyydensuoja/': '/fi/category/yksityisyydensuoja/',
        '/blogi/kirkkonummi/': '/fi/category/kirkkonummi/',
        '/blogi/digitalisaatio/': '/fi/category/digitalisaatio/',
        '/blogi/kuntavaalit/': '/fi/category/kuntavaalit/',
        '/blogi/lansi-uusimaa/': '/fi/category/lansi-uusimaa/',
        '/blogi/tekoaly/': '/fi/category/tekoaly/',
        '/blogi/liikenne/': '/fi/category/liikenne/',
        '/blogi/aluevaalit2025/': '/fi/category/aluevaalit2025/',
        '/blogi/osuuskauppavaalit/': '/fi/category/osuuskauppavaalit/',
        '/blogi/aluevaalit/': '/fi/category/aluevaalit/',
        '/blogi/aluevaalit2022/': '/fi/category/aluevaalit2022/',
        '/blogi/soteuudistus/': '/fi/category/soteuudistus/',
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
