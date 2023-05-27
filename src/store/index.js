import { createSlice, configureStore } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
  maxPrice: null,
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
    GET_PRICE_RANGE(state, action) {
      //console.log(action.payload)
      const { products } = action.payload;
      let array = [];
      products.map((product) => {
        const price = product.price;
        return array.push(price);
      });
      //console.log(array)
      const max = Math.max(...array);
      const min = Math.min(...array);
      // console.log(max,min);
      state.maxPrice = max;
      state.minPrice = min;
      //  What we have done here is that everytime the page LoadBundleTask, it will calculate the min and max price and save it in redux
    },
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
    FILTER_BY_CATEGORY(state, action) {
      // console.log(action.payload)
      const { products, category } = action.payload;
      let tempProduct = [];
      if (category === "All") {
        tempProduct = products;
      } else {
        tempProduct = products.filter(
          (product) => product.category === category
        );
      }
      state.filteredProducts = tempProduct;
      // so, if the category we get from dispatch is = 'all',we set tempProducts to products, meaning we dont change anything. However,if the category is not = 'all', then perform the else operation. so, we take the products we get from dispatch and filter tru it. by doing so we get the individual products and filter its category to see which matches with the category from dispatch//
    },

    FILTER_BY_BRAND(state, action) {
      //console.log(action.payload)
      const { products, brand } = action.payload;
      let tempProducts = [];
      if (brand === "All") {
        tempProducts = products;
      } else {
        tempProducts = products.filter((product) => product.brand === brand);
      }
      state.filteredProducts = tempProducts;
    },
    FILTER_BY_PRICE(state, action) {
      //console.log(action.payload)
      const { products, price } = action.payload;
      let tempProducts = [];
      tempProducts = products.filter((product) => product.price <= price);
      state.filteredProducts = tempProducts;
      //What we are saying here is that we are interested in the product.price that is equals to or less than the price we get from the front end part,the form input.
    },
  },
  //No need creating another slice for sortProduct. since its sharing the same space with filteredProducts onscreen. e.g: filteredProducts.map and filteredProducts.length
});

//SLICE 4: CARTSLICE
//const initialCartState ={cartItems:[]};normally its done likethis but if u refresh d page, u will lose all the items in your cart, so use local storage with it.

//use JSON.stringify() whenu want to save to localstorage, then JSON.parse() if u want to get something from localstorage and use in your project.

const initialCartState = {
   cartItems: [],
  cartTotalQty: 0,
  cartTotalAmnt: 0,
  prevUrl:''
};

// const storedCartItems = localStorage.getItem('cartItems');
// if(storedCartItems){
//   initialCartState.cartItems = JSON.parse(storedCartItems)
// }


