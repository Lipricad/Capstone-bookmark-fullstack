import React, { useEffect } from 'react'
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"

function Home() {

  let history = useNavigate();

  /* VERIFY IF THE USER IS LOGGED IN, IF THEY ARE THEY CANT ACCESS THE PAGE*/

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      history("/add_collection")
    }
    /* REMOVE THE ESLINT-DISABLE IF YOU WANT TO SEE WARNING [ITS USELESS EITHERWAY] */
  }, []); // eslint-disable-line react-hooks/exhaustive-deps 

  return (
    <Box sx={{
      display: "flex", flexDirection: "column", minHeight: "100vh", background: 'url(pictures/background/home_bg.jpg)', 
      backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundPosition: "center"
    }}>
      <Box>
        <Typography variant="h2" sx={{ color: "#6633ff", fontWeight: "bold", textAlign: "center", paddingTop: "120px", backgroundColor: "rgba(255,255,255,0.2)" }}> Access your bookmark wherever you are </Typography>
        <Typography variant="h3" sx={{ color: "#282828", textAlign: "center", paddingTop: "20px", backgroundColor: "rgba(255,255,255,0.2)" }}> Secure, Fast and Accessible </Typography>
      </Box>
    </Box>
  )
}

export default Home