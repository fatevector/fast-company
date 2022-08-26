const Quality = ({ _id, color, name }) => {
    return <span className={`badge bg-${color} m-1`}>{name}</span>;
};

export default Quality;
