import Head from 'next/head'
import React from 'react'
import {Container} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BigImage, Footer, TurniereNavigation} from '../js/CommonComponents.js'
import '../static/everypage.css'

function Main() {
    return (
        <div className="main running-text">
            <PrivacyText/>
        </div>
    );
}

function PrivacyText(){
    return (<Container>
        <p>
            Die nachfolgende Datenschutzerklärung gilt für die Nutzung unseres Online-Angebots turnie.re (nachfolgend
            „Website“).<br/>
            Wir messen dem Datenschutz große Bedeutung bei. Die Erhebung und Verarbeitung Ihrer personenbezogenen Daten
            geschieht
            unter Beachtung der geltenden datenschutzrechtlichen Vorschriften, insbesondere der
            Datenschutzgrundverordnung
            (DSGVO).
        </p>


        <h3>1 Verantwortlicher</h3>
        <p>
            Verantwortlicher für die Erhebung, Verarbeitung und Nutzung Ihrer personenbezogenen Daten im Sinne von Art.
            4 Nr. 7
            DSGVO ist
        </p>
        <p>
            Jonas Seydel<br/>
            August-Euler-Weg 3<br/>
            76133 Karlsruhe<br/>
            Germany<br/>
            jon@s-seydel.de<br/>
        </p>
        <p>
            Sofern Sie der Erhebung, Verarbeitung oder Nutzung Ihrer Daten durch uns nach Maßgabe dieser
            Datenschutzbestimmungen
            insgesamt oder für einzelne Maßnahmen widersprechen wollen, können Sie Ihren Widerspruch an den
            Verantwortlichen
            richten.<br/>
            Sie können diese Datenschutzerklärung jederzeit speichern und ausdrucken.
        </p>


        <h3>2 Allgemeine Zwecke der Verarbeitung</h3>
        <p>
            Wir verwenden personenbezogene Daten zum Zweck des Betriebs der Website.
        </p>


        <h3>3 Welche Daten wir verwenden und warum</h3>

        <h4>3.1 Hosting</h4>
        <p>
            Die von uns in Anspruch genommenen Hosting-Leistungen dienen der Zurverfügungstellung der folgenden
            Leistungen:
            Infrastruktur- und Plattformdienstleistungen, Rechenkapazität, Speicherplatz und Datenbankdienste,
            Sicherheitsleistungen sowie technische Wartungsleistungen, die wir zum Zweck des Betriebs der Website
            einsetzen.<br/>
            Hierbei verarbeiten wir, bzw. unser Hostinganbieter Bestandsdaten, Kontaktdaten, Inhaltsdaten,
            Vertragsdaten,
            Nutzungsdaten, Meta- und Kommunikationsdaten von Kunden, Interessenten und Besuchern dieser Website auf
            Grundlage
            unserer berechtigten Interessen an einer effizienten und sicheren Zurverfügungstellung unserer Website gem.
            Art. 6
            Abs. 1 S. 1 f) DSGVO i.V.m. Art. 28 DSGVO.
        </p>

        <h4>3.2 Zugriffsdaten</h4>
        <p>
            Wir sammeln Informationen über Sie, wenn Sie diese Website nutzen. Wir erfassen automatisch Informationen
            über Ihr
            Nutzungsverhalten und Ihre Interaktion mit uns und registrieren Daten zu Ihrem Computer oder Mobilgerät. Wir
            erheben,
            speichern und nutzen Daten über jeden Zugriff auf unsere Website (sogenannte Serverlogfiles). Zu den
            Zugriffsdaten
            gehören:
        </p>
        <ul>
            <li>Name und URL der abgerufenen Datei</li>
            <li>Datum und Uhrzeit des Abrufs</li>
            <li>übertragene Datenmenge</li>
            <li>Meldung über erfolgreichen Abruf (HTTP response code)</li>
            <li>Browsertyp und Browserversion</li>
            <li>Betriebssystem</li>
            <li>Referer URL (d.h. die zuvor besuchte Seite)</li>
            <li>Websites, die vom System des Nutzers über unsere Website aufgerufen werden</li>
            <li>Internet-Service-Provider des Nutzers</li>
            <li>IP-Adresse und der anfragende Provider</li>
        </ul>
        <p>
            Wir nutzen diese Protokolldaten ohne Zuordnung zu Ihrer Person oder sonstiger Profilerstellung für
            statistische
            Auswertungen zum Zweck des Betriebs, der Sicherheit und der Optimierung unserer Website, aber auch zur
            anonymen
            Erfassung der Anzahl der Besucher auf unserer Website (traffic) sowie zum Umfang und zur Art der Nutzung
            unserer
            Website und Dienste, ebenso zu Abrechnungszwecken, um die Anzahl der von Kooperationspartnern erhaltenen
            Clicks zu
            messen. Aufgrund dieser Informationen können wir personalisierte und standortbezogene Inhalte zur Verfügung
            stellen
            und den Datenverkehr analysieren, Fehler suchen und beheben und unsere Dienste verbessern.<br/>
            Hierin liegt auch unser berechtigtes Interesse gemäß Art 6 Abs. 1 S. 1 f) DSGVO.<br/>
            Wir behalten uns vor, die Protokolldaten nachträglich zu überprüfen, wenn aufgrund konkreter Anhaltspunkte
            der
            berechtigte Verdacht einer rechtswidrigen Nutzung besteht. IP-Adressen speichern wir für einen begrenzten
            Zeitraum in
            den Logfiles, wenn dies für Sicherheitszwecke erforderlich oder für die Leistungserbringung oder die
            Abrechnung einer
            Leistung nötig ist, z. B. wenn Sie eines unserer Angebote nutzen. Nach Abbruch des Vorgangs der Bestellung
            oder nach
            Zahlungseingang löschen wir die IP-Adresse, wenn diese für Sicherheitszwecke nicht mehr erforderlich ist.
            IP-Adressen
            speichern wir auch dann, wenn wir den konkreten Verdacht einer Straftat im Zusammenhang mit der Nutzung
            unserer
            Website haben. Außerdem speichern wir als Teil Ihres Accounts das Datum Ihres letzten Besuchs (z.B. bei
            Registrierung,
            Login, Klicken von Links etc.).
        </p>

        <h4>3.3 Cookies</h4>
        <p>
            Wir verwenden sogenannte Session-Cookies, um unsere Website zu optimieren. Ein Session-Cookie ist eine
            kleine
            Textdatei, die von den jeweiligen Servern beim Besuch einer Internetseite verschickt und auf Ihrer
            Festplatte
            zwischengespeichert wird. Diese Datei als solche enthält eine sogenannte Session-ID, mit welcher sich
            verschiedene
            Anfragen Ihres Browsers der gemeinsamen Sitzung zuordnen lassen. Dadurch kann Ihr Rechner wiedererkannt
            werden, wenn
            Sie auf unsere Website zurückkehren. Diese Cookies werden gelöscht, nachdem Sie Ihren Browser schließen. Sie
            dienen z.
            B. dazu, dass Sie die Warenkorbfunktion über mehrere Seiten hinweg nutzen können.<br/>
            Wir verwenden in geringem Umfang auch persistente Cookies (ebenfalls kleine Textdateien, die auf Ihrem
            Endgerät
            abgelegt werden), die auf Ihrem Endgerät verbleiben und es uns ermöglichen, Ihren Browser beim nächsten
            Besuch
            wiederzuerkennen. Diese Cookies werden auf Ihrer Festplatte gespeichert und löschen sich nach der
            vorgegebenen Zeit
            von allein. Ihre Lebensdauer beträgt 1 Monat bis 10 Jahre. So können wir Ihnen unser Angebot
            nutzerfreundlicher,
            effektiver und sicherer präsentieren und Ihnen beispielsweise speziell auf Ihre Interessen abgestimmte
            Informationen
            auf der Seite anzeigen.<br/>
            Unser berechtigtes Interesse an der Nutzung der Cookies gemäß Art 6 Abs. 1 S. 1 f) DSGVO liegt darin, unsere
            Website
            nutzerfreundlicher, effektiver und sicherer zu machen.<br/>
            In den Cookies werden etwa folgende Daten und Informationen gespeichert:
        </p>
        <ul>
            <li>Log-In-Informationen</li>
            <li>Spracheinstellungen</li>
            <li>eingegebene Suchbegriffe</li>
            <li>Informationen über die Anzahl der Aufrufe unserer Website sowie Nutzung einzelner Funktionen unseres
                Internetauftritts.
            </li>
        </ul>
        <p>
            Bei Aktivierung des Cookies wird diesem eine Identifikationsnummer zugewiesen und eine Zuordnung Ihrer
            personenbezogenen Daten zu dieser Identifikationsnummer wird nicht vorgenommen. Ihr Name, Ihre IP-Adresse
            oder
            ähnliche Daten, die eine Zuordnung des Cookies zu Ihnen ermöglichen würden, werden nicht in den Cookie
            eingelegt. Auf
            Basis der Cookie-Technologie erhalten wir lediglich pseudonymisierte Informationen, beispielsweise darüber,
            welche
            Seiten unseres Shops besucht wurden, welche Produkte angesehen wurden, etc.<br/>
            Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies vorab informiert werden und im
            Einzelfall
            entscheiden können, ob Sie die Annahme von Cookies für bestimmte Fälle oder generell ausschließen, oder dass
            Cookies
            komplett verhindert werden. Dadurch kann die Funktionalität der Website eingeschränkt werden.
        </p>

        <h4>3.4 Nutzerkonto</h4>
        <p>Sie können auf unserer Website ein Nutzerkonto anlegen. Wünschen Sie dies, so benötigen wir die beim Login
            abgefragten
            personenbezogenen Daten. Beim späteren Einloggen werden nur Ihre Email bzw. Benutzername und das von Ihnen
            gewählte
            Passwort benötigt.<br/>
                Für die Neuregistrierung erheben wir Stammdaten (z. B. Name, Adresse), Kommunikationsdaten (z. B.
                E-Mail-Adresse)
                sowie Zugangsdaten (Benutzername u. Passwort).<br/>
                Sie können ein einmal angelegtes Nutzerkonto jederzeit von uns löschen lassen, ohne dass hierfür andere
                als die
                Übermittlungskosten nach den Basistarifen entstehen. Eine Mitteilung in Textform an die unter Ziffer 1
                genannten
                Kontaktdaten (z.B. E-Mail, Fax, Brief) reicht hierfür aus. Wir werden dann Ihre gespeicherten
                personenbezogenen Daten
                löschen, soweit wir diese nicht noch zur Abwicklung von Bestellungen oder aufgrund gesetzlicher
                Aufbewahrungspflichten
                speichern müssen.<br/>
                Rechtgrundlage für die Verarbeitung dieser Daten ist Ihre Einwilligung gemäß Art. 6 Abs. 1 S. 1 a)
                DSGVO.
        </p>

        <h4>3.5 E-Mail Kontakt</h4>
        <p>
            Wenn Sie mit uns in Kontakt treten (z. B. per Kontaktformular oder E-Mail), verarbeiten wir Ihre Angaben zur
            Bearbeitung der Anfrage sowie für den Fall, dass Anschlussfragen entstehen.
            Erfolgt die Datenverarbeitung zur Durchführung vorvertraglicher Maßnahmen, die auf Ihre Anfrage hin
            erfolgen, bzw.,
            wenn Sie bereits unser Kunde sind, zur Durchführung des Vertrages, ist Rechtsgrundlage für diese
            Datenverarbeitung
            Art. 6 Abs. 1 S. 1 b) DSGVO.
            Weitere personenbezogene Daten verarbeiten wir nur, wenn Sie dazu einwilligen (Art. 6 Abs. 1 S. 1 a) DSGVO)
            oder wir
            ein berechtigtes Interesse an der Verarbeitung Ihrer Daten haben (Art. 6 Abs. 1 S. 1 f) DSGVO). Ein
            berechtigtes
            Interesse liegt z. B. darin, auf Ihre E-Mail zu antworten.
        </p>


        <h3>4 Speicherdauer</h3>
        <p>
            Sofern nicht spezifisch angegeben speichern wir personenbezogene Daten nur so lange, wie dies zur Erfüllung
            der
            verfolgten Zwecke notwendig ist.<br/>
            In einigen Fällen sieht der Gesetzgeber die Aufbewahrung von personenbezogenen Daten vor, etwa im Steuer-
            oder
            Handelsrecht. In diesen Fällen werden die Daten von uns lediglich für diese gesetzlichen Zwecke weiter
            gespeichert,
            aber nicht anderweitig verarbeitet und nach Ablauf der gesetzlichen Aufbewahrungsfrist gelöscht.
        </p>


        <h3>5 Ihre Rechte als von der Datenverarbeitung Betroffener</h3>
        <p>
            Nach den anwendbaren Gesetzen haben Sie verschiedene Rechte bezüglich Ihrer personenbezogenen Daten. Möchten
            Sie diese
            Rechte geltend machen, so richten Sie Ihre Anfrage bitte per E-Mail oder per Post unter eindeutiger
            Identifizierung
            Ihrer Person an die in Ziffer 1 genannte Adresse.<br/>
            Nachfolgend finden Sie eine Übersicht über Ihre Rechte.
        </p>

        <h4>5.1 Recht auf Bestätigung und Auskunft</h4>
        <p>
            Sie haben das Recht auf eine übersichtliche Auskunft über die Verarbeitung Ihrer personenbezogenen
            Daten.<br/>
            Im Einzelnen:<br/>

            Sie haben jederzeit das Recht, von uns eine Bestätigung darüber zu erhalten, ob Sie betreffende
            personenbezogene Daten
            verarbeitet werden. Ist dies der Fall, so haben Sie das Recht, von uns eine unentgeltliche Auskunft über die
            zu Ihnen
            gespeicherten personenbezogenen Daten nebst einer Kopie dieser Daten zu verlangen. Des Weiteren besteht ein
            Recht auf
            folgende Informationen:
        </p>
        <ol>
            <li>die Verarbeitungszwecke;</li>
            <li>die Kategorien personenbezogener Daten, die verarbeitet werden;</li>
            <li>die Empfänger oder Kategorien von Empfängern, gegenüber denen die personenbezogenen Daten offengelegt
                worden sind
                oder noch offengelegt werden, insbesondere bei Empfängern in Drittländern oder bei internationalen
                Organisationen;
            </li>
            <li>falls möglich, die geplante Dauer, für die die personenbezogenen Daten gespeichert werden, oder, falls
                dies nicht
                möglich ist, die Kriterien für die Festlegung dieser Dauer;
            </li>
            <li>das Bestehen eines Rechts auf Berichtigung oder Löschung der Sie betreffenden personenbezogenen Daten
                oder auf
                Einschränkung der Verarbeitung durch den Verantwortlichen oder eines Widerspruchsrechts gegen diese
                Verarbeitung;
            </li>
            <li>das Bestehen eines Beschwerderechts bei einer Aufsichtsbehörde;</li>
            <li>wenn die personenbezogenen Daten nicht bei Ihnen erhoben werden, alle verfügbaren Informationen über die
                Herkunft
                der Daten;
            </li>
            <li>das Bestehen einer automatisierten Entscheidungsfindung einschließlich Profiling gemäß Art. 22 Abs. 1
                und 4 DSGVO
                und – zumindest in diesen Fällen – aussagekräftige Informationen über die involvierte Logik sowie die
                Tragweite
                und die angestrebten Auswirkungen einer derartigen Verarbeitung für Sie.
            </li>
        </ol>

        <p>
            Werden personenbezogene Daten an ein Drittland oder an eine internationale Organisation übermittelt, so
            haben Sie das
            Recht, über die geeigneten Garantien gemäß Art. 46 DSGVO im Zusammenhang mit der Übermittlung unterrichtet
            zu werden.
        </p>

        <h4>5.2 Recht auf Berichtigung</h4>
        <p>
            Sie haben das Recht, von uns die Berichtigung und ggf. auch Vervollständigung Sie betreffender
            personenbezogener Daten
            zu verlangen.<br/>
            Im Einzelnen:<br/>
            Sie haben das Recht, von uns unverzüglich die Berichtigung Sie betreffender unrichtiger personenbezogener
            Daten zu
            verlangen. Unter Berücksichtigung der Zwecke der Verarbeitung haben Sie das Recht, die Vervollständigung
            unvollständiger personenbezogener Daten – auch mittels einer ergänzenden Erklärung – zu verlangen.<br/>
        </p>

        <h4>5.3 Recht auf Löschung ("Recht auf Vergessenwerden")</h4>
        <p>
            In einer Reihe von Fällen sind wir verpflichtet, Sie betreffende personenbezogene Daten zu löschen.<br/>
            Im Einzelnen:<br/>
            Sie haben gemäß Art. 17 Abs. 1 DSGVO das Recht, von uns zu verlangen, dass Sie betreffende personenbezogene
            Daten
            unverzüglich gelöscht werden, und wir sind verpflichtet, personenbezogene Daten unverzüglich zu löschen,
            sofern einer
            der folgenden Gründe zutrifft:
        </p>
        <ol>
            <li>Die personenbezogenen Daten sind für die Zwecke, für die sie erhoben oder auf sonstige Weise verarbeitet
                wurden,
                nicht mehr notwendig.
            </li>
            <li>Sie widerrufen Ihre Einwilligung, auf die sich die Verarbeitung gemäß Art. 6 Abs. 1 S. 1 a) DSGVO oder
                Art. 9 Abs.
                2 a) DSGVO stützte, und es fehlt an einer anderweitigen Rechtsgrundlage für die Verarbeitung.
            </li>
            <li>Sie legen gemäß Art. 21 Abs. 1 DSGVO Widerspruch gegen die Verarbeitung ein und es liegen keine
                vorrangigen
                berechtigten Gründe für die Verarbeitung vor, oder Sie legen gemäß Art. 21 Abs. 2 DSGVO Widerspruch
                gegen die
                Verarbeitung ein.
            </li>
            <li>Die personenbezogenen Daten wurden unrechtmäßig verarbeitet.</li>
            <li>Die Löschung der personenbezogenen Daten ist zur Erfüllung einer rechtlichen Verpflichtung nach dem
                Unionsrecht
                oder dem Recht der Mitgliedstaaten erforderlich, dem wir unterliegen.
            </li>
            <li>Die personenbezogenen Daten wurden in Bezug auf angebotene Dienste der Informationsgesellschaft gemäß
                Art. 8 Abs.
                1 DSGVO erhoben.
            </li>
        </ol>
        <p>
            Haben wir die personenbezogenen Daten öffentlich gemacht und sind wir gemäß Art. 17 Abs. 1 DSGVO zu deren
            Löschung
            verpflichtet, so treffen wir unter Berücksichtigung der verfügbaren Technologie und der
            Implementierungskosten
            angemessene Maßnahmen, auch technischer Art, um für die Datenverarbeitung Verantwortliche, die die
            personenbezogenen
            Daten verarbeiten, darüber zu informieren, dass Sie von ihnen die Löschung aller Links zu diesen
            personenbezogenen
            Daten oder von Kopien oder Replikationen dieser personenbezogenen Daten verlangt haben.
        </p>

        <h4>5.4 Recht auf Einschränkung der Verarbeitung</h4>
        <p>
            In einer Reihe von Fällen sind Sie berechtigt, von uns eine Einschränkung der Verarbeitung Ihrer
            personenbezogenen
            Daten zu verlangen.<br/>
            Im Einzelnen:<br/>
            Sie haben das Recht, von uns die Einschränkung der Verarbeitung zu verlangen, wenn eine der folgenden
            Voraussetzungen
            gegeben ist:
        </p>
        <ol>
            <li>die Richtigkeit der personenbezogenen Daten wird von Ihnen bestritten, und zwar für eine Dauer, die es
                uns
                ermöglicht, die Richtigkeit der personenbezogenen Daten zu überprüfen,
            </li>
            <li>die Verarbeitung unrechtmäßig ist und Sie die Löschung der personenbezogenen Daten ablehnten und
                stattdessen die
                Einschränkung der Nutzung der personenbezogenen Daten verlangt haben;
            </li>
            <li>wir die personenbezogenen Daten für die Zwecke der Verarbeitung nicht länger benötigen, Sie die Daten
                jedoch zur
                Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen benötigen, oder
            </li>
            <li>Sie Widerspruch gegen die Verarbeitung gemäß Art. 21 Abs. 1 DSGVO eingelegt haben, solange noch nicht
                feststeht,
                ob die berechtigten Gründe unseres Unternehmens gegenüber den Ihren überwiegen.
            </li>
        </ol>

        <h4>5.5 Recht auf Datenübertragbarkeit</h4>
        <p>
            Sie haben das Recht, Sie betreffende personenbezogene Daten maschinenlesbar zu erhalten, zu übermitteln,
            oder von uns
            übermitteln zu lasen.<br/>
            Im Einzelnen:<br/>
            Sie haben das Recht, die Sie betreffenden personenbezogenen Daten, die Sie uns bereitgestellt haben, in
            einem
            strukturierten, gängigen und maschinenlesbaren Format zu erhalten, und Sie haben das Recht, diese Daten
            einem anderen
            Verantwortlichen ohne Behinderung durch uns zu übermitteln, sofern
        </p>
        <ol>
            <li>die Verarbeitung auf einer Einwilligung gemäß Art. 6 Abs. 1 S. 1 a) DSGVO oder Art. 9 Abs. 2 a) DSGVO
                oder auf
                einem Vertrag gemäß Art. 6 Abs. 1 S. 1 b) DSGVO beruht und
            </li>
            <li>die Verarbeitung mithilfe automatisierter Verfahren erfolgt.</li>
        </ol>
        <p>
            Bei der Ausübung Ihres Rechts auf Datenübertragbarkeit gemäß Absatz 1 haben Sie das Recht, zu erwirken, dass
            die
            personenbezogenen Daten direkt von uns einem anderen Verantwortlichen übermittelt werden, soweit dies
            technisch
            machbar ist.
        </p>

        <h4>5.6 Widerspruchsrecht</h4>
        <p>
            Sie haben das Recht, auch einer rechtmäßigen Verarbeitung Ihrer personenbezogenen Daten durch uns zu
            widersprechen,
            wenn sich dies aus Ihrer besonderen Situation begründet und unsere Interessen an der Verarbeitung nicht
            überwiegen.<br/>
            Im Einzelnen:<br/>
            Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die
            Verarbeitung
            Sie betreffender personenbezogener Daten, die aufgrund von Art. 6 Abs. 1 S. 1 e) oder f) DSGVO erfolgt,
            Widerspruch
            einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling. Wir verarbeiten die
            personenbezogenen
            Daten nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen,
            die Ihre
            Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder
            Verteidigung von Rechtsansprüchen.<br/>
            Werden personenbezogene Daten von uns verarbeitet, um Direktwerbung zu betreiben, so haben Sie das Recht,
            jederzeit
            Widerspruch gegen die Verarbeitung Sie betreffender personenbezogener Daten zum Zwecke derartiger Werbung
            einzulegen;
            dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht.<br/>
            Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, gegen die Sie betreffende
            Verarbeitung Sie betreffender personenbezogener Daten, die zu wissenschaftlichen oder historischen
            Forschungszwecken
            oder zu statistischen Zwecken gemäß Art. 89 Abs. 1 DSGVO erfolgt, Widerspruch einzulegen, es sei denn, die
            Verarbeitung ist zur Erfüllung einer im öffentlichen Interesse liegenden Aufgabe erforderlich.<br/>
        </p>

        <h4>5.7 Automatisierte Entscheidungen einschließlich Profiling</h4>
        <p>
            Sie haben das Recht, nicht einer ausschließlich auf einer automatisierten Verarbeitung – einschließlich
            Profiling –
            beruhenden Entscheidung unterworfen zu werden, die Ihnen gegenüber rechtliche Wirkung entfaltet oder Sie in
            ähnlicher
            Weise erheblich beeinträchtigt.<br/>
            Eine automatisierte Entscheidungsfindung auf der Grundlage der erhobenen personenbezogenen Daten findet
            nicht statt.
        </p>

        <h4>5.8 Recht auf Widerruf einer datenschutzrechtlichen Einwilligung</h4>
        <p>
            Sie haben das Recht, eine Einwilligung zur Verarbeitung personenbezogener Daten jederzeit zu widerrufen.
        </p>

        <h4>5.9 Recht auf Beschwerde bei einer Aufsichtsbehörde</h4>
        <p>
            Sie haben das Recht auf Beschwerde bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat Ihres
            Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes, wenn Sie der Ansicht sind,
            dass die
            Verarbeitung der Sie betreffenden personenbezogenen Daten rechtswidrig ist.
        </p>


        <h3>6 Datensicherheit</h3>
        <p>
            Wir sind um die Sicherheit Ihrer Daten im Rahmen der geltenden Datenschutzgesetze und technischen
            Möglichkeiten
            maximal bemüht.<br/>
            Ihre persönlichen Daten werden bei uns verschlüsselt übertragen. Dies gilt für Ihre Bestellungen und auch
            für das
            Kundenlogin. Wir nutzen das Codierungssystem SSL (Secure Socket Layer), weisen jedoch darauf hin, dass die
            Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein
            lückenloser
            Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.<br/>
            Zur Sicherung Ihrer Daten unterhalten wir technische und organisatorische Sicherungsmaßnahmen entsprechend
            Art. 32
            DSGVO, die wir immer wieder dem Stand der Technik anpassen.<br/>
            Wir gewährleisten außerdem nicht, dass unser Angebot zu bestimmten Zeiten zur Verfügung steht; Störungen,
            Unterbrechungen oder Ausfälle können nicht ausgeschlossen werden. Die von uns verwendeten Server werden
            regelmäßig
            sorgfältig gesichert.
        </p>


        <h3>7 Weitergabe von Daten an Dritte, keine Datenübertragung ins Nicht-EU-Ausland</h3>
        <p>
            Grundsätzlich verwenden wir Ihre personenbezogenen Daten nur innerhalb unseres Unternehmens.<br/>
            Wenn und soweit wir Dritte im Rahmen der Erfüllung von Verträgen einschalten (etwa Logistik-Dienstleister),
            erhalten
            diese personenbezogene Daten nur in dem Umfang, in welchem die Übermittlung für die entsprechende Leistung
            erforderlich ist.<br/>
            Für den Fall, dass wir bestimmte Teile der Datenverarbeitung auslagern („Auftragsverarbeitung“),
            verpflichten wir
            Auftragsverarbeiter vertraglich dazu, personenbezogene Daten nur im Einklang mit den Anforderungen der
            Datenschutzgesetze zu verwenden und den Schutz der Rechte der betroffenen Person zu gewährleisten.<br/>
            Eine Datenübertragung an Stellen oder Personen außerhalb der EU außerhalb des in dieser Erklärung in Ziffer
            4
            genannten Falls findet nicht statt und ist nicht geplant.
        </p>


        <h3>8 Datenschutzbeauftragter</h3>
        <p>
            Sollten Sie noch Fragen oder Bedenken zum Datenschutz haben, so wenden Sie sich bitte an unseren
            Datenschutzbeauftragten:
        </p>
        <p>
            Jonas Seydel<br/>
            August-Euler-Weg 3<br/>
            76133 Karlsruhe<br/>
            Germany<br/>
            jon@s-seydel.de
        </p>

    </Container>);
}


export default () => (
    <div>
        <Head>
            <title>Datenschutzerklärung: turnie.re</title>
        </Head>
        <TurniereNavigation/>
        <BigImage text="Datenschutzerklärung"/>
        <Main/>
        <Footer/>
    </div>
);
