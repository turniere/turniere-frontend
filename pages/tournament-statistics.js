import Head from 'next/head';
import React from 'react';
import {connect} from 'react-redux';
import {
    Col,
    Container,
    Row
} from 'reactstrap';

import {TurniereNavigation} from '../js/components/Navigation';
import {TournamentInformationView} from '../js/components/TournamentInformationView';
import {BigImage} from '../js/components/BigImage';
import {StandingsTable} from '../js/components/StandingsTable';
import {DominanceShower} from '../js/components/DominanceShower';
import {Footer} from '../js/components/Footer';
import {requestTournamentStatistics} from '../js/api';

class StatisticsTournamentPage extends React.Component {
    static async getInitialProps({query}) {
        return {query};
    }

    componentDidMount() {
        requestTournamentStatistics(this.props.query.code, () => {}, () => {});
    }

    render() {
        const {tournamentStatistics} = this.props;

        return (
            <div>
                <Head>
                    <title>{tournamentStatistics.name}: turnie.re</title>
                </Head>
                <TurniereNavigation/>
                <BigImage text={tournamentStatistics.name}/>
                <div className='pb-5'>
                    <TournamentInformationView tournament={tournamentStatistics} currentpage='statistics'/>
                    <StatisticsView tournamentStatistics={tournamentStatistics} />
                </div>
                <Footer/>
            </div>
        );
    }
}

function StatisticsView(props) {
    if (props.tournamentStatistics.statistics_available) {
        return (<div>
            <Container className="py-5">
                <Row>
                    <Col xs="6">
                        <DominanceShower stats={props.tournamentStatistics.most_dominant_team}
                            title="Stärkstes Team"/>
                    </Col>
                    <Col xs="6">
                        <DominanceShower stats={props.tournamentStatistics.least_dominant_team}
                            title="Schwächstes Team"/>
                    </Col>
                </Row>
            </Container>
            <Container className="pb-5">
                <StandingsTable data={props.tournamentStatistics}/>
            </Container>
        </div>);
    } else {
        return (<Container className="py-5">
            <h2 className="text-center">Statistiken sind für dieses Turnier leider nicht verfügbar.</h2>
        </Container>);
    }
}

function mapTournamentStatisticsToProps(state) {
    const {tournamentStatistics} = state;
    return {tournamentStatistics};
}

export default connect(
    mapTournamentStatisticsToProps
)(StatisticsTournamentPage);
