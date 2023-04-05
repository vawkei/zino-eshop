import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter"

const Layout = (props) => {
    return ( 
        <div>
            <MainHeader />
            <main>{props.children}</main>
            <MainFooter />
        </div>
     );
}
 
export default Layout;