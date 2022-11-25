import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import api from "../../../api";
import { validator } from "../../../utils/validator";

import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";

const AddCommentForm = ({ onSubmit }) => {
    const initData = { userId: "", content: "" };

    const [data, setData] = useState(initData);
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.users.fetchAll().then(data => {
            const usersList = Object.keys(data).map(optionName => ({
                label: data[optionName].name,
                value: data[optionName]._id
            }));
            setUsers(usersList);
        });
    }, []);

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Обязательно выберете, от кого будет сообщение"
            }
        },
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
        setData(initData);
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
                <SelectField
                    onChange={handleChange}
                    options={users}
                    name="userId"
                    value={data.userId}
                    defaultOption="Выберите пользователя"
                    error={errors.userId}
                />
                <TextAreaField
                    onChange={handleChange}
                    name="content"
                    value={data.content}
                    label="Комментарий"
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
