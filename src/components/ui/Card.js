import classes from './Card.module.scss'

const Card = (props) => {
    return ( 
        <div className={`${classes.card} ${props.className}`}>
            <main>{props.children}</main>
        </div>
     );
}
 
export default Card;