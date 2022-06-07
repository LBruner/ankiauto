import classes from './Timer.module.css'
import {useSelector} from "react-redux";

const Timer = (props) => {
    const requestTime = useSelector(state => state.ui.timer)

    return (
        <div className={classes[props.class]}>
            <p>Elapsed Time: </p>
            <p>{requestTime} minutes</p>
        </div>
    );
};

export default Timer;