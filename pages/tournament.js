import Head from 'next/head';
import React from 'react';
import {connect} from 'react-redux';
import {Container, ListGroup, ListGroupItem} from 'reactstrap';

import {ErrorPageComponent} from '../js/components/ErrorComponents';
import {Footer} from '../js/components/Footer';
import {TurniereNavigation} from '../js/components/Navigation';
import {BigImage} from '../js/components/BigImage';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../static/css/everypage.css';
import '../static/css/tournament.css';
import {getTournament} from '../js/redux/tournamentApi';
import {PlayoffStages} from '../js/components/PlayoffStages';

class PrivateTournamentPage extends React.Component {
    render() {
        const {id, description, isPublic, code, ownerUsername, playoffStages} = this.props.tournament;
        const {isSignedIn, username} = this.props;

        // TODO: Change href-prop of the anchor tag to contain the tournament code
        return (<div className='pb-5'>
            <Container>
                <EditButton id={id} ownerName={ownerUsername} isSignedIn={isSignedIn} username={username}/>
                <p>{description}</p>
                <ListGroup>
                    <ListGroupItem>
                        {isPublic ? 'Das Turnier ist öffentlich.' : 'Das Turnier ist privat.'}
                    </ListGroupItem>
                    <ListGroupItem>Turnier-Code: <b>{code}</b></ListGroupItem>
                    <ListGroupItem>von <b>{ownerUsername}</b></ListGroupItem>
                </ListGroup>
            </Container>
            <div className='stages pt-5'>
                <PlayoffStages playoffStages={playoffStages} isSignedIn={isSignedIn}
                    isOwner={username === ownerUsername}/>
            </div>
        </div>);
    }
}

function mapStateToTournamentPageProperties(state) {
    const {isSignedIn, username} = state.userinfo;
    return {isSignedIn, username};
}

const TournamentPage = connect(mapStateToTournamentPageProperties)(PrivateTournamentPage);

function EditButton(props) {
    const {id, ownerName, isSignedIn, username} = props;

    if (isSignedIn && ownerName === username) {
        return (<a href={'/t/' + id + '/edit'} className='btn btn-outline-secondary'>Turnier bearbeiten</a>);
    } else {
        return null;
    }
}

class Main extends React.Component {
    static async getInitialProps({query}) {
        return {query};
    }

    constructor(props) {
        super(props);

        this.state = {
            tournament: null
        };
        this.onTournamentRequestSuccess = this.onTournamentRequestSuccess.bind(this);
        this.onTournamentRequestError = this.onTournamentRequestError.bind(this);
    }

    componentDidMount() {
        getTournament(this.props.query.code, this.onTournamentRequestSuccess, this.onTournamentRequestError);
    }

    onTournamentRequestSuccess(requestStatus, tournament) {
        this.setState({status: requestStatus, tournament: tournament});
    }

    onTournamentRequestError(error) {
        if (error.response) {
            this.setState({status: error.response.status});
        } else {
            this.setState({status: -1});
        }
    }


    render() {
        const tournamentName = this.state.tournament === null ? 'Turnier' : this.state.tournament.name;

        const {status, tournament} = this.state;

        if (status === 200) {
            return (<div>
                <Head>
                    <title>{tournamentName}: turnie.re</title>
                </Head>
                <TurniereNavigation/>
                <BigImage text={tournamentName}/>
                <TournamentPage tournament={tournament}/>
                <Footer/>
            </div>);
        } else {
            return <ErrorPageComponent code={status}/>;
        }
    }
}

export default Main;
