import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Box, Typography, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, ButtonBase, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { TextField } from "formik-material-ui"
import { useNavigate } from "react-router-dom"
import axios from 'axios';

/* GLOBAL STYLES */
import global from "../styles/global";
import AdminDash from '../components/AdminDash';

function AdminUsers() {
  let history = useNavigate();

  //CURRENT DATE AND YEAR
  const date = Date();
  const currentYearMinus5 = ((date.substring(11, 15)) - (5));


  /* FORM DIALOG Confirmation DELETE */
  const [openDel, setOpenDel] = useState(false);

  const handleClickOpenDel = () => {
    setOpenDel(true);
  };
  const handleCloseDel = () => {
    setOpenDel(false);
  };

  /* FORM DIALOG EDIT */
  const [openEdit, setOpenEdit] = useState(false);

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };



  /* FORMIK */
  const initialValuesEdit = {
    EditPassword: "",
    EditCPassword: "",
  };

  const validationSchemaEdit = Yup.object().shape({
    EditPassword: Yup.string()
      .min(8, "Password not long enough.")
      .required("Enter your new password."),
    EditCPassword: Yup.string()
      .required("Confirm Password is required.")
      .oneOf([Yup.ref('EditPassword'), null], 'Passwords must match.'),
  });



  // LIST OF USERS
  const [listOfUsers, setlistOfUsers] = useState([]);

  useEffect(() => {
    //VERIFY IF ADMIN YUNG NAKALOGGED IN
    axios.get("http://localhost:3001/register/authAdmin",
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((response) => {
        if (response.data.error) {
          history("/login")
        } else {

          if (!localStorage.getItem("accessToken")) {
            history("/login")
          } else {

            //KINUKUHA YUNG LIST NI USER
            axios.get("http://localhost:3001/register/usersGET",
              {
                headers: {
                  accessToken: localStorage.getItem("accessToken"),
                },
              }).then((response) => {

                setlistOfUsers(response.data);

              });
          }
        }
      });
    /* REMOVE THE ESLINT-DISABLE IF YOU WANT TO SEE WARNING [ITS USELESS EITHERWAY] */
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps



  //MENU DROP DOWN
  const [dataID, setDataID] = useState("");

  const DropDownId = (dataId) => {
    // console.log(dataId)
    setDataID(dataId);
  }



  /* DELETION OF USERS */
  const deleteData = (delId) => {

    handleCloseDel();

    axios.delete(`http://localhost:3001/register/${delId.id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then(() => {
      setlistOfUsers(listOfUsers.filter((val) => {
        return val.id !== delId.id;
      }))
    })
  }



  /* UPDATE OF DATA */
  const updateAccount = (data, { resetForm }) => {
    axios.put(`http://localhost:3001/register/${dataID.id}`,
      {
        id: dataID.id, newPassword: data.EditCPassword
      }, {
      headers: { accessToken: localStorage.getItem("accessToken") },
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
        history("/loading");
      }
      resetForm({ data: "" })
      handleCloseEdit();
    });
  }



  return (
    <AdminDash>
      {/* TITLE */}
      < Box sx={global.adminBoxStyleTitle} >
        <Typography>TTILE</Typography>
      </Box >

      {/* LIST OF USERS */}
      < Box sx={global.adminBoxStyleList} >
        <Box sx={global.adminBoxStylesTable}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="justify"> <Typography sx={global.adminTableTitle}> ID </Typography> </TableCell>
                  <TableCell align="justify"><Typography sx={global.adminTableTitle}> Email </Typography></TableCell>
                  <TableCell align="justify"><Typography sx={global.adminTableTitle}> Password </Typography></TableCell>
                  <TableCell align="justify"><Typography sx={global.adminTableTitle}> Role </Typography></TableCell>
                  <TableCell align="justify"><Typography sx={global.adminTableTitle}> Status </Typography></TableCell>
                  <TableCell align="justify"><Typography sx={global.adminTableTitle}> Edit </Typography></TableCell>
                  <TableCell align="justify"><Typography sx={global.adminTableTitle}> Delete </Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listOfUsers.map((value, key) => {
                  return (
                    <TableRow key={key}>
                      <TableCell align="justify"> <Tooltip enterDelay={500} leaveDelay={50} title={value.id}>
                        <Typography noWrap sx={global.adminTableTypog}> {value.id}</Typography>
                      </Tooltip></TableCell>
                      <TableCell align="justify"> <Tooltip enterDelay={500} leaveDelay={50} title={value.email}>
                        <Typography noWrap sx={global.adminTableTypog}> {value.email}</Typography>
                      </Tooltip></TableCell>
                      <TableCell align="justify"> <Tooltip enterDelay={500} leaveDelay={50} title={value.password}>
                        <Typography noWrap sx={global.adminTableTypog}> {value.password}</Typography>
                      </Tooltip></TableCell>
                      <TableCell align="justify"> <Tooltip enterDelay={500} leaveDelay={50} title={value.role}>
                        <Typography noWrap sx={global.adminTableTypog}> {value.role}</Typography>
                      </Tooltip></TableCell>
                      <TableCell align="justify"> <Tooltip enterDelay={500} leaveDelay={50} title={value.updatedAt.substring(0, 4)}>
                        {value.updatedAt.substring(0, 4) < currentYearMinus5 ? (<Typography sx={global.adminTableTypog}> inactive </Typography>) : (<Typography> active </Typography>)}
                      </Tooltip></TableCell>
                      <TableCell align="justify"><ButtonBase onClick={handleClickOpenEdit} onMouseOver={() => { DropDownId(value) }}> Edit </ButtonBase></TableCell>
                      <TableCell align="justify"><ButtonBase onClick={handleClickOpenDel} onMouseOver={() => { DropDownId(value) }}> Delete </ButtonBase></TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* CREATE NEW USERS */}
        <Box sx={global.adminBoxStylesCreate}>

        </Box>


        {/* EDIT DIALOG POPUP */}

        <Dialog open={openEdit} onClose={handleCloseEdit}>
          <Box sx={{ border: "3px solid black" }}>
            <DialogTitle variant="h4" sx={{ background: "#7251b2", color: "white", }}> Edit User Account </DialogTitle>
            <Formik initialValues={initialValuesEdit} onSubmit={updateAccount} validationSchema={validationSchemaEdit}>
              <Form>
                <DialogContent>
                  <Box sx={global.editMarginAdmin}>
                    <Field
                      autoComplete="off"
                      name="EditPassword"
                      className="InputFieldPopup"
                      component={TextField}
                      type="password"
                      label="Password"
                      helperText={<ErrorMessage name="EditPassword" />}
                      fullWidth
                    />
                  </Box>
                  <Box sx={global.editMarginAdmin}>
                    <Field
                      autoComplete="off"
                      name="EditCPassword"
                      className="InputFieldPopup"
                      component={TextField}
                      type="password"
                      label="Confirm Password"
                      helperText={<ErrorMessage name="EditCPassword" />}
                      fullWidth
                    />
                  </Box>
                </DialogContent>
                <DialogActions sx={{ background: "#7251b2" }}>
                  <ButtonBase sx={global.buttonBaseCancel} onClick={handleCloseEdit}>
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

        {/* DELETE POP UP DIALOG */}

        <Dialog open={openDel} onClose={handleCloseDel}>
          <Box sx={{ border: "3px solid black" }}>
            <DialogContent sx={{ background: "#7251b2" }}>
              <Typography variant="h6" sx={global.adminConfirmTypog}> Are you sure you want to delete this user?</Typography>
            </DialogContent>
            <DialogActions sx={{ background: "white" }}>
              <ButtonBase sx={global.buttonBaseCancel} onClick={handleCloseDel}>
                <Typography sx={global.TypogButCancel}> Cancel </Typography>
              </ButtonBase>
              <ButtonBase sx={global.buttonBase} onClick={() => { deleteData(dataID) }}>
                <Typography sx={global.TypogBut}> Confirm</Typography>
              </ButtonBase>
            </DialogActions>
          </Box>
        </Dialog>



      </Box >
    </AdminDash>
  )
}

export default AdminUsers