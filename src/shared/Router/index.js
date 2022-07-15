import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Login from "../../pages/Login";
import Register from "../../pages/Register";
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
import { authenticationSuccess } from "../../store/Authentication/action";

const Router = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if(user && token) {
            dispatch(authenticationSuccess(user, token, true));
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="authentication" replace />} />
                <Route path="authentication">
                    <Route index element={<Navigate to="login" replace />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
                <Route path="dashboard" element={<Dashboard/>}>
                        <Route path="participant" element={<Participant />}>
                            <Route index element={<Navigate to="avaliable" replace />} />
                            <Route path="avaliable" element={<Avaliable />} />
                            <Route path="avaliable/:id" element={<Apply />} />
                            <Route path="registered" element={<Registered />} />
                            <Route path="edit-profile" element={<EditProfile />} />
                        </Route>
                        <Route path="administrator" element={<Admin />}>
                            <Route index element={<Navigate to="tournaments" replace />} />
                            <Route path="tournaments" element={<Tournaments />} />
                            <Route path="tournaments/:id" element={<Details />} />
                            <Route path="tournaments/:id/edit" element={<Edit />} />
                            <Route path="create" element={<Create />} />
                        </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const Dashboard = () => {
    const user = useSelector(state => state.authentication.user);
    const status = useSelector(state => state.authentication.status);

    const navigate = useNavigate();

    React.useEffect(() => {
        if(status === false) {
            navigate("/authentication");
        }
        else {
            if(user.role === 0)
                navigate("/dashboard/participant");
            if(user.role === 1)
                navigate("/dashboard/administrator");
        }
    }, []);

    return (
        <Outlet/>
    );
}

export default Router;