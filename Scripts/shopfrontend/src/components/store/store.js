import { Link } from 'react-router';
import React, {Component} from 'react'
import BaseContainer from '../BaseContainer';
import {getAll, updateStore, newStore, deleteStore as apiDeleteStore} from "./data";
import { HasIdList, subscribeToEvent, events, unSubscribeToEvent } from "../../data/config";
import StoreEditModal from "./store-edit-modal"
import Dialog from 'react-bootstrap-dialog'
import {Button} from 'react-bootstrap'
import format from "string-format";
import {toast} from 'react-toastify'

class InnerStore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stores: [
            ],
            currentStoreId: "",
            showEditForm: false,
            currentStore: {}
        }
        this.openEditPopup = this.openEditPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.saveChange = this.saveChange.bind(this);
        this.showDeleteStore = this.showDeleteStore.bind(this);
    }

    componentWillUnmount() {
        unSubscribeToEvent(this.tokenDeleteStoreEvent);
        unSubscribeToEvent(this.tokenUpdateStoreEvent);
        unSubscribeToEvent(this.tokenAddStoreEvent);
    }

    componentDidMount() {
        var that = this;
        this.tokenDeleteStoreEvent = subscribeToEvent(events['store.removed'], function(event, id) {
            toast.success(format("Delete store with id: {} successfully.", id));
            that.setState(
                {stores: new HasIdList(that.state.stores).removeById(id).get()}
            );
        });
        this.tokenUpdateStoreEvent = subscribeToEvent(events['store.updated'], function(event, store) {
            toast.success(format("Update store with name: {name} successfully.", store));
            that.setState(
                {
                    stores: new HasIdList(that.state.stores).upsert(store).get(), 
                    showEditForm: false,
                }
            );
        });
        this.tokenAddStoreEvent = subscribeToEvent(events['store.added'], function(event, store) {
            toast.success(format("Add store with name: {name} successfully.", store));
            that.setState(
                {
                    stores: new HasIdList(that.state.stores).upsert(store).get(), 
                    showEditForm: false,
                }
            );
        });
        getAll().then(
            function(stores) {
                if(stores) {
                    that.setState({stores: stores});
                }
            }
        );
    }

    openEditPopup(id) {
        var that = this;
        this.setState({currentStore: this.findOne(id), currentStoreId: id}, function() {
            that.setState({showEditForm: true});
        });
    }

    closePopup() {
        this.setState({currentStore: {}, currentStoreId: "", showEditForm: false});
        console.log("close popup");
    }

    upsertStore(store) {
        var newStores = new HasIdList(this.state.stores).upsert(store).get();
        this.setState({stores: newStores});
    }

    saveChange(changedStore) {
        var that = this;
        if(changedStore && changedStore.id) {
            updateStore(changedStore);
        } else {
            newStore(changedStore);
        }
    }

    showDeleteStore(store) {
        console.log(store);
        var that = this;
        this.dialog.show({
            title: 'Delete',
            body: format("You are about to delete store: {name}, are you sure?", store),
            actions: [
              Dialog.CancelAction(),
              Dialog.DefaultAction(
                'Delete',
                () => {
                    that.deleteStore(store.id);
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

    deleteStore(id) {
        apiDeleteStore(id);
    }

    findOne(id) {
        return this.state.stores.find(elm => elm.id == id);
    }

    render() {
        var storeList = "";
        var that = this;
        if(this.state.stores && this.state.stores.length > 0) {
            storeList = this.state.stores.map(function(store) {
                return (
                    <tr className="item" key={store.id}>
                        <th scope="row">{store.id}</th>
                        <td>{store.name}</td>
                        <td>
                            <Button bsStyle="warning" onClick={() => that.openEditPopup(store.id)}>Edit</Button>
                        </td>
                        <td>
                            <Button bsStyle="danger" onClick={() => that.showDeleteStore(store)}>Delete</Button>
                        </td>
                    </tr>
                );
            });
        }
        return (
            
            <div>
                <Dialog ref={(el) => { this.dialog = el }} />
                <StoreEditModal show={this.state.showEditForm} store={this.state.currentStore} 
                    parentCallbackClose={this.closePopup}
                    handleCallbackSubmit={this.saveChange}></StoreEditModal>
                <button type="button" className="btn btn-primary" 
                                onClick={() => that.openEditPopup()}>
                            Add new Store
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
                        {storeList}
                    </tbody>
                </table>
            </div>
        );
    } 
}

class Store extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BaseContainer>
                <InnerStore></InnerStore>
            </BaseContainer>
        );
    }
}

export default Store;