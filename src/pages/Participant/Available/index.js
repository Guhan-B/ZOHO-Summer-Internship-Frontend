import React from 'react';
import Loader from "react-spinners/MoonLoader";
import { useNavigate } from "react-router-dom";

import TournamentCard from '../../../shared/components/TournamentCard';
import Fallback from '../../../shared/components/Fallback';
import { fetchAvaliableTournaments } from "../../../shared/API"

import styles from "./styles.module.scss";

const Avaliable = () => {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [tournaments, setTournaments] = React.useState([]);
    const naviagte = useNavigate();

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
        fetchAvaliableTournaments(onSuccess, onError);
    }, []);

    if(loading === false && error === true) {
        return (
            <Fallback 
                message="An error occured unable to load available tournaments. Try again later"
                label="Try Again"
                onClick={() => window.location.reload()}
            />
        );
    }        
    
    if(loading === false && tournaments.length === 0) {
        return (           
            <Fallback 
                message="There are no active tournaments available currently. Come back again later to see avaliability"
                label="Go To Registered"
                onClick={() => naviagte("/dashboard/participant/registered")}
            />
        );
    }

    const modifiedTournaments = tournaments.map(tournament => {
        const copy = {...tournament, type: 0};
        if(new Date(copy.event_date) < new Date()) copy.type = 1;
        if(copy.cancelled === 1) copy.type = 2;
        return copy;
    });

    return (
        loading? 
        <div className="page-loader">
            <Loader size={50} color="#3498db"/> 
        </div> :
        <div className={styles.wrapper}>
            <header>
                <h4>Avaliable Tournaments</h4>
            </header>
            <main>
                { modifiedTournaments.map(tournament => <TournamentCard key={tournament.id} data={tournament}/>)}
            </main>
        </div>
    )
}

export default Avaliable;