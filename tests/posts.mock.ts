import type { ImageDataLike } from 'gatsby-plugin-image'
import type { ContentfulPost, ContentfulPostExcerpt } from '../src/types/contentful'

import { mainImage, mainImageDescription } from './images.mock'

const aluevaalitTag = {
    contentful_id: 'aluevaalit',
}

const kirkkonummiTag = {
    contentful_id: 'kirkkonummi',
}

const soteuudistusTag = {
    contentful_id: 'soteuudistus',
}

const perusturvaTag = {
    contentful_id: 'perusturva',
}

const varhaiskasvatusTag = {
    contentful_id: 'varhaiskasvatus',
}

const opetusTag = {
    contentful_id: 'opetus',
}

const kaavoitusTag = {
    contentful_id: 'kaavoitus',
}

const headerImage = {
    localFile: mainImage,
    description: mainImageDescription,
}

const aluevaaliTags = [aluevaalitTag, kirkkonummiTag, soteuudistusTag]

const varhaiskasvatusTags = [kirkkonummiTag, varhaiskasvatusTag]

export const healthBelongsToAll: ContentfulPost & ContentfulPostExcerpt = {
    headerImage,
    mobileHeaderImage: headerImage,
    createdAt: '18.06.2022',
    metadata: {
        tags: aluevaaliTags,
    },
    publishDate: null,
    body: {
        raw: '{"data":{},"content":[{"data":{},"content":[{"data":{},"marks":[],"value":"Yksi käytännön asia mistä tulevat aluevaltuustot päättävät, on ","nodeType":"text"},{"data":{"uri":"https://stm.fi/asiakasmaksulain-uudistus"},"content":[{"data":{},"marks":[],"value":"sote-palveluiden asiakasmaksut","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". Yleensä asiakasmaksuja käytetäänkin talouden sopeuttamiseen, sillä sitä kautta saadaan helposti lisää tuloja palvelun järjestäjälle. Ne ovat kuitenkin myös eriarvoistavia ja nostavat pitkässä juoksussa menoja.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Maksut eivät yleensä julkisella puolella ole kovin suuria, jos niitä vertaa yksityiseen terveydenhuoltoon. Esimerkiksi ","nodeType":"text"},{"data":{"uri":"https://stm.fi/terveydenhuollon-maksut"},"content":[{"data":{},"marks":[],"value":"lääkärikäynti saa julkisella maksaa enintään noin 20 euroa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", kun taas yksityisellä lääkärikäynnin hinta ","nodeType":"text"},{"data":{"uri":"https://www.pihlajalinna.fi/yleista/hinnastot/laakareiden-vastaanottojen-hinnasto"},"content":[{"data":{},"marks":[],"value":"alkaa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" helposti ","nodeType":"text"},{"data":{"uri":"https://www.mehilainen.fi/tietoa-asiakkaalle/hinnastot"},"content":[{"data":{},"marks":[],"value":"50","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":"-[","nodeType":"text"},{"data":{"uri":"https://www.terveystalo.com/fi/Palvelut/Hinnasto/"},"content":[{"data":{},"marks":[],"value":"70","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" eurosta. Palvelumaksuissa pitää kuitenkin ottaa huomioon se, että erityisen paljon ","nodeType":"text"},{"data":{"uri":"https://www.hs.fi/politiikka/art-2000008493046.html"},"content":[{"data":{},"marks":[],"value":"julkisia sote-palveluja käyttävät ne, jotka ovat taloudellisesti heikoimmassa asemassa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". Esimerkiksi ","nodeType":"text"},{"data":{"uri":"https://www.is.fi/taloussanomat/art-2000008520346.html"},"content":[{"data":{},"marks":[],"value":"meillä Länsi-Uudellamaalla asuu yli 40 000 pienituloista","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". Jokainen käynti, joka jää väliin taloudellisista syistä, johtaa pahimmillaan huomattavasti kalliimpaan erikoissairaanhoidon tarpeeseen. Lisäksi jokaiseen maksuun sisältyy oikeus oikaisuvaatimukseen, joita sitten Perusturvajaostossa käsittelemme usean hengen voimin.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Poistamalla sosiaali- ja terveydenhuollon asiakasmaksut, säästämme byrokratiassa. Lisäksi pääsemme hoitamaan ongelmia ennen kuin niistä tulee merkittäviä. Ja tärkeimpänä varmistamme, ettei kukaan jää ilman hoitoa taloudellisista syistä.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Pidetään huolta meistä kaikista!","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[{"type":"italic"}],"value":"Julkaistu Kirkkonummen Sanomissa 20.1.2022.","nodeType":"text"}],"nodeType":"paragraph"}],"nodeType":"document"}',
        references: [],
    },
    title: 'Terveys kuuluu kaikille',
    updatedAt: '2022-06-19T17:43:34.855Z',
    publishedOld: null,
    published: '2022-06-18T19:38:42.822Z',
    slug: 'terveys-kuuluu-kaikille',
    excerpt:
        'Poistamalla sosiaali- ja terveydenhuollon asiakasmaksut, säästämme byrokratiassa. Lisäksi pääsemme hoitamaan ongelmia ennen kuin niistä tulee merkittäviä. Ja tärkeimpänä varmistamme, ettei kukaan jää ilman hoitoa taloudellisista syistä.',
}

export const soteIsBedrock: ContentfulPost & ContentfulPostExcerpt = {
    ...healthBelongsToAll,
    publishDate: '20.12.2021',
    body: {
        raw: '{"data":{},"content":[{"data":{},"content":[{"data":{},"marks":[],"value":"Sosiaali- ja terveydenhuolto on kallista. Siitä ei pääse yli eikä ympäri. Mutta jos meillä ei ole hyvin toimivaa sosiaali- ja terveydenhuoltoa, voimmeko enää kutsua maatamme hyvinvointivaltioksi?","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Usein julkisuudessa puhutaan talouden sopeuttamisesta, korkeasta velkaantumisasteesta ja julkisten instituutioiden menoista. Mutta entä kolikon kääntöpuoli? Jo ennen koronaa meillä oli ","nodeType":"text"},{"data":{"uri":"https://yle.fi/aihe/t/18-328952"},"content":[{"data":{},"marks":[],"value":"pulaa hoitajista","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" ja ","nodeType":"text"},{"data":{"uri":"https://www.is.fi/kotimaa/art-2000006278379.html"},"content":[{"data":{},"marks":[],"value":"lääkäreistä","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", ja tilanne on siitä vain pahentunut. Tukitoimintoja on karsittu ja ","nodeType":"text"},{"data":{"uri":"https://www.hs.fi/paakirjoitukset/art-2000008439006.html"},"content":[{"data":{},"marks":[],"value":"lääkärit tekevät hallinnollisia töitä","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". Sairaanhoitajille maksetaan liian ","nodeType":"text"},{"data":{"uri":"https://www.iltalehti.fi/tyoelama/a/7c881fab-b5d2-4bc6-b7e8-3b446f74116b"},"content":[{"data":{},"marks":[],"value":"matalaa palkkaa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" työn vaativuuteen ja koulutustasoon nähden. ","nodeType":"text"},{"data":{"uri":"https://yle.fi/uutiset/3-11605429"},"content":[{"data":{},"marks":[],"value":"Hoitovelka kasvaa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" päivä päivältä, kun ","nodeType":"text"},{"data":{"uri":"https://yle.fi/uutiset/3-12205139"},"content":[{"data":{},"marks":[],"value":"teho-osastot ovat täynnä koronapotilaita","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" ja hoitajia joudutaan siirtämään akuutissa tarpeessa pois omilta osastoiltaan. ","nodeType":"text"},{"data":{"uri":"https://yle.fi/uutiset/3-11286438"},"content":[{"data":{},"marks":[],"value":"Mielenterveysongelmat yleistyvät","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" ja ovat ","nodeType":"text"},{"data":{"uri":"https://www.etk.fi/ajankohtaista/mielenterveyden-sairaudet-yleisin-tyokyvyttomyyselakkeelle-siirtymisen-syy/"},"content":[{"data":{},"marks":[],"value":"yleisin syy työkyvyttömyyseläkkeelle siirtymiseen","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". ","nodeType":"text"},{"data":{"uri":"https://yle.fi/uutiset/3-10823854"},"content":[{"data":{},"marks":[],"value":"Sosiaalityöntekijöiden asiakasmäärät kasvavat","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". Nuoret syrjäytyvät ja voivat pahoin. Onko meillä varaa olla korjaamatta näitä ongelmia?","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Panostamalla hoitohenkilökuntaan ja lääkäreihin varmistamme sen, että apua saa jatkossakin. Tarjoamalla mielenterveyspalveluita saamme kiinni ongelmista kun niistä voi vielä selviytyä. Huolehtimalla sosiaalityöntekijöiden riittävyydestä, varmistamme, että lasten oikeus turvalliseen kasvuympäristöön toteutuu mahdollisimman hyvin. Ennaltaehkäisemällä vakavampia ongelmia, säästämme pitkällä aikavälillä rahaa, aikaa ja vaivaa kaikilta. Poistamalla asiakasmaksut, pidämme huolta myös heikoimmassa asemassa olevista ennen kuin heille tulee vakavampia ongelmia. Tarjoamalla kattavia sosiaalipalveluita pidämme myös huolen erityisryhmistä ja heidän läheisistään. Kaikella tällä estämme syrjäytymistä ja pysymme pidempään työkykyisinä.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Tietenkin sosiaali- ja terveydenhuollossa pitää myös saada rahalle mahdollisimman paljon vastinetta. Halvinta ja tehokkainta olisikin ennaltaehkäisevät toimet. Mittasuhteita antaa se, että ","nodeType":"text"},{"data":{"uri":"https://www.kuntaliitto.fi/sosiaali-ja-terveysasiat/tilastot…n-sosiaali-ja-terveydenhuollon-nettokustannukset-euroaasukas"},"content":[{"data":{},"marks":[],"value":"vuonna 2020 Uudellamaalla käytettiin 1 176 euroa erikoissairaanhoitoon per asukas ja 562 euroa perusterveydenhuoltoon per asukas","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". Malliesimerkki tehokkaasta ennaltaehkäisystä on maksuton ehkäisy nuorille. Esimerkiksi Vantaalla se on tutkitusti ","nodeType":"text"},{"data":{"uri":"https://bmjopen.bmj.com/content/11/2/e043092"},"content":[{"data":{},"marks":[],"value":"vähentänyt ei-toivottuja raskauksia","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" ","nodeType":"text"},{"data":{"uri":"https://terveysportti.mobi/xmedia/duo/duo15044.pdf#2"},"content":[{"data":{},"marks":[],"value":"15-19-vuotiailla 36% ja 20-24-vuotiailla 19%","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". Toinen hyvä ja ajankohtainen esimerkki on rokotukset. Esimerikiksi ","nodeType":"text"},{"data":{"uri":"https://www.iltalehti.fi/koronavirus/a/24f02847-25ad-466e-a160-709e51be80e7"},"content":[{"data":{},"marks":[],"value":"2 annoksen sarja koronarokotetta maksaa enintään 29,4 euroa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" ja ","nodeType":"text"},{"data":{"uri":"https://www.iltalehti.fi/kotimaa/a/a5ac42f4-d753-4d24-abaf-a14967e3422b"},"content":[{"data":{},"marks":[],"value":"tehohoito koronapotilaalle maksaa keskimäärin 33 000 euroa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":".","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Sosiaali- ja terveydenhuolto ei ole pelkkä menoerä, vaan sijoitus tulevaisuuteemme. Jokainen järkevästi käytetty euro soteen on askel kohti hyvinvoivaa väestöä. Soten kustannusten kasvua ei hillitä palveluita leikkaamalla, vaan oikeiden palveluiden tarjoamisella oikeaan aikaan.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Tasapainotetaanko taloutta vai korjataanko hyvinvointiyhteiskunta?","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[{"type":"italic"}],"value":"Julkaistu Kirkkonummen Sanomissa 16.12.2021 ja Länsiväylässä 5.1.2022.","nodeType":"text"}],"nodeType":"paragraph"}],"nodeType":"document"}',
        references: [],
    },
    title: 'Sote on hyvinvointiyhteiskunnan kulmakivi',
    updatedAt: '2022-06-19T17:43:24.741Z',
    publishedOld: '2021-12-20',
    published: '2022-06-18T19:35:56.215Z',
    excerpt:
        'Sosiaali- ja terveydenhuolto on kallista. Siitä ei pääse yli eikä ympäri. Mutta jos meillä ei ole hyvin toimivaa sosiaali- ja terveydenhuoltoa, voimmeko enää kutsua maatamme hyvinvointivaltioksi?',
    slug: 'blogi/2021/12/20/sote-on-hyvinvointiyhteiskunnan-kulmakivi',
}

