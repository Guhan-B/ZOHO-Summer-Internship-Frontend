import React from 'react';

import InputField from '../../../shared/components/InputField';
import Button from "../../../shared/components/Button";
import { createTournament } from "../../../shared/API";

import styles from "./styles.module.scss";

const Create = () => {
    const [loading, setLoading] = React.useState(false);
        
    const [data, setData] = React.useState({
        name: "",
        sport: "",
        description: "",
        teamSize: "",
        eventDate: "",
        deadlineDate: "",
    });

    const [error, setError] = React.useState({
        name: false,
        sport: false,
        description: false,
        teamSize: false,
        eventDate: false,
        deadlineDate: false,
    });

    const FormFields = [
        {
            type: "text",
            label: "Tournament Name",
            name: "name",
            required: true,
            props: {}
        },
        {
            type: "text",
            label: "Sport",
            name: "sport",
            required: true,
            props: {}
        },
        {
            type: "textarea",
            label: "Tournament Description",
            name: "description",
            required: true,
            props: { height: "8", limit: 200 }
        },
        {
            type: "text",
            label: "Team Size",
            name: "teamSize",
            required: true,
            props: {}
        },
        {
            type: "datetime-local",
            label: "Event Date",
            name: "eventDate",
            required: true,
            props: {}
        },
        {
            type: "datetime-local",
            label: "Deadline Date",
            name: "deadlineDate",
            required: true,
            props: {}
        },
    ];

    const onChange = (value, name) => {
        const dataCopy = {...data};
        dataCopy[name] = value;
        setData(dataCopy);
    }

    const onSuccess = (message, data) => {
        setLoading(false);
        setData({
            name: "",
            sport: "",
            description: "",
            teamSize: "",
            eventDate: "",
            eventTime: "",
            deadlineDate: "",
            deadlineTime: ""
        });
        alert(message);
    }

    const onError = (message, returnedError) => {
        setLoading(false);
        const resetError = {
            name: false,
            sport: false,
            description: false,
            teamSize: false,
            eventDate: false,
            deadlineDate: false,
        };
        if(returnedError) setError({...resetError, ...returnedError});
        alert(message);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const errorCopy = {
            name: false,
            sport: false,
            description: false,
            teamSize: false,
            eventDate: false,
            deadlineDate: false,
        };

        if(data.name === "") errorCopy.name = true;
        if(data.sport === "") errorCopy.sport = true;
        if(data.description === "") errorCopy.description = true;
        if(data.teamSize === "") errorCopy.teamSize = true;
        if(data.eventDate === "") errorCopy.eventDate = true;
        if(data.deadlineDate === "") errorCopy.deadlineDate = true;
        if(new Date(data.eventDate) <= new Date()) errorCopy.eventDate = true;
        if(new Date(data.deadlineDate) <= new Date()) errorCopy.deadlineDate = true;
        if(new Date(data.deadlineDate) > new Date(data.eventDate)) {
            errorCopy.eventDate = true;
            errorCopy.deadlineDate = true;
        }
        
        setError(errorCopy);

        if(Object.values(errorCopy).includes(true)) {
            alert("One or More form field is invalid");
        }
        else {
            setLoading(true);

            data.eventDate = new Date(data.eventDate).toUTCString();
            data.deadlineDate = new Date(data.deadlineDate).toUTCString();

            createTournament(data, onSuccess, onError);
        }
    }

    return (
        <div className={styles.wrapper}>
            <header>
                <h4>Create a New Tournament</h4>
            </header>
            <main>
                <form onSubmit={onSubmit}>
                    {
                        FormFields.map((field, idx) => 
                            <InputField 
                                key={idx}
                                id={field.label}
                                type={field.type}
                                label={field.label}
                                required={field.required}
                                value={data[field.name]}
                                error={error[field.name]}
                                onChange={value => onChange(value, field.name)}
                                {...field.props}
                            />
                        )
                    }
                    <Button label="Create Tournament" type="submit" variant="primary" loading={loading}/>
                </form>
            </main>
        </div>
    );
}

export default Create;