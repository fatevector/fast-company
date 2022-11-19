import React from "react";
import PropTypes from "prop-types";

import UserEditingForm from "../../ui/userEditingForm";

const UserEditingPage = ({ id }) => {
    return (
        <div className="container mt-5">
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
