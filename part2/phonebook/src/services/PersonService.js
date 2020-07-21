import axios from "axios";
const baseURL = "/api/persons";

const getAll = () => {
    return axios
    .get(baseURL)
    .then(response => response.data)
}

const create = newPerson => {
    return axios
    .post(baseURL, newPerson)
    .then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

const update = (id, newPerson) => {
    return axios
    .put(`${baseURL}/${id}`, newPerson)
    .then(response => response.data)
}

export default {getAll, create, remove, update}




