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
            console.error(error.response.data);
        }
    },
    getMyCart: async () => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get('/cart/my-cart?sort=Id,ASC', {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res.data;
        } catch (error) {
            console.error(error.response.data);
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
            console.error(error.response.data);
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
            console.error(error.response.data);
        }
    },
};

export default cartServices;
