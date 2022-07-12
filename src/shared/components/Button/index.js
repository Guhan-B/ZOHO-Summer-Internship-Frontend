import React from 'react'

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
        <button type={props.type} className={buttonClasses.join(" ")} onClick={props.onClick}> {props.label} </button>
    );
}

export default Button;