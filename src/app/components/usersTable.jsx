import React from "react";
// import User from "./user";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookmark,
    onDeleteUser,
    ...rest
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя"
        },
        qualities: {
            name: "Качества",
            component: user => <QualitiesList qualities={user.qualities} />
        },
        professions: {
            path: "profession.name",
            name: "Профессия"
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: {
            path: "rate",
            name: "Оценка"
        },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: user => (
                <Bookmark
                    status={user.bookmark}
                    onToggleBookmark={() => onToggleBookmark(user._id)}
                />
            )
        },
        delete: {
            component: user => (
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDeleteUser(user._id)}
                >
                    delete
                </button>
            )
        }
    };
    return (
        <table className="table table-hover">
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, items: users }} />
            {/* <tbody className="table-group-divider">
                {users.map(user => {
                    return <User key={user._id} {...user} {...rest} />;
                })}
            </tbody> */}
        </table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    onDeleteUser: PropTypes.func.isRequired
};

export default UsersTable;
