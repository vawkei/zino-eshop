import { createSlice, configureStore, } from "@reduxjs/toolkit";



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
      //console.log(state.products)
    },
  },
});


//SLICE 2:

const initialFilterState = {filteredProducts:[]}

const filterSlice = createSlice({
  name:'filter',
  initialState: initialFilterState,
  reducers:{
    FILTER_BY_SEARCH(state,action){
      //console.log(action.payload.products);
      const {products, search} = action.payload;
      const tempProduct = products.filter((product)=>product.name.toLowerCase().includes(search.toLowerCase()) || product.category.toLowerCase().includes(search.toLowerCase()))
      state.filteredProducts = tempProduct
      //what the const tempProduct line is saying is:look@ the search, whatever is typed in the input & check the list of products,if whatever is typed in the input field matches any product that has that name,then display that product.
    }
  }
})


const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    products: productSlice.reducer,
    filter: filterSlice.reducer,
  },
});

export const authActions = authSlice.actions;
export const productsAction = productSlice.actions;
export const  filterAction  = filterSlice.actions
export default store;
