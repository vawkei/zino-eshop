import classes from "./ProductItem.module.scss";
import Card from "../../ui/Card";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartAction } from "../../../store";


const ProductItem = (props) => {
  

  // const shortenText = (text,n)=>{
  //     if(text.length > 15){
  //         const shortenedText = text.substring(0, 15).concat('...');
  //         //start filteringout the letters in the text from 0{the first character} and shld stop at the 15th letter & when you get to the 15th letter,add threedots with concat.
  //         //to make it dynamic and not static, we add another parameter "n".
  //         return shortenedText
  //     }

  // return text
  // }
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      //start filteringout the letters in the text from 0{the first character} and shld stop at the 15th letter & when you get to the 15th letter,add threedots with concat.
      //to make it dynamic and not static, we add another parameter "n".
      return shortenedText;
    }

    return text;
  };

  const dispatch = useDispatch();
  const product = props.product;

  const addToCartHandler = ()=>{
    dispatch(cartAction.Add_To_Cart(product))
    // dispatch(cartAction.CALCULATE_TOTAL_QTY()) not necessary.
  }

  //console.log(props.description)

  return (
    <Card className={ props.grid ? `${classes.grid}` : `${classes.list}`}>
    
      <Link to={`/product-details/${props.id}`}>
        <div className={classes.img}>
          <img src={props.imageUrl} alt={props.name} /> 
        </div>
      </Link>
      <div className={classes.content}>
        <div className={classes.details}>
          <p>{`$${props.price}`}</p>
          {/* <h4>{shortenText(props.name)}</h4> */}
          <h4>{shortenText(props.name, 15)}</h4>
        </div>
        {!props.grid && <p >{shortenText(props.description,200)}</p>}

        <button className="--btn --btn-danger" onClick={addToCartHandler}>Add to cart</button>
      </div>
    </Card>
  );
};

export default ProductItem;
