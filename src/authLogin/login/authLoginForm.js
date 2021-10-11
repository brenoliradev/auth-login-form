import React, {useState} from 'react';
import { useFormik } from 'formik';
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Button } from '@mui/material';
import * as Yup from 'yup';

import { useHistory } from "react-router";
import AuthService from "../authServices/auth.service";  

const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Username is too short - should be 3 chars minimum.')
      .required('Insert your username.')
      .matches(/^[a-zA-Z0-9_.-]*$/, 'Username contain symbols different than: "_" "-" and "."'),
    password: Yup.string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/(?=.*[0-9])/, "Password must contain a number.")
      .matches(/(?=.*[a-zA-Z])/, "Password must contain a letter.")
      .required("Insert a password."),
  })

const LoginForm = (props) => {
  const history = useHistory();

  // password visibility icon
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("");

  const handleLogin = e => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    const username = formik.values.username;
    const password = formik.values.password;
    
    AuthService.login(username, password)
    .then(
      response => {
        history.push({
          pathname:  "/profile",
          state: {
            response: message
          } 
        })
        document.location.reload(true);
      }, error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
          error.toString();

          alert(resMessage)
        }
    )
  }
  
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginSchema,
  })

  return ( 
    <div className="main-cover">
      <p className="form-intro-text">Login!</p>
      <div>
        <form 
        onSubmit={formik.handleSubmit && handleLogin}
        className="form-main">
          <div className="form-textfield">
            <TextField
              fullWidth={true}
              name="username"
              type="text"
              label="Input your usernmae"
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
              type={showPassword ? "text" : "password" }
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
        <p className="redirect-text"><a href="/register">I don't have an account</a></p>
      </div>
    </div>
  )
};
  
export default LoginForm;