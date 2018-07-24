import { Modal, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import React, { Component } from "react"

class StoreEditModal extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        console.log(props);
        this.state = {
            show: props.show,
            name: props.store.name,
            address: props.store.address,
            id: props.store.id
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.store) {
            this.setState({
                name: nextProps.store.name,
                address: nextProps.store.address,
                id: nextProps.store.id
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        this.props.handleCallbackSubmit(this.state);      
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleClose() {
        this.props.parentCallbackClose();
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new Store</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                        <FormGroup controlId="formControlsName">
                            <ControlLabel>Name</ControlLabel>
                            <FormControl name="name" type="text" placeholder="name" defaultValue={this.state.name} />
                        </FormGroup>
                        <FormGroup controlId="formControlsAddress">
                            <ControlLabel>Address</ControlLabel>
                            <FormControl name="address" type="text" placeholder="address" defaultValue={this.state.address} />
                        </FormGroup>
                        <input type="hidden" name="id" value={this.state.id}/>
                        <p><input type="submit" value="Submit" /></p>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default StoreEditModal;