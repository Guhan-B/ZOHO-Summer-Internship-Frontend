import React from 'react';
import validator from 'validator';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { MdOutlineMail, MdOutlineLock, MdOutlinePermIdentity, MdOutlinePhone, MdOutlineBloodtype } from "react-icons/md";

import InputField from '../../shared/components/InputField';
import Button from '../../shared/components/Button';
import { AuthenticationContext } from "../../providers/authentication";
import { register } from "../../shared/API";

import styles from "./styles.module.scss";
import SIDE_IMAGE from "../../assets/image 1.jpg";

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

const Register = (props) => {
    const navigate = useNavigate();

    const [state, setState] = React.useContext(AuthenticationContext);
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
    const [loading ,setLoading] = React.useState(false);

    const FormFields = [
        {
            type: "text",
            label: "Name",
            placeholder: "Name",
            name: "name",
            icon: MdOutlinePermIdentity,
            props: {}
        },
        {
            type: "text",
            label: "Mobile Number",
            placeholder: "Mobile Number",
            name: "mobileNumber",
            icon: MdOutlinePhone,
            props: {}
        },
        {
            type: "select",
            label: "Blood Group",
            placeholder: "Blood Group",
            name: "bloodGroup",
            icon: MdOutlineBloodtype,
            props: { options: bloodGroups }
        },
        {
            type: "text",
            label: "Email",
            placeholder: "Email",
            name: "email",
            icon: MdOutlineMail,
            props: {}
        },
        {
            type: "password",
            label: "Password",
            placeholder: "Password",
            name: "password",
            icon: MdOutlineLock,
            props: {}
        }
    ];

    const onSuccess = (message) => {
        setLoading(false);
        navigate("/authentication/login");
        alert(message);
    }

    const onError = (message, returnedError) => {
        setLoading(false);
        const resetError = {
            name: false, 
            mobileNumber: false, 
            bloodGroup: false, 
            email: false, 
            password: false
        }
        if(returnedError) setError({...resetError, ...returnedError});
        alert(message);
    }  

    const onChange = (value, name) => {
        const dataCopy = {...data};
        dataCopy[name] = value;
        setData(dataCopy);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const errorCopy = {
            name: false, 
            mobileNumber: false, 
            bloodGroup: false, 
            email: false, 
            password: false
        };

        if(data.name === "") errorCopy.name = true;
        if(data.mobileNumber === "" || validator.isMobilePhone(data.mobileNumber) === false) errorCopy.mobileNumber = true;
        if(data.bloodGroup.value === "") errorCopy.bloodGroup = true;
        if(data.email === "" || validator.isEmail(data.email) === false) errorCopy.email = true;
        if(data.password === "" || data.password.length < 8) errorCopy.password = true;

        setError(errorCopy);

        if(Object.values(errorCopy).includes(true))
            alert("One or more field is invalid.");
        else {
            setLoading(true);
            register(data, onSuccess, onError);
        }
    }

    if(state.status) 
        return <Navigate to="/dashboard" replace/>

    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <header>
                    <h1>Create Account & Get Started</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id elit nibh. In vel ipsum a diam vehicula</p>
                </header>
                <form onSubmit={onSubmit}>
                    {
                        FormFields.map((field, idx) => 
                            <InputField 
                                key={idx}
                                id={field.label}
                                type={field.type}
                                placeholder={field.placeholder}
                                icon={field.icon}
                                value={data[field.name]}
                                error={error[field.name]}
                                onChange={value => onChange(value, field.name)}
                                {...field.props}
                            />
                        )
                    }
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