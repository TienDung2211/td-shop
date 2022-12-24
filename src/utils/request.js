import axios from 'axios';

const request = axios.create({
    baseURL: 'https://tdshop.herokuapp.com/api/v1',
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export const post = async (path, data, headers = {}) => {
    const response = await request.post(path, data, headers);
    return response.data;
};

export const put = async (path, data, headers = {}) => {
    const response = await request.put(path, data, headers);
    return response.data;
};

export const remove = async (path, headers = {}) => {
    const response = await request.delete(path, headers);
    return response.data;
};

export default request;
