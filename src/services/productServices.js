import * as request from '~/utils/request';

const productServices = {
    getAllProducts: async (filter = null, page = 0, variations = null, keyword = null) => {
        try {
            let paramsFilter = '';
            if (filter) {
                if (filter === 'new') {
                    paramsFilter = `&sort=createdAt,DESC`;
                } else if (filter === 'popular') {
                    paramsFilter = `&sort=selAmount,DESC`;
                } else if (filter === 'price-asc') {
                    paramsFilter = `&sort=price,ASC`;
                } else if (filter === 'price-desc') {
                    paramsFilter = `&sort=price,DESC`;
                } else if (filter === 'deal-hot') {
                    paramsFilter = `&sort=productPromotion.discountRate,desc`;
                }
            }

            let paramsVariations = '';
            if (variations !== '' && variations) {
                paramsVariations = `&variations=${variations}`;
            }
            console.log('API', keyword);

            let paramsKeyword = '';
            if (keyword !== '' && keyword) {
                paramsKeyword = `&keyword=${keyword}`;
            }

            let endpoint = `?page=${page}${paramsVariations}${paramsFilter}${paramsKeyword}`;

            const res = await request.get(`/product/search${endpoint}`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
    getProductById: async (id) => {
        try {
            const res = await request.get(`/product/get/${id}`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
};

export default productServices;
