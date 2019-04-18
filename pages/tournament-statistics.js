import Head                   from 'next/head';
import React                  from 'react';
import { connect }            from 'react-redux';

class StatisticsTournamentPage extends React.Component {

    static async getInitialProps({query}) {
        return {query};
    }

/*
                    team: 0x1234 // New York Excelsior
                    team: 0x1235 // Los Angeles Gladiators
                    team: 0x1236 // San Francisco Shock
                    team: 0x1237 // Vancouver Titans
                    team: 0x1238 // London Spitfire
                    team: 0x1239 //Dallas Fuel
                    team: 0x123a // Chengdu Hunters
                    team: 0x123b // Boston Uprising
                    team: 0x123c // Paris Eternal
                    team: 0x123d // Philadelphia Fusion
                    team: 0x123e // Hangzhou Spark
                    team: 0x123f // Houston Outlaws
                    team: 0x1240 // Shanghai Dragons
                    team: 0x1241 // Los Angeles Valiant
                    team: 0x1242 // Seoul Dynasty
                    team: 0x1243 // Atlanta Reign
                    team: 0x1244 // Toronto Defiant
                    team: 0x1245 // Florida Mayhem
                    team: 0x1246 // Washington Justice
                    team: 0x1247 // Guangzhou Charge
*/

    render() {
        let tournamentStatistics = {
            tournament: {
                code: 'abcd1234',
                description: '',
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
            groupPhasePerformances: [
                {
                    winlossdifferential: 7,
                    pointDifferential: 16,
                    team: 0x1234 // New York Excelsior
                },
                {
                    winlossdifferential: -1,
                    pointDifferential: 1,
                    team: 0x1235 // Los Angeles Gladiators
                },
                {
                    winlossdifferential: 1,
                    pointDifferential: 5,
                    team: 0x1236 // San Francisco Shock
                },
                {
                    winlossdifferential: 7,
                    pointDifferential: 18,
                    team: 0x1237 // Vancouver Titans
                },
                {
                    winlossdifferential: -1,
                    pointDifferential: -4,
                    team: 0x1238 // London Spitfire
                },
                {
                    winlossdifferential: 1,
                    pointDifferential: 0,
                    team: 0x1239 //Dallas Fuel
                },
                {
                    winlossdifferential: -1,
                    pointDifferential: -8,
                    team: 0x123a // Chengdu Hunters
                },
                {
                    winlossdifferential: 1,
                    pointDifferential: 3,
                    team: 0x123b // Boston Uprising
                },
                {
                    winlossdifferential: -1,
                    pointDifferential: -8,
                    team: 0x123c // Paris Eternal
                },
                {
                    winlossdifferential: 3,
                    pointDifferential: 5,
                    team: 0x123d // Philadelphia Fusion
                },
                {
                    winlossdifferential: -1,
                    pointDifferential: -4,
                    team: 0x123e // Hangzhou Spark
                },
                {
                    winlossdifferential: -1,
                    pointDifferential: -3,
                    team: 0x123f // Houston Outlaws
                },
                {
                    winlossdifferential: -1,
                    pointDifferential: -4,
                    team: 0x1240 // Shanghai Dragons
                },
                {
                    winlossdifferential: -7,
                    pointDifferential: -9,
                    team: 0x1241 // Los Angeles Valiant
                },
                {
                    winlossdifferential: 1,
                    pointDifferential: 5,
                    team: 0x1242 // Seoul Dynasty
                },
                {
                    winlossdifferential: 1,
                    pointDifferential: 6,
                    team: 0x1243 // Atlanta Reign
                },
                {
                    winlossdifferential: 3,
                    pointDifferential: 5,
                    team: 0x1244 // Toronto Defiant
                },
                {
                    winlossdifferential: -5,
                    pointDifferential: -12,
                    team: 0x1245 // Florida Mayhem
                },
                {
                    winlossdifferential: -5,
                    pointDifferential: -11,
                    team: 0x1246 // Washington Justice
                },
                {
                    winlossdifferential: -1,
                    pointDifferential: -1,
                    team: 0x1247 // Guangzhou Charge
                }
            ],
            playoffPerformances: [
            ]

        };

        return (
            <div>
                <Head>
                    <title>Turnie.re - Turnieranzeige (Statistiken)</title>
                </Head>
                <p>Turnieranzeige (Statistiken)</p>
                <p>Code: {this.props.query.code}</p>
            </div>
        );
    }
}

export default connect()(StatisticsTournamentPage);
