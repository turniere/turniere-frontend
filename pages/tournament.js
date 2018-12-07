import Head from 'next/head'
import React from 'react'
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
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
    let matches = [
        {scoreTeam1: 1, team1: 'Eins', scoreTeam2: 2, team2: 'Zwei', state: 'in_progress'},
        {scoreTeam1: 3, team1: 'Eins', scoreTeam2: 2, team2: 'Zwei', state: 'team1_won'},
        {scoreTeam1: 1, team1: 'Eins', scoreTeam2: 3, team2: 'Zwei', state: 'team2_won'},
        {scoreTeam1: 1, team1: 'Eins', scoreTeam2: 0, team2: 'Zwei', state: 'single_team'},
        {scoreTeam1: 1, team1: 'Eins', scoreTeam2: 0, team2: 'Zwei', state: 'not_ready'},
        {scoreTeam1: 1, team1: 'Eins', scoreTeam2: 0, team2: 'Zwei', state: 'not_started'},
        {scoreTeam1: 2, team1: 'Eins', scoreTeam2: 2, team2: 'Zwei', state: 'undecided'}];
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
                <Stage level={'Viertelfinale'} matches={matches}/>
                <Stage level={'Achtelfinale'} matches={matches}/>
            </div>
        </div>
    );
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
                    <Col className='minw-25'><Match match={match}/></Col>
                )))}
            </Row>
        </Container>
    </div>);
}

class Match extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false,
            modal: false
        };
        this.handleHover = this.handleHover.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    handleHover() {
        this.setState({isHovered: !this.state.isHovered});
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
                <Card className={(this.state.isHovered ? 'shadow' : 'shadow-sm')} onMouseEnter={this.handleHover}
                      onMouseLeave={this.handleHover} onClick={this.toggleModal}>
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
    //possible states: single_team not_ready not_started in_progress team1_won team2_won undecided
    switch (props.match.state) {
        case 'in_progress':
            title = 'Spiel läuft';
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
            break;
        case 'undecided':
            title = 'Spiel beendet';
            break;
    }
    return (
        <Modal isOpen={props.isOpen} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>{title}</ModalHeader>
            <ModalBody>
                <MatchTable match={props.match}/>
            </ModalBody>
            <ModalFooter>
                {props.match.state === 'not_started' ?
                    <Button color='primary' onClick={props.toggle}>Spiel Starten</Button> : ''}{' '}
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