import { createSlice, configureStore } from "@reduxjs/toolkit";

//SLICE 1: AUTH SLICE:
const initialState = {
  isLoggedIn: false,
  email: "",
  userName: "",
  userId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setActiveUser(state, action) {
      // console.log(action.payload)
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.userId = action.payload.userId;
    },
    clearUser(state) {
      state.isLoggedIn = false;
      console.log(state.isLoggedIn);
      state.email = "";
      state.userName = "";
      state.userId = "";
    },
  },
});

//SLICE 2:
const initialProductState = {
  products: [],
  // the products property state is where we want to save all the products we fetch from firebase firestore
};
const productSlice = createSlice({
  name: "products",
  initialState: initialProductState,
  reducers: {
    //store_products is a function wererby we use to  store our products inside of redux
    STORE_PRODUCTS(state, action) {
      //console.log(action.payload);
      state.products = action.payload.products
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    products: productSlice.reducer,
  },
});

export const authActions = authSlice.actions;
export const productsAction = productSlice.actions;
export default store;
