import Head from 'next/head'
import '../static/everypage.css'
import {Footer, TurniereNavigation} from "../js/CommonComponents";
import React from "react";
import {
    Button,
    Card,
    CardBody,
    Container,
    CustomInput, Fade,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    Label
} from "reactstrap";

export default () => (
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
)

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
        this.state = { fadeIn: false };
        this.toggle = this.toggle.bind(this);
    }

    render() {
        return (
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
                    <CustomInput type="checkbox" id="public" label="Turnier öffentlich anzeigen (schreibgeschützt)"/>
                    <CustomInput type="checkbox" id="mix-teams" label="Teams mischen"/>
                    <CustomInput type="checkbox" id="group-phase" label="Gruppenphase" onClick={this.toggle}/>
                </FormGroup>
                <FormGroup>
                    <Label for="teams">Teams</Label>
                    <InputGroup>
                        <Input placeholder="Teamname" type="text" name="teams" size="255" required/>
                        <InputGroupAddon addonType="append">
                            <Button color="success">hinzufügen</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
                <TeamsContainer/>
                <Fade in={this.state.fadeIn} tag="div" className="mt-3" baseClass="d-none" baseClassActive="d-block">
                    <FormGroup>
                        <Label for="teams-per-group">Anzahl Teams pro Gruppe</Label>
                        <Input type="number" name="teams-per-group" size="255"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="teams-group-to-playoff">Wie viele Teams sollen nach der Gruppenphase weiterkommen?</Label>
                        <Input type="number" name="teams-group-to-playoff" size="255"/>
                    </FormGroup>
                </Fade>
                <Button color="success" size="lg" className="w-100 shadow-sm mt-3">Turnier erstellen</Button>
            </Form>
        );
    }

    toggle() {
        this.setState({
            fadeIn: !this.state.fadeIn
        });
    }
}

function TeamsContainer() {
    return (
        <div className="bg-light p-3 text-secondary text-center font-italic">
            Noch keine Teams hinzugefügt!
        </div>
    );
}