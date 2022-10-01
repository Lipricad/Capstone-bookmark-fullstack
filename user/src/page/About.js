import React from 'react'
import { Box, Typography } from "@mui/material";


function About() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "black" }}>
      <Box sx={{ textAlign: "center", background: "#3b3b3b", flex: "1 1 auto", color: "white" }}>
        <Typography variant="h2" sx={{ paddingTop: "120px", margin: "0 20px 0 20px" }}> What is Bookmark</Typography>
        <Typography variant="h4" sx={{ paddingTop: "50px", margin: "0 10px 20px 10px" }}>Bookmark is a web-based website organizer that prioritizes ease of access, privacy and use!</Typography>
      </Box>
      <Box sx={{ textAlign: "left", background: "#666666", flex: "1 1 auto", color: "white" }}>
        <Typography variant="h2" sx={{ paddingTop: "80px", marginLeft: "20px" }}> Privacy</Typography>
        <Typography variant="h4" sx={{ paddingTop: "50px", marginLeft: "20px" }}> Create an account to protect your collection of bookmarks.</Typography>
        <Typography variant="h4" sx={{ paddingTop: "10px", margin: "0 0 20px 20px" }}> Your bookmarks are kept private and only you have the access for it.</Typography>
      </Box>
      <Box sx={{ textAlign: "right", background: "#3b3b3b", flex: "1 1 auto", color: "white" }}>
        <Typography variant="h2" sx={{ paddingTop: "80px", marginRight: "20px" }}> Available Everywhere</Typography>
        <Typography variant="h4" sx={{ paddingTop: "50px", margin: "0 20px 20px 0" }}> Bookmark website can be accessed and managed through desktop, mobile and any browsers!</Typography>
      </Box>
    </Box>
  )
}

export default About