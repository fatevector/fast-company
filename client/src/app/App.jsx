import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

const App = () => {
    return (
        <>
            <AppLoader>
                <NavBar />
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/login/:type?" component={Login} />
                    <ProtectedRoute
                        path="/users/:userId?/:editingMode?"
                        component={Users}
                    />
                    <Route path="/logout" component={LogOut} />
                    <Redirect to="/" />
                </Switch>
                <ToastContainer />
            </AppLoader>
        </>
    );
};

export default App;
