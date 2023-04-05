//import './App.css';
import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import ContactPage from "./pages/ContactPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import CartPage from "./pages/CartPage"
import AdminPage from "./pages/AdminPage";




function App() {
  return (
    <Layout>
      <Routes>
        <Route   path="/"     element={<HomePage/>} />
        <Route   path="/contact"  element={<ContactPage />} />
        <Route   path="/order-history"   element={<OrderHistoryPage />}/>
        <Route   path="/cart"   element={<CartPage/>}/>
        <Route   path="/admin"   element={< AdminPage/>}  />
      </Routes>
    </Layout>
  );
}

export default App;
