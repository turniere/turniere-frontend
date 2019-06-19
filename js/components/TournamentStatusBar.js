import Navbar from 'react-bootstrap/Navbar';
import {Container} from 'reactstrap';
import React from 'react';

export function TournamentStatusBar(props) {
    return (<Navbar sticky='top' bg='light' className='border-bottom border-top'>
        <Container className='px-3'>
            {props.children}
        </Container>
    </Navbar>);
}

export function TournamentStatusBarButton(props) {
    return (<a href={props.href} className='ml-3 btn btn-outline-secondary default-font-family'>
        {props.children}
    </a>);
}

export function EditButton(props) {
    const {tournamentId, isOwner, isSignedIn} = props;

    if (isSignedIn && isOwner) {
        return (<TournamentStatusBarButton href={'/t/' + tournamentId + '/edit'}>
            Turnier bearbeiten
        </TournamentStatusBarButton>);
    } else {
        return null;
    }
}
