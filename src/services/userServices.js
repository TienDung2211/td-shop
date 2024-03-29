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
    getAllAccounts: async (roleId = 0, id = 0) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get(`user/admin/get?sort=Id,ASC&role-id=${roleId}&id=${id}&size=200`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    banAccount: async (id) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.post(`user/admin/ban/${id}`, id, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    unBanAccount: async (id) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.post(`user/admin/unban/${id}`, id, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    getEmployeeById: async (id) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get(`/employee/get/${id}`, {
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
    updateEmployee: async (id, data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.put(`/employee/update/${id}`, data, {
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
