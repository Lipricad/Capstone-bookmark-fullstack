import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Typography, ButtonBase, Paper, } from "@mui/material";
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { TextField } from "formik-material-ui"
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios';

/* GLOBAL STYLES && IMPORTS */
import global from "../styles/global";



function ResetPass() {

  let history = useNavigate();
  let { id } = useParams();
  let { forgotToken } = useParams();

  /* List of User Details */
  const [userData, setUserData] = useState([]);

  useEffect(() => {

    if (localStorage.getItem("accessToken")) {
      history("/add_collection")
    } else {
      axios.get(`http://localhost:3001/register/reset-password/${id}/${forgotToken}`,
        {
          headers: {
            forgotToken: localStorage.getItem("forgotToken"),
          },
        }).then((response) => {

          if (response.data.error) {
            history("/PageNotFound")
          } else {
            setUserData(response.data);
          }
        }).catch((error) => {
          if (error.response) {
            localStorage.removeItem("forgotToken");
            history("/PageNotFound");
          }
        });
    }
    /* REMOVE THE ESLINT-DISABLE IF YOU WANT TO SEE WARNING [ITS USELESS EITHERWAY] */
  }, []); // eslint-disable-line react-hooks/exhaustive-deps     



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



  const changePassword = (data, { resetForm }) => {
    axios.put("http://localhost:3001/register/changepass-forgot", {
      newPassword: data.npassword
    },
      {
        headers: {
          forgotToken: localStorage.getItem("forgotToken"),
        },
      }).then((response) => {
        if (response.data.error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.error,
          })
        } else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: response.data,
            showConfirmButton: false,
            timer: 1500
          })
          localStorage.removeItem("forgotToken");
          history("/login")
        }
        resetForm({ data: "" })
      });
  }



  return (
    <Box sx={{
      display: "flex", flexDirection: "column", minHeight: "100vh", background: 'url(pictures/background/normal_bg.jpg)',
      backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundPosition: "center"
    }}>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10vh" }}>

        <Paper elevation={3} sx={{ flex: 1, textAlign: "center", padding: "3vh 5vw 3vh 5vw", margin: "15vh 0vh 8vh 0vh" }}>

          {/* TITLE */}

          <Typography variant="h3" sx={{ color: "#6633ff", fontWeight: "bold", paddingBottom: "4vh" }}> Change Password </Typography>


          <Typography variant="h6" noWrap sx={{ color: "#6633ff", fontWeight: "bold", paddingBottom: "4vh" }}>

            {userData.email}

          </Typography>


          {/* INPUT */}
          <Formik initialValues={initialValues} onSubmit={changePassword} validationSchema={validationSchema}>
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