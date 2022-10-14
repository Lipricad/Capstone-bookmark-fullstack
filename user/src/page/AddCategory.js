import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Typography, ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, Paper, IconButton, Menu, MenuItem } from "@mui/material"
import * as Yup from 'yup';
import { TextField } from "formik-material-ui"
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios';

/* PARENT PAGES */
import AddCollection from './AddCollection';


/* GLOBAL STYLES */
import global from "../styles/global";


function AddCategory({ children }) {

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
    CategoryName: ""
  };

  const validationSchema = Yup.object().shape({
    CategoryName: Yup.string()
      .required("Category is required."),
  });

  /* COLLECTION DATA */
  let { CollectionName } = useParams();
  let history = useNavigate();


  /* PASSING DATA TO DATABASE */
  const [newCategory, setNewCategory] = useState("")

  const onSubmit = (data) => {
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
        history(0); //TEMPORARYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
        console.log("200");
        /* UPDATE THE PAGE EVERYTIME YOU ADD */

        const categoryToUpdate = { CategoryName: newCategory };
        setlistOfCategory([...listOfCategory, categoryToUpdate]);
      }
      handleClose();
    });
  };



  return (
    <AddCollection>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>

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

        <Box sx={{ flex: "15", display: "flex", flexDirection: "row", flexWrap: "wrap", marginBottom: "200px" }}>
          {listOfCategory.map((value, key) => {
            return (

              <Paper elevation={3} key={key} sx={{
                margin: "1vh 1vw 2vh 1.5vw", width: "360px", height: "250px", display: "flex", flexDirection: "column",
                background: "#3b3b3b", border: "1px solid #272727"
              }}>


                <Box sx={{ flex: "1", textAlign: "left", display: "flex", flexDirection: "row" }}>

                  <Box sx={{ flex: "7" }}>
                    <ButtonBase
                      onClick={() => {
                        history(`/add_bookmark/${id}/${CollectionName}/${value.id}/${value.CategoryName}`);
                      }}>
                      <Typography variant="h5" sx={{ color: "white", marginLeft: "10px", marginTop: "10px", fontWeight: "bold" }}>
                        {value.CategoryName}
                      </Typography>
                    </ButtonBase>
                  </Box>

                  {/* BUTTON FOR RENAME AND DELETE */}

                  <Box sx={{ flex: "1" }}>
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
                      <MenuItem onClick={() => { console.log(dataID) }}> Delete </MenuItem>
                    </Menu>

                  </Box>
                </Box>



                {/* LIST OF BOOKMARK */}

                <Box sx={{ flex: "5" }}>
                  {children}
                </Box>
              </Paper>
            )
          })}
        </Box>

      </Box>
    </AddCollection>
  )
}

export default AddCategory