import React from 'react';
import validator from 'validator';
import Button from '../../../shared/components/Button';
import InputField from '../../../shared/components/InputField';
import { editProfile } from '../../../shared/API';
import { ErrorContext } from '../../../providers/error';
import { AuthenticationContext } from '../../../providers/authentication';
import { MdOutlineMail, MdOutlinePermIdentity, MdOutlinePhone, MdOutlineBloodtype } from "react-icons/md";
import styles from "./styles.module.scss";

const bloodGroups = [
    {label: "A+", value: "A+"},
    {label: "A-", value: "A-"},
    {label: "B+", value: "B+"},
    {label: "B-", value: "B-"},
    {label: "AB+", value: "AB+"},
    {label: "AB-", value: "AB-"},
    {label: "O+", value: "O+"},
    {label: "O-", value: "O-"},
];

const EditProfile = () => {
    const [state, setState] = React.useContext(AuthenticationContext);
    const [errors, insertError] = React.useContext(ErrorContext);
    const [data, setData] = React.useState({
        name: state.user.name, 
        mobileNumber: state.user.mobileNumber, 
        bloodGroup: {label: state.user.bloodGroup, value: state.user.bloodGroup}, 
        email: state.user.email, 
    });
    const [error, setError] = React.useState({
        name: { value: false, message: "" }, 
        mobileNumber: { value: false, message: "" }, 
        bloodGroup: { value: false, message: "" }, 
        email: { value: false, message: "" }
    });
    const [loading, setLoading] = React.useState(false);
    const FormFields = [
        {
            type: "text",
            id: "Name",
            label: "Name",
            name: "name",
            icon: MdOutlinePermIdentity,
            required: true,
        },
        {
            type: "text",
            id: "Mobile Number",
            label: "Mobile Number",
            name: "mobileNumber",
            icon: MdOutlinePhone,
            required: true,
        },
        {
            type: "select",
            id: "Blood Group",
            label: "Blood Group",
            name: "bloodGroup",
            icon: MdOutlineBloodtype,
            required: true,
            options: bloodGroups,
        },
        {
            type: "text",
            id: "Email",
            label: "Email",
            name: "email",
            icon: MdOutlineMail,
            required: true,
            disabled: true,
        }
    ];

    const onSuccess = (message) => {
        setLoading(false);
        const stateCopy = {...state};
        stateCopy.user.name = data.name;
        stateCopy.user.mobile_number = data.mobileNumber;
        stateCopy.user.blood_group = data.bloodGroup.value;
        setState(stateCopy);
        insertError(message, "success");
    }

    const onError = (message, returnedError) => {
        setLoading(false);
        const resetError = {};
        for(var key in error) resetError[key] = { value: false, message: "" }
        if(returnedError) 
            setError({...resetError, ...returnedError});
        else
            insertError(message, "error");
    }  

    const onChange = (value, name) => {
        const dataCopy = {...data};
        dataCopy[name] = value;
        setData(dataCopy);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const errorCopy = {};
        for(var key in error) 
            errorCopy[key] = { value: false, message: "" };
        if(data.name === "") 
            errorCopy.name = { value: true, message: "Name cannot be empty" };
        if(validator.isMobilePhone(data.mobileNumber) === false) 
            errorCopy.mobileNumber = { value: true, message: "Mobile Number is badly formatted" };
        if(data.bloodGroup.value === "") 
            errorCopy.bloodGroup = { value: true, message: "Blood Group cannot be empty" };
        setError(errorCopy);
        if(Object.values(errorCopy).map(i => i.value).includes(true)) return;
        setLoading(true);
        editProfile(data, onSuccess, onError);
    }

    return (
        <div className={styles.wrapper}>
            <header>
                <h4>Edit Profile Details</h4>
            </header>
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
                <div className={styles.form_controls}>
                    <Button label="Save" variant="primary" loading={loading}/>
                </div>
            </form>
        </div>
    )
}

export default EditProfile;