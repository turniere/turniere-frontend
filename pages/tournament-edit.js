import Head from 'next/head';
import React from 'react';
import {connect} from 'react-redux';
import {notify} from 'react-notify-toast';
import {
    Col, Container, Button, Card, CardBody, Table, FormGroup, Label
} from 'reactstrap';

import {requestTournament} from '../js/api';
import {TurniereNavigation} from '../js/components/Navigation';
import {BigImage} from '../js/components/BigImage';
import {UserRestrictor, Option} from '../js/components/UserRestrictor';
import {Footer} from '../js/components/Footer';
import {Login} from '../js/components/Login';
import {ErrorPageComponent} from '../js/components/ErrorComponents';
import {updateTeamName} from '../js/api';
import NumericInput from '../js/components/NumericInput';
import {WarningPopup} from '../js/components/WarningPopup';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../static/css/everypage.css';
import '../static/css/index.css';

class EditTournamentPage extends React.Component {
    static async getInitialProps({query}) {
        return {query};
    }

    constructor(props) {
        super(props);

        this.state = {
            validCode: false
        };
    }

    componentDidMount() {
        requestTournament(this.props.query.code, () => {
            this.setState({validCode: true});

            if (this._edittournamentcontent != null) {
                this._edittournamentcontent.notifyOfContentUpdate();
            }
        }, () => {
            this.setState({validCode: false});
        });
    }

    render() {
        const {validCode} = this.state;
        const {tournamentname, ownerUsername, isSignedIn, username} = this.props;

        return (<UserRestrictor>
            <Option condition={validCode && isSignedIn && ownerUsername === username}>
                <div className='pb-5'>
                    <Head>
                        <title>Turnie.re - Turnier bearbeiten</title>
                    </Head>
                    <TurniereNavigation/>

                    <BigImage text={tournamentname}/>
                    <EditTournamentContent ref={edittournamentcontent => {
                        this._edittournamentcontent = edittournamentcontent;
                    }}/>
                    <Footer/>
                </div>
            </Option>
            <Option condition={validCode && isSignedIn}>
                <ErrorPageComponent statusCode={403}/>
            </Option>
            <Option condition={!isSignedIn}>
                <div className="main generic-fullpage-bg">
                    <Head>
                        <title>Turnie.re - Turnier bearbeiten</title>
                    </Head>
                    <TurniereNavigation/>

                    <div>
                        <Login hint="Sie müssen angemeldet sein, um ein Turnier zu bearbeiten."/>
                    </div>
                    <Footer/>
                </div>
            </Option>
            <Option condition={true}>
                <ErrorPageComponent statusCode={404}/>
            </Option>
        </UserRestrictor>);
    }
}

function mapStateToTournamentInfo(state) {
    const {tournamentname, ownerUsername} = state.tournamentinfo;
    const {isSignedIn, username} = state.userinfo;
    return {tournamentname, ownerUsername, isSignedIn, username};
}

export default connect(mapStateToTournamentInfo)(EditTournamentPage);

class EditTournamentContent extends React.Component {
    render() {
        return (<div className='mb-5'>
            <ReturnToTournamentButton/>
            <EditTournamentPropertiesField ref={field => {
                this._edittournamentpropertiesfield = field;
            }}/>
            <EditTeamField ref={field => {
                this._editteamfield = field;
            }}/>
        </div>);
    }

    notifyOfContentUpdate() {
        this._edittournamentpropertiesfield.notifyOfContentUpdate();
        this._editteamfield.notifyOfContentUpdate();
    }
}

function ReturnToTournamentButton() {
    return (<Container className="px-0">
        <Button color="secondary" className="mb-5 w-100" href="./">Zurück zum Turnier</Button>
    </Container>);
}

class EditTournamentPropertiesField extends React.Component {
    render() {
        return (<Card className="container">
            <CardBody>
                <h2>Turnier-Eigenschaften ändern</h2>
                <VisibleEditTournamentForm ref={form => {
                    this._visibleedittournamentform = form;
                }}/>
            </CardBody>
        </Card>);
    }

