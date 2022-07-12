import React from 'react';
import { MdOutlinePermIdentity, MdOutlineEventNote } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/Button';
import Modal from "../../../shared/components/Modal";

import styles from "./styles.module.scss";

const Details = () => {
    const navigate = useNavigate();

    const [showModal, setShowModal] = React.useState(false);

    const editHandler = () => {
        navigate("edit");
    }

    const cancelHandler = () => {
        setShowModal(true);
    }

    const positiveHandler = () => {
        setShowModal(false)
    }

    const negativeHandler = () => {
        setShowModal(false)
    }

    return (
        <div className={styles.wrapper}>
            {  
                showModal &&
                <Modal
                    title="Do you want to proceed?"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec commodo est."
                    positiveLabel="Continue"
                    negativeLabel="Cancel"
                    positiveOnClick={positiveHandler}
                    negativeOnClick={negativeHandler}
                />
            }
            <header>
                <h1>Tournament Name</h1>
                <div className={styles.actions}>
                    <Button label="Edit Details" size="small" variant="primary" onClick={editHandler}/>
                    <Button label="Cancel Tournament" size="small" variant="danger" onClick={cancelHandler}/>
                </div>
            </header>
            <div className={styles.info}>
                <span className={styles.sport}>SPORT</span>
                <span className={styles.size_date}>
                    <span>
                        <MdOutlinePermIdentity className={styles.icon}/>
                        <p>5</p>
                    </span>
                    <span>
                        <MdOutlineEventNote className={styles.icon}/>
                        <p>11.06.2001, 5 PM</p>
                    </span>
                </span>
            </div>
            <div className={styles.description}>
                <label>Description</label>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras convallis nisi sit amet justo lacinia, a sollicitudin diam accumsan. Etiam imperdiet vestibulum sem sit amet cursus. Praesent in venenatis ex, sit amet venenatis mi. Vestibulum pellentesque ligula vitae lacus porta maximus. Nulla in tortor ante. Curabitur dictum gravida tellus, vitae porttitor ligula vulputate nec. Vestibulum magna arcu, sagittis non enim non, bibendum pellentesque ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam sagittis eros magna, at consequat nibh suscipit vel.
                </p>
            </div>
            <div className={styles.participants}>
                <label>Participants</label>
                <table>
                    <thead>
                        <tr>
                            <th>Team Name</th>
                            <th>Leader Name</th>
                            <th>Leader Email</th>
                            <th>Leader Mobile</th>
                            <th>Members Email</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Cape Crusaders</td>
                            <td>Guhan</td>
                            <td>email.two@gmail.com</td>
                            <td>8925649372</td>
                            <td>
                                <ul>
                                    <li>email.one@gmail.com</li>
                                    <li>email.two@gmail.com</li>
                                    <li>email.three@gmail.com</li>
                                    <li>email.four@gmail.com</li>
                                    <li>email.five@gmail.com</li>
                                </ul>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Cape Crusaders</td>
                            <td>Guhan</td>
                            <td>email.two@gmail.com</td>
                            <td>8925649372</td>
                            <td>
                                <ul>
                                    <li>email.one@gmail.com</li>
                                    <li>email.two@gmail.com</li>
                                    <li>email.three@gmail.com</li>
                                    <li>email.four@gmail.com</li>
                                    <li>email.five@gmail.com</li>
                                </ul>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Cape Crusaders</td>
                            <td>Guhan</td>
                            <td>email.two@gmail.com</td>
                            <td>8925649372</td>
                            <td>
                                <ul>
                                    <li>email.one@gmail.com</li>
                                    <li>email.two@gmail.com</li>
                                    <li>email.three@gmail.com</li>
                                    <li>email.four@gmail.com</li>
                                    <li>email.five@gmail.com</li>
                                </ul>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Cape Crusaders</td>
                            <td>Guhan</td>
                            <td>email.two@gmail.com</td>
                            <td>8925649372</td>
                            <td>
                                <ul>
                                    <li>email.one@gmail.com</li>
                                    <li>email.two@gmail.com</li>
                                    <li>email.three@gmail.com</li>
                                    <li>email.four@gmail.com</li>
                                    <li>email.five@gmail.com</li>
                                </ul>
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Details;