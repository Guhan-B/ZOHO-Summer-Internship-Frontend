import React from 'react';
import Loader from "react-spinners/PulseLoader";

import styles from "./styles.module.scss";

const Button = (props) => {
    const sizes = { 
        "small": styles.small
    }

    const variants = {
        "primary" : styles.primary,
        "danger" : styles.danger
    }

    const buttonClasses = [styles.wrapper, variants[props.variant], sizes[props.size]]

    return (
        <button type={props.type} className={buttonClasses.join(" ")} onClick={props.onClick}> 
            { props.loading ? <Loader size={8} color="#ecf0f1"/> : <p>{props.label} </p> }   
        </button>
    );
}

export default Button;