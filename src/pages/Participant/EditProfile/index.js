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

    const [data, setData] = React.useState({
        name: "Guhan.B", 
        mobileNumber: "8925649372", 
        bloodGroup: {label: "B+", value: "B+"}, 
        email: "bkguhan2001@gmail.com", 
    });

    const [error, setError] = React.useState({
        name: false, 
        mobileNumber: false, 
        bloodGroup: false, 
        password: false
    });

    const nameChange = (value) => {
        setData({...data, name: value});
    }

    const mobileNumberChange = (value) => {
        setData({...data, mobileNumber: value});
    }

    const bloodGroupChange = (value) => {
        setData({...data, bloodGroup: value});
    }
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    }

    return (
        <div className={styles.wrapper}>
            <header>
                <h4>Edit Profile Details</h4>
            </header>
            <form onSubmit={onSubmit}>
                <InputField 
                    type="text" 
                    label="Full Name" 
                    id="full-name"
                    onChange={nameChange}
                    error={error.name}
                    value={data.name} 
                    required
                />
                <InputField 
                    type="text" 
                    label="Mobile Number" 
                    id="mobile-number"
                    onChange={mobileNumberChange}
                    error={error.mobileNumber}
                    value={data.mobileNumber} 
                    required
                />
                <InputField 
                    type="select" 
                    options={bloodGroups} 
                    label="Blood Group" 
                    id="blood-group"
                    onChange={bloodGroupChange}
                    error={error.bloodGroup}
                    value={data.bloodGroup} 
                    required
                />
                <InputField 
                    type="text" 
                    label="Email" 
                    id="email"
                    value={data.email} 
                    required 
                    disabled
                />
                <div className={styles.form_controls}>
                    <Button label="Save" variant="primary"/>
                </div>
            </form>
        </div>
    )
}

export default EditProfile;