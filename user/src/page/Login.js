import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Typography, ButtonBase, Link } from "@mui/material";
import * as Yup from 'yup';
import { TextField } from "formik-material-ui"
import { useNavigate } from "react-router-dom"
// import axios from 'axios';


/* GLOBAL STYLES */
import global from "../styles/global";

function Login() {

  /* PASSING DATA TO DATABASE */
  let history = useNavigate();

    /* FORMIK */
    const initialValues = {
      email: "",
      password: "",
    };
  
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .required("Email address is required.")
        .email("Please enter a valid email address."),
      password: Yup.string()
        .min(8, "Password not long enough.")
        .required("Password is required."),
    });



  return (
    <Box sx={{
      display: "flex", flexDirection: "column", minHeight: "100vh", background: 'url(pictures/background/signin_bg.jpg)',
      backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundPosition: "center"
    }}>

      <Box sx={{ flexGrow: 1, textAlign: "center", marginTop: "6vh" }}>
        <Typography variant="h2" sx={global.TypogTitle}> Sign In </Typography>

        <Formik initialValues={initialValues} onSubmit={""} validationSchema={validationSchema}>
          <Form>
            <Box sx={{ marginTop: "40px", alignItems: "center" }}>
              <Field
                autoComplete="off"
                id="inputRegister"
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
                id="inputRegister"
                name="password"
                className="InputField"
                component={TextField}
                type="password"
                label="Password"
                helperText={<ErrorMessage name="password" style={{ color: "red" }} />}
              />
            </Box>

            <Box sx={{ marginTop: "20px" }}>
              <Link sx={{ textDecoration: "none" }}>
                <Typography sx={{ cursor: "pointer", color: "#6633ff", fontSize: "18px" }}> Forgot Password?</Typography>
              </Link>
            </Box>

            <ButtonBase sx={global.buttonBase} type="submit">
              <Typography variant="h5" sx={global.TypogBut}> Sign In </Typography>
            </ButtonBase>
          </Form>
        </Formik>

        <Box sx={{ marginTop: "20px" }}>
          <Typography> Dont have an account? </Typography>
          <Link
            onClick={() => { history(`/register`); }}
            sx={{ textDecoration: "none" }}>
            <Typography sx={{ cursor: "pointer", color: "#FF5353", fontSize: "18px" }}> Register Now!</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default Login