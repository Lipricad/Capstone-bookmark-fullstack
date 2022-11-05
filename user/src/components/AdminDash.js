import React from 'react'
import { Box, Typography, List, ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom"

/* GLOBAL STYLES */
import global from "../styles/global";

function AdminDash({ children }) {
  let history = useNavigate();

  return (
    <Box sx={global.adminBoxStylesMain}>

      {/* PANEL */}
      <Box sx={global.adminBoxStylesPanel}>
        <Box sx={global.adminBoxStylesPanelSub1}>
          <Typography sx={global.adminTitleTypog}> DASHBOARD </Typography>
        </Box>

        <Box sx={global.adminBoxStylesPanelSub2}>
          <ButtonBase sx={global.ColectionButtonCol} onClick={() => history("/admin/manage-account-user")}>
            <Typography sx={global.adminTitleTypogSub}> Manage User </Typography>
          </ButtonBase>

          {/* VIEW ADMIN FUTURE */}

          {/* <ButtonBase sx={global.ColectionButtonCol} onClick={() => history("/admin/manage-account-user")}>
            <Typography sx={global.adminTitleTypogSub}> View Admin </Typography>
          </ButtonBase> */}
        </Box>
      </Box>

      {/* CHANGEABLE BODY */}
      <Box sx={global.adminBoxStylesBody}>
        {children}
      </Box>
    </Box>
  )
}

export default AdminDash