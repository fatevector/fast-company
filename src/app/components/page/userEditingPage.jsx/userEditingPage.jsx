import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import UserEditingForm from "../../ui/userEditingForm";

const UserEditingPage = ({ id }) => {
    const history = useHistory();

    return (
        <div className="container mt-5">
            <button
                className="btn btn-primary"
                onClick={() => history.goBack()}
            >
                <i className="bi bi-caret-left"></i>
                Назад
            </button>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <UserEditingForm id={id} />
                </div>
            </div>
        </div>
    );
};

UserEditingPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserEditingPage;
