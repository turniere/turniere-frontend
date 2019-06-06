import Head from 'next/head';
import React from 'react';
import {Container, Table} from 'reactstrap';

import {TurniereNavigation} from '../js/components/Navigation';
import {BigImage} from '../js/components/BigImage';
import {Footer} from '../js/components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../static/css/everypage.css';
import '../static/css/profile.css';
import {connect} from 'react-redux';

function Main() {
    return (<div className="main">
        <Container className="pb-5">
            <UserData/>
        </Container>
    </div>);
}

export default class ProfilePage extends React.Component {
    render() {
        return (<div>
            <Head>
                <title>Profil: turnie.re</title>
            </Head>
            <TurniereNavigation/>
            <BigImage text="turnie.re-Account"/>
            <Main/>
            <Footer/>
        </div>);
    }
}

const UserData = connect(state => {
    return {email: state.userinfo.uid, name: state.userinfo.username};
})(UserDataTable);

function UserDataTable(props) {
    return (<Table>
        <tbody>
            <tr>
                <th className='w-small'>Name</th>
                <td className='w-100'>{props.name}</td>
            </tr>
            <tr>
                <th className='w-small'>E-Mail-Adresse</th>
                <td className='mw-100'>{props.email}</td>
            </tr>
        </tbody>
    </Table>);
}
