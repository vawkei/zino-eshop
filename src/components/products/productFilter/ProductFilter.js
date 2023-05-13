import classes from "./ProductFilter.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { filterAction, productsAction } from "../../../store";
import { useEffect, useState } from "react";

const ProductFilter = () => {
  const [category, setCategory] = useState("All");
  const [brand, setbrand] = useState("All");
  const [price,setPrice] = useState(3000);

 const brandChangeHandler = (e)=>{
    setbrand(e.target.value)
  };
 const priceChangeHandler = (e)=>{
    setPrice(e.target.value)
  };

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);//with const products here, we are getting our products' state from redux and using it here.
  const minPrice = useSelector((state)=>state.products.minPrice);
  const maxPrice = useSelector((state)=>state.products.maxPrice);//So we have brought our min and max prices here from redux.

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
    // the code snippet creates a new Set object containing unique categories extracted from the products array, and this Set is then assigned as the only element in the allCategories array
  ];
  //console.log(allCategories);
  // ['All', 'Phone', 'Laptop', 'Electronics', 'Fashion']

  const allBrands = [
    'All',
    ...new Set(products.map((product)=> product.brand))
  ]
 // console.log(allBrands)


 useEffect(()=>{
  dispatch(filterAction.FILTER_BY_BRAND({products,brand}))
 },[dispatch,products,brand]) //we want this useEffect to run whenever the brand changes.

useEffect(()=>{
  dispatch(filterAction.FILTER_BY_PRICE({products,price}))
},[dispatch, products,price])

  const filterProduct = (cat) => {
    setCategory(cat);
    dispatch(filterAction.FILTER_BY_CATEGORY({products,category:cat}));
  };


  const clearFilter = ()=>{
    setCategory('All');
    setbrand('All');
    setPrice(maxPrice)
  };

  return (
    <div className={classes.filter}>
      <h4>Categories</h4>
      <div className={classes.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${category}` === cat ? `${classes.active}` : ""}
              onClick={() => filterProduct(cat)}>&#8250; {cat}
              {" "}
              {/* if the category state is the same as the category of
              allCategories, then we want to append a class of active All */}
            </button>
          );
        })}
      </div>
      <h4>Brand</h4>
      <div className={classes.brand}>
        <select value={brand} onChange={brandChangeHandler} >
          {allBrands.map((brand,index)=>{
            return(
              <option value={brand} key={index} >{brand}</option>
            )
          })}
          {/* <option value="all"></option> */}
        </select>
        <h4>Price</h4>
        {/* <p>1500</p> */}
        <p>{`$${price}`}</p>
        <div className={classes.price}>
          <input type="range" min={minPrice} value={price} onChange={priceChangeHandler} max={maxPrice} />
        </div>
        <br />
        <button className="--btn --btn-danger" onClick={clearFilter}>Clear Filter</button>
      </div>
    </div>
  );
};

export default ProductFilter;
