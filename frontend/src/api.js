import axios from 'axios';

const API = axios.create({
    baseURL : 'http://localhost:5000/api/journal',
});

export const getEntries = () => API.get('/');
export const getEntry = (id) => API.get(`/${id}`);
export const createEntry = (data) => API.post('/', data);
export const updateEntry = (id, data) => API.put(`/${id}`, data);
export const deleteEntry = (id) => API.delete(`/${id}`);