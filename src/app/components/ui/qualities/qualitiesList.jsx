import React from "react";
import PropTypes from "prop-types";

import Quality from "./quality";
import { useSelector } from "react-redux";
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus
} from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
    const isLoading = useSelector(getQualitiesLoadingStatus());
    if (isLoading) return "loading...";
    const qualitiesList = useSelector(getQualitiesByIds(qualities));
    return (
        <>
            {qualitiesList.map(quality => (
                <Quality key={quality._id} {...quality} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
