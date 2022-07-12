import React from 'react';
import { Link } from "react-router-dom";
import { MdOutlineMail, MdOutlineLock } from "react-icons/md";

import InputField from '../../shared/components/InputField';
import Button from '../../shared/components/Button';

import styles from "./styles.module.scss";
import SIDE_IMAGE from "../../assets/image 1.jpg";

const Login = () => {
    const [data, setData] = React.useState({email: "", password: ""});
    const [error, setError] = React.useState({email: false, password: false});

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
                    <h1>Welcome Back</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id elit nibh. In vel ipsum a diam vehicula
                    </p>
                </header>
                <form onSubmit={onSubmit}>
                    <InputField 
                        type="text" 
                        placeholder="Email" 
                        id="login-email" 
                        icon={MdOutlineMail}
                        onChange={emailChange}
                        error={error.email}
                        value={data.email}
                    />
                    <InputField 
                        type="password" 
                        placeholder="Password" 
                        id="login-password" 
                        icon={MdOutlineLock}
                        onChange={passwordChange}
                        error={error.password}
                        value={data.password}
                    />
                    <Button variant="primary" label="Login" type="reset"/>
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