//import './App.css';
import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import ContactPage from "./pages/ContactPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import CartPage from "./pages/CartPage"
import AdminPage from "./pages/AdminPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  return (
    
    <Layout>
      <ToastContainer/>
      <Routes>
        <Route   path="/"     element={<HomePage/>} />
        <Route   path="/contact"  element={<ContactPage />} />
        <Route   path="/order-history"   element={<OrderHistoryPage />}/>
        <Route   path="/cart"   element={<CartPage/>}/>
        <Route   path="/admin"   element={< AdminPage/>}  />
        <Route   path="/login" element= {<Login/>} />
        <Route   path="/register" element = {<Register/>} />
        <Route   path="/reset" element={<Reset/>} />

      </Routes>
    </Layout>
  );
}

export default App;
