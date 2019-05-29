import Head                   from 'next/head';
import React                  from 'react';
import { connect }            from 'react-redux';
import {
    Col,
    Container,
    Row
} from 'reactstrap';

import { TurniereNavigation } from '../js/components/Navigation';
import { TournamentInformationView } from '../js/components/TournamentInformationView';
import { BigImage } from '../js/components/BigImage';
import { StandingsTable } from '../js/components/StandingsTable';
import { DominanceShower } from '../js/components/DominanceShower';
import { Footer } from '../js/components/Footer';
import { requestTournamentStatistics } from '../js/api';

class StatisticsTournamentPage extends React.Component {

    static async getInitialProps({query}) {
        return {query};
    }

    componentDidMount() {
        requestTournamentStatistics(this.props.query.code, () => {}, () => {});
    }

    render() {
        const { tournamentStatistics } = this.props;

        return (
            <div>
                <Head>
                    <title>{tournamentStatistics.name}: turnie.re</title>
                </Head>
                <TurniereNavigation/>
                <BigImage text={tournamentStatistics.name}/>
                <div className='pb-5'>
                    <TournamentInformationView tournament={tournamentStatistics} currentpage='statistics'/>
                    <Container className="py-5">
                        <Row>
                            <Col xs="6">
                                <DominanceShower stats={tournamentStatistics.most_dominant_team} title="Stärkstes Team"/>
                            </Col>
                            <Col xs="6">
                                <DominanceShower stats={tournamentStatistics.least_dominant_team} title="Schwächstes Team"/>
                            </Col>
                        </Row>
                    </Container>
                    <Container className="pb-5">
                        <StandingsTable data={tournamentStatistics}/>
                    </Container>
                </div>
                <Footer/>
            </div>
        );
    }
}

function mapTournamentStatisticsToProps(state) {
    const {tournamentStatistics} = state;
    return {tournamentStatistics};
}

export default connect(
    mapTournamentStatisticsToProps
)(StatisticsTournamentPage);
