import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Typography, IconButton, ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem, Tooltip } from "@mui/material"
import * as Yup from 'yup';
import { TextField } from "formik-material-ui"
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios';


/* GLOBAL STYLES */
import global from "../styles/global";


function AddCollection({ children }) {


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

  const validationSchema = Yup.object().shape({
    CollectionName: Yup.string()
      .required("Collection is required."),
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
        window.location.reload(); //TEMPORARY REFRESH
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



  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#3b3b3b", zIndex: "12", position: "fixed", width: "100%" }}>



      {/* 0. COLLECTION TITLE */}

      <Box sx={{ display: "flex", flex: "1 1 auto", background: "#3b3b3b", borderBottom: "3px solid #272727", marginTop: "85px", alignItems: "center", maxHeight: "80px", minHeight: "80px" }}>
        <Typography sx={{ fontSize: "3.5vh", margin: "0 0 0 20px", color: "#Afa9a9", fontWeight: "bold", textAlign: "center" }}> {CollectionName} {" >> "} {CategoryName} </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", flex: "1 1 auto" }}>


        {/* 1. BOX FOR COLLECTION */}

        <Box sx={{ flex: "1 1 auto", background: "#3b3b3b", display: "flex", flexDirection: "column", maxWidth: "250px", minWidth: " 250px", }}>

          <Box sx={{ display: "flex", flex: "1 1 auto", maxHeight: "75px" }}>
            <Box sx={{ flex: "1 1 auto" }}>
              <Typography variant="h4" sx={global.TypogCollection}> Collection</Typography>
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
                <DialogTitle variant="h4" sx={{ background: "#272727", color: "white" }}>Create Collection</DialogTitle>

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
                          />
                        </Box>
                      </Box>
                    </DialogContent>
                    <DialogActions sx={{ background: "#272727" }}>
                      <ButtonBase sx={global.buttonBaseCancel} onClick={handleClose}>
                        <Typography sx={global.TypogButCancel}> Cancel </Typography>
                      </ButtonBase>
                      {/* DITOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO KA MAGALALAGAY NUNG UPDATE */}
                      <ButtonBase sx={global.buttonBase} type="submit">
                        <Typography sx={global.TypogBut}> Confirm</Typography>
                      </ButtonBase>
                    </DialogActions>
                  </Form>
                </Formik>
              </Box>
            </Dialog>
          </Box>


          {/* 4. COLUMN OF COLLECTION */}

          <Box sx={{ flex: "15 1 auto", display: "flex", flexDirection: "column" }}>
            <Box sx={global.CollectionOverflowstyle}>
              {listOfCollection.map((value, key) => {
                return (
                  <Box key={key}>
                    {/* DITOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO KA MAGALALAGAY NUNG UPDATE */}
                    <Box sx={global.ColectionBox}>

                      <Box sx={{ flex: "10" }}>
                        <ButtonBase sx={global.ColectionButtonCol}
                          onClick={() => {
                            history(`/add_category/${value.id}/${value.CollectionName}`);
                            history(0); //TEMPORARYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
                          }}>

                          <Tooltip
                            enterDelay={500} leaveDelay={50}
                            title={
                              value.CollectionName
                            }>

                            <Typography variant="h6" noWrap sx={{ color: "white", fontWeight: "bold", maxWidth: "175px" }}>
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
                            width="20"
                          />
                        </IconButton>

                        {/* DROPDOWN MENU */}

                        <Menu onClose={MenuDropDownClose} anchorEl={Drop} open={Boolean(Drop)} sx={global.menuStyle}>
                          <MenuItem> Rename </MenuItem>
                          <MenuItem onClick={() => { deleteData(dataID) }}> Delete </MenuItem>
                        </Menu>

                      </Box>

                    </Box>
                  </Box>
                )
              })}

            </Box>
            <Box sx={{ flex: "1" }}> </Box>    {/* FOOTER TO */}
          </Box>

        </Box>



        {/* 5. CATEGORIES */}
        <Box sx={global.CategoryOverflowstyle}>
          {children}
        </Box>
      </Box>


    </Box >
  )
}

export default AddCollection