    notifyOfContentUpdate() {
        this._visibleedittournamentform.getWrappedInstance().notifyOfContentUpdate();
    }
}

class EditTournamentForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            isPublic: false,
            playoffTeamsAmount: 0,
            instantFinalistAmount: 0,
            intermediateRoundParticipants: 0
        };

        this.increasePlayoffTeamsAmount = this.increasePlayoffTeamsAmount.bind(this);
        this.decreasePlayoffTeamsAmount = this.decreasePlayoffTeamsAmount.bind(this);
        this.increaseInstantFinalistsAmount = this.increaseInstantFinalistsAmount.bind(this);
        this.decreaseInstantFinalistsAmount = this.decreaseInstantFinalistsAmount.bind(this);
        this.increaseIntermediateRoundParticipants = this.increaseIntermediateRoundParticipants.bind(this);
        this.decreaseIntermediateRoundParticipants = this.decreaseIntermediateRoundParticipants.bind(this);
    }

    render() {
        const {name, description, isPublic} = this.state;

        return (<div>
            <div className="form-group">
                <label htmlFor="name">Turnier-Name</label>
                <input className="form-control" type="text" name="name" id="edittournament-textfield-name"
                    value={name} placeholder={name} onChange={this.handleNameInput.bind(this)}/>
            </div>
            <div className="form-group">
                <label htmlFor="name">Turnier-Beschreibung</label>
                <input className="form-control" type="text" name="name" id="edittournament-textfield-description"
                    value={description} placeholder={description}
                    onChange={this.handleDescriptionInput.bind(this)}/>
            </div>
            <div className="form-group custom-control custom-checkbox">
                <input className="custom-control-input" type="checkbox" name="isPublic"
                    id="edittournament-checkbox-isPublic" value={isPublic}
                    onChange={this.handlePublicInput.bind(this)}/>
                <label htmlFor="isPublic" className="custom-control-label">Das Turnier öffentlich anzeigen</label>
            </div>
            <WarningPopup
                text="Die Anzahl der Teams im Playoff muss der Anzahl an Teams, die direkt im Playoff sind
                plus der Hälfte der Anzahl an Teams in der Zwischenrunde entsprechen."
                shown={this.state.playoffTeamsAmount !== this.state.instantFinalistAmount +
                (this.state.intermediateRoundParticipants / 2)}>
                <FormGroup>
                    <Label for="playoff-teams-amount">Anzahl Teams in der Playoff-Stage</Label>
                    <Col xs="3" className="pl-0">
                        <NumericInput value={this.state.playoffTeamsAmount}
                            incrementText="&#215;2" incrementCallback={this.increasePlayoffTeamsAmount}
                            decrementText="&#247;2" decrementCallback={this.decreasePlayoffTeamsAmount}/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Label for="instant-finalists-amount">
                        Anzahl Teams, die direkt in die Playoff-Stage weiter kommen</Label>
                    <Col xs="3" className="pl-0">
                        <NumericInput value={this.state.instantFinalistAmount}
                            incrementText="+1" incrementCallback={this.increaseInstantFinalistsAmount}
                            decrementText="-1" decrementCallback={this.decreaseInstantFinalistsAmount}/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Label for="intermediate-round-participants">
                        Anzahl Teams, die in einer Zwischenrunde um die Playoff-Stage spielen müssen</Label>
                    <Col xs="3" className="pl-0">
                        <NumericInput value={this.state.intermediateRoundParticipants}
                            incrementText="+1" incrementCallback={this.increaseIntermediateRoundParticipants}
                            decrementText="-1" decrementCallback={this.decreaseIntermediateRoundParticipants}/>
                    </Col>
                </FormGroup>
            </WarningPopup>
            <div className="form-group">
                <div className="input-group">
                    <Button color="success" className="px-5" id="edittournament-button"
                        onClick={this.handleClick.bind(this)}>Ändern</Button>
                </div>
            </div>
        </div>);
    }

    notifyOfContentUpdate() {
        const {name, description, isPublic, playoffTeamsAmount, instantFinalistAmount,
            intermediateRoundParticipants} = this.props;

        this.setState({
            playoffTeamsAmount: playoffTeamsAmount,
            instantFinalistAmount: instantFinalistAmount,
            intermediateRoundParticipants: intermediateRoundParticipants,
            name: name ? name : '', description: description ? description : '', isPublic: isPublic
        });
    }

    handleClick() {
        // TODO: Apply changes to the tournament properties
    }

    handleNameInput(input) {
        this.setState({name: input.target.value});
    }

    handleDescriptionInput(input) {
        this.setState({description: input.target.value});
    }

    handlePublicInput(input) {
        this.setState({public: input.target.value});
    }


    increasePlayoffTeamsAmount() {
        this.setState({playoffTeamsAmount: this.state.playoffTeamsAmount * 2});
    }

    decreasePlayoffTeamsAmount() {
        if (this.state.playoffTeamsAmount > 1) {
            this.setState({playoffTeamsAmount: Math.floor(this.state.playoffTeamsAmount / 2)});
        }
    }

    increaseInstantFinalistsAmount() {
        this.setState({instantFinalistAmount: this.state.instantFinalistAmount + 1});
    }

    decreaseInstantFinalistsAmount() {
        if (this.state.instantFinalistAmount > 1) {
            this.setState({instantFinalistAmount: this.state.instantFinalistAmount - 1});
        }
    }

    increaseIntermediateRoundParticipants() {
        this.setState({intermediateRoundParticipants: this.state.intermediateRoundParticipants + 1});
    }

    decreaseIntermediateRoundParticipants() {
        if (this.state.intermediateRoundParticipants > 1) {
            this.setState({intermediateRoundParticipants: this.state.intermediateRoundParticipants - 1});
        }
    }
}

