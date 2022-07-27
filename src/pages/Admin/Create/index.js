import React from 'react';
import InputField from '../../../shared/components/InputField';
import Button from "../../../shared/components/Button";
import { createTournament } from "../../../shared/API";
import { ErrorContext } from '../../../providers/error';
import styles from "./styles.module.scss";

const Create = () => {
    const [loading, setLoading] = React.useState(false);  
    const [errors, insertError] = React.useContext(ErrorContext);
    const [data, setData] = React.useState({
        name: "",
        sport: "",
        description: "",
        teamSize: "",
        eventDate: "",
        deadlineDate: "",
    });
    const [error, setError] = React.useState({
        name: { value: false, message: "" },
        sport: { value: false, message: "" },
        description: { value: false, message: "" },
        teamSize: { value: false, message: "" },
        eventDate: { value: false, message: "" },
        deadlineDate: { value: false, message: "" },
    });
    const FormFields = [
        {
            type: "text",
            id: "Tournament Name",
            label: "Tournament Name",
            name: "name",
            required: true,
        },
        {
            type: "text",
            id: "Sport",
            label: "Sport",
            name: "sport",
            required: true,
        },
        {
            type: "textarea",
            id: "Tournament Description",
            label: "Tournament Description",
            name: "description",
            required: true,
            height: "8", 
            limit: 200 
        },
        {
            type: "text",
            id: "Team Size",
            label: "Team Size",
            name: "teamSize",
            required: true,
        },
        {
            type: "datetime-local",
            id: "Event Date",
            label: "Event Date",
            name: "eventDate",
            required: true,
        },
        {
            type: "datetime-local",
            id: "Deadline Date",
            label: "Deadline Date",
            name: "deadlineDate",
            required: true,
        },
    ];

    const onChange = (value, name) => {
        const dataCopy = {...data};
        dataCopy[name] = value;
        setData(dataCopy);
    }

    const onSuccess = (message) => {
        setLoading(false);
        const dataReset = {};
        for(var key in data) 
            dataReset[key] = "";
        setData(dataReset);
        insertError(message, "success");
    }

    const onError = (message, returnedError) => {
        setLoading(false);
        const resetError = {};
        for(var key in error) 
            resetError[key] = { value: false, message: "" }
        if(returnedError) 
            setError({...resetError, ...returnedError});
        else
            insertError(message, "error");
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const errorCopy = {};
        for(var key in error) 
            errorCopy[key] = { value: false, message: "" }
        if(data.name === "") 
            errorCopy.name = { value: true, message: "Name cannot be empty" };
        if(data.sport === "") 
            errorCopy.sport = { value: true, message: "Sport cannot be empty" };
        if(data.description === "") 
            errorCopy.description = { value: true, message: "Description cannot be empty" };
        if(data.teamSize === "") 
            errorCopy.teamSize = { value: true, message: "Team Size cannot be empty" };
        if(data.eventDate === "") 
            errorCopy.eventDate = { value: true, message: "Event Date cannot be empty" };
        if(data.deadlineDate === "") 
            errorCopy.deadlineDate = { value: true, message: "Deadline cannot be empty" };
        if(new Date(data.eventDate) <= new Date()) 
            errorCopy.eventDate = { value: true, message: "Event Date should be after today's date" };
        if(new Date(data.deadlineDate) <= new Date()) 
            errorCopy.deadlineDate = { value: true, message: "Deadline should be after today's date" };
        if(new Date(data.deadlineDate) > new Date(data.eventDate)) {
            errorCopy.eventDate = { value: true, message: "Event Date should be after Deadline Date" };
            errorCopy.deadlineDate = { value: true, message: "Dealine Date should be before Event Date" };;
        }
        setError(errorCopy);
        if(Object.values(errorCopy).map(i => i.value).includes(true)) return;
        data.eventDate = new Date(data.eventDate).toUTCString();
        data.deadlineDate = new Date(data.deadlineDate).toUTCString();
        createTournament(data, onSuccess, onError);
    }

    return (
        <div className={styles.wrapper}>
            <header>
                <h4>Create a New Tournament</h4>
            </header>
            <main>
                <form autoComplete='off' onSubmit={onSubmit}>
                    {
                        FormFields.map((field, idx) => 
                            <InputField 
                                key={idx}
                                value={data[field.name]}
                                error={error[field.name].value}
                                errorMessage={error[field.name].message}
                                onChange={value => onChange(value, field.name)}
                                {...field}
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