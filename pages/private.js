import Head from 'next/head';
import React from 'react';
import {connect} from 'react-redux';

import {Card, CardBody, Container} from 'reactstrap';

import {TurniereNavigation} from '../js/components/Navigation';
import {Footer} from '../js/components/Footer';
import {Option, UserRestrictor} from '../js/components/UserRestrictor';
import {Login} from '../js/components/Login';

import '../static/css/everypage.css';
import TournamentList from '../js/components/TournamentList';

class PrivateTournamentsPage extends React.Component {
    render() {
        const {isSignedIn} = this.props;

        return (<UserRestrictor>
            <Option condition={isSignedIn}>
                <div className="main generic-fullpage-bg">
                    <Head>
                        <title>Private Turniere: turnie.re</title>
                    </Head>
                    <TurniereNavigation/>
                    <PrivateTournamentsPageContent/>
                    <Footer/>
                </div>
            </Option>
            <Option condition={true}>
                <div className="main generic-fullpage-bg">
                    <Head>
                        <title>Anmeldung</title>
                    </Head>
                    <TurniereNavigation/>
                    <div>
                        <Login
                            hint="Sie müssen angemeldet sein, um diesen Inhalt anzuzeigen!"/>
                    </div>
                    <Footer/>
                </div>
            </Option>
        </UserRestrictor>);
    }
}

function mapStateToProperties(state) {
    const {isSignedIn} = state.userinfo;
    return {isSignedIn};
}

const PrivateTournamentListPage = connect(mapStateToProperties)(PrivateTournamentsPage);

export default PrivateTournamentListPage;

function PrivateTournamentsPageContent() {
    return (<div>
        <Container className="pt-5">
            <PrivateTournamentsCard/>
        </Container>
        <Container className="pb-5 pt-3">
            <a href='/list' className="btn btn-success shadow">zu den öffentlichen Turnieren</a>
        </Container>
    </div>);
}

class PrivateTournamentsCard extends React.Component {
    render() {
        return (<Card className="shadow">
            <CardBody>
                <h1 className="custom-font">Private Turniere</h1>
                <TournamentList type='private'/>
            </CardBody>
        </Card>);
    }
}
