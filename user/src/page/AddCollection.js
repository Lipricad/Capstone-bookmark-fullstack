import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Box, Typography, IconButton, ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem, Tooltip,
  useMediaQuery, useTheme, Drawer, List, ListItem, ListItemIcon
} from "@mui/material"
import * as Yup from 'yup';
import { TextField } from "formik-material-ui"
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios';


/* GLOBAL STYLES */
import global from "../styles/global";

/* COMPONENT */
import Title from '../components/Title';


function AddCollection({ children }) {

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('lg'));
  /* MOBILE DRAWER */
  const [openMob, setOpenMob] = useState(false);

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



  /* LIST OF COLLECTION */
  const [listOfCollection, setlistOfCollection] = useState([]);

  /* VERIFY IF THE USER IS LOGGED IN, IF NOT THEY CANT ACCESS THE PAGE*/

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history("/login")
    } else {
      axios.get("http://localhost:3001/collection/OutputUser",
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }).then((response) => {
          setlistOfCollection(response.data);
        });
    }
    /* REMOVE THE ESLINT-DISABLE IF YOU WANT TO SEE WARNING [ITS USELESS EITHERWAY] */
  }, []); // eslint-disable-line react-hooks/exhaustive-deps



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
    CollectionName: "",
  };
  const initialValuesRename = {
    RenameCollection: ""
  }

  const validationSchema = Yup.object().shape({
    CollectionName: Yup.string()
      .required("Collection is required."),
  });
  const validationSchemaRename = Yup.object().shape({
    RenameCollection: Yup.string()
      .required("Collection name is required."),
  });



  /* COLLECTION DATA */
  let { CollectionName } = useParams();
  let { CategoryName } = useParams();
  let history = useNavigate();

  /* PASSING DATA TO DATABASE */
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/collection",
      data,
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
        history("/loading"); //TEMPORARY REFRESH
      }
      handleClose();
    });
  };



  /* DELETION OF DATA */
  const deleteData = (delId) => {

    MenuDropDownClose();

    axios.delete(`http://localhost:3001/collection/${delId.id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then(() => {
      setlistOfCollection(listOfCollection.filter((val) => {
        return val.id !== delId.id;
      }))
    })
    history("/add_collection");
  }



  /* UPDATE OF DATA */
  const updateCollectionname = (data) => {
    axios.put(`http://localhost:3001/collection/renameCollection`,
      {
        newCollection: data.RenameCollection,
        id: dataID.id
      }, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    });
    history(`/add_collection`);
    history("/loading");
    handleCloseRename();
  }



  return (
    // background: "#3b3b3b"
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#8984D6", zIndex: "12", position: "fixed", marginTop: "78px", width: "100%" }}>

      {/* 0. COLLECTION TITLE */}

      <Title CollectionName={CollectionName} CategoryName={CategoryName} />
      {matches ?
        (                                                                                                      //MOBILE SIZE
          <Box sx={{ flex: "1", display: "flex", flexDirection: "column" }}>
            <Box sx={{ flex: "1", maxHeight: "50px", background: "#8984D6", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box sx={{ flex: "1", display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Box sx={{ flex: 1 }}>
                  <IconButton onClick={() => setOpenMob(true)}>
                    <img
                      src="/pictures/assets/addcollectionIcon.svg"
                      alt="Menubar"
                      height="30"
                      width="30" />
                  </IconButton>
                </Box>
              </Box>
            </Box>

            <Box sx={global.CategoryOverflowstyle}>
              <Box sx={global.takeOff}>
                {children}
              </Box>
            </Box>

            <Drawer
              anchor="left"
              onClose={() => setOpenMob(false)}
              open={openMob}
              PaperProps={{ style: { background: "#6633ff" } }}>
              <List>
                <ListItem button divider sx={{ padding: "20px" }} >
                  <ListItemIcon>
                    <ButtonBase sx={global.MNewCollectionButton}
                      onClick={handleClickOpen}>
                      <Typography variant="h6" sx={global.TypogBut}> New Collection</Typography>
                    </ButtonBase>
                  </ListItemIcon>
                </ListItem>
                {/* COLLECTION LIST */}
                {listOfCollection.map((value, key) => {
                  return (
                    <Box key={key} sx={{ display: "flex", flexDirection: "row", background: "#8984D6" }}>
                      <Box sx={{ flex: "1", marginLeft: "10px" }}>                                                                                {/* COLLECTION MOB */}
                        <ButtonBase sx={global.ColectionButtonCol}
                          onClick={() => {
                            history(`/add_category/${value.id}/${value.CollectionName}/${value.UserId}`);
                            history("/loading");
                          }}>
                          <Tooltip
                            enterDelay={500} leaveDelay={50}
                            title={
                              value.CollectionName
                            }>
                            <Typography variant="h6" noWrap sx={global.TypogCollectionName}>
                              {value.CollectionName}
                            </Typography>
                          </Tooltip>
                        </ButtonBase>
                      </Box>
                      <Box sx={{ marginRight: "10px" }}>                                                                                                {/* DELETE AND RENAME BUTTON */}
                        <IconButton onClick={MenuDropDown} onMouseOver={() => { DropDownId(value) }}>
                          <img
                            src="/pictures/assets/3_dots.svg"
                            alt="Menubar"
                            height="20"
                            width="20" />
                        </IconButton>
                      </Box>
                    </Box>
                  )
                })}

              </List>
            </Drawer>

          </Box>
        )
        : (                                                                                                   //DESKTOP SIZE
          <Box sx={{ display: "flex", flexDirection: "row", flex: "1" }}>

            {/* 1. BOX FOR COLLECTION */}

            <Box sx={{ flex: "1", background: "#8984D6", display: "flex", flexDirection: "column", maxWidth: "250px", minWidth: " 250px", }}>

              {/* <Box sx={{ display: "flex", flex: "1 1 auto", maxHeight: "40px", minHeight: "40px" }}>
                <Box sx={{ flex: "1 1 auto" }}>
                  <Typography variant="h4" sx={global.TypogCollection}> Collection</Typography>
                </Box>
              </Box> */}


              {/* 3. ADD COLLECTION */}

              <Box sx={{ flex: "1", textAlign: "center", maxHeight: "120px", minHeight: "120px" }}>
                <ButtonBase sx={global.NewCollectionButton}
                  onClick={handleClickOpen}>
                  <Typography variant="h5" sx={global.TypogBut}> New Collection</Typography>
                </ButtonBase>
              </Box>


              {/* 4. COLUMN OF COLLECTION */}

              <Box sx={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}>
                <Box sx={global.CollectionOverflowstyle}>
                  {listOfCollection.map((value, key) => {
                    return (
                      <Box key={key}>
                        <Box sx={global.ColectionBox}>

                          <Box sx={{ flex: "10" }}>
                            <ButtonBase sx={global.ColectionButtonCol}
                              onClick={() => {
                                history(`/add_category/${value.id}/${value.CollectionName}/${value.UserId}`);
                                history("/loading");
                              }}>

                              <Tooltip
                                enterDelay={500} leaveDelay={50}
                                title={
                                  value.CollectionName
                                }>

                                <Typography variant="h6" noWrap sx={global.TypogCollectionName}>
                                  {value.CollectionName}
                                </Typography>

                              </Tooltip>

                            </ButtonBase>
                          </Box>

                          {/* BUTTON FOR RENAME AND DELETE */}

                          <Box sx={{ flex: "1", marginRight: "20px" }}>
                            <IconButton onClick={MenuDropDown} onMouseOver={() => { DropDownId(value) }}>
                              <img
                                src="/pictures/assets/3_dots.svg"
                                alt="Menubar"
                                height="20"
                                width="20" />
                            </IconButton>
                          </Box>

                        </Box>
                      </Box>
                    )
                  })}

                </Box>
                <Box sx={{ flex: "1",  }}> </Box>    {/* FOOTER TO */}
              </Box>

            </Box>

            {/* 5. CATEGORIES */}
            <Box sx={global.CategoryOverflowstyle}>
              <Box sx={global.takeOff}>
                {children}
              </Box>
            </Box>
          </Box>
        )}

      {/* 3.1 DIALOG POPUP FORM */}

      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ border: "3px solid black" }}>
          <DialogTitle variant="h4" sx={{ background: "#7251b2", color: "white", textAlign: "center" }}>Create Collection</DialogTitle>

          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
              <DialogContent>
                <Box sx={{ padding: "20px", borderTop: "4px solid black", borderBottom: "4px solid black" }}>
                  <Box>
                    <Field
                      autoComplete="off"
                      name="CollectionName"
                      className="InputFieldPopup"
                      component={TextField}
                      label="Collection Name"
                      helperText={<ErrorMessage name="CollectionName" />}
                      fullWidth
                    />
                  </Box>
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
          <DialogTitle variant="h4" sx={{ background: "#272727", color: "white", }}> New name: </DialogTitle>

          <Formik initialValues={initialValuesRename} onSubmit={updateCollectionname} validationSchema={validationSchemaRename}>
            <Form>
              <DialogContent>
                <Box>
                  <Field
                    autoComplete="off"
                    name="RenameCollection"
                    className="InputFieldPopup"
                    component={TextField}
                    label="New Collection Name"
                    helperText={<ErrorMessage name="RenameCollection" />}
                  />
                </Box>
              </DialogContent>
              <DialogActions sx={{ background: "#272727" }}>
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

    </Box >
  )
}

export default AddCollection