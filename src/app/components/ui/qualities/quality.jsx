import React from "react";
import PropTypes from "prop-types";

import { useQuality } from "../../../hooks/useQuality";

const Quality = ({ id }) => {
    const { getQuality } = useQuality();
    const { color, name, _id } = getQuality(id);

    return (
        <span className={`badge bg-${color} m-1`} key={_id}>
            {name}
        </span>
    );
};

Quality.propTypes = {
    id: PropTypes.string.isRequired
};

export default Quality;
