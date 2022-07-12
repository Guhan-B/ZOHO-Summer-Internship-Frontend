import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Authentication Components
import Login from "../../pages/Login";
import Register from "../../pages/Register";
// Participant Components
import Participant from "../../pages/Participant";
import Avaliable from "../../pages/Participant/Available";
import EditProfile from "../../pages/Participant/EditProfile";
import Registered from "../../pages/Participant/Registered";
// Administrator Components
import Admin from "../../pages/Admin";
import Apply from "../../pages/Participant/Apply";
import Tournaments from "../../pages/Admin/Tournaments";
import Create from "../../pages/Admin/Create";
import Details from "../../pages/Admin/Details";
import Edit from "../../pages/Admin/Edit";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="authentication" replace />} />
                <Route path="authentication">
                    <Route index element={<Navigate to="login" replace />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
                <Route path="dashboard">
                    <Route path="participant" element={<Participant />}>
                        <Route index element={<Navigate to="avaliable" replace />} />
                        <Route path="avaliable" element={<Avaliable />} />
                        <Route path="avaliable/:id" element={<Apply />} />
                        <Route path="registered" element={<Registered />} />
                        <Route path="edit-profile" element={<EditProfile />} />
                    </Route>
                    <Route path="admin" element={<Admin />}>
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

export default Router;