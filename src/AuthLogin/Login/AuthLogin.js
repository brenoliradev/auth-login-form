import React, {useState} from 'react';
import { useFormik } from 'formik';
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Button } from '@mui/material';
import * as Yup from 'yup';
import { PropTypes } from "prop-types";

const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Insert your email.'),  
    password: Yup.string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/(?=.*[0-9])/, "Password must contain a number.")
      .matches(/(?=.*[a-zA-Z])/, "Password must contain a letter.")
      .required("Insert a password."),
  })

const LoginForm = ({setToken}) => {
    // const [SignSubmit] = useState();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
  
    const handleSign = async e => {
      e.preventDefault();
  
//       const token = await signUser({
//           SignSubmit
//         }); 
  
//       setToken(token);
    }
  
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: LoginSchema,
    })
  
    return ( 
      <div className="main-cover">
        <p className="form-intro-text">Login!</p>
        <p className="form-sub-text">made with sessionStorage*</p>
        <div>
          <form 
          onSubmit={formik.handleSubmit && handleSign}
          className="form-main">
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
        </div>
      </div>
    )
  };
  
  LoginForm.propTypes = {
    setToken: PropTypes.func.isRequired
  }
  
  export default LoginForm;