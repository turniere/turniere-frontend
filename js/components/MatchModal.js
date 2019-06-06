import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import React from 'react';
import {EditableMatchTable} from './EditableMatchTable';
import {MatchTable} from './MatchTable';

export function MatchModal(props) {
    let title;
    let actionButton = '';
    let submitScoresButton = '';
    let matchTable = <MatchTable match={props.match} matchStatus={props.match.state}/>;
    // possible states: single_team not_ready not_started in_progress finished
    switch (props.match.state) {
    case 'in_progress':
        title = 'Spiel läuft';
        submitScoresButton = <Button color='primary'>Spielstand ändern</Button>;
        if (!props.match.allowUndecided && props.match.team1.score === props.match.team2.score) {
            actionButton = <Button color='primary' disabled>Spiel beenden</Button>;
        } else {
            actionButton = <Button color='primary' onClick={props.endMatch}>Spiel beenden</Button>;
        }
        matchTable = <EditableMatchTable match={props.match}/>;
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
            {matchTable}
        </ModalBody>
        <ModalFooter>
            {submitScoresButton}
            {actionButton}
            <Button color='secondary' onClick={props.toggle}>Abbrechen</Button>
        </ModalFooter>
    </Modal>);
}
