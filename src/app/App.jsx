import { useState } from "react";
import Users from "./components/users";
import api from "./api";
import SearchStatus from "./components/searchStatus";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDeleteUser = (id) => {
        setUsers(users.filter((user) => user._id !== id));
    };
    const handleToggleBookmark = (id) => {
        setUsers(
            users.map((user) =>
                user._id === id ? { ...user, bookmark: !user.bookmark } : user
            )
        );
    };

    return (
        <div>
            <SearchStatus length={users.length} />
            <Users
                users={users}
                onDeleteUser={handleDeleteUser}
                onToggleBookmark={handleToggleBookmark}
            />
        </div>
    );
};

export default App;