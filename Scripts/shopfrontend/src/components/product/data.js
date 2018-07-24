import {
    BASE_URL, fetchPost, fetchPut, fetchGet, notifyApiRequestError,
    fetchDelete, publishEvent, events
} from "../../data/config";

const notifyDeleteProductSuccessful = (id) => {
    publishEvent(events['product.removed'], id);
}

const notifyUpdateProductSuccessful = (product) => {
    publishEvent(events['product.updated'], product);
}

const notifyAddProductSuccessful = (product) => {
    publishEvent(events['product.added'], product);
}

export const getAll = () => fetchGet(BASE_URL + "Products").then(res => res.json())
    .catch(function (res) {
        console.log(res);
        notifyApiRequestError("Error while loading products");
    });

export const updateProduct = (product) => fetchPut(BASE_URL + "Products/" + product.id, product)
    .then(res => {
        try {
            var json = res.json();
            return json;
        } catch (err) {
            throw Error(err.message);
        }
    }).then(
        alreadyJsonproduct => {
            notifyUpdateProductSuccessful(alreadyJsonproduct);
            return alreadyJsonproduct;
        }
    )
    .catch(function (res) {
        console.log(res);
        notifyApiRequestError("Error while update products");
    });

export const newProduct = (product) => fetchPost(BASE_URL + "Products/", product)
    .then(res => {
        try {
            var json = res.json();
            return json;
        } catch (err) {
            throw Error(err.message);
        }
    }).then(
        alreadyJsonproduct => {
            notifyAddProductSuccessful(alreadyJsonproduct);
            return alreadyJsonproduct;
        }
    )
    .catch(function (res) {
        console.log(res);
        notifyApiRequestError("Error while update products");
    });

export const deleteProduct = (id) => fetchDelete(BASE_URL + "Products/" + id)
    .then(res => {
        try {
            var json = res.json();
            return json;
        } catch (err) {
            throw Error(err.message);
        }
    })
    .then(
        alreadyJsonproduct => {
            notifyDeleteProductSuccessful(alreadyJsonproduct.id);
            return alreadyJsonproduct;
        }
    )
    .catch(function (res) {
        console.log(res);
        notifyApiRequestError("Error while delete product");
    });
