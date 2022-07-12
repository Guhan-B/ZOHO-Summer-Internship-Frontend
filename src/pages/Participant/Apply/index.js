import React from 'react';
import { useParams } from "react-router-dom";
import Button from '../../../shared/components/Button';
import InputField from '../../../shared/components/InputField';

import styles from "./styles.module.scss";

const Apply = () => {
    const params = useParams();

    const [data, setData] = React.useState({
        teamName: "",
        emails: Array.apply(null, Array(3)).map(() => ""),
    });

    const [error, setError] = React.useState({
        teamName: false,
        emails: Array.apply(null, Array(3)).map(() => false)
    });

    const teamNameChange = (value) => {
        setData({...data, teamName: value});
    }

    const emailChange = (value, idx) => {
        const emailsCopy = [...data.emails];
        emailsCopy[idx] = value;
        setData({...data, emails: emailsCopy});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    }

    return (
        <div className={styles.wrapper}>
            <header>
                <h4>Register for Tournament Name</h4>
            </header>
            <form onSubmit={onSubmit}>
                <InputField
                    type="text"
                    label="Team Name"
                    value={data.teamName}
                    error={error.teamName}
                    onChange={teamNameChange}
                    required
                />
                {
                    data.emails.map((_, idx) => {
                        return (
                            <InputField 
                                key={idx}
                                type="text" 
                                label={idx === 0? "Team Leader Email" : `Member ${idx} Email`}
                                onChange={(value) => emailChange(value, idx)}
                                value={data.emails[idx]}
                                error={error.emails[idx]}
                                required
                            />
                        );
                    })
                }
                <div className={styles.form_controls}>
                    <Button variant="primary" label="Submit" type="submit"/>
                </div>
            </form>
        </div>
    );
}

export default Apply;