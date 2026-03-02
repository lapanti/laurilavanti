// @ts-check
import { defineConfig } from 'astro/config' // eslint-disable-line import/no-unresolved

import icon from 'astro-icon' // eslint-disable-line import/no-unresolved
import { imageService } from '@unpic/astro/service' // eslint-disable-line import/no-unresolved

import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

import partytown from '@astrojs/partytown'

// https://astro.build/config
export default defineConfig({
    site: 'https://laurilavanti.fi/',
    redirects: {
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
    },
    trailingSlash: 'always',
    output: 'static',
    compressHTML: true,

    build: {
        inlineStylesheets: 'auto',
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
        service: imageService({
            placeholder: 'blurhash',
        }),
    },

    integrations: [
        mdx(),
        icon({ include: { 'fa7-brands': ['*'] } }),
        sitemap({
            filter: (page) =>
                // Exclude bare /{lang}/blog/{id}/ redirect pages
                !/\/(en|fi|sv)\/blog\/\d+\/$/.test(page) &&
                // Exclude old /kategoria/ redirect pages
                !/\/kategoria\//.test(page),
        }),
        partytown(),
    ],
})
