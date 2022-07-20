import React from 'react';
import Loader from "react-spinners/MoonLoader";

import RegisteredCard from '../../../shared/components/RegisteredCard';
import Fallback from '../../../shared/components/Fallback';
import { fetchRegisteredTournaments } from "../../../shared/API";
import { AuthenticationContext } from "../../../providers/authentication";

import styles from "./styles.module.scss";

const Registered = () => {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [tournaments, setTournaments] = React.useState([]);
    const state = React.useContext(AuthenticationContext)[0];

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
        fetchRegisteredTournaments(onSuccess, onError);
    }, []);

    console.log(state.user);

    if(loading === false && error === true)
        return <Fallback/>;
    
    if(loading === false && tournaments.length === 0)
        return <Fallback/>
        
    return (
        loading? 
        <div className="page-loader">
            <Loader size={50} color="#3498db"/> 
        </div> :
        <div className={styles.wrapper}>
            <header>
                <h4>Registered Tournaments</h4>
            </header>
            <main>
                { tournaments.map(tournament => <RegisteredCard user={state.user} key={tournament.id} data={tournament}/>)}
            </main>
        </div>
    )
}

export default Registered;