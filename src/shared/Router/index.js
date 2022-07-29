import React from 'react';
import Loader from "react-spinners/MoonLoader";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";

import Login from "../../pages/Login";
import Register from "../../pages/Register";
import ResetPassword from '../../pages/ResetPassword';
import Participant from "../../pages/Participant";
import Avaliable from "../../pages/Participant/Available";
import EditProfile from "../../pages/Participant/EditProfile";
import Registered from "../../pages/Participant/Registered";
import Admin from "../../pages/Admin";
import Apply from "../../pages/Participant/Apply";
import Tournaments from "../../pages/Admin/Tournaments";
import Create from "../../pages/Admin/Create";
import Details from "../../pages/Admin/Details";
import Edit from "../../pages/Admin/Edit";
import Add from '../../pages/Admin/Add';
import { AuthenticationContext } from '../../providers/authentication';
import { fetchUser } from "../API";
import Alerts from '../components/Alerts';
import Session from '../../pages/Sessions';

const Router = () => {
    const [state, setState] = React.useContext(AuthenticationContext);
    const [loading, setLoading] = React.useState(true);

    const onSuccess = (message, data) => {
        setLoading(false);
        const stateCopy = {...state};
        stateCopy.user = data;
        stateCopy.status = true;
        setState(stateCopy);
    }

    const onError = (message) => {
        setLoading(false);
    }

    React.useEffect(() => {
        fetchUser(onSuccess, onError);
    }, []);

    return (
        loading?
        <div className="page-loader" style={{height: "100vh"}}>
            <Loader size={50} color="#3498db"/> 
        </div> :
        <React.Fragment>
            <Alerts/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="authentication" replace />} />
                    <Route path="authentication">
                        <Route index element={<Navigate to="login" replace />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="reset-password" element={<ResetPassword />} />
                    </Route>
                    <Route path="dashboard" element={<Dashboard/>}>
                            <Route path="participant" element={<Participant />}>
                                <Route index element={<Navigate to="avaliable" replace />} />
                                <Route path="avaliable" element={<Avaliable />} />
                                <Route path="avaliable/:id" element={<Apply />} />
                                <Route path="registered" element={<Registered />} />
                                <Route path="edit-profile" element={<EditProfile />} />
                                <Route path="sessions" element={<Session />} />
                            </Route>
                            <Route path="administrator" element={<Admin />}>
                                <Route index element={<Navigate to="tournaments" replace />} />
                                <Route path="tournaments" element={<Tournaments />} />
                                <Route path="tournaments/:id" element={<Details />} />
                                <Route path="tournaments/:id/edit" element={<Edit />} />
                                <Route path="create" element={<Create />} />
                                <Route path="add" element={<Add />} />
                                <Route path="sessions" element={<Session />} />
                            </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
}

const Dashboard = () => {
    const [state, setState] = React.useContext(AuthenticationContext);

    const navigate = useNavigate();

    React.useEffect(() => {
        if(state.status === false) {
            navigate("/authentication");
        }
        else {
            if(state.user.role === 0)
                navigate("/dashboard/participant");
            if(state.user.role === 1)
                navigate("/dashboard/administrator");
        }
    }, []);

    return (
        <Outlet/>
    );
}

export default Router;