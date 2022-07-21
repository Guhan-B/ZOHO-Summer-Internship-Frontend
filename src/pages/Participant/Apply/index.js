import React from 'react';
import validator from 'validator';
import { useLocation, useNavigate, useParams, Navigate } from "react-router-dom";

import Button from '../../../shared/components/Button';
import InputField from '../../../shared/components/InputField';
import { AuthenticationContext } from '../../../providers/authentication';
import { applyTournament } from "../../../shared/API";

import styles from "./styles.module.scss";

const Apply = () => {
    const { state: routeState } = useLocation();
    const navigate = useNavigate();
    const state = React.useContext(AuthenticationContext)[0];
    const [data, setData] = React.useState({ 
        tournamentId: routeState.id, 
        teamName: "", 
        emails: Array.apply(null, Array(routeState.teamSize)).map((_, idx) => idx === 0 ? state.user.email : ""),
        names: Array.apply(null, Array(routeState.teamSize)).map((_, idx) => idx === 0 ? state.user.name : "")
    });
    const [error, setError] = React.useState({ 
        teamName: false, 
        emails: Array.apply(null, Array(routeState.teamSize)).map(() => false),
        names: Array.apply(null, Array(routeState.teamSize)).map(() => false)
    });
    const [loading, setLoading] = React.useState(false);

    const onSuccess = (message) => {
        setLoading(false);
        navigate("/dashboard/participant");
        alert(message);
    }

    const onError = (message, returnedError) => {
        setLoading(false);
        const resetError = {
            teamName: false, 
            emails: Array.apply(null, Array(routeState.teamSize)).map(() => false),
            names: Array.apply(null, Array(routeState.teamSize)).map(() => false),
        }
        if(returnedError) setError({...resetError, ...returnedError});
        alert(message);
    }  

    const onTeamNameChange = teamName => setData({...data, teamName });

    const onEmailChange = (value, idx) => {
        const emails = [...data.emails];
        emails[idx] = value;
        setData({...data, emails })
    }

    const onNameChange = (value, idx) => {
        const names = [...data.names];
        names[idx] = value;
        setData({...data, names })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const errorCopy = { 
            teamName: false, 
            emails: Array.apply(null, Array(routeState.teamSize)).map(() => false),
            names: Array.apply(null, Array(routeState.teamSize)).map(() => false),
        };

        if(data.teamName === "") errorCopy.teamName = true;

        for(let i = 0; i < routeState.teamSize; i++) {
            if(data.emails[i] === "" || validator.isEmail(data.emails[i]) === false)
                errorCopy.emails[i] = true;
            if(data.names[i] === "")
                errorCopy.names[i] = true;
        }
        
        setError(errorCopy);

        if(errorCopy.teamName || errorCopy.emails.includes(true)) {
            alert("One or more form field is invalid");
        }
        else {
            setLoading(true);
            applyTournament(data, onSuccess, onError);
        }
    }

    return (
        <div className={styles.wrapper}>
            <header>
                <h4>Register for Tournament Name</h4>
            </header>
            <form onSubmit={onSubmit}>
                <InputField
                    id="Team Name"
                    type="text"
                    label="Team Name"
                    value={data.teamName}
                    error={error.teamName}
                    onChange={onTeamNameChange}
                    required
                />
                {
                    [...Array(routeState.teamSize).keys()].map(idx => {
                        return (
                            <div key={idx} className={styles.form_group}>
                                <label>{idx === 0? "Team Leader Details" : `Member ${idx} Details`}</label>
                                <InputField 
                                    id={idx}
                                    type="text" 
                                    label="Name"
                                    onChange={value => onNameChange(value, idx)}
                                    value={data.names[idx]}
                                    error={error.names[idx]}
                                    disabled={idx === 0? true : false}
                                    required
                                />
                                <InputField 
                                    id={idx}
                                    type="text" 
                                    label="Email"
                                    onChange={value => onEmailChange(value, idx)}
                                    value={data.emails[idx]}
                                    error={error.emails[idx]}
                                    disabled={idx === 0? true : false}
                                    required
                                />
                            </div>
                        );
                    })
                }
                <Button variant="primary" label="Apply Tournamnet" type="submit" loading={loading}/>
            </form>
        </div>
    );
}

export default Apply;