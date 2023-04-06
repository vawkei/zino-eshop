import classes from './MainFooter.module.scss';

const MainFooter = () => {

    const date = new Date();
    
    const months  = [
        'Jan',
        'Feb',
        'March',
        'April',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    const month = date.getMonth();
    const year = date.getFullYear();

    const fullDate = `${months[month]} ${year}`
    //console.log(fullDate)
    return ( 
        <div className={classes.footer}>
            <small> &copy; {fullDate} All Rights Reserved</small>
        </div>
     );
}
 
export default MainFooter;