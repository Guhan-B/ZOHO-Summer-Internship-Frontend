import React from 'react';
import SpinLoader from "react-spinners/MoonLoader";
import Button from '../../../shared/components/Button';
import Modal from "../../../shared/components/Modal";
import Fallback from '../../../shared/components/Fallback';
import InputField from '../../../shared/components/InputField';
import { MdOutlinePermIdentity, MdOutlineEventNote, MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import { cancelTournament, fetchTournament, updateResult } from "../../../shared/API";
import { ErrorContext } from '../../../providers/error';
import styles from "./styles.module.scss";
import ALERT from "../../../assets/alert.svg";

// array index and value attribute should be same
const RESULTS = [
    { label: "CANCELLED",        value: 0,  class: styles.red   },
    { label: "PENDING",          value: 1,  class: styles.blue  },
    { label: "NOT PARTICIPATED", value: 2,  class: styles.gray  },
    { label: "DISQUALIFIED",     value: 3,  class: styles.red   },
    { label: "LOST",             value: 4,  class: styles.red   },
    { label: "1ST PLACE",        value: 5,  class: styles.green },
    { label: "2ND PLACE",        value: 6,  class: styles.green },
    { label: "3RD PLACE",        value: 7,  class: styles.green },
    { label: "SHARED 1ST PLACE", value: 8,  class: styles.green },
    { label: "SHARED 2ST PLACE", value: 9,  class: styles.green },
    { label: "SHARED 3ST PLACE", value: 10, class: styles.green },
];

const Details = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [errors, insertError] = React.useContext(ErrorContext);
    const [tournament, setTournament] = React.useState({});
    const [showModal, setShowModal] = React.useState(false);
    const config = {
        day: "2-digit", 
        month: "2-digit", 
        year: "numeric", 
        hour: "2-digit", 
        minute: "2-digit",
    }

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
        const onCancelSuccess = (message) => {
            navigate("/dashboard/administrator");
            insertError(message, "success");
        }
        const onCancelError = (message) => {
            insertError(message, "error");
        }
        cancelTournament(params.id, onCancelSuccess, onCancelError);
        setShowModal(false);
    }

    React.useEffect(() => { 
        setLoading(true);
        fetchTournament(params.id, onSuccess, onError);
    }, []);

    const eventDate = new Date(tournament?.event_date);

    if(loading === false && error === true) {
        return (
            <Fallback 
                message="An error occured unable to load tournaments. Try again later"
                label="Try Again"
                onClick={() => window.location.reload()}
            />
        );
    }  

    return (
        loading ? 
        <div className="page-loader">
            <SpinLoader size={50} color="#3498db"/> 
        </div> :
        <div className={styles.wrapper}>
            {  
                showModal &&
                <Modal
                    positive={true}
                    negative={true}
                    positiveLabel="Continue"
                    negativeLabel="Cancel"
                    onPositiveAction={onContinue}
                    onNegativeAction={() => setShowModal(false)}
                >
                    <div className={styles.modal_contents}>
                        <img src={ALERT}/>
                        <div>
                            <h3>Do you want to proceed?</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec commodo est</p>
                        </div>
                    </div>
                </Modal>
            }
            <header>
                <h1>{ tournament.name }</h1>
                {
                    tournament.cancelled === 0 && new Date() < new Date(tournament.event_date) &&
                    <div className={styles.actions}>
                        <Button label="Edit Details" size="small" variant="primary" onClick={onEdit}/>
                        <Button label="Cancel Tournament" size="small" variant="danger" onClick={() => setShowModal(true)}/>
                    </div>
                }   
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
                <Fallback message="No participants have registered to this tournmanet"/>:
                <div className={styles.participants}>
                    <label>Participants</label>
                    <table>
                        <thead>
                            <tr>
                                <th>Team Name</th>
                                <th>Leader Name</th>
                                <th>Leader Email</th>
                                <th>Leader Mobile</th>
                                { 
                                    new Date() >= new Date(tournament.event_date) && 
                                    <th>Result</th> 
                                }
                            </tr>
                        </thead>
                        <tbody>
                            { tournament.team.map(team => <Row key={team.id} team={team} tournament={tournament}/>) }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}

const Row = ({ team, tournament }) => {
    // - 1 because 1st item cancelled is removed
    const [result, setResult] = React.useState(RESULTS[team.result]);
    const [loading, setLoading] = React.useState(false);
    const [errors, insertError] = React.useContext(ErrorContext);
    const allow = new Date() >= new Date(tournament.event_date);

    const onSuccess = (message, data) => {
        setLoading(false);
        setResult(RESULTS[data]);
    }

    const onError = (message) => {
        setLoading(false);
        insertError(message, "error");
    }

    const onChange = async (value) => {
        setLoading(true);
        updateResult({result: value.value === 0 ? 1 : value.value, teamId: team.id, tournamentId: tournament.id}, onSuccess, onError);
    }

    return (
        <tr key={team.id} >
            <td>{ team.name }</td>
            <td>{ team.user.name }</td>
            <td>{ team.user.email }</td>
            <td>{ team.user.mobile_number }</td>
            { 
                allow && 
                <td className={styles.row + " " + result.class}>
                    <InputField 
                        type="select"
                        options={RESULTS}
                        value={result}
                        disabled={loading}
                        onChange={onChange}
                        icon={MdKeyboardArrowDown}
                    />
                </td> 
            }
        </tr>
    );
}

export default Details;