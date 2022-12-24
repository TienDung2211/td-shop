import * as request from '~/utils/request';

const cartServices = {
    addCart: async (id) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.post(
                '/cart/add',
                { ProductId: id },
                {
                    headers: {
                        Authorization: `Bearer ${access}`,
                    },
                },
            );

            return res;
        } catch (error) {
            console.log(error);
        }
    },
    getMyCart: async () => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get('/cart/my-cart', {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
    changeAmount: async (data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.post('/cart/change-quantity', data, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.log(error);
        }
    },
    removeCart: async (id) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.post(
                '/cart/remove',
                { ProductId: id },
                {
                    headers: {
                        Authorization: `Bearer ${access}`,
                    },
                },
            );

            return res;
        } catch (error) {
            console.log(error);
        }
    },
};

export default cartServices;
