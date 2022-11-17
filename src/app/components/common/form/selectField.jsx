import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    value,
    onChange,
    defaultOption,
    options,
    error
}) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map(optionName => ({
                  name: options[optionName].name,
                  _id: options[optionName]._id
              }))
            : options;

    const getSelectClasses = () => "form-select" + (error ? " is-invalid" : "");

    return (
        <div className="mb-4">
            <label htmlFor="validationCustom04" className="form-label">
                {label}
            </label>
            <select
                className={getSelectClasses()}
                id="validationCustom04"
                name="profession"
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
    type: "text"
};

SelectField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultOption: PropTypes.string.isRequired,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    error: PropTypes.string
};

export default SelectField;
