import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { validator } from "../../utils/validator";
import api from "../../api";

import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";

const UserEditingForm = ({ id }) => {
    const [data, setData] = useState();
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState([]);

    const history = useHistory();

    useEffect(() => {
        api.users.getById(id).then(user => {
            setData({
                name: user.name,
                email: user.email,
                profession: user.profession._id,
                sex: user.sex,
                qualities: Object.keys(user.qualities).map(optionName => ({
                    label: user.qualities[optionName].name,
                    value: user.qualities[optionName]._id,
                    color: user.qualities[optionName].color
                }))
            });
        });
        api.professions.fetchAll().then(data => {
            const professionsList = Object.keys(data).map(professionName => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then(data => {
            const qualitiesList = Object.keys(data).map(optionName => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const handleChange = target => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        profession: {
            isRequired: { message: "Обязательно выберите вашу профессию" }
        }
    };

    const isValid = Object.keys(errors).length === 0;

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        validate();
    }, [data]);

    const getProfessionById = id => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const getQualities = elements => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleSubmit = e => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        api.users.update(id, {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
        history.replace(`/users/${id}`);
    };

    return data && professions.length > 0 && qualities.length > 0 ? (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <SelectField
                label="Выберите вашу профессию"
                name="profession"
                defaultOption="Выберите..."
                options={professions}
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
            />
            <RadioField
                options={[
                    { name: "Мужчина", value: "male" },
                    { name: "Женщина", value: "female" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
            />
            <MultiSelectField
                name="qualities"
                label="Выберите ваши качества"
                options={qualities}
                onChange={handleChange}
                defaultValue={data.qualities}
            />
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Обновить
            </button>
        </form>
    ) : (
        <div>Loading...</div>
    );
};

UserEditingForm.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserEditingForm;
