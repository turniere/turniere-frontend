import Link from 'next/link'
import Head from 'next/head'

const Index = (props) => {
    return (
        <div>
            <Nav/>
            <Bigimage text="Einfach Turniere organisieren"/>
            <p>Dies ist die Startseite!</p>
            <ul>
                <li><Link href="/privacy">Datenschutzerklärung</Link></li>
                <li><Link href="/imprint">Impressum</Link></li>
                <li><Link href="/login">Login</Link></li>
                <li><Link href="/register">Registrierung</Link></li>
                <li><Link href="/list">Turnierliste</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/create">Turniererstellung</Link></li>
                <li><Link as={`/t/${props.code}`} href={`/tournament?code=${props.code}`}>Turnieranzeige</Link></li>
                <li><Link as={`/t/${props.code}/fullscreen`} href={`/tournament-fullscreen?code=${props.code}`}>Turnieranzeige (Vollbild)</Link></li>
            </ul>
            <Footer/>
        </div>
    );
}

function Footer() {
    return (
        <footer className="footer mt-5 bg-dark text-light">
            <div className="container py-3">
                <div className="row">
                    <div className="col-md-6 text-center">
                        &copy; 2018 turnie.re &middot;
                        <a className="text-white" href="/privacy">Datenschutzerklärung</a>
                        &middot;
                        <a className="text-white" href="/imprint">Impressum</a>
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
