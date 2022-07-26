import React from 'react';
import { Link, useNavigate, Navigate } from "react-router-dom";
import { MdOutlineLock } from "react-icons/md";

import InputField from '../../shared/components/InputField';
import Button from '../../shared/components/Button';
import { AuthenticationContext } from "../../providers/authentication";
import { reset } from "../../shared/API";

import styles from "./styles.module.scss";
import SIDE_IMAGE from "../../assets/image 1.jpg";

const ResetPassword = () => {
    const navigate = useNavigate();

    const [state, setState] = React.useContext(AuthenticationContext);
    const [data, setData] = React.useState({password: ""});
    const [error, setError] = React.useState({password: {value: false, message: ""}});
    const [loading ,setLoading] = React.useState(false);

    const FormFields = [
        {
            type: "password",
            label: "Password",
            placeholder: "New Password",
            name: "password",
            icon: MdOutlineLock,
            props: {}
        }
    ];

    const onSuccess = async (message) => {
        setLoading(false);
        setState({ user: null, status: false });
        navigate("/");
    }

    const onError = (message, returnedError) => {
        setLoading(false);
        const resetError = {password: {value: false, message: ""}};
        if(returnedError) 
            setError({...resetError, ...returnedError});
        else
            alert(message);
    }  

    const onChange = (value, name) => {
        const dataCopy = {...data};
        dataCopy[name] = value;
        setData(dataCopy);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const errorCopy = {password: {value: false, message: ""}} ;

        if(data.password === "" || data.password.length < 8) 
            errorCopy.password = {value: true, message: "Password should be minimum 8 characters"};

        setError(errorCopy);
        if(errorCopy.password.value) return;
        setLoading(true);
        reset(data, onSuccess, onError);
    }

    if(state.status === false) 
        return <Navigate to="/authentication" replace/>

    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <header>
                    <h1>Reset Password</h1>
                    <p>
                        Choose a string password. After changing password you will be logged out
                    </p>
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
                                error={error[field.name].value}
                                errorMessage={error[field.name].message}
                                onChange={value => onChange(value, field.name)}
                                {...field.props}
                            />
                        )
                    }
                    <Button label="Continue" variant="primary" type="submit" loading={loading}/>
                </form>
                <footer>
                    <p>Cancel and go back to <Link to={"/dashboard"}>Dashboard</Link></p>
                </footer>
            </div>
            <div className={styles.right}>
                <img src={SIDE_IMAGE} alt="side-banner"/>
            </div>
        </div>
    );
}

export default ResetPassword;