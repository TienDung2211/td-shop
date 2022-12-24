import * as request from '~/utils/request';

const addressServices = {
    getAllProvince: async () => {
        try {
            const res = await request.get('/province/get-all');
            return res;
        } catch (error) {
            console.log(error);
        }
    },
    getDisTrictByIdProvince: async (data) => {
        try {
            const res = await request.get(`/district/get-by-province/${data}`);
            return res;
        } catch (error) {
            console.log(error);
        }
    },
    getWardByIdDistrict: async (data) => {
        try {
            const res = await request.get(`/wards/get-by-district/${data}`);
            return res;
        } catch (error) {
            console.log(error);
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
            console.log(error);
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
            console.log(error);
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
            console.log(error);
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
            console.log(error);
        }
    },
};

export default addressServices;
