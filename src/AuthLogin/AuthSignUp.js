import React from 'react';
import { useFormik } from 'formik';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import * as Yup from 'yup';
import './SignUp.scss'

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
    .required("Insert a password."),
})

const SignUpForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: SignUpSchema,
    onsubmit: (values) => {
      alert(JSON.stringfy(values, null, 2))
    }
  })

  return (
    <div className="main-cover">
      <p className="sign-intro-text">Sign up!</p>
      <div>
        <form onSubmit={formik.handleSubmit} className="sign-form">
          <div className="sign-textfield">
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
          <div className="sign-textfield">
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
          <div className="sign-textfield">
            <TextField
              fullWidth={true}
              name="email"
              label="Input your email"
              value={formik.values.password}
              onChange={formik.handleChange}   
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}    
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
          <div className="sign-textfield">
            <TextField
              fullWidth={true}
              name="password"
              label="Input your password"
              value={formik.values.password}
              onChange={formik.handleChange}   
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}    
              helperText={formik.touched.password && formik.errors.password}
            />
          </div>
          
          <div className="sign-button">
            <Button 
            color="primary" 
            variant="contained" 
            fullWidth={true}
            type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  )

};

export default SignUpForm;