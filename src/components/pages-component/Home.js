//import classes from './Home.module.scss';
import { useEffect } from "react";
import Product from "../products/Product";
import Slider from "../slider/Slider";

const Home = () => {
    const url =window.location.href;
    
    const scrollToProducts =()=>{
        if(url.includes('#products')){
            window.scrollTo({
                top:642,
                behavior:'smooth'
            })
            return
        }
    };

    // useEffect(()=>{
    //     scrollToProducts()
    // },[]);

    return ( 
        <div>
            {/* <h1>Home Page</h1> */}
            {/* <Slider /> */}
            <Product />
        </div>
     );
}
 
export default Home;