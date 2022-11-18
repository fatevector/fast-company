import React, { useState, useEffect } from "react";

import { validator } from "../../utils/validator";
import api from "../../api";

import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegistrationForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState([]);

    useEffect(() => {
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
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: { message: "Пароль обязателен для заполнения" },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            minLength: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: { message: "Обязательно выберите вашу профессию" }
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
            }
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
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
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
            />
            <CheckBoxField
                name="licence"
                value={data.licence}
                onChange={handleChange}
                error={errors.licence}
            >
                Подтвердить <a href="">лицензионное соглашение</a>
            </CheckBoxField>
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Подтвердить
            </button>
        </form>
    );
};

export default RegistrationForm;
