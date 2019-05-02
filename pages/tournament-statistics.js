import Head                   from 'next/head';
import React                  from 'react';
import { connect }            from 'react-redux';
import {
    Button,
    Card,
    CardBody,
    Container,
    ListGroup,
    ListGroupItem,
    Table
} from 'reactstrap';

import { TurniereNavigation } from '../js/components/Navigation';
import { BigImage } from '../js/components/BigImage';
import { Footer } from '../js/components/Footer';
import { Order, sort } from '../js/utils/sort';


class TeamRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{ this.props.teamToShow.rank }</td>
                <td className="w-100">{this.findTeam(this.props.teams, this.props.teamToShow.team).name}</td>
                <td className="text-center">{ this.props.teamToShow.winlossdifferential }</td>
                <td className="text-center">{ this.props.teamToShow.pointDifferential }</td>
            </tr>
        );
    }


    findTeam(teams, id) {
        for(let i = 0; i < teams.length; i++) {
            if(teams[i].id === id) {
                return teams[i];
            }
        }
        return null;
    }
}

class StatisticsComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let performances = this.props.data.groupPhasePerformances;

        /**
         * comparison(p1, p2) < 0 => p1 < p2
         * comparison(p1, p2) = 0 => p1 = p2
         * comparison(p1, p2) > 0 => p1 > p2
         */
        let sortedPerformances = sort(performances, (p1, p2) => {
            return (p2.winlossdifferential - p1.winlossdifferential) * 100 + (p2.pointDifferential - p1.pointDifferential);
        }, Order.descending);

        return (
            <Card className="shadow">
                <CardBody>
                    <h1 className="custom-font">Aktuelle Rangliste</h1>
                    <Table className="table-striped mt-3">
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Team Name</th>
                                <th className="text-center">Match Differenz</th>
                                <th className="text-center">Punkt Differenz</th>
                            </tr>
                            { sortedPerformances.map((team, index) => (
                                <TeamRow key={index} teams={this.props.data.teams} teamToShow={team}/>
                            )) }
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        );
    }
}

class StatisticsTournamentPage extends React.Component {

    static async getInitialProps({query}) {
        return {query};
    }

    render() {
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
            groupPhasePerformances: [
                {
                    winlossdifferential: 7,
                    pointDifferential: 16,
                    rank: 2,
                    team: 0x1234 // New York Excelsior
                },
                {
                    winlossdifferential: -1,
                    pointDifferential: 1,
                    rank: 10,
                    team: 0x1235 // Los Angeles Gladiators
                },
                {
                    winlossdifferential: 1,
                    pointDifferential: 5,
                    rank: 6,
                    team: 0x1236 // San Francisco Shock
                },
                {
                    winlossdifferential: 7,
                    pointDifferential: 18,
                    rank: 1,
                    team: 0x1237 // Vancouver Titans
                },
                {
                    winlossdifferential: -1,
                    pointDifferential: -4,
                    rank: 13,
                    team: 0x1238 // London Spitfire
                },
                {
                    winlossdifferential: 1,
                    pointDifferential: 0,
                    rank: 9,
                    team: 0x1239 //Dallas Fuel
                },
                {
                    winlossdifferential: -1,
                    pointDifferential: -8,
                    rank: 16,
                    team: 0x123a // Chengdu Hunters
                },
                {
                    winlossdifferential: 1,
                    pointDifferential: 3,
                    rank: 8,
                    team: 0x123b // Boston Uprising
                },
                {
                    winlossdifferential: -1,
                    pointDifferential: -8,
                    rank: 17,
                    team: 0x123c // Paris Eternal
                },
                {
                    winlossdifferential: 3,
                    pointDifferential: 5,
                    rank: 3,
                    team: 0x123d // Philadelphia Fusion
                },
                {
                    winlossdifferential: -1,
                    pointDifferential: -4,
                    rank: 14,
                    team: 0x123e // Hangzhou Spark
                },
                {
                    winlossdifferential: -1,
                    pointDifferential: -3,
                    rank: 12,
                    team: 0x123f // Houston Outlaws
                },
                {
                    winlossdifferential: -1,
                    pointDifferential: -4,
                    rank: 15,
                    team: 0x1240 // Shanghai Dragons
                },
                {
                    winlossdifferential: -7,
                    pointDifferential: -9,
                    rank: 20,
                    team: 0x1241 // Los Angeles Valiant
                },
                {
                    winlossdifferential: 1,
                    pointDifferential: 5,
                    rank: 7,
                    team: 0x1242 // Seoul Dynasty
                },
                {
                    winlossdifferential: 1,
                    pointDifferential: 6,
                    rank: 5,
                    team: 0x1243 // Atlanta Reign
                },
                {
                    winlossdifferential: 3,
                    pointDifferential: 5,
                    rank: 4,
                    team: 0x1244 // Toronto Defiant
                },
                {
                    winlossdifferential: -5,
                    pointDifferential: -12,
                    rank: 19,
                    team: 0x1245 // Florida Mayhem
                },
                {
                    winlossdifferential: -5,
                    pointDifferential: -11,
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
            mostDominantTeam: {
                id: 0x1234,
                pointsMade: 94,
                pointsReceived: 3
            },
            leastDominantTeam: {
                id: 0x1240,
                pointsMade: 2,
                pointsReceived: 103
            }
        };

        return (
            <div>
                <Head>
                    <title>{tournamentStatistics.tournament.name}: turnie.re</title>
                </Head>
                <TurniereNavigation/>
                <BigImage text={tournamentStatistics.tournament.name}/>
                <div className='pb-5'>
                    <TournamentInformationView tournament={tournamentStatistics.tournament}/>
                    <Container className="py-5">
                        <StatisticsComponent data={tournamentStatistics}/>
                    </Container>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default connect()(StatisticsTournamentPage);

class PrivateTournamentInformationView extends React.Component {

    render() {
        const { tournament, isSignedIn, username } = this.props;

        return (
            <Container>
                <TournamentButton id={tournament.id} ownerName={tournament.owner_username} isSignedIn={isSignedIn} username={username}/>
                <p>{tournament.description}</p>
                <ListGroup>
                    <ListGroupItem>
                        {tournament.isPublic ? 'Das Turnier ist öffentlich.' : 'Das Turnier ist privat.'}
                    </ListGroupItem>
                    <ListGroupItem>Turnier-Code: <b>{tournament.code}</b></ListGroupItem>
                    <ListGroupItem>von <b>{tournament.owner_username}</b></ListGroupItem>
                </ListGroup>
            </Container>
        );
    }
}

function mapStateToPrivateTournamentInformationViewProps(state) {
    const { isSignedIn, username } = state.userinfo;
    return { isSignedIn, username };
}

const TournamentInformationView = connect(
    mapStateToPrivateTournamentInformationViewProps
)(PrivateTournamentInformationView);

class TournamentButton extends React.Component {
    render() {
        const { id } = this.props;
        return <Button href={'/t/' + id} outline color='secondary'>Zum Turnier</Button>;
    }
}
