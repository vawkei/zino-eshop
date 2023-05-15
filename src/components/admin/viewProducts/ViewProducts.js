import { Fragment, useEffect, useState } from "react";
import classes from "./ViewProducts.module.scss";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Notiflix from "notiflix";

import Loader from "../../loader/Loader";
import { deleteObject, ref } from "firebase/storage";
import { useDispatch,useSelector } from "react-redux";
import { productsAction } from "../../../store";
import useFetchCollection from "../../../customHooks/useFetchCollection";


const ViewProducts = () => {
  // const { data:data, isLoading } = useFetchCollection("products");
  // const products = useSelector((state)=>state.products.products);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(
  //     productsAction.STORE_PRODUCTS({
  //       products: data
  //       .map((product) => ({
  //         ...product,
  //         createdAt: new Date(product.createdAt.seconds * 1000).toDateString(),
  //         editedAt: new Date(product.createdAt.seconds * 1000).toDateString(),
  //       })),
  //     })
  //   );
  // },[dispatch,data]);

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
        //The map() method is used to iterate over each object in the "allProducts" array and convert the "createdAt" property, which is a Firebase timestamp, into a human-readable date format using the toDateString() method. The resulting array contains only the date strings.

        // So essentially, this line of code maps over the allProducts array to extract the createdAt timestamp and convert it to a human-readable format using the toDateString() method. The resulting array of dates is then passed as the products property of the action payload to the STORE_PRODUCTS reducer function, which will update the products state in the Redux store.

        //         After "allProducts" is updated, the "STORE_PRODUCTS" action is dispatched using the Redux "dispatch" function. This action stores the "allProducts" array in the Redux store, with each object in the array having its "createdAt" property converted to a serializable format using the JavaScript Date object's toDateString() method.

        // By dispatching this action, any component that is subscribed to the Redux store can access the latest version of the "products" array with the updated "createdAt" properties
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  function confirmDelete(id, imageUrl) {
    Notiflix.Confirm.show(
      // 'Notiflix Confirm',doc
      "Delete Product !!!",
      // 'Do you agree with me?',doc
      "You are abaout to delete this product",
      // 'Yes',doc
      "Delete",
      // 'No',doc
      "cancel",
      function okCb() {
        // alert('Thank you.');doc
        deleteProduct(id, imageUrl);
      },
      function cancelCb() {
        // alert('If you say so...');
      },
      {
        width: "320px",
        borderRadius: "8px",
        // etc...
        titleColor: "red",
        okButtonBackground: "red",
        cssAnimationStyle: "zoom",
      }
    );
  }

  async function deleteProduct(id, imageUrl) {
    try {
      // await deleteDoc(doc(db, "cities", "DC"));from doc
      await deleteDoc(doc(db, "products", id));
      //the line above: we want to delete from the products collection by id

      //const desertRef = ref(storage, 'images/desert.jpg');from doc
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
      toast.success("product deleted seccessfully");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Fragment>
      {isLoading && <Loader />}
      <div className={classes.table}>
        <h2>View Products</h2>
        {products.length === 0 ? (
          <p>No Product found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                return (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td> {`$${product.price}`}</td>
                    <td className={classes.icons}>
                      <Link to={`/admin/add-product/${product.id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      {/* <FaTrashAlt size={18} color="red" onClick={()=>deleteProduct(product.id,product.imageUrl)}/> */}
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() =>
                          confirmDelete(product.id, product.imageUrl)
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </Fragment>
  );
};

export default ViewProducts;
