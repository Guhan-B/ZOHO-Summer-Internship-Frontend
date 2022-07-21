import React from 'react';
import { MdPermIdentity, MdOutlineEventNote, MdCancel, MdVerified } from "react-icons/md"
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

const config = {
    day: "2-digit", 
    month: "2-digit", 
    year: "numeric", 
    hour: "2-digit", 
    minute: "2-digit",
}

const AvailableCard = (props) => {
    const navigate = useNavigate();
    const eventDate = new Date(props.data.event_date);
    const deadlineDate = new Date(props.data.deadline_date);
    const state = {id: props.data.id, teamSize: props.data.team_size};
    const classes = [styles.sport_deadline, new Date() > deadlineDate ? styles.red : ""];

    return (
        <div className={styles.wrapper} onClick={() => navigate(`${props.data.id}`, { state })}>
            <header className={styles.header}>
                <h3>{ props.data.name }</h3>
                { props.data.type === 1 && <MdVerified className={styles.icon} color="#2ecc71"/> }
                { props.data.type === 2 && <MdCancel className={styles.icon} color="#e74c3c"/> }
            </header>
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
            <p className={classes.join(" ")}>REGISTER BEFORE { deadlineDate.toLocaleString("en-US", config) }</p>
        </div>
    );
}

export default AvailableCard;