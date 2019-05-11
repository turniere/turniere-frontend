import Head from 'next/head';
import React from 'react';
import {Container} from 'reactstrap';

import {TurniereNavigation} from './Navigation';
import {Footer} from './Footer';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../../static/css/everypage.css';
import '../../static/css/error.css';

export class ErrorPageComponent extends React.Component {
    static getInitialProps({statusCode}) {
        return {statusCode};
    }

    render() {
        return (
            <div>
                <Head>
                    <title>turnie.re - Error {this.props.statusCode}</title>
                </Head>
                <TurniereNavigation/>
                <ErrorPage statusCode={this.props.statusCode}/>
                <Footer/>
            </div>
        );
    }
}

export function ErrorPage(props) {
    return (
        <Container className="mb-5">
            <div className="row mb-5">
                <div className="col-lg text-center">
                    <img src="/static/images/logo-questionmark.png" className="w-75 img-fluid"/>
                </div>
                <div className="col-lg error-code-box">
                    <h1 className="custom-font py-5">{props.statusCode}</h1>
                </div>
            </div>
            <ErrorMessage code={props.statusCode}/>
        </Container>
    );
}

function ErrorMessage(props) {
    switch (props.code) {
    case 400:
        return (<div className="running-text">
            <h2>Deine Anfrage ist fehlerhaft.</h2>
            <p>
                Wir empfehlen, die eingegebene Seite über die <a href="/">Startseite</a> zu suchen.
            </p>
        </div>);
    case 403:
        return (<div className="running-text">
            <h2>Du bist nicht autorisiert, diese Seite aufzurufen.</h2>
            <p>
                Bitte stelle sicher, dass Du angemeldet bist und auf dieses Turnier oder dieses Match zugreifen darfst.
            </p>
            <p>
                Wir empfehlen, die eingegebene Seite über die <a href="/">Startseite</a> zu suchen.
            </p>
        </div>);
    case 404:
        return (<div className="running-text">
            <h2>Die aufgerufene Seite wurde leider nicht gefunden.</h2>
            <p>
                Entweder hast Du dich vertippt, oder die gesuchte Seite gibt es nicht.
            </p>
            <p>
                Wir empfehlen, die eingegebene Seite über die <a href="/">Startseite</a> zu suchen.
            </p>
        </div>);
    case 500:
        return (<div className="running-text">
            <h2>Diese Seite funktioniert nicht.</h2>
            <p>
                turnie.re kann Deine Anfrage im Moment nicht verarbeiten. Bitte versuche es später erneut.
            </p>
        </div>);
    default:
        return (<div>
            <h2>Ein unbekannter Fehler ist aufgetreten.</h2>
        </div>);
    }
}
