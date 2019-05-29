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

class StatisticsTournamentPage extends React.Component {

    static async getInitialProps({query}) {
        return {query};
    }

    render() {
        /*
        let tournamentStatistics = {
            tournament: {
                code: 'abcd1234',
                description: 'The Overwatch League Season 2 Stage 1',
                id: 0xa1,
                name: 'Overwatch League Season 2019 Stage 1',
                owner_username: 'Blizzard Entertainment Inc.', 
                public: true
            },
            teams: [
                { id: 0x1234, name: 'New York Excelsior' },
                { id: 0x1235, name: 'Los Angeles Gladiators' },
                { id: 0x1236, name: 'San Francisco Shock' },
                { id: 0x1237, name: 'Vancouver Titans' },
                { id: 0x1238, name: 'London Spitfire' },
                { id: 0x1239, name: 'Dallas Fuel' },
                { id: 0x123a, name: 'Chengdu Hunters' },
                { id: 0x123b, name: 'Boston Uprising' },
                { id: 0x123c, name: 'Paris Eternal' },
                { id: 0x123d, name: 'Philadelphia Fusion' },
                { id: 0x123e, name: 'Hangzhou Spark' },
                { id: 0x123f, name: 'Houston Outlaws' },
                { id: 0x1240, name: 'Shanghai Dragons' },
                { id: 0x1241, name: 'Los Angeles Valiant' },
                { id: 0x1242, name: 'Seoul Dynasty' },
                { id: 0x1243, name: 'Atlanta Reign' },
                { id: 0x1244, name: 'Toronto Defiant' },
                { id: 0x1245, name: 'Florida Mayhem' },
                { id: 0x1246, name: 'Washington Justice' },
                { id: 0x1247, name: 'Guangzhou Charge' }
            ],
            group_phase_performances: [
                {
                    win_loss_differential: 7,
                    point_differential: 16,
                    rank: 2,
                    team: 0x1234 // New York Excelsior
                },
                {
                    win_loss_differential: -1,
                    point_differential: 1,
                    rank: 10,
                    team: 0x1235 // Los Angeles Gladiators
                },
                {
                    win_loss_differential: 1,
                    point_differential: 5,
                    rank: 6,
                    team: 0x1236 // San Francisco Shock
                },
                {
                    win_loss_differential: 7,
                    point_differential: 18,
                    rank: 1,
                    team: 0x1237 // Vancouver Titans
                },
                {
                    win_loss_differential: -1,
                    point_differential: -4,
                    rank: 13,
                    team: 0x1238 // London Spitfire
                },
                {
                    win_loss_differential: 1,
                    point_differential: 0,
                    rank: 9,
                    team: 0x1239 //Dallas Fuel
                },
                {
                    win_loss_differential: -1,
                    point_differential: -8,
                    rank: 16,
                    team: 0x123a // Chengdu Hunters
                },
                {
                    win_loss_differential: 1,
                    point_differential: 3,
                    rank: 8,
                    team: 0x123b // Boston Uprising
                },
                {
                    win_loss_differential: -1,
                    point_differential: -8,
                    rank: 17,
                    team: 0x123c // Paris Eternal
                },
                {
                    win_loss_differential: 3,
                    point_differential: 5,
                    rank: 3,
                    team: 0x123d // Philadelphia Fusion
                },
                {
                    win_loss_differential: -1,
                    point_differential: -4,
                    rank: 14,
                    team: 0x123e // Hangzhou Spark
                },
                {
                    win_loss_differential: -1,
                    point_differential: -3,
                    rank: 12,
                    team: 0x123f // Houston Outlaws
                },
                {
                    win_loss_differential: -1,
                    point_differential: -4,
                    rank: 15,
                    team: 0x1240 // Shanghai Dragons
                },
                {
                    win_loss_differential: -7,
                    point_differential: -9,
                    rank: 20,
                    team: 0x1241 // Los Angeles Valiant
                },
                {
                    win_loss_differential: 1,
                    point_differential: 5,
                    rank: 7,
                    team: 0x1242 // Seoul Dynasty
                },
                {
                    win_loss_differential: 1,
                    point_differential: 6,
                    rank: 5,
                    team: 0x1243 // Atlanta Reign
                },
                {
                    win_loss_differential: 3,
                    point_differential: 5,
                    rank: 4,
                    team: 0x1244 // Toronto Defiant
                },
                {
                    win_loss_differential: -5,
                    point_differential: -12,
                    rank: 19,
                    team: 0x1245 // Florida Mayhem
                },
                {
                    win_loss_differential: -5,
                    point_differential: -11,
                    rank: 18,
                    team: 0x1246 // Washington Justice
                },
                {
                    winlossdifferential: -1,
                    pointDifferential: -1,
                    rank: 11,
                    team: 0x1247 // Guangzhou Charge
                }
            ],
            most_dominant_team: {
                id: 0x1234,
                points_made: 94,
                points_received: 3
            },
            least_dominant_team: {
                id: 0x1240,
                points_made: 2,
                points_received: 103
            }
        };
        */

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

export default connect()(StatisticsTournamentPage);
