import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";

import displayDate from "../../../utils/displaySate";

const Comment = ({
    _id: id,
    userId,
    content,
    created_at: created,
    onRemove
}) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then(data => setUser(data));
    }, []);

    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    {user ? (
                        <div className="d-flex flex-start ">
                            <img
                                src={`https://avatars.dicebear.com/api/avataaars/${(
                                    Math.random() + 1
                                )
                                    .toString(36)
                                    .substring(7)}.svg`}
                                className="rounded-circle shadow-1-strong me-3"
                                alt="avatar"
                                width="65"
                                height="65"
                            />
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1 ">
                                            {user.name}
                                            <span className="small">
                                                {" - " + displayDate(created)}
                                            </span>
                                        </p>
                                        <button
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={() => onRemove(id)}
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                    <p className="small mb-0">{content}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    _id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    created_at: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    onRemove: PropTypes.func.isRequired
};

export default Comment;
