import classes from "./auth.module.scss";
import registerImage from '../../assets/eshopregister.png'
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";



const Register = () => {
    return ( 
        <section className={`${classes.auth} section`}>
        
        <Card>
          <div className={classes.form}>
            <h2>Register</h2>
  
            <form action="">
              <input type="text" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <input type="password" placeholder="Confirm Password" required />
  
              <button className="--btn --btn-primary --btn-block">Register</button>
  
            </form>
  
            <span className={classes.register}>
              <p>Already have an account?</p>
              <Link to={"/login"}>Login</Link>
            </span>
          </div>
        </Card>

        <div className={classes.img}>
          <img src={registerImage} width={400} alt="Log" />
        </div>
      </section>
     );
}
 
export default Register;