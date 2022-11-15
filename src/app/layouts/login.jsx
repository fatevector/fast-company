import React from "react";

const Login = () => {
    return (
        <form action="">
            <div>
                <lavel htmlFor="email">Email</lavel>
                <input type="text" id="email" />
            </div>
            <div>
                <lavel htmlFor="password">Пароль</lavel>
                <input type="password" id="password" />
            </div>
        </form>
    );
};

export default Login;
