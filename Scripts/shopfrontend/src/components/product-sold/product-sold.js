import { Link } from 'react-router';
import React, {Component} from 'react'
import BaseContainer from '../BaseContainer';
import {getAll, updateProductSold, newProductSold, deleteProductSold as apiDeleteProductSold} from "./data";
import { HasIdList, subscribeToEvent, events, unSubscribeToEvent } from "../../data/config";
import {getAll as storeGetAll} from "../store/data";
import {getAll as productGetAll} from "../product/data";
import {getAll as customerGetAll} from "../customer/data";
import ProductSoldEditModal from "./product-sold-edit-modal";
import {toast} from 'react-toastify';
import format from "string-format";
import Dialog from 'react-bootstrap-dialog'


class InnerProductSold extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productSolds: [
                
            ],
            customers: [],
            products: [],
            stores: [],
            currentStoreId: "",
            showEditForm: false,
            currentProductSold: {}
        }
        this.openEditPopup = this.openEditPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.saveChange = this.saveChange.bind(this);
    }

    showDeleteProductSold(productSold) {
        var that = this;
        this.dialog.show({
            title: 'Delete',
            body: format("You are about to delete productSold with id: {id}, are you sure?", productSold),
            actions: [
              Dialog.CancelAction(),
              Dialog.DefaultAction(
                'Delete',
                () => {
                    that.deleteProductSold(productSold.id);
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

    deleteProductSold(id) {
        apiDeleteProductSold(id);
    }

    componentWillUnmount() {
        unSubscribeToEvent(this.tokenDeleteProductSoldEvent);
        unSubscribeToEvent(this.tokenUpdateProductSoldEvent);
        unSubscribeToEvent(this.tokenAddProductSoldEvent);
    }

    componentDidMount() {
        var that = this;
        getAll().then(
            function(pss) {
                if(pss) {
                    that.setState({productSolds: pss});
                }
            }
        );
        productGetAll().then(function(products) {
            that.setState({products: products});
        });
        customerGetAll().then(function(customers) {
            that.setState({customers: customers});
        });
        storeGetAll().then(function(stores) {
            that.setState({stores: stores});
        });

        this.tokenDeleteProductSoldEvent = subscribeToEvent(events['productSold.removed'], function(event, id) {
            toast.success(format("Delete productSold with id: {} successfully.", id));
            that.setState(
                {productSolds: new HasIdList(that.state.productSolds).removeById(id).get()}
            );
        });
        this.tokenUpdateProductSoldEvent = subscribeToEvent(events['productSold.updated'], function(event, productSold) {
            toast.success(format("Update productSold with name: {name} successfully.", productSold));
            that.setState(
                {
                    productSolds: new HasIdList(that.state.productSolds).upsert(productSold).get(), 
                    showEditForm: false,
                }
            );
        });
        this.tokenAddProductSoldEvent = subscribeToEvent(events['productSold.added'], function(event, productSold) {
            toast.success(format("Add productSold with name: {name} successfully.", productSold));
            that.setState(
                {
                    productSolds: new HasIdList(that.state.productSolds).upsert(productSold).get(), 
                    showEditForm: false,
                }
            );
        });
    }
    openEditPopup(id) {
        var that = this;
        this.setState({currentProductSold: this.findOne(id), currentStoreId: id}, function() {
            that.setState({showEditForm: true});
        });
    }

    closePopup() {
        this.setState({currentProductSold: {}, currentStoreId: "", showEditForm: false});
    }

    saveChange(changedProductSold) {
        var that = this;
        if(changedProductSold && changedProductSold.id) {
            console.log("save change", changedProductSold);
            updateProductSold(changedProductSold);
        } else {
            console.log("save change", changedProductSold);
            newProductSold(changedProductSold);
        }
    }

    findOne(id) {
        return this.state.productSolds.find(elm => elm.id == id);
    }

    render() {
        var storeList = <tr><td colSpan={5}></td></tr>;
        var that = this;
        
        if(this.state.productSolds && this.state.productSolds.length > 0) {
            storeList = this.state.productSolds.map(function(productSold) {
                return (
                    <tr className="item" key={productSold.id}>
                        <th scope="row">{productSold.id}</th>
                        <td>{new HasIdList(that.state.stores).getOneName(productSold.store_id)}</td>
                        <td>{new HasIdList(that.state.products).getOneName(productSold.product_id)}</td>
                        <td>{new HasIdList(that.state.customers).getOneName(productSold.customer_id)}</td>
                        <td>
                            <button type="button" className="btn btn-warning" 
                                onClick={() => that.openEditPopup(productSold.id)}>
                            Edit
                            </button>
                        </td>
                        <td>
                            <button type="button" className="btn btn-danger" 
                                onClick={() => that.showDeleteProductSold(productSold)}>
                            Delete
                            </button>
                        </td>
                    </tr>
                );
            });
        }
        return (
            
            <div>
                <ProductSoldEditModal show={this.state.showEditForm} productSold={this.state.currentProductSold} 
                    stores={this.state.stores}
                    products={this.state.products}
                    customers={this.state.customers}
                    parentCallbackClose={this.closePopup}
                    handleCallbackSubmit={this.saveChange}
                    ></ProductSoldEditModal>
                <Dialog ref={(el) => { this.dialog = el }} />
                <button type="button" className="btn btn-primary" 
                                onClick={() => that.openEditPopup()}>
                            Add new product sold
                            </button>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Store</th>
                            <th scope="col">Product</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>{storeList}</tbody>
                </table>
            </div>
        );
    } 
}

class ProductSold extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BaseContainer>
                <InnerProductSold></InnerProductSold>
            </BaseContainer>
        );
    }
}

export default ProductSold;