import * as request from '~/utils/request';

const brandServices = {
    // Employee
    getAllBrands: async () => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get(`/brand/get-all`, {
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

export default brandServices;
