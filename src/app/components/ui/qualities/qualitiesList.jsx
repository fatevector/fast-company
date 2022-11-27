import React from "react";
import PropTypes from "prop-types";

import { useQuality } from "../../../hooks/useQuality";

import Quality from "./quality";

const QualitiesList = ({ ids }) => {
    const { getQuality, isLoading } = useQuality();
    const qualities = ids.map(id => getQuality(id));
    return (
        <>
            {!isLoading
                ? qualities.map(quality => (
                      <Quality key={quality._id} {...quality} />
                  ))
                : "loading..."}
        </>
    );
};

QualitiesList.propTypes = {
    ids: PropTypes.array.isRequired
};

export default QualitiesList;
