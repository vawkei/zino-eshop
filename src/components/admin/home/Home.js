import { FaCartArrowDown } from "react-icons/fa";
import InfoBox from "../../infoBox/InfoBox";
import classes from "./Home.module.scss";
import {AiFillDollarCircle} from 'react-icons/ai'
import {BsCart4} from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import { productsAction,ordersAction } from "../../../store";
import { db, storage } from "../../../firebase/config";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />
const productIcon = <BsCart4 size={30} color="#1f93ff" />
const orderIcon = <FaCartArrowDown size={30} color="orangered" />

const Home = () => {
   // const products = useSelector((state)=>state.products.products);
   // const orders = useSelector((state)=>state.orders.orderHistory);
    const totalOrderAmount = useSelector((state)=>state.orders.totalOrderAmount);

    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
        getProducts();
        getOrders();
      }, [dispatch]);
      
      const getProducts = () => {
    
        try {
          const productsRef = collection(db, "products");
          const q = query(productsRef, orderBy("createdAt", "desc"));
    
          onSnapshot(q, (snapshot) => {
            //console.log(snapshot)
            //console.log(snapshot.docs)
    
            const allProducts = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            //console.log(allProducts);
            setProducts(allProducts);
            dispatch(
              productsAction.STORE_PRODUCTS({
                products: allProducts.map((product) => ({
                  ...product,
                  createdAt: new Date(product.createdAt.seconds * 1000).toDateString(),
                  editedAt: new Date(product.createdAt.seconds * 1000).toDateString(),
    
                }))
              })
            );
            
          });
        } catch (error) {
          toast.error(error.message);
        }
      };


      const getOrders = () => {
        
    
        try {
          const ordersRef = collection(db, "orders");
          const q = query(ordersRef, orderBy("createdAt", "desc"));
    
          onSnapshot(q, (snapshot) => {
            //console.log(snapshot)
            //console.log(snapshot.docs)
    
            const allOrders = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
          //console.log(allOrders);
            setOrders(allOrders);
            
            dispatch(
                ordersAction.STORE_ORDERS({
                orders: allOrders.map((order) => ({
                  ...order,
                  createdAt: new Date(order.createdAt.seconds * 1000).toDateString(),
                  // editedAt: new Date(order.createdAt.seconds * 1000).toDateString(),
    
                }))
              })
            );
            dispatch(ordersAction.CALC_TOTAL_ORDER_AMOUNT())
          });
        } catch (error) {
          toast.error(error.message);
        }
      };
    
  return (
    <div className={classes.home}>
      <h2>Admin HomePage</h2>
      <div className={classes["info-box"]}>
        <InfoBox
          cardClass={`${classes.card} ${classes.card1}`}
          title={"Earnings"}
          count={`${totalOrderAmount}`}
          icon={earningIcon}
        />
        <InfoBox
          cardClass={`${classes.card} ${classes.card2}`}
          title={"Products"}
          count={products.length}
          icon={productIcon}
        />
        <InfoBox
          cardClass={`${classes.card} ${classes.card3}`}
          title={"Orders"}
          count={orders.length}
          icon={orderIcon}
        />
      </div>
    </div>
  );
};

export default Home;
