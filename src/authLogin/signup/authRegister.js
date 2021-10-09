import React, {useState} from 'react';
import { useFormik } from 'formik';
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Button } from '@mui/material';
import * as Yup from 'yup';
import { PropTypes } from "prop-types";

import AuthService from "../authServices/auth.service";  
  
  const registerSchema = Yup.object().shape({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Insert your name.')
      .matches(/^[a-zA-Z]/, 'Name must contain only letters.'),
    username: Yup.string()
      .min(3, 'Username is too short - should be 3 chars minimum.')
      .required('Insert your username.')
      .matches(/^[a-zA-Z0-9_.-]*$/, 'Username contains symbols different than: "_" "-" and "."'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Insert your email.'),  
    password: Yup.string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/(?=.*[0-9])/, "Password must contain a number.")
      .matches(/(?=.*[a-zA-Z])/, "Password must contain a letter.")
      .required("Insert a password."),
    passwordConfirmation: Yup.string()
      .required("Confirm your password.")
      .test('passwords-match', 'Passwords must match', function(value) {  
      return this.parent.password === value
    }) 
  })

const RegisterForm = (props) => {  
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  
  const handleRegister = e => {
    e.preventDefault();

    const firstName =formik.values.firstName;
    const username = formik.values.username;
    const email = formik.values.username;
    const password = formik.values.password;

    AuthService.register(firstName, username, email, password).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      }
    );
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: registerSchema,
  })

  return ( 
    <div className="main-cover">
      <p className="form-intro-text">Register!</p>
      <div>
        <form 
        onSubmit={formik.handleSubmit && handleRegister}
        className="form-main">
          <div className="form-textfield">
            <TextField
              fullWidth={true}
              name="firstName"
              label="Input your first name"
              value={formik.values.firstName}
              onChange={formik.handleChange}   
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}    
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </div>         
          <div className="form-textfield">
            <TextField
              fullWidth={true}
              name="username"
              label="Input your username"
              value={formik.values.username}
              onChange={formik.handleChange}   
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}    
              helperText={formik.touched.username && formik.errors.username}
            />
          </div>
          <div className="form-textfield">
            <TextField
              fullWidth={true}
              name="email"
              type="email"
              label="Input your email"
              value={formik.values.email}
              onChange={formik.handleChange}   
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}    
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
          <div className="form-textfield">
            <TextField
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Input your password"
              value={formik.values.password}
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}    
              helperText={formik.touched.password && formik.errors.password}
              fullWidth={true}
              InputProps={{ // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>
          <div className="form-textfield">
            <TextField
              name="passwordConfirmation"
              type={showPassword ? 'text' : 'password'}
              label="Confirm your password"
              value={formik.values.passwordConfirmation}
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur}
              error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}    
              helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
              fullWidth={true}
              InputProps={{ // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>
          
          <div className="form-button">
            <Button 
            color="primary" 
            variant="contained" 
            fullWidth={true}
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default RegisterForm;