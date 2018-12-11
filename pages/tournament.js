import Head from 'next/head'
import React from 'react'
import {
    Button,
    Card,
    CardBody,
    Col,
    Container, Input, InputGroup, InputGroupAddon,
    ListGroup,
    ListGroupItem,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BigImage, Footer, TurniereNavigation} from '../js/CommonComponents.js'
import '../static/everypage.css'
import '../static/css/tournament.css'
import {getRequest} from '../js/api';

function Tournament(props) {
    let demoMatches = [
        {scoreTeam1: 1, team1: 'Eins', scoreTeam2: 2, team2: 'Zwei', state: 'in_progress', id: 0},
        {scoreTeam1: 3, team1: 'Eins', scoreTeam2: 2, team2: 'Zwei', state: 'team1_won', id: 1},
        {scoreTeam1: 1, team1: 'Eins', scoreTeam2: 3, team2: 'Zwei', state: 'team2_won', id: 2},
        {scoreTeam1: 1, team1: 'Eins', scoreTeam2: 0, team2: 'Zwei', state: 'single_team', id: 3},
        {scoreTeam1: 1, team1: 'Eins', scoreTeam2: 0, team2: 'Zwei', state: 'not_ready', id: 4},
        {scoreTeam1: 1, team1: 'Eins', scoreTeam2: 0, team2: 'Zwei', state: 'not_started', id: 5},
        {scoreTeam1: 2, team1: 'Eins', scoreTeam2: 2, team2: 'Zwei', state: 'undecided', id: 6}];
    let stages = [{level: 0, matches: demoMatches}, {level: 1, matches: demoMatches}];
    return (
        <div>
            <Container>
                <a href='edit' className='btn btn-outline-secondary'>Turnier bearbeiten</a>
                <p>{props.tournament.description}</p>
                <ListGroup>
                    <ListGroupItem>
                        {props.tournament.isPublic ? 'Das Turnier ist öffentlich.' : 'Das Turnier ist privat.'}
                    </ListGroupItem>
                    <ListGroupItem>Turnier-Code: <b>{props.tournament.code}</b></ListGroupItem>
                </ListGroup>
            </Container>
            <div className='stages pt-5'>
                {stages.map(stage => <Stage level={getLevelName(stage.level)} matches={stage.matches} key={stage.level}/>)}
            </div>
        </div>
    );
}

function getLevelName(levelNumber) {
    const names = ['Finale', 'Halbfinale', 'Viertelfinale', 'Achtelfinale'];
    if(levelNumber < names.length){
        return names[levelNumber]
    }else {
        return Math.pow(2, levelNumber) + 'tel-Finale'
    }
}

function TournamentContainer(props) {
    if (props.data === null) {
        return <Container>null</Container>
    } else {
        return <Tournament tournament={props.data.tournament}/>
    }
}

function Stage(props) {
    return (<div>
        <Container className='py-5'>
            <h1 className='custom-font'>{props.level}</h1>
            <Row>
                {props.matches.map((match => (
                    <Col className='minw-25' key={match.id}><Match match={match}/></Col>
                )))}
            </Row>
        </Container>
    </div>);
}

class Match extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({modal: !this.state.modal})
    }

    render() {
        let cardClass, team1Class, team2Class, smallMessage;
        //possible states: single_team not_ready not_started in_progress team1_won team2_won undecided
        switch (this.props.match.state) {
            case 'in_progress':
                cardClass = 'table-warning border-warning';
                smallMessage = 'Spiel läuft';
                break;
            case 'team1_won':
                team1Class = 'font-weight-bold';
                team2Class = 'lost-team';
                cardClass = 'table-success border-success';
                smallMessage = 'Gewinner: ' + this.props.match.team1;
                break;
            case 'team2_won':
                team1Class = 'lost-team';
                team2Class = 'font-weight-bold';
                cardClass = 'table-success border-success';
                smallMessage = 'Gewinner: ' + this.props.match.team2;
                break;
            case 'single_team':
                team2Class = 'text-muted';
                cardClass = 'table-success border-success';
                smallMessage = 'kein Gegner, Team kommt weiter';
                break;
            case 'not_ready':
                smallMessage = 'Spiel kann noch nicht gestartet werden';
                break;
            case 'not_started':
                smallMessage = 'Spiel kann gestartet werden';
                break;
            case 'undecided':
                cardClass = 'table-success border-success';
                smallMessage = 'Spiel beendet, unentschieden';
                break;
        }
        return (
            <div className='mb-3'>
                <Card className='shadow-sm match' onClick={this.toggleModal}>
                    <CardBody className={'border py-2 ' + cardClass}>
                        <MatchTable match={this.props.match}/>
                    </CardBody>
                </Card>
                <small className='text-muted'>{smallMessage}</small>
                <MatchModal title='Match' isOpen={this.state.modal} toggle={this.toggleModal} match={this.props.match}/>
            </div>
        );
    }
}

