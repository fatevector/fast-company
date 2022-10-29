import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
import paginate from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import GroupList from "./groupList";

const Users = ({ users: allUsers, ...rest }) => {
    const count = allUsers.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    useEffect(() => {
        api.professions.fetchAll().then(data => setProfessions(data));
    }, []);

    const handleProffessionSelect = item => {
        setSelectedProf(item);
        setCurrentPage(1);
    };

    const handlePageChange = pageIndex => {
        setCurrentPage(pageIndex);
    };

    const filteredUsers = selectedProf
        ? allUsers.filter(user => user.profession === selectedProf)
        : allUsers;
    const userSlice = paginate(filteredUsers, currentPage, pageSize);
    const handleClearFilter = () => {
        setSelectedProf(undefined);
        setCurrentPage(1);
    };

    return (
        <>
            {professions && (
                <>
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
                </>
            )}
            {count > 0 && (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {userSlice.map(user => {
                            return (
                                <User key={user._id} user={user} {...rest} />
                            );
                        })}
                    </tbody>
                </table>
            )}
            <Pagination
                itemsCount={filteredUsers.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    rest: PropTypes.array
};

export default Users;
