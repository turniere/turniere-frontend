import Head from 'next/head';
import '../static/everypage.css';
import {Footer, TurniereNavigation} from '../js/CommonComponents';
import React from 'react';
import { Button, Card, CardBody, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { login } from '../js/api';
import { connect } from 'react-redux';

export default () => (
    <div className="main generic-fullpage-bg">
        <Head>
            <title>Login: turnie.re</title>
        </Head>
        <TurniereNavigation/>
        <div>
            <Login/>
        </div>
        <Footer/>
    </div>
);

function Login() {
    return (
        <Container className="py-5">
            <Card className="shadow">
                <CardBody>
                    <h1 className="custom-font">Login</h1>
                    <LoginForm/>
                    <div className="mt-3">
                        <a href="/register" className="mr-3">Account anlegen</a>
                        <a href="/register#account-requirement">Warum ist ein Account nötig?</a>
                    </div>
                </CardBody>
            </Card>
        </Container>
    );
}

class LoginErrorList extends React.Component {
    render() {
        const { error, errorMessages } = this.props;
        if(error) {
            return (
                <ul>
                    { errorMessages.map((message, index) => 
                        <li key={index}>
                            <style jsx>{`
                                li {
                                    color:red;
                                }
                            `}</style>
                            {message}
                        </li>

                    ) }
                </ul>
            );
        } else {
            return null;
        }
    }
}

const mapStateToErrorMessages = (state) => {
    const { errorMessages, error } = state.userinfo;
    return { errorMessages, error };
};

const VisibleLoginErrorList = connect(
    mapStateToErrorMessages
)(LoginErrorList);


class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email : '',
            password : ''
        };
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="username">E-Mail-Adresse</Label>
                    <Input type="email" name="username" value={this.state.email} onChange={ this.handleEmailInput.bind(this) } />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Passwort</Label>
                    <Input type="password" name="password" value={this.state.password} onChange={ this.handlePasswordInput.bind(this) } />
                </FormGroup>
                <Button onClick={login.bind(this, this.state.email, this.state.password)} color="success" size="lg" className="w-100 shadow-sm">Anmelden</Button>
                <VisibleLoginErrorList/>
            </Form>
        );
    }

    handlePasswordInput(input) {
        this.setState({ password : input.target.value });
    }

    handleEmailInput(input) {
        this.setState({ email : input.target.value });
    }
}