function MatchModal(props) {
    let title;
    let actionButton = '';
    //possible states: single_team not_ready not_started in_progress team1_won team2_won undecided
    switch (props.match.state) {
        case 'in_progress':
            title = 'Spiel läuft';
            actionButton = <Button color='primary' onClick={props.toggle}>Spiel beenden</Button>
            break;
        case 'team1_won':
            title = 'Spiel beendet';
            break;
        case 'team2_won':
            title = 'Spiel beendet';
            break;
        case 'single_team':
            title = 'kein Gegner, Team kommt weiter';
            break;
        case 'not_ready':
            title = 'Spiel kann noch nicht gestartet werden';
            break;
        case 'not_started':
            title = 'Spiel kann gestartet werden';
            actionButton = <Button color='primary' onClick={props.toggle}>Spiel starten</Button>;
            break;
        case 'undecided':
            title = 'Spiel beendet';
            break;
    }
    return (
        <Modal isOpen={props.isOpen} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>{title}</ModalHeader>
            <ModalBody>
                {props.match.state === 'in_progress' ? <EditableMatchTable match={props.match}/> :
                    <MatchTable match={props.match}/>}
            </ModalBody>
            <ModalFooter>
                {actionButton}
                <Button color='secondary' onClick={props.toggle}>Abbrechen</Button>
            </ModalFooter>
        </Modal>
    );
}

function MatchTable(props) {
    let team1Class, team2Class;
    //possible states: single_team not_ready not_started in_progress team1_won team2_won undecided
    switch (props.match.state) {
        case 'in_progress':
            break;
        case 'team1_won':
            team1Class = 'font-weight-bold';
            team2Class = 'lost-team';
            break;
        case 'team2_won':
            team1Class = 'lost-team';
            team2Class = 'font-weight-bold';
            break;
        case 'single_team':
            team2Class = 'text-muted';
            break;
        case 'not_ready':
            break;
        case 'not_started':
            break;
        case 'undecided':
            break;
    }
    return (
        <Table className='mb-0'>
            <tbody>
            <tr>
                {props.match.state !== 'single_team' ?
                    <th className='stage border-top-0'>{props.match.scoreTeam1}</th> : ''}
                <td className={'border-top-0 ' + team1Class}>{props.match.team1}</td>
            </tr>
            <tr>
                {props.match.state !== 'single_team' ?
                    <th className='stage'>{props.match.scoreTeam2}</th> : ''}
                <td className={team2Class}>{props.match.state === 'single_team' ? 'kein Gegner' : props.match.team2}</td>
            </tr>
            </tbody>
        </Table>
    )
}

function EditableMatchTable(props) {
    return (
        <Table className='mb-0'>
            <tbody>
            <tr>
                <td className='scoreInput border-top-0'>
                    <ScoreInput score={props.match.scoreTeam1}/>
                </td>
                <td className='align-middle border-top-0'>{props.match.team1}</td>
            </tr>
            <tr>
                <td className='scoreInput'>
                    <ScoreInput score={props.match.scoreTeam2}/>
                </td>
                <td className='align-middle'>{props.match.team2}</td>
            </tr>
            </tbody>
        </Table>
    )
}

class ScoreInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {score: this.props.score};
        this.updateScore = this.updateScore.bind(this);
        this.increaseScore = this.increaseScore.bind(this);
        this.decreaseScore = this.decreaseScore.bind(this);
    }

    updateScore(event){
        this.setState({score: event.target.value});
    }

    increaseScore(){
        this.setState({score: Number(this.state.score) + 1});
    }

    decreaseScore(){
        this.setState({score: Number(this.state.score) - 1});
    }

    render() {
        return (<InputGroup>
            <InputGroupAddon addonType="prepend"><Button onClick={this.decreaseScore} color='danger' outline={true}>-1</Button></InputGroupAddon>
            <Input className='font-weight-bold' value={this.state.score} onChange={this.updateScore} type='number' step='1' placeholder='0'/>
            <InputGroupAddon addonType="append"><Button onClick={this.increaseScore} color='success'>+1</Button></InputGroupAddon>
        </InputGroup>);
    }
}


class Main extends React.Component {
    constructor(props) {
        super(props);
        const code = this.props.query.code;
        getRequest('/tournaments/' + code, {})
            .then(response => {
                const attributes = response.data.data.attributes;
                const relationships = response.data.data.relationships;
                this.setState({
                    tournament: {
                        name: attributes.name,
                        code: attributes.code,
                        description: attributes.description,
                        isPublic: attributes.public,
                        teams: relationships.teams.data.map(team => team.id),
                        stages: relationships.stages.data.map(stage => stage.id)
                    }
                });
            })
            .catch(error => console.log(error));
    }

    static async getInitialProps({query}) {
        return {query}
    }

    render() {
        const tournamentName = this.state === null ? 'Turnier' : this.state.tournament.name;
        return (
            <div>
                <Head>
                    <title>{tournamentName}: turnie.re</title>
                </Head>
                <TurniereNavigation/>
                <BigImage text={tournamentName}/>
                <TournamentContainer data={this.state}/>
                {JSON.stringify(this.state)}
                <Footer/>
            </div>
        );
    }
}

export default Main