import React from 'react';
import { MdHighlightOff, MdOutlineDoneOutline} from "react-icons/md";

import { ErrorContext } from "../../../providers/error";

import styles from "./styles.module.scss"

const Alerts = () => {
    const [errors, insertError] = React.useContext(ErrorContext);
    
    return (
        <React.Fragment>
            {
                errors.length !== 0 &&
                <div className={styles.alerts}>
                    { errors.map(error => <Alert message={error.message} type={error.type}/>) }
                </div>
            }
        </React.Fragment>
    );
}

const Alert = (props) => {
    const classes = { success : styles.success, error: styles.error };
    
    return (
        <div className={styles.alert}>
            <div className={styles.details}>
                <p>{ props.message }</p>
            </div>
            <div className={[styles.icon, classes[props.type]].join(" ")}>
                { props.type === "success" && <MdOutlineDoneOutline size={20} color="#ecf0f1"/> }
                { props.type === "error"   && <MdHighlightOff size={25} color="#ecf0f1"/> }
            </div>
        </div>
    );
}

export default Alerts;