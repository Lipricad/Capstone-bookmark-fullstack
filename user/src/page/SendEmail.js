import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Typography, ButtonBase, Paper, } from "@mui/material";
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { TextField } from "formik-material-ui"
import { useNavigate } from "react-router-dom"
import axios from 'axios';

/* GLOBAL STYLES && IMPORTS */
import global from "../styles/global";

function SendEmail() {

  let history = useNavigate();

  useEffect(() => {

    if (localStorage.getItem("accessToken")) {
      history("/add_collection")

    }

    /* REMOVE THE ESLINT-DISABLE IF YOU WANT TO SEE WARNING [ITS USELESS EITHERWAY] */
  }, []);// eslint-disable-line react-hooks/exhaustive-deps     

  /* FORMIK */
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email address is required.")
      .email("Please enter a valid email address."),
  });



  /* PASSING DATA TO API */
  const onSubmit = (data, { resetForm }) => {
    axios.post("http://localhost:3001/register/forgot-password", { email: data.email }
    ).then((response) => {
      if (response.data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.error,
        })
      }
      else {
        localStorage.setItem("forgotToken", response.data.token);
        Swal.fire(
          'Email Sent!',
          'Check your email.',
          'success'
        )
      }
      resetForm({ data: "" })
    });
  };

  return (
    <Box sx={{ display: "flex", minHeight: "91vh", flexDirection: "column" }}>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>

        <Paper elevation={3} sx={{ flex: 1, textAlign: "center", padding: "3vh 5vw 3vh 5vw", margin: "15vh 0vh 8vh 0vh" }}>

          {/* TITLE */}

          <Typography variant="h3" sx={{ color: "#6633ff", fontWeight: "bold", paddingBottom: "4vh" }}> Forgot Password </Typography>
          <Typography variant="h5" sx={{ color: "#6633ff", fontWeight: "bold", paddingBottom: "1vh", textAlign: "left" }}> Email Address </Typography>

          {/* INPUT */}
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
              <Box sx={{ alignItems: "center" }}>

                <Field
                  autoComplete="off"
                  name="email"
                  className="InputField"
                  component={TextField}
                  label="Email Address"
                  helperText={<ErrorMessage name="email" />}
                />

              </Box>

              {/* BUTTON FOR CHANGE PASSWORD */}
              <ButtonBase sx={global.buttonBasefp} type="submit">
                <Typography variant="h5" sx={global.TypogBut}> Send Email</Typography>
              </ButtonBase>

            </Form>
          </Formik>

        </Paper>

      </Box>

      <Box sx={{ flex: 5 }}></Box>

    </Box>
  )
}

export default SendEmail