import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Typography, ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, Paper, IconButton, Menu, MenuItem, Tooltip, useMediaQuery, useTheme } from "@mui/material"
import * as Yup from 'yup';
import { TextField } from "formik-material-ui"
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios';

/* PARENT PAGES */
import AddCollection from './AddCollection';

/* GLOBAL STYLES */
import global from "../styles/global";


function AddCategory() {

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('lg'));

  /* FORM DIALOG POPUP */
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  /* FORM DIALOG RENAME */
  const [openRename, setRename] = useState(false);

  const handleClickRename = () => {
    setRename(true);
  };
  const handleCloseRename = () => {
    setDrop(null);
    setRename(false);
  };


  /* LIST OF DATA */
  let { id } = useParams();
  let { UserId } = useParams();

  const [listOfCategory, setlistOfCategory] = useState([]);

  useEffect(() => {
    /* CATEGORY */
    axios.get(`http://localhost:3001/category/${id}/${UserId}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.data.error) {
        history("/NOT FOUND")
      }
      else {
        setlistOfCategory(response.data);
      }

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

  const initialValuesRename = {
    RenameCategory: ""
  }

  const validationSchema = Yup.object().shape({
    CategoryName: Yup.string()
      .required("Category is required."),
  });
  const validationSchemaRename = Yup.object().shape({
    RenameCategory: Yup.string()
      .required("Category name is required."),
  });


  /* COLLECTION DATA */
  let { CollectionName } = useParams();
  let history = useNavigate();


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
        history("/loading"); //TEMPORARYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
        console.log("200");
        /* UPDATE THE PAGE EVERYTIME YOU ADD */

        const categoryToUpdate = { CategoryName: newCategory };
        setlistOfCategory([...listOfCategory, categoryToUpdate]);
      }
      handleClose();
    });
  };



  /* DELETION OF DATA */
  const deleteData = (delId) => {

    MenuDropDownClose();

    axios.delete(`http://localhost:3001/category/${delId.id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then(() => {
      setlistOfCategory(listOfCategory.filter((val) => {
        return val.id !== delId.id;
      }))
    })
  }


  /* UPDATE OF DATA */
  const updateCategoryname = (data) => {
    axios.put(`http://localhost:3001/category/renameCategory`,
      {
        newCategory: data.RenameCategory,
        id: dataID.id
      }, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    });

    history("/loading");
    handleCloseRename();
  }



  return (
    <AddCollection>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#ffffff" }}>

        {/* NEW CATEGORIES BUTTON BOX */}
        {/* background: "blue", zIndex: "12", position: "fixed" */}

        {matches ? (                                                                                                    //MOBILE BUTTON
          <Box sx={global.CategoryBoxStyle}>
            <Box sx={{ flex: 1 }}>
              <ButtonBase sx={global.buttonBase} onClick={() => { history("/add_collection"); }} >
                <img
                  src="/pictures/assets/back.svg"
                  alt="back"
                  height="20vh"
                  width="20vw"
                />
              </ButtonBase>
            </Box>
            <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex", flex: 1 }}>
                <Typography sx={global.CategoryTitle}>  CATEGORIES </Typography>
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <ButtonBase sx={global.buttonBase} onClick={handleClickOpen} >
                <img
                  src="/pictures/assets/categoryicon.svg"
                  alt="add_Category"
                  height="20vh"
                  width="20vw"
                />
              </ButtonBase>
            </Box>
          </Box>
        ) : (                                                                                                             //DESKTOP BUTTON
          <Box sx={{ display: "flex", flexDirection: "row", height: "200px", minHeight: "200px" }}>
            <Box sx={{ flex: 1, width: "100vw", display: "flex", flexDirection: "row", right: "0px" }}>

              {/* BACK BUTTON */}

              <Box sx={{ flex: "2" }}>
                <Box>
                  <ButtonBase sx={global.buttonBase} onClick={() => { history("/add_collection"); }} >
                    <img
                      src="/pictures/assets/back.svg"
                      alt="back"
                      height="20vh"
                      width="20vw"
                    />
                  </ButtonBase>
                </Box>
              </Box>

              <Box sx={{ flex: "4", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box sx={{ flex: "1" }}></Box>
                <Box sx={{ flex: "2", justifyContent: "center" }}> <Typography variant="h3" sx={global.TypogTitle}> CATEGORIES </Typography> </Box>
              </Box>
              <Box sx={{ flex: "1" }}> </Box>

              {/* CATEGORY BUTTON */}

              <Box sx={{ flex: "1.5", marginRight: "10px" }}>
                <Box>
                  <ButtonBase sx={global.buttonBase} onClick={handleClickOpen} >
                    <Typography variant="h5" sx={global.TypogBut}> New Category </Typography>
                  </ButtonBase>
                </Box>
              </Box>

            </Box>
          </Box>
        )}

        {/* LIST OF CATEGORIES */}

        <Box sx={{ flex: "15", display: "flex", flexDirection: "row", flexWrap: "wrap", marginBottom: "200px", justifyContent: "center" }}>
          {listOfCategory.map((value, key) => {
            return (

              <Paper elevation={3} key={key} sx={{
                margin: "5vh 2vw 2vh 1.5vw", width: "300px", height: "150px", display: "flex", flexDirection: "row",
                background: "#3b3b3b", border: "1px solid #272727", zIndex: "1"
              }}>



                <Box sx={{ flex: "6", padding: "60px 0" }}>
                  <ButtonBase
                    onClick={() => {
                      history(`/add_bookmark/${id}/${CollectionName}/${value.UserId}/${value.id}/${value.CategoryName}`);
                    }}>
                    <Tooltip
                      enterDelay={500} leaveDelay={50}
                      title={
                        value.CategoryName
                      }>

                      <Typography variant="h6" noWrap sx={{ marginLeft: "10px", color: "white", textAlign: "center", maxWidth: "175px" }}>
                        {value.CategoryName}
                      </Typography>

                    </Tooltip>
                  </ButtonBase>
                </Box>

                {/* BUTTON FOR RENAME AND DELETE */}

                <Box sx={{ flex: "1" }}>
                  <IconButton onClick={MenuDropDown} onMouseOver={() => { DropDownId(value) }}>
                    <img
                      src="/pictures/assets/3_dots.svg"
                      alt="Menubar"
                      height="25"
                      width="25"
                    />
                  </IconButton>
                </Box>

              </Paper>
            )
          })}

          {/* 3.1 DIALOG POPUP FORM */}

          <Dialog open={open} onClose={handleClose}>
            <Box sx={{ border: "3px solid black" }}>
              <DialogTitle variant="h4" sx={{ background: "#7251b2", color: "white", }}>Create Category</DialogTitle>

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
                        fullWidth
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


          {/* DITO YUNG DROP DOWN MENU */}

          <Menu onClose={MenuDropDownClose} anchorEl={Drop} open={Boolean(Drop)} sx={global.menuStyle}>
            <MenuItem onClick={handleClickRename}> Rename </MenuItem>
            <MenuItem onClick={() => { deleteData(dataID) }}> Delete </MenuItem>
          </Menu>

          {/* 3.1 DIALOG POPUP RENAME RENAME RENAME RENAME RENAME*/}

          <Dialog open={openRename} onClose={handleCloseRename}>
            <Box sx={{ border: "3px solid black" }}>
              <DialogTitle variant="h4" sx={{ background: "#7251b2", color: "white", }}> New name: </DialogTitle>

              <Formik initialValues={initialValuesRename} onSubmit={updateCategoryname} validationSchema={validationSchemaRename}>
                <Form>
                  <DialogContent>
                    <Box>
                      <Field
                        autoComplete="off"
                        name="RenameCategory"
                        className="InputFieldPopup"
                        component={TextField}
                        label="New Category Name"
                        helperText={<ErrorMessage name="RenameCategory" />}
                      />
                    </Box>
                  </DialogContent>
                  <DialogActions sx={{ background: "#7251b2" }}>
                    <ButtonBase sx={global.buttonBaseCancel} onClick={handleCloseRename}>
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
    </AddCollection >
  )
}

export default AddCategory