import React from 'react';
import AuthService from "../authLogin/authServices/auth.service";

function Profile() {
const currentUser = AuthService.getCurrentUser();

    return (
        <div>
        <header>
            <h3>
            <strong>{currentUser.username}</strong> Profile
            </h3>
        </header>
        <p>
            <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
            {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
            <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
            <strong>Email:</strong> {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
            {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
        </div>
    );
};

export default Profile;