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

//SLICE 2 PRODUCTSLICE:

const initialProductState = {
  products: [],
  // the products property state is where we want to save all the products we fetch from firebase firestore
  minPrice: 0,
  maxPrice: null
};
const productSlice = createSlice({
  name: "products",
  initialState: initialProductState,
  reducers: {
    //store_products is a function wererby we use to  store our products inside of redux
    STORE_PRODUCTS(state, action) {
      //console.log(action.payload);
      state.products = action.payload.products;
      //console.log(state.products)
    },
    GET_PRICE_RANGE(state,action){
      //console.log(action.payload)
      const {products} = action.payload;
      let array = [];
      products.map((product)=>{
        const price = product.price;
       return array.push(price);
      })
      //console.log(array)
      const max = Math.max(...array)
      const min = Math.min(...array)
     // console.log(max,min);
     state.maxPrice = max;
     state.minPrice = min;
    //  What we have done here is that everytime the page LoadBundleTask, it will calculate the min and max price and save it in redux
    }
  },
});

//SLICE 3 FILTERSLICE:

const initialFilterState = { filteredProducts: [] };

const filterSlice = createSlice({
  name: "filter",
  initialState: initialFilterState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      //console.log(action.payload.products);
      const { products, search } = action.payload;
      const tempProduct = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredProducts = tempProduct;
      //what the const tempProduct line is saying is:look@ the search, whatever is typed in the input & check the list of products,if whatever is typed in the input field matches any product that has that name,then display that product.
    },

    SORT_PRODUCT(state, action) {
     // console.log(action.payload);
      const { products, sort } = action.payload;
      let tempProducts = [];
      if (sort === "latest") {
        tempProducts = products;
      }

      if (sort === "lowest-price") {
        tempProducts = products.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }

      if (sort === "highest-price") {
        tempProducts = products.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }

      if (sort === "a-z") {
        tempProducts = products.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }

      if (sort === "z-a") {
        tempProducts = products.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      state.filteredProducts = tempProducts;
    },
    FILTER_BY_CATEGORY(state,action){
      // console.log(action.payload)
      const {products,category} = action.payload;
      let tempProduct = [];
      if(category === 'All'){
        tempProduct =products
      }else{
        tempProduct = products.filter((product)=>product.category === category);
      }
      state.filteredProducts = tempProduct;
      // so, if the category we get from dispatch is = 'all',we set tempProducts to products, meaning we dont change anything. However,if the category is not = 'all', then perform the else operation. so, we take the products we get from dispatch and filter tru it. by doing so we get the individual products and filter its category to see which matches with the category from dispatch//
    },

    FILTER_BY_BRAND(state,action){
      //console.log(action.payload)
      const {products,brand} = action.payload
      let tempProducts = [];
      if(brand === 'All'){
        tempProducts = products 
      }else{
        tempProducts = products.filter((product)=>product.brand ===brand)
      };
      state.filteredProducts = tempProducts
    },
    FILTER_BY_PRICE(state,action){
      //console.log(action.payload)
      const {products,price} = action.payload
      let tempProducts = []; 
      tempProducts = products.filter((product)=>product.price <= price)
      state.filteredProducts = tempProducts;
      //What we are saying here is that we are interested in the product.price that is equals to or less than the price we get from the front end part,the form input.
    }
  },
  //No need creating another slice for sortProduct. since its sharing the same space with filteredProducts onscreen. e.g: filteredProducts.map and filteredProducts.length
});


const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    products: productSlice.reducer,
    filter: filterSlice.reducer,
  },
});

export const authActions = authSlice.actions;
export const productsAction = productSlice.actions;
export const filterAction = filterSlice.actions;


export default store;
