import { useEffect, useState } from "react";
import classes from "./ReviewProduct.module.scss";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "../ui/Card";
import StarsRating from 'react-star-rate'
import { addDoc, collection, doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import spinnerImage from "../../assets/eshopspinner.jpg";


const ReviewProduct = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  //const products = useSelector((state) => state.products.products);
  const userId = useSelector((state) => state.auth.userId);
  const userName = useSelector((state) => state.auth.userName);

const reviewChangeHandler = (e)=>{
    setReview(e.target.value)
};

const getSingleProduct = async () => {
    setIsLoading(true);
    const docRef = doc(db, "products", id);
    
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const obj = {
        id: id,
        ...docSnap.data(),
      };
      setProduct(obj);
      console.log("Document data:", docSnap.data());
    } else {
      toast.error("No such document!");
    }
    setIsLoading(false);
  };


  useEffect(()=>{
    getSingleProduct()
  },[])

 // const product = products.find((item) => item.id === id);
 //its not wise calling product from our redux store because when you reload the page you get an error like Cannot read properties of undefined (reading 'name'), hence we call it from our database
//   console.log(products);
//   console.log(product.name);
  
  const submitReview = (e) => {
    e.preventDefault();
    //console.log(rate,review)
    
        const today = new Date();
        const date = today.toDateString();
        const time = today.toLocaleTimeString();
        const reviewConfig = {
          userId,
          userName,
          productID: id,
          rate,
          review,
          reviewDate: date,
          createdAt: Timestamp.now().toDate(),
        };
        try {
          addDoc(collection(db, "reviews"), reviewConfig);
        
          toast.success("Review submitted");
          setRate(0);
          setReview('');  
        } catch (error) {
          toast.error(error.message);
        }
      };
  



  return (
    <section>
      <div className={`container ${classes.review}`}>
        
        <h2>Review Products</h2>
        
        <p>
          <b>Product name:</b> {product.name}
        </p>
        {isLoading && <img src={spinnerImage} style={{width:'60px'}} alt="Loading..."/>}
        <img src={product.imageUrl}  style={{width:'100px'}} alt={product.name} />
        <Card className={classes.card}>
          <form action="" onSubmit={submitReview}>
            <label>Rating:</label>
            <StarsRating
              value={rate}
              onChange={(rate) => {
                setRate(rate);
              }}
            />
            <label>Review</label>
            <textarea value={review} required onChange={reviewChangeHandler} rows='5'></textarea>
            <button type="submit" className="--btn --btn-primary">Submit Review</button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ReviewProduct;
