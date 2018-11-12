import Head from 'next/head'
import '../static/everypage.css'
import {Footer, TurniereNavigation} from "../js/CommonComponents";
import React from "react";
import {Button, Card, CardBody, Container, Form, FormGroup, Input, Label} from "reactstrap";

export default () => (
    <div className="main generic-fullpage-bg">
        <Head>
            <title>Login: turnie.re</title>
        </Head>
        <TurniereNavigation/>
        <div>
            <Login/>
        </div>
        <Footer/>
    </div>
)

function Login() {
    return (
        <Container className="py-5">
            <Card className="shadow">
                <CardBody>
                    <h1 className="custom-font">Login</h1>
                    <LoginForm/>
                    <div className="mt-3">
                        <a href="/register" className="mr-3">Account anlegen</a>
                        <a href="/register#account-requirement">Warum ist ein Account nötig?</a>
                    </div>
                </CardBody>
            </Card>
        </Container>
    );
}

function LoginForm() {
    return (
        <Form>
            <FormGroup>
                <Label for="username">E-Mail-Adresse</Label>
                <Input type="email" name="username"/>
            </FormGroup>
            <FormGroup>
                <Label for="password">Passwort</Label>
                <Input type="password" name="password"/>
            </FormGroup>
            <Button color="success" size="lg" className="w-100 shadow-sm">Anmelden</Button>
        </Form>
    );
}