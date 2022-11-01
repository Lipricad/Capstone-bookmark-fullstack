import React, { useState, useEffect } from 'react'
import { Box, Typography, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom"
import axios from 'axios';

/* GLOBAL STYLES */
import global from "../styles/global";
import AdminDash from '../components/AdminDash';

function AdminUsers() {
  let history = useNavigate();

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
                    <TableRow>
                      <TableCell align="justify"><Typography noWrap sx={global.adminTableTypog}> {value.id}</Typography></TableCell>
                      <TableCell align="justify"><Typography noWrap sx={global.adminTableTypog}> {value.email}</Typography></TableCell>
                      <TableCell align="justify"><Typography noWrap sx={global.adminTableTypog}> {value.password}</Typography></TableCell>
                      <TableCell align="justify"><Typography noWrap sx={global.adminTableTypog}> {value.role}</Typography></TableCell>
                      <TableCell align="justify"><Typography noWrap sx={global.adminTableTypog}> {value.updatedAt}</Typography></TableCell>
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
      </Box >
    </AdminDash>
  )
}

export default AdminUsers