import React                  from 'react';
import { connect }            from 'react-redux';
import {
    Button,
    ButtonGroup,
    Col,
    Container,
    ListGroup,
    ListGroupItem
} from 'reactstrap';


class PrivateTournamentInformationView extends React.Component {

    render() {
        const { tournament, isSignedIn, username, currentpage } = this.props;

        return (
            <Container>
                
                <ButtonsBadge 
                    id={tournament.id}
                    ownerName={tournament.owner_username}
                    isSignedIn={isSignedIn}
                    username={username}
                    currentpage={currentpage}/>

                <p>{tournament.description}</p>
                <ListGroup>
                    <ListGroupItem>
                        {tournament.isPublic ? 'Das Turnier ist öffentlich.' : 'Das Turnier ist privat.'}
                    </ListGroupItem>
                    <ListGroupItem>Turnier-Code: <b>{tournament.code}</b></ListGroupItem>
                    <ListGroupItem>von <b>{tournament.owner_username}</b></ListGroupItem>
                </ListGroup>
            </Container>
        );
    }
}

function mapStateToPrivateTournamentInformationViewProps(state) {
    const { isSignedIn, username } = state.userinfo;
    return { isSignedIn, username };
}

export const TournamentInformationView = connect(
    mapStateToPrivateTournamentInformationViewProps
)(PrivateTournamentInformationView);

function ButtonsBadge(props) {
    const { id, ownerName, isSignedIn, username, currentpage } = props;
    
    switch(currentpage) {
        case 'statistics':
            return (
                <ButtonGroup>
                    <EditButton id={id} ownerName={ownerName} isSignedIn={isSignedIn} username={username}/>
                    <TournamentButton id={id}/>
                </ButtonGroup>
            );
        case 'tournament':
            return (
                <ButtonGroup>
                    <EditButton id={id} ownerName={ownerName} isSignedIn={isSignedIn} username={username}/>
                    <StatisticsButton id={id}/>
                </ButtonGroup>
            );
        case 'edit':
            return (
                <ButtonGroup>
                    <StatisticsButton id={id}/>
                    <TournamentButton id={id}/>
                </ButtonGroup>
            );
        default: return null;
    }
}

function TournamentButton(props) {
    const { id } = props;
    return <Button href={'/t/' + id} color='secondary'>Zum Turnier</Button>;
}

function EditButton(props) {
    const { id, ownerName, isSignedIn, username } = props;

    if(isSignedIn && ownerName === username) {
        return (
            <Button href={'/t/' + id + '/edit'} color='secondary'>Turnier bearbeiten</Button>
        );
    } else {
        return null;
    }
}

function StatisticsButton(props) {
    const { id } = props;
    return <Button href={'/t/' + id + '/statistics'} color='secondary'>Statistiken zum Turnier</Button>;
}



/*
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

*/