export const whatIfNoHealthCareCenter: ContentfulPost & ContentfulPostExcerpt = {
    ...healthBelongsToAll,
    publishDate: '15.11.2021',
    body: {
        raw: '{"data":{},"content":[{"data":{},"content":[{"data":{},"marks":[],"value":"Mitä jos Jorvin ensiapu olisi koko läntisen Uudenmaan ainoa päivystys? Mitä jos Jorvissa pitäisi aina jonottaa monta tuntia? Entä jos siitä tulisi jälkikäteen lasku, jossa olisi pari nollaa enemmän kuin nykyään? Mitä jos hoitohenkilökunnalla olisi vieläkin huonompi olla ja muuta henkilöstöä, kuten siivoojia, ei olisikaan? Mitä jos hoitohenkilökunta ei ehdi paikalle, vaikka painaisit kutsunappia? Äärimmäisen epätodennäköistä, mutta kuitenkin mahdollista ","nodeType":"text"},{"data":{"uri":"https://soteuudistus.fi/uudistus-lyhyesti-"},"content":[{"data":{},"marks":[],"value":"vuodesta 2023 alkaen","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", kun sosiaali- ja terveydenhuolto siirtyy hyvinvointialueiden järjestettäväksi.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Useimmille päivystys on ensimmäinen kosketus sairauden tai vamman hoitoon. Mitä aiemmin oikeaa hoitoa saa, sen paremmin se tehoaa. Parhaassa tapauksessa matalan kynnyksen hoitoon pääsyllä vältytään myös ikävämmiltä ja kalliimmilta toimenpiteiltä. Kun lapsella nousee kuume, on itse tapaturmassa tai tulee todella paha olo, on yleensä suuntana lähin terveyskeskus.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Eli mitä jos se lähin terveyskeskus olisikin siinä lähellä? Jos näkisit nettisivuilta paljonko nyt on ruuhkaa, eikä siellä koskaan tarvitsisi jonottaa pariakymmentä minuuttia pidempään? Ja jälkikäteen ei tulisi laskua lainkaan? Entä jos hoitohenkilökunnalla olisi hyvä olla, ja heidän ei tarvitsisi tehdä muita kuin hoitotöitä? Kuulostaako hyvältä? Eikä se ole mahdotonta.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Kun ","nodeType":"text"},{"data":{"uri":"https://vaalit.fi/aluevaalit"},"content":[{"data":{},"marks":[],"value":"tammikuussa valitaan uudelle hyvinvointialueelle aluevaltuusto","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", lähtee koko sote-alan suuri rakenneuudistus tosissaan liikkeelle. Silloin meistä jokainen pääsee vaikuttamaan siihen, millaista tulevaisuuden hyvinvointi Länsi-Uudellamaalla on. Vaikka koko uudistus tuntuukin kovin byrokraattiselta ja omasta elämästä irralliselta, on kyseessä äärimmäisen tärkeät vaalit, sillä vaaleissa valitut aluevaltuutetut pääsevät suunnittelemaan koko sosiaali- ja terveydenhuollon sekä pelastustoimen alueellamme juuri sellaiseksi kuin he haluavat.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Sinä päätät, tehdäänkö aluevaltuustossa leikkauksia vai investointeja.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Mitä jos terveyskeskuksemme olisivat Suomen parhaita?","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[{"type":"italic"}],"value":"Julkaistu Kirkkonummen Sanomissa 14.11.2021.","nodeType":"text"}],"nodeType":"paragraph"}],"nodeType":"document"}',
        references: [],
    },
    headerImage: {
        localFile: {
            childImageSharp: {
                gatsbyImageData: {
                    images: {
                        sources: [
                            {
                                srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/qrduG3vyJn1jzNdMISfJU/63cea405f75edca0c1890d65bc372cf5/sosiaali-ja-terveyskeskus.jpg?w=1008&h=432&q=50&fm=webp 1008w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/qrduG3vyJn1jzNdMISfJU/63cea405f75edca0c1890d65bc372cf5/sosiaali-ja-terveyskeskus.jpg?w=2016&h=864&q=50&fm=webp 2016w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/qrduG3vyJn1jzNdMISfJU/63cea405f75edca0c1890d65bc372cf5/sosiaali-ja-terveyskeskus.jpg?w=4000&h=1714&q=50&fm=webp 4000w',
                                sizes: '(min-width: 4032px) 4032px, 100vw',
                                type: 'image/webp',
                            },
                        ],
                        fallback: {
                            src: 'https://images.ctfassets.net/44t6u1r4zgqq/qrduG3vyJn1jzNdMISfJU/63cea405f75edca0c1890d65bc372cf5/sosiaali-ja-terveyskeskus.jpg?w=1008&h=432&fl=progressive&q=50&fm=jpg',
                            srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/qrduG3vyJn1jzNdMISfJU/63cea405f75edca0c1890d65bc372cf5/sosiaali-ja-terveyskeskus.jpg?w=1008&h=432&fl=progressive&q=50&fm=jpg 1008w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/qrduG3vyJn1jzNdMISfJU/63cea405f75edca0c1890d65bc372cf5/sosiaali-ja-terveyskeskus.jpg?w=2016&h=864&fl=progressive&q=50&fm=jpg 2016w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/qrduG3vyJn1jzNdMISfJU/63cea405f75edca0c1890d65bc372cf5/sosiaali-ja-terveyskeskus.jpg?w=4000&h=1714&fl=progressive&q=50&fm=jpg 4000w',
                            sizes: '(min-width: 4032px) 4032px, 100vw',
                        },
                    },
                    layout: 'constrained',
                    width: 4032,
                    height: 1728,
                    placeholder: {
                        fallback:
                            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAJABQDAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAwEE/8QAJBAAAgECBgEFAAAAAAAAAAAAAQIDABIEESExMjPBdIGhseH/xAAYAQADAQEAAAAAAAAAAAAAAAACAwQAAf/EAB4RAAICAgIDAAAAAAAAAAAAAAABAgMEMREyISJB/9oADAMBAAIRAxEAPwATJC1xRlaK3YqR806eU3piq8b415AWFI4zFBZGgkYW68tM/FSycXstgrEnwBGMUoYPNEDnsoP5XPQJq42tzFTy7iAH7JPUN9JT5bH19WTHd/t5NYFn/9k=',
                    },
                },
            },
        } as unknown as ImageDataLike,
        description: 'Kuva tiekyltistä, jossa lukee Sosiaali- ja terveyskeskus, sekä sama ruotsiksi alapuolella.',
    },
    mobileHeaderImage: {
        localFile: {
            childImageSharp: {
                gatsbyImageData: {
                    layout: 'constrained',
                    placeholder: {
                        fallback:
                            'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMC/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIDAP/aAAwDAQACEAMQAAABnOucTBKVmBJgX//EAB0QAAEEAgMAAAAAAAAAAAAAAAIAAQMREhMhMjT/2gAIAQEAAQUCOPJow1OuMmojoU3YPTa//8QAGBEAAwEBAAAAAAAAAAAAAAAAAAECECL/2gAIAQMBAT8BUuTsWf/EABoRAAICAwAAAAAAAAAAAAAAAAACARARIjH/2gAIAQIBAT8BlsmovK//xAAbEAADAAMBAQAAAAAAAAAAAAAAARECEDEhgf/aAAgBAQAGPwLsMvbVNRDxhwQ/uv/EACAQAAICAQMFAAAAAAAAAAAAAAABEUEhMWHRcZGhseH/2gAIAQEAAT8hu69PpnTSKcmN/HI8MDrTBMFG9FRNXshU5lZo9vUTQf/aAAwDAQACAAMAAAAQwNh9/8QAGREAAwADAAAAAAAAAAAAAAAAAAERITHw/9oACAEDAQE/EFmEd0M6U//EABYRAQEBAAAAAAAAAAAAAAAAAAERIP/aAAgBAgEBPxAnVwP/xAAdEAEAAwEAAgMAAAAAAAAAAAABABExIUFRcbHw/9oACAEBAAE/EBEAXtlX1kB2CNApaR7AK+H5h322jQEvnICtd9UxmeagK9f1krYsCJx2JNofenrPM//Z',
                    },
                    images: {
                        fallback: {
                            src: '/static/aaf0eb28b01d8691152f60fa8fa38218/4227f/sosiaali-ja-terveyskeskus.jpg',
                            srcSet: '/static/aaf0eb28b01d8691152f60fa8fa38218/9e7cd/sosiaali-ja-terveyskeskus.jpg 432w,\n/static/aaf0eb28b01d8691152f60fa8fa38218/ead50/sosiaali-ja-terveyskeskus.jpg 864w,\n/static/aaf0eb28b01d8691152f60fa8fa38218/4227f/sosiaali-ja-terveyskeskus.jpg 1728w',
                            sizes: '(min-width: 1728px) 1728px, 100vw',
                        },
                        sources: [
                            {
                                srcSet: '/static/aaf0eb28b01d8691152f60fa8fa38218/18bed/sosiaali-ja-terveyskeskus.webp 432w,\n/static/aaf0eb28b01d8691152f60fa8fa38218/d0f84/sosiaali-ja-terveyskeskus.webp 864w,\n/static/aaf0eb28b01d8691152f60fa8fa38218/ca0c6/sosiaali-ja-terveyskeskus.webp 1728w',
                                type: 'image/webp',
                                sizes: '(min-width: 1728px) 1728px, 100vw',
                            },
                        ],
                    },
                    width: 1728,
                    height: 1728,
                },
            },
        } as unknown as ImageDataLike,
        description: 'Kuva tiekyltistä, jossa lukee Sosiaali- ja terveyskeskus, sekä sama ruotsiksi alapuolella.',
    },
    title: 'Mitä jos terveyskeskusta ei olisikaan?',
    updatedAt: '2022-06-19T17:43:13.288Z',
    publishedOld: '2021-11-15',
    published: '2022-06-18T19:31:41.569Z',
    excerpt:
        'Mitä jos Jorvin ensiapu olisi koko läntisen Uudenmaan ainoa päivystys? Mitä jos Jorvissa pitäisi aina jonottaa monta tuntia? Entä jos siitä tulisi jälkikäteen lasku, jossa olisi pari nollaa enemmän kuin nykyään?',
    slug: 'blogi/2021/11/15/mita-jos-terveyskeskusta-ei-olisikaan',
}

export const perusturvajaostoWhatIs: ContentfulPost & ContentfulPostExcerpt = {
    ...healthBelongsToAll,
    publishDate: '30.10.2021',
    body: {
        raw: '{"data":{},"content":[{"data":{},"content":[{"data":{},"marks":[],"value":"Keskiviikkona 27.10. osallistuin ensimmäistä kertaa ","nodeType":"text"},{"data":{"uri":"https://www.kirkkonummi.fi/perusturvajaosto"},"content":[{"data":{},"marks":[],"value":"perusturvajaoston","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" kokoukseen. Toisin kuin kunnan lautakunnissa, ei perusturvajaoston esityslistoja tai pöytäkirjoja jaeta, sillä kokouksissa käsitellään yksittäisten ihmisten asioista. Tämän takia kaikki eivät välttämättä tiedä mitä perusturvajaosto tekee.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Käytännössä kun asukas (eli sinä) tekee oikaisuvaatimuksen jostain perusturvaan kuuluvasta kunnan päätöksestä, esimerkiksi kuljetuspalveluista tai kotihoidon maksuista, tulee oikaisuvaatimuksen hyväksyminen tai hylkääminen perusturvajaoston päätettäväksi. Mikäli oikaisuvaatimusta ei laita, ei muutosta päätökseenkään tule. Ensin palvelusta vastaava viranomainen, esimerkiksi perusturvajohtaja, kerää vaatimukseen liittyvät materiaalit ja lakipykälät ja esittää sitten jaostolle vaatimuksen hyväksymistä tai hylkäämistä. Perusturvajaostossa sitten luemme materiaalit läpi, katsomme mitä laki ja kunnan säännöt asiasta sanovat ja teemme päätöksemme sen mukaisesti. Yksi kokous puolestaan sisältää mahdollisesti useamman tällaisen tapauksen, eikä niissä muita asioita käsitellä.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Jokainen päätös ei tunnu välttämättä inhimilliseltä, mutta kunnan säännöissä ja lakipykälissä on rajat pitänyt vetää johonkin, eikä perusturvajaosto niistä voi aina poiketa. Kuitenkin jokaisesta tapauksesta voidaan jotain oppia, ja esimerkiksi perusturvalautakuntaan voidaan välittää tietoa siitä, että jokin kunnan säännöistä vaatisi päivittämistä. Välillä kunnan säännöistä kuitenkin kannattaa poiketa, sillä tukemalla apua tarvitsevia, voimme tuottaa inhimillisempää ja joskus myös kustannustehokkaampaa perusturvaa. Tämä on samalla myös hyvä katsaus siihen, mitä ihmiset ihan oikeasti tarvitsevat, mutta eivät välttämättä nykyisellään saa. Aion myös hyödyntää kaikkea tässä oppimaani aluevaltuustossa, mikäli minut sinne valitaan.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Sillä välin kuitenkin, pidetään toisistamme huolta, ja muistetaan antaa tukea sinne, missä sitä eniten tarvitaan!","nodeType":"text"}],"nodeType":"paragraph"}],"nodeType":"document"}',
        references: [],
    },
    headerImage: {
        localFile: {
            childImageSharp: {
                gatsbyImageData: {
                    images: {
                        sources: [
                            {
                                srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/16g8SHm3OAgir1bD93gsrt/7cc1ba58581d8399d0ba452d35e167f2/lauri-lavanti-perusturvajaosto.jpg?w=816&h=350&q=50&fm=webp 816w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/16g8SHm3OAgir1bD93gsrt/7cc1ba58581d8399d0ba452d35e167f2/lauri-lavanti-perusturvajaosto.jpg?w=1632&h=700&q=50&fm=webp 1632w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/16g8SHm3OAgir1bD93gsrt/7cc1ba58581d8399d0ba452d35e167f2/lauri-lavanti-perusturvajaosto.jpg?w=3264&h=1399&q=50&fm=webp 3264w',
                                sizes: '(min-width: 3264px) 3264px, 100vw',
                                type: 'image/webp',
                            },
                        ],
                        fallback: {
                            src: 'https://images.ctfassets.net/44t6u1r4zgqq/16g8SHm3OAgir1bD93gsrt/7cc1ba58581d8399d0ba452d35e167f2/lauri-lavanti-perusturvajaosto.jpg?w=3264&h=1399&fl=progressive&q=50&fm=jpg',
                            srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/16g8SHm3OAgir1bD93gsrt/7cc1ba58581d8399d0ba452d35e167f2/lauri-lavanti-perusturvajaosto.jpg?w=816&h=350&fl=progressive&q=50&fm=jpg 816w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/16g8SHm3OAgir1bD93gsrt/7cc1ba58581d8399d0ba452d35e167f2/lauri-lavanti-perusturvajaosto.jpg?w=1632&h=700&fl=progressive&q=50&fm=jpg 1632w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/16g8SHm3OAgir1bD93gsrt/7cc1ba58581d8399d0ba452d35e167f2/lauri-lavanti-perusturvajaosto.jpg?w=3264&h=1399&fl=progressive&q=50&fm=jpg 3264w',
                            sizes: '(min-width: 3264px) 3264px, 100vw',
                        },
                    },
                    layout: 'constrained',
                    width: 3264,
                    height: 1399,
                    placeholder: {
                        fallback:
                            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAJABQDAREAAhEBAxEB/8QAFwABAAMAAAAAAAAAAAAAAAAAAwECBP/EACMQAAEDAwIHAAAAAAAAAAAAAAIAAQMEERIiMSEzNHGCsbL/xAAXAQADAQAAAAAAAAAAAAAAAAABAgMA/8QAHREAAgICAwEAAAAAAAAAAAAAAAECEQMxEiEyM//aAAwDAQACEQMRAD8AOemoXac3PI3fUe+D27pJbKQkuNiyxjPHiTRmFuGlvdllYOmiAKSGMYgPEAawtZnsye2TaRkpuRU+fyhLYuL5sSl6YUWLi8l33WKH/9k=',
                    },
                },
            },
        } as unknown as ImageDataLike,
        description: 'Kuva Lauri Lavannista Kirkkonummen kunnantalon edessä.',
    },
    mobileHeaderImage: {
        localFile: {
            childImageSharp: {
                gatsbyImageData: {
                    layout: 'constrained',
                    placeholder: {
                        fallback:
                            'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAIDBAH/xAAXAQEBAQEAAAAAAAAAAAAAAAACAQAD/9oADAMBAAIQAxAAAAHN3bWXMY5ZlNQvD//EABoQAQADAQEBAAAAAAAAAAAAAAEAAgMSESL/2gAIAQEAAQUCrlLZ8vpOxG55MT61qciz/8QAGBEAAgMAAAAAAAAAAAAAAAAAABARQUL/2gAIAQMBAT8BpZJP/8QAFREBAQAAAAAAAAAAAAAAAAAAEEH/2gAIAQIBAT8BKf/EABwQAAICAgMAAAAAAAAAAAAAAAARASECECIyof/aAAgBAQAGPwLlKKlnT0qGXWsh6//EABwQAQACAwADAAAAAAAAAAAAAAEAESExQVFhcf/aAAgBAQABPyFlcG6PcqO6vkKclfMhFVF3NREsxLOPcQRyW9sEUM//2gAMAwEAAgADAAAAEBA/Qv/EABkRAAMAAwAAAAAAAAAAAAAAAAABETFRsf/aAAgBAwEBPxBPIiFyVs//xAAYEQACAwAAAAAAAAAAAAAAAAAAARAhMf/aAAgBAgEBPxB6WOH/xAAdEAEAAwABBQAAAAAAAAAAAAABABEhYTFBcaHB/9oACAEBAAE/EMDXprV8jMzFdlLAgIFKW+4LIMRBVQDDtTd2XAWg08wdigArZqwlUtePEBpA5n//2Q==',
                    },
                    images: {
                        fallback: {
                            src: '/static/9191e5858402a1213443faa945425bd8/c1041/lauri-lavanti-perusturvajaosto.jpg',
                            srcSet: '/static/9191e5858402a1213443faa945425bd8/7ba70/lauri-lavanti-perusturvajaosto.jpg 350w,\n/static/9191e5858402a1213443faa945425bd8/9366f/lauri-lavanti-perusturvajaosto.jpg 700w,\n/static/9191e5858402a1213443faa945425bd8/c1041/lauri-lavanti-perusturvajaosto.jpg 1399w',
                            sizes: '(min-width: 1399px) 1399px, 100vw',
                        },
                        sources: [
                            {
                                srcSet: '/static/9191e5858402a1213443faa945425bd8/6cac9/lauri-lavanti-perusturvajaosto.webp 350w,\n/static/9191e5858402a1213443faa945425bd8/ec00d/lauri-lavanti-perusturvajaosto.webp 700w,\n/static/9191e5858402a1213443faa945425bd8/c688d/lauri-lavanti-perusturvajaosto.webp 1399w',
                                type: 'image/webp',
                                sizes: '(min-width: 1399px) 1399px, 100vw',
                            },
                        ],
                    },
                    width: 1399,
                    height: 1399,
                },
            },
        } as unknown as ImageDataLike,
        description: 'Kuva Lauri Lavannista Kirkkonummen kunnantalon edessä.',
    },
    metadata: {
        tags: [kirkkonummiTag, perusturvaTag],
    },
    title: 'Perusturvajaosto - mikä se on?',
    updatedAt: '2022-06-19T17:43:02.368Z',
    publishedOld: '2021-10-30',
    published: '2022-06-18T19:29:26.366Z',
    excerpt:
        'Perusturvajaosto vastaa asukkaiden oikaisuvaatimuksiin perusturvaan liittyvissä asioissa. Vaikka kokousten sisältö on yksityisyydensuojan alaista, voi näistä tapauksista ottaa opiksi.',
    slug: 'blogi/2021/10/31/perusturvajaosto-mika-se-on',
}

