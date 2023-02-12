import { React, useState, useEffect } from "react";
import { orderBy } from "lodash";

import paginate from "../../../utils/paginate";
import { useUser } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import SearchField from "../../common/form/searchField";

const UsersListPage = () => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const { currentUser } = useAuth();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchRequest, setSearchRequest] = useState(undefined);
    const [filter, setFilter] = useState();

    const { users } = useUser();
    const { isLoading: professionsLoading, professions } = useProfessions();

    const handleToggleBookmark = id => {
        const newArray = users.map(user =>
            user._id === id ? { ...user, bookmark: !user.bookmark } : user
        );
        // setUsers(newArray);
        console.log(newArray);
    };

    useEffect(() => {
        if (selectedProf !== undefined) {
            setCurrentPage(1);
            setSearchRequest(undefined);
            setFilter({
                rule: user => user.profession === selectedProf._id
            });
        }
    }, [selectedProf]);

    useEffect(() => {
        if (searchRequest !== undefined) {
            setCurrentPage(1);
            setSelectedProf(undefined);
            setFilter({
                rule: user =>
                    user.name
                        .toLowerCase()
                        .includes(searchRequest.toLowerCase())
            });
        }
    }, [searchRequest]);

    const handleProffessionSelect = item => {
        setSelectedProf(item);
    };

    const handlePageChange = pageIndex => {
        setCurrentPage(pageIndex);
    };

    const handleSort = item => {
        setSortBy(item);
    };

    const handleSearchChange = ({ target }) => {
        setSearchRequest(target.value);
    };

    const filterUsers = data => {
        const filteredUsers = filter
            ? data.filter(user => filter.rule(user))
            : data;
        return filteredUsers.filter(user => user._id !== currentUser._id);
    };

    if (users) {
        const filteredUsers = filterUsers(users);
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
            setFilter(undefined);
            setSearchRequest(undefined);
        };

        return (
            <div className="d-flex">
                {professions && !professionsLoading && (
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
                    <SearchField
                        name="searchRequest"
                        value={searchRequest}
                        onChange={handleSearchChange}
                        placeholder="Поиск..."
                    />
                    {count > 0 && (
                        <UsersTable
                            users={userSlice}
                            onSort={handleSort}
                            selectedSort={sortBy}
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

export default UsersListPage;
