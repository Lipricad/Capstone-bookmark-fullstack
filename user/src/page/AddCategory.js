import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Typography, ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, Paper } from "@mui/material"
import * as Yup from 'yup';
import { TextField } from "formik-material-ui"
import { useParams } from "react-router-dom"
import axios from 'axios';

/* COMPONENTS */
import MainPageAddCol from '../components/MainPageAddCol'

/* GLOBAL STYLES */
import global from "../styles/global";


function AddCategory() {

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

  const [listOfCategory, setlistOfCategory] = useState([]);

  useEffect(() => {
    /* COLLECTION */
    axios.get(`http://localhost:3001/collection/byId/${id}`).then((response) => {
      console.log(response.data)
    });

    /* CATEGORY */
    axios.get(`http://localhost:3001/category/${id}`).then((response) => {
      setlistOfCategory(response.data);
    });
    /* REMOVE THE ESLINT-DISABLE IF YOU WANT TO SEE WARNING [ITS USELESS EITHERWAY] */
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps     



  /* FORMIK */
  const initialValues = {
    CategoryName: ""
  };

  const validationSchema = Yup.object().shape({
    CategoryName: Yup.string()
      .required("Category is required."),
  });



  /* PASSING DATA TO DATABASE */
  const [newCategory, setNewCategory] = useState("")

  const onSubmit = () => {
    axios.post("http://localhost:3001/category",
      {
        CategoryName: newCategory, CollectionId: id
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

        const categoryToUpdate = { CategoryName: newCategory };
        setlistOfCategory([...listOfCategory, categoryToUpdate]);
      }
      handleClose();
    });
  };



  return (
    <MainPageAddCol>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100%"}}>

        {/* NEW CATEGORIES BUTTON BOX */}

        <Box sx={{ display: "flex", flexDirection: "row", minHeight: "13vh", flex: "1 1 auto" }}>

          {/* CATEGORY BUTTON */}

          <Box sx={{ flex: "1", position: "fixed", right: "30px", zIndex: "12" }}>
            <Box sx={{ paddingRight: "10px" }}>
              <ButtonBase sx={global.buttonBase} onClick={handleClickOpen} >
                <Typography variant="h5" sx={global.TypogBut}> New Category </Typography>
              </ButtonBase>
            </Box>

            {/* 3.1 DIALOG POPUP FORM */}

            <Dialog open={open} onClose={handleClose}>
              <Box sx={{ border: "3px solid black" }}>
                <DialogTitle variant="h4" sx={{ background: "#272727", color: "white", }}>Create Category</DialogTitle>

                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                  <Form onChange={(e) => { setNewCategory(e.target.value) }}>
                    <DialogContent>
                      <Box sx={{ padding: "20px", borderTop: "4px solid black", borderBottom: "4px solid black" }}>
                        <Field
                          autoComplete="off"
                          name="CategoryName"
                          className="InputFieldPopup"
                          component={TextField}
                          label="Category Name"
                          helperText={<ErrorMessage name="CategoryName" />}
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

        {/* LIST OF CATEGORIES */}

        <Box sx={{ flex: "1 1 auto", display: "flex", flexDirection: "row", flexWrap: "wrap", marginBottom: "200px" }}>
            {listOfCategory.map((value, key) => {
              return (
                <Paper elevation={3} key={key} sx={{margin: "1vh 1vw 1vh 1.2vw", padding: "90px", width: "10vw", height: "10vh"}}>
                  <ButtonBase sx={global.ColectionButtonCol}>
                    <Typography variant="h6" sx={{ color: "black" }}>{value.CategoryName}</Typography>
                  </ButtonBase>
                </Paper>
              )
            })}
        </Box>

      </Box>
   </MainPageAddCol>
  )
}

export default AddCategory