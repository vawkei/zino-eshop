import AdminOnlyRoute from "../components/adminOnlyRoute/AdminOnlyRoute";
import Home from "../components/pages-component/Home";

const HomePage = () => {
  return (
    <div>
       {/* <Home /> */}
      <h1>Home</h1>
      <AdminOnlyRoute />
    </div>
  );
};

export default HomePage;
