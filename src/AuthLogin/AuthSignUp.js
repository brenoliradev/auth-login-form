import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './SignUp.scss'
 
const SignUpForm = () => {
  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
        password: Yup.string()
          .min(8, 'Must be 8 characters or more')
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form className="sign-form">
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" type="text" />
 
        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" type="text" />
 
        <label htmlFor="email">Email Address</label>
        <Field name="email" type="email" />

        <label htmlFor="password">Password</label>
        <Field name="password" type="text" />

        <button type="submit">Submit</button>

      <div className="sign-error">
        <p><ErrorMessage name="firstName" /></p>
        <p><ErrorMessage name="lastName" /></p>
        <p><ErrorMessage name="email" /></p>
        <p><ErrorMessage name="password" /></p>
      </div>
      </Form>
    </Formik>
  );
};

export default SignUpForm;