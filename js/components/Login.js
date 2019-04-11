import {
    Container,
    Card,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
import React       from 'react';
import { connect } from 'react-redux';

import { login }   from '../api';

export function Login(props) {
    return (
        <Container className="py-5">
            <Card className="shadow">
                <CardBody>
                    <h1 className="custom-font">Login</h1>
                    <Hint hint={props.hint}/>
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

function Hint(props) {
    if(props.hint != null) {
        return (
            <h3>{ props.hint }</h3>
        );
    } else {
        return null;
    }
}
