import Head  from 'next/head';
import React from 'react';

import {
    verifyCredentials
} from '../js/api';

class FullscreenTournamentPage extends React.Component {

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
                    <title>Turnie.re - Turnieranzeige (Vollbild)</title>
                </Head>
                <p>Turnieranzeige (Vollbild)</p>
                <p>Code: {this.props.query.code}</p>
            </div>
        );
    }
}

export default FullscreenTournamentPage;
