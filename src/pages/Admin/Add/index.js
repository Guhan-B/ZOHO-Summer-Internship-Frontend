import React from 'react';
import validator from 'validator';

import InputField from '../../../shared/components/InputField';
import Button from "../../../shared/components/Button";
import { MdDeleteOutline, MdAdd } from "react-icons/md";
import { addAdministrators } from "../../../shared/API";

import styles from "./styles.module.scss";

const Add = () => {
    const [emails, setEmails] = React.useState([""]);
    const [error, setError] = React.useState([{value: false, message: ""}]);
    const [loading, setLoading] = React.useState(false);

    const onChange = (idx, value) => {
        const emailsCopy = [...emails];
        emailsCopy[idx] = value;
        setEmails(emailsCopy);
    }

    const onSuccess = (message) => {
        setLoading(false);
        setEmails([""]);
        setError([{ value: false, message: "" }]);
        alert(message);
    }

    const onError = (message, returnedError) => {
        setLoading(false);
        if(returnedError) 
            setError(returnedError);
        else
            alert(message);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const errorCopy = [...error];

        for(var i = 0; i < emails.length; i++) 
            if(validator.isEmail(emails[i]) === false)
                errorCopy[i] = { value: true,  message: "Email is badly formatted" };
            else
                errorCopy[i] = { value: false, message: "" };

        setError(errorCopy);
        if(errorCopy.map(e => e.value).includes(true)) return;
        setLoading(true);
        addAdministrators({ emails }, onSuccess, onError);
    }

    const onDelete = (idx) => {
        if(emails.length > 1) {
            const emailsCopy = [...emails];
            const errorCopy = [...error];

            emailsCopy.splice(idx, 1);
            errorCopy.splice(idx, 1);

            setEmails(emailsCopy);
            setError(errorCopy);
        }
    }

    const onAdd = () => {
        const emailsCopy = [...emails];
        const errorCopy = [...error];

        emailsCopy.push("");
        errorCopy.push({value: false, message: ""});

        setEmails(emailsCopy);
        setError(errorCopy);
    }

    return (
    <div className={styles.wrapper}>
        <header>
            <h4>Create new administrators</h4>
        </header>
        <main>
            <button className={styles.add} onClick={onAdd}><MdAdd size={30}/></button>
            <form onSubmit={onSubmit}>
                {
                    emails.map((email, idx) => 
                        <div className={styles.email_group} key={idx}>
                            <InputField 
                                id={`email-${idx + 1}`}
                                type="text"
                                label={`New Administrator Email ${idx + 1}`}
                                value={email}
                                error={error[idx].value}
                                errorMessage={error[idx].message}
                                onChange={value => onChange(idx, value)}
                                required
                            />
                            {
                                emails.length > 1 && 
                                <button className={styles.delete} type='button' onClick={() => onDelete(idx)}><MdDeleteOutline size={20}/></button>
                            }
                        </div>
                    )
                }
                <Button label="Create Administrator(s)" type="submit" variant="primary" loading={loading}/>
            </form>
        </main>
    </div>
    );
}

export default Add;