import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    name,
    value,
    onChange,
    defaultOption,
    options,
    error
}) => {
    const optionsArray =
        typeof options === "object"
            ? Object.keys(options).map(optionName => ({
                  name: options[optionName].name,
                  _id: options[optionName]._id
              }))
            : options;

    const getSelectClasses = () => "form-select" + (error ? " is-invalid" : "");

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                className={getSelectClasses()}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray &&
                    optionsArray.map(option => (
                        <option value={option._id} key={option._id}>
                            {option.name}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectField.defaultProps = {
    defaultOption: "Выберите вариант..."
};

SelectField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultOption: PropTypes.string.isRequired,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string.isRequired,
    error: PropTypes.string
};

export default SelectField;
