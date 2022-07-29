import React from 'react';
import { logout } from "../../shared/API";
import { ErrorContext } from '../../providers/error';
import { AuthenticationContext } from '../../providers/authentication';
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdEvent, MdOutlineMenu, MdOutlineAvTimer, MdPermIdentity, MdLogout, MdLanguage, MdCached } from "react-icons/md";
import styles from "./styles.module.scss";

const Participant = () => {
    const navigate = useNavigate();
    const [state, setState] = React.useContext(AuthenticationContext);
    const [errors, insertError] = React.useContext(ErrorContext);
    const activeClass = ({isActive}) => isActive? styles.active + " " + styles.link : styles.link;

    const onLogout = (data) => {
        logout(
            data,
            (redirect, message) => {
                setState({ user: null, status: false });
                navigate("/");
                insertError(message, "success")
            },
            (message) => insertError(message, "error")
        );
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.menu}>
                <header>
                    <MdOutlineMenu className={styles.icon}/>
                    <h2>Lorem Ipsum</h2>
                </header>
                <div className={styles.links}>
                    <NavLink to="avaliable" className={activeClass}>
                        <MdEvent className={styles.icon}/>
                        <p>Avaliable Tournaments</p>
                    </NavLink>
                    <NavLink to="registered" className={activeClass}>
                        <MdOutlineAvTimer className={styles.icon}/>
                        <p>Registered Tournaments</p>                        
                    </NavLink>
                    <NavLink to="edit-profile" className={activeClass}>                        
                        <MdPermIdentity className={styles.icon}/>
                        <p>Edit Profile</p>                        
                    </NavLink>
                    <NavLink to="/authentication/reset-password" className={activeClass}>                        
                        <MdCached className={styles.icon}/>
                        <p>Reset Password</p>                        
                    </NavLink>
                    <NavLink to="sessions" className={activeClass}>                        
                        <MdLanguage className={styles.icon}/>
                        <p>Active Sessions</p>                        
                    </NavLink>
                    <span className={styles.link} onClick={() => onLogout({current: true})}>                        
                        <MdLogout className={styles.icon}/>
                        <p>Logout</p>                        
                    </span>
                </div>
            </div>
            <div className={styles.content}>
                <header className={styles.main_header}>
                    <h3>Participant Dashboard</h3>
                </header>
                <Outlet />
            </div>
        </div>
    );
}

export default Participant;