export const runningForAluevaalit: ContentfulPost & ContentfulPostExcerpt = {
    ...healthBelongsToAll,
    publishDate: '27.09.2021',
    body: {
        raw: '{"data":{},"content":[{"data":{},"content":[{"data":{},"marks":[],"value":"Taas vaalit. Vaikka kuntavaaleista on vasta vähän aikaa, alkavat nyt aluevaalit eli ","nodeType":"text"},{"data":{"uri":"https://soteuudistus.fi/etusivu"},"content":[{"data":{},"marks":[],"value":"sosiaali- ja terveydenhuollon uudistuksen","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" seurauksena määriteltyjen uusien hyvinvointialueiden valtuustojen vaalit. Vaikka juuri äsken pidettiinkin kuntavaalit, ja hyvinvointialueiden merkitys on osalle vielä hämärän peitossa, on kyse erittäin tärkeistä vaaleista. Sote-uudistuksen jälkeen hyvinvointialueet päättävät muun muassa ","nodeType":"text"},{"data":{"uri":"https://soteuudistus.fi/mika-sote-uudistus-"},"content":[{"data":{},"marks":[],"value":"terveyskeskuksista, sairaaloista, hammashoidosta, neuvoloista, lastensuojelusta, kotihoidosta ja pelastustoimista","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", eli todella isosta osasta meidän jokaisen elämää.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Kirkkonummi kuuluu jatkossa ","nodeType":"text"},{"data":{"uri":"https://www.espoo.fi/fi/lansi-uudenmaan-hyvinvointialue"},"content":[{"data":{},"marks":[],"value":"Länsi-Uudenmaan hyvinvointialueeseen","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" Espoon, Hangon, Inkoon, Kauniaisten, Lohjan, Raaseporin, Siuntion, Karkkilan ja Vihdin kanssa, joten päätin lähteä ehdolle tekemään tästä alueesta meille kaikille Hangosta Espooseen ja Karkkilaan hyvän ja toimivan, unohtamatta tietenkään meitä Kirkkonummelaisia.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Itselleni on tärkeä huolehtia, että sote-uudistuksenkin jälkeen lähipalvelut, kuten terveysasemat ja neuvolat, säilyvät asukkaiden lähellä, eikä palveluita lähdetä tehostamisen varjolla holtittomasti yksityistämään. Äärimmäisen tärkeää on myös huolehtia hoitohenkilökunnan hyvinvoinnista ja riittävyydestä, eikä nykyiseen ","nodeType":"text"},{"data":{"uri":"https://www.iltalehti.fi/kotimaa/a/26627b62-a148-4e8c-ab92-5b262cc6f36f"},"content":[{"data":{},"marks":[],"value":"hoitajapulaan","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" ja ","nodeType":"text"},{"data":{"uri":"https://yle.fi/uutiset/3-11605429"},"content":[{"data":{},"marks":[],"value":"hoitovelkaan","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" voida reagoida pelkästään taloutta sopeuttamalla.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Pidetään siis lähipalvelut lähellä ja huolehditaan toisistamme!","nodeType":"text"}],"nodeType":"paragraph"}],"nodeType":"document"}',
        references: [],
    },
    headerImage: {
        localFile: {
            childImageSharp: {
                gatsbyImageData: {
                    images: {
                        sources: [
                            {
                                srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/7j3kCI9UbuoXfXKoGdhLnp/b8569a0f8335bdf5827b174db091569f/Lauri-Lavanti-aluevaaliehdokas-16-9.jpg?w=671&h=377&q=50&fm=webp 671w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/7j3kCI9UbuoXfXKoGdhLnp/b8569a0f8335bdf5827b174db091569f/Lauri-Lavanti-aluevaaliehdokas-16-9.jpg?w=1342&h=755&q=50&fm=webp 1342w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/7j3kCI9UbuoXfXKoGdhLnp/b8569a0f8335bdf5827b174db091569f/Lauri-Lavanti-aluevaaliehdokas-16-9.jpg?w=2683&h=1509&q=50&fm=webp 2683w',
                                sizes: '(min-width: 2683px) 2683px, 100vw',
                                type: 'image/webp',
                            },
                        ],
                        fallback: {
                            src: 'https://images.ctfassets.net/44t6u1r4zgqq/7j3kCI9UbuoXfXKoGdhLnp/b8569a0f8335bdf5827b174db091569f/Lauri-Lavanti-aluevaaliehdokas-16-9.jpg?w=2683&h=1509&fl=progressive&q=50&fm=jpg',
                            srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/7j3kCI9UbuoXfXKoGdhLnp/b8569a0f8335bdf5827b174db091569f/Lauri-Lavanti-aluevaaliehdokas-16-9.jpg?w=671&h=377&fl=progressive&q=50&fm=jpg 671w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/7j3kCI9UbuoXfXKoGdhLnp/b8569a0f8335bdf5827b174db091569f/Lauri-Lavanti-aluevaaliehdokas-16-9.jpg?w=1342&h=755&fl=progressive&q=50&fm=jpg 1342w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/7j3kCI9UbuoXfXKoGdhLnp/b8569a0f8335bdf5827b174db091569f/Lauri-Lavanti-aluevaaliehdokas-16-9.jpg?w=2683&h=1509&fl=progressive&q=50&fm=jpg 2683w',
                            sizes: '(min-width: 2683px) 2683px, 100vw',
                        },
                    },
                    layout: 'constrained',
                    width: 2683,
                    height: 1509,
                    placeholder: {
                        fallback:
                            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAALABQDAREAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAQQFA//EACMQAAEDBAIBBQAAAAAAAAAAAAECAxEABAUSITFRE0GRksH/xAAYAQEBAQEBAAAAAAAAAAAAAAABAwIEBf/EAB4RAAICAQUBAAAAAAAAAAAAAAABAhEDBBMUMUNR/9oADAMBAAIRAxEAPwCZhsjd2FsGH7JxxG07cykfFMM6iqRGeNSdjrueHqI0tyJkans+D1WnqJVaBYI0FvM3JTJxwJ8hyPyjlBsL6JoWsrSkqMGvOSLWYHnMtT7QB9VVfyNLoolRHANc4H//2Q==',
                    },
                },
            },
        } as unknown as ImageDataLike,
        description: 'Kuva Lauri Lavannista pellon edustalla. Taaempana taustalla on metsää.',
    },
    mobileHeaderImage: {
        localFile: {
            childImageSharp: {
                gatsbyImageData: {
                    layout: 'constrained',
                    placeholder: {
                        fallback:
                            'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMEBQH/xAAXAQADAQAAAAAAAAAAAAAAAAABAgMA/9oADAMBAAIQAxAAAAG1Hl8M9VmF01Ym9sIf/8QAGhABAQEBAAMAAAAAAAAAAAAAAQIAAxExMv/aAAgBAQABBQIZddEjcGObOfMzBTJunuPj/8QAGBEAAgMAAAAAAAAAAAAAAAAAAAECEBL/2gAIAQMBAT8BUEYV/wD/xAAZEQACAwEAAAAAAAAAAAAAAAAAAhAREzH/2gAIAQIBAT8B0s1YXsf/xAAbEAACAgMBAAAAAAAAAAAAAAAAAREhIDFhcf/aAAgBAQAGPwKmiaZsqMJ4Lw//xAAdEAADAAICAwAAAAAAAAAAAAAAAREhMUGBUXGR/9oACAEBAAE/IUNa7G9HDijCNTau1GmcrnwTXicVmapu8MRZ6x//2gAMAwEAAgADAAAAEH/3Qv/EABYRAQEBAAAAAAAAAAAAAAAAABABEf/aAAgBAwEBPxDQEP/EABkRAQACAwAAAAAAAAAAAAAAAAEAECExQf/aAAgBAgEBPxAeBEHlTuf/xAAeEAEBAQEAAgIDAAAAAAAAAAABESEAMUFRYXGRwf/aAAgBAQABPxCEBZ+XxzGSVBss7XFLhebVdNrjDUgDTwzftP1wrWrpsueu3LzZ2rWtHofngCWfw7//2Q==',
                    },
                    images: {
                        fallback: {
                            src: '/static/21b2876e43d499dadd58d90d69279f91/5e0f8/Lauri-Lavanti-aluevaaliehdokas-16-9.jpg',
                            srcSet: '/static/21b2876e43d499dadd58d90d69279f91/3c15e/Lauri-Lavanti-aluevaaliehdokas-16-9.jpg 377w,\n/static/21b2876e43d499dadd58d90d69279f91/3fcac/Lauri-Lavanti-aluevaaliehdokas-16-9.jpg 755w,\n/static/21b2876e43d499dadd58d90d69279f91/5e0f8/Lauri-Lavanti-aluevaaliehdokas-16-9.jpg 1509w',
                            sizes: '(min-width: 1509px) 1509px, 100vw',
                        },
                        sources: [
                            {
                                srcSet: '/static/21b2876e43d499dadd58d90d69279f91/e6df8/Lauri-Lavanti-aluevaaliehdokas-16-9.webp 377w,\n/static/21b2876e43d499dadd58d90d69279f91/9a8b1/Lauri-Lavanti-aluevaaliehdokas-16-9.webp 755w,\n/static/21b2876e43d499dadd58d90d69279f91/d1461/Lauri-Lavanti-aluevaaliehdokas-16-9.webp 1509w',
                                type: 'image/webp',
                                sizes: '(min-width: 1509px) 1509px, 100vw',
                            },
                        ],
                    },
                    width: 1509,
                    height: 1509,
                },
            },
        } as unknown as ImageDataLike,
        description: 'Kuva Lauri Lavannista pellon edustalla. Taaempana taustalla on metsää.',
    },
    title: 'Ehdolle aluevaaleihin',
    updatedAt: '2022-06-19T17:42:50.201Z',
    publishedOld: '2021-09-27',
    published: '2022-06-18T19:27:52.214Z',
    excerpt:
        'Sote-uudituksessa tärkeintä on huolehtia lähipalvelujen säilymisestä lähellä, terveydenhuollon pitäminen julkisena palveluna, hoitohenkilökunnan hyvinvoinnista ja riittävyydestä sekä ratkaista hoitajapula ja hoitovelka.',
    slug: 'ehdolle-aluevaaleihin',
}

export const daycareNeedsTeachers: ContentfulPost & ContentfulPostExcerpt = {
    ...healthBelongsToAll,
    publishDate: '07.06.2021',
    body: {
        raw: '{"data":{},"content":[{"data":{},"content":[{"data":{},"marks":[],"value":"Tällä hetkellä ","nodeType":"text"},{"data":{"uri":"https://www.kuntarekry.fi/fi/tyopaikat/?&professioncat=38788&organisation=9&lang=fi_FI,sv_SE&desc=varhaiskasvatuksen%20opettaja&sort=%22-changetime%22&limit=24&display=grid"},"content":[{"data":{},"marks":[],"value":"Kirkkonummella","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", kuten ","nodeType":"text"},{"data":{"uri":"https://www.uef.fi/fi/artikkeli/varhaiskasvatuksen-opettajapulaa-helpotetaan-monimuotokoulutuksella"},"content":[{"data":{},"marks":[],"value":"koko maassa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", on ","nodeType":"text"},{"data":{"uri":"https://www.iltalehti.fi/politiikka/a/d0c06ae8-d132-4b35-aebe-8256b6046bec"},"content":[{"data":{},"marks":[],"value":"pula varhaiskasvatuksen opettajista","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". Vuoteen 2030 mennessä tämä pula tulee vielä pahenemaan, kun varhaiskasvatuksen kiintiötä muutetaan siten, että päiväkotien hoitohenkilöstöstä ","nodeType":"text"},{"data":{"uri":"https://www.finlex.fi/fi/laki/alkup/2018/20180540#Pidp447740832"},"content":[{"data":{},"marks":[],"value":"kahdella kolmasosalla","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" pitää olla varhaiskasvatuksen opettajan tai sosionomin kelpoisuus. Pula on muodostunut niin pahaksi, että kunnat ovat alkaneet kilpailla jopa palkkatasolla. ","nodeType":"text"},{"data":{"uri":"https://www.kuntarekry.fi/fi/tyopaikat/varhaiskasvatuksen-opettaja-365327/"},"content":[{"data":{},"marks":[],"value":"Esimerkiksi","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" ","nodeType":"text"},{"data":{"uri":"https://www.kuntarekry.fi/fi/tyopaikat/varhaiskasvatuksen-opettaja-364669/"},"content":[{"data":{},"marks":[],"value":"meillä","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" ","nodeType":"text"},{"data":{"uri":"https://www.kuntarekry.fi/fi/tyopaikat/varhaiskasvatuksen-opettaja-laajakallion-paivakoti-352003/"},"content":[{"data":{},"marks":[],"value":"Kirkkonummella","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" ","nodeType":"text"},{"data":{"uri":"https://www.kuntarekry.fi/fi/tyopaikat/varhaiskasvatuksen-opettaja-364299/"},"content":[{"data":{},"marks":[],"value":"tarjotaan","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" ","nodeType":"text"},{"data":{"uri":"https://www.kt.fi/sopimukset/kvtes/2020-2021/liite-5-varhaiskasvatuksen-henkilosto-koulun-peruspalvelutehtavat"},"content":[{"data":{},"marks":[],"value":"työehtosopimusta","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" ","nodeType":"text"},{"data":{"uri":"https://www.kuntarekry.fi/fi/tyopaikat/varhaiskasvatuksen-opettaja-360689/"},"content":[{"data":{},"marks":[],"value":"korkeampaa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" palkkaa. Kirjoitushetkellä Kirkkonummella on ","nodeType":"text"},{"data":{"uri":"https://www.kuntarekry.fi/fi/tyopaikat/?profession=38816&organisation=9&lang=fi_FI%2Csv_SE&desc=varhaiskasvatuksen+opettaja&sort=%22-changetime%22&limit=24&display=grid"},"content":[{"data":{},"marks":[],"value":"viisi varhaiskasvatuksen opettajan paikkaa auki","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". ","nodeType":"text"},{"data":{"target":{"sys":{"id":"55DEJPnoQSfP3jJzD7jDSJ","type":"Link","linkType":"Entry"}}},"content":[{"data":{},"marks":[],"value":"Helmikuussa kunnalla oli kuusi paikkaa avoinna","nodeType":"text"}],"nodeType":"entry-hyperlink"},{"data":{},"marks":[],"value":". Koko Uudellamaalla kunnat ja kaupungit hakevat ","nodeType":"text"},{"data":{"uri":"https://www.kuntarekry.fi/fi/tyopaikat/?region=39494&profession=38816&lang=fi_FI%2Csv_SE%2Cen_US&desc=varhaiskasvatuksen+opettaja&sort=%22-publish_from%22&limit=24&display=grid"},"content":[{"data":{},"marks":[],"value":"yli 100 varhaiskasvatuksen opettajaa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". Ilman uusien varhaiskasvatuksen opettajien palkkaamista, ei kuntaan voida avata lisää päivähoitopaikkoja väestön kasvaessa.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Mitä jos Kirkkonummella jo töissä olevilta varhaiskasvatuksen opettajilta kysyttäisiin, miten kunta voisi oikeasti olla parempi työnantaja ja päiväkoti parempi työpaikka? Vaikka laki ja varhaiskasvatussuunnitelma asettavat vaatimuksia sille, mitä päiväkodissa pitää tehdä, pystyy kunta työnantajana kuitenkin vaikuttamaan suuresti siihen, millaiset puitteet päiväkodissa on, ja millaiset mahdollisuudet opettajilla on työnsä toteuttamiseen. Työtä tekevät myös tietävät parhaiten mitä he tarvitsevat työssään.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Tässä olisi Kirkkonummelle selvä kilpailuetu muihin kuntiin ja kaupunkeihin verrattuna, kun yritetään palkata tarvittavia varhaiskasvatuksen opettajia. Antamalla opettajien aidosti vaikuttaa työhönsä ja työympäristöönsä, erotumme eduksemme työmarkkinoilla, parannamme nykyisten työntekijöiden viihtyvyyttä ja samalla myös työn laatu paranee, sillä ","nodeType":"text"},{"data":{"uri":"https://www.ttl.fi/perehdytys-tyohyvinvointiin-tyoterveyteen-ja-tyoturvallisuuteen/tyohyvinvointi-yhteinen-asia/"},"content":[{"data":{},"marks":[],"value":"hyvinvoivat työntekijät myös panostavat työhönsä","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" enemmän. Kun meillä on motivoitunut varhaiskasvatuksen henkilöstö, saavat lapsemme entistä laadukkaampaa varhaiskasvatusta.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Pidetään Kirkkonummi lapsille ja lapsiperheille ystävällisenä kuntana ja huolehditaan varhaiskasvatuksen henkilökunnasta!","nodeType":"text"}],"nodeType":"paragraph"}],"nodeType":"document"}',
        references: [
            {
                __typename: 'ContentfulPost',
                contentful_id: '55DEJPnoQSfP3jJzD7jDSJ',
                slug: 'kirkkonummi-lisa-on-sinunkin-etusi',
            },
        ],
    },
    headerImage: {
        localFile: {
            childImageSharp: {
                gatsbyImageData: {
                    images: {
                        sources: [
                            {
                                srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/46akHTASPFPtMtfdXs8D6v/75f6ee1d7398da08e63785b534dcaed5/Muumimaailmassa.jpg?w=756&h=358&q=50&fm=webp 756w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/46akHTASPFPtMtfdXs8D6v/75f6ee1d7398da08e63785b534dcaed5/Muumimaailmassa.jpg?w=1512&h=716&q=50&fm=webp 1512w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/46akHTASPFPtMtfdXs8D6v/75f6ee1d7398da08e63785b534dcaed5/Muumimaailmassa.jpg?w=3024&h=1432&q=50&fm=webp 3024w',
                                sizes: '(min-width: 3024px) 3024px, 100vw',
                                type: 'image/webp',
                            },
                        ],
                        fallback: {
                            src: 'https://images.ctfassets.net/44t6u1r4zgqq/46akHTASPFPtMtfdXs8D6v/75f6ee1d7398da08e63785b534dcaed5/Muumimaailmassa.jpg?w=3024&h=1432&fl=progressive&q=50&fm=jpg',
                            srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/46akHTASPFPtMtfdXs8D6v/75f6ee1d7398da08e63785b534dcaed5/Muumimaailmassa.jpg?w=756&h=358&fl=progressive&q=50&fm=jpg 756w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/46akHTASPFPtMtfdXs8D6v/75f6ee1d7398da08e63785b534dcaed5/Muumimaailmassa.jpg?w=1512&h=716&fl=progressive&q=50&fm=jpg 1512w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/46akHTASPFPtMtfdXs8D6v/75f6ee1d7398da08e63785b534dcaed5/Muumimaailmassa.jpg?w=3024&h=1432&fl=progressive&q=50&fm=jpg 3024w',
                            sizes: '(min-width: 3024px) 3024px, 100vw',
                        },
                    },
                    layout: 'constrained',
                    width: 3024,
                    height: 1432,
                    placeholder: {
                        fallback:
                            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAEAsMDgwKEA4NDhIREBMYKBoYFhYYMSMlHSg6Mz08OTM4N0BIXE5ARFdFNzhQbVFXX2JnaGc+TXF5cGR4XGVnY//bAEMBERISGBUYLxoaL2NCOEJjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY//AABEIAAkAFAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAEAAEG/8QAJxAAAQMCAgsBAAAAAAAAAAAAAQACAwQRBTESMjQ1QUJhcnOBscH/xAAVAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8AO+z26rCRlpcESldiT43RQOe5hFjGDldKGXsfVsu8ajyFFIRwrE+anN+ql1sGyw9v6VKTj//Z',
                    },
                },
            },
        } as unknown as ImageDataLike,
        description: 'Kuva Lauri Lavannista leikkimässä tyttärensä kanssa Muumimaailmassa.',
    },
    mobileHeaderImage: {
        localFile: {
            childImageSharp: {
                gatsbyImageData: {
                    layout: 'constrained',
                    placeholder: {
                        fallback:
                            'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAIDBAX/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEAMQAAABprszR0GMaYihZ//EABwQAAICAgMAAAAAAAAAAAAAAAECAAMREgQTIf/aAAgBAQABBQLUCLa1ZTkeFYFnU0Ay1i4s2M//xAAWEQADAAAAAAAAAAAAAAAAAAAAEBH/2gAIAQMBAT8BI//EABYRAAMAAAAAAAAAAAAAAAAAAAAQEf/aAAgBAgEBPwEr/8QAGRABAQADAQAAAAAAAAAAAAAAAAERITFh/9oACAEBAAY/Amq2teuIuHX/xAAbEAEAAgMBAQAAAAAAAAAAAAABABEhMUFRgf/aAAgBAQABPyFEpj7DGrzkr7twk61LitrEOahWNQ3YZ0QHqf/aAAwDAQACAAMAAAAQjAA9/8QAFxEAAwEAAAAAAAAAAAAAAAAAARARQf/aAAgBAwEBPxCUJi//xAAZEQACAwEAAAAAAAAAAAAAAAAAEQEQMUH/2gAIAQIBAT8QnWMdr//EAB8QAQADAAIBBQAAAAAAAAAAAAEAESExUWFBgZGh0f/aAAgBAQABPxDfuC1CqnJvuirqWu7Tdc/cfTjJ6ZBFZemPiBOF7QT2kE70/YkjXFAfBBKCPDP/2Q==',
                    },
                    images: {
                        fallback: {
                            src: '/static/dba123474668752335b4536b7dd70bd9/23613/Muumimaailmassa.jpg',
                            srcSet: '/static/dba123474668752335b4536b7dd70bd9/85264/Muumimaailmassa.jpg 358w,\n/static/dba123474668752335b4536b7dd70bd9/66af3/Muumimaailmassa.jpg 716w,\n/static/dba123474668752335b4536b7dd70bd9/23613/Muumimaailmassa.jpg 1432w',
                            sizes: '(min-width: 1432px) 1432px, 100vw',
                        },
                        sources: [
                            {
                                srcSet: '/static/dba123474668752335b4536b7dd70bd9/3acea/Muumimaailmassa.webp 358w,\n/static/dba123474668752335b4536b7dd70bd9/e5338/Muumimaailmassa.webp 716w,\n/static/dba123474668752335b4536b7dd70bd9/cb8fb/Muumimaailmassa.webp 1432w',
                                type: 'image/webp',
                                sizes: '(min-width: 1432px) 1432px, 100vw',
                            },
                        ],
                    },
                    width: 1432,
                    height: 1432,
                },
            },
        } as unknown as ImageDataLike,
        description: 'Kuva Lauri Lavannista leikkimässä tyttärensä kanssa Muumimaailmassa.',
    },
    metadata: {
        tags: varhaiskasvatusTags,
    },
    title: 'Päiväkodit kaipaavat opettajia',
    updatedAt: '2022-06-19T17:42:36.295Z',
    publishedOld: '2021-06-07',
    published: '2022-06-18T19:24:49.702Z',
    excerpt:
        'Päiväkodeissa on huutava pula varhaiskasvatuksen opettajista. Kirkkonummella olisi nyt mahdollisuus rakentaa uudenlaista työympäristöä ja tehdä siitä valttikortti uusien opettajien palkkaamiseen sekä nykyisten viihtymiseen!',
    slug: 'paivakodit-kaipaavat-opettajia',
}

