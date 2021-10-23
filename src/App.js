import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import RegisterForm from './components/authForms/signup/authRegister';
import LoginForm from './components/authForms/login/authLogin';
import Profile from './components/profile/profile';
import Homepage from './components/homepage/homepage';

import './App.scss';
import './components/authForms/forms.scss';
import './index.scss';
    
function App() {
  return (
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
  );
}

export default App;
