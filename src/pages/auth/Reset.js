import classes from "./auth.module.scss";
import resetImg from "../../assets/eshopforgot.png";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import { useState } from "react";
import {  sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading,setIsLoading] =useState(false);
  
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const submitHandler= (event)=>{
    event.preventDefault();
    setIsLoading(true)

    sendPasswordResetEmail(auth, email)
  .then(() => {
    
    toast.success('Check your Mail for Reset Link')
    setIsLoading(false)
  })
  .catch((error) => {
    toast.error(error.message)
    setIsLoading(false)
  });
  }

  return (
    <div>
      <section className={`${classes.auth} section`}>
        <div className={classes.img}>
          <img src={resetImg} width={400} alt="Log" />
        </div>

        <Card>
          <div className={classes.form}>
            <h2>Reset Password</h2>

            {isLoading && <Loader/>}
            <form action="" onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Password"
                value={email}
                required
                onChange={emailChangeHandler}
              />

              <button className="--btn --btn-primary --btn-block" type="submit">
                Reset Password
              </button>

              <div className={classes.links}>
                <Link to={"/login"}>- Login</Link>
                <Link to={"/register"}>- Register</Link>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Reset;
