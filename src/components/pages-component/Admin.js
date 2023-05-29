import React from "react";
import classes from "./Admin.module.scss";
import NavBar from '../admin/navbar/NavBar'
import { Routes,Route } from "react-router-dom";
import Home from '../admin/home/Home'
import ViewProducts from "../admin/viewProducts/ViewProducts";
import AddProduct from "../admin/addProduct/AddProduct";
import Orders from "../admin/orders/Orders";
import OrderDetails from "../admin/orderDetails/OrderDetails";

const Admin = () => {
  return (
    <div className={classes.admin}>
      {/* <h1> Admin Page </h1> */}
      <div className={classes.navbar}>
        <NavBar/>
      </div>
      <div className={classes.content}>
        <Routes>
          <Route path={'home'} element={<Home />} />
          <Route path={'all-products'} element={<ViewProducts />} />
          <Route path={'add-product/:id'} element={<AddProduct />} />
          <Route path={'orders'} element={<Orders />} />
          <Route path={'order-details/:id'} element={<OrderDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;