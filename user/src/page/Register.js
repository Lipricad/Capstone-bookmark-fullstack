import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Typography, ButtonBase, useMediaQuery, useTheme } from "@mui/material";
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { TextField } from "formik-material-ui"
import { useNavigate } from "react-router-dom"
import axios from 'axios';



/* GLOBAL STYLES */
import global from "../styles/global";

function Register() {

  /* BREAKPOINT */
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  // console.log(matches);   //checker

  let history = useNavigate();

  /* VERIFY IF THE USER IS LOGGED IN, IF THEY ARE THEY CANT ACCESS THE PAGE*/

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      history("/add_collection")
    }

    /* REMOVE THE ESLINT-DISABLE IF YOU WANT TO SEE WARNING [ITS USELESS EITHERWAY] */
  }, []); // eslint-disable-line react-hooks/exhaustive-deps     


  /* FORMIK */
  const initialValues = {
    email: "",
    password: "",
    cpassword: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email address is required.")
      .email("Please enter a valid email address."),
    password: Yup.string()
      .min(8, "Password not long enough.")
      .required("Password is required."),
    cpassword: Yup.string()
      .required("Confirm Password is required.")
      .oneOf([Yup.ref('password'), null], 'Passwords must match.'),
  });

  /* PASSING DATA TO DATABASE */

  const onSubmit = (data, { resetForm }) => {
    axios.post("http://localhost:3001/register", data).then((response) => {
      if (response.data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.error,
        })
      } else {
        history(`/login`);
      }
      resetForm({ data: "" })
    });
  };

  return (
    <Box sx={{
      display: "flex", minHeight: "100vh", background: 'url(pictures/background/reg_bg.jpg)',
      backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundPosition: "center"
    }}>

      <Box sx={{ flexGrow: 1, textAlign: "center", marginTop: "20vh", marginBottom: "100px" }}>
        <Typography variant="h3" sx={global.TypogTitle}> Join Us </Typography>

        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
          <Form>
            <Box sx={{ marginTop: "40px" }}>
              <Field
                autoComplete="off"
                name="email"
                className="InputField"
                component={TextField}
                label="Email Address"
                helperText={<ErrorMessage name="email" />}
              />
            </Box>

            <Box sx={{ marginTop: "40px" }}>

              <Field
                autoComplete="off"
                name="password"
                className="InputField"
                component={TextField}
                type="password"
                label="Password"
                helperText={<ErrorMessage name="password" style={{ color: "red" }} />}
              />
            </Box>

            <Box sx={{ marginTop: "40px" }}>
              <Field
                autoComplete="off"
                name="cpassword"
                className="InputField"
                component={TextField}
                type="password"
                label="Confirm Password"
                helperText={<ErrorMessage name="cpassword" />}
              />
            </Box>
            <ButtonBase sx={global.buttonBase} type="submit" >
              <Typography variant="h5" sx={global.TypogBut}> Join Now</Typography>
            </ButtonBase>
          </Form>
        </Formik>

      </Box>

      {matches ? (null) : (<Box sx={{ flexGrow: 1.5 }}></Box>)}
    </Box>
  )
}

export default Register