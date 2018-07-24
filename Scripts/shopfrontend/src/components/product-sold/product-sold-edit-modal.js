import React, { Component } from "react"
import { Modal, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import DateTimePicker from 'react-datetime-picker';
import "./clock.css"

class ProductSoldEditModal extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        var date_string = props.productSold ? props.productSold.date_sold: new Date().toISOString();
        this.state = {
            show: props.show,
            store_id: props.productSold ? props.productSold.store_id : "",
            product_id: props.productSold ? props.productSold.product_id : "",
            customer_id: props.productSold ? props.productSold.customer_id: "",
            date_sold: date_string,
            id: props.productSold ? props.productSold.id : "",
            products: [],
            customers: [],
            stores: [],
            date: new Date(date_string)
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange = date => {
        try {
            this.setState({ date, date_sold: date.toISOString() });
            console.log(date, this.state.date_sold);
        } catch (err) {

        }
        
    }

    componentWillReceiveProps(nextProps) {
        var date_string = nextProps.productSold && nextProps.productSold.date_sold  
            ? nextProps.productSold.date_sold: new Date().toISOString();
        if(nextProps.productSold) {
            this.setState({
                id: nextProps.productSold.id,
                date_sold: date_string,
                product_id: nextProps.productSold.product_id,
                customer_id: nextProps.productSold.customer_id,
                store_id: nextProps.productSold.store_id,
                date: new Date(date_string)
            });
        }
        if(nextProps.products) {
            this.setState({
                products: nextProps.products,
                customers: nextProps.customers,
                stores: nextProps.stores
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

    renderSelect(hasIdvalues, thisValue, name) {
        var options = hasIdvalues.map(function(x) {
            if(x.id == thisValue) {
                return <option value={x.id} selected>{x.name}</option>
            } else {
                return <option value={x.id}>{x.name}</option> 
            }
            
        });
        return (
            <FormControl componentClass="select" name={name} placeholder="select">
                {options}
            </FormControl>
        );
    }

    initEmptyProductSold() {
        if(! this.state.date_sold) {
            this.setState({date_sold: new Date().toISOString(), date: new Date()});
        }
        try {
            if(! this.state.customer_id) {
                this.setState({customer_id: this.state.customers[0].id});
            }
            if(! this.state.product_id) {
                this.setState({product_id: this.state.products[0].id});
            }
            if(! this.state.store_id) {
                this.setState({store_id: this.state.stores[0].id});
            }
        } catch (error) {
            
        }
        
    }
    

    render() {
        var that = this;
        // support new action
        this.initEmptyProductSold();
        return (
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new Product sold</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                        <FormGroup controlId="formControlsStore">
                            <ControlLabel>Store:</ControlLabel>
                            {this.renderSelect(this.state.stores, this.state.store_id, 'store_id')}
                        </FormGroup>
                        <FormGroup controlId="formControlsCustomer">
                            <ControlLabel>Customer:</ControlLabel>
                            {this.renderSelect(this.state.customers, this.state.customer_id, 'customer_id')}
                        </FormGroup>
                        <FormGroup controlId="formControlsProduct">
                            <ControlLabel>Product:</ControlLabel>
                            {this.renderSelect(this.state.products, this.state.product_id, 'product_id')}
                        </FormGroup>
                        <FormGroup controlId="formControlsDate">
                            <ControlLabel>Date sold (Month/date/year Hour: minute):</ControlLabel><br />
                            <DateTimePicker clockClassName="clock" calendarClassName="clock"
                                onChange={this.onChange}
                                value={this.state.date}
                                />
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

export default ProductSoldEditModal;