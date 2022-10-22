import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Typography, ButtonBase, Paper, } from "@mui/material";
import * as Yup from 'yup';
import { TextField } from "formik-material-ui"
// import { useNavigate } from "react-router-dom"
// import axios from 'axios';

/* GLOBAL STYLES && IMPORTS */
import global from "../styles/global";




function ResetPass() {

  // let history = useNavigate();


  /* FORMIK */
  const initialValues = {
    npassword: "",
    ncpassword: "",
  };

  const validationSchema = Yup.object().shape({
    npassword: Yup.string()
      .min(8, "Password not long enough.")
      .required("Enter your new password."),
    ncpassword: Yup.string()
      .required("Confirm Password is required.")
      .oneOf([Yup.ref('npassword'), null], 'Passwords must match.'),
  });



  return (
    <Box sx={{
      display: "flex", flexDirection: "column", minHeight: "91vh", background: 'url(pictures/background/fpass_bg.jpg)',
      backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundPosition: "center"
    }}>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>

        <Paper elevation={3} sx={{ flex: 1, textAlign: "center", padding: "3vh 5vw 3vh 5vw", margin: "15vh 0vh 8vh 0vh" }}>

          {/* TITLE */}

          <Typography variant="h3" sx={{ color: "#6633ff", fontWeight: "bold", paddingBottom: "4vh" }}> Change Password </Typography>

          {/* INPUT */}
          <Formik initialValues={initialValues} onSubmit={""} validationSchema={validationSchema}>
            <Form>
              <Box sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
                <Box>
                  <Field
                    autoComplete="off"
                    name="npassword"
                    className="InputField"
                    component={TextField}
                    type="password"
                    label="Password"
                    helperText={<ErrorMessage name="npassword" />}
                  />
                </Box>
                <Box sx={{ marginTop: "30px" }}>
                  <Field
                    autoComplete="off"
                    name="ncpassword"
                    className="InputField"
                    component={TextField}
                    type="password"
                    label="Confirm Password"
                    helperText={<ErrorMessage name="ncpassword" />}
                  />
                </Box>
              </Box>

              {/* BUTTON FOR CHANGE PASSWORD */}
              <ButtonBase sx={global.buttonBasefp} type="submit">
                <Typography variant="h5" sx={global.TypogBut}> Change Password </Typography>
              </ButtonBase>

            </Form>
          </Formik>

        </Paper>

      </Box>

      <Box sx={{ flex: 5 }}></Box>

    </Box>
  )
}

export default ResetPass