function mapStateToTournamentFormProps(state) {
    const {name, description, isPublic, stages, playoffTeamsAmount, instantFinalistAmount,
        intermediateRoundParticipants} = state.tournamentinfo;
    return {name, description, isPublic, stages, playoffTeamsAmount, instantFinalistAmount,
        intermediateRoundParticipants};
}

const VisibleEditTournamentForm = connect(mapStateToTournamentFormProps, null, null,
    {withRef: true})(EditTournamentForm);

class EditTeamField extends React.Component {
    render() {
        return (<Card className="container my-4">
            <CardBody>
                <h2>Team-Namen ändern</h2>
                <VisibleEditTeamNamesForm ref={form => {
                    this._visibleeditteamnamesform = form;
                }}/>
            </CardBody>
        </Card>);
    }

    notifyOfContentUpdate() {
        this._visibleeditteamnamesform.getWrappedInstance().notifyOfContentUpdate();
    }
}

class EditTeamNamesForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teams: []
        };
    }

    render() {
        const {teams} = this.state;

        return (<div>
            <Table className="table-striped mt-3">
                <tbody>
                    {teams.map((team, index) => <tr key={index}>
                        <td><Button outline size="sm" className="changeTeamnameButton"
                            id={'editteam-button-team_' + team.id}
                            onClick={this.handleClick.bind(this, index)}>Ändern</Button></td>
                        <td className="w-100"><input className="form-control" type="text"
                            id={'editteam-textfield-team_' + team.id} value={team.name}
                            placeholder={team.name}
                            onChange={this.handleNameInput.bind(this, index)}/></td>
                    </tr>)}
                </tbody>
            </Table>
        </div>);
    }

    notifyOfContentUpdate() {
        const {teams} = this.props;

        this.setState({
            teams: teams
        });
    }

    handleNameInput(index, input) {
        const team = this.state.teams.slice();

        team[index].name = input.target.value;

        this.setState({
            teams: team
        });
    }

    handleClick(index) {
        updateTeamName(this.state.teams[index], () => {
            notify.show('Team Name wurde erfolgreich geändert.', 'success', 5000);
        }, () => {
            notify.show('Team Name konnte nicht geändert werden.', 'warning', 5000);
        });
    }
}

function mapStateToTeamFormProps(state) {
    const {teams} = state.tournamentinfo;
    return {teams};
}

const VisibleEditTeamNamesForm = connect(mapStateToTeamFormProps, null, null, {withRef: true})(EditTeamNamesForm);

