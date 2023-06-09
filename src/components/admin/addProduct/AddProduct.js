import { Fragment, useState } from "react";
import classes from "./AddProduct.module.scss";
import Card from "../../ui/Card";
import {
  ref,
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage, db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../loader/Loader";

import { useSelector } from "react-redux";

const categories = [
  { id: "p1", name: "Laptop" },
  { id: "p2", name: "Electronics" },
  { id: "p3", name: "Fashion" },
  { id: "p4", name: "Phone" },
];

const AddProduct = () => {
  const { id } = useParams();
  // console.log(id);The id enables us to get the product id gotten through the url

  // const initialState = {
  //   name: "",
  //   imageUrl: "",
  //   price: 0,
  //   category: "",
  //   brand: "",
  //   description: "",
  // };

  const products = useSelector((state) => state.products.products);

  const productEdit = products.find((item) => {
    return item.id === id;
  });
  console.log(productEdit);

  const detectForm = (id, f1, f2) => {
    if (id === "ADDNEWPRODUCT") {
      return f1;
    } else {
      return f2;
    }
    //we want to use the detectform function to work, based on the params it receives
  };

  // const [product, setProduct] = useState({
  //   name: "",
  //   imageUrl: "",
  //   price: 0,
  //   category: "",
  //   brand: "",
  //   description: "",
  // });

  const [product, setProduct] = useState(() => {
    const newState = detectForm(
      id,
      {
        name: "",
        imageUrl: "",
        price: 0,
        category: "",
        brand: "",
        description: "",
      },
      productEdit
    );
    return newState;
  });

  const [uploadProgress, setupLoadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // const detectForm =(id, f1, f2)=>{
  //   if(id==='ADDNEWPRODUCT'){
  //     return f1
  //   }
  //   return f2;
  //   //we want to use the detectform function to work, based on the params it receives
  // }

  const handleInputChange = (e) => {
    // setProduct(e.target.value);
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    //console.log(file)

    const storage = getStorage();
    //const storageRef = ref(storage, 'images/rivers.jpg');
    const storageRef = ref(storage, `eshop/${Date.now()} ${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');
        setupLoadProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log('File available at', downloadURL);
          setProduct({ ...product, imageUrl: downloadURL });
          toast.success("Image uploaded successfully");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    console.log(product);

    setIsLoading(true);

    try {
      // Add a new document with a generated id.
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageUrl: product.imageUrl,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        description: product.description,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setupLoadProgress(0);

      setProduct({
        name: "",
        imageUrl: "",
        price: 0,
        category: "",
        brand: "",
        description: "",
      });
      toast.success("Product uploaded successfully");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  function editProduct(e) {
    e.preventDefault();
    setIsLoading(true);

    if(product.imageUrl !== productEdit.imageUrl){
      const storageRef = ref(storage, productEdit.imageUrl);
       deleteObject(storageRef);
    }

    try {
      // add_doc just adds a new document to the database. But SETDOC, it will look at the database
      //for a particular document and it will update the document with the new data u r sending
      
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageUrl: product.imageUrl,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        description: product.description,
        createdAt: productEdit.createdAt,
        editedAt:Timestamp.now().toDate()
      });
      setIsLoading(false);
      toast.success('Product edited successfully')
      navigate('/admin/all-products')
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  }

  return (
    <Fragment>
      {isLoading && <Loader />}
      <div className={classes.product}>
        {/* <h1>Add New Products</h1> */}
        <h2>{detectForm(id, "Add New Product", "Edit Product")}</h2>
        <Card className={classes.card}>
          {/* <form action="" onSubmit={addProduct}> */}
          <form action="" onSubmit={detectForm(id, addProduct, editProduct)}>
            <label htmlFor="">Product name</label>
            <input
              type="text"
              placeholder="product name"
              required
              name="name"
              value={product.name}
              onChange={handleInputChange}
            />

            <label htmlFor="">Product image</label>
            <Card className={classes.group}>
              {uploadProgress === 0 ? null : (
                <div className={classes.progress}>
                  <div
                    className={classes["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}>
                    {/* uploading 50% */}
                    {uploadProgress < 100
                      ? `uploading ${uploadProgress}%`
                      : `upload complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                placeholder="product Image"
                accept="image/all"
                name="image"
                onChange={handleImageChange}
                files={product.imageUrl}
              />

              {product.imageUrl === "" ? null : (
                <input
                  type="text"
                  // required
                  placeholder="imageURL"
                  name="imageURL"
                  value={product.imageUrl}
                  disabled
                />
              )}
            </Card>
            <label htmlFor="">Product price</label>
            <input
              type="number"
              placeholder="product price"
              required
              name="price"
              value={product.price}
              onChange={handleInputChange}
            />

            <label htmlFor="">Product category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleInputChange}
              required>
              <option value="" disabled>
                --- Choose Product Category ---
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>

            <label htmlFor="">Product Company/Brand:</label>
            <input
              type="text"
              placeholder="product brand"
              required
              name="brand"
              value={product.brand}
              onChange={handleInputChange}
            />

            <label htmlFor="">Product Description</label>
            <textarea
              name="description"
              value={product.description}
              required
              onChange={handleInputChange}
              rows="5"></textarea>

            {/* <button className="--btn --btn-primary">Save Product</button> */}
            <button className="--btn --btn-primary">
              {detectForm(id, "Save Product", "Edit Product")}
            </button>
          </form>
        </Card>
      </div>
    </Fragment>
  );
};

export default AddProduct;
