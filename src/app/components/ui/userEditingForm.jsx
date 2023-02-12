import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { validator } from "../../utils/validator";

import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { useAuth } from "../../hooks/useAuth";
import { useProfessions } from "../../hooks/useProfession";
import { useQuality } from "../../hooks/useQuality";

const UserEditingForm = ({ id }) => {
    const { currentUser, updateUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [qualities, setQualities] = useState([]);
    const [professions, setProfessions] = useState([]);
    const [data, setData] = useState({
        name: currentUser.name,
        email: currentUser.email,
        profession: currentUser.profession,
        sex: currentUser.sex
    });
    const history = useHistory();
    const { isLoading: professionLoading, professions: professionsList } =
        useProfessions();
    const {
        isLoading: qualitiesLoading,
        qualities: qualitiesList,
        getQuality
    } = useQuality();

    useEffect(() => {
        if (!professionLoading && !qualitiesLoading) {
            setData(prevState => ({
                ...prevState,
                qualities: currentUser.qualities.map(optionId => {
                    const option = getQuality(optionId);
                    return {
                        label: option.name,
                        value: option._id,
                        color: option.color
                    };
                })
            }));
            setProfessions(
                professionsList.map(profession => ({
                    label: profession.name,
                    value: profession._id
                }))
            );
            setQualities(
                qualitiesList.map(quality => ({
                    label: quality.name,
                    value: quality._id,
                    color: quality.color
                }))
            );
            setIsLoading(false);
        }
    }, [professionLoading, qualitiesLoading]);

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

    const handleSubmit = async e => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map(q => q.value)
        };
        try {
            await updateUser(newData);
            history.replace(`/users/${currentUser._id}`);
        } catch (error) {
            setErrors(error);
        }
    };

    return !isLoading ? (
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
