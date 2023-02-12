import React from "react";
import PropTypes from "prop-types";

const Quality = ({ color, name, _id }) => {
    return (
        <span className={`badge bg-${color} m-1`} key={_id}>
            {name}
        </span>
    );
};

Quality.propTypes = {
    _id: PropTypes.string.isRequired,
    color: PropTypes.string,
    name: PropTypes.string
};

export default Quality;
