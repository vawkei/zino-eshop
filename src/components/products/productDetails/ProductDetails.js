//Note: i have not yet worked on the none serializable value when adding to redux cart for product details.


import classes from "./ProductDetail.module.scss";

import { doc, getDoc } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import spinnerImage from "../../../assets/eshopspinner.jpg";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../../store";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const cart = cartItems.find((item) => item.id === id);

  const isCartAdded = cartItems.findIndex((cart)=>cart.id === id); // essentially, if the cart has not been added,it ll return -1 annd -1 is less than 0.that is if it doesnt find the index


  const getSingleProduct = async () => {
    const docRef = doc(db, "products", id);
    //Above, the db is for ur database, products:put the name of ur collection here, so we changed it to products. which is the name of our collection.the last parameter: is the reference to the specific document you want to fetch
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //what they are saying here is, if this document exists in ur db, what do you want to do with it:
      // in the const obj object,the product we get doesnt have an id property to it, but we have the id in our params. so we create an id for the object
      const obj = {
        id: id,
        ...docSnap.data(),
      };
      setProduct(obj);
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      toast.error("No such document!");
    }
  };

  const addToCartHandler = (product) => {
    dispatch(cartAction.Add_To_Cart(product));
    dispatch(cartAction.CALCULATE_TOTAL_QTY());
  };
  const decreaseCart = (product) => {
    dispatch(cartAction.DECREASE_CART(product));
    dispatch(cartAction.CALCULATE_TOTAL_QTY());
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  return (
    <section>
      <div className={`container ${classes.product}`}>
        <h2>Product details</h2>
        <div>
          <Link to={"/#products"}>&larr; Back to Products</Link>
        </div>
        {!product ? (
          <img src={spinnerImage} alt="Loading" style={{ width: "50px" }} />
        ) : (
          <Fragment>
            <div className={classes.details}>
              <div className={classes.img}>
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className={classes.content}>
                <h3>{product.name}</h3>
                <p className={product.price}>{`$${product.price}`}</p>
                <p>{product.description}</p>
                <p>
                  <b>SKU</b>
                  {product.id}
                </p>
                <p>
                  <b>Brand</b>
                  {product.brand}
                </p>

                
                  <div className={classes.count}>
                  {isCartAdded <0 ? null:(
                                      <Fragment>
                                      <button
                                      className="--btn"
                                      onClick={() => {
                                        decreaseCart(product);
                                      }}>
                                      -
                                    </button>
                                    
                                    <p>
                                      <b>{cart.quantity}</b>
                                    </p>
                                    <button
                                      className="--btn"
                                      onClick={() => addToCartHandler(product)}>
                                      +
                                    </button>
                                    </Fragment>
                  ) }

                </div>
                
                {/* <div className={classes.count}>
                  <button
                    className="--btn"
                    onClick={() => {
                      decreaseCart(product);
                    }}>
                    -
                  </button>
                  
                  <p>
                    <b>{cart.quantity}</b>
                  </p>
                  <button
                    className="--btn"
                    onClick={() => addToCartHandler(product)}>
                    +
                  </button>
                </div> */}
                <button
                  className="--btn --btn-danger"
                  onClick={() => addToCartHandler(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
