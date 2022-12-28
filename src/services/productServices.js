import * as request from '~/utils/request';

const productServices = {
    // Guest
    getProducts: async (filter = null, page = 0, variations = null, keyword = null) => {
        try {
            let paramsFilter = '';
            if (filter) {
                if (filter === 'new') {
                    paramsFilter = `&sort=createdAt,DESC`;
                } else if (filter === 'popular') {
                    paramsFilter = `&sort=selAmount,DESC`;
                } else if (filter === 'price-asc') {
                    paramsFilter = `&sort=price,ASC`;
                } else if (filter === 'price-desc') {
                    paramsFilter = `&sort=price,DESC`;
                } else if (filter === 'deal-hot') {
                    paramsFilter = `&sort=currentDiscountRate,DESC`;
                }
            }

            let paramsVariations = '';
            if (variations !== '' && variations) {
                paramsVariations = `&variations=${variations}`;
            }

            let paramsKeyword = '';
            if (keyword !== '' && keyword) {
                paramsKeyword = `&keyword=${keyword}`;
            }

            let endpoint = `?page=${page}${paramsVariations}${paramsFilter}${paramsKeyword}`;

            const res = await request.get(`/product/search${endpoint}`);
            return res.data;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    getProductById: async (id) => {
        try {
            const res = await request.get(`/product/get/${id}`);
            return res.data;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    getProductByBrand: async (id) => {
        try {
            const res = await request.get(`/product/search?brand-id=${id}`);
            return res.data;
        } catch (error) {
            console.error(error.response.data);
        }
    },

    // Employee
    getAllProducts: async () => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get(`/product/admin/search?page=0&size=20`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res.data;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    addProduct: async (data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.post(`/product/add`, data, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    getAllAttributes: async () => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get(`/attribute-set/get-all?page=0&size=20&sort=Id,ASC`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res.data;
        } catch (error) {
            console.error(error.response.data);
        }
    },
};

export default productServices;
