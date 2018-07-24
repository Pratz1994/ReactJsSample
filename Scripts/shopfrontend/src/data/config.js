import PubSub from "pubsub-js";
import format from "string-format"
export const BASE_URL = "/api/"


export const events = {
    successfulUpdate: 'successfulUpdate',
    apiRequestError: 'apiRequestError',

    'store.removed': 'store.removed',
    'store.added': 'store.added',
    'store.updated': 'store.updated',

    'customer.removed': 'customer.removed',
    'customer.added': 'customer.added',
    'customer.updated': 'customer.updated',

    'product.removed': 'product.removed',
    'product.added': 'product.added',
    'product.updated': 'product.updated',

    'productSold.removed': 'productSold.removed',
    'productSold.added': 'productSold.added',
    'productSold.updated': 'productSold.updated',
}

export const fetchGet = (url) => fetch(url).then(function(response) {
    if (! response.ok) {
        notifyApiRequestError("Error ");
        throw Error(response.statusText);
    }
    return response;
});

export const fetchPost = (url, data) => fetch(url, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});

export const fetchPut = (url, data) => fetch(url, {
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});

export const fetchDelete = (url) => fetch(url, {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export const publishEvent = (event, message) => {
    console.log(format("publish event {} with message {}", event, message));
    if(event in events) {
        PubSub.publish(event, message);
    } else {
        console.log("dangerous! seems like you publish event that is not in the list");
    }
}

export const subscribeToEvent = (event, callback) => {
    if(event in events) {
        return PubSub.subscribe(event, callback);
    } else {
        console.log("dangerous! seems like you publish event that is not in the list");
    }
}

export const notifyApiRequestError = (message) => {
    console.log("notifyApiRequestError");
    publishEvent(events.apiRequestError, message);
}

export const notifyApiRequestSuccessful = (message) => {
    console.log("notifyApiRequestSuccessful");
    publishEvent(events.apiRequestError, message);
}

export function unSubscribeToEvent(token) {
    PubSub.unsubscribe(token);
}

export class HasIdList {
    
    constructor(stores) {
        this.stores = stores;
    }

    get() {
        return this.stores;
    }

    upsert(store) {
        var exited = false;
        for (var i = 0; i < this.stores.length; i++) {
            if (store.id == this.stores[i].id) {
                this.stores[i] = store;
                exited = true;
            }
        }
        if (!exited) {
            this.stores.push(store);
        }
        return this;
    }

    removeById(id) {
        var index = this.stores.findIndex(x => x.id == id);
        if(index > -1) {
            this.stores.splice(index, 1);
        }
        return this;
    }

    getOne(id) {
        return this.stores.find(x => x.id == id);
    }

    getOneName(id) {
        if(id) {
            var obj = this.stores.find(x => x.id == id);
            if(obj) {
                return obj.name;
            }
        }
        return "";
    }

}