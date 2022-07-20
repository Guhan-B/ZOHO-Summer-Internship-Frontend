import React from 'react';
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdEvent, MdOutlineMenu, MdOutlineAvTimer, MdPermIdentity, MdLogout, MdCached } from "react-icons/md";
import { AuthenticationContext } from '../../providers/authentication';
import { logout } from "../../shared/API";

import styles from "./styles.module.scss";

const Participant = (props) => {
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
                    <span className={styles.link} onClick={onLogout}>                        
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