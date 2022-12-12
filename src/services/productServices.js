import * as request from '~/utils/request';

const productServices = {
    getAllProduct: async () => {
        try {
            const res = await request.get('/product/get-all');
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
};

export default productServices;
