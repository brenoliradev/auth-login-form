import React, {useState} from 'react';
import { useFormik } from 'formik';
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Button } from '@mui/material';
import * as Yup from 'yup';
import { PropTypes } from "prop-types";

// async function signUser(credentials) {
//     return fetch('http://localhost:8080/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(credentials)
//     })
//       .then(data => data.json())
//    }    

   const SignUpSchema = Yup.object().shape({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Insert your name.'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Insert your last name.'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Insert your email.'),  
    password: Yup.string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/(?=.*[0-9])/, "Password must contain a number.")
      .matches(/(?=.*[a-zA-Z])/, "Password must contain a letter.")
      .required("Insert a password."),
  })

const SignUpForm = ({setTokenSign}) => {  
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSign = async e => {
    e.preventDefault();
    
    var session = {
      firstName: formik.values.firstName,
      lastName: formik.values.lastName,
      email: formik.values.email,
      password: formik.values.password
    }

    sessionStorage.setItem('SignSession', JSON.stringify(session));
    JSON.parse(sessionStorage.user);

    setTokenSign(session);
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: SignUpSchema,
  })

  return ( 
    <div className="main-cover">
      <p className="form-intro-text">Sign up!</p>
      <p className="form-sub-text">made with sessionStorage*</p>
      <div>
        <form 
        onSubmit={formik.handleSubmit && handleSign}
        className="form-main">
          <div className="form-textfield">
            <TextField
              id="first"
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
              fullWidth
              name="lastName" 
              label="Input your last name"
              value={formik.values.lastName}
              onChange={formik.handleChange}   
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}    
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </div>
          <div className="form-textfield">
            <TextField
              id="signEmail"
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
              id="signPassword"
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

SignUpForm.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default SignUpForm;