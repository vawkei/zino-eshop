import classes from "./MainHeader.module.scss";
import { Link,NavLink,useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import {FaTimes} from 'react-icons/fa'
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import {  onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch,useSelector } from "react-redux";
import { authActions } from "../../store/index";

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
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();  
    const dispatch = useDispatch();

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user) //gives us every property of the user
        //const uid = user.uid;
        //console.log(user.displayName);
        if(user.displayName === null){
          //const u1= user.email.slice(0,-10)//cutsoff the last ten letters of the word
          //const uName = u1.toUpperCase()
          //console.log(uName)converts everyletter to capital
          
          //const uNameII = u1.charAt(0).toUpperCase() + u1.slice(1)
          //console.log(uNameII)

          //Or Better still go with "split" instead of "slice":
          const user1 = user.email.split("@");
          //console.log(user1)//this gives a string ["test","gmail.com"]
          const userName = user1[0]
         // console.log(userName);
          const userName2 = userName.charAt(0).toUpperCase() + userName.slice(1)
         // console.log(userName2);

          setDisplayName(userName2);
          
        }else{
          setDisplayName(user.displayName)
        };

        dispatch(authActions.setActiveUser({//4hrs39mins
          email:user.email,
          userName:user.displayName ? user.displayName : displayName,
          userId:user.uid
        }))
      } else {
        // User is signed out
        setDisplayName("");
        dispatch(authActions.clearActiveUser());//what this means is, everytime you load a page,and the user isnt loggedin , this fuction is gonna run and make sure no user is saved in the console.And if there's a user,and you log out,it will remove the active user.;
      }
    });
    
  },[])

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
  };



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
                <a href="#"> <FaUserCircle size={16} />Hi, {displayName} </a>
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
