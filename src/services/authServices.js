import * as request from '~/utils/request';

const authServices = {
    authLogin: async (data) => {
        try {
            const res = await request.post('/login', data);
            if (res?.data) {
                localStorage.setItem('access', JSON.stringify(res?.data?.AccessToken));
                localStorage.setItem('refresh', JSON.stringify(res?.data?.RefreshToken));
                localStorage.setItem('user', JSON.stringify(res?.data?.UserInfo));
            }
            return res;
        } catch (error) {
            console.log(error);
        }
    },
    authLogOut: () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('user');
    },
};

export default authServices;
