import React from 'react';
import validator from 'validator';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { MdOutlineMail, MdOutlineLock, MdOutlinePermIdentity, MdOutlinePhone, MdOutlineBloodtype } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import InputField from '../../shared/components/InputField';
import Button from '../../shared/components/Button';
import { register } from "../../store/Authentication/action";

import styles from "./styles.module.scss";
import SIDE_IMAGE from "../../assets/image 1.jpg";

const Register = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const status = useSelector(state => state.authentication.status);
    const user   = useSelector(state => state.authentication.user);
    const loading   = useSelector(state => state.authentication.loading);

    const Handlers = {
        success: () => {
            alert("Registeration successfull. Login to continue.");
            navigate("/authentication/login");
        },
        error: (message) => alert(message),
        name: (value) => setData({...data, name: value}),
        mobileNumber: (value) => setData({...data, mobileNumber: value}),
        bloodGroup: (value) => setData({...data, bloodGroup: value}),
        email: (value) => setData({...data, email: value}),
        password: (value) => setData({...data, password: value}),
    };

    const onSubmit = (e) => {
        e.preventDefault();
        
        if(data.email === "" || data.mobileNumber === "" || data.name === "" || data.password === "" || data.bloodGroup.value === "") 
            return Handlers.error("Credientials cannont be empty");

        if(validator.isMobilePhone(data.mobileNumber) === false) 
            return Handlers.error("Mobile Number is invalid");
            
        if(validator.isEmail(data.email) === false) 
            return Handlers.error("Email is invalid");
        
        if(data.password.length < 8) 
            return Handlers.error("Password should be minumum 8 characters");
        
        dispatch(register(data, Handlers.success, Handlers.error));
    }

    if(status) {
        return <Navigate to="/dashboard" replace/>
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
                        onChange={Handlers.name}
                        value={data.name}
                    />
                    <InputField 
                        type="text" 
                        placeholder="Mobile Number" 
                        id="mobile-number" 
                        icon={MdOutlinePhone}
                        onChange={Handlers.mobileNumber}
                        value={data.mobileNumber}
                    />
                    <InputField 
                        type="select" 
                        placeholder="Blood Group"
                        id="blood-group" 
                        icon={MdOutlineBloodtype}
                        options={bloodGroups}  
                        onChange={Handlers.bloodGroup}
                        value={data.bloodGroup}
                    />
                    <InputField 
                        type="text" 
                        placeholder="Email" 
                        id="email" 
                        icon={MdOutlineMail}
                        onChange={Handlers.email}
                        value={data.email}
                    />
                    <InputField 
                        type="password" 
                        placeholder="Password" 
                        id="password" 
                        icon={MdOutlineLock}
                        onChange={Handlers.password}
                        value={data.password}
                    />
                    <Button variant="primary" label="Register" loading={loading}/>
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