import React from 'react';
import { MdPermIdentity, MdOutlineEventNote } from "react-icons/md"
import Button from '../Button';

import styles from "./styles.module.scss";

const AvailableCard = () => {
    const statusClasses = [styles.sport_status, styles.upcoming];

    return (
        <div className={styles.wrapper}>
            <div className={styles.sport_details}>
                <h3>Tournament Name</h3>
                <div>
                    <span className={styles.sport_name}>Sport</span>
                    <span className={styles.sport_info}>
                        <span>
                            <MdOutlineEventNote className={styles.icon}/>
                            <p>11.06.2001, 5 PM</p>
                        </span>
                    </span>
                </div>
            </div>
            <p>Team details will be shown here</p>
            <div className={statusClasses.join(" ")}>
                <p>UPCOMING</p>
            </div>
        </div>
    );
}

export default AvailableCard;