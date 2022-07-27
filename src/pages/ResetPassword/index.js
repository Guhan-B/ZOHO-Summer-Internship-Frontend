import React from 'react';
import InputField from '../../shared/components/InputField';
import Button from '../../shared/components/Button';
import { reset } from "../../shared/API";
import { ErrorContext } from '../../providers/error';
import { MdOutlineLock } from "react-icons/md";
import { AuthenticationContext } from "../../providers/authentication";
import { Link, useNavigate, Navigate } from "react-router-dom";
import styles from "./styles.module.scss";
import SIDE_IMAGE from "../../assets/image 1.jpg";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [errors, insertError] = React.useContext(ErrorContext);
    const [state, setState] = React.useContext(AuthenticationContext);
    const [data, setData] = React.useState({password: ""});
    const [error, setError] = React.useState({password: {value: false, message: ""}});
    const [loading ,setLoading] = React.useState(false);
    const FormFields = [
        {
            id: "password",
            name: "password",
            type: "password",
            placeholder: "New Password",
            icon: MdOutlineLock,
        }
    ];

    const onSuccess = async (message) => {
        setLoading(false);
        setState({ user: null, status: false });
        navigate("/");
        insertError(message, "success");
    }

    const onError = (message, returnedError) => {
        setLoading(false);
        const resetError = {password: {value: false, message: ""}};
        if(returnedError) 
            setError({...resetError, ...returnedError});
        else
            insertError(message, "error");
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
                    <p>Choose a strong password. After changing password you will be logged out</p>
                </header>
                <form autoComplete='off' onSubmit={onSubmit}>
                    {
                        FormFields.map((field, idx) => 
                            <InputField 
                                key={idx}
                                value={data[field.name]}
                                error={error[field.name].value}
                                errorMessage={error[field.name].message}
                                onChange={value => onChange(value, field.name)}
                                {...field}
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