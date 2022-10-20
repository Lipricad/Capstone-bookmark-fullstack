import './App.css';
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Box, Typography, AppBar, Toolbar, ButtonBase, useMediaQuery, useTheme, Drawer, List, ListItem, ListItemIcon, IconButton } from "@mui/material";
import axios from 'axios';

/* GLOBAL STYLES */
import global from "./styles/global";

/* PAGES */
import Loading from "./page/LoadingPage";
import Home from "./page/Home";
import Register from "./page/Register";
import Login from "./page/Login";
import About from "./page/About"
import AddCollection from './page/AddCollection';
import AddCategory from './page/AddCategory';
import AddBookmark from './page/AddBookmark';
import Account from './page/Account';
import PageNotFound from './page/PageNotFound';
import { AuthContext } from "./helpers/AuthContext";
// import Tryy from './page/try';

function App() {


  //USE STATES
  const [open, setOpen] = useState(false);
  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
    status: false
  });


  /* USE EFFECT FOR REFRESH*/
  useEffect(() => {
    axios.get("http://localhost:3001/register/auth",
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      if (response.data.error)
        setAuthState({ ...authState, status: false });
      else
        setAuthState({
          email: response.data.email,
          id: response.data.id,
          status: true
        });
    })
    /* REMOVE THE ESLINT-DISABLE IF YOU WANT TO SEE WARNING [ITS USELESS EITHERWAY] */
  }, []); // eslint-disable-line react-hooks/exhaustive-deps   


  //DRAWER
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  //LOGOUT
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      email: "",
      id: 0,
      status: false
    });
  }



  return (
    <Box>
      <AuthContext.Provider value={{ authState, setAuthState }}>

        {/* NAVIGATION PART */}

        <Router>
          <AppBar position="fixed" sx={{ background: "#6633ff", position: "sticky" }}>

            {/* AuthSTATE */}

            {!authState.status ? (                                                                                  /* LOGGED OUT */
              <>
                <Toolbar>
                  <Box sx={{ display: "flex", width: "100%" }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Link to="/">
                        <img
                          src="/pictures/Logo/BookmarkLogo.png"
                          alt="Bookmark Website"
                          height="80"
                          width="250"
                        />
                      </Link>
                    </Box>

                    {matches ? (                                                                            /* NAVIGATION MOBILE HERE */
                      <Drawer
                        anchor="right"
                        onClose={() => setOpen(false)}
                        open={open}
                        onOpen={() => setOpen(true)}
                        PaperProps={{ style: { background: "#6633ff" } }}>
                        <List>
                          <ListItem button divider sx={{ padding: "20px" }} >
                            <ListItemIcon>
                              <Link to="/about" className='NavBarDecoration'>
                                <Typography variant="h5" sx={global.TypogBut}> About </Typography>
                              </Link>
                            </ListItemIcon>
                          </ListItem>
                          <ListItem button divider sx={{ padding: "20px" }} >
                            <ListItemIcon>
                              <Link to="/login" className='NavBarDecoration'>
                                <Typography variant="h5" sx={global.TypogBut}> Sign In </Typography>
                              </Link>
                            </ListItemIcon>
                          </ListItem>

                          <ListItem button divider sx={{ padding: "20px" }} >
                            <ListItemIcon>
                              <Link to="/register" className='NavBarDecoration'>
                                <Typography variant="h5" sx={global.TypogBut}> Register </Typography>
                              </Link>
                            </ListItemIcon>
                          </ListItem>
                        </List>
                      </Drawer>
                    ) : (                                                                                   /* NAVIGATION DESKTOP HERE */
                      <Box sx={{ display: "flex", flexGrow: 7, marginTop: "25px" }}>
                        <Box sx={{ flexGrow: 7 }}>
                          <ButtonBase sx={global.buttonnav}>
                            <Link to="/about" className='NavBarDecoration'>
                              <Typography variant="h5" sx={global.TypogBut}> About </Typography>
                            </Link>
                          </ButtonBase>
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                          <ButtonBase sx={global.buttonnav}>
                            <Link to="/login" className='NavBarDecoration'>
                              <Typography variant="h5" sx={global.TypogBut}> Login </Typography>
                            </Link>
                          </ButtonBase>
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                          <ButtonBase sx={global.buttonnav}>
                            <Link to="/register" className='NavBarDecoration'>
                              <Typography variant="h5" sx={global.TypogBut}> Register </Typography>
                            </Link>
                          </ButtonBase>
                        </Box>
                      </Box>
                    )}

                    {/* MENUBAR */}
                    {matches ? (
                      <IconButton onClick={() => setOpen(true)}>
                        <img
                          src="/pictures/assets/menu_bar.svg"
                          alt="Menubar"
                          height="30"
                          width="30"
                        />
                      </IconButton>) : (null)}

                  </Box>
                </Toolbar>
              </>
            ) : (                                                                                                   /* LOGGED IN */
              <>
                <Toolbar>
                  <Box sx={{ display: "flex", width: "100%" }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Link to="/add_collection">
                        <img
                          src="/pictures/Logo/BookmarkLogo.png"
                          alt="Bookmark Website"
                          height="80"
                          width="250"
                        />
                      </Link>
                    </Box>

                    {matches ? (                                                                            /* NAVIGATION MOBILE HERE */
                      <Drawer
                        anchor="right"
                        onClose={() => setOpen(false)}
                        open={open}
                        onOpen={() => setOpen(true)}
                        PaperProps={{ style: { background: "#6633ff" } }}>
                        <List>
                          <ListItem button divider sx={{ padding: "20px" }} >
                            <ListItemIcon>
                              <Link to="/about" className='NavBarDecoration'>
                                <Typography variant="h5" sx={global.TypogBut}> How to Use? </Typography>
                              </Link>
                            </ListItemIcon>
                          </ListItem>
                          <ListItem button divider sx={{ padding: "20px" }} >
                            <ListItemIcon>
                              <Link to="/account" className='NavBarDecoration'>
                                <Typography variant="h5" sx={global.TypogBut}> Account </Typography>
                              </Link>
                            </ListItemIcon>
                          </ListItem>

                          <ListItem button divider sx={{ padding: "20px" }} >
                            <ListItemIcon>
                              <Link onClick={logout} to="/" className='NavBarDecoration'>
                                <Typography variant="h5" sx={global.TypogBut}> Sign Out </Typography>
                              </Link>
                            </ListItemIcon>
                          </ListItem>
                        </List>
                      </Drawer>
                    ) : (                                                                                   /* NAVIGATION DESKTOP HERE */
                      <Box sx={{ display: "flex", flexGrow: 7, marginTop: "25px" }}>
                        <Box sx={{ flexGrow: 7 }}>
                          <ButtonBase sx={global.buttonnav}>
                            <Link to="/about" className='NavBarDecoration'>
                              <Typography variant="h5" sx={global.TypogBut}> How to Use? </Typography>
                            </Link>
                          </ButtonBase>
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                          <ButtonBase sx={global.buttonnav}>
                            <Link to="/account" className='NavBarDecoration'>
                              <Typography variant="h5" sx={global.TypogBut}> Account </Typography>
                            </Link>
                          </ButtonBase>
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                          <ButtonBase sx={global.buttonnav}>
                            <Link onClick={logout} to="/login" className='NavBarDecoration'>
                              <Typography variant="h5" sx={global.TypogBut}> Sign Out </Typography>
                            </Link>
                          </ButtonBase>
                        </Box>
                      </Box>
                    )}

                    {/* MENUBAR */}
                    {matches ? (
                      <IconButton onClick={() => setOpen(true)}>
                        <img
                          src="/pictures/assets/menu_bar.svg"
                          alt="Menubar"
                          height="30"
                          width="30"
                        />
                      </IconButton>) : (null)}

                  </Box>
                </Toolbar>
              </>
            )}
          </AppBar>

          {/* ROUTES HERE */}
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/loading" exact element={<Loading />} />
            <Route path="/about" exact element={<About />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/add_collection" exact element={<AddCollection />} />
            <Route path="/add_category/:id/:CollectionName" exact element={<AddCategory />} />
            <Route path="/add_bookmark/:id/:CollectionName/:CATid/:CategoryName" exact element={<AddBookmark />} />
            <Route path="/account" exact element={<Account />} />

            {/* <Route path="/try" exact element={<Tryy />} /> */}
            <Route path="*" exact element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </Box>
  );
}

export default App;