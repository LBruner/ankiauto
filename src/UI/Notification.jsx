import {uiActions} from "../components/store/UISlice";
import classes from './Notification.module.css';
import {useDispatch} from "react-redux";
import Timer from "./Timer";

const Notification = (props) => {
    const {title,message,status} = props.notification;
    const dispatch = useDispatch();
    let statusClasses = '';

    if (status === 'success') {
        statusClasses = classes.success;
    }

    if (status === 'error') {
        statusClasses = classes.error;
    }

    if (status === 'alert') {
        statusClasses = classes.pending;
    }

    const activeClasses = `${classes.notification} ${statusClasses}`;

    const onClickHandler = ()=>{
        dispatch(uiActions.hideNotification())
    }
    
    return (
        <div className={activeClasses} onClick={onClickHandler}>
            <h2>{title}</h2>
            <Timer class={'timer'}/>
            <h4>{message}</h4>
            
        </div>
    );
};

export default Notification;