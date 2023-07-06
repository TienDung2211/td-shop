import * as request from '~/utils/request';

const categoryServices = {
    // MasterCategory
    getAllMasterCategory: async () => {
        try {
            const res = await request.get('/master-category/get-all?page=0&size=20&sort=id');
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    addMasterCategory: async (data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.post('/master-category/add', data, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    updateMasterCategory: async (id, data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.put(`/master-category/update/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    removeMasterCategory: async (id) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.remove(`/master-category/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    // ParentCategory
    getAllParentCategory: async (id) => {
        try {
            const res = await request.get(`/category/get?master-category=${id}`);
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    addParentCategory: async (data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.post('/category/add', data, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    updateParentCategory: async (id, data) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.put(`/category/update/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    removeParentCategory: async (id) => {
        try {
            const access = JSON.parse(localStorage.getItem('access'));

            const res = await request.remove(`/category/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    // ChildrenCategory
    getChildrenCategoryById: async (id) => {
        try {
            const res = await request.get(`/category/get/${id}`);
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
    getAllChildrenCategory: async () => {
        try {
            const res = await request.get(`/category/get-all?page=0&size=200&sort=id`);
            return res;
        } catch (error) {
            console.error(error.response.data);
        }
    },
};

export default categoryServices;
