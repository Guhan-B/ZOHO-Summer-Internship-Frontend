import React from 'react';
import validator from 'validator';
import Button from '../../shared/components/Button';
import InputField from '../../shared/components/InputField';
import { login } from "../../shared/API";
import { ErrorContext } from '../../providers/error';
import { AuthenticationContext } from "../../providers/authentication";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { MdOutlineMail, MdOutlineLock } from "react-icons/md";
import styles from "./styles.module.scss";
import SIDE_IMAGE from "../../assets/image 1.jpg";

const Login = () => {
    const navigate = useNavigate();
    const [errors, insertError] = React.useContext(ErrorContext);
    const [state, setState] = React.useContext(AuthenticationContext);
    const [data, setData] = React.useState({
        email: "",  
        password: ""
    });
    const [error, setError] = React.useState({
        email: { value: false, message: "" }, 
        password: { value: false, message: "" }
    });
    const [loading ,setLoading] = React.useState(false);
    const FormFields = [
        {
            id: "Email",
            type: "text",
            placeholder: "Email",
            name: "email",
            icon: MdOutlineMail,
        },
        {
            id: "Password",
            type: "password",
            placeholder: "Password",
            name: "password",
            icon: MdOutlineLock,
        }
    ];

    const onSuccess = (message, user) => {
        setLoading(false);
        setState({ user: user, status: true });
        navigate("/dashboard");
        insertError(message, "success");
    }

    const onError = (message, returnedError) => {
        setLoading(false);
        const resetError = {};
        for(var key in error) resetError[key] = { value: false, message: "" }
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
        const errorCopy = {};
        for(var key in error) errorCopy[key] = { value: false, message: "" };
        if(validator.isEmail(data.email) === false) 
            errorCopy.email = { value: true, message: "Email is badly formatted" };
        if(data.password.length < 8) 
            errorCopy.password = { value: true, message: "Passowrd should be minimum 8 characters" };
        setError(errorCopy);
        if(Object.values(errorCopy).map(i => i.value).includes(true)) 
            return;
        setLoading(true);
        login(data, onSuccess, onError);
    }

    if(state.status) 
        return <Navigate to="/dashboard" replace/>

    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <header>
                    <h1>Welcome Back</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id elit nibh. In vel ipsum a diam vehicula
                    </p>
                </header>
                <form autoComplete='false' onSubmit={onSubmit}>
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
                    <Button label="Login" variant="primary" type="submit" loading={loading}/>
                </form>
                <footer>
                    <p>New to Lorem ipsum? <Link to={"/authentication/register"}>Register Here</Link></p>
                </footer>
            </div>
            <div className={styles.right}>
                <img src={SIDE_IMAGE} alt="side-banner"/>
            </div>
        </div>
    );
}

export default Login;