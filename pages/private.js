import Head from 'next/head';
import React from 'react';
import {connect} from 'react-redux';

import {Card, CardBody, Container,} from 'reactstrap';

import {TurniereNavigation} from '../js/components/Navigation';
import {Footer} from '../js/components/Footer';
import {Option, UserRestrictor} from '../js/components/UserRestrictor';
import {Login} from '../js/components/Login';
import {requestTournamentList} from '../js/api';

import '../static/everypage.css';

class PrivateTournamentsPage extends React.Component {

    render() {
        const {isSignedIn} = this.props;

        return (
            <UserRestrictor>
                <Option condition={isSignedIn}>
                    <div className="main generic-fullpage-bg">
                        <Head>
                            <title>Private Turniere: turnie.re</title>
                        </Head>
                        <TurniereNavigation/>
                        <div>
                            <PrivateTournamentsListCard/>
                        </div>
                        <Footer/>
                    </div>
                </Option>
                <Option condition={true}>
                    <div className="main generic-fullpage-bg">
                        <Head>
                            <title>Anmeldung</title>
                        </Head>
                        <TurniereNavigation/>
                        <div>
                            <Login
                                hint="Sie müssen angemeldet sein, um diesen Inhalt anzuzeigen!"/>
                        </div>
                        <Footer/>
                    </div>
                </Option>
            </UserRestrictor>
        );
    }
}

function mapStateToCreatePageProperties(state) {
    const {isSignedIn} = state.userinfo;
    return {isSignedIn};
}

const CreatePage = connect(
    mapStateToCreatePageProperties,
)(PrivateTournamentsPage);

export default CreatePage;



class PrivateTournamentsListCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        requestTournamentList('private', response => {
                this.setState({
                    isLoaded: true,
                    items: response.data
                });
            },
            error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            });
        /*
        getRequest(getState(), '/tournaments?type=private')
            .then(
                response => {
                    this.setState({
                        isLoaded: true,
                        items: response.data
                    });
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
         */
    }

    render() {
        return (
            <Container className="py-5">
                <Card className="shadow">
                    <CardBody>
                        <h1 className="custom-font">Private Turniere</h1>
                        {this.state.items.map(item => (
                            //The code should be item.code but the api just supports it this way by now
                            <TournamentListEntry name={item.name} code={item.id} key={item.id}/>
                        ))}
                    </CardBody>
                </Card>
            </Container>
        );
    }
}

function TournamentListEntry(props) {
    return (
        <a className="w-100 d-inline-block mt-2 text-left btn btn-outline-primary" href={ '/t/' + props.code }>
            {props.name}
        </a>
    );
}