import React from 'react';
import validator from 'validator';
import { Link, useNavigate, Navigate } from "react-router-dom";
import { MdOutlineMail, MdOutlineLock } from "react-icons/md";

import InputField from '../../shared/components/InputField';
import Button from '../../shared/components/Button';
import { AuthenticationContext } from "../../providers/authentication";
import { login } from "../../shared/API";

import styles from "./styles.module.scss";
import SIDE_IMAGE from "../../assets/image 1.jpg";

const Login = () => {
    const navigate = useNavigate();

    const [state, setState] = React.useContext(AuthenticationContext);
    const [data, setData] = React.useState({email: "",  password: ""});
    const [error, setError] = React.useState({email: false, password: false});
    const [loading ,setLoading] = React.useState(false);

    const FormFields = [
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

    const onSuccess = (message, user) => {
        setLoading(false);
        setState({ user: user, status: true });
        navigate("/dashboard");
    }

    const onError = (message, returnedError) => {
        setLoading(false);
        const resetError = { email: false, password: false };
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

        const errorCopy = { email: false, password: false };

        if(data.email === "" || validator.isEmail(data.email) === false) errorCopy.email = true;
        if(data.password === "" || data.password.length < 8) errorCopy.password = true;

        setError(errorCopy);

        if(Object.values(errorCopy).includes(true))
            alert("One or more field is invalid");
        else {
            setLoading(true);
            login(data, onSuccess, onError);
        }
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