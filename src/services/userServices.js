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
            console.log(error);
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
            console.log(error);
        }
    },
};

export default userServices;
