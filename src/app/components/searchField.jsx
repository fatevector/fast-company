import React from "react";
import PropTypes from "prop-types";

const SearchField = ({ value, onChange }) => {
    return (
        <input
            type="text"
            placeholder="Search..."
            value={value}
            onChange={onChange}
        />
    );
};

SearchField.defaultProps = {
    value: ""
};

SearchField.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};

export default SearchField;
