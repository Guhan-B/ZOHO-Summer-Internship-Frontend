import React from 'react';
import { useParams } from "react-router-dom";
import Button from '../../../shared/components/Button';
import InputField from '../../../shared/components/InputField';

import styles from "./styles.module.scss";

const Apply = () => {
    const params = useParams();

    return (
        <div className={styles.wrapper}>
            <header>
                <h4>Register for Tournament Name</h4>
            </header>
            <form>
                <div className={styles.form_group}>
                    <h3>Team Leader Details</h3>
                    <InputField type="text" label="Name" required/>
                    <InputField type="text" label="Email" required/>
                    <InputField type="text" label="Mobile Number" required/>
                </div>
                <div className={styles.form_group}>
                    <h3>Team Members</h3>
                    <InputField type="text" label="Member 1 Email" required/>
                    <InputField type="text" label="Member 2 Email" required/>
                    <InputField type="text" label="Member 3 Email" required/>
                    <InputField type="text" label="Member 4 Email" required/>
                </div>
                <div className={styles.form_controls}>
                    <Button variant="primary" label="Submit"/>
                </div>
            </form>
        </div>
    );
}

export default Apply;