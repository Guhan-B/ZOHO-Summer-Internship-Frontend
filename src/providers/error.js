import React from 'react';

export const ErrorContext = React.createContext();

const ErrorProvider = (props) => {
    const [errors, setErrors] = React.useState([]);

    const insertError = (message, type) => {
        let errorsCopy = [...errors];
        if(errorsCopy.length === 1) errorsCopy.pop();
        errorsCopy = [{ message, type }, ...errorsCopy];
        setErrors(errorsCopy);

        setTimeout(() => {
            const errorsCopy = [...errors];
            errorsCopy.pop();
            setErrors(errorsCopy);
        }, [3000]);
    } 

    return (
        <ErrorContext.Provider value={[errors, insertError]}>
            { props.children }
        </ErrorContext.Provider>
    );
}

export default ErrorProvider;