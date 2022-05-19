import {uiActions} from "../components/store/UISlice";
import classes from './Notification.module.css';

const Notification = (props) => {
    const {title,message,status} = props.notification;

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

    return (
        <div className={activeClasses} onClick={uiActions.hideNotification}>
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    );
};

export default Notification;