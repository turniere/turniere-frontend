import App, {Container} from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withReduxStore from '../js/redux/reduxStoreBinder';
import { verifyCredentials } from '../js/api';

class TurniereApp extends App {

    componentDidMount() {
        verifyCredentials();
    }

    render () {
        const {Component, pageProps, reduxStore} = this.props;
        return (
            <Container>
                <Provider store={reduxStore}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        );
    }
}

export default withReduxStore(TurniereApp);
