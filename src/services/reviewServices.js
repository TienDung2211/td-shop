import * as request from '~/utils/request';

const reviewServices = {
    getAllReview: async () => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get('/review/get-all', {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },

    getReviewByProductId: async (id) => {
        try {
            const res = await request.get(`/review/search?product-id=${id}&page=0&size=20&is-valid=false`);

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },

    checkBuyByProductId: async (id) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get(`/review/check-buy/?product-id=${id}`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },

    addReview: async (data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.post('/review/add', data, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },

    acceptReview: async (id) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.post(`/review/accept/${id}`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },

    denyReview: async (id) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.post(`/review/deny/${id}`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },

    deleteReview: async (id) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.remove(`/review/delete/${id}`, {
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

export default reviewServices;
