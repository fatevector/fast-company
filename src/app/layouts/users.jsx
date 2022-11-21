import React from "react";
import { useParams } from "react-router-dom";
import UserEditingPage from "../components/page/userEditingPage.jsx/userEditingPage";

import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
    const { userId, editingMode } = useParams();
    return userId ? (
        editingMode ? (
            <UserEditingPage id={userId} />
        ) : (
            <UserPage id={userId} />
        )
    ) : (
        <UsersListPage />
    );
};

export default Users;
