import Head from 'next/head';
import '../static/everypage.css';
import { Footer, TurniereNavigation, UserRestrictor, Option, Login } from '../js/CommonComponents';
import React from 'react';
import { connect } from 'react-redux';

import {
    Button,
    Card,
    CardBody,
    Container,
    CustomInput,
    Fade,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';

import {
    verifyCredentials
} from '../js/api';

import EditableStringList from '../js/EditableStringList';

class PrivateCreatePage extends React.Component {

    componentDidMount() {
        verifyCredentials();
    }

    render() {
        const { isSignedIn } = this.props;

        return (
            <UserRestrictor>
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
            </UserRestrictor>
        );
    }
}

function mapStateToCreatePageProperties(state) {
    const { isSignedIn } = state.userinfo;
    return { isSignedIn };
}

const CreatePage = connect(
    mapStateToCreatePageProperties
)(PrivateCreatePage);

export default CreatePage;

function CreateTournamentCard() {
    return (
        <Container className="py-5">
            <Card className="shadow">
                <CardBody>
                    <h1 className="custom-font">Turnier erstellen</h1>
                    <CreateTournamentForm/>
                </CardBody>
            </Card>
        </Container>
    );
}

class CreateTournamentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {fadeIn: false, teams: []};
        this.toggle = this.toggle.bind(this);
        this.teamListUpdate = this.teamListUpdate.bind(this);
    }

    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label for="name">Name des Turniers</Label>
                        <Input type="text" name="name" size="255" required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Beschreibung (optional)</Label>
                        <Input type="text" name="description" size="255"/>
                    </FormGroup>
                    <FormGroup>
                        <CustomInput type="checkbox" id="public"
                            label="Turnier öffentlich anzeigen (schreibgeschützt)"/>
                        <CustomInput type="checkbox" id="mix-teams" label="Teams mischen"/>
                        <CustomInput type="checkbox" id="group-phase" label="Gruppenphase" onClick={this.toggle}/>
                    </FormGroup>
                    <Fade in={this.state.fadeIn} tag="div" className="mt-3" baseClass="d-none"
                        baseClassActive="d-block">
                        <FormGroup>
                            <Label for="teams-per-group">Anzahl Teams pro Gruppe</Label>
                            <Input type="number" name="teams-per-group" size="255"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="teams-group-to-playoff">Wie viele Teams sollen nach der Gruppenphase
                                weiterkommen?</Label>
                            <Input type="number" name="teams-group-to-playoff" size="255"/>
                        </FormGroup>
                    </Fade>
                </Form>
                <h3 className="custom-font mt-4">Teams</h3>
                <EditableStringList addButtonText="hinzufügen" placeholder="Keine Teams hinzugefügt!" entries={[]}
                    onChange={this.teamListUpdate} inputPlaceholder="Teamname"/>
                <Button color="success" size="lg" className="w-100 shadow-sm mt-4">Turnier erstellen</Button>
            </div>
        );
    }

    teamListUpdate(list) {
        this.setState({teams: list});
    }

    toggle() {
        this.setState({
            fadeIn: !this.state.fadeIn
        });
    }
}