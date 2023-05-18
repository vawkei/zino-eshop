import { useState } from "react";
import classes from "./CheckoutDetails.module.scss";
import Card from "../../ui/Card";
import { CountryDropdown } from "react-country-region-selector";

const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};
const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const handleShipping = (e) => {
    const{name,value} = e.target;
    setShippingAddress({...shippingAddress,[name]:value})
  };
  const handleBilling = (e) => {
    const {name,value} = e.target;
    setBillingAddress({...billingAddress,[name]:value})
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({shippingAddress,billingAddress})// so we will have to push our details to redux store to enable us use it anywhere in our application
  };
  return (
    <section>
      <div className={`container ${classes.checkout}`}>
        <h2>Checkout Details</h2>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <Card className={classes.card}>
              <h3>Shipping Address</h3>
              <label htmlFor="">Recipient Name:</label>
              <input
                type="text"
                placeholder="recipient name"
                name="name"
                value={shippingAddress.name}
                onChange={handleShipping}
                required
              />

              <label htmlFor="">Address line 1:</label>
              <input
                type="text"
                placeholder="line 1"
                name="line1"
                value={shippingAddress.line1}
                onChange={handleShipping}
                required
              />

              <label htmlFor="">Address line 2:</label>
              <input
                type="text"
                placeholder="line 2"
                name="line2"
                value={shippingAddress.line2}
                onChange={handleShipping}
              />

              <label htmlFor="">City:</label>
              <input
                type="text"
                placeholder="city"
                name="city"
                value={shippingAddress.city}
                onChange={handleShipping}
                required
              />

              <label htmlFor="">State:</label>
              <input
                type="text"
                placeholder="state"
                name="state"
                value={shippingAddress.state}
                onChange={handleShipping}
                required
              />

              <label htmlFor="">Postal Code:</label>
              <input
                type="text"
                placeholder="postal code"
                name="postal_code"
                value={shippingAddress.postal_code}
                onChange={handleShipping}
                required
              />

              <CountryDropdown
                valueType="short"
                className={classes.select}
                value={shippingAddress.country}
                onChange={(val) =>
                  handleShipping({ target: { name: "country", value: val } })
                }
              />

              <label htmlFor="">Phone:</label>
              <input
                type="text"
                placeholder="phone"
                name="phone"
                value={shippingAddress.phone}
                onChange={handleShipping}
                required
              />
            </Card>
            {/* BILLING ADDRESS */}
            <Card className={classes.card}>
              <h3>Billing Address</h3>
              <label htmlFor="">Recipient Name:</label>
              <input
                type="text"
                placeholder="name"
                name="name"
                value={billingAddress.name}
                onChange={handleBilling}
                required
              />

              <label htmlFor="">Address line 1:</label>
              <input
                type="text"
                placeholder="line 1"
                name="line1"
                value={billingAddress.line1}
                onChange={handleBilling}
                required
              />

              <label htmlFor="">Address line 2:</label>
              <input
                type="text"
                placeholder="line 2"
                name="line2"
                value={billingAddress.line2}
                onChange={handleBilling}
              />

              <label htmlFor="">City:</label>
              <input
                type="text"
                placeholder="city"
                name="city"
                value={billingAddress.city}
                onChange={handleBilling}
                required
              />

              <label htmlFor="">State:</label>
              <input
                type="text"
                placeholder="state"
                name="state"
                value={billingAddress.state}
                onChange={handleBilling}
                required
              />

              <label htmlFor="">Postal Code:</label>
              <input
                type="text"
                placeholder="postal code"
                name="postal_code"
                value={billingAddress.postal_code}
                onChange={handleBilling}
                required
              />

              <CountryDropdown
                valueType="short"
                className={classes.select}
                value={billingAddress.country}
                onChange={(val) =>
                  handleBilling({ target: { name: "country", value: val } })
                }
              />

              <label htmlFor="">Phone:</label>
              <input
                type="text"
                placeholder="phone"
                name="phone"
                value={billingAddress.phone}
                onChange={handleBilling}
                required
              />
              <button type="submit" className="--btn --btn-primary">Proceed to Checkout</button>
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
