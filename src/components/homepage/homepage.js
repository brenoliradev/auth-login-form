import React, { useState, useEffect } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';

import AuthService from "../../authForms/authServices/auth.service";
import userService from "../../authForms/authServices/user.service";
import Profile from "../profile/profile";
import './homepage.scss';

const Homepage = () => {
  const [content, setContent] = useState("");

  const styleAccount = {
    width: '60vh',
    height: '60vh',
    margin: '5px',
  };

  useEffect(() => {
    userService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  const currentUser = AuthService.getCurrentUser();

  if (currentUser === null) {
    return (
      <div className="register-div">
        <AccountCircleIcon 
        style={styleAccount}
        />
        <Button 
        className="register-button"
        variant="contained"
        href="/register">
          {content}
        </Button>
      </div>
    );
  } else {
    return (
      <Profile />
    )
  }
} 

export default Homepage;  