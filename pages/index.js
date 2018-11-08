import Link from 'next/link'
import Head from 'next/head'

const Index = (props) => {
    return (
        <div>
            <Head>
                <title>Turnie.re - Startseite</title>
            </Head>
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
        </div>
    );
}

export default () => (<Index code="asdf1234"/>);
