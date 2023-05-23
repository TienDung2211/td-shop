import * as request from '~/utils/request';

const productServices = {
    // Guest
    getProducts: async (
        filter = null,
        page = 0,
        variations = null,
        keyword = null,
        categoryId = 0,
        masterCategoryId = 0,
    ) => {
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

            const paramsCategory = `&category-id=${categoryId}`;
            const paramsMasterCategory = `&master-category-id=${masterCategoryId}`;

            let endpoint = `?page=${page}${paramsVariations}${paramsFilter}${paramsKeyword}${paramsCategory}${paramsMasterCategory}`;

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
    getAllProducts: async (keyword) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));
            let paramsKeyword = '';

            if (keyword !== '') {
                paramsKeyword = `keyword=${keyword}&`;
            }

            const res = await request.get(
                `/product/admin/search?${paramsKeyword}category-id=0&max-price=0&min-price=0&brand-id=0&page=0&size=200&sort=id`,
                {
                    headers: {
                        Authorization: `Bearer ${access}`,
                    },
                },
            );

            return res.data;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    adminGetProductById: async (id) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get(`/product/admin/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
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
    updateProduct: async (id, data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.put(`/product/update/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    deleteProduct: async (id) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.remove(`/product/delete/${id}`, {
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
