import React from "react";
import { Redirect, useParams } from "react-router-dom";
import UserEditingPage from "../components/page/userEditingPage.jsx/userEditingPage";

import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import { useAuth } from "../hooks/useAuth";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const { userId, editingMode } = useParams();
    const { currentUser } = useAuth();

    return (
        <UserProvider>
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
        </UserProvider>
    );
};

export default Users;
