//import './App.css';
import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import CartPage from "./pages/CartPage";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from './components/products/productDetails/ProductDetails'
import CheckoutDetails from "./components/pages-component/checkout/CheckoutDetails";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutSuccess from "./components/pages-component/checkout/CheckoutSuccess";
import OrderDetailsPage from "./pages/OrderDetailsPage";

function App() {
  return (
    <Layout>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<Reset />} />

        <Route
          path="/admin/*"
          element={
            <AdminOnlyRoute>
              <AdminPage />
            </AdminOnlyRoute>
          }
        />
        
        <Route path="/product-details/:id" element={<ProductDetails/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/order-history" element={<OrderHistoryPage />} />
        <Route path="/order-details/:id" element={<OrderDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout-details" element={<CheckoutDetails />} />
        <Route path="/checkout" element={<CheckoutPage/>} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />

      </Routes>
    </Layout>
  );
}

export default App;
