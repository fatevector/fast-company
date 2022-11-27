import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Bookmark from "../common/bookmark";
import Qualities from "../ui/qualities";
import Table from "../common/table";
import Profession from "./profession";

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
            name: "Имя",
            component: user => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Качества",
            component: user => <Qualities qualities={user.qualities} />
        },
        professions: {
            name: "Профессия",
            component: user => <Profession id={user.profession} />
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
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            items={users}
        ></Table>
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
