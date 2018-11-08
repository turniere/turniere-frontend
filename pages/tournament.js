import Head from 'next/head'

class TournamentPage extends React.Component {

    static async getInitialProps({query}) {
        return {query}
    }

    render() {
        return (
            <div>
                <Head>
                    <title>Turnie.re - Turnieranzeige</title>
                </Head>
                <p>Turnieranzeige</p>
                <p>Code: {this.props.query.code}</p>
            </div>
        );
    }
}

export default TournamentPage