import Head                   from 'next/head';
import React                  from 'react';

import { TurniereNavigation } from '../js/components/Navigation';
import { Footer }             from '../js/components/Footer';
import { Login }              from '../js/components/Login';
import { verifyCredentials }  from '../js/api';

import '../static/everypage.css';

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
