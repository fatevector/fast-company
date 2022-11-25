import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({
    label,
    name,
    value,
    onChange,
    error,
    placeholder
}) => {
    const getInputClasses = () => "form-control" + (error ? " is-invalid" : "");

    const handleChange = ({ target }) => {
        onChange({ name: [target.name], value: target.value });
    };

    return (
        <div className="mb-4">
            {label && <label htmlFor={name}>{label}</label>}
            <div className="input-group has-validation">
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={getInputClasses()}
                    placeholder={placeholder}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextAreaField.defaultProps = {
    type: "text"
};

TextAreaField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    placeholder: PropTypes.string
};

export default TextAreaField;
