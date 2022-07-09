import React from 'react';

import AvailableCard from '../../../shared/components/TournamentCard';

import styles from "./styles.module.scss";

const Avaliable = () => {
    return (
        <div className={styles.wrapper}>
            <header>
                <h4>Avaliable Tournaments</h4>
            </header>
            <main>
                <AvailableCard/>
                <AvailableCard/>
                <AvailableCard/>
                <AvailableCard/>
                <AvailableCard/>
                <AvailableCard/>
                <AvailableCard/>
            </main>
        </div>
    )
}

export default Avaliable;