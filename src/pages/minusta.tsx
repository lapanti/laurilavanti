import type { ImageDataLike } from 'gatsby-plugin-image'

import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import tw from 'twin.macro'

import H2 from '../components/H2'
import Image from '../components/Image'
import Page from '../components/Page'
import Paragraph from '../components/Paragraph'

const P = tw(Paragraph)`
    col-start-3
`

const About = (): JSX.Element => {
    const data = useStaticQuery<{ wall: ImageDataLike; biking: ImageDataLike }>(graphql`
        query {
            wall: file(relativePath: { eq: "kirkkonummen-graffitiseina.jpg" }) {
                childImageSharp {
                    gatsbyImageData(placeholder: BLURRED)
                }
            }
            biking: file(relativePath: { eq: "pyoraily-harjoituksia.jpg" }) {
                childImageSharp {
                    gatsbyImageData(placeholder: BLURRED)
                }
            }
        }
    `)

    return (
        <Page
            title="Minusta"
            description="Olen ikäni Kirkkonummella asunut 29-vuotias isä, ohjelmistokehittäjä ja diplomi-insinööri. Haluan huolehtia siitä, että lapsilla ja nuorilla on hyvä kasvuympäristö ja valoisa tulevaisuus."
            metaImage={data.biking}
        >
            <P>
                29-vuotias isä, ohjelmistokehittäjä ja diplomi-insinööri Kirkkonummelta. Tasa-arvoa tavoitteleva
                liberaali, jonka mielestä ketään ei jätetä.
            </P>

            <H2>Luottamustoimet</H2>
            <P>
                Ensimmäinen luottamustoimeni oli, kun minut valittiin edustamaan Masalan lukiota Kirkkonummen kunnan
                nuorisovaltuustoon vuonna 2010. Nuorisovaltuustossa toimin sen hallituksen puheenjohtajana. Kunnan
                antaman budjetin päätimme valtuustossa käyttää Kirkkonummella yhä käytössä olevaan graffitiseinään.
                Byrokratiaan ja paikan valintaan meni lähes koko vuosi, vaikka pohjatöitä oli jo edellisten
                nuorisovaltuustojen toimesta tehty. Lopulta kuitenkin löydettiin graffitiseinälle paikka Varuboden
                Areenan vierestä, joka kelpasi sekä kunnalle että asukkaille.
            </P>
            <Image
                imageData={data.wall}
                alt="Kirkkonummen graffitiseinä ja Varuboden Areena"
                caption="Kirkkonummen graffitiseinä"
            />
            <P>
                Yliopistossa toimin kolme vuotta vasta perustetun amerikkalaisen jalkapallojoukkueen Aalto Predatorsin
                hallituksessa, joista kaksi jälkimmäistä joukkueen puheenjohtajana. Näiden ensimmäisten vuosien toimme
                urheiluun sopivan verran urheilujuhlan tuntua, järjestämällä ottelumme Otaniemen perinteikkäässä
                Otahallissa, live-striimauksineen ja selostuksineen. Viimeisenä aktiivi-vuotenani toimin myös kiltani
                (Otaniemen teekkarien vastine ainejärjestölle) hallituksessa vastaten ulkomaalaisista opiskelijoistamme.
            </P>
            <P>
                Sen jälkeen työelämä veikin minut mukanaan, kunnes 2021 päätin asettua kuntavaaleissa Vihreiden
                ehdokkaaksi. Kirkkonummella tärkeimpänä näin lapsiperheistä ja nuorista huolehtimisen. Vaikka en
                kunnanvaltuustoon päässytkään, sain varajäsenyyden Suomenkieliseen varhaiskasvatus- ja
                koulutuslautakuntaan sekä varsinaisen jäsenyyden Perusturvajaokseen.
            </P>

            <H2>Työelämä</H2>
            <P>
                Aloitin täysipäiväisen työskentelyn jo ennen valmistumistani, ja olenkin nyt työskennellyt jo kuusi
                vuotta ohjelmistokehittäjänä. Lyhyehkön urani aikana olen myös päässyt näkemään usean erilaisen
                työympäristön. Olen ollut kahdessa kansainvälisessä konsulttitoimistossa, ja sitä kautta tutustunut myös
                useampaan isoon suomalaiseen yhtiöön. Olen ollut myös saksalaisessa muotiverkkokaupassa töissä ja
                nykyään viihdyn Verkkokauppa.comilla.
            </P>
            <P>
                Työ ohjelmistotaloissa sekä kaupan alan yrityksissä on opettanut sitä, millaista hyvä johtaminen voi
                olla sekä mitä yritys oikeasti tarvitsee menestyäkseen (voin antaa vihjeen, se kävelee kahdella
                jalalla), konsultoinnin kautta olen päässyt tutustumaan myös muihin aloihin, kuten teollisuuteen ja
                operaattoreihin. Kaikissa näistä yrityksistä suunta on ollut selkeästi asiakas- ja työnekijäkeskeisempi,
                ja haluaisinkin tätä samaa mentaliteettia viedä myös julkishallinnon puolelle.
            </P>

            <H2>Vapaa-aika</H2>
            <P>
                Suurin osa vapaa-ajastani kuluu lasteni (2018 syntyneen tyttären ja 2020 syntyneen pojan) kanssa,
                leikkien ja ulkoillen. Lapseni ovatkin minulle tärkeintä, ja haluan tehdä kaikkeni, että omillani ja
                muidenkin lapsilla on hyvä ja turvallista kasvaa.
            </P>
            <Image
                imageData={data.biking}
                alt="Pyöräilyn harjoittelua tyttäreni kanssa"
                caption="Pyöräilyn harjoittelua tyttäreni kanssa"
            />
            <P>
                Nykyään harrastukseni ovat ajan puutteen takia rajoittuneet pyöräilyyn, sählyyn ja pelaamiseen, mutta
                aiemmin olen harrastanut kaikkea laidasta laitaan ja erityisesti joukkueurheilu on ollut aina lähellä
                sydäntäni.
            </P>
        </Page>
    )
}

export default About