export const wellPlannedIsWellDoneBut: ContentfulPost & ContentfulPostExcerpt = {
    ...healthBelongsToAll,
    publishDate: '24.05.2021',
    body: {
        raw: '{"data":{},"content":[{"data":{},"content":[{"data":{},"marks":[],"value":"Gesterbyn koulukeskus on ollut nykyisen hankkeen muodossa erilaisissa selvitys- ja suunnitteluvaiheissa ","nodeType":"text"},{"data":{"uri":"http://kirkkonummi.oncloudos.com/cgi/DREQUEST.PHP?page=meetingitem&id=2021805-5"},"content":[{"data":{},"marks":[],"value":"jo 6 vuotta","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". Vuonna 2017 palvelutuotannon jaostossa on todettu, että koulukeskuksen B, C, D ja E-rakennukset pitää purkaa ja A-rakennus todettiin purkukuntoiseksi vuonna 2018. Parakit ovat toimineet koulukeskuksen väistötiloina ","nodeType":"text"},{"data":{"uri":"https://www.viisykkonen.fi/uutiset/kouluty%c3%b6-alkoi-loman-j%c3%a4lkeen-%e2%80%9dparakissa%e2%80%9d-%e2%80%93-gesterbyn-koulukeskuksen-v%c3%a4ist%c3%b6tiloista-voi-tulla"},"content":[{"data":{},"marks":[],"value":"vuodesta 2017","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". Hintaa näille parakeille kertyy ","nodeType":"text"},{"data":{"uri":"https://www.viisykkonen.fi/uutiset/gesterbyn-kouluparakit-j%C3%A4%C3%A4v%C3%A4t-pystyyn-pitk%C3%A4lle-ensi-vuosikymmenelle-%E2%88%92-v%C3%A4ist%C3%B6tilojen"},"content":[{"data":{},"marks":[],"value":"noin 0,5 miljoonaa euroa vuodessa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", eli tähän mennessä niiden kustannus liikkuu jo miljoonissa, eikä uuden koulun rakentamista ole vielä edes hyväksytty kunnanhallituksessa. Kunnan arvio on, että uuden Gesterbyn koulukeskuksen sekä Porkkalan lukion ja Kyrkslätts gymnasiumin yhteisen kampuksen ","nodeType":"text"},{"data":{"uri":"https://www.viisykkonen.fi/uutiset/koulujen-v%C3%A4ist%C3%B6tilat-johtavat-ketjureaktioon-%E2%80%93-masalassa-uusi-paikka-parakille-tai"},"content":[{"data":{},"marks":[],"value":"rakentaminen kestää 4-5 vuotta","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". ","nodeType":"text"},{"data":{"uri":"https://arkisto.epaper.fi/kirkkonummensanomat/lehdet/6613/torstai-1352021"},"content":[{"data":{},"marks":[],"value":"Kunnanhallitus palautti 10.5.2021","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" jälleen hankesuunnitelman riittämättömien selvityksien perusteella takaisin suunnittelupöydälle.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Palautuksien perustelut eivät kuitenkaan vakuuta, eivätkä auta koulujen oppilaita tai henkilökuntaa, puhumattakaan kunnan houkuttelevuudesta asuinpaikkana. Jokainen vuosi, jona uusien rakennusten rakentamista ei ole aloitettu, maksaa kunnalle erittäin paljon. Myös väestön kasvuun varmasti vaikuttaa se, onko kunnassa lapsille turvalliset ja terveelliset koulut.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{"target":{"sys":{"id":"3U3GBuOeUwedsXLCVVuJ1j","type":"Link","linkType":"Entry"}}},"content":[],"nodeType":"embedded-entry-block"},{"data":{},"content":[{"data":{},"marks":[],"value":"Tilojen omistajana ja henkilökunnan työnantajana on kunnalla myös velvollisuus järjestää riittävät ja terveelliset tilat oppilaille ja henkilökunnalle. Mitenköhän asiaan suhtauduttaisiin, jos kyse olisikin yrityksestä, joka suunnittelee uusia toimistotiloja vuositolkulla?","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Monet kunnanhallituksen jäsenet ovat kirjoitelleet Kirkkonummen Sanomiin siitä, että Gesterbyn koulukeskus pitää rakentaa tai että muitakin kouluja on jonossa, eikä niitä saa unohtaa. Kuitenkin edellinen koulukeskus-hankkeen palauttaminen valmisteluun oli kiinni yhdestä äänestä. Jos yksikin kunnanhallituksen jäsen lisää äänestäisi koulukeskuksen puolesta, saataisiin se eteenpäin. Mitä jos ryhdyttäisiin sanoista tekoihin ja hyväksyttäisiin uuden koulukeskuksen rakentaminen?","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Pidetään Kirkkonummi lapsille ja lapsiperheille ystävällisenä kuntana ja huolehditaan koulujen terveydestä!","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[{"type":"italic"}],"value":"Julkaistu Kirkkonummen Sanomissa 20.5.2021.","nodeType":"text"}],"nodeType":"paragraph"}],"nodeType":"document"}',
        references: [
            {
                __typename: 'ContentfulImageWithCaption',
                contentful_id: '3U3GBuOeUwedsXLCVVuJ1j',
                caption: 'Gesterbyn koulukeskuksen parakkirakennuksia',
                altText: 'Gesterbyn koulukeskuksen parakkirakennuksia',
                image: {
                    localFile: {
                        childImageSharp: {
                            gatsbyImageData: {
                                images: {
                                    sources: [
                                        {
                                            srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/5twD2bw03nDep0j2qI4fJ4/846007152f2be0de8c5850ea7cd550c8/gesterbyn-parakit-w.jpg?w=455&h=195&q=50&fm=webp 455w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/5twD2bw03nDep0j2qI4fJ4/846007152f2be0de8c5850ea7cd550c8/gesterbyn-parakit-w.jpg?w=910&h=390&q=50&fm=webp 910w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/5twD2bw03nDep0j2qI4fJ4/846007152f2be0de8c5850ea7cd550c8/gesterbyn-parakit-w.jpg?w=1820&h=780&q=50&fm=webp 1820w',
                                            sizes: '(min-width: 1820px) 1820px, 100vw',
                                            type: 'image/webp',
                                        },
                                    ],
                                    fallback: {
                                        src: 'https://images.ctfassets.net/44t6u1r4zgqq/5twD2bw03nDep0j2qI4fJ4/846007152f2be0de8c5850ea7cd550c8/gesterbyn-parakit-w.jpg?w=1820&h=780&fl=progressive&q=50&fm=jpg',
                                        srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/5twD2bw03nDep0j2qI4fJ4/846007152f2be0de8c5850ea7cd550c8/gesterbyn-parakit-w.jpg?w=455&h=195&fl=progressive&q=50&fm=jpg 455w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/5twD2bw03nDep0j2qI4fJ4/846007152f2be0de8c5850ea7cd550c8/gesterbyn-parakit-w.jpg?w=910&h=390&fl=progressive&q=50&fm=jpg 910w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/5twD2bw03nDep0j2qI4fJ4/846007152f2be0de8c5850ea7cd550c8/gesterbyn-parakit-w.jpg?w=1820&h=780&fl=progressive&q=50&fm=jpg 1820w',
                                        sizes: '(min-width: 1820px) 1820px, 100vw',
                                    },
                                },
                                layout: 'constrained',
                                width: 1820,
                                height: 780,
                                placeholder: {
                                    fallback:
                                        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAlgCWAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAJABQDAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQMG/8QAIhAAAQMDAwUAAAAAAAAAAAAAAQIDEQAEBRIxkRQhQVGh/8QAFwEBAQEBAAAAAAAAAAAAAAAAAQACA//EABcRAQEBAQAAAAAAAAAAAAAAAAABERL/2gAMAwEAAhEDEQA/AE0ZtGknpbiRsCkd+DWu5WeaOvb+4v21Sl1CIMN6Snn3VpyhE47KPy42l3SSYh4J+UbDjSeK5uib21QSRtQn/9k=',
                                },
                            },
                        },
                    } as unknown as ImageDataLike,
                    description: 'Kuva Gesterbyn koulun parakeista.',
                },
            },
        ],
    },
    headerImage: {
        localFile: {
            childImageSharp: {
                gatsbyImageData: {
                    images: {
                        sources: [
                            {
                                srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/114A93jFbHVwdAv2ohXDHm/df793360b7a914840593921606705640/winellska-skolan-w.jpg?w=455&h=195&q=50&fm=webp 455w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/114A93jFbHVwdAv2ohXDHm/df793360b7a914840593921606705640/winellska-skolan-w.jpg?w=910&h=390&q=50&fm=webp 910w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/114A93jFbHVwdAv2ohXDHm/df793360b7a914840593921606705640/winellska-skolan-w.jpg?w=1820&h=780&q=50&fm=webp 1820w',
                                sizes: '(min-width: 1820px) 1820px, 100vw',
                                type: 'image/webp',
                            },
                        ],
                        fallback: {
                            src: 'https://images.ctfassets.net/44t6u1r4zgqq/114A93jFbHVwdAv2ohXDHm/df793360b7a914840593921606705640/winellska-skolan-w.jpg?w=1820&h=780&fl=progressive&q=50&fm=jpg',
                            srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/114A93jFbHVwdAv2ohXDHm/df793360b7a914840593921606705640/winellska-skolan-w.jpg?w=455&h=195&fl=progressive&q=50&fm=jpg 455w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/114A93jFbHVwdAv2ohXDHm/df793360b7a914840593921606705640/winellska-skolan-w.jpg?w=910&h=390&fl=progressive&q=50&fm=jpg 910w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/114A93jFbHVwdAv2ohXDHm/df793360b7a914840593921606705640/winellska-skolan-w.jpg?w=1820&h=780&fl=progressive&q=50&fm=jpg 1820w',
                            sizes: '(min-width: 1820px) 1820px, 100vw',
                        },
                    },
                    layout: 'constrained',
                    width: 1820,
                    height: 780,
                    placeholder: {
                        fallback:
                            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAlgCWAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAJABQDAREAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAQIFA//EACEQAAEDBAIDAQAAAAAAAAAAAAECAxEABAUxEkEyUYHB/8QAFgEBAQEAAAAAAAAAAAAAAAAAAQIA/8QAGBEBAQEBAQAAAAAAAAAAAAAAAAESIQL/2gAMAwEAAhEDEQA/AJuKvLrHuTaOkpVtEKIMH1HcUdir1VVlMvccjzUyDoBo9/K2qMw6MpdNyHg8tRO0NmNAflVui+YLPgKhbYVmKaC//9k=',
                    },
                },
            },
        } as unknown as ImageDataLike,
        description: 'Kuva Winellska skolanista.',
    },
    mobileHeaderImage: {
        localFile: {
            childImageSharp: {
                gatsbyImageData: {
                    layout: 'constrained',
                    placeholder: {
                        fallback:
                            'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAEEBQID/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhADEAAAAbHnT7jQZqrsksA//8QAHRAAAQMFAQAAAAAAAAAAAAAAAQIRIQAEEhMUIP/aAAgBAQABBQLrRRu43oYPk0keP//EABYRAQEBAAAAAAAAAAAAAAAAABEAEP/aAAgBAwEBPwEjf//EABYRAQEBAAAAAAAAAAAAAAAAABEAEP/aAAgBAgEBPwFnf//EABsQAAICAwEAAAAAAAAAAAAAAAACATEgIZEy/9oACAEBAAY/Aqk0pB5cp+FNzD//xAAdEAEBAAICAwEAAAAAAAAAAAABEQAhMUEQUWGB/9oACAEBAAE/IWDKda5ylvfuFBdpZh9A9hoxG7SThh3T/gyvn//aAAwDAQACAAMAAAAQnPhB/8QAFhEBAQEAAAAAAAAAAAAAAAAAEQAQ/9oACAEDAQE/EDHf/8QAFhEBAQEAAAAAAAAAAAAAAAAAEQAQ/9oACAECAQE/EFPf/8QAGxABAQEBAQADAAAAAAAAAAAAAREhAEExYcH/2gAIAQEAAT8Q3DCnhwg1Olw3lNyoCz65zcIx0mweXQDRalunJy4Sn5ut8vedXv/Z',
                    },
                    images: {
                        fallback: {
                            src: '/static/89330cf9554dd6ac44855a98153a4daf/73156/winellska-skolan-w.jpg',
                            srcSet: '/static/89330cf9554dd6ac44855a98153a4daf/77423/winellska-skolan-w.jpg 195w,\n/static/89330cf9554dd6ac44855a98153a4daf/bb640/winellska-skolan-w.jpg 390w,\n/static/89330cf9554dd6ac44855a98153a4daf/73156/winellska-skolan-w.jpg 780w',
                            sizes: '(min-width: 780px) 780px, 100vw',
                        },
                        sources: [
                            {
                                srcSet: '/static/89330cf9554dd6ac44855a98153a4daf/fd1d9/winellska-skolan-w.webp 195w,\n/static/89330cf9554dd6ac44855a98153a4daf/e5835/winellska-skolan-w.webp 390w,\n/static/89330cf9554dd6ac44855a98153a4daf/2bb5f/winellska-skolan-w.webp 780w',
                                type: 'image/webp',
                                sizes: '(min-width: 780px) 780px, 100vw',
                            },
                        ],
                    },
                    width: 780,
                    height: 780,
                },
            },
        } as unknown as ImageDataLike,
        description: 'Kuva Winellska skolanista.',
    },
    metadata: {
        tags: [kirkkonummiTag, opetusTag],
    },
    title: 'Hyvin suunniteltu on puoliksi tehty, mutta',
    updatedAt: '2022-06-19T17:42:19.529Z',
    publishedOld: '2021-05-24',
    published: '2022-06-18T19:13:30.990Z',
    excerpt:
        'Gesterbyn koulukeskuksen hankesuunnitelma on palautettu kunnanhallituksesta lisävalmisteluun jo kolme kertaa. Kokonaisuudessaan hanketta on selvitetty ja suuniteltu jo 6 vuotta, mutta uutta rakennusta ei ole vieläkään aloitettu rakentamaan.',
    slug: 'hyvin-suunniteltu-on-puoliksi-tehty-mutta',
}

