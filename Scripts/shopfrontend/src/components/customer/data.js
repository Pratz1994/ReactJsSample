import {
    BASE_URL, fetchPost, fetchPut, fetchGet, notifyApiRequestError,
    fetchDelete, publishEvent, events
} from "../../data/config";

const notifyDeleteCustomerSuccessful = (id) => {
    publishEvent(events['customer.removed'], id);
}

const notifyUpdateCustomerSuccessful = (customer) => {
    publishEvent(events['customer.updated'], customer);
}

const notifyAddCustomerSuccessful = (customer) => {
    publishEvent(events['customer.added'], customer);
}

export const getAll = () => fetchGet(BASE_URL + "Customers").then(res => res.json())
    .catch(function (res) {
        console.log(res);
        notifyApiRequestError("Error while loading customers");
    });

export const updateCustomer = (customer) => fetchPut(BASE_URL + "Customers/" + customer.id, customer)
    .then(res => {
        try {
            var json = res.json();
            return json;
        } catch (err) {
            throw Error(err.message);
        }
    }).then(
        alreadyJsonCustomer => {
            notifyUpdateCustomerSuccessful(alreadyJsonCustomer);
            return alreadyJsonCustomer;
        }
    )
    .catch(function (res) {
        console.log(res);
        notifyApiRequestError("Error while update customers");
    });

export const newCustomer = (customer) => fetchPost(BASE_URL + "Customers/", customer)
    .then(res => {
        try {
            var json = res.json();
            return json;
        } catch (err) {
            throw Error(err.message);
        }
    }).then(
        alreadyJsoncustomer => {
            notifyAddCustomerSuccessful(alreadyJsoncustomer);
            return alreadyJsoncustomer;
        }
    )
    .catch(function (res) {
        console.log(res);
        notifyApiRequestError("Error while update customers");
    });

export const deleteCustomer = (id) => fetchDelete(BASE_URL + "Customers/" + id)
    .then(res => {
        try {
            var json = res.json();
            return json;
        } catch (err) {
            throw Error(err.message);
        }
    })
    .then(
        jsonId => {
            notifyDeleteCustomerSuccessful(jsonId.id);
            return jsonId;
        }
    )
    .catch(function (res) {
        console.log(res);
        notifyApiRequestError("Error while delete customer");
    });
