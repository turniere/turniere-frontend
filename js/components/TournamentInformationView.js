import React from 'react';
import {connect} from 'react-redux';
import {
    Button,
    ButtonGroup,
    Col,
    Container,
    ListGroup,
    ListGroupItem,
    Row
} from 'reactstrap';


class PrivateTournamentInformationView extends React.Component {
    render() {
        const {tournament, isSignedIn, username, currentpage} = this.props;

        return (
            <Container>
                <Row>
                    <Col xs="6">
                        <ButtonsBadge
                            id={tournament.id}
                            ownerName={tournament.owner_username}
                            isSignedIn={isSignedIn}
                            username={username}
                            currentpage={currentpage}
                            className="pb-3"/>
                        <p>{tournament.description}</p>
                    </Col>
                    <Col xs="6">
                        <ListGroup>
                            <ListGroupItem>
                                {tournament.isPublic ? 'Das Turnier ist öffentlich.' : 'Das Turnier ist privat.'}
                            </ListGroupItem>
                            <ListGroupItem>Turnier-Code: <b>{tournament.code}</b></ListGroupItem>
                            <ListGroupItem>von <b>{tournament.owner_username}</b></ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}

function mapStateToPrivateTournamentInformationViewProps(state) {
    const {isSignedIn, username} = state.userinfo;
    return {isSignedIn, username};
}

export const TournamentInformationView = connect(
    mapStateToPrivateTournamentInformationViewProps
)(PrivateTournamentInformationView);

function ButtonsBadge(props) {
    const {id, ownerName, isSignedIn, username, currentpage} = props;

    switch (currentpage) {
    case 'statistics':
        return (
            <ButtonGroup className={props.className}>
                <EditButton id={id} ownerName={ownerName} isSignedIn={isSignedIn} username={username}/>
                <TournamentButton id={id}/>
            </ButtonGroup>
        );
    case 'tournament':
        return (
            <ButtonGroup className={props.className}>
                <EditButton id={id} ownerName={ownerName} isSignedIn={isSignedIn} username={username}/>
                <StatisticsButton id={id}/>
            </ButtonGroup>
        );
    case 'edit':
        return (
            <ButtonGroup className={props.className}>
                <StatisticsButton id={id}/>
                <TournamentButton id={id}/>
            </ButtonGroup>
        );
    default: return null;
    }
}

function TournamentButton(props) {
    const {id} = props;
    return <Button href={'/t/' + id} color='success'>Zum Turnier</Button>;
}

function EditButton(props) {
    const {id, ownerName, isSignedIn, username} = props;

    if (isSignedIn && ownerName === username) {
        return (
            <Button href={'/t/' + id + '/edit'} color='success'>Turnier bearbeiten</Button>
        );
    } else {
        return null;
    }
}

function StatisticsButton(props) {
    const {id} = props;
    return <Button href={'/t/' + id + '/statistics'} color='success'>Statistiken zum Turnier</Button>;
}

