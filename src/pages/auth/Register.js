import classes from "./auth.module.scss";
import registerImage from "../../assets/eshopregister.png";
import { Link,useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import { useState, Fragment } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; move them to App.js

import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase/config'
import Loader from '../../components/loader/Loader'
import { toast } from "react-toastify";



const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const conPasswordChangeHandler = (event) => {
    setConPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (password !== conPassword) {
      toast.error("Passwords do not match");
    };

    setIsLoading(true);

    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      const user = userCredential.user;
      console.log(user)

      setIsLoading(false);
      toast.success("Registration Successful")
      navigate('/login')
    })
    .catch((error)=>{
        toast.success(error.message)
        setIsLoading(false)
    })
  };

  return (
    <Fragment>
      {/* <ToastContainer /> */}
      {isLoading && <Loader/>}
      <section className={`${classes.auth} section`}>
        <Card>
          <div className={classes.form}>
            <h2>Register</h2>

            <form action="" onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Email"
                value={email}
                required
                onChange={emailChangeHandler}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={passwordChangeHandler}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={conPassword}
                required
                onChange={conPasswordChangeHandler}
              />

              <button className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>

            <span className={classes.register}>
              <p>Already have an account?</p>
              <Link to={"/login"}>Login</Link>
            </span>
          </div>
        </Card>

        <div className={classes.img}>
          <img src={registerImage} width={400} alt="register" />
        </div>
      </section>
    </Fragment>
  );
};

export default Register;
