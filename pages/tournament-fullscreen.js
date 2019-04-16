import Head  from 'next/head';
import React from 'react';

class FullscreenTournamentPage extends React.Component {

    static async getInitialProps({query}) {
        return {query};
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
