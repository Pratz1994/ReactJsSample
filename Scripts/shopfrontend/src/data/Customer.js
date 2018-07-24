import {BASE_URL} from "./config"

export const fetchAll = () => fetch(BASE_URL + "customers").then(res => res.json())