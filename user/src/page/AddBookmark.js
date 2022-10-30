import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Box, Typography, ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Tooltip, Menu, MenuItem,
  FormControl, Select, useMediaQuery, useTheme
} from "@mui/material"
import * as Yup from 'yup';
import { TextField } from "formik-material-ui"
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios';

/*  COMPONENTS */
import SearchBar from '../components/SearchBar';

/* PARENT PAGES */
import AddCollection from './AddCollection';

/* GLOBAL STYLES */
import global from "../styles/global";

function AddBookmark() {

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('lg'));

  let history = useNavigate();

  /* FORM DIALOG POPUP ADD BOOKMARK */
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

  /* FORM DIALOG POPUP MOVE TO */
  const [openMoveto, setOpenMoveto] = useState(false);

  const handleClickOpenMove = () => {
    setOpenMoveto(true);
  };
  const handleCloseMove = () => {
    setDrop(null);
    setOpenMoveto(false);
  };

  const [category, setCategory] = useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };



  /* LIST OF DATA */
  let { CATid } = useParams();
  let { UserId } = useParams();


  const [listOfBookmark, setlistOfBookmark] = useState([]);
  const [listOfCategory, setlistOfCategory] = useState([]);

  useEffect(() => {
    /* CATEGORY */
    // axios.get(`http://localhost:3001/bookmark/${CATid}/${UserId}`, {
    //   headers: {
    //     accessToken: localStorage.getItem("accessToken"),
    //   },
    // }).then((response) => {
    //   if (response.data.error) {
    //     history("/NOT FOUND")
    //   } else {
    //     setlistOfBookmark(response.data);
    //   }

    // });

    /* BOOKMARK */
    axios.get(`http://localhost:3001/bookmark/${CATid}/${UserId}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.data.error) {
        history("/NOT FOUND")
      } else {
        setlistOfBookmark(response.data);
      }

    });

    /* REMOVE THE ESLINT-DISABLE IF YOU WANT TO SEE WARNING [ITS USELESS EITHERWAY] */
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps     



  /* OPEN NEW TAB */
  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };



  //MENU DROP DOWN
  const [dataID, setDataID] = useState("");

  const DropDownId = (dataId) => {
    // console.log(dataId)
    setDataID(dataId);
  }

  //RNAME, MT, DEL DROP DOWN
  const [Drop, setDrop] = useState(null);

  const MenuDropDown = e => {
    setDrop(e.currentTarget);
  }
  const MenuDropDownClose = e => {
    setDrop(null);
  }

  //FILTER DROP DOWN
  const [FDrop, setFDrop] = useState(null);

  const MenuFDropDown = e => {
    setFDrop(e.currentTarget);
  }
  const MenuFDropDownClose = e => {
    setFDrop(null);
  }




  /* FORMIK */
  const initialValues = {
    BookmarkName: "",
    LinkAddress: "",
  };
  const initialValuesRename = {
    RenameBookmark: ""
  }

  const validationSchema = Yup.object().shape({
    BookmarkName: Yup.string()
      .required("Bookmark name is required."),
    LinkAddress: Yup.string()
      .required("Address link is required."),
  });
  const validationSchemaRename = Yup.object().shape({
    RenameBookmark: Yup.string()
      .required("Bookmark name is required."),
  });



  /* PASSING DATA TO DATABASE */
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/bookmark",
      {
        BookmarkName: data.BookmarkName, Bookmark_URL: data.LinkAddress, CategoryId: CATid
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

        history("/loading");
      }
      handleClose();
    });
  };



  /* DELETION OF DATA */
  const deleteData = (delId) => {

    MenuDropDownClose();

    axios.delete(`http://localhost:3001/bookmark/${delId.id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then(() => {
      setlistOfBookmark(listOfBookmark.filter((val) => {
        return val.id !== delId.id;
      }))
    })
  }



  /* UPDATE OF DATA */
  const updateBookmarkname = (data) => {
    axios.put(`http://localhost:3001/bookmark/renameBookmark`,
      {
        newBookmark: data.RenameBookmark,
        id: dataID.id
      }, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    });

    history("/loading");
    handleCloseRename();
  }

  const updateBookmarkcategory = () => {
    axios.put(`http://localhost:3001/bookmark/changeCategory`,
      {
        newCategory: category,
        id: dataID.id
      }, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    });

    history("/loading");
    handleCloseMove();
  }



  //SORT
  const sortname = () => {
    /* BOOKMARK */
    axios.get(`http://localhost:3001/bookmark/${CATid}/sname`).then((response) => {
      setlistOfBookmark(response.data);
      MenuDropDownClose();
    });
  }

  const sorttime = () => {
    /* BOOKMARK */
    axios.get(`http://localhost:3001/bookmark/${CATid}/sdate`).then((response) => {
      setlistOfBookmark(response.data);
      MenuDropDownClose();
    });
  }



  return (
    <AddCollection>
      <Box sx={{ height: "100vh", background: "#ffffff" }}>
        {matches ? (null) : (
          <Box sx={{ display: "flex", flexDirection: "row", height: "200px", minHeight: "200px" }}>
            {/* background: "blue", zIndex: "12", position: "fixed" */}
            <Box sx={{ flex: 1, width: "100vw", display: "flex", flexDirection: "row", right: "0px" }}>

              {/* BACK BUTTON */}

              <Box sx={{ flex: "2" }}>
                <Box>
                  <ButtonBase sx={global.buttonBase} onClick={() => { history(-1); }} >
                    <img
                      src="/pictures/assets/back.svg"
                      alt="back"
                      height="20vh"
                      width="20vw"
                    />
                  </ButtonBase>
                </Box>
              </Box>

              {/* SEARCH BAR */}

              <Box sx={{ flex: "3", display: "flex", flexDirection: "row", alignItems: "flex-end" }}>
                <Box sx={{ flex: "1", marginRight: "1vw" }}>
                  <SearchBar placeholder="Search Bookmark" data={listOfBookmark} />
                </Box>
              </Box>

              {/* SORT */}
              <Box sx={{ flex: "2", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <Box sx={{ flex: "1" }}>
                  <ButtonBase sx={global.buttonBase} onClick={MenuFDropDown} >
                    <Tooltip title={"Filter"} >
                      <img
                        src="/pictures/assets/filter.svg"
                        alt="filter"
                        height="20"
                        width="20"
                      />
                    </Tooltip>
                    <Typography sx={global.TypogBut}> Filter </Typography>
                  </ButtonBase>
                </Box>

                <Menu onClose={MenuFDropDownClose} anchorEl={FDrop} open={Boolean(FDrop)} sx={global.menuStyle}>
                  <MenuItem onClick={() => { sortname() }}> Sort by name </MenuItem>
                  <MenuItem onClick={() => { sorttime() }}> Sort by time </MenuItem>
                </Menu>

              </Box>

              {/* ADD BOOKMARK BUTTON */}

              <Box sx={{ flex: "1.5", marginRight: "10px" }}>
                <Box>
                  <ButtonBase sx={global.buttonBase} onClick={handleClickOpen} >
                    <Typography variant="h5" sx={global.TypogBut}> Add Bookmark </Typography>
                  </ButtonBase>
                </Box>



                {/* 3.1 DIALOG POPUP FORM */}

                <Dialog open={open} onClose={handleClose}>
                  <Box sx={{ border: "3px solid black" }}>
                    <DialogTitle variant="h4" sx={{ background: "#7251b2", color: "white", }}> New name: </DialogTitle>
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
              </Box>
            </Box>
          </Box>
        )}


        {/* LIST OF BOOKMARK */}
        <Box sx={{ flex: "1", display: "flex", flexDirection: "row", flexWrap: "wrap", marginBottom: "200px" }}>

          {listOfBookmark.map((value, key) => {
            return (
              <Paper elevation={3} key={key} sx={{
                margin: "5vh 2vw 2vh 1.5vw", width: "250px", height: "125px", display: "flex", flexDirection: "row",
                background: "#3b3b3b", border: "1px solid #272727", zIndex: "1"
              }}>
                <Box sx={{ flex: "6", padding: "50px 0" }}>
                  <ButtonBase onClick={() => openInNewTab(value.Bookmark_URL)}>
                    <Tooltip sx={{ textAlign: "center" }}
                      title={
                        <span style={{ whiteSpace: 'pre-line', textAlign: "center" }}>
                          <Typography sx={{ fontSize: "15px" }}> {value.BookmarkName + "\n\n" + (value.updatedAt).substring(0, 10)} </Typography>
                        </span>
                      }>

                      <Typography variant="h6" noWrap sx={{ marginLeft: "10px", color: "white", textAlign: "center", maxWidth: "175px" }}>

                        {/* ICON OF THE BOOKMARK ICON ICON ICON ICON ICON ICON ICON */}
                        <img height="16" width="16" alt="icon" src={`http://www.google.com/s2/favicons?domain=${value.Bookmark_URL}`} />

                        {"    " + value.BookmarkName}
                      </Typography>

                    </Tooltip>
                  </ButtonBase>
                </Box>

                <Box sx={{ flex: "1" }}>

                  {/* BUTTON FOR RENAME AND DELETE */}

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



          {/* DITO YUNG DROP DOWN MENU */}

          <Menu onClose={MenuDropDownClose} anchorEl={Drop} open={Boolean(Drop)} sx={global.menuStyle}>
            <MenuItem onClick={handleClickRename}> Rename </MenuItem>
            <MenuItem onClick={handleClickOpenMove}> Move to...</MenuItem>
            <MenuItem onClick={() => { deleteData(dataID) }}> Delete </MenuItem>
          </Menu>

          {/* 3.1 DIALOG POPUP RENAME RENAME RENAME RENAME RENAME*/}

          <Dialog open={openRename} onClose={handleCloseRename}>
            <Box sx={{ border: "3px solid black" }}>
              <DialogTitle variant="h4" sx={{ background: "#7251b2", color: "white", }}> Add a Bookmark </DialogTitle>
              <Formik initialValues={initialValuesRename} onSubmit={updateBookmarkname} validationSchema={validationSchemaRename}>
                <Form>
                  <DialogContent>
                    <Box>
                      <Field
                        autoComplete="off"
                        name="RenameBookmark"
                        className="InputFieldPopup"
                        component={TextField}
                        label="New Bookmark Name"
                        helperText={<ErrorMessage name="RenameBookmark" />}
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



          {/* 3.1 DIALOG POPUP MOVE TO MOVE TO MOVE TO MOVE TO*/}

          <Dialog open={openMoveto} onClose={handleCloseMove}>
            <Box sx={{ border: "3px solid black" }}>
              <DialogTitle variant="h4" sx={{ background: "#7251b2", color: "white", }}>Move to:</DialogTitle>
              <DialogContent>
                <FormControl sx={{ m: 1, minWidth: 275, marginTop: "20px" }}>
                  <Select
                    value={category}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >

                    {listOfCategory.map((value, key) => {
                      return (
                        <MenuItem key={key} value={value.id}>
                          {value.CategoryName}
                        </MenuItem>
                      )
                    })}

                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions sx={{ background: "#7251b2" }}>
                <ButtonBase sx={global.buttonBaseCancel} onClick={handleCloseMove}>
                  <Typography sx={global.TypogButCancel}> Cancel </Typography>
                </ButtonBase>
                <ButtonBase sx={global.buttonBase} onClick={() => { updateBookmarkcategory() }}>
                  <Typography sx={global.TypogBut}> Confirm</Typography>
                </ButtonBase>
              </DialogActions>
            </Box>
          </Dialog>

        </Box >
      </Box>
    </AddCollection >
  )
}

export default AddBookmark