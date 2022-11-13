import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../api";
import QualitiesList from "./qualitiesList";

const UserPage = id => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then(user => setUser(user));
    }, []);
    return user ? (
        <>
            <h1>{user.name}</h1>
            <h2>Профессия: {user.profession.name}</h2>
            <QualitiesList qualities={user.qualities} />
            <h2>completedMeetings: {user.completedMeetings}</h2>
            <h2>Rate: {user.rate}</h2>
        </>
    ) : (
        <h1>Loading...</h1>
    );
};

export default UserPage;
