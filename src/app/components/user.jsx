import Bookmark from "./bookmark";
import Quality from "./quality";

const User = ({ user, onDeleteUser, onToggleBookmark }) => {
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
                <Bookmark
                    status={user.bookmark}
                    onToggleBookmark={() => onToggleBookmark(user._id)}
                />
            </td>
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
