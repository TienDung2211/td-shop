import * as request from '~/utils/request';

const statisticServices = {
    ratingStatistic: async (data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get(`/statistic/rating?from-date=${data.fromDate}&to-date=${data.toDate}`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    orderAvgStatistic: async (data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get(`/statistic/order-avg?from-date=${data.fromDate}&to-date=${data.toDate}`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    productStatistic: async (data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get(`/statistic/product?from-date=${data.fromDate}&to-date=${data.toDate}`, {
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

export default statisticServices;
