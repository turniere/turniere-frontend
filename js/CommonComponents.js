import {
    Badge,
    Button,
    ButtonGroup,
    Collapse,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink
} from 'reactstrap';

import { connect } from 'react-redux';

import React from 'react';

import { logout } from './api';

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
