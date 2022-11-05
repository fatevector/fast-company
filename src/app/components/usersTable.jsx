import React from "react";
import User from "./user";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";

const UsersTable = ({ users, onSort, selectedSort, ...rest }) => {
    const columns = {
        name: {
            iter: "name",
            name: "Имя"
        },
        qualities: {
            name: "Качества"
        },
        professions: {
            iter: "profession.name",
            name: "Профессия"
        },
        completedMeetings: {
            iter: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: {
            iter: "rate",
            name: "Оценка"
        },
        bookmark: {
            iter: "bookmark",
            name: "Избранное"
        },
        delete: {}
    };
    return (
        <table className="table table-hover">
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <tbody className="table-group-divider">
                {users.map(user => {
                    return <User key={user._id} user={user} {...rest} />;
                })}
            </tbody>
        </table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default UsersTable;
