export interface LocalTag {
    descriptions: { en: string | string[]; fi: string | string[]; sv: string | string[] }
    faq?: {
        en?: Array<{ a: string; q: string }>
        fi?: Array<{ a: string; q: string }>
        sv?: Array<{ a: string; q: string }>
    }
    heroImage?: string
    heroImageAlt?: { en: string; fi: string; sv: string }
    id: string
    names: { en: string; fi: string; sv: string }
    pageTitle: { en: string; fi: string; sv: string }
}

export const tags: LocalTag[] = [
    {
        descriptions: {
            en: 'Posts about the 2022 regional elections and the launch of welfare areas in Western Uusimaa.',
            fi: 'Kirjoituksia vuoden 2022 aluevaaleista ja hyvinvointialueiden käynnistymisestä Länsi-Uudellamaalla.',
            sv: 'Texter om regionvalet 2022 och starten av välfärdsområdena i Västra Nyland.',
        },
        faq: {
            en: [
                {
                    a: 'The 2022 regional elections were held in April 2022. They established the new welfare areas responsible for social and health services.',
                    q: 'What were the 2022 regional elections about?',
                },
                {
                    a: 'The Western Uusimaa welfare area (Länsi-Uusimaa) took responsibility for social and health services from municipalities on 1 January 2023.',
                    q: 'What happened after the 2022 regional elections?',
                },
            ],
            fi: [
                {
                    a: 'Vuoden 2022 aluevaalit järjestettiin huhtikuussa. Niissä valittiin edustajat uusille hyvinvointialueille, jotka ottivat vastuun sosiaali- ja terveyspalveluista.',
                    q: 'Mitä vuoden 2022 aluevaalit tarkoittivat?',
                },
                {
                    a: 'Länsi-Uudenmaan hyvinvointialue otti sosiaali- ja terveyspalvelujen vastuun kunnilta 1.1.2023. Se on yksi 21:stä Suomen hyvinvointialueesta.',
                    q: 'Mitä tapahtui vuoden 2022 aluevaalien jälkeen?',
                },
            ],
            sv: [
                {
                    a: 'Regionvalet 2022 hölls i april. Väljarna valde representanter till de nya välfärdsområdena som tar ansvar för social- och hälsovårdstjänster.',
                    q: 'Vad handlade regionvalet 2022 om?',
                },
                {
                    a: 'Välfärdsområdet Västra Nyland övertog ansvaret för social- och hälsovårdstjänster från kommunerna den 1 januari 2023.',
                    q: 'Vad hände efter regionvalet 2022?',
                },
            ],
        },
        id: 'regional-elections-2022',
        names: { en: 'Regional elections 2022', fi: 'Aluevaalit 2022', sv: 'Regionval 2022' },
        pageTitle: {
            en: 'Regional elections 2022 – Western Uusimaa welfare area',
            fi: 'Aluevaalit 2022 – Länsi-Uudenmaan hyvin\u00ADvointi\u00ADalue',
            sv: 'Regionval 2022 – välfärds\u00ADområdet Västra Nyland',
        },
    },
    {
        descriptions: {
            en: 'Posts about the 2025 regional elections and the future of welfare areas.',
            fi: 'Kirjoituksia vuoden 2025 aluevaaleista ja hyvinvointialueiden tulevaisuudesta.',
            sv: 'Texter om regionvalet 2025 och välfärdsområdenas framtid.',
        },
        faq: {
            en: [
                {
                    a: 'The 2025 regional elections determine who represents citizens in the welfare areas responsible for social and health services across Finland.',
                    q: 'What are the 2025 regional elections about?',
                },
                {
                    a: 'Key issues include the financial sustainability of welfare areas, waiting times for healthcare, staff availability, and the balance between centralised and local services.',
                    q: 'What are the key issues in the 2025 regional elections?',
                },
            ],
            fi: [
                {
                    a: 'Aluevaalit 2025 määrittävät, kuka edustaa kansalaisia hyvinvointialueilla, jotka vastaavat sosiaali- ja terveyspalveluista.',
                    q: 'Mitä vuoden 2025 aluevaalit koskevat?',
                },
                {
                    a: 'Keskeisiä teemoja ovat hyvinvointialueiden taloudellinen kestävyys, hoitojonot, henkilöstön saatavuus ja palvelujen keskittäminen vs. paikallisuus.',
                    q: 'Mitkä ovat aluevaalien 2025 tärkeimmät teemat?',
                },
            ],
            sv: [
                {
                    a: 'Regionvalet 2025 avgör vem som representerar invånarna i välfärdsområdena som ansvarar för social- och hälsovårdstjänster.',
                    q: 'Vad handlar regionvalet 2025 om?',
                },
                {
                    a: 'Viktiga teman är välfärdsområdenas ekonomiska hållbarhet, vårdköer, personaltillgång och balansen mellan centraliserade och lokala tjänster.',
                    q: 'Vilka är de viktigaste frågorna i regionvalet 2025?',
                },
            ],
        },
        id: 'regional-elections-2025',
        names: { en: 'Regional elections 2025', fi: 'Aluevaalit 2025', sv: 'Regionval 2025' },
        pageTitle: {
            en: 'Regional elections 2025 – welfare area vote',
            fi: 'Aluevaalit 2025 – hyvin\u00ADvointi\u00ADaluevaalit',
            sv: 'Regionval 2025 – val till välfärds\u00ADområdet',
        },
    },
    {
        descriptions: {
            en: [
                'Finland and Europe must control their own digital infrastructure. I am the lead author of the digital independence citizens’ initiative, which calls on Finland to reduce its dependency on a small number of foreign cloud providers.',
                'Finnish public administration is heavily dependent on US hyperscalers — Amazon, Microsoft, and Google. The geopolitical risk of that dependency has grown substantially since 2022. Finnish and European alternatives exist: UpCloud is a concrete example of a high-performance sovereign cloud provider that public sector organisations can choose today. I advocate for breaking up public IT procurement and preferring open source and European providers.',
                'Digital independence is also about data portability and avoiding vendor lock-in. Public data generated with public money should be portable and stored under European legal jurisdiction — not subject to the US CLOUD Act.',
            ],
            fi: [
                'Suomen ja Euroopan on hallittava omaa digitaalista infrastruktuuriaan. Olen digitaalisen itsenäisyyden kansalaisaloitteen päävetäjä, jolla vaaditaan Suomea vähentämään riippuvuuttaan muutamista ulkomaisista pilvipalveluntarjoajista.',
                'Suomen julkishallinto on voimakkaasti riippuvainen yhdysvaltalaisista hyperscalereista — Amazonista, Microsoftista ja Googlesta. Tämän riippuvuuden geopoliittinen riski on kasvanut merkittävästi vuoden 2022 jälkeen. Suomalaisia ja eurooppalaisia vaihtoehtoja on olemassa: UpCloud on konkreettinen esimerkki suorituskykyisestä kotimaisesta pilvipalvelusta, jonka julkinen sektori voi valita jo tänään. Ajan julkisten IT-hankintojen pilkkomista ja avoimen lähdekoodin sekä eurooppalaisten toimittajien suosimista.',
                'Digitaalinen itsenäisyys tarkoittaa myös datan siirrettävyyttä ja toimittajariippuvuuden välttämistä. Julkisella rahalla tuotetun julkisen datan tulee olla siirrettävää ja tallennettuna eurooppalaisessa oikeudenkäyttöalueessa — ei US CLOUD Act -lain piirissä.',
            ],
            sv: [
                'Finland och Europa måste kontrollera sin egen digitala infrastruktur. Jag är huvudinitiativtagare till medborgarinitiativet om digital självständighet, som kräver att Finland minskar sitt beroende av ett fåtal utländska molntjänstleverantörer.',
                'Finlands offentliga förvaltning är starkt beroende av amerikanska hyperscalers — Amazon, Microsoft och Google. Den geopolitiska risken med detta beroende har ökat kraftigt sedan 2022. Finska och europeiska alternativ finns: UpCloud är ett konkret exempel på en högpresterande inhemsk molntjänst som offentliga organisationer kan välja redan idag. Jag förespråkar uppdelning av offentlig IT-upphandling och prioritering av öppen källkod och europeiska leverantörer.',
                'Digital självständighet handlar också om dataportabilitet och att undvika inlåsning till leverantörer. Offentliga data som skapats med offentliga medel bör vara portabla och lagras inom europeisk jurisdiktion — inte under den amerikanska CLOUD Act.',
            ],
        },
        faq: {
            en: [
                {
                    a: 'Digital independence means that individuals, organisations, and states control their own data and digital infrastructure rather than depending on foreign tech giants.',
                    q: 'What does digital independence mean?',
                },
                {
                    a: 'Finland can strengthen digital independence by investing in open source software, European cloud services, and domestic digital expertise.',
                    q: 'How can Finland strengthen its digital independence?',
                },
                {
                    a: 'UpCloud is a Finnish cloud provider that offers high-performance infrastructure comparable to the US hyperscalers. It is proof that a sovereign, European-jurisdiction cloud option exists and is production-ready for public sector use.',
                    q: 'What is UpCloud and why does it matter?',
                },
                {
                    a: "Yes. Finland's critical infrastructure depends on foreign cloud providers that operate under foreign law. Since 2022 it has become clear that political risk is real — the US is no longer a predictable partner in all contexts. Reducing that dependency is a security question, not just a procurement preference.",
                    q: 'Is digital independence a security issue?',
                },
            ],
            fi: [
                {
                    a: 'Digitaalinen itsenäisyys tarkoittaa sitä, että yksilöt, organisaatiot ja valtiot hallitsevat omaa dataansa ja digitaalisia infrastruktuurejaan sen sijaan, että ne olisivat riippuvaisia ulkomaisista teknologiajäteistä.',
                    q: 'Mitä digitaalinen itsenäisyys tarkoittaa?',
                },
                {
                    a: 'Suomi voi vahvistaa digitaalista itsenäisyyttään panostamalla avoimeen lähdekoodiin, eurooppalaisiin pilvipalveluihin ja omaan digitaaliseen osaamiseen.',
                    q: 'Miten Suomi voi vahvistaa digitaalista itsenäisyyttään?',
                },
                {
                    a: 'UpCloud on suomalainen pilvipalveluntarjoaja, joka tarjoaa suorituskykyistä infrastruktuuria verrattavissa yhdysvaltalaisiin hyperscalereihin. Se on konkreettinen todiste siitä, että eurooppalaiseen oikeudenkäyttöalueeseen kuuluva, tuotantovalmis pilvipalveluvaihtoehto on olemassa julkiselle sektorille.',
                    q: 'Mikä on UpCloud ja miksi se on tärkeä?',
                },
                {
                    a: 'Kyllä. Suomen kriittinen infrastruktuuri on riippuvainen ulkomaisista pilvipalveluntarjoajista, jotka toimivat ulkomaiseen lakiin perustuen. Vuodesta 2022 lähtien on käynyt selväksi, että poliittinen riski on todellinen — Yhdysvallat ei ole enää kaikissa tilanteissa ennakoitava kumppani. Tämän riippuvuuden vähentäminen on turvallisuuskysymys, ei pelkkä hankintapreferenssi.',
                    q: 'Liittyykö digitaalinen itsenäisyys turvallisuuteen?',
                },
            ],
            sv: [
                {
                    a: 'Digital självständighet innebär att individer, organisationer och stater kontrollerar sina egna data och digitala infrastrukturer, i stället för att vara beroende av utländska teknikjättar.',
                    q: 'Vad betyder digital självständighet?',
                },
                {
                    a: 'Finland kan stärka sin digitala självständighet genom att satsa på öppen källkod, europeiska molntjänster och inhemsk digital kompetens.',
                    q: 'Hur kan Finland stärka sin digitala självständighet?',
                },
                {
                    a: 'UpCloud är en finsk molntjänstleverantör som erbjuder högpresterande infrastruktur jämförbar med de amerikanska hyperscalers. Det är ett konkret bevis på att ett suveränt, europeiskt molnalternativ finns och är produktionsklart för offentlig sektor.',
                    q: 'Vad är UpCloud och varför spelar det roll?',
                },
                {
                    a: 'Ja. Finlands kritiska infrastruktur är beroende av utländska molntjänstleverantörer som verkar under utländsk lag. Sedan 2022 har det stått klart att den politiska risken är verklig — USA är inte längre en förutsägbar partner i alla sammanhang. Att minska detta beroende är en säkerhetsfråga, inte bara ett upphandlingspreferens.',
                    q: 'Är digital självständighet en säkerhetsfråga?',
                },
            ],
        },
        id: 'digital-independence',
        names: { en: 'Digital independence', fi: 'Digitaalinen itsenäisyys', sv: 'Digital självständighet' },
        pageTitle: {
            en: 'Digital inde\u00ADpendence and sovere\u00ADignty in Finland',
            fi: 'Digitaa\u00ADlinen itse\u00ADnäisyys Suomessa',
            sv: 'Digital själv\u00ADständighet i Finland',
        },
    },
    {
        descriptions: {
            en: [
                'Digitalisation is both an opportunity and a risk. Finland must lead with quality, not just speed — getting it wrong at scale is expensive and hard to reverse.',
                'Public sector digitalisation specifically requires interoperability, open standards, and accessibility for everyone — not just those comfortable with digital interfaces. Vendor lock-in is the largest long-term risk: when public services are built on proprietary platforms, the public sector loses negotiating power and flexibility. As a councillor I have seen how procurement decisions made without technical scrutiny create dependencies that cost more to exit than they saved at entry.',
                'The human dimension matters too. Digitalisation must not exclude people who struggle with online interfaces — GP appointments, benefit claims, and permit applications must remain accessible through non-digital channels. Efficiency gains should not be achieved by forcing the most vulnerable to adapt to the most convenient channel for the provider.',
            ],
            fi: [
                'Digitalisaatio on sekä mahdollisuus että riski. Suomen on johdettava laadulla, ei pelkästään nopeudella — laajamittainen epäonnistuminen on kallista ja vaikea peruuttaa.',
                'Julkisen sektorin digitalisaatiossa tarvitaan erityisesti yhteentoimivuutta, avoimia standardeja ja saavutettavuutta kaikille — ei vain niille, joille digitaaliset käyttöliittymät ovat luontevia. Toimittajariippuvuus on suurin pitkän aikavälin riski: kun julkiset palvelut rakennetaan suljetuille alustoille, julkinen sektori menettää neuvotteluvoiman ja joustavuuden. Valtuutettuna olen nähnyt, miten teknisesti tarkastamattomat hankintapäätökset luovat riippuvuuksia, joiden irtautuminen maksaa enemmän kuin niissä alun perin säästettiin.',
                'Inhimillinen ulottuvuus on myös tärkeä. Digitalisaatio ei saa syrjäyttää ihmisiä, joille verkkokäyttöliittymät tuottavat vaikeuksia — lääkäriajat, etuushakemukset ja lupahakemukset on pidettävä saavutettavina myös ei-digitaalisilla kanavilla. Tehokkuushyötyjä ei tule saavuttaa pakottamalla kaikkein haavoittuvimmat sopeutumaan palveluntarjoajalle käteisimpään kanavaan.',
            ],
            sv: [
                'Digitalisering är både en möjlighet och en risk. Finland måste leda med kvalitet, inte bara hastighet — att misslyckas i stor skala är dyrt och svårt att reversera.',
                'Offentlig sektors digitalisering kräver specifikt interoperabilitet, öppna standarder och tillgänglighet för alla — inte bara de som är bekväma med digitala gränssnitt. Leverantörsinlåsning är den största långsiktiga risken: när offentliga tjänster byggs på proprietära plattformar förlorar den offentliga sektorn förhandlingsstyrka och flexibilitet. Som fullmäktigeledamot har jag sett hur upphandlingsbeslut fattade utan teknisk granskning skapar beroenden som kostar mer att lämna än de sparade vid ingången.',
                'Den mänskliga dimensionen spelar också roll. Digitalisering får inte utesluta människor som har svårt med onlinegränssnitt — läkarbesök, förmånsansökningar och tillståndsansökningar måste förbli tillgängliga via icke-digitala kanaler. Effektivitetsvinster bör inte uppnås genom att tvinga de mest utsatta att anpassa sig till den kanal som är mest bekväm för leverantören.',
            ],
        },
        faq: {
            en: [
                {
                    a: 'Digitalisation means moving services online, using data to support decision-making, and making processes more efficient. It can improve service accessibility and reduce costs.',
                    q: 'What does digitalisation mean for the public sector?',
                },
                {
                    a: 'Risks of digitalisation include privacy violations, cybersecurity threats, digital exclusion, and dependency on foreign technology vendors.',
                    q: 'What are the risks of digitalisation?',
                },
                {
                    a: 'Vendor lock-in, accessibility gaps for those not comfortable with digital interfaces, data sovereignty risks, and single points of failure. Good digitalisation requires open standards, interoperability, and retained non-digital alternatives.',
                    q: 'What are the specific risks in public sector digitalisation?',
                },
                {
                    a: 'Open standards over proprietary platforms, iterative delivery over big-bang projects, citizen-testing before rollout, and physical alternatives retained for services that affect rights and welfare.',
                    q: 'How should municipalities approach digitalisation?',
                },
            ],
            fi: [
                {
                    a: 'Digitalisaatio tarkoittaa palvelujen siirtymistä verkkoon, päätöksenteon tueksi tulevaa dataa ja tehokkaampia prosesseja. Se voi parantaa palvelujen saatavuutta ja säästää kustannuksia.',
                    q: 'Mitä digitalisaatio tarkoittaa julkiselle sektorille?',
                },
                {
                    a: 'Digitalisaation riskejä ovat yksityisyyden loukkaukset, kyberturvallisuusuhat, digitaalinen syrjäytyminen ja riippuvuus ulkomaisista teknologiatoimittajista.',
                    q: 'Mitkä ovat digitalisaation riskit?',
                },
                {
                    a: 'Toimittajariippuvuus, saavutettavuusaukot niille, joille digitaaliset käyttöliittymät ovat vaikeita, datasuvereniteettiriskit ja kriittiset vikakohdat. Hyvä digitalisaatio edellyttää avoimia standardeja, yhteentoimivuutta ja säilytettyjä ei-digitaalisia vaihtoehtoja.',
                    q: 'Mitkä ovat julkisen sektorin digitalisaation erityisriskit?',
                },
                {
                    a: 'Avoimet standardit suljettujen alustojen sijaan, iteratiivinen toimittaminen suurnäyttämön hankkeiden sijaan, kansalaistestaus ennen käyttöönottoa, ja ei-digitaalisten vaihtoehtojen säilyttäminen oikeuksiin ja hyvinvointiin vaikuttavissa palveluissa.',
                    q: 'Miten kuntien pitäisi lähestyä digitalisaatiota?',
                },
            ],
            sv: [
                {
                    a: 'Digitalisering innebär att tjänster flyttar online, att data stöder beslutsfattande och att processer effektiviseras. Det kan förbättra tillgängligheten till tjänster och spara kostnader.',
                    q: 'Vad innebär digitalisering för den offentliga sektorn?',
                },
                {
                    a: 'Riskerna med digitalisering inkluderar integritetsintrång, cybersäkerhetshot, digital utestängning och beroende av utländska teknikaktörer.',
                    q: 'Vilka är riskerna med digitalisering?',
                },
                {
                    a: 'Leverantörsinlåsning, tillgänglighetsbrister för dem som inte är bekväma med digitala gränssnitt, datasuveränitetsrisker och kritiska felkällor. Bra digitalisering kräver öppna standarder, interoperabilitet och bibehållna icke-digitala alternativ.',
                    q: 'Vilka är de specifika riskerna med offentlig sektors digitalisering?',
                },
                {
                    a: 'Öppna standarder framför proprietära plattformar, iterativ leverans framför stora engångsprojekt, medborgartest före lansering, och bibehållna fysiska alternativ för tjänster som påverkar rättigheter och välfärd.',
                    q: 'Hur bör kommuner hantera digitalisering?',
                },
            ],
        },
        id: 'digitalisation',
        names: { en: 'Digitalisation', fi: 'Digitalisaatio', sv: 'Digitalisering' },
        pageTitle: {
            en: 'Digita\u00ADlisation – IT and infor\u00ADmation policy',
            fi: 'Digitali\u00ADsaatio – IT ja tieto\u00ADpolitiikka',
            sv: 'Digita\u00ADlisering – IT och infor\u00ADmations\u00ADpolitik',
        },
    },
    {
        descriptions: {
            en: 'Posts about infrastructure, construction, and municipal engineering.',
            fi: 'Kirjoituksia infrastruktuurista, rakentamisesta ja kunnallistekniikasta.',
            sv: 'Texter om infrastruktur, byggande och kommunalteknik.',
        },
        faq: {
            en: [
                {
                    a: 'Municipal infrastructure includes roads, water and sewage networks, parks, and public spaces. It forms the physical backbone of everyday life.',
                    q: 'What does municipal infrastructure include?',
                },
                {
                    a: 'Infrastructure investment is financed through municipal taxes, grants, and loans. Prioritisation is decided by the municipal council in the budget process.',
                    q: 'How is infrastructure investment financed?',
                },
            ],
            fi: [
                {
                    a: 'Kunnallinen infrastruktuuri kattaa tiet, vesihuollon, viemäriverkostot, puistot ja julkiset tilat. Se muodostaa arjen fyysisen selkärangan.',
                    q: 'Mitä kunnallinen infrastruktuuri sisältää?',
                },
                {
                    a: 'Infrastruktuuri-investoinnit rahoitetaan kunnallisveroilla, avustuksilla ja lainoilla. Priorisoinnista päättää valtuusto talousarviossa.',
                    q: 'Miten infrastruktuuri-investoinnit rahoitetaan?',
                },
            ],
            sv: [
                {
                    a: 'Kommunal infrastruktur inkluderar vägar, vatten- och avloppsnät, parker och offentliga platser. Den utgör ryggraden i vardagslivet.',
                    q: 'Vad ingår i kommunal infrastruktur?',
                },
                {
                    a: 'Infrastrukturinvesteringar finansieras via kommunalskatt, bidrag och lån. Prioriteringen beslutas av fullmäktige i budgetprocessen.',
                    q: 'Hur finansieras infrastrukturinvesteringar?',
                },
            ],
        },
        id: 'infrastructure',
        names: { en: 'Infrastructure', fi: 'Infra', sv: 'Infrastruktur' },
        pageTitle: {
            en: 'Infra\u00ADstructure – construc\u00ADtion and engi\u00ADneering',
            fi: 'Infra\u00ADstruktuuri – rakenta\u00ADminen ja kunnallis\u00ADtekniikka',
            sv: 'Infra\u00ADstruktur – byggande och kommunal\u00ADteknik',
        },
    },
    {
        descriptions: {
            en: 'Posts about urban planning, land use, and city development.',
            fi: 'Kirjoituksia kaavoituksesta, maankäytöstä ja kaupunkikehityksestä.',
            sv: 'Texter om planläggning, markanvändning och stadsutveckling.',
        },
        faq: {
            en: [
                {
                    a: 'Urban planning determines how land is used — for housing, businesses, green spaces, and transport. It shapes the character and functionality of a community for decades.',
                    q: 'Why does urban planning matter?',
                },
                {
                    a: "Residents can participate by attending public consultations, submitting written opinions during the plan review period, and following the municipal council's decisions.",
                    q: 'How can residents participate in urban planning?',
                },
            ],
            fi: [
                {
                    a: 'Kaavoitus määrittää, mihin tarkoituksiin maata käytetään – asumiseen, elinkeinotoimintaan, viheralueisiin ja liikenteeseen. Se muovaa yhteisön luonnetta ja toimivuutta vuosikymmeniksi.',
                    q: 'Miksi kaavoitus on tärkeää?',
                },
                {
                    a: 'Asukkaat voivat osallistua käymällä yleisötilaisuuksissa, jättämällä kirjallisia muistutuksia kaavaluonnoksen nähtävilläoloaikana ja seuraamalla valtuuston päätöksiä.',
                    q: 'Miten asukkaat voivat osallistua kaavoitukseen?',
                },
            ],
            sv: [
                {
                    a: 'Planläggning avgör hur mark används — för boende, näringsliv, grönområden och trafik. Den formar samhällets karaktär och funktionalitet under decennier.',
                    q: 'Varför är planläggning viktigt?',
                },
                {
                    a: 'Invånarna kan delta genom att besöka offentliga möten, lämna skriftliga anmärkningar under planens framläggningsperiod och följa fullmäktigets beslut.',
                    q: 'Hur kan invånare delta i planläggningen?',
                },
            ],
        },
        id: 'urban-planning',
        names: { en: 'Urban planning', fi: 'Kaavoitus', sv: 'Planläggning' },
        pageTitle: {
            en: 'Urban planning and land use policy',
            fi: 'Kaavoitus ja maan\u00ADkäyttö\u00ADpolitiikka',
            sv: 'Plan\u00ADläggning och mark\u00ADanvänd\u00ADnings\u00ADpolitik',
        },
    },
    {
        descriptions: {
            en: 'Posts about Kirkko\u00ADnummi municipal politics, decision-making, and everyday life. Lauri Lavanti as a councillor.',
            fi: 'Kirjoituksia Kirkkonummen kuntapolitiikasta, päätöksenteosta ja arjesta. Lauri Lavanti kunnanvaltuutettuna.',
            sv: 'Texter om Kyrkslätts kommunalpolitik, beslutsfattande och vardag. Lauri Lavanti som kommunfullmäktigeledamot.',
        },
        faq: {
            en: [
                {
                    a: 'Lauri Lavanti focuses on digitalisation, sustainable urban planning, high-quality services, and transparent decision-making in Kirkkonummi.',
                    q: 'What issues does Lauri Lavanti champion in Kirkkonummi?',
                },
                {
                    a: 'You can contact councillors, attend municipal events, and follow council meetings. Contact Lauri Lavanti directly.',
                    q: 'How can I influence decision-making in Kirkkonummi?',
                },
            ],
            fi: [
                {
                    a: 'Lauri Lavanti keskittyy Kirkkonummella digitalisaatioon, kestävään kaupunkisuunnitteluun, laadukkaisiin palveluihin ja avoimeen päätöksentekoon.',
                    q: 'Mitä asioita Lauri Lavanti ajaa Kirkkonummella?',
                },
                {
                    a: 'Voit ottaa yhteyttä kunnanvaltuutettuihin, osallistua kunnan tilaisuuksiin ja seurata valtuuston kokouksia. Lauri Lavantiin voi ottaa yhteyttä suoraan.',
                    q: 'Miten voin vaikuttaa Kirkkonummen päätöksentekoon?',
                },
            ],
            sv: [
                {
                    a: 'Lauri Lavanti fokuserar på digitalisering, hållbar planläggning, högkvalitativa tjänster och öppet beslutsfattande i Kyrkslätt.',
                    q: 'Vilka frågor driver Lauri Lavanti i Kyrkslätt?',
                },
                {
                    a: 'Du kan kontakta kommunfullmäktigeledamöterna, delta i kommunala evenemang och följa fullmäktigemötena.',
                    q: 'Hur kan jag påverka beslut i Kyrkslätt?',
                },
            ],
        },
        id: 'kirkkonummi',
        names: { en: 'Kirkkonummi', fi: 'Kirkkonummi', sv: 'Kyrkslätt' },
        pageTitle: {
            en: 'Kirkko\u00ADnummi – munici\u00ADpality and politics',
            fi: 'Kirkko\u00ADnummi – kunta, politiikka, arki',
            sv: 'Kyrkslätt – kommunal\u00ADpolitik och vardag',
        },
    },
    {
        descriptions: {
            en: 'Posts about the 2025 municipal elections in Kirkkonummi and key themes in local politics.',
            fi: 'Kirjoituksia vuoden 2025 kuntavaaleista Kirkkonummella ja kunnallispolitiikan keskeisistä teemoista.',
            sv: 'Texter om kommunalvalet 2025 i Kyrkslätt och centrala teman i kommunalpolitiken.',
        },
        faq: {
            en: [
                {
                    a: 'Municipal elections decide who sits on the municipal council and shapes local services, land use, and budgets for the next four years.',
                    q: 'What do the 2025 municipal elections decide?',
                },
                {
                    a: "Key topics include local services, school networks, public transport, urban planning, and the municipality's finances.",
                    q: 'What are the key issues in the 2025 municipal elections?',
                },
            ],
            fi: [
                {
                    a: 'Kuntavaalit päättävät, kuka istuu valtuustossa ja muovaa paikallisia palveluja, maankäyttöä ja budjetteja seuraaviksi neljäksi vuodeksi.',
                    q: 'Mistä kuntavaalit 2025 päättävät?',
                },
                {
                    a: 'Keskeisiä teemoja ovat paikalliset palvelut, kouluverkko, joukkoliikenne, kaavoitus ja kunnan talous.',
                    q: 'Mitkä ovat kuntavaalien 2025 tärkeimmät teemat?',
                },
            ],
            sv: [
                {
                    a: 'Kommunalvalet avgör vilka som sitter i fullmäktige och formar lokala tjänster, markanvändning och budgetar under de nästa fyra åren.',
                    q: 'Vad avgör kommunalvalet 2025?',
                },
                {
                    a: 'Viktiga teman är lokala tjänster, skolnätverk, kollektivtrafik, planläggning och kommunens ekonomi.',
                    q: 'Vilka är de viktigaste frågorna i kommunalvalet 2025?',
                },
            ],
        },
        id: 'municipal-elections-2025',
        names: { en: 'Municipal elections 2025', fi: 'Kuntavaalit 2025', sv: 'Kommu\u00ADnalval 2025' },
        pageTitle: {
            en: 'Municipal elections 2025 – Kirkko\u00ADnummi',
            fi: 'Kunta\u00ADvaalit 2025 – Kirkko\u00ADnummen kunta',
            sv: 'Kommu\u00ADnalval 2025 – Kyrkslätt',
        },
    },
    {
        descriptions: {
            en: 'Posts about the Western railway and its importance for public transport in the region.',
            fi: 'Kirjoituksia Länsiradasta ja sen merkityksestä seudun joukkoliikenteelle.',
            sv: 'Texter om Västbanan och dess betydelse för regionens kollektivtrafik.',
        },
        faq: {
            en: [
                {
                    a: 'The Western railway is a planned direct rail connection from Helsinki to northern Kirkko\u00ADnummi, significantly shortening travel times and reducing car dependency in the region.',
                    q: 'What is the Western railway?',
                },
                {
                    a: 'The Western railway would improve accessibility for northern Kirkko\u00ADnummi, attract new residents, and support sustainable urban development while reducing traffic congestion.',
                    q: 'Why is the Western railway important for Kirkkonummi?',
                },
            ],
            fi: [
                {
                    a: 'Länsirata on suunniteltu suora junayhteys Helsingistä Pohjois-Kirkkonummelle. Se lyhentäisi matka-aikoja merkittävästi ja vähentäisi autoilun tarvetta seudulla.',
                    q: 'Mikä on Länsirata?',
                },
                {
                    a: 'Länsirata parantaisi Pohjois-Kirkkonummen saavutettavuutta ja houkuttelisi asukkaita. Se tukisi kestävää kaupunkikehitystä ja vähentäisi liikenneruuhkia.',
                    q: 'Miksi Länsirata on tärkeä Kirkkonummelle?',
                },
            ],
            sv: [
                {
                    a: 'Västbanan är en planerad direktförbindelse från Helsingfors till norra Kyrkslätt. Den skulle kraftigt korta resetiderna och minska bilberoendet i regionen.',
                    q: 'Vad är Västbanan?',
                },
                {
                    a: 'Västbanan skulle förbättra tillgängligheten till norra Kyrkslätt och locka nya invånare. Den stöder hållbar stadsutveckling och minskar trafikstockningar.',
                    q: 'Varför är Västbanan viktig för Kyrkslätt?',
                },
            ],
        },
        id: 'west-railway',
        names: { en: 'Western railway', fi: 'Länsirata', sv: 'Västbanan' },
        pageTitle: {
            en: 'Western railway – rail link to northern Kirkko\u00ADnummi',
            fi: 'Länsirata – Pohjois-Kirkko\u00ADnummen rata\u00ADyhteys',
            sv: 'Västbanan – järnvägs\u00ADförbin\u00ADdelsen till norra Kyrkslätt',
        },
    },
    {
        descriptions: {
            en: 'Posts about the Western Uusimaa welfare area and social and health policy.',
            fi: 'Kirjoituksia Länsi-Uudenmaan hyvinvointialueesta ja sosiaali- ja terveyspolitiikasta.',
            sv: 'Texter om välfärdsområdet Västra Nyland och social- och hälsovårdspolitik.',
        },
        faq: {
            en: [
                {
                    a: 'Western Uusimaa is a welfare area covering Espoo, Kirkkonummi, Kauniainen, Inkoo, Siuntio, Raasepori, Hanko, and Lohja. It is responsible for social and health services in the area.',
                    q: 'What is the Western Uusimaa welfare area?',
                },
                {
                    a: 'Western Uusimaa has specific challenges in organising Swedish-language services, managing long distances in rural areas, and balancing costs with service quality.',
                    q: 'What are the main challenges for Western Uusimaa?',
                },
            ],
            fi: [
                {
                    a: 'Länsi-Uusimaa on hyvinvointialue, johon kuuluvat Espoo, Kirkkonummi, Kauniainen, Inkoo, Siuntio, Raasepori, Hanko ja Lohja. Se vastaa alueen sosiaali- ja terveyspalveluista.',
                    q: 'Mikä on Länsi-Uudenmaan hyvinvointialue?',
                },
                {
                    a: 'Länsi-Uudellamaalla on erityisiä haasteita ruotsinkielisten palvelujen järjestämisessä, pitkien välimatkojen hallinnassa maaseudulla ja kustannusten tasapainottamisessa palvelutason kanssa.',
                    q: 'Mitkä ovat Länsi-Uudenmaan suurimmat haasteet?',
                },
            ],
            sv: [
                {
                    a: 'Västra Nyland är ett välfärdsområde som omfattar Esbo, Kyrkslätt, Grankulla, Ingå, Sjundeå, Raseborg, Hangö och Lojo. Det ansvarar för social- och hälsovårdstjänster i området.',
                    q: 'Vad är välfärdsområdet Västra Nyland?',
                },
                {
                    a: 'Västra Nyland har särskilda utmaningar med att ordna svenskspråkiga tjänster, hantera långa avstånd på landsbygden och balansera kostnader med servicekvalitet.',
                    q: 'Vilka är de största utmaningarna för Västra Nyland?',
                },
            ],
        },
        id: 'western-uusimaa',
        names: { en: 'Western Uusimaa', fi: 'Länsi-Uusimaa', sv: 'Västra Nyland' },
        pageTitle: {
            en: 'Western Uusimaa – welfare area and regional politics',
            fi: 'Länsi-Uusimaa – hyvin\u00ADvointi\u00ADalue\u00ADpolitiik\u00ADkaa',
            sv: 'Västra Nyland – välfärds\u00ADområde och regional\u00ADpolitik',
        },
    },
    {
        descriptions: {
            en: 'Posts about transport, public transit, and sustain\u00ADable mobility.',
            fi: 'Kirjoituksia liikenteestä, joukkoliikenteestä ja kestävästä liikkumisesta.',
            sv: 'Texter om trafik, kollektivtrafik och hållbar rörlighet.',
        },
        faq: {
            en: [
                {
                    a: 'Sustainable transport reduces car dependency through better public transit, cycling infrastructure, and land use planning that places services close to where people live.',
                    q: 'What is sustainable transport?',
                },
                {
                    a: 'Public transit improvements, cycling routes, and pedestrian paths reduce emissions, improve health outcomes, and make areas more accessible for those without cars.',
                    q: 'Why invest in public transit and cycling?',
                },
            ],
            fi: [
                {
                    a: 'Kestävä liikenne vähentää autoilua parantamalla joukkoliikennettä, pyöräilyinfrastruktuuria ja maankäyttöä siten, että palvelut ovat lähellä ihmisten arkea.',
                    q: 'Mitä kestävä liikenne tarkoittaa?',
                },
                {
                    a: 'Joukkoliikenteen, pyöräilyreittien ja kävelyväylien kehittäminen vähentää päästöjä, parantaa terveyttä ja tekee alueista saavutettavampia autottomille.',
                    q: 'Miksi joukkoliikenteeseen ja pyöräilyyn kannattaa investoida?',
                },
            ],
            sv: [
                {
                    a: 'Hållbar trafik minskar bilberoendet genom bättre kollektivtrafik, cykelinfrastruktur och markanvändning som placerar tjänster nära där människor bor.',
                    q: 'Vad innebär hållbar trafik?',
                },
                {
                    a: 'Satsningar på kollektivtrafik, cykelvägar och gångstråk minskar utsläpp, förbättrar hälsan och gör områden mer tillgängliga för dem utan bil.',
                    q: 'Varför investera i kollektivtrafik och cykling?',
                },
            ],
        },
        id: 'transportation',
        names: { en: 'Transport', fi: 'Liikenne', sv: 'Trafik' },
        pageTitle: {
            en: 'Transport – public transit and sustain\u00ADable mobility',
            fi: 'Liikenne – joukko\u00ADliikenne ja kestävä liikku\u00ADminen',
            sv: 'Trafik – kollektiv\u00ADtrafik och hållbar rörlighet',
        },
    },
    {
        descriptions: {
            en: 'Posts about immigration, integration, and immigration policy.',
            fi: 'Kirjoituksia maahanmuutosta, kotoutumisesta ja maahanmuuttopolitiikasta.',
            sv: 'Texter om immigration, integration och invandrarpolitik.',
        },
        faq: {
            en: [
                {
                    a: 'Immigration policy covers who is allowed to enter, stay, and become citizens. Integration policy concerns how newcomers are supported in becoming part of society.',
                    q: 'What is the difference between immigration and integration policy?',
                },
                {
                    a: 'Successful integration requires language education, employment pathways, housing, and social connections. Municipalities play a key role in providing these services.',
                    q: 'What does successful integration require?',
                },
            ],
            fi: [
                {
                    a: 'Maahanmuuttopolitiikka koskee sitä, kuka saa tulla maahan, oleskella ja saada kansalaisuuden. Kotoutumispolitiikka koskee sitä, miten tulijoita tuetaan osaksi yhteiskuntaa.',
                    q: 'Mitä eroa on maahanmuutto- ja kotoutumispolitiikalla?',
                },
                {
                    a: 'Onnistunut kotoutuminen edellyttää kieliopetusta, työllistymispolkuja, asumista ja sosiaalisia yhteyksiä. Kunnilla on keskeinen rooli näiden palvelujen tarjoamisessa.',
                    q: 'Mitä onnistunut kotoutuminen edellyttää?',
                },
            ],
            sv: [
                {
                    a: 'Invandrarpolitik handlar om vem som får komma in, stanna och bli medborgare. Integrationspolitik handlar om hur nyanlända stöds att bli en del av samhället.',
                    q: 'Vad är skillnaden mellan invandrar- och integrationspolitik?',
                },
                {
                    a: 'Lyckad integration kräver språkutbildning, vägar till sysselsättning, boende och sociala kontakter. Kommunerna spelar en nyckelroll i att tillhandahålla dessa tjänster.',
                    q: 'Vad kräver lyckad integration?',
                },
            ],
        },
        id: 'immigration',
        names: { en: 'Immigration', fi: 'Maahanmuutto', sv: 'Immigration' },
        pageTitle: {
            en: 'Immi\u00ADgration – facts and policy',
            fi: 'Maahan\u00ADmuutto – faktat ja politiikka',
            sv: 'Immi\u00ADgration – fakta och politik',
        },
    },
    {
        descriptions: {
            en: [
                'Education is an investment, not a spending item. Cuts that look like savings today accumulate into skills deficits, social costs, and lost competitiveness for years to come.',
                'In early childhood education, staffing ratios and group sizes are not just operational questions — they are developmental ones. The research is clear: quality in the first years has the highest long-term return of any educational investment. In Kirkkonummi I have consistently argued for protecting early childhood staffing levels and resisting group size increases that save money on paper while costing more in child welfare outcomes.',
                'Lifelong learning is not a supplementary concern — it is a structural requirement in an economy being reshaped by automation and AI. The education system must serve adults in transition, not only children entering the workforce. Public investment in adult education, retraining, and professional development pays returns across the working population.',
            ],
            fi: [
                'Koulutus on investointi, ei menoerä. Säästöt, jotka näyttävät säästöiltä tänään, kertyvät osaamispuutteiksi, sosiaalisiksi kustannuksiksi ja heikentyneeksi kilpailukyvyksi vuosiksi eteenpäin.',
                'Varhaiskasvatuksessa henkilöstömitoitus ja ryhmäkoot eivät ole vain operatiivisia kysymyksiä — ne ovat kehityksellisiä kysymyksiä. Tutkimusnäyttö on selvä: laatu ensimmäisinä vuosina tuottaa suurimman pitkäaikaistuoton kaikista koulutusinvestoinneista. Kirkkonummella olen johdonmukaisesti puolustanut varhaiskasvatuksen henkilöstötasoja ja vastustanut ryhmäkokojen kasvattamista, joka säästää paperilla rahaa mutta maksaa enemmän lasten hyvinvoinnin tuloksissa.',
                'Elinikäinen oppiminen ei ole toissijainen huoli — se on rakenteellinen vaatimus taloudessa, jota automaatio ja tekoäly muovaavat. Koulutusjärjestelmän on palveltava siirtymässä olevia aikuisia, ei pelkästään työvoimaan astuvia lapsia. Julkinen investointi aikuiskoulutukseen, uudelleenkoulutukseen ja ammatilliseen kehittymiseen tuottaa tuottoja koko työssäkäyvässä väestössä.',
            ],
            sv: [
                'Utbildning är en investering, inte en utgiftspost. Nedskärningar som ser ut som besparingar idag ackumuleras till kompetensbrist, sociala kostnader och förlorad konkurrenskraft under år framöver.',
                'Inom småbarnspedagogik är personaltäthet och gruppstorlekar inte bara operativa frågor — de är utvecklingsfrågor. Forskningen är tydlig: kvalitet under de första åren ger den högsta långsiktiga avkastningen av alla utbildningsinvesteringar. I Kyrkslätt har jag konsekvent argumenterat för att skydda bemanningsnivåerna inom småbarnspedagogiken och motstå ökningar av gruppstorlekarna som sparar pengar på papper men kostar mer i barnvälfärdsutfall.',
                'Livslångt lärande är inte en sidofråga — det är ett strukturellt krav i en ekonomi som omformas av automatisering och AI. Utbildningssystemet måste betjäna vuxna i omställning, inte bara barn som träder in i arbetslivet. Offentliga investeringar i vuxenutbildning, omskolning och kompetensutveckling ger avkastning tvärs igenom den arbetsföra befolkningen.',
            ],
        },
        faq: {
            en: [
                {
                    a: 'Municipalities are responsible for basic education (grades 1–9), upper secondary schools, and early childhood education. The state sets the curriculum, but municipalities organise delivery.',
                    q: 'What educational services do municipalities provide?',
                },
                {
                    a: 'Key issues include school network planning, class sizes, teacher availability, and ensuring equal opportunities regardless of where a child lives.',
                    q: 'What are the key issues in municipal education policy?',
                },
                {
                    a: 'Short-term savings create long-term costs. Skills deficits, social inequality, and reduced economic competitiveness are the compounding costs of underinvestment in education. The return on early childhood investment especially is among the highest of any public spending.',
                    q: 'Why oppose education cuts?',
                },
                {
                    a: 'Staffing ratios must be protected — group sizes that are too large harm developmental outcomes regardless of what a budget spreadsheet shows. Teacher salaries need to remain competitive to attract and retain qualified professionals. In Kirkkonummi I have argued for these positions consistently in the council.',
                    q: 'What needs to improve in early childhood education?',
                },
                {
                    a: 'Yes. Automation and AI are reshaping the labour market continuously. People need to be able to re-skill throughout their working lives, not just in initial education. Public investment in adult education and retraining is a structural economic requirement, not a welfare programme.',
                    q: 'Is lifelong learning a priority?',
                },
            ],
            fi: [
                {
                    a: 'Kunnat vastaavat perusopetuksesta (vuosiluokat 1–9), lukioista ja varhaiskasvatuksesta. Valtio asettaa opetussuunnitelman, mutta kunnat järjestävät opetuksen.',
                    q: 'Mistä koulutuspalveluista kunnat vastaavat?',
                },
                {
                    a: 'Keskeisiä kysymyksiä ovat kouluverkon suunnittelu, luokkakoot, opettajien saatavuus ja tasa-arvoisten mahdollisuuksien turvaaminen asuinpaikasta riippumatta.',
                    q: 'Mitkä ovat kunnallisen koulutuspolitiikan tärkeimmät kysymykset?',
                },
                {
                    a: 'Lyhyen aikavälin säästöt luovat pitkän aikavälin kustannuksia. Osaamispuutteet, sosiaalinen eriarvoisuus ja heikentynyt taloudellinen kilpailukyky ovat koulutusaleinvestointien kertyvät kustannukset. Varhaiskasvatusinvestoinnin tuotto on erityisesti yksi julkisten menojen korkeimmista.',
                    q: 'Miksi Lauri Lavannin mielestä koulutusleikkaukset ovat haitallisia?',
                },
                {
                    a: 'Henkilöstömitoitus on suojattava — liian suuret ryhmäkoot haittaavat kehityksellisiä tuloksia riippumatta siitä, mitä budjettiarkki näyttää. Opettajapalkkojen on pysyttävä kilpailukykyisinä pätevien ammattilaisten houkuttelemiseksi ja pitämiseksi. Kirkkonummella olen ajanut näitä kantoja johdonmukaisesti valtuustossa.',
                    q: 'Mitä varhaiskasvatuksessa pitää parantaa?',
                },
                {
                    a: 'Kyllä. Automaatio ja tekoäly muovaavat työmarkkinoita jatkuvasti. Ihmisten on voitava hankkia uusia taitoja läpi työuransa, ei pelkästään alkukoulutuksessa. Julkinen investointi aikuiskoulutukseen ja uudelleenkoulutukseen on rakenteellinen taloudellinen vaatimus, ei hyvinvointiohjelma.',
                    q: 'Onko elinikäinen oppiminen prioriteetti?',
                },
            ],
            sv: [
                {
                    a: 'Kommunerna ansvarar för grundläggande utbildning (åk 1–9), gymnasier och småbarnspedagogik. Staten fastställer läroplanen, men kommunerna organiserar undervisningen.',
                    q: 'Vilka utbildningstjänster tillhandahåller kommunerna?',
                },
                {
                    a: 'Viktiga frågor är skolnätverksplanering, klasstorlekar, lärartillgång och att säkerställa lika möjligheter oavsett var ett barn bor.',
                    q: 'Vilka är de viktigaste frågorna i kommunal utbildningspolitik?',
                },
                {
                    a: 'Kortsiktiga besparingar skapar långsiktiga kostnader. Kompetensbrist, social ojämlikhet och förlorad ekonomisk konkurrenskraft är de ackumulerade kostnaderna av underinvestering i utbildning. Avkastningen på investeringar i småbarnspedagogik är särskilt bland de högsta av all offentlig utgift.',
                    q: 'Varför är utbildningsnedskärningar skadliga?',
                },
                {
                    a: 'Personaltätheten måste skyddas — för stora grupper skadar utvecklingsutfall oavsett vad ett budgetsystem visar. Lärarlöner måste förbli konkurrenskraftiga för att attrahera och behålla kvalificerade yrkesverksamma. I Kyrkslätt har jag konsekvent argumenterat för dessa ståndpunkter i fullmäktige.',
                    q: 'Vad behöver förbättras inom småbarnspedagogiken?',
                },
                {
                    a: 'Ja. Automatisering och AI omformar arbetsmarknaden kontinuerligt. Människor måste kunna skola om sig under hela sitt yrkesliv, inte bara i den initiala utbildningen. Offentlig investering i vuxenutbildning och omskolning är ett strukturellt ekonomiskt krav, inte ett välfärdsprogram.',
                    q: 'Är livslångt lärande en prioritet?',
                },
            ],
        },
        id: 'education',
        names: { en: 'Education', fi: 'Opetus', sv: 'Utbildning' },
        pageTitle: {
            en: 'About education and education policy',
            fi: 'Opetuk\u00ADsesta ja koulutus\u00ADpolitii\u00ADkasta',
            sv: 'Om utbildning och utbild\u00ADnings\u00ADpolitik',
        },
    },
    {
        descriptions: {
            en: 'Posts about co-op elections and S Group member democracy.',
            fi: 'Kirjoituksia osuuskauppavaaleista ja S-ryhmän jäsendemokratiasta.',
            sv: 'Texter om kooperativvalet och S-gruppens medlemsdemokrati.',
        },
        faq: {
            en: [
                {
                    a: "Co-op elections let S Group members elect representatives to the cooperative's supervisory board, which oversees the management of a major Finnish retail and services group.",
                    q: 'What are co-op elections?',
                },
                {
                    a: "Any S Group customer-owner (member) can vote. Voter turnout is typically low, which means engaged members have significant influence over the cooperative's direction.",
                    q: 'Who can vote in co-op elections?',
                },
            ],
            fi: [
                {
                    a: 'Osuuskauppavaaleissa S-ryhmän jäsenet valitsevat edustajia osuuskaupan edustajistoon, joka valvoo yhden Suomen suurimman kauppa- ja palveluryhmittymän johtoa.',
                    q: 'Mitä osuuskauppavaalit ovat?',
                },
                {
                    a: 'Jokainen S-ryhmän asiakas-omistaja voi äänestää. Äänestysprosentti on tyypillisesti matala, mikä tarkoittaa, että aktiivisilla jäsenillä on merkittävä vaikutusvalta.',
                    q: 'Kuka voi äänestää osuuskauppavaaleissa?',
                },
            ],
            sv: [
                {
                    a: 'I kooperativvalet väljer S-gruppens medlemmar representanter till kooperativets fullmäktige, som övervakar ledningen av en av Finlands största handels- och servicegrupper.',
                    q: 'Vad är kooperativval?',
                },
                {
                    a: 'Alla S-gruppens kundägare (medlemmar) kan rösta. Valdeltagandet är typiskt lågt, vilket innebär att engagerade medlemmar har stort inflytande.',
                    q: 'Vem kan rösta i kooperativvalet?',
                },
            ],
        },
        id: 'coop-elections',
        names: { en: 'Co-op elections', fi: 'Osuuskauppavaalit', sv: 'Kooperativval' },
        pageTitle: {
            en: 'Co-op elections – S Group democracy',
            fi: 'Osuus\u00ADkauppa\u00ADvaalit – S-ryhmän demokratia',
            sv: 'Koopera\u00ADtivval – S-gruppens demokrati',
        },
    },
    {
        descriptions: {
            en: 'Posts about basic welfare, social benefits, and social services.',
            fi: 'Kirjoituksia perusturvasta, sosiaalietuuksista ja sosiaalipalveluista.',
            sv: 'Texter om grundläggande trygghet, sociala förmåner och socialtjänster.',
        },
        faq: {
            en: [
                {
                    a: 'Basic welfare (perusturva) refers to the minimum social security benefits guaranteed to everyone in Finland, including income support, housing allowance, and basic health services.',
                    q: 'What is basic welfare?',
                },
                {
                    a: 'Social services are provided by welfare areas, while income-based benefits such as basic income support are administered by Kela, the Social Insurance Institution of Finland.',
                    q: 'Who provides social services in Finland?',
                },
            ],
            fi: [
                {
                    a: 'Perusturva tarkoittaa Suomessa kaikille taattuja minimitason sosiaaliturvaetuuksia, kuten toimeentulotukea, asumistukea ja perusterveydenhuoltopalveluja.',
                    q: 'Mitä perusturva tarkoittaa?',
                },
                {
                    a: 'Sosiaalipalvelut tarjoavat hyvinvointialueet, kun taas tulosidonnaisia etuuksia kuten perustoimeentulotukea hallinnoi Kela.',
                    q: 'Kuka tarjoaa sosiaalipalveluja Suomessa?',
                },
            ],
            sv: [
                {
                    a: 'Grundläggande trygghet syftar på de miniminivå av sociala förmåner som garanteras alla i Finland, inklusive utkomststöd, bostadsbidrag och grundläggande hälsotjänster.',
                    q: 'Vad är grundläggande trygghet?',
                },
                {
                    a: 'Socialtjänster tillhandahålls av välfärdsområdena, medan inkomstbaserade förmåner som grundläggande utkomststöd administreras av FPA.',
                    q: 'Vem tillhandahåller socialtjänster i Finland?',
                },
            ],
        },
        id: 'basic-welfare',
        names: { en: 'Basic welfare', fi: 'Perusturva', sv: 'Grundläggande' },
        pageTitle: {
            en: 'About basic welfare and social security',
            fi: 'Perus\u00ADturvasta ja sosiaali\u00ADturvasta arjessa',
            sv: 'Om grund\u00ADläggande trygghet och social\u00ADskydd',
        },
    },
    {
        descriptions: {
            en: 'Posts about culture, civic education, libraries, and leisure services.',
            fi: 'Kirjoituksia sivistyksestä, kulttuurista, kirjastoista ja vapaa-ajan palveluista.',
            sv: 'Texter om bildning, kultur, bibliotek och fritidstjänster.',
        },
        faq: {
            en: [
                {
                    a: 'Culture and education services include libraries, museums, arts education, youth work, sports facilities, and adult education. They are core municipal responsibilities.',
                    q: 'What services fall under culture and civic education?',
                },
                {
                    a: 'Cultural services strengthen community identity, support wellbeing, and create spaces for participation. They are especially important for children, young people, and older residents.',
                    q: 'Why do cultural services matter?',
                },
            ],
            fi: [
                {
                    a: 'Sivistyspalveluihin kuuluvat kirjastot, museot, taidekasvatus, nuorisotyö, liikuntapaikat ja aikuiskoulutus. Ne ovat keskeisiä kunnallisia tehtäviä.',
                    q: 'Mitä palveluja sivistys- ja kulttuuritoimi kattaa?',
                },
                {
                    a: 'Kulttuuripalvelut vahvistavat yhteisön identiteettiä, tukevat hyvinvointia ja luovat osallistumisen tiloja. Ne ovat erityisen tärkeitä lapsille, nuorille ja ikääntyneille.',
                    q: 'Miksi kulttuuripalvelut ovat tärkeitä?',
                },
            ],
            sv: [
                {
                    a: 'Bildnings- och kulturtjänster inkluderar bibliotek, museer, konstpedagogik, ungdomsarbete, idrottsanläggningar och vuxenutbildning. De är centrala kommunala uppgifter.',
                    q: 'Vilka tjänster ingår i bildning och kultur?',
                },
                {
                    a: 'Kulturtjänster stärker samhällets identitet, stöder välmående och skapar utrymmen för deltagande. De är särskilt viktiga för barn, unga och äldre.',
                    q: 'Varför är kulturtjänster viktiga?',
                },
            ],
        },
        id: 'culture-and-education',
        names: { en: 'Culture & education', fi: 'Sivistys', sv: 'Bildning' },
        pageTitle: {
            en: 'Culture, civic education and leisure',
            fi: 'Sivistyk\u00ADsestä ja kulttuuri\u00ADpalvelu\u00ADista',
            sv: 'Bildning, kultur och fritids\u00ADtjänster',
        },
    },
    {
        descriptions: {
            en: 'Posts about social media and its impact on politics and communication.',
            fi: 'Kirjoituksia sosiaalisesta mediasta, sen vaikutuksesta politiikkaan ja viestintään.',
            sv: 'Texter om sociala medier och deras påverkan på politik och kommunikation.',
        },
        faq: {
            en: [
                {
                    a: 'Social media enables direct communication between politicians and citizens, but also amplifies misinformation, filter bubbles, and polarisation. Understanding both sides is essential.',
                    q: 'How does social media affect political communication?',
                },
                {
                    a: 'Critical media literacy, algorithm transparency, and platform regulation are key tools for making social media healthier for democratic debate.',
                    q: 'How can we make social media healthier for democracy?',
                },
            ],
            fi: [
                {
                    a: 'Sosiaa\u00ADlinen media mahdollistaa suoran viestinnän poliitikkojen ja kansalaisten välillä, mutta myös vahvistaa disinformaatiota, kuplautumista ja polarisaatiota. Molempien puolien ymmärtäminen on tärkeää.',
                    q: 'Miten sosiaalinen media vaikuttaa poliittiseen viestintään?',
                },
                {
                    a: 'Mediakriittisyys, algoritmien läpinäkyvyys ja alustojen sääntely ovat keskeisiä keinoja tehdä sosiaalisesta mediasta terveempää demokraattiselle keskustelulle.',
                    q: 'Miten sosiaalinen media saadaan terveemmäksi demokratialle?',
                },
            ],
            sv: [
                {
                    a: 'Sociala medier möjliggör direkt kommunikation mellan politiker och medborgare, men förstärker också desinformation, filterbubblor och polarisering. Det är viktigt att förstå båda sidor.',
                    q: 'Hur påverkar sociala medier politisk kommunikation?',
                },
                {
                    a: 'Kritisk mediekunnighet, algoritmtransparens och plattformsreglering är viktiga verktyg för att göra sociala medier hälsosammare för demokratisk debatt.',
                    q: 'Hur kan sociala medier bli hälsosammare för demokratin?',
                },
            ],
        },
        id: 'social-media',
        names: { en: 'Social media', fi: 'Sosiaa\u00ADlinen media', sv: 'Sociala medier' },
        pageTitle: {
            en: 'Social media in politics and communica\u00ADtion',
            fi: 'Sosiaa\u00ADlinen media politii\u00ADkassa ja viestin\u00ADnässä',
            sv: 'Sociala medier i politik och kommunika\u00ADtion',
        },
    },
    {
        descriptions: {
            en: 'Posts about the social and health reform, welfare areas, and the organisation of health and social services.',
            fi: 'Kirjoituksia sote-uudistuksesta, hyvinvointialueista ja sosiaali- ja terveyspalvelujen järjestämisestä.',
            sv: 'Texter om vård- och servicereformen, välfärdsområdena och organisering av social- och hälsovårdstjänster.',
        },
        faq: {
            en: [
                {
                    a: 'The social and health reform (sote) transferred responsibility for health and social services from municipalities to 21 new welfare areas starting in 2023.',
                    q: 'What is the Finnish social and health reform?',
                },
                {
                    a: 'The key challenges are financial sustainability, ensuring equal service access across regions, reducing waiting times, and integrating social and health services.',
                    q: 'What are the key challenges of the welfare area reform?',
                },
            ],
            fi: [
                {
                    a: 'Sote-uudistuksessa sosiaali- ja terveyspalvelujen vastuu siirtyi kunnilta 21:lle uudelle hyvinvointialueelle vuoden 2023 alusta.',
                    q: 'Mitä sote-uudistus tarkoittaa?',
                },
                {
                    a: 'Keskeisiä haasteita ovat taloudellinen kestävyys, tasa-arvoinen palvelujen saatavuus alueilla, hoitojonojen lyhentäminen ja sosiaali- ja terveyspalvelujen integraatio.',
                    q: 'Mitkä ovat hyvinvointialueuudistuksen keskeisimmät haasteet?',
                },
            ],
            sv: [
                {
                    a: 'Vård- och servicereformen överförde ansvaret för social- och hälsovårdstjänster från kommunerna till 21 nya välfärdsområden från och med 2023.',
                    q: 'Vad innebär den finländska vård- och servicereformen?',
                },
                {
                    a: 'De viktigaste utmaningarna är ekonomisk hållbarhet, säkerställande av likvärdig tillgång till tjänster i olika regioner, kortare vårdköer och integration av social- och hälsovårdstjänster.',
                    q: 'Vilka är de viktigaste utmaningarna med välfärdsområdesreformen?',
                },
            ],
        },
        id: 'health-and-social-reform',
        names: { en: 'Social & health reform', fi: 'Sote-uudistus', sv: 'Vård- och servicereform' },
        pageTitle: {
            en: 'Social and health reform – welfare areas',
            fi: 'Sote-uudistus – hyvin\u00ADvointi\u00ADalueet',
            sv: 'Vård- och service\u00ADreform – välfärds\u00ADområden',
        },
    },
    {
        descriptions: {
            en: 'Posts about equality, non-discrimination, and anti-discrimination work.',
            fi: 'Kirjoituksia tasa-arvosta, yhdenvertaisuudesta ja syrjinnän vastaisesta työstä.',
            sv: 'Texter om jämlikhet, icke-diskriminering och antidiskrimineringsarbete.',
        },
        faq: {
            en: [
                {
                    a: 'Equality (tasa-arvo) refers to equal rights and treatment regardless of gender. Non-discrimination (yhdenvertaisuus) is broader, covering ethnicity, age, disability, religion, and other grounds.',
                    q: 'What is the difference between equality and non-discrimination?',
                },
                {
                    a: 'Municipalities must draw up both an equality plan and a non-discrimination plan, and actively work to prevent discrimination in their services and as employers.',
                    q: 'What are municipalities required to do for equality?',
                },
            ],
            fi: [
                {
                    a: 'Tasa-arvo tarkoittaa yhdenvertaisia oikeuksia ja kohtelua sukupuolesta riippumatta. Yhdenvertaisuus on laajempi käsite ja kattaa myös etnisyyden, iän, vammaisuuden, uskonnon ja muut perusteet.',
                    q: 'Mitä eroa on tasa-arvolla ja yhdenvertaisuudella?',
                },
                {
                    a: 'Kuntien on laadittava sekä tasa-arvosuunnitelma että yhdenvertaisuussuunnitelma, ja aktiivisesti ehkäistävä syrjintää palveluissaan ja työnantajana.',
                    q: 'Mitä kunnat ovat velvollisia tekemään tasa-arvon eteen?',
                },
            ],
            sv: [
                {
                    a: 'Jämlikhet (tasa-arvo) avser lika rättigheter och behandling oavsett kön. Icke-diskriminering (yhdenvertaisuus) är bredare och täcker etnicitet, ålder, funktionsnedsättning, religion och andra grunder.',
                    q: 'Vad är skillnaden mellan jämlikhet och icke-diskriminering?',
                },
                {
                    a: 'Kommunerna måste upprätta både en jämställdhetsplan och en likabehandlingsplan, och aktivt arbeta för att förebygga diskriminering i sina tjänster och som arbetsgivare.',
                    q: 'Vad är kommunerna skyldiga att göra för jämlikhet?',
                },
            ],
        },
        id: 'equality-and-non-discrimination',
        names: { en: 'Equality & equity', fi: 'Tasa-arvo ja yhdenvertaisuus', sv: 'Jämlikhet' },
        pageTitle: {
            en: 'About equality and non-discri\u00ADmination',
            fi: 'Tasa-arvosta ja yhden\u00ADvertai\u00ADsuudesta',
            sv: 'Om jämlikhet och icke-diskri\u00ADminering',
        },
    },
    {
        descriptions: {
            en: [
                'Finland has a strong tradition of technological competence. Maintaining that edge requires people with practical expertise at the table where policy decisions are made.',
                'Most technology regulation is written by people who have never written code, deployed a system, or managed data at scale. When laws are drafted without that lived understanding, the result is rules that industry has effectively written for itself. I bring the perspective of someone who has built and run software systems professionally — and that shapes how I read proposed regulation.',
                'Technology decisions are not isolated to a single policy area. They underlie education, privacy, democratic participation, public services, and economic competitiveness. A coherent technology policy requires connecting those threads rather than treating each in isolation.',
            ],
            fi: [
                'Suomella on vahva teknologiaosaamisen perinne. Sen ylläpitäminen edellyttää käytännön asiantuntemusta poliittisten päätösten pöydässä.',
                'Suurin osa teknologiasääntelystä kirjoitetaan ihmisten toimesta, jotka eivät ole koskaan kirjoittaneet koodia, ottaneet järjestelmiä käyttöön tai hallinnoineet dataa mittakaavassa. Kun lakeja laaditaan ilman tätä kokemusperäistä ymmärrystä, tuloksena on sääntely, jonka teollisuus on käytännössä kirjoittanut itselleen. Tuon pöytään näkökulman henkilöltä, joka on rakentanut ja ylläpitänyt ohjelmistojärjestelmiä ammattimaisesti — ja se muovaa tapaani lukea ehdotettua sääntelyä.',
                'Teknologiapäätökset eivät ole erillään muista politiikka-alueista. Ne ovat koulutuksen, yksityisyydensuojan, demokraattisen osallistumisen, julkisten palvelujen ja taloudellisen kilpailukyvyn taustalla. Johdonmukainen teknologiapolitiikka edellyttää näiden lankojen yhdistämistä sen sijaan, että kutakin käsitellään erikseen.',
            ],
            sv: [
                'Finland har en stark tradition av teknologisk kompetens. Att upprätthålla den fördelen kräver att människor med praktisk expertis sitter vid bordet där politiska beslut fattas.',
                'Det mesta av teknikregleringen skrivs av människor som aldrig har skrivit kod, driftsatt ett system eller hanterat data i stor skala. När lagar utformas utan den levda förståelsen blir resultatet regler som branschen i praktiken har skrivit åt sig själv. Jag bidrar med perspektivet från någon som professionellt har byggt och drivit mjukvarusystem — och det formar hur jag läser föreslagen reglering.',
                'Teknologibeslut är inte isolerade till ett enda politikområde. De ligger till grund för utbildning, integritet, demokratiskt deltagande, offentliga tjänster och ekonomisk konkurrenskraft. En sammanhängande teknologipolitik kräver att dessa trådar kopplas samman snarare än att behandla var och en separat.',
            ],
        },
        faq: {
            en: [
                {
                    a: 'Technology changes how politicians communicate with voters, how decisions are made, and how public services are delivered. It can increase transparency but also introduce new risks.',
                    q: 'How does technology affect politics?',
                },
                {
                    a: 'Technology policy covers decisions about how society develops, regulates, and utilises technology — including AI, data protection, and digitalisation.',
                    q: 'What does technology policy mean?',
                },
                {
                    a: 'Without it, technology laws are effectively written to industry specifications. A politician who understands how systems work can ask the right questions, spot loopholes, and insist on rules that actually protect citizens rather than just creating compliance overhead.',
                    q: 'Why does technical expertise matter in political decision-making?',
                },
                {
                    a: 'Policy that centres citizens, not vendors. It means open standards, vendor neutrality in public procurement, transparency requirements, and democratic oversight of the systems that increasingly govern everyday life.',
                    q: "What does 'responsible technology policy' mean?",
                },
            ],
            fi: [
                {
                    a: 'Teknologia muuttaa tapaa, jolla poliitikot viestivät äänestäjien kanssa, miten päätöksiä tehdään ja miten julkisia palveluja tarjotaan. Se voi lisätä avoimuutta mutta myös tuoda uusia riskejä.',
                    q: 'Miten teknologia vaikuttaa politiikkaan?',
                },
                {
                    a: 'Teknologiapolitiikka tarkoittaa päätöksiä siitä, miten yhteiskunta kehittää, sääntelee ja hyödyntää teknologiaa. Siihen kuuluvat muun muassa tekoäly, tietosuoja ja digitalisaatio.',
                    q: 'Mitä teknologiapolitiikka tarkoittaa?',
                },
                {
                    a: 'Ilman sitä teknologialait kirjoitetaan käytännössä teollisuuden ehtojen mukaan. Poliitikko, joka ymmärtää miten järjestelmät toimivat, voi esittää oikeita kysymyksiä, havaita porsaanreiät ja vaatia sääntöjä, jotka todella suojaavat kansalaisia sen sijaan, että luovat pelkästään vaatimustenmukaisuustaakkaa.',
                    q: 'Miksi teknologiaosaaminen on tärkeää poliittisessa päätöksenteossa?',
                },
                {
                    a: 'Politiikka, joka asettaa kansalaiset, ei toimittajat, etusijalle. Se tarkoittaa avoimia standardeja, toimittajariippumattomuutta julkisissa hankinnoissa, läpinäkyvyysvaatimuksia ja demokraattista valvontaa niissä järjestelmissä, jotka yhä enemmän hallitsevat jokapäiväistä elämää.',
                    q: 'Mitä tarkoittaa vastuullinen teknologiapolitiikka?',
                },
            ],
            sv: [
                {
                    a: 'Teknologi förändrar hur politiker kommunicerar med väljarna, hur beslut fattas och hur offentliga tjänster tillhandahålls. Det kan öka transparensen men också medföra nya risker.',
                    q: 'Hur påverkar teknologi politiken?',
                },
                {
                    a: 'Teknologipolitik handlar om beslut om hur samhället utvecklar, reglerar och utnyttjar teknologi. Det inkluderar bland annat AI, dataskydd och digitalisering.',
                    q: 'Vad innebär teknologipolitik?',
                },
                {
                    a: 'Utan det skrivs teknologilagar i praktiken enligt branschens specifikationer. En politiker som förstår hur system fungerar kan ställa rätt frågor, upptäcka kryphål och insistera på regler som faktiskt skyddar medborgarna snarare än bara skapar efterlevnadsbörda.',
                    q: 'Varför spelar teknologisk kompetens roll i politiskt beslutsfattande?',
                },
                {
                    a: 'Politik som sätter medborgarna, inte leverantörerna, i centrum. Det innebär öppna standarder, leverantörsneutralitet i offentlig upphandling, transparenskrav och demokratisk tillsyn av de system som i allt högre grad styr vardagslivet.',
                    q: 'Vad innebär ansvarsfull teknologipolitik?',
                },
            ],
        },
        id: 'technology',
        names: { en: 'Technology', fi: 'Teknologia', sv: 'Teknologi' },
        pageTitle: {
            en: 'Technology in society and politics',
            fi: 'Teknologia yhteis\u00ADkunnassa ja politii\u00ADkassa',
            sv: 'Teknologi i samhälle och politik',
        },
    },
    {
        descriptions: {
            en: [
                'I work with AI tools professionally as a lead developer — I argue from hands-on experience, not theory. AI is the most significant productivity transformation of our time, and Finland must engage with it actively and critically.',
                'AI amplifies both capability and bias. In public-sector applications — benefits decisions, permit processing, predictive policing — the stakes are too high to deploy systems without transparency and human oversight. I advocate for explainable algorithms in consequential decisions, open-source models where feasible, and mandatory human review for decisions that affect individual rights.',
                'The more powerful AI becomes, the more important privacy protections are. AI systems are data-hungry; without strong data protection rules, they become surveillance infrastructure. The EU AI Act is a step in the right direction, but implementation must be substantive — not checkbox compliance.',
            ],
            fi: [
                'Olen käyttänyt tekoälytyökaluja ammatillisesti lead developer -roolissa — argumentoin käytännön kokemuksesta, en teoriasta. Tekoäly on aikamme merkittävin tuottavuusmuutos, ja Suomen on tartuttava siihen aktiivisesti ja kriittisesti.',
                'Tekoäly vahvistaa sekä kykyä että harhoja. Julkisen sektorin sovelluksissa — etuuspäätöksissä, luvankäsittelyssä, ennakoivassa poliisitoiminnassa — panokset ovat liian suuret, jotta järjestelmiä voitaisiin ottaa käyttöön ilman läpinäkyvyyttä ja inhimillistä valvontaa. Ajan selitettäviä algoritmeja merkityksellisiin päätöksiin, avoimen lähdekoodin malleja silloin kun mahdollista, ja pakollista ihmisvalvontaa yksilöiden oikeuksiin vaikuttavissa päätöksissä.',
                'Mitä voimakkaammaksi tekoäly kehittyy, sitä tärkeämmiksi yksityisyydensuoja tulee. Tekoälyjärjestelmät ovat tietonälkäisiä; ilman vahvoja tietosuojasääntöjä niistä tulee valvontainfrastruktuuria. EU:n tekoälysäädös on askel oikeaan suuntaan, mutta toimeenpanon on oltava sisällöllistä — ei pelkkää laatikoiden ruksimista.',
            ],
            sv: [
                'Jag arbetar med AI-verktyg professionellt som lead developer — jag argumenterar utifrån praktisk erfarenhet, inte teori. AI är vår tids mest betydande produktivitetstransformation, och Finland måste engagera sig med det aktivt och kritiskt.',
                'AI förstärker både förmåga och fördomar. I offentliga tillämpningar — förmånsbeslut, tillståndshantering, prediktiv polisverksamhet — är insatserna för höga för att driftsätta system utan transparens och mänsklig tillsyn. Jag förespråkar förklarliga algoritmer vid konsekventa beslut, öppen källkod där det är möjligt, och obligatorisk mänsklig granskning av beslut som påverkar individers rättigheter.',
                'Ju kraftfullare AI blir, desto viktigare blir integritetsskyddet. AI-system är datahungriga; utan starka dataskyddsregler blir de övervakningsinfrastruktur. EU:s AI-förordning är ett steg i rätt riktning, men genomförandet måste vara substantiellt — inte bara bocka av rutor.',
            ],
        },
        faq: {
            en: [
                {
                    a: 'AI is both a threat and an opportunity. It boosts efficiency and decision-making but can reinforce biases and undermine privacy. Responsible regulation is key.',
                    q: 'Is artificial intelligence a threat or an opportunity?',
                },
                {
                    a: 'Finland can benefit especially in public administration, healthcare, and the green transition. This requires investing in skills and ethical principles.',
                    q: 'How can Finland benefit from artificial intelligence?',
                },
                {
                    a: 'Incrementally, with transparency requirements and human oversight for consequential decisions. Algorithms that affect individual rights — benefits, permits, policing — must be explainable, auditable, and subject to human review. Open-source models should be preferred where feasible.',
                    q: 'How should AI be adopted in the public sector?',
                },
                {
                    a: 'No — and that gap is part of why practical expertise in politics matters. Laws that govern technology are written by people who have often never used the systems they are regulating. Finland needs more decision-makers who understand AI from the inside.',
                    q: 'Does Finland have enough AI expertise in decision-making?',
                },
            ],
            fi: [
                {
                    a: 'Tekoäly on sekä uhka että mahdollisuus. Se tehostaa työtä ja päätöksentekoa, mutta voi vahvistaa ennakkoluuloja ja vaarantaa yksityisyyttä. Vastuullinen sääntely on avainasemassa.',
                    q: 'Onko tekoäly uhka vai mahdollisuus?',
                },
                {
                    a: 'Suomi voi hyötyä tekoälystä julkishallinnon tehostamisessa, terveydenhuollossa ja vihreässä siirtymässä. Edellytyksenä on panostus osaamiseen ja eettisiin periaatteisiin.',
                    q: 'Miten Suomi voi hyötyä tekoälystä?',
                },
                {
                    a: 'Asteittain, läpinäkyvyysvaatimuksin ja inhimillisin valvontamenetelmin merkityksellisiin päätöksiin. Yksilöiden oikeuksiin vaikuttavien algoritmien — etuuksien, lupien, poliisitoiminnan — on oltava selitettäviä, auditoitavia ja inhimilliseen valvontaan alistettuja. Avoimen lähdekoodin malleja tulisi suosia silloin kun se on mahdollista.',
                    q: 'Miten tekoäly tulisi ottaa käyttöön julkisella sektorilla?',
                },
                {
                    a: 'Ei — ja tämä aukko on osa syytä sille, miksi käytännön asiantuntemus politiikassa on tärkeää. Teknologiaa sääntelevät lait kirjoittaa ihmisiä, jotka usein eivät ole koskaan käyttäneet sääntelemiään järjestelmiä. Suomi tarvitsee lisää päätöksentekijöitä, jotka ymmärtävät tekoälyn sisältäpäin.',
                    q: 'Onko Suomessa riittävästi tekoälyosaamista päätöksenteossa?',
                },
            ],
            sv: [
                {
                    a: 'AI är både ett hot och en möjlighet. Det effektiviserar arbete och beslutsfattande men kan förstärka fördomar och äventyra integriteten. Ansvarsfull reglering är avgörande.',
                    q: 'Är AI ett hot eller en möjlighet?',
                },
                {
                    a: 'Finland kan dra nytta av AI inom offentlig förvaltning, hälsovård och den gröna omställningen. Förutsättningen är satsningar på kompetens och etiska principer.',
                    q: 'Hur kan Finland dra nytta av AI?',
                },
                {
                    a: 'Stegvis, med transparenskrav och mänsklig tillsyn för konsekventa beslut. Algoritmer som påverkar individers rättigheter — förmåner, tillstånd, polisverksamhet — måste vara förklarliga, revisionsbara och underkastade mänsklig granskning. Öppen källkod bör prioriteras där det är möjligt.',
                    q: 'Hur bör AI implementeras i offentlig sektor?',
                },
                {
                    a: 'Nej — och det gapet är en del av anledningen till varför praktisk kompetens i politik spelar roll. Lagar som reglerar teknik skrivs av människor som ofta aldrig har använt de system de reglerar. Finland behöver fler beslutsfattare som förstår AI inifrån.',
                    q: 'Har Finland tillräcklig AI-kompetens i beslutsfattandet?',
                },
            ],
        },
        id: 'artificial-intelligence',
        names: { en: 'Artificial intelligence', fi: 'Tekoäly', sv: 'Artificiell intelligens' },
        pageTitle: {
            en: 'Artificial intelli\u00ADgence – policy and ethics',
            fi: 'Tekoäly – politiikka ja vastuu\u00ADllinen käyttö',
            sv: 'Artifi\u00ADciell intel\u00ADligens – politik och etik',
        },
    },
    {
        descriptions: {
            en: 'Council motions and posts about the work and decisions of Kirkkonummi municipal council.',
            fi: 'Valtuustoaloitteita ja kirjoituksia Kirkkonummen valtuuston toiminnasta ja päätöksistä.',
            sv: 'Fullmäktigeinitiativ och texter om Kyrkslätts fullmäk\u00ADtiges verksamhet och beslut.',
        },
        faq: {
            en: [
                {
                    a: 'A council motion (valtuustoaloite) is a formal proposal submitted by one or more councillors, requesting the council or municipal administration to investigate or take action on a specific matter.',
                    q: 'What is a council motion?',
                },
                {
                    a: 'The administration is required to respond to a council motion within a set period. The council then votes on whether to accept, reject, or refer the motion.',
                    q: 'What happens after a council motion is submitted?',
                },
            ],
            fi: [
                {
                    a: 'Valtuustoaloite on yhden tai useamman valtuutetun tekemä muodollinen ehdotus, jossa pyydetään valtuustoa tai kunnanhallintoa selvittämään tai ryhtymään toimiin tietyssä asiassa.',
                    q: 'Mikä on valtuustoaloite?',
                },
                {
                    a: 'Hallinnon on vastattava valtuustoaloitteeseen määräajassa. Valtuusto äänestää sen jälkeen aloitteen hyväksymisestä, hylkäämisestä tai siirtämisestä.',
                    q: 'Mitä tapahtuu valtuustoaloitteen jättämisen jälkeen?',
                },
            ],
            sv: [
                {
                    a: 'Ett fullmäktigeinitiativ är ett formellt förslag från en eller flera fullmäktigeledamöter, där man begär att fullmäktige eller kommunförvaltningen utreder eller vidtar åtgärder i en viss fråga.',
                    q: 'Vad är ett fullmäktigeinitiativ?',
                },
                {
                    a: 'Förvaltningen är skyldig att svara på ett fullmäktigeinitiativ inom en viss tid. Fullmäktige röstar sedan om initiativet ska godkännas, avslås eller vidarebefodras.',
                    q: 'Vad händer efter att ett fullmäktigeinitiativ lämnats in?',
                },
            ],
        },
        id: 'council-motion',
        names: { en: 'Council motion', fi: 'Valtuustoaloite', sv: 'Fullmäktigeinitiativ' },
        pageTitle: {
            en: 'Council motion – Kirkko\u00ADnummi municipal council',
            fi: 'Valtuusto\u00ADaloite – Kirkko\u00ADnummen valtuusto',
            sv: 'Full\u00ADmäktige\u00ADinitiativ – Kyrkslätts fullmäk\u00ADtige',
        },
    },
    {
        descriptions: {
            en: "Posts about early childhood education, daycare, and children's services.",
            fi: 'Kirjoituksia varhaiskasvatuksesta, päiväkodeista ja lasten palveluista.',
            sv: 'Texter om småbarnspedagogik, daghem och barntjänster.',
        },
        faq: {
            en: [
                {
                    a: 'Early childhood education (ECE) covers daycare and preschool for children under school age. In Finland, every child has a subjective right to municipal ECE from birth.',
                    q: 'What is early childhood education?',
                },
                {
                    a: 'Key issues include the ratio of staff to children, group sizes, ECE fees, availability of Swedish-language services, and the quality of the learning environment.',
                    q: 'What are the key issues in early childhood education?',
                },
            ],
            fi: [
                {
                    a: 'Varhaiskasvatus kattaa alle kouluikäisten lasten päiväkodin ja esiopetuksen. Suomessa jokaisella lapsella on subjektiivinen oikeus kunnalliseen varhaiskasvatukseen syntymästään asti.',
                    q: 'Mitä varhaiskasvatus tarkoittaa?',
                },
                {
                    a: 'Keskeisiä kysymyksiä ovat henkilöstömitoitus, ryhmäkoot, varhaiskasvatusmaksut, ruotsinkielisten palvelujen saatavuus ja oppimisympäristön laatu.',
                    q: 'Mitkä ovat varhaiskasvatuksen tärkeimmät kysymykset?',
                },
            ],
            sv: [
                {
                    a: 'Småbarnspedagogik täcker daghem och förskola för barn under skolålder. I Finland har varje barn en subjektiv rätt till kommunal småbarnspedagogik från födseln.',
                    q: 'Vad är småbarnspedagogik?',
                },
                {
                    a: 'Viktiga frågor är personaltäthet, gruppstorlekar, avgifter för småbarnspedagogik, tillgången till svenskspråkiga tjänster och kvaliteten på lärandemiljön.',
                    q: 'Vilka är de viktigaste frågorna inom småbarnspedagogiken?',
                },
            ],
        },
        id: 'early-childhood-education',
        names: { en: 'Early childhood education', fi: 'Varhaiskasvatus', sv: 'Småbarnspedagogik' },
        pageTitle: {
            en: 'Early childhood education – learning and care',
            fi: 'Varhais\u00ADkasvatus – lasten oppiminen ja hoito',
            sv: 'Små\u00ADbarns\u00ADpedagogik – lärande och omsorg',
        },
    },
    {
        descriptions: {
            en: [
                'Privacy is a democratic prerequisite — not a brake on innovation or security. Without protected private space, free thinking and independent action become impossible.',
                'I oppose the expansion of biometric mass registries, such as DNA databases without clear necessity and proportionality. I also oppose the EU Chat Control proposal: mandatory client-side scanning would effectively break end-to-end encryption and turn every device into a surveillance tool. The GDPR is a floor, not a ceiling — public services should exceed its requirements, not just meet them.',
                'Privacy-respecting digital services are not only possible — they build greater citizen trust and adoption. As a software developer, I have built systems where privacy is designed in from the start, not bolted on afterwards. That experience shapes how I think about digital public services.',
            ],
            fi: [
                'Yksityisyydensuoja on demokratian edellytys — ei jarru innovaatiolle tai turvallisuudelle. Ilman suojattua yksityistä tilaa vapaa ajattelu ja itsenäinen toiminta vaikeutuvat.',
                'Vastustan biometristen massarekisterien laajentamista, kuten DNA-rekistereitä ilman selkeää tarvetta ja oikeasuhtaisuutta. Vastustan myös EU:n Chat Control -ehdotusta: pakollinen viestien skannaus asiakkaan laitteella rikkoisi käytännössä päästä päähän -salauksen ja muuttaisi jokaisen laitteen valvontatyökaluksi. GDPR on lattia, ei katto — julkisten palvelujen tulee ylittää sen vaatimukset, ei vain täyttää ne.',
                'Yksityisyyden kunnioittavat digitaaliset palvelut ovat paitsi mahdollisia, myös luottamusta rakentavia. Ohjelmistokehittäjänä olen rakentanut järjestelmiä, joissa yksityisyys on suunniteltu sisään alusta alkaen. Tämä kokemus muovaa tapaani ajatella digitaalisia julkisia palveluja.',
            ],
            sv: [
                'Integritetsskydd är en demokratisk förutsättning — inte en broms för innovation eller säkerhet. Utan ett skyddat privat utrymme försvåras fritt tänkande och självständigt handlande.',
                'Jag motsätter mig utbyggnaden av biometriska massregister, till exempel DNA-databaser utan tydlig nödvändighet och proportionalitet. Jag motsätter mig också EU:s Chat Control-förslag: obligatorisk klientsidig skanning skulle i praktiken bryta end-to-end-kryptering och förvandla varje enhet till ett övervakningsverktyg. GDPR är ett golv, inte ett tak — offentliga tjänster bör överträffa dess krav, inte bara uppfylla dem.',
                'Integritetsvänliga digitala tjänster är inte bara möjliga — de bygger också större medborgarförtroende. Som mjukvaruutvecklare har jag byggt system där integriteten är inbyggd från grunden, inte påklistrad i efterhand. Den erfarenheten formar hur jag tänker kring digitala offentliga tjänster.',
            ],
        },
        faq: {
            en: [
                {
                    a: 'Privacy is a fundamental right that protects people from surveillance, manipulation, and identity theft. Without privacy, free thinking and action become more difficult.',
                    q: 'Why is privacy protection important?',
                },
                {
                    a: 'No. Privacy by design builds citizen trust, which in turn increases adoption of digital services. The two go together — surveillance-based systems erode the trust that makes digitalisation work.',
                    q: 'Is privacy an obstacle to digitalisation?',
                },
                {
                    a: 'I oppose it. The proposal would require all messaging apps to scan every message before it is sent — effectively breaking end-to-end encryption. This is mass surveillance without proportionate benefit, and it creates new security vulnerabilities for everyone.',
                    q: 'What is your position on the EU Chat Control proposal?',
                },
                {
                    a: 'Expanding biometric registries — such as DNA databases beyond narrow criminal justice use — is disproportionate and irreversible. Once biometric data is collected at scale, the chilling effect on free society is permanent. The burden of proof for necessity must be high.',
                    q: 'Why oppose expanding biometric registries?',
                },
            ],
            fi: [
                {
                    a: 'Yksityisyydensuoja on perusoikeus, joka suojaa ihmisiä valvonnalta, manipulaatiolta ja identiteettivarkauksilta. Ilman yksityisyyttä vapaa ajattelu ja toiminta vaikeutuvat.',
                    q: 'Miksi yksityisyydensuoja on tärkeää?',
                },
                {
                    a: 'Ei. Sisäänrakennettu yksityisyydensuoja rakentaa kansalaisten luottamusta, mikä lisää digitaalisten palvelujen käyttöönottoa. Ne kulkevat käsi kädessä — valvontaan perustuvat järjestelmät nakertavat luottamusta, joka on digitalisaation edellytys.',
                    q: 'Onko yksityisyys este digitalisaatiolle?',
                },
                {
                    a: 'Vastustan sitä. Ehdotus velvoittaisi kaikki viestintäsovellukset skannaamaan jokaisen viestin ennen lähettämistä — mikä käytännössä rikkoisi päästä päähän -salauksen. Kyse on massavalvonnasta ilman oikeasuhteista hyötyä, ja se luo uusia tietoturva-aukkoja kaikille.',
                    q: 'Mitä Lauri Lavannin kanta on EU:n Chat Control -ehdotukseen?',
                },
                {
                    a: 'Biometristen rekisterien laajentaminen — kuten DNA-tietokannat rikosoikeudellisen käytön ulkopuolelle — on suhteeton ja peruuttamaton toimenpide. Kun biometrisiä tietoja kerätään laajamittaisesti, seurausvaikutus vapaaseen yhteiskuntaan on pysyvä. Vaatimustaso välttämättömyyden osoittamiselle tulee olla korkea.',
                    q: 'Miksi vastustat biometristen rekisterien laajentamista?',
                },
            ],
            sv: [
                {
                    a: 'Integritetsskydd är en grundläggande rättighet som skyddar människor mot övervakning, manipulation och identitetsstöld. Utan integritet försvåras fritt tänkande och handlande.',
                    q: 'Varför är integritetsskydd viktigt?',
                },
                {
                    a: 'Nej. Integritet by design bygger medborgarförtroende, vilket i sin tur ökar användningen av digitala tjänster. De hör ihop — övervakningsbaserade system urholkar det förtroende som gör digitaliseringen möjlig.',
                    q: 'Är integritet ett hinder för digitalisering?',
                },
                {
                    a: 'Jag motsätter mig det. Förslaget skulle kräva att alla meddelandeappar skannar varje meddelande innan det skickas — vilket i praktiken bryter end-to-end-kryptering. Det är massövervakning utan proportionerlig nytta och skapar nya säkerhetssårbarheter för alla.',
                    q: 'Vad är din ståndpunkt om EU:s Chat Control-förslag?',
                },
                {
                    a: 'Att utvidga biometriska register — till exempel DNA-databaser utanför snäv brottsutredning — är oproportionerligt och oåterkalleligt. När biometriska uppgifter samlas in i stor skala är den avskräckande effekten på ett fritt samhälle permanent. Beviskravet för nödvändighet måste vara högt.',
                    q: 'Varför motsätter du dig utvidgning av biometriska register?',
                },
            ],
        },
        id: 'privacy',
        names: { en: 'Privacy', fi: 'Yksityisyydensuoja', sv: 'Integritetsskydd' },
        pageTitle: {
            en: 'Privacy protection in the digital world',
            fi: 'Yksi\u00ADtyisyyden\u00ADsuoja digitaali\u00ADsessa maailmassa',
            sv: 'Integri\u00ADtets\u00ADskydd i den digitala världen',
        },
    },
    {
        descriptions: {
            en: 'Posts about nature, the environment, and outdoor recreation in Kirkkonummi and the surrounding region.',
            fi: 'Kirjoituksia luonnosta, ympäristöstä ja ulkoilusta Kirkkonummella ja lähialueilla.',
            sv: 'Texter om natur, miljö och friluftsliv i Kyrkslätt och omgivande region.',
        },
        faq: {
            en: [
                {
                    a: 'Kirkkonummi is a coastal municipality with diverse natural environments including archipelago, forests, and shoreline areas such as Lähteelä and Porkkala.',
                    q: 'What natural areas does Kirkkonummi have?',
                },
                {
                    a: 'Yes, Kirkkonummi has acquired coastal recreation areas like Lähteelä to ensure public access to the shoreline even without a private boat.',
                    q: 'Is Kirkkonummi\u2019s coast accessible to everyone?',
                },
            ],
            fi: [
                {
                    a: 'Kirkkonummi on rannikkokunta, jossa on monipuolisia luontoympäristöjä: saaristoa, metsiä ja ranta-alueita kuten Lähteelä ja Porkkala.',
                    q: 'Millaisia luontokohteita Kirkkonummella on?',
                },
                {
                    a: 'Kyllä. Kirkkonummi on hankkinut ranta-alueita kuten Lähteelän, jotta rannikko on kaikkien saavutettavissa myös ilman omaa venettä.',
                    q: 'Onko Kirkkonummen rannikko kaikkien saavutettavissa?',
                },
            ],
            sv: [
                {
                    a: 'Kyrkslätt är en kustkommun med mångsidiga naturmiljöer: skärgård, skogar och strandområden som Lähteelä och Porkkala.',
                    q: 'Vilka naturområden finns det i Kyrkslätt?',
                },
                {
                    a: 'Ja. Kyrkslätt har köpt strandområden som Lähteelä för att säkerställa att kusten är tillgänglig för alla, även utan egen båt.',
                    q: 'Är Kyrksländets kust tillgänglig för alla?',
                },
            ],
        },
        id: 'nature',
        names: { en: 'Nature', fi: 'Luonto', sv: 'Natur' },
        pageTitle: {
            en: 'Nature and the envir\u00ADon\u00ADment in Kirkko\u00ADnummi',
            fi: 'Luonto ja ympä\u00ADristö Kirkko\u00ADnummella',
            sv: 'Natur och miljö i Kyrkslätt',
        },
    },
]

export function getTagName(id: string, lang: 'en' | 'fi' | 'sv' = 'fi'): string | undefined {
    return tags.find((t) => t.id === id)?.names[lang]
}
