import Head from 'next/head'
import '../static/everypage.css'
import '../static/css/index.css'

const Index = (props) => {
    return (
        <div>
            <Nav/>
            <Bigimage text="Einfach Turniere organisieren"/>
            <Main/>
            <Footer/>
        </div>
    );
};

function Footer() {
    return (
        <footer className="footer mt-5 bg-dark text-light">
            <div className="container py-3">
                <div className="row">
                    <div className="col-md-6 text-center">
                        &copy; 2018 turnie.re &middot;
                        <a className="text-white" href="/privacy"> Datenschutzerklärung </a>
                        &middot;
                        <a className="text-white" href="/imprint"> Impressum</a>
                    </div>
                    <div className="col-md-6 text-center"><a href="#" className="text-white">zurück nach oben</a></div>
                </div>
            </div>
        </footer>
    );
}

function Bigimage(props) {
    return (
        <div className="big-image">
            <h1 className="display-1">{props.text}</h1>
        </div>
    );
}

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">turnie.re</a>
            <Betabadge/>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <Navlink target="/create" text="Turnier erstellen"/>
                    <Navlink target="/list" text="Öffentliche Turniere"/>
                    <Navlink target="/faq" text="FAQ"/>
                </ul>

                <LoginLogoutButtons/>
            </div>
        </nav>
    );
}

function Navlink(props) {
    return (
        <li className="nav-item active">
            <a className="nav-link" href={props.target}>{props.text}</a>
        </li>
    );
}

function Betabadge() {
    return <span className="badge badge-danger mr-2">BETA</span>;
}

function LoginLogoutButtons() {
    return (
        <div className="nav-item btn-group">
            <a className="btn navbar-btn btn-outline-success my-2 my-sm-0 px-5" role="button"
               href="/login">Login</a>
            <a className="btn navbar-btn btn-outline-success my-2 my-sm-0 px-5" role="button"
               href="/register">Registrieren</a>
        </div>
    );
}

function Main() {
    return (
        <main>
            <Marketing/>
            <MainPromotedLinks/>
            <MainBottomSummary/>
        </main>
    );
}

function Marketing() {
    return (
        <div className="container marketing my-5">
            <div className="row">

                <div className="col-lg-4">
                    <h2>Für jede Sportart</h2>
                    <p>
                        Egal, um welche Sportart es geht: Solange du mit mehreren Mannschaften ein Turnier veranstalten
                        willst, kann
                        turnie.re dir ein Turnier berechnen!
                    </p>
                </div>
                <div className="col-lg-4">
                    <h2>Beliebige Anzahl Teams</h2>
                    <p>
                        Egal, wie viele Teams du gerne in deinem Turnier hast, wir regeln das. Füge einfach deine Teams
                        hinzu
                        und schon sagen wir dir, wer gegen wen spielt.
                    </p>
                </div>
                <div className="col-lg-4">
                    <h2>Kostenlos</h2>
                    <p>
                        turnie.re ist ein kostenloser Service! Wir erheben keine Kosten und sind nur darauf aus, dein
                        Turnier-Management so einfach wie möglich zu gestalten.
                    </p>
                </div>

            </div>
            <Betawarning/>
        </div>
    );
}

function Betawarning() {
    return (
        <div className="alert alert-danger shadow-sm mt-4">
            <h4 className="alert-heading custom-font">Public Beta</h4>
            <p>
                Diese Website ist noch in der Entwicklung.<br/>
                Bei Problemen fülle bitte <a href="#" id="bugLink" className="alert-link">dieses </a>
                und für Feedback <a href="#" id="feedbackLink" className="alert-link">dieses</a> Formular aus.
            </p>
        </div>
    );
}

function MainBottomSummary() {
    return (<div className="container marketing my-5">
        <div className="row">

            <div className="col-lg-6">
                <h2>Was macht turnie.re?</h2>
                <p>
                    turnie.re berechnet dir ein Turnier. Allein aus den Team-Namen berechnen wir dir einen kompletten
                    Spielplan,
                    den du auch gleich mit allen Leuten teilen kannst, ohne dir Gedanken machen zu müssen, wer gegen wen
                    spielen
                    muss.<br/>
                    Du trägst ein, wer gewonnen hat, und turnie.re sagt, wer als nächstes spielt.
                </p>
            </div>
            <div className="col-lg-6">
                <h2>Ich habe einen Turniercode bekommen. Was nun?</h2>
                <p>
                    Der Turniercode führt dich direkt zu einem Turnier. Gebe dafür den Code <a className="text-success"
                                                                                               href="#turniercode-form">oben </a>
                    ein, dann wirst du sofort weitergeleitet.
                </p>
            </div>

        </div>
        <div className="my-5 text-center">
            <p>
                Noch fragen? Schau doch mal im <a className="text-success" href="/faq">FAQ</a> vorbei!
            </p>
        </div>
    </div>);
}

function MainPromotedLinks() {
    return (<div className="index-cards py-5">
        <PromotedLinkTournamentCode/>
        <PromotedLinkListTournaments/>
        <PromotedLinkCreateTournament/>
    </div>);
}

function PromotedLinkTournamentCode() {
    return (<div className="container card shadow-lg mt-3">
        <div className="card-body row">
            <form id="turniercode-form" className="col-lg-4" action="/t" method="get">
                <input className="form-control" type="search" name="code" placeholder="Turnier-Code"/>
                <button className="btn btn-outline-success w-100 my-2" type="submit">Turnier-Code öffnen</button>
            </form>
            <div className="col-lg-8">
                <p>Gib hier einen Turnier Code ein, um direkt zum entsprechenden Turnier zu gelangen.</p>
            </div>
        </div>
    </div>);
}
function PromotedLinkListTournaments() {
    return (
        <div className="container card shadow-lg my-4">
            <div className="card-body row">
                <div className="col-lg-4 pb-3">
                    <a className="btn btn-outline-success w-100" role="button" href="/list">Alle Turniere anzeigen</a>
                </div>
                <div className="col-lg-8">
                    <p>
                        Hier findest du alle öffentlichen Turniere. Wenn du ein Turnier suchst, den Turniercode aber
                        nicht hast, wirst
                        du wahrscheinlich hier fündig.
                    </p>
                    <p>
                        Wenn du eingeloggt bist, findest du hier auch deine eigenen Turniere.
                    </p>
                </div>
            </div>
        </div>
    );
}
function PromotedLinkCreateTournament() {
    return (<div className="container card shadow-lg mb-3">
        <div className="card-body row">
            <div className="col-lg-8">
                <p>
                    <strong>Einfach ausprobieren:</strong> Einen Turnier-Namen, ein paar Team-Namen, und schon
                    kriegst du ein
                    komplettes Turnier!
                </p>
            </div>
            <div className="col-lg-4">
                <a className="btn btn-success btn-lg w-100" role="button" href="/create">Turnier erstellen</a>
            </div>
        </div>
    </div>);
}

export default () => (
    <div>
        <Head>
            <title>turnie.re</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
                  integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
                  crossOrigin="anonymous"/>
        </Head>
        <Index code="asdf1234"/>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
    crossOrigin="anonymous"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
    integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
    crossOrigin="anonymous"/>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
    integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
    crossOrigin="anonymous"/>
    </div>
);
