import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status, onToggleBookmark }) => {
    return (
        <h4>
            <i
                className={`bi bi-bookmark${status ? "-fill" : ""}`}
                onClick={onToggleBookmark}
            ></i>
        </h4>
    );
};

Bookmark.propTypes = {
    status: PropTypes.bool,
    onToggleBookmark: PropTypes.func.isRequired
};

export default Bookmark;
