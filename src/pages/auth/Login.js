import classes from "./auth.module.scss";
import loginImg from "../../assets/eshoplogin.png";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/ui/Card";

const Login = () => {
  return (
    <section className={`${classes.auth} section`}>
      <div className={classes.img}>
        <img src={loginImg} width={400} alt="Log" />
      </div>

      <Card>
        <div className={classes.form}>
          <h2>Login</h2>

          <form action="">
            <input type="text" placeholder="Email" required />
            <input type="password" placeholder="Password" required />

            <button className="--btn --btn-primary --btn-block">Login</button>

            <div className={classes.links}>
              <Link to={"/reset"}>Reset Password</Link>
            </div>
            <p>--or--</p>
          </form>

          <button className="--btn --btn-danger --btn-block">
            <FaGoogle /> Login with Google
          </button>
          <span className={classes.register}>
            <p>Don't have an account?</p>
            <Link to={"/register"}>Register</Link>
          </span>
        </div>
      </Card>
    </section>
  );
};

export default Login;