export const daycareCannotBeCompromised: ContentfulPost & ContentfulPostExcerpt = {
    ...healthBelongsToAll,
    publishDate: '05.03.2021',
    body: {
        raw: '{"data":{},"content":[{"data":{},"content":[{"data":{},"marks":[],"value":"Nyt kun ","nodeType":"text"},{"data":{"uri":"https://www.kirkkonummi.fi/13800-juhlakallio"},"content":[{"data":{},"marks":[],"value":"Juhlakallion asemakaava","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" on hyväksytty, ja ","nodeType":"text"},{"data":{"uri":"https://www.kirkkonummi.fi/13900-tolsanmaki"},"content":[{"data":{},"marks":[],"value":"Tolsanmäen","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" sekä ","nodeType":"text"},{"data":{"uri":"https://www.kirkkonummi.fi/14100-tolsanjarvi"},"content":[{"data":{},"marks":[],"value":"Tolsanjärven","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" asemakaavat ovat tulossa, olisi erittäin tärkeää, että kunnassa kiinnitettäisiin huomiota myös alueen päivähoitopaikkoihin ja koulujen määrään. Kirkkonummen uusille asemakaava-alueille on perinteisesti muuttanut suuria määriä lapsiperheitä, esimerkiksi ","nodeType":"text"},{"data":{"uri":"https://www.stat.fi/tietotrendit/artikkelit/2017/paavo-nayttaa-missa-asuvat-lapsiperheet/"},"content":[{"data":{},"marks":[],"value":"Sundsbergissä yli 50 prosenttia talouksista oli lapsiperheitä","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" vuonna 2015. Jo nykyään asuu Heikkilän, Jolkbyn ja Laajakallion alueella ","nodeType":"text"},{"data":{"uri":"https://www.kirkkonummi.fi/vaesto-tilastoalueittain"},"content":[{"data":{},"marks":[],"value":"noin 300 päiväkoti-ikäistä ja noin 500 koulu-ikäistä lasta","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". ","nodeType":"text"},{"data":{"uri":"https://www.kirkkonummi.fi/library/files/5c6a6b69c910588b1800042c/Selostus3346_Juhlakallio.pdf#page=8"},"content":[{"data":{},"marks":[],"value":"Juhlakallioon","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", ","nodeType":"text"},{"data":{"uri":"https://www.kirkkonummi.fi/library/files/5ad9bd47c91058399c000fe1/3299_Tolsanm_ki_selostus_p_ivitetty_khn_k_sittelypvm.pdf#page=8"},"content":[{"data":{},"marks":[],"value":"Tolsanmäkeen","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" ja ","nodeType":"text"},{"data":{"uri":"https://www.kirkkonummi.fi/library/files/5e462fe9c91058943e000319/Selostus_3391Tolsanj_rvi.pdf#page=7"},"content":[{"data":{},"marks":[],"value":"Tolsanjärveen","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" on kaavailtu muuttavan yhteensä lähes 2 000 uutta asukasta. Kunnan päätöksenteon tueksi teetetyissä väestöennusteissa (tammikuu 2021) arvioidaan, että ","nodeType":"text"},{"data":{"uri":"http://kirkkonummi.oncloudos.com/kokous/2021663-5-45961.PDF#page=25"},"content":[{"data":{},"marks":[],"value":"vuonna 2030 näillä alueilla asuisi 10-30 % enemmän alle 7-vuotiasta","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" kuin nykyään. Kuitenkin mikäli näiden alueiden ","nodeType":"text"},{"data":{"uri":"https://www.kirkkonummi.fi/vaesto-tilastoalueittain"},"content":[{"data":{},"marks":[],"value":"väestörakenne olisi samanlainen kuin Sundsbergissa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", tarkoittaisi tämä jopa noin 200 uutta päiväkoti-ikäistä ja noin 300 uutta kouluikäistä lasta.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Tällä hetkellä suunniteltujen asemakaavojen alueella on päiväkoteja kolme kappaletta: ","nodeType":"text"},{"data":{"uri":"https://www.kirkkonummi.fi/laajakallion-paivakoti"},"content":[{"data":{},"marks":[],"value":"Laajakallion kunnallinen päiväkoti","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" ja yksityiset ","nodeType":"text"},{"data":{"uri":"https://touhula.fi/paivakoti/kirkkonummi-touhula-laajakallio/"},"content":[{"data":{},"marks":[],"value":"Touhula Laajakallio","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" sekä ","nodeType":"text"},{"data":{"uri":"https://www.paivakotimurut.fi/solstugan/"},"content":[{"data":{},"marks":[],"value":"Murut Solstugan","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". Lisäksi alueelta löytyy ","nodeType":"text"},{"data":{"uri":"https://www.kirkkonummi.fi/heikkilan-koulu-1"},"content":[{"data":{},"marks":[],"value":"Heikkilän koulu","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" sekä ","nodeType":"text"},{"data":{"uri":"https://www.kirkkonummi.fi/laajakallion-koulu-1"},"content":[{"data":{},"marks":[],"value":"Laajakallion koulu","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". Toki myös ","nodeType":"text"},{"data":{"uri":"https://www.kirkkonummi.fi/tulevat-jokirinteen-oppimiskeskus"},"content":[{"data":{},"marks":[],"value":"Jokirinteen oppimiskeskus","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" on alueen lähellä, mutta kun perinteisesti ","nodeType":"text"},{"data":{"uri":"https://www.hsy.fi/globalassets/ilmanlaatu-ja-ilmasto/tiedostot/sukkulointikatsaus_2016.pdf#page=2"},"content":[{"data":{},"marks":[],"value":"yli puolet Kirkkonummelaisista käy töissä vastakkaisessa suunnassa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", ei se ole järkevä vaihtoehto varsinkaan päiväkoti-ikäisille lapsille. Vaikka nykyiset päiväkodit ja koulut riittäisivätkin nykyisille asukkaille, mitä ne eivät tee, kasvaa sekä päiväkotipaikkojen että koulujen tarve merkittävästi lähivuosien aikana.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{"target":{"sys":{"id":"7eQfs1inDm3NB5zf0Ejn7G","type":"Link","linkType":"Entry"}}},"content":[],"nodeType":"embedded-entry-block"},{"data":{},"content":[{"data":{},"marks":[],"value":"Henkilökohtaisena esimerkkinä voin kertoa siitä, kun haimme esikoisellemme päivähoitopaikkaa alueelta viime kesänä. Olimme odottaneet, niin kuin muutkin alueelle muuttavat todennäköisesti olettavat, että lapsen saa oman alueen päiväkotiin, mutta monen kuukauden odottelun tuloksena meille oli tarjota paikkaa vain kauempana olevista päiväkodeista. Tietenkin aina voi autolla viedä ja hakea lasta vaikka mistä, mutta se tarkoittaa että auto pitää olla, ja että päiväkotiin viemiseen ja hakemiseen menee ylimääräistä aikaa ja rahaa. Myös osa Laajakalliossa asuvien lasten sisaruksista ei ole päässyt samaan päiväkotiin kyseisellä alueella.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Kirkkonummea usein kuvaillaan lapsiperheille loistavaksi asuinpaikaksi ja asuntojen myynti-ilmoituksissakin mainostetaan lähellä olevia palveluja, kuten kouluja ja päiväkoteja. Kuitenkin tällä hetkellä nämä palvelut tuntuvat ainakin Keskustan ja Masalan välillä olevan lähinnä teoreettisia.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Pidetään Kirkkonummi lapsille ja lapsiperheille ystävällisenä kuntana ja huolehditaan varhaiskasvatuksen riittävyydestä!","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[{"type":"italic"}],"value":"Julkaistu Kirkkonummen Sanomissa 28.2.2021.","nodeType":"text"}],"nodeType":"paragraph"}],"nodeType":"document"}',
        references: [
            {
                __typename: 'ContentfulImageWithCaption',
                contentful_id: '7eQfs1inDm3NB5zf0Ejn7G',
                caption: 'Keskustan alueen päiväkodit',
                altText: 'Keskustan alueen päiväkodit kartalla',
                image: {
                    localFile: {
                        childImageSharp: {
                            gatsbyImageData: {
                                images: {
                                    sources: [
                                        {
                                            srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/1RnD7VAYU3KbSBpZ3WrqBu/21d375cb9ef9923d0186fdd1cc0b8ec0/keskustan-alueen-paivakodit.jpg?w=455&h=195&q=50&fm=webp 455w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/1RnD7VAYU3KbSBpZ3WrqBu/21d375cb9ef9923d0186fdd1cc0b8ec0/keskustan-alueen-paivakodit.jpg?w=910&h=390&q=50&fm=webp 910w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/1RnD7VAYU3KbSBpZ3WrqBu/21d375cb9ef9923d0186fdd1cc0b8ec0/keskustan-alueen-paivakodit.jpg?w=1820&h=780&q=50&fm=webp 1820w',
                                            sizes: '(min-width: 1820px) 1820px, 100vw',
                                            type: 'image/webp',
                                        },
                                    ],
                                    fallback: {
                                        src: 'https://images.ctfassets.net/44t6u1r4zgqq/1RnD7VAYU3KbSBpZ3WrqBu/21d375cb9ef9923d0186fdd1cc0b8ec0/keskustan-alueen-paivakodit.jpg?w=1820&h=780&fl=progressive&q=50&fm=jpg',
                                        srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/1RnD7VAYU3KbSBpZ3WrqBu/21d375cb9ef9923d0186fdd1cc0b8ec0/keskustan-alueen-paivakodit.jpg?w=455&h=195&fl=progressive&q=50&fm=jpg 455w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/1RnD7VAYU3KbSBpZ3WrqBu/21d375cb9ef9923d0186fdd1cc0b8ec0/keskustan-alueen-paivakodit.jpg?w=910&h=390&fl=progressive&q=50&fm=jpg 910w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/1RnD7VAYU3KbSBpZ3WrqBu/21d375cb9ef9923d0186fdd1cc0b8ec0/keskustan-alueen-paivakodit.jpg?w=1820&h=780&fl=progressive&q=50&fm=jpg 1820w',
                                        sizes: '(min-width: 1820px) 1820px, 100vw',
                                    },
                                },
                                layout: 'constrained',
                                width: 1820,
                                height: 780,
                                placeholder: {
                                    fallback:
                                        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAlgCWAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAJABQDAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEG/8QAFxABAQEBAAAAAAAAAAAAAAAAAAEhQf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A3QCom9AqKQFB/9k=',
                                },
                            },
                        },
                    } as unknown as ImageDataLike,
                    description:
                        'Kuvakaappaus Google Mapsistä, jossa on merkittynä Kirkkonummen keskustan alueen päiväkodit.',
                },
            },
        ],
    },
    headerImage: {
        localFile: {
            childImageSharp: {
                gatsbyImageData: {
                    images: {
                        sources: [
                            {
                                srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/6wf9X4U8dK18LBXVI0XDqr/25dd4230150855ee4555611533233524/laajakallion-paivakoti.jpg?w=1008&h=567&q=50&fm=webp 1008w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/6wf9X4U8dK18LBXVI0XDqr/25dd4230150855ee4555611533233524/laajakallion-paivakoti.jpg?w=2015&h=1134&q=50&fm=webp 2015w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/6wf9X4U8dK18LBXVI0XDqr/25dd4230150855ee4555611533233524/laajakallion-paivakoti.jpg?w=4000&h=2250&q=50&fm=webp 4000w',
                                sizes: '(min-width: 4030px) 4030px, 100vw',
                                type: 'image/webp',
                            },
                        ],
                        fallback: {
                            src: 'https://images.ctfassets.net/44t6u1r4zgqq/6wf9X4U8dK18LBXVI0XDqr/25dd4230150855ee4555611533233524/laajakallion-paivakoti.jpg?w=1008&h=567&fl=progressive&q=50&fm=jpg',
                            srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/6wf9X4U8dK18LBXVI0XDqr/25dd4230150855ee4555611533233524/laajakallion-paivakoti.jpg?w=1008&h=567&fl=progressive&q=50&fm=jpg 1008w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/6wf9X4U8dK18LBXVI0XDqr/25dd4230150855ee4555611533233524/laajakallion-paivakoti.jpg?w=2015&h=1134&fl=progressive&q=50&fm=jpg 2015w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/6wf9X4U8dK18LBXVI0XDqr/25dd4230150855ee4555611533233524/laajakallion-paivakoti.jpg?w=4000&h=2250&fl=progressive&q=50&fm=jpg 4000w',
                            sizes: '(min-width: 4030px) 4030px, 100vw',
                        },
                    },
                    layout: 'constrained',
                    width: 4030,
                    height: 2267,
                    placeholder: {
                        fallback:
                            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAALABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAQGAgP/xAAhEAACAgICAQUAAAAAAAAAAAABAwIRAAQSIaEFMUFRsf/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAbEQACAwADAAAAAAAAAAAAAAAAAwERUQISMf/aAAwDAQACEQMRAD8A07WaIEBLIy9+RVY8HF1rLZcQl0uwCQqq8nKZZuNnOe7Y1zIEiQ+Qax4ay/QpXwwmmIbCVDSfIffHDF9j1XeU+cIbEuIPVgH9wx7bofVeH//Z',
                    },
                },
            },
        } as unknown as ImageDataLike,
        description: 'Kuva Laajakallion päiväkodista talvella.',
    },
    mobileHeaderImage: {
        localFile: {
            childImageSharp: {
                gatsbyImageData: {
                    layout: 'constrained',
                    placeholder: {
                        fallback:
                            'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAQDAf/EABYBAQEBAAAAAAAAAAAAAAAAAAMBAv/aAAwDAQACEAMQAAABx7Xkp5KVlgJJRqf/xAAaEAACAwEBAAAAAAAAAAAAAAABAgADEiER/9oACAEBAAEFAmZQeGZhS3zFpK1uohjcP//EABcRAAMBAAAAAAAAAAAAAAAAAAABExD/2gAIAQMBAT8Bmie//8QAFxEAAwEAAAAAAAAAAAAAAAAAAAETEP/aAAgBAgEBPwGrK7//xAAcEAAABgMAAAAAAAAAAAAAAAAAAQIQESESMZH/2gAIAQEABj8Ch6WLUYjJPH2Y/8QAGxAAAgIDAQAAAAAAAAAAAAAAAREAIRBBYXH/2gAIAQEAAT8hajJ4IGIHuFAA24CCnolwV7fAOAUCH//aAAwDAQACAAMAAAAQxOD+/8QAGREAAQUAAAAAAAAAAAAAAAAAAAEQETFx/9oACAEDAQE/EJks0/8A/8QAGREAAQUAAAAAAAAAAAAAAAAAAAEQETFx/9oACAECAQE/EIVow/8A/8QAHBABAAICAwEAAAAAAAAAAAAAAQARIWExQXGB/9oACAEBAAE/EG9E5yBAQFphqOsL570+XAKoMtg+JEXIEpR9SDhggHvuK6LbP//Z',
                    },
                    images: {
                        fallback: {
                            src: '/static/f3e1996f960b9094d00f01bcbfcdc88a/0c6e4/laajakallion-paivakoti.jpg',
                            srcSet: '/static/f3e1996f960b9094d00f01bcbfcdc88a/d558d/laajakallion-paivakoti.jpg 567w,\n/static/f3e1996f960b9094d00f01bcbfcdc88a/52bbf/laajakallion-paivakoti.jpg 1134w,\n/static/f3e1996f960b9094d00f01bcbfcdc88a/0c6e4/laajakallion-paivakoti.jpg 2267w',
                            sizes: '(min-width: 2267px) 2267px, 100vw',
                        },
                        sources: [
                            {
                                srcSet: '/static/f3e1996f960b9094d00f01bcbfcdc88a/b709e/laajakallion-paivakoti.webp 567w,\n/static/f3e1996f960b9094d00f01bcbfcdc88a/df689/laajakallion-paivakoti.webp 1134w,\n/static/f3e1996f960b9094d00f01bcbfcdc88a/20300/laajakallion-paivakoti.webp 2267w',
                                type: 'image/webp',
                                sizes: '(min-width: 2267px) 2267px, 100vw',
                            },
                        ],
                    },
                    width: 2267,
                    height: 2267,
                },
            },
        } as unknown as ImageDataLike,
        description: 'Kuva Laajakallion päiväkodista talvella.',
    },
    metadata: {
        tags: varhaiskasvatusTags.concat(kaavoitusTag),
    },
    title: 'Varhaiskasvatuksen riittävyydestä ei saa tinkiä',
    updatedAt: '2022-06-19T17:42:01.314Z',
    publishedOld: '2021-03-05',
    published: '2022-06-18T19:09:53.414Z',
    excerpt:
        'Keskustan alueella on nyt jo pulaa päiväkotipaikoista. Uusien asemakaavojen myötä tarve tulee vain kasvamaan, eikä Jokirinne ole siihen vastaus. Kunnassa pitää huolehtia varhaiskasvatuspaikkojen riittävyydestä!',
    slug: 'varhaiskasvatuksen-riittavyydesta-ei-saa-tinkia',
}

