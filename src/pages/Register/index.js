import React from 'react';
import { Link } from "react-router-dom";
import { MdOutlineMail, MdOutlineLock, MdOutlinePermIdentity, MdOutlinePhone, MdOutlineBloodtype } from "react-icons/md";

import InputField from '../../shared/components/InputField';
import Button from '../../shared/components/Button';

import styles from "./styles.module.scss";
import SIDE_IMAGE from "../../assets/image 1.jpg";

const Register = (props) => {
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
        name: "", 
        mobileNumber: "", 
        bloodGroup: {label: "", value: ""}, 
        email: "", 
        password: ""
    });

    const [error, setError] = React.useState({
        name: false, 
        mobileNumber: false, 
        bloodGroup: false, 
        email: false, 
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

    const emailChange = (value) => {
        setData({...data, email: value});
    }

    const passwordChange = (value) => {
        setData({...data, password: value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <header>
                    <h1>Create Account & Get Started</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id elit nibh. In vel ipsum a diam vehicula</p>
                </header>
                <form onSubmit={onSubmit}>
                    <InputField 
                        type="text" 
                        placeholder="Full Name" 
                        id="name" 
                        icon={MdOutlinePermIdentity}
                        onChange={nameChange}
                        error={error.name}
                        value={data.name}
                    />
                    <InputField 
                        type="text" 
                        placeholder="Mobile Number" 
                        id="mobile-number" 
                        icon={MdOutlinePhone}
                        onChange={mobileNumberChange}
                        error={error.mobileNumber}
                        value={data.mobileNumber}
                    />
                    <InputField 
                        type="select" 
                        placeholder="Blood Group"
                        id="blood-group" 
                        icon={MdOutlineBloodtype}
                        options={bloodGroups}  
                        onChange={bloodGroupChange}
                        error={error.bloodGroup}
                        value={data.bloodGroup}
                    />
                    <InputField 
                        type="text" 
                        placeholder="Email" 
                        id="email" 
                        icon={MdOutlineMail}
                        onChange={emailChange}
                        error={error.email}
                        value={data.email}
                    />
                    <InputField 
                        type="password" 
                        placeholder="Password" 
                        id="password" 
                        icon={MdOutlineLock}
                        onChange={passwordChange}
                        error={error.password}
                        value={data.password}
                    />
                    <Button variant="primary" label="Register"/>
                </form>
                <footer>
                    <p>Already have an account? <Link to={"/authentication/login"}>Login Here</Link></p>
                </footer>
            </div>
            <div className={styles.right}>
                <img src={SIDE_IMAGE} alt="side-banner"/>
            </div>
        </div>
    );
}

export default Register;