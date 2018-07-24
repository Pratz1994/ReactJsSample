import { Link } from 'react-router';
import React, {Component} from 'react'
import BaseContainer from '../BaseContainer';
import {getAll, updateCustomer, newCustomer, deleteCustomer as apiDeleteCustomer} from "./data";
import { HasIdList, subscribeToEvent, events, unSubscribeToEvent } from "../../data/config";
import CustomerEditModal from "./customer-edit-modal"
import Dialog from 'react-bootstrap-dialog'
import {Button} from 'react-bootstrap'
import format from "string-format";
import {toast} from 'react-toastify'

class InnerCustomer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: [
            ],
            currentCustomerId: "",
            showEditForm: false,
            currentCustomer: {}
        }
        this.openEditPopup = this.openEditPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.saveChange = this.saveChange.bind(this);
        this.showDeleteCustomer = this.showDeleteCustomer.bind(this);
    }

    componentWillUnmount() {
        unSubscribeToEvent(this.tokenDeleteCustomerEvent);
        unSubscribeToEvent(this.tokenUpdateCustomerEvent);
        unSubscribeToEvent(this.tokenAddCustomerEvent);
    }

    componentDidMount() {
        var that = this;
        this.tokenDeleteCustomerEvent = subscribeToEvent(events['customer.removed'], function(event, id) {
            toast.success(format("Delete customer with id: {} successfully.", id));
            that.setState(
                {customers: new HasIdList(that.state.customers).removeById(id).get()}
            );
        });
        this.tokenUpdateCustomerEvent = subscribeToEvent(events['customer.updated'], function(event, customer) {
            toast.success(format("Update customer with name: {name} successfully.", customer));
            that.setState(
                {
                    customers: new HasIdList(that.state.customers).upsert(customer).get(), 
                    showEditForm: false,
                }
            );
        });
        this.tokenAddCustomerEvent = subscribeToEvent(events['customer.added'], function(event, customer) {
            toast.success(format("Add customer with name: {name} successfully.", customer));
            that.setState(
                {
                    customers: new HasIdList(that.state.customers).upsert(customer).get(), 
                    showEditForm: false,
                }
            );
        });
        getAll().then(
            function(customers) {
                if(customers) {
                    that.setState({customers: customers});
                }
            }
        );
    }

    openEditPopup(id) {
        var that = this;
        this.setState({currentCustomer: this.findOne(id), currentCustomerId: id}, function() {
            that.setState({showEditForm: true});
        });
    }

    closePopup() {
        this.setState({currentCustomer: {}, currentCustomerId: "", showEditForm: false});
        console.log("close popup");
    }

    upsertCustomer(customer) {
        var newCustomers = new HasIdList(this.state.customers).upsert(customer).get();
        this.setState({customers: newCustomers});
    }

    saveChange(changedCustomer) {
        var that = this;
        if(changedCustomer && changedCustomer.id) {
            updateCustomer(changedCustomer);
        } else {
            newCustomer(changedCustomer);
        }
    }

    showDeleteCustomer(customer) {
        console.log(customer);
        var that = this;
        this.dialog.show({
            title: 'Delete',
            body: format("You are about to delete customer: {name}, are you sure?", customer),
            actions: [
              Dialog.CancelAction(),
              Dialog.DefaultAction(
                'Delete',
                () => {
                    that.deleteCustomer(customer.id);
                },
                'btn-danger'
              )
            ],
            bsSize: 'small',
            onHide: (dialog) => {
              dialog.hide()
              console.log('closed by clicking background.')
            }
        });
    }

    deleteCustomer(id) {
        apiDeleteCustomer(id);
    }

    findOne(id) {
        return this.state.customers.find(elm => elm.id == id);
    }

    render() {
        var customerList = "";
        var that = this;
        if(this.state.customers && this.state.customers.length > 0) {
            customerList = this.state.customers.map(function(customer) {
                return (
                    <tr className="item" key={customer.id}>
                        <th scope="row">{customer.id}</th>
                        <td>{customer.name}</td>
                        <td>
                            <Button bsStyle="warning" onClick={() => that.openEditPopup(customer.id)}>Edit</Button>
                        </td>
                        <td>
                            <Button bsStyle="danger" onClick={() => that.showDeleteCustomer(customer)}>Delete</Button>
                        </td>
                    </tr>
                );
            });
        }
        return (
            
            <div>
                <Dialog ref={(el) => { this.dialog = el }} />
                <CustomerEditModal show={this.state.showEditForm} customer={this.state.currentCustomer} 
                    parentCallbackClose={this.closePopup}
                    handleCallbackSubmit={this.saveChange}></CustomerEditModal>
                <button type="button" className="btn btn-primary" 
                                onClick={() => that.openEditPopup()}>
                            Add new Customer
                </button>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerList}
                    </tbody>
                </table>
            </div>
        );
    } 
}

class Customer extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BaseContainer>
                <InnerCustomer></InnerCustomer>
            </BaseContainer>
        );
    }
}

export default Customer;