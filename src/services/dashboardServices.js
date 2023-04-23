import * as request from '~/utils/request';

const dashboardServices = {
    revenueDashboard: async (data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get(
                `/statistic/revenue?from-date=${data?.fromDate}&to-date=${data?.toDate}&type=${data?.type}`,
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

    orderDashboard: async (data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get(`/statistic/order?from-date=${data?.fromDate}&to-date=${data?.toDate}`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },

    ratingDashboard: async (data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get(
                `/statistic/rating-by-star?from-date=${data?.fromDate}&to-date=${data?.toDate}`,
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

    accountDashboard: async (data, role = 0) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get(
                `/statistic/account?from-date=${data?.fromDate}&to-date=${data?.toDate}&role=${role}`,
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

    totalRevenue: async () => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get('/statistic/total-revenue', {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    totalProduct: async () => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get('/statistic/total-product', {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    totalOrder: async () => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get('/statistic/total-order', {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    ratingAvg: async () => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get('/statistic/rating-avarage', {
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

export default dashboardServices;
