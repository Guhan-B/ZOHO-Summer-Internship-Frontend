import React from 'react';
import validator from 'validator';
import { Link, useNavigate, Navigate } from "react-router-dom";
import { MdOutlineMail, MdOutlineLock } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import InputField from '../../shared/components/InputField';
import Button from '../../shared/components/Button';
import { login } from "../../store/Authentication/action";

import styles from "./styles.module.scss";
import SIDE_IMAGE from "../../assets/image 1.jpg";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = React.useState({email: "", password: ""});
    
    const status = useSelector(state => state.authentication.status);
    const user   = useSelector(state => state.authentication.user);
    const loading   = useSelector(state => state.authentication.loading);

    const Handlers = {
        success: (role) => navigate("/dashboard"),
        error: (message) => alert(message),
        email: (value) => setData({...data, email: value}),
        password: (value) => setData({...data, password: value}),
    };

    const onSubmit = (e) => {
        e.preventDefault();
        
        if(data.email === "" || data.password === "") 
            return Handlers.error("Credientials cannont be empty");
            
        if(validator.isEmail(data.email) === false) 
            return Handlers.error("Email is invalid");
        
        if(data.password.length < 8) 
            return Handlers.error("Password should be minumum 8 characters");
        
        dispatch(login(data, Handlers.success, Handlers.error));
    }

    if(status) {
        return <Navigate to="/dashboard" replace/>
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
                        onChange={Handlers.email}
                        value={data.email}
                    />
                    <InputField 
                        type="password" 
                        placeholder="Password" 
                        id="login-password" 
                        icon={MdOutlineLock}
                        onChange={Handlers.password}
                        value={data.password}
                    />
                    <Button variant="primary" label="Login" type="submit" loading={loading}/>
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