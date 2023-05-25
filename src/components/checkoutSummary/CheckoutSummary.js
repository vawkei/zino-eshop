import { useSelector } from "react-redux";
import classes from './CheckoutSummary.module.scss';
import { Link } from "react-router-dom";
import Card from "../ui/Card";

const CheckoutSummary = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotalAmnt = useSelector((state) => state.cart.cartTotalAmnt);
  const cartTotalQty = useSelector((state) => state.cart.cartTotalQty);

  return (
    <div>
      <h2>Checkout Summary</h2>
      <div>
        {cartItems.length === 0 ? (
          <>
            <p>No items in cart.</p>
            <button className="--btn">
              <Link to={"/#products"}>Back to shop</Link>
            </button>
          </>
        ) : (
          <div>
            <p>
              <b>{`Cart items:${cartTotalQty}`}</b>
            </p>
            <div className={classes.text}>
                <h4>Subtotal:</h4>
                <h3>{cartTotalAmnt.toFixed(2)}</h3>
            </div>
            {cartItems.map((item,index)=>{
                const{id,name,price, quantity} =item;
                return(
                    <Card className={classes.card} key={id}> 
                        <h4>Product:{name}</h4>
                        <p>Quantity:{quantity}</p>
                        <p>Unit price:{price}</p>
                        <p>Set price: {price *quantity}</p>
                    </Card>
                )
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
