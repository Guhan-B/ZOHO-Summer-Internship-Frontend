import React from 'react';
import { MdOutlineEventNote, MdStars } from "react-icons/md"
import Modal from '../Modal';

import styles from "./styles.module.scss";

const config = {
    day: "2-digit", 
    month: "2-digit", 
    year: "numeric", 
    hour: "2-digit", 
    minute: "2-digit",
}

const RegisteredCard = (props) => {
    const result = [
        { label: "PENDING", class:  styles.pending },
        { label: "NOT PARTICIPATED", class:  styles.not_participated },
        { label: "DISQUALIFIED", class:  styles.disqualified },
        { label: "LOST", class:  styles.lost },
        { label: "WINNER", class:  styles.winner },
        { label: "CANCELLED", class:  styles.disqualified },
    ];
    const resultClasses = [styles.sport_result, result[props.data.team.result].class];
    const eventDate = new Date(props.data.event_date);
    const [show, setShow] = React.useState(false);

    const onClose = () => setShow(false);
    const onWithdraw = () => {}

    if(props.data.cancelled === 1)
        resultClasses[0] = result[5].class;

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
                    <p>{ result[props.data.team.result].label }</p>
                </div>
            </div>
        </React.Fragment>
    );
}

export default RegisteredCard;