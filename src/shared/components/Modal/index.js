import React from 'react';

import styles from "./styles.module.scss";
import ALERT from "../../../assets/alert.svg";

const Modal = (props) => {
    return (
        <React.Fragment>
            <div className={styles.backdrop}></div>
            <div className={styles.wrapper}>
                { props.children }
                <div className={styles.actions}>
                    {
                        props.positive && 
                        <button onClick={props.onPositiveAction} className={styles.positive}>
                            {props.positiveLabel}
                        </button>
                    }
                    {
                        props.negative &&
                        <button onClick={props.onNegativeAction} className={styles.negative}>
                            {props.negativeLabel}
                        </button>
                    }
                </div>
            </div>
        </React.Fragment>
    );
}

export default Modal;