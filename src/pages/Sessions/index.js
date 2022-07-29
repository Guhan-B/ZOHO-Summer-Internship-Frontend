import React from 'react';
import Loader from "react-spinners/MoonLoader";
import Fallback from '../../shared/components/Fallback';
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from '../../providers/authentication';
import { ErrorContext } from "../../providers/error";
import { fetchSessions, logout } from "../../shared/API";
import { FaChrome,FaFirefox, FaEdge, FaSafari, FaOpera, FaWindows, FaLinux, FaApple } from "react-icons/fa";
import styles from "./styles.module.scss";
import Button from '../../shared/components/Button';

const config = {
    day: "2-digit", 
    month: "2-digit", 
    year: "numeric", 
    hour: "2-digit", 
    minute: "2-digit",
}

const browsers = {
    chrome: FaChrome,
    edge: FaEdge,
    firefox: FaFirefox,
    safari: FaSafari,
    opera: FaOpera
} 

const oss = {
    windows: FaWindows,
    linux: FaLinux,
    mac: FaApple
}

const Session = () => {
    const [currentSessionId, setCurrentSessionId] = React.useState("");
    const [sessions, setSessions] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [errors, insertError] = React.useContext(ErrorContext);
    const [state, setState] = React.useContext(AuthenticationContext);
    const navigate = useNavigate();

    const onSuccess = (message, data) => {
        setLoading(false);
        setSessions(data.sessions);
        setCurrentSessionId(data.currentSessionId);
    }

    const onError = (message) => {
        setLoading(false);
        setError(true);
    }

    const onTerminate = (sessionId) => {
        logout(
            { sessionId },
            (redirect, message) => {
                if(redirect) {
                    setState({ user: null, status: false });
                    navigate("/");
                }
                else {
                    fetchSessions(onSuccess, onError);
                }
                insertError(message, "success")
            },
            (message) => insertError(message, "error")
        );
    }

    const onTerminateAll = () => {
        logout(
            { all: true },
            (redirect, message) => {
                insertError(message, "success")
                fetchSessions(onSuccess, onError);
            },
            (message) => insertError(message, "error")
        );
    }

    React.useEffect(() => {
        setLoading(true);
        fetchSessions(onSuccess, onError);
    }, []);

    if(loading === false && error === true) {
        return (
            <Fallback 
                message="An error occured unable to load sessions. Try again later"
                label="Try Again"
                onClick={() => window.location.reload()}
            />
        );
    } 

    sessions.sort((a, b) => a.current > b.current);

    return (
        loading? 
        <div className="page-loader">
            <Loader size={50} color="#3498db"/> 
        </div> :
        <div className={styles.wrapper}>
            <header>
                <h4>Active session on your account</h4>
            </header>
            <main>
                {
                    sessions.length > 1 &&
                    <section>
                        <Button label="Terminate Other Sessions" size="small" variant="danger" onClick={onTerminateAll}/>
                    </section>
                }

                <table>
                    <thead>
                        <tr>
                            <th>Login Date & Time</th>
                            <th>Browser</th>
                            <th>Platform</th>
                            <th style={{textAlign: "center"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sessions.map(
                                session => {
                                    const Browser = browsers[session.browser.toLowerCase()]
                                    const OS = oss[session.os.toLowerCase()]
                                    return (
                                        <tr key={session.id}>
                                            <td>
                                                { new Date(session.created_at).toLocaleString("en-US", config) }&nbsp;&nbsp;
                                                <b>{session.current === 1 ? "[CURRENT SESSION]" : ""}</b>
                                            </td>
                                            <td>
                                                <span>
                                                    <p>{session.browser}</p>
                                                    <Browser/>
                                                </span>
                                            </td>
                                            <td>
                                                <span>
                                                    <p>{session.os}</p>
                                                    <OS/>
                                                </span>
                                            </td>
                                            <td>
                                                {
                                                    session.id !== currentSessionId &&
                                                    <button onClick={() => onTerminate(session.id)}>Terminate</button>
                                                }
                                            </td>
                                        </tr> 
                                    )
                                }
                            )
                        }
                    </tbody>
                </table>
            </main>
        </div>
    );
}

export default Session;