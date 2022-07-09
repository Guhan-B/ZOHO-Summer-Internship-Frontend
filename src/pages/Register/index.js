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

    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <header>
                    <h1>Create Account & Get Started</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id elit nibh. In vel ipsum a diam vehicula
                    </p>
                </header>
                <form>
                    <InputField 
                        type="text" 
                        placeholder="Full Name" 
                        id="name" 
                        icon={MdOutlinePermIdentity}
                    />
                    <InputField 
                        type="text" 
                        placeholder="Mobile Number" 
                        id="mobile-number" 
                        icon={MdOutlinePhone}
                    />
                    <InputField 
                        type="select" 
                        placeholder="Blood Group"
                        id="blood-group" 
                        icon={MdOutlineBloodtype}
                        options={bloodGroups}  
                    />
                    <InputField 
                        type="text" 
                        placeholder="Email" 
                        id="email" 
                        icon={MdOutlineMail}
                    />
                    <InputField 
                        type="password" 
                        placeholder="Password" 
                        id="password" 
                        icon={MdOutlineLock}
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