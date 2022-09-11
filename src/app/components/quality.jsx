import React from "react";
import PropTypes from "prop-types";

const Quality = ({ _id, color, name }) => {
    return <span className={`badge bg-${color} m-1`}>{name}</span>;
};

Quality.propTypes = {
    _id: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default Quality;
