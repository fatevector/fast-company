import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { validator } from "../../utils/validator";
import { useQuality } from "../../hooks/useQuality";
import { useProfessions } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";

import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegistrationForm = () => {
    const history = useHistory();

    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });

    const { signUp } = useAuth();

    const { qualities } = useQuality();
    const qualitiesList = Object.keys(qualities).map(optionName => ({
        label: qualities[optionName].name,
        value: qualities[optionName]._id,
        color: qualities[optionName].color
    }));

    const { professions } = useProfessions();
    const professionsList = Object.keys(professions).map(professionName => ({
        label: professions[professionName].name,
        value: professions[professionName]._id
    }));

    const [errors, setErrors] = useState({});

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

    const handleSubmit = async e => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map(q => q.value)
        };
        try {
            await signUp(newData);
            history.push("/");
        } catch (error) {
            setErrors(error);
        }
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
                options={professionsList}
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
                options={qualitiesList}
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
