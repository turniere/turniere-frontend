import React from 'react';
import { 
    Alert,
    Button, 
    Input, 
    InputGroup, 
    InputGroupAddon 
} from 'reactstrap';

export default class EditableStringList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: props.entries
        };
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
    }

    add(text) {
        if (text === '' || this.state.entries.includes(text)) {
            return false;
        }
        this.state.entries.push(text);
        this.setState({entries: this.state.entries});
        this.props.onChange(this.state.entries);
        return true;
    }

    remove(text) {
        let tmp = this.state.entries.filter(item => item !== text);
        this.setState({entries: tmp});
        this.props.onChange(tmp);
    }

    render() {
        if ((typeof this.state.entries !== 'undefined') && this.state.entries.length > 0) {
            return (
                <div className="bg-light p-3 text-secondary font-italic">
                    <StringInput submit={this.add} placeholder={this.props.inputPlaceholder} addButtonText={this.props.addButtonText}/>
                    {this.state.entries.map((text) => <Item text={text} key={text} removeItem={this.remove}/>)}
                </div>
            );
        } else {
            return (
                <div className="bg-light p-3 text-secondary text-center font-italic">
                    <StringInput submit={this.add} placeholder={this.props.inputPlaceholder} addButtonText={this.props.addButtonText}/>
                    {this.props.placeholder}
                </div>
            );
        }
    }
}

class StringInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <InputGroup className="mb-3">
                <Input placeholder={this.props.placeholder} type="text" size="255" value={this.state.value} required onChange={this.handleChange} onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        this.submit();
                        return false;
                    }
                }}/>
                <InputGroupAddon addonType="append">
                    <Button color="success" outline={true}
                        onClick={() => this.submit()}>{this.props.addButtonText}</Button>
                </InputGroupAddon>
            </InputGroup>
        );
    }

    submit() {
        if (this.props.submit(this.state.value)) {
            this.setState({value: ''});
        }
    }
}

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({visible: false});
        this.props.removeItem(this.props.text);
    }

    render() {
        return (
            <Alert className="d-inline-block m-2" color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                {this.props.text}
            </Alert>
        );
    }
}