import axios from 'axios';

// const request = axios.create({
//     baseURL: 'https://tiktok.fullstack.edu.vn/api/',
// });

const request = axios.create({
    baseURL: 'https://tdshop.herokuapp.com/api/v1',
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export default request;
