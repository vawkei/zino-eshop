import Card from "../ui/Card";
import classes from "./InfoBox.module.scss";

const InfoBox = (props) => {
  return (
    <div className={classes["info-box"]}>
      <Card className={props.cardClass}>
        <h4>{props.title}</h4>
        <span>
          <h3>${props.count}</h3>
          {props.icon}
        </span>
      </Card>
    </div>
  );
};

export default InfoBox;
