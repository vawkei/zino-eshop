import classes from "./MainHeader.module.scss";
import { Link,NavLink,useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import {FaTimes} from 'react-icons/fa'
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import {  signOut } from "firebase/auth"
import { useState } from "react";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";

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
  const navigate = useNavigate();  


  const toggleMenuHandler = () => {
    setShowMenu((prevState) => !prevState);
  };
  const hideMenuHandler = () => {
    setShowMenu(false);
  };

  const logOutUser = ()=>{
    
    signOut(auth).then(() => {
      toast.success('Logout Successful')
      navigate('/')
    }).catch((error) => {
      toast.error("error.message")
    })
  }

  const navDataHandler =(navData)=>{
    return navData.isActive ? classes.active : ''
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
              <li className={ classes['logo-mobile']}>
                {logo}
                <FaTimes  size={22} color="#fff"  onClick={hideMenuHandler}/>
              </li>
              <li>
                <NavLink to={"/"} className={navDataHandler}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/contact"} className={navDataHandler}>Contact Us</NavLink>
              </li>
            </ul>
            <div className={classes["header-right"]} onClick={hideMenuHandler}>
              <span className={classes.links}>
                <NavLink to={"/login"}className={navDataHandler} >Login</NavLink>
                <NavLink to={"/register"}className={navDataHandler}>Register</NavLink>
                <NavLink to={"/order-history"}className={navDataHandler}>My Orders</NavLink>
                <NavLink to={"/"} onClick={logOutUser}>Logout</NavLink>
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
