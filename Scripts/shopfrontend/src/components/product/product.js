import { Link } from 'react-router';
import React, {Component} from 'react'
import BaseContainer from '../BaseContainer';
import {getAll, updateProduct, newProduct, deleteProduct as apiDeleteProduct} from "./data";
import { HasIdList, subscribeToEvent, events, unSubscribeToEvent } from "../../data/config";
import ProductEditModal from "./product-edit-modal"
import Dialog from 'react-bootstrap-dialog'
import {Button} from 'react-bootstrap'
import format from "string-format";
import {toast} from 'react-toastify'

class InnerProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [
            ],
            currentProductId: "",
            showEditForm: false,
            currentProduct: {}
        }
        this.openEditPopup = this.openEditPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.saveChange = this.saveChange.bind(this);
        this.showDeleteProduct = this.showDeleteProduct.bind(this);
    }

    componentWillUnmount() {
        unSubscribeToEvent(this.tokenDeleteProductEvent);
        unSubscribeToEvent(this.tokenUpdateProductEvent);
        unSubscribeToEvent(this.tokenAddProductEvent);
    }

    componentDidMount() {
        var that = this;
        this.tokenDeleteProductEvent = subscribeToEvent(events['product.removed'], function(event, id) {
            toast.success(format("Delete product with id: {} successfully.", id));
            that.setState(
                {products: new HasIdList(that.state.products).removeById(id).get()}
            );
        });
        this.tokenUpdateProductEvent = subscribeToEvent(events['product.updated'], function(event, product) {
            toast.success(format("Update product with name: {name} successfully.", product));
            that.setState(
                {
                    products: new HasIdList(that.state.products).upsert(product).get(), 
                    showEditForm: false,
                }
            );
        });
        this.tokenAddProductEvent = subscribeToEvent(events['product.added'], function(event, product) {
            toast.success(format("Add product with name: {name} successfully.", product));
            that.setState(
                {
                    products: new HasIdList(that.state.products).upsert(product).get(), 
                    showEditForm: false,
                }
            );
        });
        getAll().then(
            function(products) {
                if(products) {
                    that.setState({products: products});
                }
            }
        );
    }

    openEditPopup(id) {
        var that = this;
        this.setState({currentProduct: this.findOne(id), currentProductId: id}, function() {
            that.setState({showEditForm: true});
        });
    }

    closePopup() {
        this.setState({currentProduct: {}, currentProductId: "", showEditForm: false});
        console.log("close popup");
    }

    upsertProduct(product) {
        var newProducts = new HasIdList(this.state.products).upsert(product).get();
        this.setState({products: newProducts});
    }

    saveChange(changedProduct) {
        var that = this;
        if(changedProduct && changedProduct.id) {
            updateProduct(changedProduct);
        } else {
            newProduct(changedProduct);
        }
    }

    showDeleteProduct(product) {
        console.log(product);
        var that = this;
        this.dialog.show({
            title: 'Delete',
            body: format("You are about to delete product: {name}, are you sure?", product),
            actions: [
              Dialog.CancelAction(),
              Dialog.DefaultAction(
                'Delete',
                () => {
                    that.deleteProduct(product.id);
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

    deleteProduct(id) {
        apiDeleteProduct(id);
    }

    findOne(id) {
        return this.state.products.find(elm => elm.id == id);
    }

    render() {
        var productList = "";
        var that = this;
        if(this.state.products && this.state.products.length > 0) {
            productList = this.state.products.map(function(product) {
                return (
                    <tr className="item" key={product.id}>
                        <th scope="row">{product.id}</th>
                        <td>{product.name}</td>
                        <td>
                            <Button bsStyle="warning" onClick={() => that.openEditPopup(product.id)}>Edit</Button>
                        </td>
                        <td>
                            <Button bsStyle="danger" onClick={() => that.showDeleteProduct(product)}>Delete</Button>
                        </td>
                    </tr>
                );
            });
        }
        return (
            
            <div>
                <Dialog ref={(el) => { this.dialog = el }} />
                <ProductEditModal show={this.state.showEditForm} product={this.state.currentProduct} 
                    parentCallbackClose={this.closePopup}
                    handleCallbackSubmit={this.saveChange}></ProductEditModal>
                <button type="button" className="btn btn-primary" 
                                onClick={() => that.openEditPopup()}>
                            Add new Product
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
                        {productList}
                    </tbody>
                </table>
            </div>
        );
    } 
}

class Product extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BaseContainer>
                <InnerProduct></InnerProduct>
            </BaseContainer>
        );
    }
}

export default Product;