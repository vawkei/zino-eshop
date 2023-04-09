import {createSlice, configureStore} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn:false,
    email:'',
    userName:'',
    userId:''
};

const authSlice = createSlice({
     name:'auth',
    initialState:initialState,
    reducers:{

        setActiveUser(state,action){
           // console.log(action.payload)
            state.isLoggedIn =true;
            state.email= action.payload.email;
            state.userName= action.payload.userName;
            state.userId= action.payload.userId  
        },
        clearActiveUser(state,action){
            state.isLoggedIn=false;
            console.log(state.isLoggedIn)
            state.email = '';
            state.userName='';
            state.userId=''
        }

    }
});

const store = configureStore({
    reducer:{auth:authSlice.reducer,}
});

export const authActions = authSlice.actions;
export default store;
