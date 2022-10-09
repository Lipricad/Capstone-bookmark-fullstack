import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Typography, ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, Link } from "@mui/material"
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

        history(0);
      }
      handleClose();
    });
  };



  return (
    <AddCollection>



      {/* LIST OF BOOKMARK */}

      {listOfBookmark.map((value, key) => {
        return (
          <Box key={key}>
            <Link onClick={() => openInNewTab(value.Bookmark_URL)} sx={{ textDecoration: "none"}}>
              <Typography variant="h4" sx={{ color: "white", marginTop: "100px", cursor: "pointer" }}>

                {value.BookmarkName}

              </Typography>
            </Link>
          </Box>
        )
      })}


      {/* END OF LIST OF BOOKMARK */}



      {/* ADD BOOKMARK BUTTON */}

      <Box sx={{ flex: "2.5", textAlign: "left", marginBottom: "200px" }}>                 {/* TEMPORARYYYYYYYYYYYYYYYYYYYYYYYYYY MARGIN*/}
        <ButtonBase sx={global.buttonBookmark} onClick={handleClickOpen}>
          <Typography sx={global.TypogBut}> Add Bookmark </Typography>
        </ButtonBase>

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
    </AddCollection>
  )
}

export default AddBookmark