import classes from './OrderHistory.module.scss';
import { Fragment, useEffect, useState } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { db, storage } from '../../firebase/config';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { ordersAction } from "../../store/index";
import Loader from '../loader/Loader';

const OrderHistory = () => {

    //const [orders, setOrders] = useState([]);we want to get the orders frm redux instead. because we may need the orders in other components
    const [isLoading, setIsLoading] = useState(false);
  
    const orders = useSelector((state)=>state.orders.orderHistory);
    //console.log(orders)
    const userId = useSelector(state=>state.auth.userId)
    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    const handleClick = (id)=>{
      navigate(`/order-details/${id}`)
    };

    const filteredOrders = orders.filter((order)=> order.userID === userId)
    // the filteredOrders variable is used to filter the orders array based on the userID. It filters the orders to only include the orders that belong to the currently logged-in user.
    useEffect(() => {
        getOrders();
      }, []);

    const getOrders = () => {
        setIsLoading(true);
    
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
          //  console.log(allOrders);
            //setOrders(allOrders);
            setIsLoading(false);
            dispatch(
                ordersAction.STORE_ORDERS({
                orders: allOrders.map((order) => ({
                  ...order,
                  createdAt: new Date(order.createdAt.seconds * 1000).toDateString(),
                  // editedAt: new Date(order.createdAt.seconds * 1000).toDateString(),
    
                }))
              })
            );
            //The map() method is used to iterate over each object in the "allProducts" array and convert the "createdAt" property, which is a Firebase timestamp, into a human-readable date format using the toDateString() method. The resulting array contains only the date strings.
    
            // So essentially, this line of code maps over the allProducts array to extract the createdAt timestamp and convert it to a human-readable format using the toDateString() method. The resulting array of dates is then passed as the products property of the action payload to the STORE_PRODUCTS reducer function, which will update the products state in the Redux store.
    
            //         After "allProducts" is updated, the "STORE_PRODUCTS" action is dispatched using the Redux "dispatch" function. This action stores the "allProducts" array in the Redux store, with each object in the array having its "createdAt" property converted to a serializable format using the JavaScript Date object's toDateString() method.
    
            // By dispatching this action, any component that is subscribed to the Redux store can access the latest version of the "products" array with the updated "createdAt" properties
          });
        } catch (error) {
          setIsLoading(false);
          toast.error(error.message);
        }
      };
    return ( 
        <section >
            <div className={`container ${classes.order}`}>

            <h1> Your Order History</h1>
            <p>Open an order to leave a <b> Product Review </b></p>
            <br />
            <Fragment>
                {isLoading && <Loader />}
                <div className={classes.table}>
                    {/* {orders.length === 0? ( */}
                    {filteredOrders.length === 0? (
                        <p>You have no Orders</p>
                    ):(
                      
                    <table>
                        <thead>
                            <tr>
                                <th>s/n</th>
                                <th>Date</th>
                                <th>Order ID</th>
                                <th>Order Amount</th>
                                <th>Order Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order,index)=>{
                            // {orders.map((order,index)=>{
                                // const {id,orderDate,orderTime,orderAmount,orderStatus} = order
                           return(
                            <tr key={order.id} onClick={()=>handleClick(order.id)}>
                                <td>{index+1}</td>
                                <td>{order.orderDate} at {order.orderTime}</td>
                                <td>{order.id}</td>
                                <td>{`$`}{order.orderAmount}</td>
                                <td><p className={order.orderStatus !== 'Delivered'? `${classes.pending}`: `${classes.delivered}`}>{order.orderStatus}</p></td>
                            </tr>
                           ) })}
                        </tbody>
                    </table>
                    )}
                    
                </div>
            </Fragment>
            </div>
            
        </section>
     );
}
 
export default OrderHistory;