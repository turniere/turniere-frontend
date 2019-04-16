import React from 'react';
import { 
    Alert,
    Button,
    Card,
    CardBody,
    CardTitle,
    Input, 
    InputGroup, 
    InputGroupAddon 
} from 'reactstrap';

import '../../static/css/editablestringlist.css';

export default class EditableStringList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groupSize: props.groupSize,
            teams: props.teams,
            groups: props.groups
        };
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.onGroupSwitch = this.onGroupSwitch.bind(this);
    }

    add(text) {
        if (text === '' || this.state.teams.includes(text)) {
            return false;
        }
        this.state.teams.push(text);
        
        var lastGroup = this.state.groups[this.state.groups.length - 1];
        if(lastGroup === undefined || lastGroup.length >= this.state.groupSize) {
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
        if(this.removeTeamFromGroup(text) === false) {
            return false;
        }

        this.setState({
            teams: this.state.teams,
            groups: this.state.groups
        });

        this.props.onTeamsChange(this.state.teams);
        this.props.onGroupsChange(this.state.groups);
    }

    removeTeamFromGroup(text) {
        this.state.teams = this.state.teams.filter(item => item !== text);

        let teamIndex = this.findTeam(text);
        if(teamIndex === null) {
            return false;
        }
        
        // Move every first team to the next group
        this.state.groups[teamIndex.group].splice(teamIndex.team, 1);
        for(var group = teamIndex.group; group < this.state.groups.length - 1; group++) {
            let currentGroup = this.state.groups[group];
            currentGroup[currentGroup.length] = this.state.groups[group + 1].splice(0, 1)[0];
        }

        // delete the last group in case it is empty
        if(this.state.groups[this.state.groups.length - 1].length === 0) {
            this.state.groups.splice(this.state.groups.length - 1, 1);
        }

        return true;
    }

    findTeam(text) {
        for(var group = 0; group < this.state.groups.length; group++) {
            for(var team = 0; team < this.state.groups[group].length; team++) {
                if(this.state.groups[group][team] === text) {
                    return {
                        group: group,
                        team: team
                    };
                }
            }
        }
        return null;
    }

    resizeGroups(newSize) {
        let oldGroups = this.state.groups;
        var rearrangedGroups = [];

        for(var oldGroupIndex = 0; oldGroupIndex < oldGroups.length; oldGroupIndex++) {
            for(var oldTeamIndex = 0; oldTeamIndex < oldGroups[oldGroupIndex].length; oldTeamIndex++) {
                let index = oldGroupIndex * this.state.groupSize + oldTeamIndex;

                let newGroupIndex = Math.floor(index / newSize);
                let newTeamIndex = index % newSize;

                if(newTeamIndex === 0) {
                    rearrangedGroups[newGroupIndex] = [];
                }

                rearrangedGroups[newGroupIndex][newTeamIndex] = oldGroups[oldGroupIndex][oldTeamIndex];
            }
        }

        this.setState({
            groupSize: newSize,
            groups: rearrangedGroups
        });
        this.props.onGroupsChange(this.state.groups);
    }

    onGroupSwitch(src, dest) {
        console.log('Switched src (' + JSON.stringify(src) + ') to dest (' + JSON.stringify(dest) + ')' );
    }

    render() {
        if(this.props.groupSize !== this.state.groupSize) {
            this.resizeGroups(this.props.groupSize);
        }

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
                                <div key={team} draggable droppable="droppable"
                                      onDragStart={(e) => this.onDragStart(e, groupindex,teamindex)}
                                      onDragOver={(e) => this.onDragOver(e)}
                                      onDrop={(e) => this.onDrop(e, groupindex, teamindex)}>

                                    <Item text={team} removeItem={this.props.removeTeam}/>

                                </div>
                            ))}
                        </CardBody>
                    </Card>
                ))}
            </div>
        );
    }

    onDragStart(e, group, team) {
        e.dataTransfer.setData(
            'text/plain',
            JSON.stringify({
                group: group,
                team: team
            })
        );
    }

    onDragOver(e) {
        e.preventDefault();
    }

    onDrop(e, group, team) {
        e.preventDefault();

        let src = JSON.parse(e.dataTransfer.getData('text'));
        let dest = {
            group: group,
            team: team
        };

        this.props.onGroupSwitched(src, dest);
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