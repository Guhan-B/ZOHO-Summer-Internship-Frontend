import React from 'react';

import InputField from '../../../shared/components/InputField';
import Button from "../../../shared/components/Button";

import styles from "./styles.module.scss";

const Create = () => {
    // TODO: Time and Date Field
    return (
        <div className={styles.wrapper}>
            <header>
                <h4>Create a New Tournament</h4>
            </header>
            <main>
                <form>
                    <InputField type="text" label="Tournament Name" id="tournament-name" required/>
                    <InputField type="text" label="Sport" id="sport" required/>
                    <InputField 
                        type="textarea" label="Trounament Description" id="tournament-description" height="8" limit={200} required
                    />
                    <InputField type="text" label="Team Size" id="team-size" required/>
                    <InputField type="datetime" label="Event Date & Time" id="" required/>

                    <div className={styles.col_2}>
                        <InputField type="date" label="Event Date" id="event-date" required/>
                        <InputField type="time" label="Event Time" id="event-time" required/>
                    </div>
                    
                    <div className={styles.col_2}>
                        <InputField type="date" label="Deadline Date" id="deadline-date" required/>
                        <InputField type="time" label="Deadline Time" id="deadline-time" required/>
                    </div>

                    <div className={styles.form_controls}>
                        <Button label="Create" variant="primary"/>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Create;