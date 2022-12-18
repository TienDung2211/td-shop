import authServices from '~/services/authServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    access: '',
    user: {},
};

// export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
//     try {
//         const dataAPI = await authServices.authLogin(data);
//         return { user: dataAPI?.data };
//     } catch (error) {
//         console.log(error);
//     }
// });

// export const logout = createAsyncThunk('auth/logout', async () => {
//     await authServices.authLogOut();
// });

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            try {
                const dataAPI = authServices.authLogin(data);
                return dataAPI?.data;
            } catch (error) {
                console.log(error);
            }
        },
        logout: (state) => {
            authServices.authLogOut();
            return {
                access: '',
                user: {},
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
