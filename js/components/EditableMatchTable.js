import React from 'react';
import {Button, Input, InputGroup, InputGroupAddon, Table} from 'reactstrap';

export function EditableMatchTable(props) {
    return (<Table className='mb-0'>
        <tbody>
            <tr>
                <td className='scoreInput border-top-0'>
                    <ScoreInput score={props.match.team1.score}/>
                </td>
                <td className='align-middle border-top-0'>{props.match.team1.name}</td>
            </tr>
            <tr>
                <td className='scoreInput'>
                    <ScoreInput score={props.match.team2.score}/>
                </td>
                <td className='align-middle'>{props.match.team2.name}</td>
            </tr>
        </tbody>
    </Table>);
}

class ScoreInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {score: this.props.score};
        this.updateScore = this.updateScore.bind(this);
        this.increaseScore = this.increaseScore.bind(this);
        this.decreaseScore = this.decreaseScore.bind(this);
    }

    updateScore(event) {
        this.setState({score: event.target.value});
    }

    increaseScore() {
        this.setState({score: Number(this.state.score) + 1});
    }

    decreaseScore() {
        this.setState({score: Number(this.state.score) - 1});
    }

    render() {
        return (<InputGroup>
            <InputGroupAddon addonType="prepend"><Button onClick={this.decreaseScore} color='danger'
                outline={true}>-1</Button></InputGroupAddon>
            <Input className='font-weight-bold' value={this.state.score} onChange={this.updateScore} type='number'
                step='1' placeholder='0'/>
            <InputGroupAddon addonType="append"><Button onClick={this.increaseScore}
                color='success'>+1</Button></InputGroupAddon>
        </InputGroup>);
    }
}
