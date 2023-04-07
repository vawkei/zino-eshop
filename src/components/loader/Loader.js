import classes from './Loader.module.scss';
import loaderImage from '../../assets/eshoploader.gif'
import React from 'react';
import ReactDom from 'react-dom';

const Loader = () => {
    return ReactDom.createPortal ( 
        <div className={classes.wrapper}>
            <div className={classes.loader}>
                <img src={loaderImage} alt="Loading..."/>
            </div>
        </div>,
        document.getElementById("loader")
     );
}
 
export default Loader;