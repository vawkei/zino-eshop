import { useDispatch, useSelector } from "react-redux";
import classes from "./Product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import { useEffect, useState } from "react";
import { productsAction } from "../../store/index";
//import useFetchCollection from "../../customHooks/useFetchCollection";
import spinnerImage from "../../assets/eshopspinner.jpg";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";

const Product = () => {
  

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();


  // const { data: data, isLoading } = useFetchCollection("products");
  // const products = useSelector((state) => state.products.products);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(
  //     productsAction.STORE_PRODUCTS({
  //       products: data.map((product) => ({
  //         ...product,
  //         createdAt: new Date(product.createdAt.seconds * 1000).toDateString(),
  //         editedAt: new Date(product.createdAt.seconds * 1000).toDateString(),
  //       })),
  //     })
  //   );
  // }, [dispatch, data]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setIsLoading(true);

    try {
      // const citiesRef = collection(db, "cities");
      const productsRef = collection(db, "products");
      //   const q = query(citiesRef, orderBy("name", "desc"))
      const q = query(productsRef, orderBy("createdAt", "desc"));

      onSnapshot(q, (snapshot) => {
        //console.log(snapshot)
        //console.log(snapshot.docs)

        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        //console.log(allProducts);
        setProducts(allProducts);
        setIsLoading(false);
        dispatch(
          productsAction.STORE_PRODUCTS({
            products: allProducts.map((product) => ({
              ...product,
              createdAt: new Date(product.createdAt.seconds * 1000).toDateString(),
              editedAt: new Date(product.createdAt.seconds * 1000).toDateString(),

            }))
          })
        );

      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <section>
      <div className={`container ${classes.product}`}>
        <aside className={classes.filter}>
          {isLoading ? null : <ProductFilter />}
        </aside>

        <div className={classes.content}>
          {/* {isLoading ? <img src={spinnerImage}  alt="Loading..." style={{width:'50px'}} className="--center-all"/> : <ProductList products={products} />}  --OR--*/}
          {isLoading && (
            <img
              src={spinnerImage}
              alt="Loading..."
              style={{ width: "50px" }}
              className="--center-all"
            />
          )}
          <ProductList products={products} />
        </div>
      </div>
    </section>
  );
};


export default Product;

        //Regarding the dispatch converting createdAt and editedAt from nonserializable elements to serializable elements:

        //The map() method is used to iterate over each object in the "allProducts" array and convert the "createdAt" property, which is a Firebase timestamp, into a human-readable date format using the toDateString() method. The resulting array contains only the date strings.

        // So essentially, this line of code maps over the allProducts array to extract the createdAt timestamp and convert it to a human-readable format using the toDateString() method. The resulting array of dates is then passed as the products property of the action payload to the STORE_PRODUCTS reducer function, which will update the products state in the Redux store.

        //         After "allProducts" is updated, the "STORE_PRODUCTS" action is dispatched using the Redux "dispatch" function. This action stores the "allProducts" array in the Redux store, with each object in the array having its "createdAt" property converted to a serializable format using the JavaScript Date object's toDateString() method.

        // By dispatching this action, any component that is subscribed to the Redux store can access the latest version of the "products" array with the updated "createdAt" properties

