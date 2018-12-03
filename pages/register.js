import Head from 'next/head'
import '../static/everypage.css'
import {Footer, TurniereNavigation} from "../js/CommonComponents";
import React from "react";
import {Button, Card, CardBody, Container, Form, FormGroup, FormText, Input, Label} from "reactstrap";
import { register } from '../js/api'

export default () => (
    <div className="main generic-fullpage-bg">
        <Head>
            <title>Registrieren: turnie.re</title>
        </Head>
        <TurniereNavigation/>
        <div>
            <Register/>
            <AccountRequirementMarketing/>
        </div>
        <Footer/>
    </div>
)

function Register() {
    return (
        <Container className="py-5">
            <Card className="shadow">
                <CardBody>
                    <h1 className="custom-font">Account anlegen</h1>
                    <RegisterForm/>
                    <div className="mt-3">
                        <a href="/login" className="mr-3">Ich habe bereits einen Account!</a>
                    </div>
                </CardBody>
            </Card>
        </Container>
    );
}

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username : '',
            email : '',
            password : ''
        };
    }

    handleRegisterClick(state) {
        const { username, email, password } = state;

        console.log(state);

        console.log(username);
        console.log(email);
        console.log(password);
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="username">Benutzername</Label>
                    <Input name="username" value={this.state.username} onChange={ this.handleUsernameInput.bind(this) } />
                    <FormText>Wenn du anderen dein Turnier zeigst, können sie deinen Benutzernamen sehen.</FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="email">E-Mail-Adresse</Label>
                    <Input type="email" name="email" value={this.state.email} onChange={ this.handleEmailInput.bind(this) } />
                    <FormText>Deine E-Mail-Adresse kann nur von dir gesehen werden.</FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Passwort</Label>
                    <Input type="password" name="password" value={this.state.password} onChange={ this.handlePasswordInput.bind(this) } />
                    <FormText>Dein Passwort muss mindestens 12 Zeichen lang sein. Alle Zeichen sind erlaubt.</FormText>
                </FormGroup>
                <FormText className="mb-2 mt-4">
                    Du akzeptierst die <a href="/privacy">Datenschutzbestimmungen</a>, wenn du auf Registrieren klickst.
                </FormText>
                <Button onClick={ this.handleRegisterClick.bind(this.state) /* register.bind(this.state.username, this.state.email, this.state.password) */ } color="success" size="lg" className="w-100 shadow-sm">Registrieren</Button>
            </Form>
        );
    }

    handlePasswordInput(input) {
        this.setState({ password : input.target.value });
    }

    handleEmailInput(input) {
        this.setState({ email : input.target.value });
    }

    handleUsernameInput(input) {
        this.setState({ username : input.target.value });
    }
}

function AccountRequirementMarketing() {
    return (
        <Container>
            <Card id="account-requirement">
                <CardBody>
                    <h3 className="custom-font">Warum ein Account nötig ist</h3>
                    <p>Du benötigst deinen Account, damit nur du dein Turnier bearbeiten kannst.</p>
                </CardBody>
            </Card>
        </Container>
    );
}