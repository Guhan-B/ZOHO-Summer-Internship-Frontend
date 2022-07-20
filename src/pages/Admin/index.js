import React from 'react';
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdEvent, MdOutlineMenu, MdOutlineAvTimer, MdLogout, MdCached } from "react-icons/md";
import { AuthenticationContext } from '../../providers/authentication';
import { logout } from "../../shared/API";

import styles from "./styles.module.scss";

const Admin = (props) => {
    const navigate = useNavigate();
    const activeClass = ({isActive}) => isActive? styles.active + " " + styles.link : styles.link;
    const [state, setState] = React.useContext(AuthenticationContext);
    
    const onLogout = () => {
        logout(
            (message) => {
                setState({ user: null, status: false });
                navigate("/");
                alert(message);
            },
            (message) => alert(message)
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
                    <NavLink to="tournaments" className={activeClass}>
                        <MdEvent className={styles.icon}/>
                        <p>All Tournaments</p>
                    </NavLink>
                    <NavLink to="create" className={activeClass}>
                        <MdOutlineAvTimer className={styles.icon}/>
                        <p>Create Tournament</p>                        
                    </NavLink>
                    <NavLink to="/authentication/reset-password" className={activeClass}>                        
                        <MdCached className={styles.icon}/>
                        <p>Reset Password</p>                        
                    </NavLink>
                    <span className={styles.link} onClick={onLogout}>                        
                        <MdLogout className={styles.icon}/>
                        <p>Logout</p>                        
                    </span>
                </div>
            </div>
            <div className={styles.content}>
                <header className={styles.main_header}>
                    <h3>Administrator Dashboard</h3>
                </header>
                <Outlet />
            </div>
        </div>
    );
}

export default Admin;