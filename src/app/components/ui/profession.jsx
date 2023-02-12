import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
    getProfessionById,
    getProfessionsLoadingStatus
} from "../../store/professions";

const Profession = ({ id }) => {
    const profession = useSelector(getProfessionById(id));
    const isLoading = useSelector(getProfessionsLoadingStatus());
    if (!isLoading) {
        return <p>{profession.name}</p>;
    }
    return "loading...";
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