const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    Add_To_Cart(state, action) {

      //console.log(action.payload);
      const newItem = action.payload;
      //console.log(newItem);
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      if (!existingItem) {
        state.cartTotalQty++;
        state.cartItems.push({ ...action.payload, quantity: 1 });
        //console.log(`${action.payload.name} added to cart`);
        toast.success(`${action.payload.name} added to cart`, {
          position: "top-left",
        });
      } else {
        existingItem.quantity = existingItem.quantity + 1;
        console.log(`${action.payload.name} increased by 1`);
        toast.info(`${action.payload.name} increased by one`, {
          position: "top-left",
        });
      }
      //localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
    },
      DECREASE_CART(state,action){
        const items = action.payload;
        const itemId = items.id;
        const existingItem = state.cartItems.find((item)=>item.id===itemId);
        if(existingItem.quantity ===1){
          state.cartItems= state.cartItems.filter((item)=>{
            return item.id !==itemId
          });
          state.cartTotalQty = state.cartTotalQty - 1
        }else{
          existingItem.quantity =  existingItem.quantity -1
        }

      },
      REMOVE_FROM_CART(state,action){
        //console.log(action.payload)
        const items = action.payload;
        const itemId = items.id;
        const existingItem =state.cartItems.find((item)=>item.id ===itemId);
        if(existingItem){
          state.cartItems = state.cartItems.filter((item)=>item.id !==itemId)
        }
        toast.success(` ${existingItem.name} deleted from cart`,{position:"top-left"})
      },
      CLEAR_CART(state,action){
        //console.log(action.payload)
        state.cartItems = [];
      },
      CALCULATE_SUBTOTAL(state,action){
        const array = [];
        state.cartItems.map((item)=>{
          const{price,quantity} = item;
          const cartItemAmount = price * quantity;
          //console.log(cartItemAmount)
         return array.push(cartItemAmount)
        })
        //console.log(array)
        const totalAmount = array.reduce((curNumber,item)=>{
          return curNumber + item
        },0);
        //console.log(totalAmount)
        state.cartTotalAmnt = totalAmount
      },
      CALCULATE_TOTAL_QTY(state,action){
        //console.log(action.payload)
        const array = [];
        state.cartItems.map((item)=>{
          const{quantity} = item;
          const cartQty = quantity;
          return array.push(cartQty);
        });
        const totalQty = array.reduce((curNumber,item)=>{
          return curNumber + item
        },0);
        state.cartTotalQty = totalQty;
        console.log(state.cartTotalQty)

      },
      SAVE_URL(state,action){
        console.log(action.payload)
        state.prevUrl= action.payload // the url we get frm the frontend we want to save it here
      }
  },
  
});

//SLICE :CHECKOUT

const initialCheckoutState = {shippingAddress:'', billingAddress:''};

const checkoutSlice = createSlice({
  name:'checkout',
  initialState:initialCheckoutState,
  reducers:{
    SAVE_SHIPPING_ADDRESS(state,action){
      state.shippingAddress= action.payload;
      console.log(state.shippingAddress);
    },
    SAVE_BILLING_ADDRESS(state,action){
      state.billingAddress = action.payload;
      console.log(state.billingAddress);
    }
  }
})

//SLICE :ORDERSLICE 

const initialOrderState = {orderHistory:[]};

const orderSlice = createSlice({
  name:'orders',
  initialState:initialOrderState,
  reducers:{
    STORE_ORDERS(state,action){
      console.log(action.payload)
     // state.orderHistory = action.payload
     const{orders} = action.payload;
     state.orderHistory = orders
    }
  }
})

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    products: productSlice.reducer,
    filter: filterSlice.reducer,
    cart: cartSlice.reducer,
    checkout: checkoutSlice.reducer,
    orders: orderSlice.reducer
  },
});

export const authActions = authSlice.actions;
export const productsAction = productSlice.actions;
export const filterAction = filterSlice.actions;
export const cartAction = cartSlice.actions;
export const checkoutAction = checkoutSlice.actions
export const ordersAction = orderSlice.actions

export default store;



















// const initialCartState = {
//   // cartItems: localStorage.getItem("cartItems")
//   //   ? JSON.parse(localStorage.getItem("cartItem"))
//   : [],
//   cartTotalQty: 0,
//   cartTotalAmnt: 0,
// };
//what we r saying here is: for the cart items,firstwe shld check the localstorage,if 'cartItems' exist in the localstorage,if it exits in the localstorage, then set it to be the value of cartItems,initialState.but if it doesnt exist, but set the value of cartItems to be an empty array


      // const productIndex = state.cartItems.findIndex((item)=>item.id === action.payload.id);

      // if(productIndex >=0){
      //   //Item already exists in cart, Increase cartQuantity;
      //   state.cartItems[productIndex].cartQuantity +=1;
      //   toast.info(`${action.payload.name} increased by one`,{
      //     position:'top-left',
      //   });
      // }else{
      //   //Item doesnt exist in the cart. Add item to cart;
      //   const tempProduct = {...action.payload,cartQuantity:1};
      //   state.cartItems.push(tempProduct);
      //   toast.success(`${action.payload.name} added to cart`,{
      //     position:'top-left'
      //   })
      // }
      // save cart to LS
      //localStorage.setItem('cartItems',JSON.stringify(state.cartItems))