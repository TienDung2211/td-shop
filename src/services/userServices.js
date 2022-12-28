import * as request from '~/utils/request';

const userServices = {
    getUser: async () => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get('/user/my-info', {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    updateInfo: async (data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.put('/user/update-info', data, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    //Admin
    getAllAccounts: async () => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get('user/admin/get?sort=Id,ASC', {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    banAccount: async (data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.post(`user/admin/ban/${data}`, data, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    addEmployee: async (data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.post('/employee/add', data, {
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

export default userServices;
