import React from 'react';

import TournamentCard from '../../../shared/components/TournamentCard';

import styles from "./styles.module.scss";

const Avaliable = () => {
    const tournaments = [
        {
            "id": 1,
            "name": "BGMI Chennai League",
            "sport": "BGMI",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consectetur lectus sit amet tortor porttitor laoreet vel eu arcu. Mauris finibus finibus orci vel cursus. Mauris eu odio urna.n",
            "team_size": 2,
            "cancelled": 0,
            "event_date": "Sat Aug 28 2022 18:00:00 GMT+0530 (India Standard Time)",
            "deadline_date": "Sat Aug 21 2022 00:00:00 GMT+0530 (India Standard Time)"
        },
        {
            "id": 2,
            "name": "VTL Indian Championship",
            "sport": "Valorant",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consectetur lectus sit amet tortor porttitor laoreet vel eu arcu. Mauris finibus finibus orci vel cursus. Mauris eu odio urna.n",
            "team_size": 5,
            "cancelled": 0,
            "event_date": "Sat Aug 28 2022 18:00:00 GMT+0530 (India Standard Time)",
            "deadline_date": "Sat Aug 21 2022 00:00:00 GMT+0530 (India Standard Time)"
        }
    ];

    return (
        <div className={styles.wrapper}>
            <header>
                <h4>Avaliable Tournaments</h4>
            </header>
            <main>
                { tournaments.map(tournament => <TournamentCard key={tournament.id} data={tournament}/>)}
            </main>
        </div>
    )
}

export default Avaliable;