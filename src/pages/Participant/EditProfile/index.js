import React from 'react';
import Button from '../../../shared/components/Button';
import InputField from '../../../shared/components/InputField';

import styles from "./styles.module.scss";

const EditProfile = () => {
    const bloodGroups = [
        {label: "A+", value: "A+"},
        {label: "A-", value: "A-"},
        {label: "B+", value: "B+"},
        {label: "B-", value: "B-"},
        {label: "AB+", value: "AB+"},
        {label: "AB-", value: "AB-"},
        {label: "O+", value: "O+"},
        {label: "O-", value: "O-"},
    ];

    return (
        <div className={styles.wrapper}>
            <header>
                <h4>Edit Profile Details</h4>
            </header>
            <form>
                <InputField type="text" label="Full Name" id="full-name" required/>
                <InputField type="text" label="Mobile Number" id="mobile-number" required/>
                <InputField type="select" options={bloodGroups} label="Blood Group" id="blood-group" required/>
                <InputField type="text" label="Email" id="email" required disabled/>
                <div className={styles.form_controls}>
                    <Button label="Save" variant="primary"/>
                </div>
            </form>
        </div>
    )
}

export default EditProfile;