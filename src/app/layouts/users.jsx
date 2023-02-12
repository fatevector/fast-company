import React from "react";
import { useHistory, useParams } from "react-router-dom";
import UserEditingPage from "../components/page/userEditingPage.jsx/userEditingPage";

import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import { useAuth } from "../hooks/useAuth";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const { userId, editingMode } = useParams();
    const history = useHistory();
    const { currentUser } = useAuth();
    if (currentUser._id !== userId && editingMode) {
        history.replace(`/users/${currentUser._id}/edit`);
    }

    return (
        <UserProvider>
            {userId ? (
                editingMode ? (
                    currentUser._id === userId ? (
                        <UserEditingPage id={userId} />
                    ) : (
                        "Loading..."
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
