import Head from 'next/head';
import React from 'react';
import {connect} from 'react-redux';
import {Col, Container, ListGroup, ListGroupItem, Row} from 'reactstrap';

import {ErrorPageComponent} from '../js/components/ErrorComponents';
import {Footer} from '../js/components/Footer';
import {TurniereNavigation} from '../js/components/Navigation';
import {BigImage} from '../js/components/BigImage';
import {TournamentInformationView} from '../js/components/TournamentInformationView';
import {getState} from '../js/api';
import {getRequest} from '../js/redux/backendApi';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../static/css/everypage.css';
import '../static/css/tournament.css';
import {Match} from '../js/components/Match';

class PrivateTournamentPage extends React.Component {
    render() {
        const {ownerUsername, playoffStages} = this.props.tournament;
        const {isSignedIn, username} = this.props;
        
        // TODO: Change href-prop of the anchor tag to contain the tournament code
        return (<div className='pb-5'>
            <TournamentInformationView tournament={this.props.tournament} currentpage='tournament'/>
            <div className='stages pt-5'>
                {playoffStages.map(stage => <Stage isSignedIn={isSignedIn} isOwner={username === ownerUsername}
                    level={getLevelName(stage.level)} matches={stage.matches}
                    key={stage.level}/>)}
            </div>
        </div>);
    }
}

function mapStateToTournamentPageProperties(state) {
    const {isSignedIn, username} = state.userinfo;
    return {isSignedIn, username};
}

const TournamentPage = connect(mapStateToTournamentPageProperties)(PrivateTournamentPage);

function getLevelName(levelNumber) {
    const names = ['Finale', 'Halbfinale', 'Viertelfinale', 'Achtelfinale'];
    if (levelNumber < names.length) {
        return names[levelNumber];
    } else {
        return Math.pow(2, levelNumber) + 'tel-Finale';
    }
}

function Stage(props) {
    const {isSignedIn, isOwner} = props;

    return (<div>
        <Container className='py-5'>
            <h1 className='custom-font'>{props.level}</h1>
            <Row>
                {props.matches.map((match => (
                    <Col className='minw-25' key={match.id}><Match match={match} isSignedIn={isSignedIn}
                        isOwner={isOwner}/></Col>)))}
            </Row>
        </Container>
    </div>);
}

function convertTournament(apiTournament) {
    let groupStage = null;
    const playoffStages = [];
    for (const stage of apiTournament.stages) {
        if (stage.groups.length > 0) {
            // group stage
            groupStage = {groups: stage.groups.map(group => convertGroup(group))};
        } else {
            // playoff stage
            playoffStages.push({
                id: stage.id, level: stage.level, matches: stage.matches.map(match => convertMatch(match))
            });
        }
    }
    return {
        id: apiTournament.id,
        code: apiTournament.code,
        description: apiTournament.description,
        name: apiTournament.name,
        isPublic: apiTournament.public,
        owner_username: apiTournament.owner_username,
        groupStage: groupStage,
        playoffStages: playoffStages
    };
}

function convertGroup(apiGroup) {
    return {
        id: apiGroup.id,
        number: apiGroup.number,
        scores: apiGroup.group_scores,
        matches: apiGroup.matches.map(match => convertMatch(match))
    };
}

function convertMatch(apiMatch) {
    const result = {
        id: apiMatch.id, state: apiMatch.state
    };

    if (apiMatch.match_scores.length === 2) {
        result.team1 = apiMatch.match_scores[0].team.name;
        result.scoreTeam1 = apiMatch.match_scores[0].points;
        result.team2 = apiMatch.match_scores[1].team.name;
        result.scoreTeam2 = apiMatch.match_scores[1].points;
    } else if (apiMatch.match_scores.length === 1) {
        result.team1 = apiMatch.match_scores[0].team.name;
        result.scoreTeam1 = apiMatch.match_scores[0].points;
        result.team2 = 'TBD';
        result.scoreTeam2 = 0;
    } else {
        result.team1 = 'TBD';
        result.scoreTeam1 = 0;
        result.team2 = 'TBD';
        result.scoreTeam2 = 0;
    }

    return result;
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
    }

    componentDidMount() {
        const code = this.props.query.code;

        getRequest(getState(), '/tournaments/' + code)
            .then(response => {
                this.setState({status: response.status, tournament: convertTournament(response.data)});
            })
            .catch(err => {
                if (err.response) {
                    this.setState({status: err.response.status});
                } else {
                    this.setState({status: -1});
                }
            });
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
