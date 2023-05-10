import classes from './Search.module.scss';
import {BiSearch} from 'react-icons/bi';


const Search = (props) => {
    return ( 
        <div className={classes.search}>
            <BiSearch size={18} className={classes.icon} />
            <input type="text" placeholder='search by name' value={props.value} onChange={props.onChange} />
        </div>
     );
}
 
export default Search;