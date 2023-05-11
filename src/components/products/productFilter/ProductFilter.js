import classes from './ProductFilter.module.scss'

const ProductFilter = () => {
    return ( 
        <div className={classes.filter}>
            <h4>Categories</h4>
            <div className={classes.category}>
                <button>All</button>
            </div>
            <h4>Brand</h4>
            <div className={classes.brand}>
                <select name="brand">
                    <option value="all">All</option>
                </select>
                <h4>Price</h4>
                <p>1500</p>
                <div className={classes.price}>
                    <input type="range" name='price' min='100' max='1000' />
                </div>
                <br />
                <button className='--btn --btn-danger'>Clear Filter</button>
            </div>
        </div>
     );
}
 
export default ProductFilter;