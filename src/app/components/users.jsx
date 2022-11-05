import { React, useState, useEffect } from "react";
import api from "../api";
import paginate from "../utils/paginate";
import Pagination from "./pagination";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UsersTable from "./usersTable";
import { orderBy } from "lodash";

const Users = () => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then(data => setUsers(data));
    }, []);

    const handleDeleteUser = id => {
        setUsers(users.filter(user => user._id !== id));
    };
    const handleToggleBookmark = id => {
        setUsers(
            users.map(user =>
                user._id === id ? { ...user, bookmark: !user.bookmark } : user
            )
        );
    };

    useEffect(() => {
        api.professions.fetchAll().then(data => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProffessionSelect = item => {
        setSelectedProf(item);
    };

    const handlePageChange = pageIndex => {
        setCurrentPage(pageIndex);
    };

    const handleSort = item => {
        setSortBy(item);
    };

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(user => user.profession._id === selectedProf._id)
            : users;
        const count = filteredUsers.length;
        const sortedUsers = orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userSlice = paginate(sortedUsers, currentPage, pageSize);
        const handleClearFilter = () => {
            setSelectedProf(undefined);
            setCurrentPage(1);
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProffessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={handleClearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    {count > 0 && (
                        <UsersTable
                            users={userSlice}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDeleteUser={handleDeleteUser}
                            onToggleBookmark={handleToggleBookmark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={filteredUsers.length}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "Loading...";
};

export default Users;
