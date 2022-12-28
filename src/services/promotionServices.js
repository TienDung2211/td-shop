import * as request from '~/utils/request';

const promotionServices = {
    //Employee
    getAllPromotions: async () => {
        try {
            const res = await request.get('/promotion/get-all?page=0&size=20&sort=id,ASC');

            return res.data;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    searchPromotion: async (keyword) => {
        try {
            const res = await request.get('/promotion/search?page=0&size=20&sort=id,ASC');

            return res.data;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    //Admin
    addPromotion: async (data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.post('/promotion/admin/add', data, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    updatePromotion: async (id, data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.put(`/promotion/admin/update/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    deletePromotion: async (id) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.remove(`/promotion/admin/delete/${id}`, {
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

export default promotionServices;
