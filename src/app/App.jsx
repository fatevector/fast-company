import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";

const App = () => {
    return (
        <>
            <NavBar />
            <ProfessionProvider>
                <QualityProvider>
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route path="/login/:type?" component={Login} />
                        <Route
                            path="/users/:userId?/:editingMode?"
                            component={Users}
                        />
                        <Redirect to="/" />
                    </Switch>
                </QualityProvider>
            </ProfessionProvider>
            <ToastContainer />
        </>
    );
};

export default App;
