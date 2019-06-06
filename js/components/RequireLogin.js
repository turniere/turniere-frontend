import React from 'react';
import {connect} from 'react-redux';
import Head from 'next/head';
import {TurniereNavigation} from './Navigation';
import {Login} from './Login';
import {Footer} from './Footer';

class RequireLogin extends React.Component {
    render() {
        if (this.props.isSignedIn) {
            return this.props.children;
        }
        const loginHint = this.props.loginMessage === undefined ?
            'Sie müssen angemeldet sein, um diesen Inhalt anzuzeigen!' : this.props.loginMessage;

        return (<div className="main generic-fullpage-bg">
            <Head>
                <title>Anmeldung</title>
            </Head>
            <TurniereNavigation/>
            <div>
                <Login hint={loginHint}/>
            </div>
            <Footer/>
        </div>);
    }
}

export default connect(state => {
    return {isSignedIn: state.userinfo.isSignedIn};
})(RequireLogin);
