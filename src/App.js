import React, {useState} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SignUpForm from './AuthLogin/SignUp/AuthSignUp'
import LoginForm from './AuthLogin/Login/AuthLogin'
import Homepage from './components/Homepage'

import SignToken from './AuthLogin/SignUp/SignToken';

import './App.scss';
import './AuthLogin/StyleForm.scss'

function getToken() {
  const tokenStringSign = sessionStorage.getItem('SignSession');
  const userTokenSign = JSON.parse(tokenStringSign);
  return userTokenSign?.SignSession
}
  
function App() {
  const tokenLogin = sessionStorage.getItem("LoginSession")
  const {tokenSign, setTokenSign} = SignToken()

if (!tokenSign) {
  return <SignUpForm setTokenSign={setTokenSign}/>
} 
if (!tokenLogin) {
  return <LoginForm/>
}

return (
  <div className="main-wrapper">
  <BrowserRouter>
    <Switch>
      <Route path="/signup">
        <SignUpForm />
      </Route>
      <Route path="/">
        <Homepage />
      </Route>
    </Switch>
  </BrowserRouter>
  </div>
);
}

export default App;
