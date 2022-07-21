import React from 'react';

import styles from "./styles.module.scss";
import FALLBACK from "../../../assets/fallback.png";

const Fallback = (props) => {
    return (
        <div className={styles.wrapper}>
            <img src={FALLBACK}/>
            <p>{props.message}</p>
            { props.label && <button onClick={props.onClick}>{props.label}</button> }
        </div>
    );
}

export default Fallback;