export const preschoolClubChildBenefit: ContentfulPost & ContentfulPostExcerpt = {
    ...healthBelongsToAll,
    publishDate: '18.02.2021',
    body: {
        raw: '{"data":{},"content":[{"data":{},"content":[{"data":{},"marks":[],"value":"Samalla, kun kunnanvaltuusto päätti ","nodeType":"text"},{"data":{"uri":"https://www.kirkkonummi.fi/kotihoidon-tuen-kuntalisa-182019-alkaen"},"content":[{"data":{},"marks":[],"value":"lopettaa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" alle 2-vuotiaiden kotihoidon tuen kuntalisän, ","nodeType":"text"},{"data":{"uri":"https://www.kirkkonummi.fi/kerhot-1"},"content":[{"data":{},"marks":[],"value":"lopetettiin","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" myös Kirkkonummella toiminut varhaiskasvatuksen kerhotoiminta. Kerhoissa 2-5-vuotiaat lapset ovat päässeet 2-3 kertaa viikossa leikkimään muiden lasten kanssa ja osallistumaan varhaiskasvatukseen.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Koska kerhotoiminta päätettiin lakkauttaa talousarvion vahvistamisen kautta, on kyse ollut varmasti kustannuksista. Kuitenkaan kerhotoiminta ei ole ollut vanhemmille ilmaista, vaan siitä on maksettu kerhomaksu. Olisiko korkeammilla kerhomaksuilla voitu kattaa kustannukset, jolloin kerhotoimintaa olisi voitu jatkaa?","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Kerhotoiminnassa on myös kyse lapsen edusta. ","nodeType":"text"},{"data":{"uri":"https://www.is.fi/kotimaa/art-2000007611438.html"},"content":[{"data":{},"marks":[],"value":"Viimeaikaisissa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" tutkimuksissa ","nodeType":"text"},{"data":{"uri":"https://yle.fi/uutiset/3-10226728"},"content":[{"data":{},"marks":[],"value":"ollaan","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" samaa ","nodeType":"text"},{"data":{"uri":"https://www.iltalehti.fi/kotimaa/a/201708142200326641"},"content":[{"data":{},"marks":[],"value":"mieltä","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" siitä, että ainakin 3-vuotiaat ja sitä vanhemmat lapset hyötyvät varhaiskasvatuksesta verrattuna kotihoidossa oleviin ikätovereihinsa. Aina lapsen vanhemmat eivät syystä tai toisesta laita lapsiaan päiväkotiin, mutta tällaisella kerhotoiminnalla mahdollistetaan myös näille lapsille oikeus varhaiskasvatukseen. Lasten ja nuorten kohdalla pitää aina ottaa huomioon kustannusten lisäksi myös heidän etunsa.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Lapsiperheille suunnatut palvelut myös houkuttelevat alueelle lisää lapsiperheitä, jolloin kunta pidetään elinvoimaisena ja pystytään tuottamaan lisää palveluita kaikille kunnan asukkaille.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Pidetään Kirkkonummi lapsille ja lapsiperheille ystävällisenä kuntana ja palautetaan varhaiskasvatuksen kerhotoiminta!","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[{"type":"italic"}],"value":"Julkaistu Kirkkonummen Sanomissa 11.2.2021.","nodeType":"text"}],"nodeType":"paragraph"}],"nodeType":"document"}',
        references: [],
    },
    headerImage: {
        localFile: {
            childImageSharp: {
                gatsbyImageData: {
                    images: {
                        sources: [
                            {
                                srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/76CiIeUoFE5oG5EPco6nKd/0a37619a5e821765878ccade68f93689/lastenkirjallisuutta.jpg?w=899&h=506&q=50&fm=webp 899w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/76CiIeUoFE5oG5EPco6nKd/0a37619a5e821765878ccade68f93689/lastenkirjallisuutta.jpg?w=1798&h=1012&q=50&fm=webp 1798w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/76CiIeUoFE5oG5EPco6nKd/0a37619a5e821765878ccade68f93689/lastenkirjallisuutta.jpg?w=3595&h=2023&q=50&fm=webp 3595w',
                                sizes: '(min-width: 3595px) 3595px, 100vw',
                                type: 'image/webp',
                            },
                        ],
                        fallback: {
                            src: 'https://images.ctfassets.net/44t6u1r4zgqq/76CiIeUoFE5oG5EPco6nKd/0a37619a5e821765878ccade68f93689/lastenkirjallisuutta.jpg?w=3595&h=2023&fl=progressive&q=50&fm=jpg',
                            srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/76CiIeUoFE5oG5EPco6nKd/0a37619a5e821765878ccade68f93689/lastenkirjallisuutta.jpg?w=899&h=506&fl=progressive&q=50&fm=jpg 899w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/76CiIeUoFE5oG5EPco6nKd/0a37619a5e821765878ccade68f93689/lastenkirjallisuutta.jpg?w=1798&h=1012&fl=progressive&q=50&fm=jpg 1798w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/76CiIeUoFE5oG5EPco6nKd/0a37619a5e821765878ccade68f93689/lastenkirjallisuutta.jpg?w=3595&h=2023&fl=progressive&q=50&fm=jpg 3595w',
                            sizes: '(min-width: 3595px) 3595px, 100vw',
                        },
                    },
                    layout: 'constrained',
                    width: 3595,
                    height: 2023,
                    placeholder: {
                        fallback:
                            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAALABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAUGA//EACIQAAIBAwQCAwAAAAAAAAAAAAECAwAEEQUSITETQSIzkf/EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAGhEBAQACAwAAAAAAAAAAAAAAAQACEQMSE//aAAwDAQACEQMRAD8ATarGlxdy/EAsy5YDns+/yi60u3MOI8pL4VkBznIHBNM7e0glLPJHuYnOcn1W8saBkO0ZRCq8dA9ipnIAjVyw2GqL8Dg4J5oqke0g3fUtFD0l0v/Z',
                    },
                },
            },
        } as unknown as ImageDataLike,
        description: 'Kuva useammasta lasten kirjasta kirjahyllyssä.',
    },
    mobileHeaderImage: {
        localFile: {
            childImageSharp: {
                gatsbyImageData: {
                    layout: 'constrained',
                    placeholder: {
                        fallback:
                            'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAGQABAAIDAAAAAAAAAAAAAAAAAAEFAgME/8QAFgEBAQEAAAAAAAAAAAAAAAAAAQMC/9oADAMBAAIQAxAAAAGr3Oh1WLRmeck7gn//xAAdEAACAgEFAAAAAAAAAAAAAAABAgARMgMSEyEi/9oACAEBAAEFAmX1wxlKkZP1oMtzYohxD0P/xAAaEQAABwAAAAAAAAAAAAAAAAAAAQIQERIh/9oACAEDAQE/AVFsC7//xAAXEQEBAQEAAAAAAAAAAAAAAAARAAIQ/9oACAECAQE/Achxm//EAB0QAAICAgMBAAAAAAAAAAAAAAABAhExURIhQXH/2gAIAQEABj8CSjoj3koXwUtMtemDjSopJH//xAAaEAADAQEBAQAAAAAAAAAAAAAAAREhMUFh/9oACAEBAAE/IfMbTrN5aJpSiCs1fQpXNKKDODp0+QYpAkf/2gAMAwEAAgADAAAAEETfAP/EABkRAQADAQEAAAAAAAAAAAAAAAEAESFRwf/aAAgBAwEBPxBirnkoYx1tlE//xAAYEQEBAQEBAAAAAAAAAAAAAAABABFRIf/aAAgBAgEBPxALbI8hHmwu3//EAB4QAQACAgMAAwAAAAAAAAAAAAEAESExQYHRcaHB/9oACAEBAAE/EDTcDIdxFqMOOkOO46O05DDAlo0/IiuxXwvktljGr5iSETQq+y0he7X7NSIgHH3P/9k=',
                    },
                    images: {
                        fallback: {
                            src: '/static/9d968fa26ea2cd55cad7f9ab8709c9a2/cb561/lastenkirjallisuutta.jpg',
                            srcSet: '/static/9d968fa26ea2cd55cad7f9ab8709c9a2/aac61/lastenkirjallisuutta.jpg 506w,\n/static/9d968fa26ea2cd55cad7f9ab8709c9a2/4285d/lastenkirjallisuutta.jpg 1012w,\n/static/9d968fa26ea2cd55cad7f9ab8709c9a2/cb561/lastenkirjallisuutta.jpg 2023w',
                            sizes: '(min-width: 2023px) 2023px, 100vw',
                        },
                        sources: [
                            {
                                srcSet: '/static/9d968fa26ea2cd55cad7f9ab8709c9a2/f4ac7/lastenkirjallisuutta.webp 506w,\n/static/9d968fa26ea2cd55cad7f9ab8709c9a2/0487e/lastenkirjallisuutta.webp 1012w,\n/static/9d968fa26ea2cd55cad7f9ab8709c9a2/ab278/lastenkirjallisuutta.webp 2023w',
                                type: 'image/webp',
                                sizes: '(min-width: 2023px) 2023px, 100vw',
                            },
                        ],
                    },
                    width: 2023,
                    height: 2023,
                },
            },
        } as unknown as ImageDataLike,
        description: 'Kuva useammasta lasten kirjasta kirjahyllyssä.',
    },
    metadata: {
        tags: varhaiskasvatusTags,
    },
    title: 'Varhaiskasvatuksen kerhotoiminta - lapsen etu',
    updatedAt: '2022-06-19T17:41:43.069Z',
    publishedOld: '2021-02-18',
    published: '2022-06-18T19:04:04.464Z',
    excerpt:
        'Samalla, kun kunnanvaltuusto päätti lopettaa alle 2-vuotiaiden kotihoidontuen kuntalisän, lopetettiin myös Kirkkonummella toiminut varhaiskasvatuksen kerhotoiminta.',
    slug: 'varhaiskasvatuksen-kerhotoiminta',
}

