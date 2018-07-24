import {
    BASE_URL, fetchPost, fetchPut, fetchGet, notifyApiRequestError,
    fetchDelete, publishEvent, events
} from "../../data/config";

const notifyDeleteProductSoldSuccessful = (id) => {
    publishEvent(events['productSold.removed'], id);
}

const notifyUpdateProductSoldSuccessful = (productSold) => {
    publishEvent(events['productSold.updated'], productSold);
}

const notifyAddProductSoldSuccessful = (productSold) => {
    publishEvent(events['productSold.added'], productSold);
}

export const getAll = () => fetchGet(BASE_URL + "ProductSolds").then(res => res.json())
    .catch(function (res) {
        console.log(res);
        notifyApiRequestError("Error while loading productSolds");
    });

export const updateProductSold = (productSold) => fetchPut(BASE_URL + "ProductSolds/" + productSold.id, productSold)
    .then(res => {
        try {
            var json = res.json();
            return json;
        } catch (err) {
            throw Error(err.message);
        }
    }).then(
        alreadyJsonproductSold => {
            notifyUpdateProductSoldSuccessful(alreadyJsonproductSold);
            return alreadyJsonproductSold;
        }
    )
    .catch(function (res) {
        console.log(res);
        notifyApiRequestError("Error while update productSolds");
    });

export const newProductSold = (productSold) => fetchPost(BASE_URL + "ProductSolds/", productSold)
    .then(res => {
        try {
            var json = res.json();
            return json;
        } catch (err) {
            throw Error(err.message);
        }
    }).then(
        alreadyJsonproductSold => {
            notifyAddProductSoldSuccessful(alreadyJsonproductSold);
            return alreadyJsonproductSold;
        }
    )
    .catch(function (res) {
        console.log(res);
        notifyApiRequestError("Error while update productSolds");
    });

export const deleteProductSold = (id) => fetchDelete(BASE_URL + "ProductSolds/" + id)
    .then(res => {
        try {
            var json = res.json();
            return json;
        } catch (err) {
            throw Error(err.message);
        }
    })
    .then(
        alreadyJsonproductSold => {
            notifyDeleteProductSoldSuccessful(alreadyJsonproductSold.id);
            return alreadyJsonproductSold;
        }
    )
    .catch(function (res) {
        console.log(res);
        notifyApiRequestError("Error while delete productSold");
    });
