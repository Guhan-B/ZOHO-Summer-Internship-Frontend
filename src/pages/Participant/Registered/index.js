import React from 'react';

import RegisteredCard from '../../../shared/components/RegisteredCard';

import styles from "./styles.module.scss";

const Registered = () => {
    return (
        <div className={styles.wrapper}>
            <header>
                <h4>Registered Tournaments</h4>
            </header>
            <main>
                <RegisteredCard/>
                <RegisteredCard/>
                <RegisteredCard/>
                <RegisteredCard/>
                <RegisteredCard/>
                <RegisteredCard/>
                <RegisteredCard/>
            </main>
        </div>
    )
}

export default Registered;