import React from 'react';
import { MdPermIdentity, MdOutlineEventNote } from "react-icons/md"
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

const AvailableCard = (props) => {
    const navigate = useNavigate();

    const config = {
        day: "2-digit", 
        month: "2-digit", 
        year: "numeric", 
        hour: "2-digit", 
        minute: "2-digit",
        timeZone: "GMT"
    }

    const eventDate = new Date(props.data.event_date);
    const deadlineDate = new Date(props.data.deadline_date);

    return (
        <div className={styles.wrapper} onClick={() => navigate(`${props.data.id}`)}>
            <h3>{ props.data.name }</h3>
            <div>
                <span className={styles.sport_name}>{ props.data.sport }</span>
                <span className={styles.sport_info}>
                    <span>
                        <MdPermIdentity className={styles.icon}/>
                        <p>{ props.data.team_size }</p>
                    </span>
                    <span>
                        <MdOutlineEventNote className={styles.icon}/>
                        <p>{ eventDate.toLocaleString("en-US", config) }</p>
                    </span>
                </span>
            </div>
            <p className={styles.sport_description}>{ props.data.description }</p>
            <p className={styles.sport_deadline}>REGISTER BEFORE { deadlineDate.toLocaleString("en-US", config) }</p>
        </div>
    );
}

export default AvailableCard;