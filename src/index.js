import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import SignUpForm from './AuthLogin/AuthSignUp'

ReactDOM.render(
  <React.StrictMode>
    <div>
      <h1>Validated Login Form</h1>
      <SignUpForm />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
