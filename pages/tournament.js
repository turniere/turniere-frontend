import Head from 'next/head'
import React from 'react'
import {Container, ListGroup, ListGroupItem} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BigImage, Footer, TurniereNavigation} from '../js/CommonComponents.js'
import '../static/everypage.css'
import {getRequest} from "../js/api";

function Tournament(props) {
    return (
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
    );
}

function TournamentContainer(props) {
    if (props.data === null) {
        return <Container>null</Container>
    } else {
        return <Tournament tournament={props.data.tournament}/>
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