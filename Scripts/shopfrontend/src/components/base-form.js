import { Modal, Button } from "react-bootstrap"
import React, { Component } from "react"


class BaseForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            show: props.show,
            name: "",
            address: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("handle submit");
        console.log(this.state);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        var that = this;
        const childWithProp = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {handleChange: that.handleChange, handleClose: that.handleClose});
        });
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {childWithProp}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default BaseForm;