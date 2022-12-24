import * as request from '~/utils/request';

const orderServices = {
    addOrder: async (data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.put('/order/add', data, {
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

export default orderServices;
