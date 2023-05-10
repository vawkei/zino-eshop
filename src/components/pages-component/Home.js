//import classes from './Home.module.scss';
import Product from "../products/Product";
import Slider from "../slider/Slider";

const Home = () => {
    return ( 
        <div>
            {/* <h1>Home Page</h1> */}
            <Slider />
            <Product />
        </div>
     );
}
 
export default Home;