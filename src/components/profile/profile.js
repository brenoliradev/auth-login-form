import React from 'react';
import AuthService from "../authForms/authServices/auth.service";
import LoginForm from '../authForms/login/authLogin'
import { Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './profile.scss'

function Profile() {
const currentUser = AuthService.getCurrentUser();

    const styleAccount = {
        width: '60vh',
        height: '60vh',
        margin: '5px',
    };

    const logOut = () => {
        AuthService.logout()
    }

    if (currentUser === null) {
        return (
            <LoginForm />
        )
    }

    return (
        <div className="profile-div">
            <AccountCircleIcon  
                style={styleAccount}/>
            <header>
                <h3>Hey! {currentUser.firstName}.</h3>
                <h3>How are you?</h3>
            </header>
            <p>Thank you for checking my project!</p>
            <p>Feel free to <strong><a href="https://github.com/lirbre" target="_/blanket">contact me</a></strong></p>
            <p>Either to send me feedbacks</p>
            <p>or to give me some tips! :)</p>
            <Button 
                className="profile-button"
                variant="contained"
                href="/"
                onClick={logOut}
            >
                Log Out!
            </Button>
        </div>
    );
};

export default Profile;