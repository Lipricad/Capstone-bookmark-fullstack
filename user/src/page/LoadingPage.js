import React from 'react'
import { Box, Typography, ButtonBase } from "@mui/material"
import { useNavigate } from "react-router-dom"

/* GLOBAL STYLES && IMPORTS */
import global from "../styles/global";

function LoadingPage() {
  let history = useNavigate();

  return (

    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", flexWrap: "wrap", background: "#FFFFFF" }}>

      <Box sx={{ flex: "1 1 auto", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
        <ButtonBase onClick={setTimeout(() => { history(-1); }, 500)}> </ButtonBase>
        <Typography variant="h3" sx={global.TypogTitle}> Loading. Please Wait...</Typography>
      </Box>
      <Box sx={{ flex: "2 1 auto", display: "flex", alignItems: "flex-start", justifyContent: "center"}}>
        <img
          src="/pictures/assets/Loading_icon.svg"
          alt="Loading"
          height="400"
          width="400"
        />
      </Box>
    </Box>
  )
}

export default LoadingPage