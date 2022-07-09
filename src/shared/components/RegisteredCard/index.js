import React from 'react';
import { MdPermIdentity, MdOutlineEventNote } from "react-icons/md"

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
                            <MdPermIdentity className={styles.icon}/>
                            <p>5</p>
                        </span>
                        <span>
                            <MdOutlineEventNote className={styles.icon}/>
                            <p>11.06.2001, 5 PM</p>
                        </span>
                    </span>
                </div>
                <p className={styles.sport_description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra tristique dolor at venenatis. Nunc sem augue, rutrum blandit faucibus ac, dapibus vitae sapien.
                </p>
            </div>
            <div className={statusClasses.join(" ")}>
                <p>UPCOMING</p>
            </div>
        </div>
    );
}

export default AvailableCard;