import classes from './OrderDetails.module.scss';
import { doc, getDoc } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import spinnerImage from "../../assets/eshopspinner.jpg";
//import { useDispatch, useSelector } from "react-redux";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  //const dispatch = useDispatch();

  const getSingleOrder = async () => {
    const docRef = doc(db, "orders", id);
    //Above, the db is for ur database, products:put the name of ur collection here, so we changed it to products. which is the name of our collection.the last parameter: is the reference to the specific document you want to fetch
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //what they are saying here is, if this document exists in ur db, what do you want to do with it:
      // in the const obj object,the product we get doesnt have an id property to it, but we have the id in our params. so we create an id for the object
      const obj = {
        id: id,
        ...docSnap.data(),
      };
      setOrder(obj);
      //console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      toast.error("No such document!");
    }
  };

  useEffect(() => {
    getSingleOrder();
  }, []);

  console.log(order);
  return (
    <section>
      <div className={`container ${classes.table}`}>
        <h2>Order Details</h2>
        <div>
          <Link to={'/order-history'}>&larr; Go back to orders</Link>
        </div>
        <br />
        {order === null ? (<img src={<spinnerImage  />} style={{width:'50px'}} alt='Loading...' />): (
          <Fragment>
            <p>
              <b>Order Id</b>{order.id}
            </p>
            <p>
              <b>Order Amount</b> {`$`}{order.orderAmount}
            </p>
            <p>
              <b>Order Status</b>{order.orderStatus}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cart,index)=>{
                  const{id,name,price,imageUrl,quantity} = cart
                  return(
                    <tr key={id}>
                      <td>
                        <b>{index +1}</b>
                      </td>
                      <td>
                        <p><b>{name}</b></p>
                        <img src={imageUrl} alt="name"  style={{width:'100px'}}/>
                      </td>
                      <td>{`$`}{price}</td>
                      <td>{quantity}</td>
                      <td>{(price*quantity).toFixed(2)}</td>
                      <td className={classes.icons}>
                        <button className="--btn --btn-primary"><Link to={`/review-product/${id}`}>Review Product</Link></button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Fragment>
        )}
      </div>
    </section>
  );
};

export default OrderDetails;
