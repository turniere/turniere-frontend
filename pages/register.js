import Head from 'next/head'
import '../static/everypage.css'
import '../static/css/login.css'
import {Footer, TurniereNavigation} from "../js/CommonComponents";
import React from "react";
import {Button, Card, CardBody, Container, Form, FormGroup, FormText, Input, Label} from "reactstrap";

export default () => (
    <div className="main stadium-bg">
        <Head>
            <title>Registrieren: turnie.re</title>
        </Head>
        <TurniereNavigation/>
        <div>
            <Register/>
            <AccountRequirementMarketing/>
        </div>
        <Footer/>
    </div>
)

function Register() {
    return (
        <Container className="py-5">
            <Card className="shadow">
                <CardBody>
                    <h1 className="custom-font">Account anlegen</h1>
                    <RegisterForm/>
                    <div className="mt-3">
                        <a href="/login" className="mr-3">Ich habe bereits einen Account!</a>
                    </div>
                </CardBody>
            </Card>
        </Container>
    );
}

function RegisterForm() {
    return (
        <Form>
            <FormGroup>
                <Label for="username">Benutzername</Label>
                <Input name="username"/>
                <FormText>Wenn du anderen dein Turnier zeigst, können sie deinen Benutzernamen sehen.</FormText>
            </FormGroup>
            <FormGroup>
                <Label for="email">E-Mail-Adresse</Label>
                <Input type="email" name="email"/>
                <FormText>Deine E-Mail-Adresse kann nur von dir gesehen werden.</FormText>
            </FormGroup>
            <FormGroup>
                <Label for="password">Passwort</Label>
                <Input type="password" name="password"/>
                <FormText>Dein Passwort muss mindestens 12 Zeichen lang sein. Alle Zeichen sind erlaubt.</FormText>
            </FormGroup>
            <FormText className="mb-2 mt-4">
                Du akzeptierst die <a href="/privacy">Datenschutzbestimmungen</a>, wenn du auf Registrieren klickst.
            </FormText>
            <Button color="success" size="lg" className="w-100 shadow-sm">Registrieren</Button>
        </Form>
    );
}

function AccountRequirementMarketing() {
    return (
        <Container>
            <Card id="account-requirement">
                <CardBody>
                    <h3 className="custom-font">Warum ein Account nötig ist</h3>
                    <p>Du benötigst deinen Account, damit nur du dein Turnier bearbeiten kannst.</p>
                </CardBody>
            </Card>
        </Container>
    );
}