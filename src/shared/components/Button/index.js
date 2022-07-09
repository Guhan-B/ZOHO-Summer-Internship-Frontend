import React from 'react'

import styles from "./styles.module.scss";

const Button = (props) => {
    const variants = {
        "primary" : styles.primary,
        "danger" : styles.danger
    }

    const buttonClasses = [styles.wrapper, variants[props.variant]]

    return (
        <button className={buttonClasses.join(" ")}> {props.label} </button>
    );
}

export default Button;