import Head                   from 'next/head';
import React                  from 'react';
import { connect }            from 'react-redux';
import {
    Button,
    Card,
    CardBody,
    Container,
    Form,
    FormGroup,
    FormText,
    Input,
    Label
} from 'reactstrap';

import { TurniereNavigation } from '../js/components/Navigation';
import { Footer }             from '../js/components/Footer';
import { register }           from '../js/api';
import {
    verifyCredentials,
    clearErrors
}  from '../js/api';

import '../static/everypage.css';

export default class RegisterPage extends React.Component {

    componentDidMount() {
        verifyCredentials();
    }

    render() {
        return (
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
        );
    }
}

class Register extends React.Component {

    componentDidMount() {
        clearErrors();
    }

    render() {
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
}

class RegisterErrorList extends React.Component {
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

const VisibleRegisterErrorList = connect(
    mapStateToErrorMessages
)(RegisterErrorList);

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username : '',
            email : '',
            password : ''
        };
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
                <Button onClick={ register.bind(this, this.state.username, this.state.email, this.state.password) } color="success" size="lg" className="w-100 shadow-sm">Registrieren</Button>
                <VisibleRegisterErrorList/>
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