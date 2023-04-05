import classes from "./MainHeader.module.scss";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
// import {HiOutlineMenuAlt3} from 'react-icons/hi'
import { useState } from "react";

const MainHeader = () => {
  const logo = (
    <div className={classes.logo}>
      <Link to="/">
        <h2>
          {" "}
          e<span>Shop</span>.{" "}
        </h2>
      </Link>
    </div>
  );

  const cart = (
    <span className={classes.cart}>
      <Link to={"/cart"}>
        Cart
        <FaShoppingCart size={20} />
        <p>0</p>
      </Link>
    </span>
  );

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenuHandler = () => {
    setShowMenu((prevState) => !prevState);
  };
  const hideMenuHandler = () => {
    setShowMenu(false);
  };

  return (
    <header>
      <div className={classes.header}>
        {logo}
        <nav
          className={
            showMenu ? `${classes["show-nav"]}` : `${classes["hide-nav"]}`
          }>
          <div
            className={
              showMenu
                ? `${classes["nav-wrapper"]} ${classes["show-nav-wrapper"]}`
                : `${classes["nav-wrapper"]}`
            } onClick={hideMenuHandler}> </div>
            <ul onClick={hideMenuHandler}>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/contact"}>Contact Us</Link>
              </li>
            </ul>
            <div className={classes["header-right"]} onClick={hideMenuHandler}>
              <span className={classes.links}>
                <Link to={"/login"}>Login</Link>
                <Link to={"/register"}>Register</Link>
                <Link to={"/order-history"}>My Orders</Link>
              </span>

              {/* http://react-icons.github.io/react-icons/search  1hr16mins in the course*/}

              {cart}
            </div>
    
        </nav>

        <div className={classes["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenuHandler} />
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
