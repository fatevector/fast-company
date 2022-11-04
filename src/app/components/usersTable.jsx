import React from "react";
import User from "./user";
import PropTypes from "prop-types";

const UsersTable = ({ users, ...rest }) => {
    return (
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
                {users.map(user => {
                    return <User key={user._id} user={user} {...rest} />;
                })}
            </tbody>
        </table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired
};

export default UsersTable;
