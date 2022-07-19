import React from 'react';

export const AuthenticationContext = React.createContext();

const AuthenticationProvider = (props) => {
    const [state, setState] = React.useState({status: false, user: null});

    return (
        <AuthenticationContext.Provider value={[state, setState]}>
            {props.children}
        </AuthenticationContext.Provider>
    );
}

export default AuthenticationProvider;