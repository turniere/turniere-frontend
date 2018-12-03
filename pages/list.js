import Head from 'next/head'
import '../static/everypage.css'
import {Footer, TurniereNavigation} from "../js/CommonComponents";
import React from "react";
import {Card, CardBody, Container} from "reactstrap";
import {getRequest} from "../js/api";

export default () => (
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
)

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
        getRequest('/tournaments?type=public',{})
            .then(
                response => {
                    console.log('response:');
                    console.log(response);
                    this.setState({
                        isLoaded: true,
                        items: response.data.data
                    });
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        return (
            <Container className="py-5">
                <Card className="shadow">
                    <CardBody>
                        <h1 className="custom-font">Öffentliche Turniere</h1>
                        {this.state.items.map(item => (
                            <TournamentListEntry name={item.attributes.name} code={item.attributes.code} key={item.id}/>
                        ))}
                    </CardBody>
                </Card>
            </Container>
        );
    }
}

function TournamentListEntry(props) {
    return (
        <a className="w-100 d-inline-block mt-2 text-left btn btn-outline-primary" href={"/t/"+props.code}>
            {props.name}
        </a>
    );
}