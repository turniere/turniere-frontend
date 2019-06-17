import React from 'react';
import PropTypes from 'prop-types';
import {Alert, Collapse} from 'reactstrap';

export class WarningPopup extends React.Component {
    render() {
        return (<Collapse isOpen={this.props.shown}>
            <Alert className='mt-2 py-1' color='danger'>
                {this.props.text}
            </Alert>
        </Collapse>);
    }
}

WarningPopup.propTypes = {
    text: PropTypes.string.isRequired,
    shown: PropTypes.bool.isRequired
};
