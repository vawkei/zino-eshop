import classes from "./auth.module.scss";
import resetImg from "../../assets/eshopforgot.png";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";




const Reset = () => {
  return (
    <div>
      <section className={`${classes.auth} section`}>
        <div className={classes.img}>
          <img src={resetImg} width={400} alt="Log" />
        </div>

        <Card>
          <div className={classes.form}>
            <h2>Reset Password</h2>

            <form action="">

              <input type="text" placeholder="Password" required />

              <button className="--btn --btn-primary --btn-block">Reset Password</button>

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
