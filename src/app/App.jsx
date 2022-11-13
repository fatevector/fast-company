import React from "react";
import Users from "./layouts/users";
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
                <Route path="/users" component={Users} />
                <Redirect to="/" />
            </Switch>
        </>
    );
};

export default App;
