import { Modal, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import React, { Component } from "react"

class ProductEditModal extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        console.log(props);
        this.state = {
            show: props.show,
            name: props.product.name,
            price: props.product.price,
            id: props.product.id
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.product) {
            this.setState({
                name: nextProps.product.name,
                price: nextProps.product.price,
                id: nextProps.product.id
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
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
                    <Modal.Title>Add new Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                        <FormGroup controlId="formControlsName">
                            <ControlLabel>Name</ControlLabel>
                            <FormControl name="name" type="text" placeholder="name" defaultValue={this.state.name} />
                        </FormGroup>
                        <FormGroup controlId="formControlsAddress">
                            <ControlLabel>Price</ControlLabel>
                            <FormControl name="price" type="number" step="0.01" placeholder="price" defaultValue={this.state.price} />
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

export default ProductEditModal;