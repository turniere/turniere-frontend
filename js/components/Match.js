import {
    Button,
    Card,
    CardBody,
    Input,
    InputGroup,
    InputGroupAddon,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table
} from 'reactstrap';
import React from 'react';
import {startMatch} from '../api';
import {notify} from 'react-notify-toast';


export class Match extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            matchState: this.props.match.state
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.startMatch = this.startMatch.bind(this);
        this.onStartMatchSuccess = this.onStartMatchSuccess.bind(this);
        this.onStartMatchError = this.onStartMatchError.bind(this);
    }

    toggleModal() {
        const {isSignedIn, isOwner} = this.props;

        if (isSignedIn && isOwner) {
            this.setState({modal: !this.state.modal});
        }
    }

    startMatch() {
        startMatch(this.props.match.id, this.onStartMatchSuccess, this.onStartMatchError);
    }

    onStartMatchSuccess() {
        this.setState({matchState: 'in_progress'});
        this.toggleModal();
    }

    onStartMatchError() {
        this.toggleModal();
        notify.show('Das Match konnte nicht gestartet werden.', 'error', 3000);
    }

    render() {
        let cardClass;
        let smallMessage;
        let borderClass;
        // possible states: single_team not_ready not_started in_progress team1_won team2_won undecided
        switch (this.state.matchState) {
        case 'in_progress':
            cardClass = 'table-warning';
            borderClass = 'border-warning';
            smallMessage = 'Spiel läuft';
            break;
        case 'team1_won':
            cardClass = 'table-success';
            borderClass = 'border-success';
            smallMessage = 'Gewinner: ' + this.props.match.team1;
            break;
        case 'team2_won':
            cardClass = 'table-success';
            borderClass = 'border-success';
            smallMessage = 'Gewinner: ' + this.props.match.team2;
            break;
        case 'single_team':
            cardClass = 'table-success';
            borderClass = 'border-success';
            smallMessage = 'kein Gegner, Team kommt weiter';
            break;
        case 'not_ready':
            smallMessage = 'Spiel kann noch nicht gestartet werden';
            break;
        case 'not_started':
            smallMessage = 'Spiel kann gestartet werden';
            break;
        case 'undecided':
            cardClass = 'table-success';
            borderClass = 'border-success';
            smallMessage = 'Spiel beendet, unentschieden';
            break;
        }
        return (<div className='mb-3'>
            <Card className='shadow-sm match' onClick={this.toggleModal}>
                <CardBody className={borderClass + ' border py-2 ' + cardClass}>
                    <MatchTable match={this.props.match} borderColor={borderClass}/>
                </CardBody>
            </Card>
            <small className='text-muted'>{smallMessage}</small>
            <MatchModal title='Match' isOpen={this.state.modal} toggle={this.toggleModal} match={this.props.match}
                startMatch={this.startMatch}/>
        </div>);
    }
}

function MatchModal(props) {
    let title;
    let actionButton = '';
    // possible states: single_team not_ready not_started in_progress team1_won team2_won undecided
    switch (props.match.state) {
    case 'in_progress':
        title = 'Spiel läuft';
        actionButton = <Button color='primary' onClick={props.toggle}>Spiel beenden</Button>;
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
        actionButton = <Button color='primary' onClick={props.startMatch}>Spiel starten</Button>;
        break;
    case 'undecided':
        title = 'Spiel beendet';
        break;
    }
    return (<Modal isOpen={props.isOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>{title}</ModalHeader>
        <ModalBody>
            {props.match.state === 'in_progress' ? <EditableMatchTable match={props.match}/> :
                <MatchTable match={props.match}/>}
        </ModalBody>
        <ModalFooter>
            {actionButton}
            <Button color='secondary' onClick={props.toggle}>Abbrechen</Button>
        </ModalFooter>
    </Modal>);
}

function MatchTable(props) {
    let team1Class;
    let team2Class;
    // possible states: single_team not_ready not_started in_progress team1_won team2_won undecided
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
    if (props.match.state === 'single_team') {
        return (<Table className='mb-0'>
            <tbody>
                <tr>
                    <td className={'border-top-0 ' + team1Class}>{props.match.team1}</td>
                </tr>
                <tr>
                    <td className={props.borderColor + ' ' + team2Class}>kein Gegner</td>
                </tr>
            </tbody>
        </Table>);
    } else {
        return (<Table className='mb-0'>
            <tbody>
                <tr>
                    <th className='stage border-top-0'>{props.match.scoreTeam1}</th>
                    <td className={'border-top-0 ' + team1Class}>{props.match.team1}</td>
                </tr>
                <tr>
                    <th className={'stage ' + props.borderColor}>{props.match.scoreTeam2}</th>
                    <td className={props.borderColor + ' ' + team2Class}>{props.match.team2}</td>
                </tr>
            </tbody>
        </Table>);
    }
}

function EditableMatchTable(props) {
    return (<Table className='mb-0'>
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
    </Table>);
}

class ScoreInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {score: this.props.score};
        this.updateScore = this.updateScore.bind(this);
        this.increaseScore = this.increaseScore.bind(this);
        this.decreaseScore = this.decreaseScore.bind(this);
    }

    updateScore(event) {
        this.setState({score: event.target.value});
    }

    increaseScore() {
        this.setState({score: Number(this.state.score) + 1});
    }

    decreaseScore() {
        this.setState({score: Number(this.state.score) - 1});
    }

    render() {
        return (<InputGroup>
            <InputGroupAddon addonType="prepend"><Button onClick={this.decreaseScore} color='danger'
                outline={true}>-1</Button></InputGroupAddon>
            <Input className='font-weight-bold' value={this.state.score} onChange={this.updateScore} type='number'
                step='1' placeholder='0'/>
            <InputGroupAddon addonType="append"><Button onClick={this.increaseScore}
                color='success'>+1</Button></InputGroupAddon>
        </InputGroup>);
    }
}
