import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    return (
        <h2>
            {length === 0 ? (
                <span className="badge bg-danger">
                    Никто с тобой не тусанет
                </span>
            ) : (
                <span className="badge bg-primary">
                    {length}
                    {length % 10 >= 2 &&
                    length % 10 <= 4 &&
                    Math.trunc(length / 10) !== 1
                        ? " человекa тусанут "
                        : " человек тусанет "}
                    с тобой сегодня
                </span>
            )}
        </h2>
    );
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;
