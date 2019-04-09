import Head                   from 'next/head';
import React                  from 'react';
import {
    Card,
    CardBody,
    Container
} from 'reactstrap';

import { TurniereNavigation } from '../js/components/Navigation';
import { Footer }             from '../js/components/Footer';
import {
    getRequest,
    getState,
    verifyCredentials
} from '../js/api';

import '../static/everypage.css';

export default class ListPage extends React.Component {

    componentDidMount() {
        verifyCredentials();
    }
  
    render() {
        return (
            <div className="main generic-fullpage-bg">
                <Head>
                    <title>Öffentliche Turniere: turnie.re</title>
                </Head>
                <TurniereNavigation/>
                <div>
                    <TournamentList/>
                </div>
                <Footer/>
            </div>
        );
    }
}

class TournamentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        getRequest(getState(), '/tournaments?type=public')
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
    }

    render() {
        return (
            <Container className="py-5">
                <Card className="shadow">
                    <CardBody>
                        <h1 className="custom-font">Öffentliche Turniere</h1>
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
