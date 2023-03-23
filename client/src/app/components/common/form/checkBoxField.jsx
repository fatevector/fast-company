import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, children, error }) => {
    const getCheckBoxClasses = () =>
        "form-check-input" + (error ? " is-invalid" : "");

    const handleChange = () => {
        onChange({ name, value: !value });
    };

    return (
        <div className="form-check mb-4">
            <input
                className={getCheckBoxClasses()}
                type="checkbox"
                value=""
                id={name}
                checked={value}
                onChange={handleChange}
            />
            <label className="form-check-label" htmlFor={name}>
                {children}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

CheckBoxField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    error: PropTypes.string
};

export default CheckBoxField;
