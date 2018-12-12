import Head from 'next/head';
import React from 'react';

import {
    verifyCredentials
} from '../js/api';

export default class ListPage extends React.Component {

    componentDidMount() {
        verifyCredentials();
    }

    render() {
        return (
            <div>
                <Head>
                    <title>Turnie.re - Turnierliste</title>
                </Head>
                <p>Turnierliste</p>
            </div>
        );
    }
}
