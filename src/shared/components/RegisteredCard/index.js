import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineEventNote, MdStars } from "react-icons/md"

import Modal from '../Modal';
import { withdraw } from "../../API";
import { ErrorContext } from '../../../providers/error';

import styles from "./styles.module.scss";

const config = {
    day: "2-digit", 
    month: "2-digit", 
    year: "numeric", 
    hour: "2-digit", 
    minute: "2-digit",
}

// array index and value attribute should be same
const RESULTS = [
    { label: "CANCELLED",        value: 0,  class: styles.red   },
    { label: "PENDING",          value: 1,  class: styles.blue  },
    { label: "1ST PLACE",        value: 2,  class: styles.green },
    { label: "SHARED 1ST PLACE", value: 3,  class: styles.green },
    { label: "2ND PLACE",        value: 4,  class: styles.green },
    { label: "SHARED 2ST PLACE", value: 5,  class: styles.green },
    { label: "3RD PLACE",        value: 6,  class: styles.green },
    { label: "SHARED 3ST PLACE", value: 7,  class: styles.green  },
    { label: "NOT PARTICIPATED", value: 8,  class: styles.gray  },
    { label: "DISQUALIFIED",     value: 9,  class: styles.red   },
    { label: "LOST",             value: 10, class: styles.red  },
];;

const RegisteredCard = (props) => {
    const navigate = useNavigate()
    const [show, setShow] = React.useState(false);
    const [errors, insertError] = React.useContext(ErrorContext);
    const eventDate = new Date(props.data.event_date);
    const resultClasses = [styles.sport_result, RESULTS[props.data.team.result].class];

    const onClose    = () => setShow(false);
    const onWithdraw = () => withdraw({tournamentId: props.data.id}, onSuccess, onError);
    const onError    = (message) => insertError(message, "error");
    const onSuccess  = (message) => {
        setShow(false);
        navigate("/dashboard/participant");
        insertError(message, "success");
    }

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