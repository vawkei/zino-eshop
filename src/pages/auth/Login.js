import classes from "./auth.module.scss";
import loginImg from "../../assets/eshoplogin.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/ui/Card";
import { Fragment, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = ()=>{

    signInWithPopup(auth, provider)
  .then((result) => {

    const user = result.user;
    toast.success('Login Successful');
    navigate("/")
  }).catch((error) => {
    toast.error(error.message)

  });
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password) //3hrs:30mins:00vid
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setIsLoading(false);
        toast.success("Login Successful");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <Fragment>
      {isLoading && <Loader/> }
      {/* <ToastContainer /> */}
      <section className={`${classes.auth} section`}>
        <div className={classes.img}>
          <img src={loginImg} width={400} alt="Log" />
        </div>

        <Card>
          <div className={classes.form}>
            <h2>Login</h2>

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

              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>

              <div className={classes.links}>
                <Link to={"/reset"}>Reset Password</Link>
              </div>
              <p>--or--</p>
            </form>

            <button className="--btn --btn-danger --btn-block" onClick={signInWithGoogle}>
              <FaGoogle /> Login with Google
            </button>
            <span className={classes.register}>
              <p>Don't have an account?</p>
              <Link to={"/register"}>Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </Fragment>
  );
};

export default Login;
