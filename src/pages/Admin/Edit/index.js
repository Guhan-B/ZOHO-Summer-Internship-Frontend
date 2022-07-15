import React from 'react';
import { useParams } from 'react-router-dom';

import InputField from '../../../shared/components/InputField';
import Button from "../../../shared/components/Button";

import styles from "./styles.module.scss";

const Edit = () => {
    const params = useParams();

    const [data, setData] = React.useState({
        name: "",
        sport: "",
        desctiption: "",
        size: "",
        eventDate: "",
        eventTime: "",
        deadlineDate: "",
        deadlineTime: ""
    });

    const [error, setError] = React.useState({
        name: false,
        sport: false,
        desctiption: false,
        size: false,
        eventDate: false,
        eventTime: false,
        deadlineDate: false,
        deadlineTime: false
    });

    const nameChange = (value) => {
        setData({...data, name: value});
    }

    const sportChange = (value) => {
        setData({...data, sport: value});
    }

    const descriptionChange = (value) => {
        setData({...data, desctiption: value});
    }

    const sizeChange = (value) => {
        setData({...data, size: value});
    }

    const eventDateChange = (value) => {
        setData({...data, eventDate: value});
    }
    
    const eventTimeChange = (value) => {
        setData({...data, eventTime: value});
    }

    const deadlineDateChange = (value) => {
        setData({...data, deadlineDate: value});
    }

    const deadlineTimeChange = (value) => {
        setData({...data, deadlineTime: value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    }

    return (
        <div className={styles.wrapper}>
            <header>
                <h4>Edit Tournament : Tournament Name</h4>
            </header>
            <main>
                <form onSubmit={onSubmit}>
                    <InputField 
                        type="text" 
                        label="Tournament Name" 
                        id="tournament-name" 
                        value={data.name}
                        error={error.name}
                        onChange={nameChange}
                        required
                    />
                    <InputField 
                        type="text" 
                        label="Sport" 
                        id="sport"
                        value={data.sport}
                        error={error.sport}
                        onChange={sportChange} 
                        required
                        disabled
                    />
                    <InputField 
                        type="textarea" 
                        label="Trounament Description" 
                        id="tournament-description" 
                        height="8" 
                        limit={200}
                        value={data.desctiption}
                        error={error.desctiption}
                        onChange={descriptionChange} 
                        required
                    />
                    <InputField 
                        type="text" 
                        label="Team Size" 
                        id="team-size"
                        value={data.size}
                        error={error.size}
                        onChange={sizeChange} 
                        required
                        disabled
                    />

                    <div className={styles.col_2}>
                        <InputField 
                            type="date" 
                            label="Event Date" 
                            id="event-date" 
                            value={data.eventDate}
                            error={error.eventDate}
                            onChange={eventDateChange} 
                            required
                        />
                        <InputField 
                            type="time" 
                            label="Event Time" 
                            id="event-time" 
                            value={data.eventTime}
                            error={error.eventTime}
                            onChange={eventTimeChange} 
                            required
                        />
                    </div>
                    
                    <div className={styles.col_2}>
                        <InputField 
                            type="date" 
                            label="Deadline Date" 
                            id="deadline-date" 
                            value={data.deadlineDate}
                            error={error.deadlineDate}
                            onChange={deadlineDateChange} 
                            required
                        />
                        <InputField 
                            type="time" 
                            label="Deadline Time" 
                            id="deadline-time"
                            value={data.deadlineTime}
                            error={error.deadlineTime}
                            onChange={deadlineTimeChange}  
                            required
                        />
                    </div>

                    <div className={styles.form_controls}>
                        <Button label="Save" variant="primary" type="submit"/>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Edit;