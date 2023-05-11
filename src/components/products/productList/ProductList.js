import classes from "./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { Fragment, useEffect, useState } from "react";
import Search from "../../search/Search";
import ProductItem from "../productItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { filterAction } from "../../../store";

const ProductList = (props) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");

  const filteredProducts = useSelector(
    (state) => state.filter.filteredProducts
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      filterAction.FILTER_BY_SEARCH({
        products: props.products.map((product) => {
          return {
            ...product,
            createdAt: new Date(
              product.createdAt.seconds * 1000
            ).toDateString(),
            editedAt: new Date(product.createdAt.seconds * 1000).toDateString(),
          };
        }),
        search: search,
      })
    );
    console.log(search)
  }, [dispatch, props.products,search]);

  const gridHandlerTrue = () => {
    setGrid(true);
  };

  const gridHandlerFalse = () => {
    setGrid(false);
  };

  const searchChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className={classes["product-list"]} id="product">
      <div className={classes.top}>
        <div className={classes.icons}>
          <BsFillGridFill
            size={22}
            color={"orangered"}
            onClick={gridHandlerTrue}
          />
          <FaListAlt size={24} color={"#0066d4"} onClick={gridHandlerFalse} />
          <p>
            <b>10</b> Products found
          </p>
        </div>
        <div>
          <Search value={search} onChange={searchChangeHandler} />
        </div>
        <div className={classes.sort}>
          <label htmlFor="">Sort by:</label>
          <select>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest price</option>
            <option value="highest-price">Highest price</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>

      <div className={grid ? `${classes.grid}` : `${classes.list}`}>
        {props.products === 0 ? (
          <p>No products found</p>
        ) : (
          <Fragment>
            {/* {props.products.map((product) => {this was before filteredproducts */}
            {filteredProducts.map((product) => {
              return (
                <ProductItem
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  category={product.category}
                  brand={product.brand}
                  createdAt={product.createdAt}
                  grid={grid}
                  product={product}
                />
              );
            })}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default ProductList;