export const kirkkonummiAddIsYourBenefit: ContentfulPost & ContentfulPostExcerpt = {
    ...healthBelongsToAll,
    publishDate: '15.02.2021',
    body: {
        raw: '{"data":{},"content":[{"data":{},"content":[{"data":{},"marks":[],"value":"Kotihoidon tuen kuntalisä, eli niin sanottu Kirkkonummi-lisä, on kunnalle vapaaehtoinen maksu, jota se voi maksaa kotihoidossa olevista lapsista. Samalla kun isot kaupungit ","nodeType":"text"},{"data":{"uri":"https://yle.fi/uutiset/3-11640872"},"content":[{"data":{},"marks":[],"value":"pienentävät kuntalisiään","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" ja ","nodeType":"text"},{"data":{"uri":"https://www.hs.fi/kotimaa/art-2000007729001.html"},"content":[{"data":{},"marks":[],"value":"kotihoidon tuen lopettamisesta kokonaisuudessaan puhutaan","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", päätti Kirkkonummen kunnanvaltuusto ","nodeType":"text"},{"data":{"uri":"https://www.kirkkonummi.fi/kotihoidon-tuen-kuntalisa-182019-alkaen"},"content":[{"data":{},"marks":[],"value":"lopettaa sen meiltä kokonaan","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". ","nodeType":"text"},{"data":{"uri":"https://www.kela.fi/ajankohtaista-henkiloasiakkaat/-/asset_publisher/kg5xtoqDw6Wf/content/kotihoidon-tukeminen-myohentaa-aitien-tyohon-siirtymista"},"content":[{"data":{},"marks":[],"value":"Kelan oman tutkimuksen mukaan","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" paras ratkaisu olisi pidentää vanhempainvapaita ja ","nodeType":"text"},{"data":{"uri":"https://www.vihreat.fi/ajankohtaista/vihdoin-tasa-arvoinen-perhevapaauudistus/"},"content":[{"data":{},"marks":[],"value":"hallituskin on lähtenyt perhevapaita uudistamaan","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", mutta tähän eivät yksittäiset kunnat voi vaikuttaa. Sen takia Kirkkonummelle pitäisikin palauttaa kuntalisä alle 2-vuotiaille lapsille, sillä siitä hyötyvät niin ","nodeType":"text"},{"data":{"uri":"#lapset"},"content":[{"data":{},"marks":[],"value":"lapset","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", ","nodeType":"text"},{"data":{"uri":"#vanhemmat"},"content":[{"data":{},"marks":[],"value":"vanhemmat","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", ","nodeType":"text"},{"data":{"uri":"#paivakotien-tyontekijat"},"content":[{"data":{},"marks":[],"value":"päiväkotien työntekijät","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", ","nodeType":"text"},{"data":{"uri":"#kirkkonummelaiset"},"content":[{"data":{},"marks":[],"value":"muut kirkkonummelaiset","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" kuin ","nodeType":"text"},{"data":{"uri":"#kunnan-paattajat"},"content":[{"data":{},"marks":[],"value":"kunnan päättäjätkin","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":".","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Lapset","nodeType":"text"}],"nodeType":"heading-2"},{"data":{},"content":[{"data":{},"marks":[],"value":"Kirkkonummi-lisän avulla lapsi saa olla kotona elämänsä ","nodeType":"text"},{"data":{"uri":"https://www.mll.fi/vanhemmille/lapsen-kasvu-ja-kehitys/0-1-v/"},"content":[{"data":{},"marks":[],"value":"vaiheet","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", jolloin hän ","nodeType":"text"},{"data":{"uri":"https://www.mll.fi/vanhemmille/lapsen-kasvu-ja-kehitys/1-2-v/"},"content":[{"data":{},"marks":[],"value":"tarvitsee","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" eniten huomiota ja huolenpitoa. Noin 11 ja puolen kuukauden iässä kun vanhempainvapaa loppuu, ","nodeType":"text"},{"data":{"uri":"https://www.mll.fi/vanhemmille/lapsen-kasvu-ja-kehitys/0-1-v/vauvan-liikunnallinen-kehitys/"},"content":[{"data":{},"marks":[],"value":"useimmat lapset osaavat kontata ja ehkä jopa seistä tukea vasten","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". Myös ","nodeType":"text"},{"data":{"uri":"https://www.is.fi/perhe/art-2000000926258.html"},"content":[{"data":{},"marks":[],"value":"eroahdistus","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" on ajankohtainen. Vasta vuoden ikäisenä lapsi puhuu ","nodeType":"text"},{"data":{"uri":"https://www.mll.fi/vanhemmille/lapsen-kasvu-ja-kehitys/1-2-v/1-2-vuotiaan-alyllinen-kehitys/"},"content":[{"data":{},"marks":[],"value":"ensimmäiset sanansa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" ja alkaa myös ","nodeType":"text"},{"data":{"uri":"https://www.mll.fi/vanhemmille/lapsen-kasvu-ja-kehitys/1-2-v/1-2-vuotiaan-liikunnallinen-kehitys/"},"content":[{"data":{},"marks":[],"value":"pikkuhiljaa kävelemään","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". Lapsi alkaa myös osoittamaan ","nodeType":"text"},{"data":{"uri":"https://www.mll.fi/vanhemmille/lapsen-kasvu-ja-kehitys/1-2-v/1-2-vuotiaan-persoonallisuuden-kehitys/"},"content":[{"data":{},"marks":[],"value":"omaa temperamenttiaan","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", jolloin on hyvä, että hyvin lapsen tunteva vanhempi on läsnä purkamassa tilanteita. Lapsi ei vielä myöskään ","nodeType":"text"},{"data":{"uri":"https://www.mll.fi/vanhemmille/lapsen-kasvu-ja-kehitys/1-2-v/1-2-vuotiaan-sosiaalinen-kehitys/"},"content":[{"data":{},"marks":[],"value":"osaa leikkiä toisten lasten kanssa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":".","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"2 vuotta täyttänyt lapsi on jo ","nodeType":"text"},{"data":{"uri":"https://www.mll.fi/vanhemmille/lapsen-kasvu-ja-kehitys/2-3-v/"},"content":[{"data":{},"marks":[],"value":"aivan erilainen yksilö","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". Tässä vaiheessa lapsi osaa jo ","nodeType":"text"},{"data":{"uri":"https://www.mll.fi/vanhemmille/lapsen-kasvu-ja-kehitys/2-3-v/2-3-vuotiaan-sosiaalinen-kehitys/"},"content":[{"data":{},"marks":[],"value":"huomioida ympärillään olevia","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", ","nodeType":"text"},{"data":{"uri":"https://www.mll.fi/vanhemmille/lapsen-kasvu-ja-kehitys/2-3-v/2-3-vuotiaan-alyllinen-kehitys/"},"content":[{"data":{},"marks":[],"value":"lapsi ymmärtää ohjeita ja alkaa oppia erilaisia asioita","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". Toki tässä iässä myös ","nodeType":"text"},{"data":{"uri":"https://www.mll.fi/vanhemmille/lapsen-kasvu-ja-kehitys/2-3-v/2-3-vuotiaan-persoonallisuuden-kehitys/"},"content":[{"data":{},"marks":[],"value":"tahtominen","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" on usein ajankohtaista, mutta toisaalta ","nodeType":"text"},{"data":{"uri":"https://mielenihmeet.fi/lasten-rutiinien-tarkeys/"},"content":[{"data":{},"marks":[],"value":"rutiinit auttavat tähän hyvin","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" ja päiväkodissa niitä riittää.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Vanhemmat","nodeType":"text"}],"nodeType":"heading-2"},{"data":{},"content":[{"data":{},"marks":[],"value":"Taloudellisesti 150 euroa kuukaudessa on iso raha kotihoidon tuen ","nodeType":"text"},{"data":{"uri":"https://www.kela.fi/kotihoidontuki-maara-ja-maksaminen"},"content":[{"data":{},"marks":[],"value":"342,95 euron","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" päälle. Esimerkiksi yhdellä pienellä lapsella ja aikuisella menee ruokaan kuukaudessa arviolta ","nodeType":"text"},{"data":{"uri":"https://www.mtvuutiset.fi/makuja/artikkeli/paljonko-teilla-kuluu-rahaa-ruokaan-kuukaudessa-vertaa-tahan-rahasummaan-yksinelavan-parin-lapsiperheen-teiniperheen-ja-muiden-budjetit/7948114"},"content":[{"data":{},"marks":[],"value":"341 euroa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". Pelkästä kotihoidon tuesta ei siis paljoa jää kuukaudessa käteen. Kirkkonummi-lisällä ostatkin päälle vaikka talvivaatteet lapselle.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Jokaisella vanhemmalla pitäisi olla mahdollisuus päästä nauttimaan lapsensa kehityksestä, varsinkin ensimmäisten vuosien aikana, jolloin lapsi oppii melkein päivittäin jotain uutta. Toivottavasti ","nodeType":"text"},{"data":{"uri":"https://www.eduskunta.fi/FI/naineduskuntatoimii/kirjasto/aineistot/kotimainen_oikeus/LATI/Sivut/perhevapaauudistus.aspx"},"content":[{"data":{},"marks":[],"value":"perhevapaauudistus","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" tuo tähän helpotusta, mutta niin kauan kuin mennään nykyisellä mallilla, pystyy Kirkkonummi auttamaan vanhempia kuntalisällä.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Päiväkotien työntekijät","nodeType":"text"}],"nodeType":"heading-2"},{"data":{},"content":[{"data":{},"marks":[],"value":"Yhdellä hoitajalla voi olla ryhmässään ","nodeType":"text"},{"data":{"uri":"https://www.finlex.fi/fi/laki/alkup/2018/20180753"},"content":[{"data":{},"marks":[],"value":"enintään neljä alle 3-vuotiasta lasta","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". Jo ","nodeType":"text"},{"data":{"uri":"https://yle.fi/uutiset/3-10633334"},"content":[{"data":{},"marks":[],"value":"nyt","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" on ","nodeType":"text"},{"data":{"uri":"https://www.hs.fi/kaupunki/art-2000007635404.html"},"content":[{"data":{},"marks":[],"value":"pääkaupunkiseudulla","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" pulaa ","nodeType":"text"},{"data":{"uri":"https://www.iltalehti.fi/kotimaa/a/3dc1a617-48cf-46e1-8e83-05f2395c7af8"},"content":[{"data":{},"marks":[],"value":"päiväkotien","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" työntekijöistä ja ","nodeType":"text"},{"data":{"uri":"https://www.is.fi/kotimaa/art-2000006352887.html"},"content":[{"data":{},"marks":[],"value":"nykyisillä","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" työntekijöillä on kasvavia paineita lasten hoidossa. Kirkkonummen kunnallakin on kirjoitushetkellä ","nodeType":"text"},{"data":{"uri":"https://www.kuntarekry.fi/fi/tyopaikat/?&profession=38816&type=53258&organisation=9&lang=fi_FI&sort=%22-changetime%22&limit=24&display=grid"},"content":[{"data":{},"marks":[],"value":"6 avointa työpaikkaa päiväkodeissa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":".","nodeType":"text"}],"nodeType":"paragraph"},{"data":{"target":{"sys":{"id":"1XlmtDxnOehtYJIkzhbYnQ","type":"Link","linkType":"Entry"}}},"content":[],"nodeType":"embedded-entry-block"},{"data":{},"content":[{"data":{},"marks":[],"value":"Jos useampi alle 2-vuotias siirtyy kotihoidosta varhaiskasvatuksen piiriin, on päiväkodeissa kädet varmasti täynnä. Vaikka tilat olisivat kuinka turvallisia tahansa, on neljästä ","nodeType":"text"},{"data":{"uri":"https://www.mll.fi/vanhemmille/lapsen-kasvu-ja-kehitys/0-1-v/vauvan-liikunnallinen-kehitys/"},"content":[{"data":{},"marks":[],"value":"konttaavasta","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" ja ","nodeType":"text"},{"data":{"uri":"https://www.mll.fi/vanhemmille/lapsen-kasvu-ja-kehitys/0-1-v/vauvan-sosiaalinen-kehitys/"},"content":[{"data":{},"marks":[],"value":"jokeltavasta","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" lapsesta huolehtiminen haastavaa kenelle tahansa. Jos sen sijaan lapsia hoidetaan kotona kahteen ikävuoteen asti, eivät he enää ","nodeType":"text"},{"data":{"uri":"https://www.mll.fi/vanhemmille/lapsen-kasvu-ja-kehitys/2-3-v/2-3-vuotiaan-liikunnallinen-kehitys/"},"content":[{"data":{},"marks":[],"value":"kaatuile jatkuvasti","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", heidän kanssaan voi ","nodeType":"text"},{"data":{"uri":"https://www.mll.fi/vanhemmille/lapsen-kasvu-ja-kehitys/2-3-v/2-3-vuotiaan-sosiaalinen-kehitys/"},"content":[{"data":{},"marks":[],"value":"leikkiä järjestelmällisemmin","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" ja he osaavat ","nodeType":"text"},{"data":{"uri":"https://www.mll.fi/vanhemmille/lapsen-kasvu-ja-kehitys/1-2-v/1-2-vuotiaan-alyllinen-kehitys/"},"content":[{"data":{},"marks":[],"value":"todennäköisesti ilmaista itseään","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":".","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Kirkkonummelaiset","nodeType":"text"}],"nodeType":"heading-2"},{"data":{},"content":[{"data":{},"marks":[],"value":"Vaikka et itse saakaan Kirkkonummi-lisää, siitä on sinullekin etua. Manner-Suomessa on jäljellä enää ","nodeType":"text"},{"data":{"uri":"https://www.kuntaliitto.fi/sites/default/files/media/file/Kotihoidontuen-kuntalisat-2020.pdf#page=7"},"content":[{"data":{},"marks":[],"value":"55 kuntaa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", jotka kuntalisää maksavat, joten kyseessä on oikein hyvä houkutin lapsiperheille. Kun kuntaan sitten saadaan lisää veronmaksajia, voidaan muitakin palveluita parantaa ja laajentaa, nimenomaan niitä, joita sinä käytät.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Muutenkin aikana jolloin ","nodeType":"text"},{"data":{"uri":"https://www.stat.fi/til/synt/2019/02/synt_2019_02_2020-12-04_tie_001_fi.html"},"content":[{"data":{},"marks":[],"value":"syntyvyys","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" on ","nodeType":"text"},{"data":{"uri":"https://yle.fi/uutiset/3-11680904"},"content":[{"data":{},"marks":[],"value":"laskussa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", ovat lapsiperheet kunnille entistäkin tärkeämpiä palveluiden varmistamiseksi. Kun keskimäärin lapsia saavat ","nodeType":"text"},{"data":{"uri":"http://www.stat.fi/tup/tilastokirjasto/aidit_tilastoissa_2018.html"},"content":[{"data":{},"marks":[],"value":"30-40-vuotiaat","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", ja eläkkeelle siirrytään ","nodeType":"text"},{"data":{"uri":"https://www.tyoelake.fi/elakkeet-eri-elamantilanteissa/vanhuuselake-ikaluokilla-oma-elakeikansa/"},"content":[{"data":{},"marks":[],"value":"yli 60-vuotiaina","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", jää vanhemmille monta kymmentä vuotta aikaa tuottaa kunnalle verotuloja, joilla palveluita maksetaan. Varsinkin koronan aiheuttaman kriisin aikana yhä useampi on muuttanut pois ","nodeType":"text"},{"data":{"uri":"https://www.hs.fi/kotimaa/art-2000007647867.html"},"content":[{"data":{},"marks":[],"value":"Helsingistä","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" ja ","nodeType":"text"},{"data":{"uri":"https://www.lansivayla.fi/paikalliset/3129350"},"content":[{"data":{},"marks":[],"value":"pääkaupunkiseudulta","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", pitäisi Kirkkonummen houkutella näitä samoja ihmisiä muuttamaan nimenomaan Kirkkonummelle.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Kunnan päättäjät","nodeType":"text"}],"nodeType":"heading-2"},{"data":{},"content":[{"data":{},"marks":[{"type":"italic"}],"value":"Varoitus: seuraavassa osiossa on paljon numeroita.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Kirkkonummi-lisän lopettamisessa oli tietenkin kyse siitä, että jostain piti leikata, jotta budjetti saadaan tasapainoon. Todennäköisesti on käyty läpi, että Kirkkonummi-lisä maksaa kunnalle yli 360 000 € vuodessa (jos tuen saajia on yli 200). Ehkä on myös ajateltu, ettei kotihoidon tuen kuntalisä vaikuta varhaiskasvatuksen kysyntään, ","nodeType":"text"},{"data":{"uri":"https://www.kuntaliitto.fi/sites/default/files/media/file/Kotihoidontuen-kuntalisat-2020.pdf#page=8"},"content":[{"data":{},"marks":[],"value":"vaikka se ei ole välttämättä totta","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":".","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Kuitenkin jokainen lapsi joka siirtyy tämän seurauksena päiväkotiin, maksaa kunnalle keskimäärin 672,85 euroa (palvelusetelin maksimihinnan ollessa ","nodeType":"text"},{"data":{"uri":"https://www.kirkkonummi.fi/library/files/5c923621c91058d1e40005b4/Kn_s__nt_kirja_svl__1.8.2019.pdf#page=9"},"content":[{"data":{},"marks":[],"value":"1 293 euroa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" ja vanhemman maksaessa ","nodeType":"text"},{"data":{"uri":"https://www.kirkkonummi.fi/tietoa-taloudesta"},"content":[{"data":{},"marks":[],"value":"tuloveroa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" kunnalle ","nodeType":"text"},{"data":{"uri":"https://www.tilastokeskus.fi/tup/suoluk/suoluk_palkat.html"},"content":[{"data":{},"marks":[],"value":"620,15 euroa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":") kuukausitasolla. Vuositasolla riittää, että 45 lasta siirtyy kotihoidosta varhaiskasvatukseen, jotta kunta menettää saman 360 000 € vuodessa.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Kirkkonummi-lisä on toki myös hyvä markkinoinnin apuväline, sillä ","nodeType":"text"},{"data":{"uri":"https://www.kuntaliitto.fi/sites/default/files/media/file/Kotihoidontuen-kuntalisat-2020.pdf#page=7"},"content":[{"data":{},"marks":[],"value":"vain harva kunta sitä enää maksaa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". Jos sillä saadaan houkuteltua yksikin lapsiperhe Kirkkonummelle esimerkiksi Keravan sijaan, saadaan kunnalle ","nodeType":"text"},{"data":{"uri":"https://www.kirkkonummi.fi/tietoa-taloudesta"},"content":[{"data":{},"marks":[],"value":"verotuloja","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" ","nodeType":"text"},{"data":{"uri":"https://www.tilastokeskus.fi/tup/suoluk/suoluk_palkat.html"},"content":[{"data":{},"marks":[],"value":"7 441,80","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" euroa vuodessa, niin kauan kun vain yksi vanhemmista käy töissä. Mikäli molemmat vanhemmat siirtyvät jossain vaiheessa takaisin työelämään, maksavat he vuosittain keskimäärin ","nodeType":"text"},{"data":{"uri":"https://www.tilastokeskus.fi/tup/suoluk/suoluk_palkat.html)[tuloveroa](https://www.kirkkonummi.fi/tietoa-taloudesta"},"content":[{"data":{},"marks":[],"value":"14 883,60 euroa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":".","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Summa summarum","nodeType":"text"}],"nodeType":"heading-2"},{"data":{},"content":[{"data":{},"marks":[],"value":"Välitön hyöty kotihoidon tuen kuntalisästä on tietenkin sitä saaville perheille. 150 euroa kuukaudessa voi tuntua monesta pieneltä rahalta, mutta pienituloisessa perheessä sillä on suuri merkitys. Pelkästään heikoimmassa asemassa olevista huolehtimisen pitäisi riittää perusteeksi sen palauttamiseen.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Välillisesti Kirkkonummi-lisästä ja muistakin lapsiperheiden palveluista hyötyvät kuitenkin myös koko kunta. Lapsiperheiden houkutteleminen kuntaan on yksi parhaista tavoista saada kunnan taloutta parannettua pitkällä aikavälillä ja kuntalisä on siihen hyvä houkutin.","nodeType":"text"}],"nodeType":"paragraph"}],"nodeType":"document"}',
        references: [
            {
                __typename: 'ContentfulImageWithCaption',
                contentful_id: '1XlmtDxnOehtYJIkzhbYnQ',
                caption: 'Kirkkonummen avoimet varhaiskasvatuksen työpaikat',
                altText: 'Kirkkonummen avoimet varhaiskasvatuksen työpaikat',
                image: {
                    localFile: {
                        childImageSharp: {
                            gatsbyImageData: {
                                images: {
                                    sources: [
                                        {
                                            srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/33Ib85acEuJCUILLuT8HBy/f9eaa4b83244db3ece0949cd5f2725a8/kunnan-avoimet-paikat-xxxl.jpg?w=452&h=194&q=50&fm=webp 452w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/33Ib85acEuJCUILLuT8HBy/f9eaa4b83244db3ece0949cd5f2725a8/kunnan-avoimet-paikat-xxxl.jpg?w=903&h=387&q=50&fm=webp 903w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/33Ib85acEuJCUILLuT8HBy/f9eaa4b83244db3ece0949cd5f2725a8/kunnan-avoimet-paikat-xxxl.jpg?w=1806&h=774&q=50&fm=webp 1806w',
                                            sizes: '(min-width: 1806px) 1806px, 100vw',
                                            type: 'image/webp',
                                        },
                                    ],
                                    fallback: {
                                        src: 'https://images.ctfassets.net/44t6u1r4zgqq/33Ib85acEuJCUILLuT8HBy/f9eaa4b83244db3ece0949cd5f2725a8/kunnan-avoimet-paikat-xxxl.jpg?w=1806&h=774&fl=progressive&q=50&fm=jpg',
                                        srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/33Ib85acEuJCUILLuT8HBy/f9eaa4b83244db3ece0949cd5f2725a8/kunnan-avoimet-paikat-xxxl.jpg?w=452&h=194&fl=progressive&q=50&fm=jpg 452w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/33Ib85acEuJCUILLuT8HBy/f9eaa4b83244db3ece0949cd5f2725a8/kunnan-avoimet-paikat-xxxl.jpg?w=903&h=387&fl=progressive&q=50&fm=jpg 903w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/33Ib85acEuJCUILLuT8HBy/f9eaa4b83244db3ece0949cd5f2725a8/kunnan-avoimet-paikat-xxxl.jpg?w=1806&h=774&fl=progressive&q=50&fm=jpg 1806w',
                                        sizes: '(min-width: 1806px) 1806px, 100vw',
                                    },
                                },
                                layout: 'constrained',
                                width: 1806,
                                height: 774,
                                placeholder: {
                                    fallback:
                                        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAlgCWAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAJABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAQCBv/EACAQAAIBBAEFAAAAAAAAAAAAAAABBAMREkEFFUSSk9H/xAAVAQEBAAAAAAAAAAAAAAAAAAAAA//EABkRAAIDAQAAAAAAAAAAAAAAAAABAxJRE//aAAwDAQACEQMRAD8A7VcfDXa0fWvhlQI+bvGj46tSVyAFaPSTmZf02FuJR8ECBAUejuz/2Q==',
                                },
                            },
                        },
                    } as unknown as ImageDataLike,
                    description: 'Kuvakaappaus kunnan avoimista työpaikoista internetissä.',
                },
            },
        ],
    },
    headerImage: {
        localFile: {
            childImageSharp: {
                gatsbyImageData: {
                    images: {
                        sources: [
                            {
                                srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/Ly9sVBSzeRbGLtU89KXVk/3947e0b3c3b9f8d7759a06144d3dce87/duploleikkeja.jpg?w=1008&h=567&q=50&fm=webp 1008w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/Ly9sVBSzeRbGLtU89KXVk/3947e0b3c3b9f8d7759a06144d3dce87/duploleikkeja.jpg?w=2015&h=1134&q=50&fm=webp 2015w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/Ly9sVBSzeRbGLtU89KXVk/3947e0b3c3b9f8d7759a06144d3dce87/duploleikkeja.jpg?w=4000&h=2250&q=50&fm=webp 4000w',
                                sizes: '(min-width: 4030px) 4030px, 100vw',
                                type: 'image/webp',
                            },
                        ],
                        fallback: {
                            src: 'https://images.ctfassets.net/44t6u1r4zgqq/Ly9sVBSzeRbGLtU89KXVk/3947e0b3c3b9f8d7759a06144d3dce87/duploleikkeja.jpg?w=1008&h=567&fl=progressive&q=50&fm=jpg',
                            srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/Ly9sVBSzeRbGLtU89KXVk/3947e0b3c3b9f8d7759a06144d3dce87/duploleikkeja.jpg?w=1008&h=567&fl=progressive&q=50&fm=jpg 1008w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/Ly9sVBSzeRbGLtU89KXVk/3947e0b3c3b9f8d7759a06144d3dce87/duploleikkeja.jpg?w=2015&h=1134&fl=progressive&q=50&fm=jpg 2015w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/Ly9sVBSzeRbGLtU89KXVk/3947e0b3c3b9f8d7759a06144d3dce87/duploleikkeja.jpg?w=4000&h=2250&fl=progressive&q=50&fm=jpg 4000w',
                            sizes: '(min-width: 4030px) 4030px, 100vw',
                        },
                    },
                    layout: 'constrained',
                    width: 4030,
                    height: 2267,
                    placeholder: {
                        fallback:
                            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAALABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQFA//EACEQAAIBBQABBQAAAAAAAAAAAAECAwAEERIhMRNRYXGh/8QAFgEBAQEAAAAAAAAAAAAAAAAAAQID/8QAGREBAQADAQAAAAAAAAAAAAAAAQACERIT/9oADAMBAAIRAxEAPwAhj9N95c5QZ77fGa1D3InR4ZFa0K42kYAE/Xn8pKMaSTRqWCJcOirscAYHKSldlKqGIXY8pDUua16W5tg5BLEjzqeUVEzRV+ljzf/Z',
                    },
                },
            },
        } as unknown as ImageDataLike,
        description: 'Kuva duploista laatikossa automaton päällä.',
    },
    mobileHeaderImage: {
        localFile: {
            childImageSharp: {
                gatsbyImageData: {
                    layout: 'constrained',
                    placeholder: {
                        fallback:
                            'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAGAABAQADAAAAAAAAAAAAAAAAAAMBAgT/xAAXAQADAQAAAAAAAAAAAAAAAAAAAQID/9oADAMBAAIQAxAAAAHbAOqas484qBH/xAAaEAADAAMBAAAAAAAAAAAAAAAAAQIDEjEi/9oACAEBAAEFAkvNZHFbwVWo5izbGcT4f//EABgRAAIDAAAAAAAAAAAAAAAAAAABEBFR/9oACAEDAQE/Ab0an//EABcRAAMBAAAAAAAAAAAAAAAAAAABEBH/2gAIAQIBAT8BRt//xAAcEAACAgIDAAAAAAAAAAAAAAAAARARAjISIVH/2gAIAQEABj8C1VoUdHN5M1K8n//EAB0QAQACAgIDAAAAAAAAAAAAAAEAETFBIVFxgdH/2gAIAQEAAT8hc4pkg4nmbFzOGhnvkDECPm4lmlguJBXczuf/2gAMAwEAAgADAAAAEJznQ//EABgRAAMBAQAAAAAAAAAAAAAAAAABESEx/9oACAEDAQE/EJYZcHwh/8QAGBEAAgMAAAAAAAAAAAAAAAAAESEAARD/2gAIAQIBAT8QIKUj3//EABwQAQEAAgMBAQAAAAAAAAAAAAERACExUWFBcf/aAAgBAQABPxBkfQBVObhzgSiTV6xTRu2nTnEwSSce4AgilRT5eMmAzpsfrckqqULocRknjCiqXP/Z',
                    },
                    images: {
                        fallback: {
                            src: '/static/22100376be4814e6916d2a04bced6268/0c6e4/duploleikkeja.jpg',
                            srcSet: '/static/22100376be4814e6916d2a04bced6268/d558d/duploleikkeja.jpg 567w,\n/static/22100376be4814e6916d2a04bced6268/52bbf/duploleikkeja.jpg 1134w,\n/static/22100376be4814e6916d2a04bced6268/0c6e4/duploleikkeja.jpg 2267w',
                            sizes: '(min-width: 2267px) 2267px, 100vw',
                        },
                        sources: [
                            {
                                srcSet: '/static/22100376be4814e6916d2a04bced6268/b709e/duploleikkeja.webp 567w,\n/static/22100376be4814e6916d2a04bced6268/df689/duploleikkeja.webp 1134w,\n/static/22100376be4814e6916d2a04bced6268/20300/duploleikkeja.webp 2267w',
                                type: 'image/webp',
                                sizes: '(min-width: 2267px) 2267px, 100vw',
                            },
                        ],
                    },
                    width: 2267,
                    height: 2267,
                },
            },
        } as unknown as ImageDataLike,
        description: 'Kuva duploista laatikossa automaton päällä.',
    },
    metadata: {
        tags: varhaiskasvatusTags,
    },
    title: 'Kirkkonummi-lisä on sinunkin etusi',
    updatedAt: '2022-06-19T17:41:02.681Z',
    publishedOld: '2021-02-15',
    published: '2022-06-18T18:57:50.923Z',
    excerpt:
        'Kirkkonummi-lisästä hyötyvät sitä saavien perheiden lisäksi myös koko muukin kunta. Tarjoamalla lapsiperheille hyviä palveluita sekä kannustimia muuttaa Kirkkonummelle, saamme pidettyä kuntamme elinvoimaisena ja myös tulevaisuus on turvattu.',
    slug: 'kirkkonummi-lisa-on-sinunkin-etusi',
}

