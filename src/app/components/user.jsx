import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import Quality from "./quality";

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    bookmark,
    onDeleteUser,
    onToggleBookmark
}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>
                {qualities.map(quality => (
                    <Quality key={quality._id} {...quality} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate} / 5</td>
            <td>
                <Bookmark
                    status={bookmark}
                    onToggleBookmark={() => onToggleBookmark(_id)}
                />
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDeleteUser(_id)}
                >
                    delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.object.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onDeleteUser: PropTypes.func.isRequired,
    onToggleBookmark: PropTypes.func.isRequired
};

export default User;
