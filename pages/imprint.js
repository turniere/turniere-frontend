import Head                   from 'next/head';
import React                  from 'react';
import { Container }          from 'reactstrap';

import { TurniereNavigation } from '../js/components/Navigation';
import { BigImage }           from '../js/components/BigImage';
import { Footer }             from '../js/components/Footer';
import { verifyCredentials }  from '../js/api';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/everypage.css';

function Main() {
    return (
        <div className="main running-text">
            <ImprintText/>
        </div>
    );
}

function ImprintText(){
    return (
        <Container>
            <h3>
                Angaben gemäß §5 TMG:
            </h3>
            <p>
                Jonas Seydel<br/>
                August-Euler-Weg 3<br/>
                76133 Karlsruhe<br/>
                Germany<br/>
            </p>
            <p>
                <strong>Vertreten durch</strong><br/>
                Jonas Seydel
            </p>
            <p>
                <strong>Kontakt</strong><br/>
                jon@s-seydel.de
            </p>
            <h3>Haftungsausschluss</h3>
            <h4>Haftung für Inhalte</h4>
            <p>
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität
                der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
                Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach
                Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung
                der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist
                jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
                entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
            <h4>Haftung für Links</h4>
            <p>
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können
                wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der
                jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung
                auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine
                permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung
                nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
            <h4>Urheberrecht</h4>
            <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
                Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
                bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind
                nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber
                erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
                gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
                entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
        </Container>
    );
}


export default class ImprintPage extends React.Component {

    componentDidMount() {
        verifyCredentials();
    }

    render() {
        return (
            <div>
                <Head>
                    <title>Impressum: turnie.re</title>
                </Head>
                <TurniereNavigation/>
                <BigImage text="Impressum / Haftungs&shy;ausschluss"/>
                <Main/>
                <Footer/>
            </div>
        );
    }
}
