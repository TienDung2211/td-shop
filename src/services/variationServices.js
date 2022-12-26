import * as request from '~/utils/request';

const variationServices = {
    getAllVariations: async () => {
        try {
            const res = await request.get('/variation/get-all');
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
    getVariationById: async (id) => {
        try {
            const res = await request.get(`/variation/get/${id}`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
    addVariation: async (data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.post('/variation/add', data, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.log(error);
        }
    },
    updateVariation: async (id, data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.put(`/variation/update/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.log(error);
        }
    },
    removeVariation: async (id) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.remove(`/variation/delete/${id}`, {
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

export default variationServices;
