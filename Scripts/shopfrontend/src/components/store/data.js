import {
    BASE_URL, fetchPost, fetchPut, fetchGet, notifyApiRequestError,
    fetchDelete, publishEvent, events
} from "../../data/config";

const notifyDeleteStoreSuccessful = (id) => {
    publishEvent(events['store.removed'], id);
}

const notifyUpdateStoreSuccessful = (store) => {
    publishEvent(events['store.updated'], store);
}

const notifyAddStoreSuccessful = (store) => {
    publishEvent(events['store.added'], store);
}

export const getAll = () => fetchGet(BASE_URL + "Stores").then(res => res.json())
    .catch(function (res) {
        console.log(res);
        notifyApiRequestError("Error while loading Stores");
    });

export const updateStore = (store) => fetchPut(BASE_URL + "Stores/" + store.id, store)
    .then(res => {
        try {
            var json = res.json();
            return json;
        } catch (err) {
            throw Error(err.message);
        }
    }).then(
        alreadyJsonStore => {
            notifyUpdateStoreSuccessful(alreadyJsonStore);
            return alreadyJsonStore;
        }
    )
    .catch(function (res) {
        console.log(res);
        notifyApiRequestError("Error while update Stores");
    });

export const newStore = (store) => fetchPost(BASE_URL + "Stores/", store)
    .then(res => {
        try {
            var json = res.json();
            return json;
        } catch (err) {
            throw Error(err.message);
        }
    }).then(
        alreadyJsonStore => {
            notifyAddStoreSuccessful(alreadyJsonStore);
            return alreadyJsonStore;
        }
    )
    .catch(function (res) {
        console.log(res);
        notifyApiRequestError("Error while update Stores");
    });

export const deleteStore = (id) => fetchDelete(BASE_URL + "Stores/" + id)
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
            notifyDeleteStoreSuccessful(jsonId.id);
            return jsonId;
        }
    )
    .catch(function (res) {
        console.log(res);
        notifyApiRequestError("Error while delete Store");
    });
