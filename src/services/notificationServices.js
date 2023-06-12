import * as request from '~/utils/request';

const notificationServices = {
    getNotifyByUser: async () => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));
            const userId = JSON.parse(localStorage.getItem('userId'));

            const res = await request.get(`/user-noti/search?user-id=${userId}`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },

    maskAsReadNotify: async (id) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.post(
                `/user-noti/mark-as-read/${id}`,
                {},
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

    deleteNotify: async (id) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.remove(`/user-noti/delete/${id}`, {
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

export default notificationServices;
