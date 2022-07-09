import React from 'react';

import TournamentCard from '../../../shared/components/TournamentCard';

import styles from "./styles.module.scss";

const Tournaments = () => {
    return (
        <div className={styles.wrapper}>
            <header>
                <h4>Avaliable Tournaments</h4>
            </header>
            <main>
                <TournamentCard/>
                <TournamentCard/>
                <TournamentCard/>
                <TournamentCard/>
                <TournamentCard/>
                <TournamentCard/>
                <TournamentCard/>
            </main>
        </div>
    )
}

export default Tournaments;