import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Home from "../pages-component/Home";


const AdminOnlyRoute = (props) => {
    const userEmail = useSelector((state)=>state.auth.email);
    // console.log(userEmail);

    if (userEmail === "test@gmail.com") {
        return props.children;
      }else{
        return (

          <div></div>

          // <Home />
          // <section style={{height:'80vh'}}>
          //   <div className="container">
          //     <h2>Permission Denied</h2>
          //     <p>This apage can only be Viewed by The Admin</p>
          //     <br />
          //     <Link to={'/'}>
          //     <button className="--btn">&larr;Back Home</button> 
          //     {/* html entity */}</Link>
          //   </div>
          // </section>
        )
      }
};
export const AdminOnlyLink = (props) => {
    const userEmail = useSelector((state)=>state.auth.email);
    console.log(userEmail);

    if (userEmail === "test@gmail.com") {
        return props.children;
      }else{
        return null
      }
};
 
export default AdminOnlyRoute;               