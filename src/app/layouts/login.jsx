import React, { useState } from "react";
import { useParams } from "react-router-dom";

import LoginForm from "../components/ui/loginForm";
import RegistrationForm from "../components/ui/registrationForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "registration" ? type : "login"
    );

    const handleToggleFormType = () => {
        setFormType(prevState =>
            prevState === "login" ? "registration" : "login"
        );
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {formType === "registration" ? (
                        <>
                            <h3 className="mb-4">Registration</h3>
                            <RegistrationForm />
                            <p>
                                Already have account?{" "}
                                <a role="button" onClick={handleToggleFormType}>
                                    Sign in
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4">Login</h3>
                            <LoginForm />
                            <p>
                                Don&apos;t have account?{" "}
                                <a role="button" onClick={handleToggleFormType}>
                                    Sign up
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
