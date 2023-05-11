import classes from './ProductDetail.module.scss';

import { doc, getDoc } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import spinnerImage from "../../../assets/eshopspinner.jpg";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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

  useEffect(() => {
    getSingleProduct();
  }, []);

  return (
    <section>
      
      <div className={`container ${classes.product}`}>
      <h2>Product details</h2>
            <div>
                <Link to={'/#products'}>&larr; Back to Products</Link>
            </div>
            {!product ? <img src={spinnerImage} alt='Loading' style={{width:'50px'}}  /> : (
                <Fragment>
                    <div className={classes.details}>
                        <div className={classes.img}>
                            <img src={product.imageUrl} alt={product.name}/>
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
                                <button className='--btn'>-</button>
                                <p><b>1</b></p>
                                <button className='--btn'>+</button>
                            </div>
                            <button className='--btn --btn-danger'>Add to Cart</button>
                        </div>
                    </div>
                </Fragment>
            )}
      </div>
    </section>
  );
};

export default ProductDetails;
