import React from "react";
import UsersList from "./components/usersList";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NavBar from "./components/navBar";
import { Switch, Route, Redirect } from "react-router-dom";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users" component={UsersList} />
                <Redirect to="/" />
            </Switch>
        </>
    );
};

export default App;
