<<<<<<< HEAD
import Head from 'next/head';
import React from 'react';
import {connect} from 'react-redux';
import {Col, Container, ListGroup, ListGroupItem, Row} from 'reactstrap';

import {ErrorPageComponent} from '../js/components/ErrorComponents';
import {Footer} from '../js/components/Footer';
import {TurniereNavigation} from '../js/components/Navigation';
import {BigImage} from '../js/components/BigImage';
import {getState} from '../js/api';
import {getRequest} from '../js/redux/backendApi';
=======
import Head                   from 'next/head';
import React                  from 'react';
import { connect }            from 'react-redux';
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    Col,
    Container,
    Input,
    InputGroup,
    InputGroupAddon,
    ListGroup,
    ListGroupItem,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table
} from 'reactstrap';

import { ErrorPageComponent } from '../js/components/ErrorComponents';
import { Footer }             from '../js/components/Footer';
import { TurniereNavigation } from '../js/components/Navigation';
import { BigImage }           from '../js/components/BigImage';
import {
    getRequest,
    getState
} from '../js/api';
>>>>>>> Properly style the buttons on the tournament and its statistics

import 'bootstrap/dist/css/bootstrap.min.css';

import '../static/css/everypage.css';
import '../static/css/tournament.css';
import {Match} from '../js/components/Match';

class PrivateTournamentPage extends React.Component {
    render() {
        const {id, description, isPublic, code, ownerUsername, playoffStages} = this.props.tournament;
        const {isSignedIn, username} = this.props;

        // TODO: Change href-prop of the anchor tag to contain the tournament code
        return (<div className='pb-5'>
            <Container>
                <ButtonsBadge id={id} ownerName={ownerUsername} isSignedIn={isSignedIn} username={username}/>
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

function ButtonsBadge(props) {
    const { id, ownerName, isSignedIn, username } = props;
    return (
        <ButtonGroup>
            <EditButton id={id} ownerName={ownerName} isSignedIn={isSignedIn} username={username}/>
            <StatisticsButton id={id}/>
        </ButtonGroup>
    );
}

function EditButton(props) {
    const {id, ownerName, isSignedIn, username} = props;

    if(isSignedIn && ownerName === username) {
        return (<Button href={'/t/' + id + '/edit'} outline color='secondary'>Turnier bearbeiten</Button>);
    } else {
        return null;
    }
}

function StatisticsButton(props) {
    const { id } = props;
    return <Button href={'/t/' + id + '/statistics'} outline color='secondary'>Statistiken zum Turnier</Button>;
}

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
        ownerUsername: apiTournament.owner_username,
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
