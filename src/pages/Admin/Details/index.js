import React from 'react';
import Loader from "react-spinners/MoonLoader";
import { MdOutlinePermIdentity, MdOutlineEventNote } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import { cancelTournament, fetchTournament } from "../../../shared/API";

import Button from '../../../shared/components/Button';
import Modal from "../../../shared/components/Modal";

import styles from "./styles.module.scss";
import Fallback from '../../../shared/components/Fallback';

const Details = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [tournament, setTournament] = React.useState(null);
    const [showModal, setShowModal] = React.useState(false);

    const onSuccess = (message, data) => {
        setLoading(false);
        setTournament(data);
    }

    const onError = (message) => {
        setLoading(false);
        setError(true);
    }

    const onEdit = () => {
        const data = { 
            id: tournament.id,
            name: tournament.name,
            sport: tournament.sport,
            description: tournament.description,
            teamSize: tournament.team_size,
            eventDate: tournament.event_date,
            deadlineDate: tournament.deadline_date,
        };

        navigate("edit", { state: data });
    }

    const onContinue = () => {
        cancelTournament(
            params.id, 
            (message, data) => {
                navigate("/dashboard/administrator");
                alert(message);
            },
            (message) => {
                alert(message);
            }
        );

        setShowModal(false);
    }

    React.useEffect(() => { 
        setLoading(true);
        fetchTournament(params.id, onSuccess, onError);
    }, []);


    const config = {
        day: "2-digit", 
        month: "2-digit", 
        year: "numeric", 
        hour: "2-digit", 
        minute: "2-digit",
    }

    var eventDate;

    if(tournament) eventDate = new Date(tournament.event_date);

    return (
        loading ? 
        <div className="page-loader">
            <Loader size={50} color="#3498db"/> 
        </div> :
        <div className={styles.wrapper}>
            {  
                showModal &&
                <Modal
                    title="Do you want to proceed?"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec commodo est."
                    positiveLabel="Continue"
                    negativeLabel="Cancel"
                    positiveOnClick={onContinue}
                    negativeOnClick={() => setShowModal(false)}
                />
            }
            <header>
                <h1>{ tournament.name }</h1>
                <div className={styles.actions}>
                    <Button label="Edit Details" size="small" variant="primary" onClick={onEdit}/>
                    <Button label="Cancel Tournament" size="small" variant="danger" onClick={() => setShowModal(true)}/>
                </div>
            </header>
            <div className={styles.info}>
                <span className={styles.sport}>{ tournament.sport }</span>
                <span className={styles.size_date}>
                    <span>
                        <MdOutlinePermIdentity className={styles.icon}/>
                        <p>{ tournament.team_size }</p>
                    </span>
                    <span>
                        <MdOutlineEventNote className={styles.icon}/>
                        <p>{ eventDate.toLocaleString("en-US", config) }</p>
                    </span>
                </span>
            </div>
            <div className={styles.description}>
                <label>Description</label>
                <p>{ tournament.description }</p>
            </div>
            {
                tournament.team.length === 0 ? 
                <Fallback/>:
                <div className={styles.participants}>
                    <label>Participants</label>
                    <table>
                        <thead>
                            <tr>
                                <th>Team Name</th>
                                <th>Leader Name</th>
                                <th>Leader Email</th>
                                <th>Leader Mobile</th>
                                <th>Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tournament.team.map(
                                    team => 
                                    <tr key={team.id} >
                                        <td>{ team.name }</td>
                                        <td>{ team.user.name }</td>
                                        <td>{ team.user.email }</td>
                                        <td>{ team.user.mobile_number }</td>
                                        <td></td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            }
            
        </div>
    );
}

export default Details;