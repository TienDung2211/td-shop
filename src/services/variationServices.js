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
};

export default variationServices;
