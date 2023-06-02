import * as request from '~/utils/request';

const attributeServices = {
    getAllAttributes: async () => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get(`/attribute-set/get-all?sort=id`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    getAttributeById: async (id) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.get(`/attribute-set/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    addAttribute: async (data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.post('/attribute-set/add', data, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    updateAttribute: async (id, data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.put(`/attribute-set/update/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    removeAttribute: async (id) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.remove(`/attribute-set/delete/${id}`, {
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

export default attributeServices;
