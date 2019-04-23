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
import React       from 'react';

import {greet, logout} from '../api';
import {notify} from 'react-notify-toast';

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
        const {isSignedIn, username, wasGreeted} = this.props;

        if(isSignedIn) {
            if (!wasGreeted) {
                notify.show('Willkommen, ' + username + '!', 'success', 2500);
                greet();
            }

            return (
                <ButtonGroup className="nav-item">
                    <Button outline color="success"  href="/profile" className="navbar-btn my-2 my-sm-0 px-5">{ username }</Button>
                    <Button outline color="success" onClick={logout.bind(this)} className="navbar-btn my-2 my-sm-0 px-5">Logout</Button>
                </ButtonGroup>
            );
        } else {
            if (!wasGreeted) {
                notify.show('Du bist jetzt abgemeldet!', 'success', 2500);
                greet();
            }

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
    const {isSignedIn, username, wasGreeted} = state.userinfo;
    return {isSignedIn, username, wasGreeted};
};

const LoginLogoutButtons = connect(
    mapStateToLoginLogoutButtonProperties
)(InvisibleLoginLogoutButtons);

