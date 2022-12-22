import * as request from '~/utils/request';

const cartServices = {
    addCart: async (id) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));
            console.log('id', id);
            console.log('access', access);

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
};

export default cartServices;
