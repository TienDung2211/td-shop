import * as request from '~/utils/request';

const authServices = {
    authLogin: async (data) => {
        try {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('userId');
            const res = await request.post('/login', data);
            if (res?.data) {
                localStorage.setItem('access', JSON.stringify(res?.data?.AccessToken));
                localStorage.setItem('refresh', JSON.stringify(res?.data?.RefreshToken));
                localStorage.setItem('userId', JSON.stringify(res?.data?.UserInfo.Id));
            }
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    authRegister: async (data) => {
        try {
            const res = await request.post('/auth/register', data);
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    authLogOut: () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('userId');
    },
    authSendEmailForgotPassword: async (data) => {
        try {
            const res = await request.post('/email/send-forgot-password-email', data);
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    authVerifyResetPassword: async (data) => {
        try {
            const res = await request.post('/auth/reset-password-verification', data);
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    authResetPassword: async (data) => {
        try {
            const res = await request.post('/auth/reset-password', data);
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
};

export default authServices;
