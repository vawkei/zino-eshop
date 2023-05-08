import classes from "./NavBar.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const userName = useSelector((state) => state.auth.userName);

  const NavDataHandler = (navData) => {
    return navData.isActive ? classes.active : "";
  };

  return (
    <div className={classes.navbar}>
      <div className={classes.user}>
        <FaUserCircle size={40} color="#fff" />
        <h2> {userName} </h2>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink className={NavDataHandler} to={"/admin/home"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={NavDataHandler} to={"/admin/all-products"}>
              View Products
            </NavLink>
          </li>
          <li>
            <NavLink className={NavDataHandler} to={"/admin/add-product/ADDNEWPRODUCT"}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink className={NavDataHandler} to={"/admin/orders"}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
