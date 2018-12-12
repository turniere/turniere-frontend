import Head from 'next/head';
import React from 'react';

import { requestTournament } from '../js/api';
import { BigImage, Footer, TurniereNavigation } from '../js/CommonComponents.js';
import { ErrorPageComponent } from '../js/components/ErrorComponents.js';

import {
    Container,
    Button,
    Card,
    CardBody,
    CardTitle,
    Table
} from 'reactstrap';

import { connect } from 'react-redux';

import '../static/everypage.css';
import '../static/css/index.css';

class EditTournamentPage extends React.Component {

    static async getInitialProps({query}) {
        return {query};
    }

    constructor(props) {
        super(props);

        this.state = {
            validCode: true
        };
    }

    componentDidMount() {
        requestTournament(this.props.query.code, () => {
            this.setState({ validCode: true });
            this._edittournamentcontent.notifyOfContentUpdate();
        }, () => {
            this.setState({ validCode: false });
        });
    }

    render() {
        const { validCode } = this.state;
        const { name } = this.props;

        if(validCode) {
            return (
                <div>
                    <Head>
                        <title>Turnie.re - Turnier bearbeiten</title>
                    </Head>
                    <TurniereNavigation/>
                    <BigImage text={ name }/>

                    <EditTournamentContent ref={(edittournamentcontent) => { this._edittournamentcontent = edittournamentcontent; }}/>
                    
                    <Footer/>
                </div>
            );
        } else {
            return (
                <ErrorPageComponent statusCode={ 404 }/>
            );
        }
    }
}

function mapStateToTournamentInfo(state) {
    const { name } = state.tournamentinfo;
    return { name };
}

export default connect(
    mapStateToTournamentInfo
)(EditTournamentPage);

class EditTournamentContent extends React.Component {

    render() {
        const { code } = this.props;

        return (
            <div>
                <ReturnToTournamentButton/>
                <EditTournamentPropertiesField ref={(field) => { this._edittournamentpropertiesfield = field; }}/>
                <EditTeamField ref={(field) => { this._editteamfield = field; }}/>
            </div>
        );
    }

    notifyOfContentUpdate() {
        this._edittournamentpropertiesfield.notifyOfContentUpdate();
        this._editteamfield.notifyOfContentUpdate();
    }
}

function ReturnToTournamentButton() {
    return (
        <Container className="px-0">
            <Button color="secondary" className="mb-5 w-100" href="./">Zurück zum Turnier</Button>
        </Container>
    );
}

class EditTournamentPropertiesField extends React.Component {

    render() {
        return (
            <Card className="container">
                <CardBody>
                    <h2>Turnier-Eigenschaften ändern</h2>
                    <VisibleEditTournamentForm ref={(form) => { this._visibleedittournamentform = form; }}/>
                </CardBody>
            </Card>
        );
    }

    notifyOfContentUpdate() {
        this._visibleedittournamentform.getWrappedInstance().notifyOfContentUpdate();
    }
}

class EditTournamentForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name : '',
            description : '',
            isPublic : false
        };
    }

    render() {
        const { name, description, isPublic } = this.state;

        return (
            <div>
                <div className="form-group">
                    <label htmlFor="name">Turnier-Name</label>
                    <input className="form-control" type="text" name="name" id="name" value={ name } placeholder={ name } onChange={ this.handleNameInput.bind(this) } />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Turnier-Beschreibung</label>
                    <input className="form-control" type="text" name="name" id="name" value={ description } placeholder={ description } onChange={ this.handleDescriptionInput.bind(this) } />
                </div>
                <div className="form-group custom-control custom-checkbox">
                    <input className="custom-control-input" type="checkbox" name="isPublic" id="isPublic" value={ isPublic } onChange={ this.handlePublicInput.bind(this) } />
                    <label htmlFor="isPublic" className="custom-control-label">Das Turnier öffentlich anzeigen</label>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <Button color="success" className="px-5" onClick={ this.handleClick.bind(this) }>Ändern</Button>
                    </div>
                </div>
            </div>
        );
    }

    notifyOfContentUpdate() {
        const { name, description, isPublic } = this.props;
        
        this.setState({
            name : name? name : '',
            description : description? description : '',
            isPublic : isPublic
        });
    }

    handleClick(input) {
        // TODO: Apply changes to the tournament properties
    }

    handleNameInput(input) {
        this.setState({ name : input.target.value });
    }

    handleDescriptionInput(input) {
        this.setState({ description : input.target.value });
    }

    handlePublicInput(input) {
        this.setState({ public : input.target.value });
    }
}

function mapStateToTournamentFormProps(state) {
    const { name, description, isPublic } = state.tournamentinfo;
    return { name, description, isPublic };
}

const VisibleEditTournamentForm = connect(
    mapStateToTournamentFormProps,
    null, null, { withRef : true}
)(EditTournamentForm);

class EditTeamField extends React.Component {

    render() {
        return (
            <Card className="container my-4">
                <CardBody>
                    <h2>Team-Namen ändern</h2>
                    <VisibleEditTeamNamesForm ref={(form) => { this._visibleeditteamnamesform = form; }}/>
                </CardBody>
            </Card>
        );
    }

    notifyOfContentUpdate() {
        this._visibleeditteamnamesform.getWrappedInstance().notifyOfContentUpdate();
    }
}

class EditTeamNamesForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            teams : []
        };
    }

    render() {
        const { teams } = this.state;

        return (
            <div>
                <Table className="table-striped mt-3">
                    <tbody>
                        {
                            teams.map((team, index) => {

                            })
                        }
                    </tbody>
                </Table>
            </div>
        );
    }

    notifyOfContentUpdate() {
        const { teams } = this.props;
        
        this.setState({
            teams : teams
        });
    }

    handleClick(input) {
        // TODO: Apply changes to the tournament properties
    }

    handleNameInput(input) {
        this.setState({ name : input.target.value });
    }
}

function mapStateToTeamFormProps(state) {
    const { teams } = state.tournamentinfo;
    return { teams };
}

const VisibleEditTeamNamesForm = connect(
    mapStateToTeamFormProps,
    null, null, { withRef : true }
)(EditTeamNamesForm);

