import axios from 'axios';

const request = axios.create({
    baseURL: 'https://tdshop.herokuapp.com/api/v1',
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export const post = async (path, options = {}) => {
    const response = await request.post(path, options);
    return response.data;
};

export default request;
