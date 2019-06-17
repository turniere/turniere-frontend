import React from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap';

export class WarningPopup extends React.Component {
    render() {
        if (this.props.shown) {
            return (<div>
                {this.props.children}
                <Alert className="mt-2" color="danger">
                    {this.props.text}
                </Alert>
            </div>);
        } else {
            return this.props.children;
        }
    }
}

WarningPopup.propTypes = {
    text: PropTypes.string.isRequired,
    shown: PropTypes.bool.isRequired
};
