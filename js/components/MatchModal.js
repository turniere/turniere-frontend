import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import React from 'react';
import {EditableMatchTable} from './EditableMatchTable';
import {MatchTable} from './MatchTable';

export function MatchModal(props) {
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
            {props.match.state === 'in_progress' ? <EditableMatchTable match={props.match}/> :
                <MatchTable match={props.match} matchStatus={props.match.state}/>}
        </ModalBody>
        <ModalFooter>
            {actionButton}
            <Button color='secondary' onClick={props.toggle}>Abbrechen</Button>
        </ModalFooter>
    </Modal>);
}
