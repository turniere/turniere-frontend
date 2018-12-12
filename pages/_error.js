import { ErrorPageComponent } from '../js/components/ErrorComponents.js';

export default class Error extends React.Component {
    static getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : 400;
        return { statusCode };
    }

    render() {
        return (
            <ErrorPageComponent statusCode={this.props.statusCode}/>
        );
    }
}
