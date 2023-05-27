import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <section>
      <div className="container">
        <h2 style={{marginTop:'10rem'}}>Checkout successful</h2>
        <p>Thank you for your purchase</p>
        <br />
        
          <button className="--btn --btn-primary"><Link to={"/order-history"}>View Order Status</Link></button>
        
      </div>
    </section>
  );
};

export default CheckoutSuccess;
