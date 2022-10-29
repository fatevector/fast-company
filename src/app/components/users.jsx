import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
import paginate from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import GroupList from "./groupList";

const Users = ({ users, ...rest }) => {
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    useEffect(() => {
        api.professions.fetchAll().then(data => setProfessions(data));
    }, []);

    const handleProffessionSelect = params => {
        console.log(params);
    };

    const handlePageChange = pageIndex => {
        setCurrentPage(pageIndex);
    };

    const userSlice = paginate(users, currentPage, pageSize);

    return (
        <>
            {professions && (
                <GroupList
                    items={professions}
                    onItemSelect={handleProffessionSelect}
                />
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
                itemsCount={count}
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
