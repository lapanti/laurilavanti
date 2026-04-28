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
            en: 'Posts about digital independence – open source, data sovereignty, and reducing technology dependency.',
            fi: 'Kirjoituksia digitaalisesta itsenäisyydestä – avoimesta lähdekoodista, datasuvereniteetistä ja teknologiariippuvuuden vähentämisestä.',
            sv: 'Texter om digital självständighet – öppen källkod, datasuveränitet och minskat teknikberoende.',
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
            en: 'Posts on the opportunities, risks, and politics of digitalisation. How is technology reshaping society?',
            fi: 'Kirjoituksia digitalisaation mahdollisuuksista, riskeistä ja politiikasta. Miten teknologia muuttaa yhteiskuntaa?',
            sv: 'Texter om digitaliseringens möjligheter, risker och politik. Hur förändrar teknologin samhället?',
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
            en: 'Posts about education, schools, and education policy.',
            fi: 'Kirjoituksia opetuksesta, kouluista ja koulutuspolitiikasta.',
            sv: 'Texter om utbildning, skolor och utbildningspolitik.',
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
            en: 'Posts about technology, its role in society, and technology policy.',
            fi: 'Kirjoituksia teknologiasta, sen yhteiskunnallisesta roolista ja teknologiapolitiikasta.',
            sv: 'Texter om teknologi, dess samhällsroll och teknologipolitik.',
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
            en: 'Posts about artificial intelligence, its opportunities and risks, and AI policy.',
            fi: 'Kirjoituksia tekoälystä, sen mahdollisuuksista ja riskeistä sekä tekoälypolitiikasta.',
            sv: 'Texter om artificiell intelligens, möjligheter och risker samt AI-politik.',
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
            en: 'Posts about privacy protection, data protection, and personal data in digital society.',
            fi: 'Kirjoituksia yksityisyydensuojasta, tietosuojasta ja henkilötietojen käsittelystä digitaalisessa yhteiskunnassa.',
            sv: 'Texter om integritetsskydd, dataskydd och behandling av personuppgifter i det digitala samhället.',
        },
        faq: {
            en: [
                {
                    a: 'Privacy is a fundamental right that protects people from surveillance, manipulation, and identity theft. Without privacy, free thinking and action become more difficult.',
                    q: 'Why is privacy protection important?',
                },
                {
                    a: 'You can protect your privacy by using strong passwords, two-factor authentication, encrypted messaging apps, and avoiding sharing unnecessary personal information.',
                    q: 'How can I protect my privacy online?',
                },
            ],
            fi: [
                {
                    a: 'Yksityisyydensuoja on perusoikeus, joka suojaa ihmisiä valvonnalta, manipulaatiolta ja identiteettivarkauksilta. Ilman yksityisyyttä vapaa ajattelu ja toiminta vaikeutuvat.',
                    q: 'Miksi yksityisyydensuoja on tärkeää?',
                },
                {
                    a: 'Voit suojata yksityisyyttäsi käyttämällä vahvoja salasanoja, kaksivaiheista tunnistautumista, salattuja viestintäsovelluksia ja välttämällä tarpeettoman tiedon jakamista.',
                    q: 'Miten voin suojata yksityisyyttäni verkossa?',
                },
            ],
            sv: [
                {
                    a: 'Integritetsskydd är en grundläggande rättighet som skyddar människor mot övervakning, manipulation och identitetsstöld. Utan integritet försvåras fritt tänkande och handlande.',
                    q: 'Varför är integritetsskydd viktigt?',
                },
                {
                    a: 'Du kan skydda din integritet genom att använda starka lösenord, tvåfaktorsautentisering, krypterade kommunikationsappar och undvika att dela onödig information.',
                    q: 'Hur kan jag skydda min integritet online?',
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
