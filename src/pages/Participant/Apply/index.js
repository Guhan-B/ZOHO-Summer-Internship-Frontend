import React from 'react';
import Button from '../../../shared/components/Button';
import validator from 'validator';
import InputField from '../../../shared/components/InputField';
import { ErrorContext } from '../../../providers/error';
import { applyTournament } from "../../../shared/API";
import { AuthenticationContext } from '../../../providers/authentication';
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

const Apply = () => {
    const routeState = useLocation().state;
    const navigate = useNavigate();
    const contextState = React.useContext(AuthenticationContext)[0];
    const [errors, insertError] = React.useContext(ErrorContext);
    const [data, setData] = React.useState({ 
        tournamentId: routeState.id, 
        teamName: "", 
        emails: Array.apply(null, Array(routeState.teamSize)).map((_, idx) => idx === 0 ? contextState.user.email : ""),
        names: Array.apply(null, Array(routeState.teamSize)).map((_, idx) => idx === 0 ? contextState.user.name : ""),
    });
    const [error, setError] = React.useState({ 
        teamName: { value: false, message: "" }, 
        emails: Array.apply(null, Array(routeState.teamSize)).map(() => { return { value: false, message: "" } }),
        names: Array.apply(null, Array(routeState.teamSize)).map(() => { return { value: false, message: "" } })
    });
    const [loading, setLoading] = React.useState(false);

    const onSuccess = (message) => {
        setLoading(false);
        navigate("/dashboard/participant");
        insertError(message, "success");
    }

    const onError = (message, returnedError) => {
        setLoading(false);
        const resetError = { 
            teamName: { value: false, message: "" }, 
            emails: Array.apply(null, Array(routeState.teamSize)).map(() => { return { value: false, message: "" } }),
            names: Array.apply(null, Array(routeState.teamSize)).map(() => { return { value: false, message: "" } }),
        };
        if(returnedError) 
            setError({...resetError, ...returnedError});
        else
            insertError(message, "error");
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
            teamName: { value: false, message: "" }, 
            emails: Array.apply(null, Array(routeState.teamSize)).map(() => { return { value: false, message: "" } }),
            names: Array.apply(null, Array(routeState.teamSize)).map(() => { return { value: false, message: "" } }),
        };
        if(data.teamName === "") 
            errorCopy.teamName = { value: true, message: "Team Name cannot be empty" };
        for(var i = 0; i < routeState.teamSize; i++) {
            if(validator.isEmail(data.emails[i]) === false) 
                errorCopy.emails[i] = { value: true, message: "Email cannot be empty" };
            if(data.names[i] === "") 
                errorCopy.names[i] = { value: true, message: "Name cannot be empty" };
        }
        setError(errorCopy);
        if(errorCopy.teamName.value || errorCopy.emails.map(e => e.value).includes(true) || errorCopy.names.map(e => e.value).includes(true))
            return;
        setLoading(true);
        applyTournament(data, onSuccess, onError);
    }

    return (
        <div className={styles.wrapper}>
            <header>
                <h4>Register for Tournament Name</h4>
            </header>
            <form autoComplete='off' onSubmit={onSubmit}>
                <InputField
                    id="Team Name"
                    type="text"
                    label="Team Name"
                    value={data.teamName}
                    error={error.teamName.value}
                    errorMessage={error.teamName.message}
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
                                    error={error.names[idx].value}
                                    errorMessage={error.names[idx].message}
                                    disabled={idx === 0? true : false}
                                    required
                                />
                                <InputField 
                                    id={idx}
                                    type="text" 
                                    label="Email"
                                    onChange={value => onEmailChange(value, idx)}
                                    value={data.emails[idx]}
                                    error={error.emails[idx].value}
                                    errorMessage={error.emails[idx].message}
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