import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';


const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        isAuthenticated: false,
        user: {},
        error: null,
        message: null,
    },
    reducers: {
        registerRequest(state, action) {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
            state.message = null
        },
        registerSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.error = null;
            state.message = action.payload.message
        },
        registerFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload;
            state.message = null
        },

        loginRequest(state, action) {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
            state.message = null
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.error = null;
            state.message = action.payload.message
        },
        loginFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload;
            state.message = null
        },
        fetchUserRequest(state, action) {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;

        },
        fetchUserSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        fetchUserFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload;
        },
        logoutSuccess(state, action) {

            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
        },
        logoutFailed(state, action) {
            state.isAuthenticated = state.isAuthenticated;
            state.user = state.user;
            state.error = action.payload;
        },
        clearAllError(state, action) {
            state.error = null;
            state.user = state.user;
        }
    }
});


export const register = (data) => async (dispatch) => {
    dispatch(userSlice.actions.registerRequest());
    try {
        const response = await axios.post(`https://job-portal-grsh.onrender.com/user/register`, data, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" }
        })
        dispatch(userSlice.actions.registerSuccess(response.data));
        dispatch(userSlice.actions.clearAllError());
        toast(response.data.message)

    } catch (error) {
        console.error("Error during registration:", error);
        dispatch(userSlice.actions.registerFailed(error?.response?.data?.message || "Something went wrong"));

    }
};


export const login = (data) => async (dispacth) => {
    dispacth(userSlice.actions.loginRequest());
    try {
        const response = await axios.post("https://job-portal-grsh.onrender.com/user/login", data, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" }
        })
        dispacth(userSlice.actions.loginSuccess(response.data));
        dispacth(userSlice.actions.clearAllError());
        toast(response.data.message)
    } catch (error) {
        dispacth(userSlice.actions.loginFailed(error?.response?.data?.message))
    }
}

export const getUser = () => async (dispatch) => {
    dispatch(userSlice.actions.fetchUserRequest());
    try {
        const response = await axios.get(
            "https://job-portal-grsh.onrender.com/user/getuser",
            {
                withCredentials: true,
            }
        );
        dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
        dispatch(userSlice.actions.clearAllError());
      
    } catch (error) {
        dispatch(userSlice.actions.fetchUserFailed(error.response.data.message));
    }
};
export const logout = () => async (dispatch) => {
    try {
        const response = await axios.get(
            "https://job-portal-grsh.onrender.com/user/logout",
            {
                withCredentials: true,
            }
        );
        dispatch(userSlice.actions.logoutSuccess(response.data));
        dispatch(userSlice.actions.clearAllError());
    } catch (error) {
        dispatch(userSlice.actions.loginFailed(error.response.data.message));
    }
};


export const clearAllUserErrors = () => (dispacth) => {
    dispacth(userSlice.actions.clearAllError())
}

export default userSlice.reducer;