import React from "react";
import PropTypes from "prop-types";

const SearchField = ({ value, onChange, placeholder, name }) => {
    return (
        <input
            name={name}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

SearchField.defaultProps = {
    value: "",
    placeholder: "Поиск..."
};

SearchField.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string
};

export default SearchField;
