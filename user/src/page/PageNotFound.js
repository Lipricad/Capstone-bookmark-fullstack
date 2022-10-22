import React from 'react'
import { Box, Typography, Link } from "@mui/material"
import { useNavigate } from "react-router-dom"

/* GLOBAL STYLES && IMPORTS */
import global from "../styles/global";

function PageNotFound() {
  let history = useNavigate();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "91vh", flexWrap: "wrap", background: "#FFFFFF" }}>
      <Box sx={{ flex: "1 1 auto", display: "flex", alignItems: "flex-end", justifyContent: "center", marginTop: "10vh" }}>
        <Typography variant="h3" sx={global.TypogTitle}> Page Not Found</Typography>
      </Box>
      <Box sx={{ flex: "1 1 auto", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
        <img
          id="notfound"
          src="/pictures/Logo/NotFound.png"
          alt="Not Found :("
          height="400"
          width="400"
        />
      </Box>
      <Box sx={{ flex: "20 1 auto", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
        <Link
          onClick={() => { history(`/`); }}
          sx={{ textDecoration: "none" }}>
          <Typography sx={{ cursor: "pointer", color: "#6633ff", fontSize: "18px" }}> Go to HomePage </Typography>
        </Link>
      </Box>
    </Box>
  )
}

export default PageNotFound