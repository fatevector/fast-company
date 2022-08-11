import React, { useState } from "react";
import api from "../api";
import "bootstrap/dist/css/bootstrap.css";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const renderPhrase = () => {
        return users.length === 0 ? (
            <h2>
                <span className="badge bg-danger">
                    Никто с тобой не тусанет
                </span>
            </h2>
        ) : (
            <h2>
                <span className="badge bg-primary">
                    {users.length}
                    {users.length % 10 >= 2 &&
                    users.length % 10 <= 4 &&
                    Math.trunc(users.length / 10) !== 1
                        ? " человекa тусанут "
                        : " человек тусанет "}
                    с тобой сегодня
                </span>
            </h2>
        );
    };
    const renderQualities = (user) => {
        return (
            <>
                {user.qualities.map((quality) => {
                    return (
                        <span
                            className={`badge bg-${quality.color} m-1`}
                            key={Math.random()}
                        >
                            {quality.name}
                        </span>
                    );
                })}
            </>
        );
    };
    const renderRows = () => {
        return (
            <>
                {users.map((user) => {
                    return (
                        <tr key={Math.random()}>
                            <td>{user.name}</td>
                            <td>{renderQualities(user)}</td>
                            <td>{user.profession.name}</td>
                            <td>{user.completedMeetings}</td>
                            <td>{user.rate}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteUser(user._id)}
                                >
                                    delete
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </>
        );
    };

    const handleDeleteUser = (id) => {
        setUsers(users.filter((user) => user._id !== id));
    };

    return (
        <>
            {renderPhrase()}
            {users.length !== 0 && (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {renderRows()}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Users;
