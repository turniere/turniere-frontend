import Head from 'next/head';
import React from 'react';
import {notify} from 'react-notify-toast';
import {connect} from 'react-redux';
import posed from 'react-pose';

import {
    Button, Card, CardBody, Container, CustomInput, Form, FormGroup, Input, Label
} from 'reactstrap';

import {TurniereNavigation} from '../js/components/Navigation';
import {Footer} from '../js/components/Footer';
import {UserRestrictor, Option} from '../js/components/UserRestrictor';
import {Login} from '../js/components/Login';
import EditableStringList from '../js/components/EditableStringList';
import {createTournament} from '../js/api';

import '../static/css/everypage.css';

class CreatePage extends React.Component {
    render() {
        const {isSignedIn} = this.props;

        return (<UserRestrictor>
            <Option condition={isSignedIn}>
                <div className="main generic-fullpage-bg">
                    <Head>
                        <title>Turnier erstellen: turnie.re</title>
                    </Head>
                    <TurniereNavigation/>
                    <div>
                        <CreateTournamentCard/>
                    </div>
                    <Footer/>
                </div>
            </Option>
            <Option condition={true}>
                <div className="main generic-fullpage-bg">
                    <Head>
                        <title>Anmeldung</title>
                    </Head>
                    <TurniereNavigation/>
                    <div>
                        <Login hint="Sie müssen angemeldet sein, um diesen Inhalt anzuzeigen!"/>
                    </div>
                    <Footer/>
                </div>
            </Option>
        </UserRestrictor>);
    }
}

function mapStateToCreatePageProperties(state) {
    const {isSignedIn} = state.userinfo;
    return {isSignedIn};
}

export default connect(mapStateToCreatePageProperties)(CreatePage);

function CreateTournamentCard() {
    return (<Container className="py-5">
        <Card className="shadow">
            <CardBody>
                <h1 className="custom-font">Turnier erstellen</h1>
                <CreateTournamentForm/>
            </CardBody>
        </Card>
    </Container>);
}

const GroupphaseFader = posed.div({
    visible: {
        opacity: 1, height: 150
    }, hidden: {
        opacity: 0, height: 0
    }
});

class CreateTournamentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupPhaseEnabled: false,

            name: '', description: '', public: false,

            groupSize: 4, groupAdvance: 1, teams: [], groups: []
        };
        this.handleGroupPhaseEnabledInput = this.handleGroupPhaseEnabledInput.bind(this);
        this.teamListUpdate = this.teamListUpdate.bind(this);
        this.groupListUpdate = this.groupListUpdate.bind(this);
        this.create = this.create.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
        this.handlePublicInput = this.handlePublicInput.bind(this);
        this.handleGroupSizeInput = this.handleGroupSizeInput.bind(this);
        this.handleGroupAdvanceInput = this.handleGroupAdvanceInput.bind(this);

        this.create = this.create.bind(this);
    }

    render() {
        return (<div>
            <Form>
                <FormGroup>
                    <Label for="name">Name des Turniers</Label>
                    <Input type="text" name="name" size="255" required value={this.state.name}
                        onChange={this.handleNameInput}/>
                </FormGroup>
                <FormGroup>
                    <Label for="description">Beschreibung (optional)</Label>
                    <Input type="text" name="description" size="255" value={this.state.description}
                        onChange={this.handleDescriptionInput}/>
                </FormGroup>
                <FormGroup>
                    <CustomInput type="checkbox" id="public"
                        label="Turnier öffentlich anzeigen (schreibgeschützt)" checked={this.state.public}
                        onChange={this.handlePublicInput}/>
                    <CustomInput type="checkbox" id="mix-teams" label="Teams mischen"/>
                    <CustomInput type="checkbox" id="group-phase" label="Gruppenphase"
                        checked={this.state.groupPhaseEnabled}
                        onChange={this.handleGroupPhaseEnabledInput}/>
                </FormGroup>
                <GroupphaseFader pose={this.state.groupPhaseEnabled ? 'visible' : 'hidden'}
                    className="groupphasefader">
                    <FormGroup>
                        <Label for="teams-per-group">Anzahl Teams pro Gruppe</Label>
                        <Input type="number" name="teams-per-group" min="3"
                            value={this.state.groupSize} onChange={this.handleGroupSizeInput}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="teams-group-to-playoff">Wie viele Teams sollen nach der Gruppenphase
                                weiterkommen?</Label>
                        <Input type="number" name="teams-group-to-playoff" min="1" max={this.state.groupSize - 1}
                            value={this.state.groupAdvance} onChange={this.handleGroupAdvanceInput}/>
                    </FormGroup>
                </GroupphaseFader>
            </Form>
            <h3 className="custom-font mt-4">Teams</h3>
            <EditableStringList
                addButtonText="hinzufügen"
                teamPlaceholder="Keine Teams hinzugefügt!"
                groupPlaceHolder="Keine Gruppen verfügbar!"
                teams={[]}
                groups={[]}
                groupPhaseEnabled={this.state.groupPhaseEnabled}
                groupSize={this.state.groupSize}
                onTeamsChange={this.teamListUpdate}
                onGroupsChange={this.groupListUpdate}
                inputPlaceholder="Teamname"/>
            <Button color="success" size="lg" className="w-100 shadow-sm mt-4" onClick={this.create}>Turnier
                    erstellen</Button>
        </div>);
    }

    teamListUpdate(list) {
        this.setState({teams: list});
    }

    groupListUpdate(list) {
        this.setState({groups: list});
    }

    handleGroupSizeInput(input) {
        const newSize = input.target.value;
        if (newSize <= this.state.groupAdvance) {
            this.setState({
                groupSize: newSize, groupAdvance: newSize - 1
            });
        } else {
            this.setState({groupSize: newSize});
        }
    }

    handleGroupAdvanceInput(input) {
        this.setState({groupAdvance: input.target.value});
    }

    handleGroupPhaseEnabledInput(input) {
        this.setState({groupPhaseEnabled: input.target.checked});
    }

    handleNameInput(input) {
        this.setState({name: input.target.value});
    }

    handleDescriptionInput(input) {
        this.setState({description: input.target.value});
    }

    handlePublicInput(input) {
        this.setState({public: input.target.checked});
    }

    create() {
        createTournament({
            'name': this.state.name,
            'description': this.state.description,
            'public': this.state.public,
            'group_stage': this.state.groupPhaseEnabled,
            'teams': createTeamArray(this.state.groupPhaseEnabled, this.state.groups, this.state.teams)
        }, () => {
            notify.show('Das Turnier wurde erfolgreich erstellt.', 'success', 5000);
        }, () => {
            notify.show('Das Turnier konnte nicht erstellt werden.', 'warning', 5000);
        });
    }
}

/**
 * This method creates an array of team objects that conform to the currently
 * api specs available at https://apidoc.turnie.re/
 *
 * @param {boolean} groupphase Whether a group phase is to be created
 * @param {string[][]} groups The teams split into the groups that are
 *     to be used in the group phase of the tournament. Please note that
 *     according to the api every team can only occur once (not enforced
 *     by this method) and that every team from {@param teams} will have
 *     to be in one of the groups (also not enforced by this method, but
 *     might lead to inconsistencies)
 * @param {string[]} teams An array containing all names of the teams
 *     that are to be created for the tournament
 * @return {Object[]} an array of teams that can be directly sent to the
 *     backend
 */
function createTeamArray(groupphase, groups, teams) {
    const result = [];

    if (groupphase) {
        for (let groupNumber = 0; groupNumber < groups.length; groupNumber++) {
            for (let groupMember = 0; groupMember < groups[groupNumber].length; groupMember++) {
                result[result.length] = {
                    'name': groups[groupNumber][groupMember], 'group': groupNumber
                };
            }
        }
    } else {
        for (let i = 0; i < teams.length; i++) {
            result[i] = {'name': teams[i]};
        }
    }

    return result;
}
