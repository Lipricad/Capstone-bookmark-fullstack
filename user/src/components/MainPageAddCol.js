import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Typography, IconButton, ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import * as Yup from 'yup';
import { TextField } from "formik-material-ui"
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios';


/* GLOBAL STYLES */
import global from "../styles/global";


function MainPageAddCol({children}) {


  /* FORM DIALOG POPUP */
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };



  /* LIST OF COLLECTION */
  const [listOfCollection, setlistOfCollection] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/collection").then((response) => {
      setlistOfCollection(response.data);
    });
  }, []);



  /* FORMIK */
  const initialValues = {
    UserEmail: "",
    CollectionName: "",
  };

  const validationSchema = Yup.object().shape({
    UserEmail: Yup.string()
      .required("Email address is required.")
      .email("Please enter a valid email address."),
    CollectionName: Yup.string()
      .required("Collection is required."),
  });



  /* COLLECTION DATA */
  let { CollectionName } = useParams();
  let history = useNavigate();



  /* PASSING DATA TO DATABASE */
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/collection", data).then((response) => {
      console.log("200");
      window.location.reload(); //TEMPORARY REFRESH
      handleClose();
    });
  };



  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#3b3b3b" }}>



      {/* 0. COLLECTION TITLE */}

      <Box sx={{ display: "flex", flex: "1 1 auto", background: "#3b3b3b", borderBottom: "3px solid #272727", marginTop: "85px", alignItems: "center", maxHeight: "120px" }}>
        <Typography variant="h3" sx={{ margin: "0 0 0 20px", color: "#Afa9a9", fontWeight: "bold", textAlign: "center" }}> Name: {CollectionName} </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", flex: "1 1 auto" }}>


        {/* 1. BOX FOR COLLECTION */}

        <Box sx={{ flex: "1 1 auto", background: "#3b3b3b", display: "flex", flexDirection: "column", maxWidth: "250px", minWidth: " 250px" }}>

          <Box sx={{ display: "flex", flex: "1 1 auto", maxHeight: "75px" }}>
            <Box sx={{ flex: "1 1 auto" }}>
              <Typography variant="h4" sx={global.TypogCollection}> Collection</Typography>
            </Box>


            {/* 2. SETTINGS OF COLLECTION */}

            <Box sx={{ flex: "1 1 auto" }}>
              <IconButton>
                <img
                  src="/pictures/assets/3_dots.svg"
                  alt="Menubar"
                  height="30"
                  width="30"
                />
              </IconButton>
            </Box>
          </Box>


          {/* 3. ADD COLLECTION */}

          <Box sx={{ flex: "1 1 auto", textAlign: "center", maxHeight: "150px" }}>
            <ButtonBase sx={{ border: "3px solid #6633ff", padding: "10px", marginTop: "30px", marginBottom: "30px", "&:hover": { background: "#424242", transition: "0.3s" } }}
              onClick={handleClickOpen}>
              <Typography variant="h5" sx={global.TypogBut}> New Collection</Typography>
            </ButtonBase>


            {/* 3.1 DIALOG POPUP FORM */}

            <Dialog open={open} onClose={handleClose}>
              <Box sx={{ border: "3px solid black" }}>
                <DialogTitle variant="h4" sx={{ background: "#272727", color: "white", }}>Create Collection</DialogTitle>

                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                  <Form>
                    <DialogContent>
                      <Box sx={{ padding: "20px", borderTop: "4px solid black", borderBottom: "4px solid black" }}>
                        <Box>
                          <Field
                            autoComplete="off"
                            id="inputAddCol"
                            name="UserEmail"
                            className="InputFieldPopup"
                            component={TextField}
                            label="Email Adress"
                            helperText={<ErrorMessage name="UserEmail" />}
                          />
                        </Box>
                        <Box sx={{ marginTop: "30px" }}>
                          <Field
                            autoComplete="off"
                            id="inputAddCol"
                            name="CollectionName"
                            className="InputFieldPopup"
                            component={TextField}
                            label="Collection Name"
                            helperText={<ErrorMessage name="CollectionName" />}
                          />
                        </Box>
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


          {/* 4. COLLUMN OF COLLECTION */}

          <Box sx={{ flex: "15 1 auto" }}>
            <Box sx={global.CollectionOverflowstyle}>
              {listOfCollection.map((value, key) => {
                return (
                  <Box key={value.id}>
                    <ButtonBase sx={global.ColectionButtonCol} onClick={() => { history(`/add_category/${value.id}/${value.CollectionName}`) }}>
                      <Typography variant="h6" sx={{ color: "white" }}>{value.CollectionName}</Typography>
                    </ButtonBase>
                  </Box>
                )
              })}
            </Box>
          </Box>

        </Box>





        {/* 5. CATEGORIES */}

        <Box sx={global.CategorynOverflowstyle}>
          {children}
        </Box>
      </Box>

    </Box >
  )
}

export default MainPageAddCol