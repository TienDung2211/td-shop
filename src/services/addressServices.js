import * as request from '~/utils/request';

const addressServices = {
    getAllProvince: async () => {
        try {
            const res = await request.get('/province/get-all');
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    getDisTrictByIdProvince: async (data) => {
        try {
            const res = await request.get(`/district/get-by-province/${data}`);
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    getWardByIdDistrict: async (data) => {
        try {
            const res = await request.get(`/wards/get-by-district/${data}`);
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    addAddress: async (data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.post('/address/add', data, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    getMyAddress: async () => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get('/address/my-address', {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    updateAddress: async (id, data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.put(`/address/update/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    removeAddress: async (data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.remove(`/address/delete/${data}`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
};

export default addressServices;
