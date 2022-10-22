import React, { useContext, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Typography, ButtonBase, Link } from "@mui/material";
import * as Yup from 'yup';
import { TextField } from "formik-material-ui"
import { useNavigate } from "react-router-dom"
import axios from 'axios';


/* GLOBAL STYLES && IMPORTS */
import global from "../styles/global";
import { AuthContext } from "../helpers/AuthContext";


function Login() {

  /* REFRESH PAGE */
  const { setAuthState } = useContext(AuthContext);

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
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email address is required.")
      .email("Please enter a valid email address."),
    password: Yup.string()
      .required("Password is required."),
  });



  /* PASSING DATA TO API */

  const onSubmit = (data, { resetForm }) => {
    axios.post("http://localhost:3001/register/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);

        setAuthState({
          email: response.data.email,
          id: response.data.id,
          status: true
        });

        history(`/add_collection`);
      }
      resetForm({ data: "" })
    });
  };



  return (
    <Box sx={{
      display: "flex", flexDirection: "column", minHeight: "91vh", background: 'url(pictures/background/signin_bg.jpg)',
      backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundPosition: "center"
    }}>

      <Box sx={{ flexGrow: 1, textAlign: "center", marginTop: "10vh" }}>
        <Typography variant="h2" sx={global.TypogTitle}> Sign In </Typography>

        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form>
            <Box sx={{ marginTop: "40px", alignItems: "center" }}>
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

            <Box sx={{ marginTop: "20px" }}>
              <Link
                onClick={() => { history(`/forgot_pass`); }}
                sx={{ textDecoration: "none" }}>
                <Typography sx={{ cursor: "pointer", color: "#6633ff", fontSize: "18px" }}> Forgot Password?</Typography>
              </Link>
            </Box>

            <ButtonBase sx={global.buttonBase} type="submit">
              <Typography variant="h5" sx={global.TypogBut}> Sign In </Typography>
            </ButtonBase>
          </Form>
        </Formik>

        <Box sx={{ marginTop: "20px", marginBottom: "100px" }}>
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