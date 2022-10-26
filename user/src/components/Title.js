import React from 'react'
import { Box, Typography, Tooltip } from "@mui/material"

function Title({ CollectionName, CategoryName }) {
  return (
    <Box sx={{ display: "flex", flex: "1 1 auto", background: "#8984D6", borderBottom: "2px solid #45436d", alignItems: "center", height: "10vh", maxHeight: "75px", }}>
      <Tooltip
        enterDelay={500} leaveDelay={50}
        title={
          <Typography> {CollectionName} {" → "} {CategoryName} </Typography>
        }>

        <Typography noWrap sx={{ fontSize: "2em", margin: "0 0 0 20px", color: "white", fontWeight: "bold", textAlign: "center", maxWidth: "100vw" }}>
          {CollectionName} {" → "} {CategoryName}
        </Typography>
      </Tooltip>
    </Box >
  )
}

export default Title