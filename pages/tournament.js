import Head from 'next/head';
import React from 'react';
import {connect} from 'react-redux';
import {Container, ListGroup, ListGroupItem} from 'reactstrap';
import Navbar from 'react-bootstrap/Navbar';


import {ErrorPageComponent} from '../js/components/ErrorComponents';
import {Footer} from '../js/components/Footer';
import {TurniereNavigation} from '../js/components/Navigation';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../static/css/everypage.css';
import '../static/css/tournament.css';
import {getTournament} from '../js/redux/tournamentApi';
import {PlayoffStages} from '../js/components/PlayoffStages';
import GroupStage from '../js/components/GroupStage';

class PrivateTournamentPage extends React.Component {
    render() {
        const {ownerUsername, playoffStages, groupStage} = this.props.tournament;
        const {isSignedIn, username} = this.props;
        const isOwner = username === ownerUsername;

        return (<div className='pb-5'>
            <TournamentBigImage {...this.props.tournament}/>
            <StatusBar tournament={this.props.tournament} isOwner={isOwner} isSignedIn={isSignedIn}/>
            <div className='stages'>
                {groupStage != null &&
                <div><GroupStage groups={groupStage.groups} isSignedIn={isSignedIn} isOwner={isOwner}
                    showMatches={playoffStages !== null}/></div>}
                <PlayoffStages playoffStages={playoffStages} isSignedIn={isSignedIn}
                    isOwner={isOwner}/>
            </div>
        </div>);
    }
}

function StatusBar(props) {
    return (<Navbar sticky='top' bg='light' className='border-bottom border-top'>
        <Container className='px-3'>
            <Navbar.Brand>
                {props.tournament.name}
                <EditButton tournamentId={props.tournament.id} isOwner={props.isOwner} isSignedIn={props.isSignedIn}/>
                <StatisticsButton tournamentId={props.tournament.id}/>
            </Navbar.Brand>
        </Container>
    </Navbar>);
}

function StatisticsButton(props) {
    return (<a href={'/t/' + props.tournamentId + '/statistics'}
        className='ml-3 btn btn-outline-secondary default-font-family'>
        Statistiken
    </a>);
}


function TournamentBigImage(props) {
    return (<div className="big-image mb-0">
        <h1 className="display-1">{props.name}</h1>
        <Container>
            <TournamentProperties {...props}/>
        </Container>
    </div>);
}

function TournamentProperties(props) {
    return (<ListGroup className='text-dark text-left shadow'>
        {props.description && <ListGroupItem>{props.description}</ListGroupItem>}
        <ListGroupItem>
            {props.isPublic ? 'Das Turnier ist öffentlich.' : 'Das Turnier ist privat.'}
        </ListGroupItem>
        <ListGroupItem>Turnier-Code: <b>{props.code}</b></ListGroupItem>
        <ListGroupItem>von <b>{props.ownerUsername}</b></ListGroupItem>
    </ListGroup>);
}

function mapStateToTournamentPageProperties(state) {
    const {isSignedIn, username} = state.userinfo;
    return {isSignedIn, username};
}

const TournamentPage = connect(mapStateToTournamentPageProperties)(PrivateTournamentPage);

function EditButton(props) {
    const {tournamentId, isOwner, isSignedIn} = props;

    if (isSignedIn && isOwner) {
        return (<a href={'/t/' + tournamentId + '/edit'} className='ml-3 btn btn-outline-secondary default-font-family'>
            Turnier bearbeiten
        </a>);
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
                <TournamentPage tournament={tournament}/>
                <Footer/>
            </div>);
        } else {
            return <ErrorPageComponent code={status}/>;
        }
    }
}

export default Main;
