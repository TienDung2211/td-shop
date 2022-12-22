import * as request from '~/utils/request';

const authServices = {
    authLogin: async (data) => {
        try {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            const res = await request.post('/login', data);
            if (res?.data) {
                localStorage.setItem('access', JSON.stringify(res?.data?.AccessToken));
                localStorage.setItem('refresh', JSON.stringify(res?.data?.RefreshToken));
            }
            return res;
        } catch (error) {
            console.log(error);
        }
    },
    authRegister: async (data) => {
        try {
            const res = await request.post('/auth/register', data);
            return res;
        } catch (error) {
            console.log(error);
        }
    },
    authLogOut: () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
    },
};

export default authServices;
