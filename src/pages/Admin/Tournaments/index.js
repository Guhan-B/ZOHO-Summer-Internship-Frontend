import React from 'react';
import Loader from "react-spinners/MoonLoader";

import TournamentCard from '../../../shared/components/TournamentCard';
import Fallback from '../../../shared/components/Fallback';
import { fetchTournaments } from "../../../shared/API"

import styles from "./styles.module.scss";

const Tournaments = () => {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [tournaments, setTournaments] = React.useState([]);

    const onSuccess = (message, data) => {
        setLoading(false);
        setTournaments(data);
    }

    const onError = (message) => {
        setLoading(false);
        setError(true);
        alert(message);
    }

    React.useEffect(() => {
        fetchTournaments(onSuccess, onError);
    }, []);

    if(loading === false & error === true)
        return <Fallback/>;
    
    if(loading === false & tournaments.length === 0)
        return <Fallback/>

    return (
        loading? 
        <div className="page-loader">
            <Loader size={50} color="#3498db"/> 
        </div> :
        <div className={styles.wrapper}>
            <header>
                <h4>All Tournaments</h4>
            </header>
            <main>
                { tournaments.map(tournament => <TournamentCard key={tournament.id} data={tournament}/>)}
            </main>
        </div>
    )
}

export default Tournaments;