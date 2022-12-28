import * as request from '~/utils/request';

const orderServices = {
    addOrder: async (data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.post('/order/add', data, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    cancelOrder: async (data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.remove(`/order/cancel?order=${data}`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    getMyOrder: async (id = 0) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            let paramsStatus = '';

            if (id !== 0) {
                paramsStatus = `&status-id=${id}`;
            }

            const res = await request.get(`/order/my-order?&sort=Id,ASC${paramsStatus}`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res.data;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    getPaymentMethod: async () => {
        try {
            const res = await request.get('/payment-method/get-all');

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    getShip: async () => {
        try {
            const res = await request.get('/ship/get-all');

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    //Employee
    getAllOrder: async (id = 0) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            let paramsStatus = '';

            if (id !== 0) {
                paramsStatus = `&status-id=${id}`;
            }

            const res = await request.get(`/order/get-all?&sort=Id,ASC${paramsStatus}`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res.data;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    changeStatusOrder: async (data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.post('/order/admin/change-status', data, {
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

export default orderServices;
