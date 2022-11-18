import React from "react";
import { useParams } from "react-router-dom";

import UserPage, { UserEditingPage } from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
    const { userId, editingMode } = useParams();
    return userId ? (
        editingMode === "edit" ? (
            <UserEditingPage id={userId} />
        ) : (
            <UserPage id={userId} />
        )
    ) : (
        <UsersListPage />
    );
};

export default Users;
