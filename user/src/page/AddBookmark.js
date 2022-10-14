import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Typography, ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Tooltip, Menu, MenuItem } from "@mui/material"
import * as Yup from 'yup';
import { TextField } from "formik-material-ui"
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios';

/* PARENT PAGES */
import AddCollection from './AddCollection';

/* GLOBAL STYLES */
import global from "../styles/global";

function AddBookmark() {

  let history = useNavigate();

  /* FORM DIALOG POPUP */
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };



  /* LIST OF DATA */
  let { id } = useParams();

  const [listOfBookmark, setlistOfBookmark] = useState([]);

  useEffect(() => {
    /* CATEGORY */
    axios.get(`http://localhost:3001/category/${id}`).then((response) => {
      console.log(response.data)
    });



    /* BOOKMARK */
    axios.get(`http://localhost:3001/bookmark/${id}`).then((response) => {
      setlistOfBookmark(response.data);
    });
    /* REMOVE THE ESLINT-DISABLE IF YOU WANT TO SEE WARNING [ITS USELESS EITHERWAY] */
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps     



  /* OPEN NEW TAB */
  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };



  //MENU DROP DOWN
  const [Drop, setDrop] = useState(null);
  const [dataID, setDataID] = useState("");

  const DropDownId = (dataId) => {
    setDataID(dataId);
  }
  const MenuDropDown = e => {
    setDrop(e.currentTarget);
  }
  const MenuDropDownClose = e => {
    setDrop(null);
  }



  /* FORMIK */
  const initialValues = {
    BookmarkName: "",
    LinkAddress: ""
  };

  const validationSchema = Yup.object().shape({
    BookmarkName: Yup.string()
      .required("Bookmark name is required."),
    LinkAddress: Yup.string()
      .required("Address link is required."),
  });



  /* PASSING DATA TO DATABASE */
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/bookmark",
      {
        BookmarkName: data.BookmarkName, Bookmark_URL: data.LinkAddress, CategoryId: id
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      if (response.data.error) {
        console.log("400: unverified");
      } else {
        console.log("200");
        /* UPDATE THE PAGE EVERYTIME YOU ADD */

        const bookmarkToUpdate = { BookmarkName: data.BookmarkName, Bookmark_URL: data.LinkAddress };
        setlistOfBookmark([...listOfBookmark, bookmarkToUpdate]);

        history(0);  //TEMPORARRYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
      }
      handleClose();
    });
  };



  /* DELETION OF DATA */
  const deleteData = (id) => {

    MenuDropDownClose();

    axios.delete(`http://localhost:3001/bookmark/${id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then(() => {
      setlistOfBookmark(listOfBookmark.filter((val) => {
        return val.id !== id;
      }))
    })
  }


  return (
    <AddCollection>

      <Box sx={{ display: "flex", flexDirection: "row", minHeight: "13vh", flex: "1 1 auto" }}>

        {/* ADD BOOKMARK BUTTON */}


        <Box sx={{ flex: "1", position: "fixed", right: "30px", zIndex: "12" }}>
          <Box sx={{ paddingRight: "10px" }}>
            <ButtonBase sx={global.buttonBase} onClick={handleClickOpen} >
              <Typography variant="h5" sx={global.TypogBut}> Add Bookmark </Typography>
            </ButtonBase>
          </Box>


          {/* 3.1 DIALOG POPUP FORM */}

          <Dialog open={open} onClose={handleClose}>
            <Box sx={{ border: "3px solid black" }}>
              <DialogTitle variant="h4" sx={{ background: "#272727", color: "white", }}>Add a Bookmark</DialogTitle>

              <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                  <DialogContent>
                    <Box sx={{ padding: "20px", borderTop: "4px solid black" }}>
                      <Field
                        autoComplete="off"
                        name="BookmarkName"
                        className="InputFieldPopup"
                        component={TextField}
                        label="Bookmark Name"
                        helperText={<ErrorMessage name="BookmarkName" />}
                      />
                    </Box>
                    <Box sx={{ padding: "20px", borderBottom: "4px solid black" }}>
                      <Field
                        autoComplete="off"
                        name="LinkAddress"
                        className="InputFieldPopup"
                        component={TextField}
                        label="Address Link"
                        helperText={<ErrorMessage name="LinkAddress" />}
                      />
                    </Box>
                  </DialogContent>
                  <DialogActions sx={{ background: "#272727" }}>
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

      </Box>



      {/* LIST OF BOOKMARK */}
      <Box sx={{ flex: "1", display: "flex", flexDirection: "row", flexWrap: "wrap", marginBottom: "200px" }}>

        {listOfBookmark.map((value, key) => {
          return (
            <Paper elevation={3} key={key} sx={{
              margin: "1vh 1vw 2vh 1.5vw", width: "250px", height: "125px", display: "flex", flexDirection: "row",
              background: "#3b3b3b", border: "1px solid #272727"
            }}>


              <Box sx={{ flex: "6", padding: "50px 0" }}>
                <ButtonBase onClick={() => openInNewTab(value.Bookmark_URL)}>
                  <Tooltip title={value.BookmarkName} sx={{ fontSize: "20px" }}>

                    <Typography variant="h6" noWrap sx={{ marginLeft: "10px", color: "white", textAlign: "center", maxWidth: "175px" }}>

                      {/* LOGO OF THE BOOKMARK LOGOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO */}
                      <img height="16" width="16" alt="icon" src={`http://www.google.com/s2/favicons?domain=${value.Bookmark_URL}`} />

                      {"    " + value.BookmarkName}
                    </Typography>

                  </Tooltip>
                </ButtonBase>
              </Box>

              <Box sx={{ flex: "1" }}>

                 {/* BUTTON FOR RENAME AND DELETE */}

                <IconButton onClick={MenuDropDown} onMouseOver={() => { DropDownId(value.id) }}>
                  <img
                    src="/pictures/assets/3_dots.svg"
                    alt="Menubar"
                    height="25"
                    width="25"
                  />
                </IconButton>

                {/* DROPDOWN MENU */}

                <Menu onClose={MenuDropDownClose} anchorEl={Drop} open={Boolean(Drop)} sx={global.menuStyle}>
                  <MenuItem> Rename </MenuItem>
                  <MenuItem onClick={() => { deleteData(dataID) }}> Delete </MenuItem>
                </Menu>

              </Box>

            </Paper>
          )
        })}
      </Box>

    </AddCollection>
  )
}

export default AddBookmark