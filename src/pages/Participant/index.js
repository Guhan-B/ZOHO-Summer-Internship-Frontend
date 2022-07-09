import React from 'react';
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdEvent, MdOutlineMenu, MdOutlineAvTimer, MdPermIdentity, MdLogout } from "react-icons/md";

import styles from "./styles.module.scss";
import PLACEHOLDER from "../../assets/placeholder.png";

const Participant = (props) => {
    const activeClass = ({isActive}) => isActive? styles.active + " " + styles.link : styles.link;
    const navigate = useNavigate();

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
                        <p>Avaliable</p>
                    </NavLink>
                    <NavLink to="registered" className={activeClass}>
                        <MdOutlineAvTimer className={styles.icon}/>
                        <p>Registered</p>                        
                    </NavLink>
                    <NavLink to="edit-profile" className={activeClass}>                        
                        <MdPermIdentity className={styles.icon}/>
                        <p>Edit Profile</p>                        
                    </NavLink>
                    <span className={styles.link} onClick={() => navigate("/authentication/login")}>                        
                        <MdLogout className={styles.icon}/>
                        <p>Logout</p>                        
                    </span>
                </div>
            </div>
            <div className={styles.content}>
                <header className={styles.main_header}>
                    <h3>Participant Dashboard</h3>
                    <span onClick={() => navigate("edit-profile")}>
                        <img src={PLACEHOLDER} alt="placeholder"/>
                    </span>
                </header>
                <Outlet />
            </div>
        </div>
    );
}

export default Participant;