import React from "react";
import PropTypes from "prop-types";

import { useQuality } from "../../../hooks/useQuality";

import Quality from "./quality";

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQuality();
    if (isLoading) return "loading...";
    return (
        <>
            {qualities.map(quality => (
                <Quality key={quality} id={quality} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
