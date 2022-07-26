import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineEventNote, MdStars } from "react-icons/md"

import Modal from '../Modal';
import { withdraw } from "../../API";

import styles from "./styles.module.scss";

const config = {
    day: "2-digit", 
    month: "2-digit", 
    year: "numeric", 
    hour: "2-digit", 
    minute: "2-digit",
}

const RESULTS = [
    { label: "PENDING", value: 0, class: styles.pending },
    { label: "NOT PARTICIPATED", value: 1, class: styles.not_participated  },
    { label: "DISQUALIFIED", value: 2, class: styles.disqualified  },
    { label: "LOST", value: 3, class: styles.lost },
    { label: "1ST PLACE", value: 4, class: styles.winner },
    { label: "2ND PLACE", value: 5, class: styles.winner },
    { label: "3RD PLACE", value: 6, class: styles.winner },
    { label: "CANCELLED", value: 7, class: styles.cancelled },
];

const RegisteredCard = (props) => {
    const [show, setShow] = React.useState(false);
    const navigate = useNavigate()
    const eventDate = new Date(props.data.event_date);
    const resultClasses = [styles.sport_result, RESULTS[props.data.team.result].class];

    const onClose = () => setShow(false);
    const onWithdraw = () => withdraw({tournamentId: props.data.id}, onSuccess, onError);
    const onSuccess = (message) => {
        setShow(false);
        navigate("/dashboard/participant");
        alert(message);
    }
    const onError = (message) => alert(message)

    return (
        <React.Fragment>
            {
                show &&
                <Modal
                    positive={props.user.id === props.data.team.leader_id && new Date(props.data.deadline_date) >= new Date()}
                    negative={true}
                    positiveLabel="Withdraw"
                    negativeLabel="Close"
                    onPositiveAction={onWithdraw}
                    onNegativeAction={onClose}
                >
                    <div className={styles.modal_contents}>
                        <section>
                            <label>Team Name</label>
                            <p>{props.data.team.name}</p>
                        </section>
                        <section>
                            <label>Team Members</label>
                            <ul>
                                {
                                    props.data.team.member.map(
                                        member =>
                                        <li key={member.id}>
                                            <p>{ member.name }</p>
                                            <span>{ member.email }</span>
                                            { member.id === props.data.team.leader_id && <MdStars style={{marginTop: "2px"}} size={18} color="#f1c40f"/> }
                                        </li> 
                                    )
                                }
                            </ul>
                        </section>
                    </div>
                </Modal>
            }
            <div className={styles.wrapper} onClick={() => setShow(true)}>
                <div className={styles.sport_details}>
                    <h3>{ props.data.name }</h3>
                    <div>
                        <span className={styles.sport_name}>{ props.data.sport }</span>
                        <span className={styles.sport_info}>
                            <span>
                                <MdOutlineEventNote className={styles.icon}/>
                                <p>{ eventDate.toLocaleString("en-US", config) }</p>
                            </span>
                        </span>
                    </div>
                    <p className={styles.description}>{ props.data.description }</p>
                </div>
                <div className={resultClasses.join(" ")}>
                    <p>{ RESULTS[props.data.team.result].label }</p>
                </div>
            </div>
        </React.Fragment>
    );
}

export default RegisteredCard;