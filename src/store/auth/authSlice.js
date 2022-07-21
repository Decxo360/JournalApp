import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    status:'Not Authenticated',
    uid:null,
    email:null,
    displayName:null,
    photoURL:null,
    errorMessage: null,
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login:(state, {payload})=>{
            state.uid = payload.uid
            state.email = payload.email
            state.displayName = payload.displayName
            state.photoURL = payload.photoURL
        },
        logout:(state,{payload})=>{
            state.uid = null
            state.email = null
            state.displayName = null
            state.photoURL = null
            state.errorMessage = payload?.errorMessage 
        },
        checkingCredentials:(state, {payload})=>{
            state.status = payload
        }

    }
});


// Action creators are generated for each case reducer function
export const {login,logout,checkingCredentials} = authSlice.actions;