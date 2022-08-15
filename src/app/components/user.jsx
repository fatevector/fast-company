import Quality from "./quality";

const User = ({ user, onDeleteUser }) => {
    return (
        <tr>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((quality) => (
                    <Quality key={quality._id} {...quality} />
                ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDeleteUser(user._id)}
                >
                    delete
                </button>
            </td>
        </tr>
    );
};

export default User;
