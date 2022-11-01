import React from 'react'
import { Box, Typography } from "@mui/material";

/* GLOBAL STYLES */
import global from "../styles/global";

function AdminDash({ children }) {

  return (
    <Box sx={global.adminBoxStylesMain}>

      {/* PANEL */}
      <Box sx={global.adminBoxStylesPanel}>
        <Typography>PANEL</Typography>
      </Box>

      {/* CHANGEABLE BODY */}
      <Box sx={global.adminBoxStylesBody}>
        {children}
      </Box>
    </Box>
  )
}

export default AdminDash