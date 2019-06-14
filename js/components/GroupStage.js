import {Card, CardBody, Col, Row, Table} from 'reactstrap';
import {Match} from './Match';
import React from 'react';

export default function GroupStage(props) {
    return (<div className='py-5 px-5'>
        <h1 className='custom-font'>Gruppenphase</h1>
        <Row>
            {props.groups.map(group => <Group group={group} key={group.id} isSignedIn={props.isSignedIn}
                isOwner={props.isOwner}/>)}
        </Row>
    </div>);
}

function Group(props) {
    return (<Col className='minw-25'>
        <Card>
            <CardBody>
                <h3 className='custom-font'>Gruppe {props.group.id + 1}</h3>
                {props.group.matches.map((match => (
                    <Match match={match} isSignedIn={props.isSignedIn} isOwner={props.isOwner} key={match.id}/>)))}
                <GroupScoresTable scores={props.group.scores}/>
            </CardBody>
        </Card>
    </Col>);
}

function GroupScoresTable(props) {
    return (<Table className='mt-4' striped size='sm' responsive>
        <thead>
            <tr>
                <th>Team</th>
                <th>Punkte</th>
                <th>erzielt</th>
                <th>kassiert</th>
            </tr>
        </thead>
        <tbody>
            {props.scores.map(groupScore => <GroupScoresTableRow score={groupScore} key={groupScore.id}/>)}
        </tbody>
    </Table>);
}


function GroupScoresTableRow(props) {
    return (<tr>
        <td>{props.score.team.name}</td>
        <td>{props.score.group_points}</td>
        <td>{props.score.received_points}</td>
        <td>{props.score.scored_points}</td>
    </tr>);
}
