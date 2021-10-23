import React, {useState} from 'react';
import { useFormik } from 'formik';
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Button } from '@mui/material';
import * as Yup from 'yup';

import AuthService from "../authServices/auth.service";  
import { useHistory } from 'react-router';
  
  const registerSchema = Yup.object().shape({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Insert your name.')
      .matches(/^[a-zA-Z]*$/, 'Name must contain only letters.'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Insert your email.'),  
    username: Yup.string()
      .min(3, 'Username is too short - should be 3 chars minimum.')
      .required('Insert your username.')
      .matches(/^[a-zA-Z0-9_.-]*$/, 'Username contains symbols different than: "_" "-" and "."'),
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
  const history = useHistory();

  const [show1Password, setShow1Password] = useState(false);
  const [show2Password, setShow2Password] = useState(false);

  const handleClickShow1Password = () => setShow1Password(!show1Password);
  const handleMouseDown1Password = () => setShow1Password(!show1Password);
  const handleClickShow2Password = () => setShow2Password(!show2Password);
  const handleMouseDown2Password = () => setShow2Password(!show2Password);

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  
  const handleRegister = () => {
    const firstName =formik.values.firstName;
    const email = formik.values.email;
    const username = formik.values.username;
    const password = formik.values.password;

    AuthService.register(firstName, username, email, password)
    .then(
      response => {
        setMessage(response.data.message);
        setSuccessful(true);
        formik.resetForm();
        
        history.push({
          pathname:  "/profile",
          state: {
            response: response.data.message
          } 
        })
        document.location.reload(true);
      }, error => {
        const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        alert(resMessage)
      })
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      email: '',
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      handleRegister();
    }
  })

  return ( 
    <div className="main-cover">
      <p className="form-intro-text">Register!</p>
        <form 
          onSubmit={formik.handleSubmit}
          className="form-main">
          <div className="form-textfield">
            <TextField
              fullWidth={true}
              name="firstName"
              type="text"
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
              fullWidth={true}
              name="username"
              type="text"
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
              name="password"
              type={show1Password ? 'text' : 'password'}
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
                      onClick={handleClickShow1Password}
                      onMouseDown={handleMouseDown1Password}
                    >
                      {show1Password ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>
          <div className="form-textfield">
            <TextField
              name="passwordConfirmation"
              type={show2Password ? 'text' : 'password'}
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
                      onClick={handleClickShow2Password}
                      onMouseDown={handleMouseDown2Password}
                    >
                      {show2Password ? <Visibility /> : <VisibilityOff />}
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
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              fullWidth={true}
            >
              Submit
            </Button>
          </div>

        </form>
        <p className="redirect-text"><a href="/profile">I already have an account</a></p>

    </div>
  )
};

export default RegisterForm;