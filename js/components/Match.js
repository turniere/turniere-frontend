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
import {endMatch, startMatch} from '../api';
import {notify} from 'react-notify-toast';


export class Match extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            match: this.props.match
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.startMatch = this.startMatch.bind(this);
        this.onStartMatchSuccess = this.onStartMatchSuccess.bind(this);
        this.onStartMatchError = this.onStartMatchError.bind(this);
        this.endMatch = this.endMatch.bind(this);
        this.onEndMatchSuccess = this.onEndMatchSuccess.bind(this);
        this.onEndMatchError = this.onEndMatchError.bind(this);
        this.getMatchFinishedMessage = this.getMatchFinishedMessage.bind(this);
    }

    toggleModal() {
        const {isSignedIn, isOwner} = this.props;

        if (isSignedIn && isOwner) {
            this.setState({modal: !this.state.modal});
        }
    }

    startMatch() {
        startMatch(this.state.match.id, this.onStartMatchSuccess, this.onStartMatchError);
    }

    onStartMatchSuccess() {
        const updatedMatch = this.state.match;
        updatedMatch.state = 'in_progress';
        this.setState({match: updatedMatch});
        this.toggleModal();
    }

    onStartMatchError() {
        this.toggleModal();
        notify.show('Das Match konnte nicht gestartet werden.', 'error', 3000);
    }

    endMatch() {
        endMatch(this.state.match.id, this.onEndMatchSuccess, this.onEndMatchError);
    }

    onEndMatchSuccess(winner) {
        const updatedMatch = this.state.match;
        updatedMatch.state = 'finished';
        updatedMatch.winnerTeamId = winner === null ? null : winner.id;
        this.setState({match: updatedMatch});
        this.toggleModal();
    }

    onEndMatchError() {
        this.toggleModal();
        notify.show('Das Match konnte nicht beendet werden.', 'error', 3000);
    }

    getMatchFinishedMessage() {
        const match = this.state.match;
        if (match.winnerTeamId === null) {
            return 'Spiel beendet, unentschieden';
        }
        if (match.winnerTeamId === match.team1.id) {
            return 'Gewinner: ' + match.team1.name;
        }
        if (match.winnerTeamId === match.team2.id) {
            return 'Gewinner: ' + match.team2.name;
        }
        return 'Spiel beendet';
    }

    render() {
        let cardClass;
        let smallMessage;
        let borderClass;
        // possible states: single_team not_ready not_started in_progress finished
        switch (this.state.match.state) {
        case 'in_progress':
            cardClass = 'table-warning';
            borderClass = 'border-warning';
            smallMessage = 'Spiel läuft';
            break;
        case 'finished':
            cardClass = 'table-success';
            borderClass = 'border-success';
            smallMessage = this.getMatchFinishedMessage();
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
        }
        return (<div className='mb-3'>
            <Card className='shadow-sm match' onClick={this.toggleModal}>
                <CardBody className={borderClass + ' border py-2 ' + cardClass}>
                    <MatchTable match={this.state.match} borderColor={borderClass}/>
                </CardBody>
            </Card>
            <small className='text-muted'>{smallMessage}</small>
            <MatchModal title='Match' isOpen={this.state.modal} toggle={this.toggleModal} match={this.state.match}
                startMatch={this.startMatch} endMatch={this.endMatch}/>
        </div>);
    }
}

function MatchModal(props) {
    let title;
    let actionButton = '';
    // possible states: single_team not_ready not_started in_progress finished
    switch (props.match.state) {
    case 'in_progress':
        title = 'Spiel läuft';
        actionButton = <Button color='primary' onClick={props.endMatch}>Spiel beenden</Button>;
        break;
    case 'finished':
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
    }
    return (<Modal isOpen={props.isOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>{title}</ModalHeader>
        <ModalBody>
            {props.matchState === 'in_progress' ? <EditableMatchTable match={props.match}/> :
                <MatchTable match={props.match} matchStatus={props.matchState}/>}
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
    // possible states: single_team not_ready not_started in_progress finished
    switch (props.matchState) {
    case 'in_progress':
        break;
    case 'finished':
        if (props.match.winnerTeamId === undefined) {
            break;
        }
        if (props.winnerTeamId === props.match.team1.id) {
            team1Class = 'font-weight-bold';
            team2Class = 'lost-team';
        }
        if (props.winnerTeamId === props.match.team2.id) {
            team1Class = 'lost-team';
            team2Class = 'font-weight-bold';
        }
        break;
    case 'single_team':
        team2Class = 'text-muted';
        break;
    case 'not_ready':
        break;
    case 'not_started':
        break;
    }
    if (props.match.state === 'single_team') {
        return (<Table className='mb-0'>
            <tbody>
                <tr>
                    <td className={'border-top-0 ' + team1Class}>{props.match.team1.name}</td>
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
                    <th className='stage border-top-0'>{props.match.team1.score}</th>
                    <td className={'border-top-0 ' + team1Class}>{props.match.team1.name}</td>
                </tr>
                <tr>
                    <th className={'stage ' + props.borderColor}>{props.match.team2.score}</th>
                    <td className={props.borderColor + ' ' + team2Class}>{props.match.team2.name}</td>
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
                    <ScoreInput score={props.match.team1.score}/>
                </td>
                <td className='align-middle border-top-0'>{props.match.team1.name}</td>
            </tr>
            <tr>
                <td className='scoreInput'>
                    <ScoreInput score={props.match.team2.score}/>
                </td>
                <td className='align-middle'>{props.match.team2.name}</td>
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
