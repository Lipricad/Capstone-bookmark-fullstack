import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Typography, ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import * as Yup from 'yup';
import { TextField } from "formik-material-ui"
// import { useParams } from "react-router-dom"
// import axios from 'axios';

/* COMPONENTS */
// import AddCategory from './AddCategory'

/* GLOBAL STYLES */
import global from "../styles/global";

function AddBookmark() {
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
    CategoryName: ""
  };

  const validationSchema = Yup.object().shape({
    CategoryName: Yup.string()
      .required("Category is required."),
  });



  return (
    <Box>
      {/* ADD BOOKMARK BUTTON */}
      <Typography variant="h1" sx={{ color: "black", marginTop: "100px" }}>BOOKMARK PAGE</Typography>

      <Box sx={{ flex: "2.5", textAlign: "left" }}>
        <ButtonBase sx={global.buttonBookmark} onClick={handleClickOpen}>
          <Typography sx={global.TypogBut}> Add Bookmark </Typography>
        </ButtonBase>

        {/* 3.1 DIALOG POPUP FORM */}

        <Dialog open={open} onClose={handleClose}>
          <Box sx={{ border: "3px solid black"}}>
            <DialogTitle variant="h4" sx={{ background: "#272727", color: "white", }}>Add a Bookmark</DialogTitle>

            <Formik initialValues={initialValues} onSubmit={""} validationSchema={validationSchema}>
              <Form onChange={(e) => { /*setNewCategory(e.target.value)*/ }}>
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
  )
}

export default AddBookmark