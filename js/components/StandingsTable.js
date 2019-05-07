import React from 'react';
import {
    Button,
    Card,
    CardBody,
    Collapse,
    Table
} from 'reactstrap';

import { rangedmap } from '../utils/rangedmap';
import { findTeam } from '../utils/findTeam';
import { Order, sort } from '../utils/sort';

export class StandingsTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showFullTable: false
        };
        this.toggleShowFullTable = this.toggleShowFullTable.bind(this);
    }

    render() {
        let performances = this.props.data.group_phase_performances;

        /**
         * comparison(p1, p2) < 0 => p1 < p2
         * comparison(p1, p2) = 0 => p1 = p2
         * comparison(p1, p2) > 0 => p1 > p2
         */
        let sortedPerformances = sort(performances, (p1, p2) => p1.rank - p2.rank, Order.descending);

        return (
            <Card className="shadow-sm">
                <CardBody>
                    <h1 className="custom-font">Aktuelle Rangliste</h1>
                    <Table className="mt-3 mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Team Name</th>
                                <th className="text-center">Match Differenz</th>
                                <th className="text-center">Punkt Differenz</th>
                            </tr>
                        </thead>
                        <tbody>
                            { rangedmap(sortedPerformances, (team, index) => (
                                <TeamRow className={(index % 2 === 0)? 'bg-light' : 'bg-white'} key={index} teams={this.props.data.teams} teamToShow={team}/>
                            ), 0, 3) }
                        </tbody>
                        <Collapse isOpen={ this.state.showFullTable } tag="tbody">
                            { rangedmap(sortedPerformances, (team, index) => (
                                <TeamRow className={(index % 2 === 0)? 'bg-light' : 'bg-white'} key={index} teams={this.props.data.teams} teamToShow={team}/>
                            ), 3) }
                        </Collapse>
                        <tfoot>
                            <tr>
                                <td colSpan='4'>
                                    <TableButton isFullTableShown={this.state.showFullTable} onToggle={this.toggleShowFullTable}/>
                                </td>
                            </tr>
                        </tfoot>
                    </Table>
                </CardBody>
            </Card>
        );
    }

    toggleShowFullTable() {
        this.setState({ showFullTable: !this.state.showFullTable });
    }
}

class TeamRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr className={this.props.className}>
                <td>{ this.props.teamToShow.rank }</td>
                <td className="w-100">{findTeam(this.props.teams, this.props.teamToShow.team).name}</td>
                <td className="text-center">{ this.props.teamToShow.win_loss_differential }</td>
                <td className="text-center">{ this.props.teamToShow.point_differential }</td>
            </tr>
        );
    }
}

class TableButton extends React.Component {

    render() {
        const { isFullTableShown } = this.props;

        if(isFullTableShown) {
            return <Button className="w-100" onClick={this.props.onToggle}>Zeige nur die 3 besten Teams</Button>;
        } else {
            return <Button className="w-100" onClick={this.props.onToggle}>Zeige alle Teams</Button>;
        }
    }
}
