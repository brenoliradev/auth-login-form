import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import RegisterForm from './authLogin/signup/authRegister'
import LoginForm from './authLogin/login/authLogin'
import Profile from './components/profile/profile'
import Homepage from './components/homepage/homepage'

import './App.scss';
<<<<<<< HEAD
import './components/forms.scss'
import './index.scss';
=======
import './index.scss'
import './authLogin/styleForm.scss'
>>>>>>> parent of 749e7f4 (test heroku)
  
function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/register">
            <RegisterForm />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
