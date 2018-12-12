import App, {Container} from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withReduxStore from '../js/redux/reduxStoreBinder';
import Notifications from 'react-notify-toast';

class TurniereApp extends App {

    render () {
        const {Component, pageProps, reduxStore} = this.props;
        return (
            <Container>
                <Notifications />
                <Provider store={reduxStore}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        );
    }
}

export default withReduxStore(TurniereApp);
