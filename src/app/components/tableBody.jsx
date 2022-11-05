import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";

const TableBody = ({ items, columns }) => {
    return (
        <tbody>
            {items.map(item => (
                <tr key={item._id}>
                    {Object.keys(columns).map(column => (
                        <td key={column}>{get(item, columns[column].path)}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

TableBody.propTypes = {
    items: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableBody;
