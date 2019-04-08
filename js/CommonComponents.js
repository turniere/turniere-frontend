import {
    Badge,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    Container,
    Collapse,
    Form,
    FormGroup,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    Input,
    Label
} from 'reactstrap';
import Head from 'next/head';


import { connect } from 'react-redux';

import React from 'react';

import { login, logout } from './api';

export function BigImage(props) {
    return (
        <div className="big-image">
            <h1 className="display-1">{props.text}</h1>
        </div>
    );
}

export class TurniereNavigation extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            collapsed: true
        };
    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <Navbar color="light" light expand="lg">
                <NavbarBrand href="/">turnie.re</NavbarBrand>
                <Betabadge/>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={!this.state.collapsed} navbar>
                    <Nav navbar className="mr-auto">
                        <Navlink target="/create" text="Turnier erstellen"/>
                        <Navlink target="/list" text="Öffentliche Turniere"/>
                        <Navlink target="/faq" text="FAQ"/>
                    </Nav>
                    <LoginLogoutButtons/>
                </Collapse>
            </Navbar>
        );
    }
}

function Navlink(props) {
    return (
        <NavItem active={true}>
            <NavLink href={props.target}>{props.text}</NavLink>
        </NavItem>
    );
}

function Betabadge() {
    return (<Badge color="danger" className="mr-2">BETA</Badge>);
}

class InvisibleLoginLogoutButtons extends React.Component {

    render() {
        const { isSignedIn, username } = this.props;

        if(isSignedIn) {
            return (
                <ButtonGroup className="nav-item">
                    <Button outline color="success"  href="/profile" className="navbar-btn my-2 my-sm-0 px-5">{ username }</Button>
                    <Button outline color="success" onClick={logout.bind(this)} className="navbar-btn my-2 my-sm-0 px-5">Logout</Button>
                </ButtonGroup>
            );
        } else {
            return (
                <ButtonGroup className="nav-item">
                    <Button outline color="success" href="/login" className="navbar-btn my-2 my-sm-0 px-5">Login</Button>
                    <Button outline color="success" href="/register" className="navbar-btn my-2 my-sm-0 px-5">Registrieren</Button>
                </ButtonGroup>
            );
        }
    }
}

const mapStateToLoginLogoutButtonProperties = (state) => {
    const { isSignedIn, username } = state.userinfo;
    return { isSignedIn, username };
};

const LoginLogoutButtons = connect(
    mapStateToLoginLogoutButtonProperties
)(InvisibleLoginLogoutButtons);

export function Footer() {
    return (
        <footer className="footer mt-5 bg-dark text-light">
            <div className="container py-3">
                <div className="row">
                    <div className="col-md-6 text-center">
                        &copy; 2018 turnie.re &middot;
                        <a className="text-white" href="/privacy"> Datenschutzerklärung </a>
                        &middot;
                        <a className="text-white" href="/imprint"> Impressum</a>
                    </div>
                    <div className="col-md-6 text-center"><a href="#" className="text-white">zurück nach oben</a></div>
                </div>
            </div>
        </footer>
    );
}

class PrivateSignedInEnforcer extends React.Component {

    render() {
        const { isSignedIn, children } = this.props;

        if(isSignedIn) {
            return children;
        } else {
            return (
                <div className="main generic-fullpage-bg">
                    <Head>
                        <title>Anmeldung</title>
                    </Head>
                    <TurniereNavigation/>
                    <div>
                        <Login hint="Sie müssen angemeldet sein, um diesen Inhalt anzuzeigen!"/>
                    </div>
                    <Footer/>
                </div>
            );
        }
    }
}

const mapStateToSignedInEnforcerProperties = (state) => {
    const { isSignedIn } = state.userinfo;
    return { isSignedIn };
}

export const SignedInEnforcer = connect(
    mapStateToSignedInEnforcerProperties
)(PrivateSignedInEnforcer);

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