export const homecareMunicipalityExtra: ContentfulPost & ContentfulPostExcerpt = {
    ...healthBelongsToAll,
    publishDate: '04.02.2021',
    body: {
        raw: '{"data":{},"content":[{"data":{},"content":[{"data":{},"marks":[],"value":"Joulun alla Kirkkonummen kunnanvaltuusto päätti ","nodeType":"text"},{"data":{"uri":"https://www.kirkkonummi.fi/kotihoidon-tuen-kuntalisa-182019-alkaen"},"content":[{"data":{},"marks":[],"value":"lopettaa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" kotihoidon tuen kuntalisän, eli niin kutsutun Kirkkonummi-lisän. Kuntalisää Kirkkonummella maksettiin 150 euroa kuukaudessa per alle 2-vuotias lapsi, joka on kotihoidossa. Vertailuna esimerkiksi naapurikaupungissa Espoossa maksetaan ","nodeType":"text"},{"data":{"uri":"https://www.espoo.fi/fi-FI/Kasvatus_ja_opetus/Varhaiskasvatus/Kotona_hoitaminen/Kotihoidon_tuki"},"content":[{"data":{},"marks":[],"value":"alle 2-vuotiaasta lapsesta 190 euroa kuukaudessa ja 2-vuotiaasta lapsesta 150 euroa kuukaudessa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":".","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Kunnan budjetissa tällainen kustannus on erittäin pieni osa, mutta lapsiperheille kyseessä voi olla ero sen välillä, voidaanko lasta pitää kotona, vai pitääkö lapsi viedä päivähoitoon. Mikäli lapsi joudutaan kuntalisän poiston jälkeen laittamaan täysipäiväisesti päiväkotiin, maksaa se kunnalle ","nodeType":"text"},{"data":{"uri":"https://www.kirkkonummi.fi/library/files/5c923621c91058d1e40005b4/Kn_s__nt_kirja_svl__1.8.2019.pdf#page=9"},"content":[{"data":{},"marks":[],"value":"1 293 euroa kuukaudessa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" (palvelusetelin maksimihinta vuonna 2019, mitä maksetaan yksityisessä päivähoidossa olevasta lapsesta), vanhemmat joutuvat maksamaan lisäksi 288 euroa kuukaudessa päivähoidosta.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Kyllähän kunta saa tietenkin enemmän verotuloja, kun molemmat vanhemmat menevät takaisin työelämään. Nimittäin noin 620,15 euroa, kun suomalaisen mediaanipalkka vuonna 2019 oli ","nodeType":"text"},{"data":{"uri":"https://www.tilastokeskus.fi/tup/suoluk/suoluk_palkat.html"},"content":[{"data":{},"marks":[],"value":"3 140 euroa kuukaudessa","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":" tilastokeskuksen mukaan ja Kirkkonummen kunnallisvero on ","nodeType":"text"},{"data":{"uri":"https://www.kirkkonummi.fi/tietoa-taloudesta"},"content":[{"data":{},"marks":[],"value":"19,75%","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". Taloudellisesti tästä siis ei hyödy kunta, eikä välttämättä perheen vanhemmatkaan.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Entäs sitten lapsi ja perhe? Vanhempainvapaa loppuu kun lapsi on ","nodeType":"text"},{"data":{"uri":"https://www.kela.fi/vanhempainraha"},"content":[{"data":{},"marks":[],"value":"noin 11,5 kuukauden ikäinen","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", jolloin suurin osa vauvoista ","nodeType":"text"},{"data":{"uri":"https://www.mll.fi/vanhemmille/lapsen-kasvu-ja-kehitys/0-1-v/vauvan-liikunnallinen-kehitys/"},"content":[{"data":{},"marks":[],"value":"ei osaa kävellä","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":", eikä ","nodeType":"text"},{"data":{"uri":"https://www.mll.fi/vanhemmille/lapsen-kasvu-ja-kehitys/0-1-v/vauvan-sosiaalinen-kehitys/"},"content":[{"data":{},"marks":[],"value":"puhua","nodeType":"text"}],"nodeType":"hyperlink"},{"data":{},"marks":[],"value":". Päiväkodissa joudutaan siis antamaan erityistä huomiota pienokaiselle, vanhemmat eivät pääse seuraamaan ja nauttimaan lapsen kehityksestä. Lapsellakaan ei todennäköisesti ole kovin kivaa, sillä tuossa iässä he myös vierastavat kovasti eivätkä kaipaa ikäistään leikkiseuraa.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Pidetään Kirkkonummi lapsille ja lapsiperheille ystävällisenä kuntana ja palautetaan kotihoidon tuen kuntalisä!","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[{"type":"italic"}],"value":"Julkaistu Kirkkonummen Sanomissa 20.1.2021.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[{"type":"italic"}],"value":"Korjattu 4.2.2021 palvelusetelin maksimihinta kuukaudessa 862 eurosta 1 293 euroon.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[{"type":"italic"}],"value":"Korjattu 14.2.2021 vanhempainvapaan kesto.","nodeType":"text"},{"data":{},"marks":[],"value":"\\n\\n","nodeType":"text"}],"nodeType":"paragraph"}],"nodeType":"document"}',
        references: [],
    },
    headerImage: {
        localFile: {
            childImageSharp: {
                gatsbyImageData: {
                    images: {
                        sources: [
                            {
                                srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/6Icujv1bhkF1X6Ngy6Ge1X/0d91fe8e1c8e0b3267454bbcf2516be0/kotihoidossa.jpg?w=1008&h=567&q=50&fm=webp 1008w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/6Icujv1bhkF1X6Ngy6Ge1X/0d91fe8e1c8e0b3267454bbcf2516be0/kotihoidossa.jpg?w=2015&h=1134&q=50&fm=webp 2015w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/6Icujv1bhkF1X6Ngy6Ge1X/0d91fe8e1c8e0b3267454bbcf2516be0/kotihoidossa.jpg?w=4000&h=2250&q=50&fm=webp 4000w',
                                sizes: '(min-width: 4030px) 4030px, 100vw',
                                type: 'image/webp',
                            },
                        ],
                        fallback: {
                            src: 'https://images.ctfassets.net/44t6u1r4zgqq/6Icujv1bhkF1X6Ngy6Ge1X/0d91fe8e1c8e0b3267454bbcf2516be0/kotihoidossa.jpg?w=1008&h=567&fl=progressive&q=50&fm=jpg',
                            srcSet: 'https://images.ctfassets.net/44t6u1r4zgqq/6Icujv1bhkF1X6Ngy6Ge1X/0d91fe8e1c8e0b3267454bbcf2516be0/kotihoidossa.jpg?w=1008&h=567&fl=progressive&q=50&fm=jpg 1008w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/6Icujv1bhkF1X6Ngy6Ge1X/0d91fe8e1c8e0b3267454bbcf2516be0/kotihoidossa.jpg?w=2015&h=1134&fl=progressive&q=50&fm=jpg 2015w,\nhttps://images.ctfassets.net/44t6u1r4zgqq/6Icujv1bhkF1X6Ngy6Ge1X/0d91fe8e1c8e0b3267454bbcf2516be0/kotihoidossa.jpg?w=4000&h=2250&fl=progressive&q=50&fm=jpg 4000w',
                            sizes: '(min-width: 4030px) 4030px, 100vw',
                        },
                    },
                    layout: 'constrained',
                    width: 4030,
                    height: 2267,
                    placeholder: {
                        fallback:
                            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAALABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAMEAgX/xAAlEAACAQMDAwUBAAAAAAAAAAABAgMABBESISITMWEFMkFRkdH/xAAWAQEBAQAAAAAAAAAAAAAAAAADAgT/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQIRA//aAAwDAQACEQMRAD8AQ3paW1ujStHFEoDaw2dX9zWZ7bCLcLOWkO4Yp99uOx/aplRXtLgyDWY/Zr5ad8bZrnXUj9ReRGXA2Pmi605wuSkXco4nrgrscRd/NFIjlc6gTnSxAyPiitcpNaG2f//Z',
                    },
                },
            },
        } as unknown as ImageDataLike,
        description: 'Kuva neulotusta pehmolelusta, taustalla erinäisiä lasten leluja.',
    },
    mobileHeaderImage: {
        localFile: {
            childImageSharp: {
                gatsbyImageData: {
                    layout: 'constrained',
                    placeholder: {
                        fallback:
                            'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAMEAQL/xAAXAQEBAQEAAAAAAAAAAAAAAAABAwIE/9oADAMBAAIQAxAAAAGHN+UZtKb5mUJjn1//xAAbEAADAAIDAAAAAAAAAAAAAAAAAQIDExESIv/aAAgBAQABBQLWkT2mdVsqMck5ebbkhDfo/8QAFREBAQAAAAAAAAAAAAAAAAAAEAH/2gAIAQMBAT8BIf/EABoRAAEFAQAAAAAAAAAAAAAAAAABAhASITH/2gAIAQIBAT8Bwug/kf/EAB4QAAICAQUBAAAAAAAAAAAAAAABESEQAhIiUWFx/9oACAEBAAY/AoUv0dWydpJwSS7xd/TVj//EABsQAQADAQADAAAAAAAAAAAAAAEAESExQWGR/9oACAEBAAE/ITSpX1NNZKqcSl+4BbK7bEqI9UscgKA0X5TLAAQyXP/aAAwDAQACAAMAAAAQOD8B/8QAGBEBAAMBAAAAAAAAAAAAAAAAAQAQMSH/2gAIAQMBAT8QFxnZor//xAAYEQACAwAAAAAAAAAAAAAAAAABEBEhMf/aAAgBAgEBPxA0lOq//8QAHhABAAIBBQEBAAAAAAAAAAAAAQARITFBUWFxobH/2gAIAQEAAT8QCcSm9ng4ierWjc5icojYJK+ylicrAfsd6XxanRLfT5iV3vWM7RQstBWIq5//2Q==',
                    },
                    images: {
                        fallback: {
                            src: '/static/e66d66a99b231f600c7dcae882e0520c/0c6e4/kotihoidossa.jpg',
                            srcSet: '/static/e66d66a99b231f600c7dcae882e0520c/d558d/kotihoidossa.jpg 567w,\n/static/e66d66a99b231f600c7dcae882e0520c/52bbf/kotihoidossa.jpg 1134w,\n/static/e66d66a99b231f600c7dcae882e0520c/0c6e4/kotihoidossa.jpg 2267w',
                            sizes: '(min-width: 2267px) 2267px, 100vw',
                        },
                        sources: [
                            {
                                srcSet: '/static/e66d66a99b231f600c7dcae882e0520c/b709e/kotihoidossa.webp 567w,\n/static/e66d66a99b231f600c7dcae882e0520c/df689/kotihoidossa.webp 1134w,\n/static/e66d66a99b231f600c7dcae882e0520c/20300/kotihoidossa.webp 2267w',
                                type: 'image/webp',
                                sizes: '(min-width: 2267px) 2267px, 100vw',
                            },
                        ],
                    },
                    width: 2267,
                    height: 2267,
                },
            },
        } as unknown as ImageDataLike,
        description: 'Kuva neulotusta pehmolelusta, taustalla erinäisiä lasten leluja.',
    },
    metadata: {
        tags: varhaiskasvatusTags,
    },
    title: 'Kotihoidon tuen kuntalisä - pieni kustannus, suuri merkitys',
    updatedAt: '2022-06-19T17:40:37.691Z',
    publishedOld: '2021-02-04',
    published: '2022-06-18T18:32:04.133Z',
    excerpt:
        'Joulun alla Kirkkonummen kunnanvaltuusto päätti lopettaa kotihoidon tuen kuntalisän, eli niin kutsutun Kirkkonummi-lisän. Kuntalisää Kirkkonummella maksettiin 150 euroa kuukaudessa per alle 2-vuotias lapsi, joka on kotihoidossa',
    slug: 'kotihoidon-tuen-kuntalisa',
}

export const excerptList = [
    healthBelongsToAll,
    soteIsBedrock,
    whatIfNoHealthCareCenter,
    perusturvajaostoWhatIs,
    runningForAluevaalit,
    daycareNeedsTeachers,
    wellPlannedIsWellDoneBut,
    daycareCannotBeCompromised,
    preschoolClubChildBenefit,
    kirkkonummiAddIsYourBenefit,
    homecareMunicipalityExtra,
]
