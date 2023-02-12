import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import UserEditingPage from "../components/page/userEditingPage.jsx/userEditingPage";

import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import { useAuth } from "../hooks/useAuth";
import { getDataStatus, loadUsersList } from "../store/users";

const Users = () => {
    const { userId, editingMode } = useParams();
    const { currentUser } = useAuth();
    const dataStatus = useSelector(getDataStatus());
    const dispatch = useDispatch();

    useEffect(() => {
        if (!dataStatus) dispatch(loadUsersList());
    }, []);

    if (!dataStatus) return "Loading...";

    return (
        <>
            {userId ? (
                editingMode ? (
                    currentUser._id === userId ? (
                        <UserEditingPage id={userId} />
                    ) : (
                        <Redirect to={`/users/${currentUser._id}/edit`} />
                    )
                ) : (
                    <UserPage id={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
