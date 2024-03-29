import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, ButtonBase, Typography, Paper, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, } from "@mui/material";
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { TextField } from "formik-material-ui"
import { useNavigate } from "react-router-dom"
import axios from 'axios';

/* GLOBAL STYLES */
import global from "../styles/global";

function Account() {

  let history = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history("/login")
    } else {
      axios.get("http://localhost:3001/register/userdetails",
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }).then((response) => {
          setlistOfDetails(response.data);
        });
    }
    /* REMOVE THE ESLINT-DISABLE IF YOU WANT TO SEE WARNING [ITS USELESS EITHERWAY] */
  }, []) // eslint-disable-line react-hooks/exhaustive-deps



  /* List of User Details */
  const [listOfDetails, setlistOfDetails] = useState([]);

  /* FORM DIALOG POPUP */
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };



  /* FORMIK */
  const initialValues = {
    OldPassword: "",
    NewPassword: "",
    NewCPassword: "",
  };

  const validationSchema = Yup.object().shape({
    OldPassword: Yup.string()
      .required("Old password is required."),
    NewPassword: Yup.string()
      .min(8, "Password not long enough.")
      .required("Enter your new password."),
    NewCPassword: Yup.string()
      .required("Confirm Password is required.")
      .oneOf([Yup.ref('NewPassword'), null], 'Passwords must match.'),
  });



  //CHANGE PASSWORD
  const changePassword = (data, { resetForm }) => {
    axios.put("http://localhost:3001/register/changepass", {
      oldPassword: data.OldPassword, newPassword: data.NewPassword
    },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((response) => {
        if (response.data.error) {
          handleClose();
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
          history("/loading")
        }
        resetForm({ data: "" })
      });
  }



  return (
    <Box sx={{
      display: "flex", minHeight: "100vh", flexDirection: "column", background: 'url(pictures/background/normal_bg.jpg)',
      backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundPosition: "center"
    }}>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10vh" }}>

        <Paper elevation={3} sx={{ flex: 1, textAlign: "center", padding: "25px 75px 50px 75px", margin: "10vh 0vh 8vh 0vh" }}>

          {/* TITLE */}

          <Typography variant="h4" sx={{ color: "#6633ff", fontWeight: "bold", paddingBottom: "6vh" }}> Personal Details</Typography>

          {/* BODY */}

          <Typography sx={{ color: "#6633ff", fontWeight: "bold", fontSize: "21px", textAlign: "left" }}>
            Contact Info
          </Typography>

          {listOfDetails.map((value, key) => {
            return (
              <Tooltip
                key={key}
                enterDelay={1000} leaveDelay={50}
                title={
                  value.email
                }>

                <Typography noWrap sx={{ color: "#6633ff", fontWeight: "bold", fontSize: "18px", paddingTop: "25px", maxWidth: "400px" }}>
                  {value.email}
                </Typography>

              </Tooltip>
            )
          })}


          <Typography sx={{ color: "#6633ff", fontWeight: "bold", fontSize: "21px", textAlign: "left", padding: "40px 0px 0px 0px" }}>
            Password and Security
          </Typography>

          {/* BUTTON FOR CHANGE PASSWORD */}

          <ButtonBase sx={global.buttonBase} onClick={handleClickOpen}>
            <Typography variant="h6" sx={global.TypogBut}> Change password</Typography>
          </ButtonBase>
        </Paper>

      </Box>

      <Box sx={{ flex: 5 }}></Box>

      {/* 3.1 DIALOG POPUP FORM */}

      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ border: "3px solid black" }}>
          <DialogTitle variant="h4" sx={{ background: "#7251b2", color: "white", }}> Change Password: </DialogTitle>

          <Formik initialValues={initialValues} onSubmit={changePassword} validationSchema={validationSchema}>
            <Form>
              <DialogContent>
                <Box sx={{ padding: "20px", borderTop: "4px solid black" }}>
                  <Field
                    autoComplete="off"
                    name="OldPassword"
                    className="InputFieldPopup"
                    component={TextField}
                    type="password"
                    label="Old Password"
                    helperText={<ErrorMessage name="OldPassword" />}
                  />
                </Box>
                <Box sx={{ padding: "20px" }}>
                  <Field
                    autoComplete="off"
                    name="NewPassword"
                    className="InputFieldPopup"
                    component={TextField}
                    type="password"
                    label="New Password"
                    helperText={<ErrorMessage name="NewPassword" />}
                  />
                </Box>
                <Box sx={{ padding: "20px", borderBottom: "4px solid black" }}>
                  <Field
                    autoComplete="off"
                    name="NewCPassword"
                    className="InputFieldPopup"
                    component={TextField}
                    type="password"
                    label="Confirm Password"
                    helperText={<ErrorMessage name="NewCPassword" />}
                  />
                </Box>
              </DialogContent>
              <DialogActions sx={{ background: "#7251b2" }}>
                <ButtonBase sx={global.buttonBaseCancel} onClick={handleClose}>
                  <Typography sx={global.TypogButCancel}> Cancel </Typography>
                </ButtonBase>
                <ButtonBase sx={global.buttonBase} type="submit">
                  <Typography sx={global.TypogBut}> Confirm</Typography>
                </ButtonBase>
              </DialogActions>
            </Form>
          </Formik>
        </Box>
      </Dialog>
    </Box>
  )
}

export default Account