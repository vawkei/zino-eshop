import classes from './Orders.module.scss';
import { Fragment, useEffect, useState } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { db, storage } from '../../../firebase/config';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { ordersAction } from "../../../store/index";
import Loader from '../../loader/Loader';

const Orders = () => {
    
    const [isLoading, setIsLoading] = useState(false);
  
    const orders = useSelector((state)=>state.orders.orderHistory);
    //console.log(orders)
    const userId = useSelector(state=>state.auth.userId)
    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    const handleClick = (id)=>{
      navigate(`/admin/order-details/${id}`)
    };


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
          });
        } catch (error) {
          setIsLoading(false);
          toast.error(error.message);
        }
      };
    return ( 
        <Fragment >
            <div className={ classes.order}>

            <h1> Your Order History</h1>
            <p>Open an order to  <b>Change Order Status  </b></p>
            <br />
            <Fragment>
                {isLoading && <Loader />}
                <div className={classes.table}>
                    {orders.length === 0? (
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
                            
                            {orders.map((order,index)=>{
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
            
        </Fragment>
        );
}
 
export default Orders;