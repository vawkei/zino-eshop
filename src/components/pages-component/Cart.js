import { Fragment, useEffect } from "react";
import classes from "./Cart.module.scss";
import { useSelector,useDispatch } from "react-redux";
import { cartAction } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import Card from "../ui/Card";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotalQty = useSelector((state) => state.cart.cartTotalQty);
  const cartTotalAmnt = useSelector((state) => state.cart.cartTotalAmnt);
  const navigate =  useNavigate();
   const dispatch = useDispatch(); 
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

  const increaseCart = (cart)=>{
    dispatch(cartAction.Add_To_Cart(cart)) 
  }
  const decreaseCart= (cart)=>{
       dispatch(cartAction.DECREASE_CART(cart))                     
  };

  const removeFromCart = (cart)=>{
    dispatch(cartAction.REMOVE_FROM_CART(cart))
  };
  const clearCartHandler = ()=>{
    dispatch(cartAction.CLEAR_CART())
  }

  const url = window.location.href;
  //console.log(url);
  
  

  useEffect(()=>{
    dispatch(cartAction.CALCULATE_SUBTOTAL());
    dispatch(cartAction.CALCULATE_TOTAL_QTY());
    dispatch(cartAction.SAVE_URL(''));// when this page first loads we ensure nothing is saved in our url, our state.prevUrl in the store.It ll only save to the prevUrl variable when checkout function is called.
  },[dispatch,cartItems])


  const checkout = ()=>{
    if(isLoggedIn){
      navigate('/checkout-details')
    }else{      
      dispatch(cartAction.SAVE_URL(url));
      navigate('/login')
    }
  }

  return (
    <section>
      <div className={`container ${classes.table}`}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div>
            <p>Your cart is Currently Empty</p>
            <br />
            <div>
              <Link to={"/#products"}>&larr; Continue shopping</Link>
            </div>
          </div>
        ) : (
          <Fragment>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {cartItems.map((cart, index) => {
                  const { id, name, price, imageUrl, quantity } = cart;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img src={imageUrl} alt={name} width={"100px"} />
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className={classes.count}>
                          <button className="--btn" onClick={()=>{decreaseCart(cart)}}>-</button>
                          <p>
                            <b>{quantity}</b>
                          </p>
                          <button className="--btn" onClick={()=>{increaseCart(cart)}}>+</button>
                        </div>
                      </td>
                      <td>{(price * quantity).toFixed(2)}</td>
                      <td className={classes.icons}>
                        <FaTrashAlt size={19} color="red" onClick={()=>removeFromCart(cart)}/>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={classes.summary}>
                <button className="--btn --btn-danger" onClick={clearCartHandler}>Clear cart</button>
                <div className={classes.checkout}>
                    <div>
                        <Link to={'/#products'}>&larr; Continue shopping</Link>
                    </div>
                    <br />
                    <Card className={classes.card}>
                        <p> <b> {`Cart Item(s):${cartTotalQty}` } </b></p>
                        <div className={classes.text}>
                            <h4>Subtotal:</h4>
                            <h3>{`$${cartTotalAmnt.toFixed(2)}`}</h3>
                        </div>
                        <div>
                            <p>Tax and shipping calculated at checkout</p>
                            <button className="--btn --btn-primary btn-block" onClick={checkout}>Checkout</button>
                        </div>
                    </Card>
                </div>
            </div>
          </Fragment>
        )}
      </div>
    </section>
  );
};

export default Cart;
