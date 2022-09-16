import React from 'react'
// import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Typography, IconButton } from "@mui/material"
// import * as Yup from 'yup';
// import { TextField } from "formik-material-ui"
// import axios from 'axios';


/* GLOBAL STYLES */
import global from "../styles/global";

function AddBookmark() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#3b3b3b" }}>
      <Box sx={{ display: "flex", flex: "1 1 auto", background: "#3b3b3b", borderBottom: "3px solid", color: "#272727", marginTop: "85px", alignItems: "center" }}>
        <Typography variant="h3" sx={{ margin: "0 0 0 20px", color: "#Afa9a9", fontWeight: "bold" }}> TITLE TRY LNG PO </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", flex: "15 1 auto" }}>

        {/* BOX FOR COLLECTION */}
        <Box sx={{ flex: "1 1 auto", background: "#3b3b3b", display: "flex", flexDirection: "column"  }}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: "1 1 auto" }}>
              <Typography variant="h4" sx={global.TypogCollection}> Collection</Typography>
            </Box>
            <Box sx={{ flex: "1 1 auto" }}>
              <IconButton>
                <img
                  src="/pictures/assets/3_dots.svg"
                  alt="Menubar"
                  height="30"
                  width="30"
                />
              </IconButton>
            </Box>
          </Box>
          <Box>

          </Box>
        </Box>

        {/* BOX FOR CATEGORIES */}
        <Box sx={{ flex: "15 1 auto", background: "#666666" }}>

        </Box>
      </Box>
    </Box>
  )
}

export default AddBookmark