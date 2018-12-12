import { ErrorPageComponent } from '../js/components/ErrorComponents.js';

import {
    verifyCredentials
} from '../js/api';

export default class Error extends React.Component {
    static getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : 400;
        return { statusCode };
    }

    componentDidMount() {
        verifyCredentials();
    }

    render() {
        return (
            <ErrorPageComponent statusCode={this.props.statusCode}/>
        );
    }
}
