import React from 'react';

import styles from "./styles.module.scss";
import ALERT from "../../../assets/alert.svg";

const Modal = (props) => {
    return (
        <React.Fragment>
            <div className={styles.backdrop}></div>
            <div className={styles.wrapper}>
                <img src={ALERT}/>
                <div className={styles.content}>
                    <h3>{props.title}</h3>
                    <p>{props.description}</p>
                </div>
                <div className={styles.actions}>
                    <button onClick={props.positiveOnClick} className={styles.positive}>
                        {props.positiveLabel}
                    </button>
                    <button onClick={props.negativeOnClick} className={styles.negative}>
                        {props.negativeLabel}
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Modal;