import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, placeholder, label }) => {
    const optionsArray =
        typeof options === "object"
            ? Object.keys(options).map(optionName => ({
                  label: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;

    const handleChange = value => {
        onChange({ name, value });
    };

    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={name} className="form-label">
                    {label}
                </label>
            )}
            <Select
                placeholder={placeholder}
                name={name}
                closeMenuOnSelect={false}
                isMulti
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
            />
        </div>
    );
};

MultiSelectField.defaultProps = {
    placeholder: "Выберите..."
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string
};

export default MultiSelectField;
