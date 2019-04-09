import Head from 'next/head';
import '../static/everypage.css';
import { TurniereNavigation } from '../js/components/Navigation';
import { Footer } from '../js/components/Footer.js';
import { Login } from '../js/components/Login.js';
import React from 'react';

import {
    verifyCredentials
} from '../js/api';

export default class LoginPage extends React.Component {

    componentDidMount() {
        verifyCredentials();
    }

    render() {
        return (
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
    }
}
