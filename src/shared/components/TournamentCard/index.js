import React from 'react';
import { MdPermIdentity, MdOutlineEventNote } from "react-icons/md"
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

const AvailableCard = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.wrapper} onClick={() => navigate("87wg")}>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras convallis nisi sit amet justo lacinia, a sollicitudin diam accumsan. Etiam imperdiet vestibulum sem sit amet cursus. Praesent in venenatis ex, sit amet venenatis mi. Vestibulum pellentesque ligula vitae lacus porta maximus. Nulla in tortor ante. Curabitur dictum gravida tellus, vitae porttitor ligula vulputate nec. Vestibulum magna arcu, sagittis non enim non, bibendum pellentesque ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam sagittis eros magna, at consequat nibh suscipit vel.
            </p>
            <p className={styles.sport_deadline}>REGISTER BEFORE 11.06.2001, 5 PM</p>
        </div>
    );
}

export default AvailableCard;