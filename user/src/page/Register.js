import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Typography, ButtonBase, TextField, useMediaQuery, useTheme } from "@mui/material";
import * as Yup from 'yup';


/* GLOBAL STYLES */
import global from "../styles/global";

function Register() {

  /* BREAKPOINT */
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  console.log(matches);   //checker

  /* FORMIK */
  const initialValues = {
    email: "",
    password: "",
    cpassword: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("You must input a Title!"),
    password: Yup.string().min(3).max(15).required(),
    cpassword: Yup.string().min(3).max(15).required(),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box sx={{
      display: "flex", minHeight: "98vh", background: 'url(pictures/background/reg_bg.jpg)',
      backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundPosition: "center"
    }}>

      <Box sx={{ flexGrow: 1, textAlign: "center", marginTop: "6vh" }}>
        <Typography variant="h2" sx={global.TypogTitle}> Join Us </Typography>

        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
          <Form>
            <Box sx={{ marginTop: "40px" }}>
              <Field
                autoComplete="off"
                id="inputRegister"
                name="email"
                className="InputField"
                // component={TextField}
                // variant="outlined"
                label="Email Address"
              />
              <ErrorMessage name="email" component="span" />
            </Box>

            <Box sx={{ marginTop: "40px" }}>

              <Field
                autoComplete="off"
                id="inputRegister"
                name="password"
                className="InputField"
                // component={TextField}
                // variant="outlined"
                label="Password"
              />
              <ErrorMessage name="password" component="span" />
            </Box>

            <Box sx={{ marginTop: "40px" }}>
              <Field
                autoComplete="off"
                id="inputRegister"
                name="cpassword"
                className="InputField"
                // component={TextField}
                // variant="outlined"
                label="Confirm Password"
              />
              <ErrorMessage name="cpassword" component="span" />
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