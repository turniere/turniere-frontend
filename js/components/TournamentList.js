import React from 'react';
import {requestTournamentList} from '../api';

export default class TournamentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tournaments: []
        };
    }

    componentDidMount() {
        requestTournamentList(this.props.type, tournaments => {
            this.setState({
                tournaments: tournaments
            });
        }, () => {});
    }

    render() {
        if (this.state.tournaments.length === 0) {
            return <p className="text-center border-light font-italic text-secondary border-top border-bottom p-1">keine
                Turniere vorhanden</p>;
        } else {
            return this.state.tournaments.map(item => (
                //The code should be item.code but the api just supports it this way by now
                <TournamentListEntry name={item.name} code={item.id} key={item.id}/>
            ));
        }
    }
}

function TournamentListEntry(props) {
    return (
        <a className="w-100 d-inline-block mt-2 text-left btn btn-outline-primary" href={'/t/' + props.code}>
            {props.name}
        </a>
    );
}