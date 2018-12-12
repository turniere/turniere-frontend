import Head from 'next/head';
import React from 'react';
import '../style.css';

import {
    verifyCredentials
} from '../js/api';

class TournamentPage extends React.Component {

    static async getInitialProps({query}) {
        return {query};
    }

    componentDidMount() {
        verifyCredentials();
    }

    render() {
        return (
            <div>
                <Head>
                    <title>Turnie.re - Turnieranzeige</title>
                </Head>
                <p className="example">Turnieranzeige</p>
                <p>Code: {this.props.query.code}</p>
            </div>
        );
    }
}

export default TournamentPage;
