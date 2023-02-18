import React, { useState } from "react";
import PropTypes from "prop-types";

import { validator } from "../../../utils/validator";

import TextAreaField from "../form/textAreaField";

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    const validatorConfig = {
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        }
    };

    const handleChange = target => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const clearForm = () => {
        setData({});
        setErrors({});
    };

    const handleSubmit = e => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };

    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <TextAreaField
                    onChange={handleChange}
                    name="content"
                    value={data.content || ""}
                    label="Комментарий"
                    rows={3}
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Опубликовать</button>
                </div>
            </form>
        </div>
    );
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default AddCommentForm;