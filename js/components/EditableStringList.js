import React from 'react';
import { 
    Alert,
    Button,
    Card,
    CardBody,
    CardTitle,
    CardText,
    Input, 
    InputGroup, 
    InputGroupAddon 
} from 'reactstrap';

import '../../static/css/editablestringlist.css';

export default class EditableStringList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: props.teams,
            groups: props.groups
        };
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
    }

    add(text) {
        if (text === '' || this.state.teams.includes(text)) {
            return false;
        }
        this.state.teams.push(text);
        
        var lastGroup = this.state.groups[this.state.groups.length - 1];
        if(lastGroup === undefined || lastGroup.length === this.props.groupSize) {
            this.state.groups[this.state.groups.length] = [];
        }
        lastGroup = this.state.groups[this.state.groups.length - 1];
        lastGroup[lastGroup.length] = text;

        this.setState({
            teams: this.state.teams,
            groups: this.state.groups
        });

        this.props.onTeamsChange(this.state.teams);
        this.props.onGroupsChange(this.state.groups);

        return true;
    }

    remove(text) {
        let tmp = this.state.teams.filter(item => item !== text);
        this.setState({teams: tmp});
        this.props.onTeamsChange(tmp);
    }

    render() {
        if(this.props.groupPhaseEnabled) {
            if ((typeof this.state.teams !== 'undefined') && this.state.teams.length > 0) {
                return (
                    <div className="bg-light p-3 text-secondary font-italic">
                        <StringInput submit={this.add} placeholder={this.props.inputPlaceholder} addButtonText={this.props.addButtonText}/>
                        <GroupView groups={this.state.groups} removeTeam={this.remove} onGroupSwitched={this.onGroupSwitch}/>
                    </div>
                );
            } else {
                return (
                    <div className="bg-light p-3 text-secondary text-center font-italic">
                        <StringInput submit={this.add} placeholder={this.props.inputPlaceholder} addButtonText={this.props.addButtonText}/>
                        {this.props.groupPlaceHolder}
                    </div>
                );
            }
        } else {
            if ((typeof this.state.teams !== 'undefined') && this.state.teams.length > 0) {
                return (
                    <div className="bg-light p-3 text-secondary font-italic">
                        <StringInput submit={this.add} placeholder={this.props.inputPlaceholder} addButtonText={this.props.addButtonText}/>
                        {this.state.teams.map((text) => <Item text={text} key={text} removeItem={this.remove}/>)}
                    </div>
                );
            } else {
                return (
                    <div className="bg-light p-3 text-secondary text-center font-italic">
                        <StringInput submit={this.add} placeholder={this.props.inputPlaceholder} addButtonText={this.props.addButtonText}/>
                        {this.props.teamPlaceholder}
                    </div>
                );
            }
        }
    }
}

class GroupView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.groups.map((group, groupindex) => (
                    <Card className="group-card" key={groupindex}>
                        <CardBody>
                            <CardTitle>Group {groupindex + 1}</CardTitle>
                            {group.map((team, teamindex) => (
                                <Item text={team} key={team} removeItem={this.props.removeTeam}/>
                            ))}
                        </CardBody>
                    </Card>
                ))}
            </div>
        );
    }
}

class StringInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <InputGroup className="mb-3">
                <Input placeholder={this.props.placeholder} type="text" size="255" value={this.state.value} required onChange={this.handleChange} onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        this.submit();
                        return false;
                    }
                }}/>
                <InputGroupAddon addonType="append">
                    <Button color="success" outline={true}
                        onClick={() => this.submit()}>{this.props.addButtonText}</Button>
                </InputGroupAddon>
            </InputGroup>
        );
    }

    submit() {
        if (this.props.submit(this.state.value)) {
            this.setState({value: ''});
        }
    }
}

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({visible: false});
        this.props.removeItem(this.props.text);
    }

    render() {
        return (
            <Alert className="team-item m-2" color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                {this.props.text}
            </Alert>
        );
    }
}