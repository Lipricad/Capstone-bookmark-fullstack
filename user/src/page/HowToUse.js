import React, { useEffect } from 'react'
import { Box, Typography, Paper } from "@mui/material"
import { useNavigate } from "react-router-dom"

/* GLOBAL STYLES */
import global from "../styles/global";

function HowToUse() {

  let history = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken"))
      history("/login")

    /* REMOVE THE ESLINT-DISABLE IF YOU WANT TO SEE WARNING [ITS USELESS EITHERWAY] */
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={global.HowtoBoxMain}>

      {/* STEP 1 */}
      <Box sx={global.HowtoBoxes}>
        <Box sx={global.HowtoTypogs}>
          <Typography variant="h6" sx={{ fontSize: "21px" }}>
            Step 1: Create a new collection, click the new collection button and input a name for the new collection then click CONFIRM.
          </Typography>
        </Box>
        <Paper sx={{ background: "#3b3b3b" }}>
          <img
            id="autoadjust"
            src="/pictures/tutorial/Collection.png"
            alt="Loading"
            height="300"
            width="600"
          />
        </Paper>
      </Box>

      {/* STEP 2 */}
      <Box sx={global.HowtoBoxes}>
        <Box sx={global.HowtoTypogs}>
          <Typography variant="h6" sx={{ fontSize: "21px" }}>
            Step 2: Create a new category, to create a new category under your collection. Click the new category button and input the name of your new category then click CONFIRM.
          </Typography>
        </Box>
        <Paper sx={{ background: "#3b3b3b" }}>
          <img
            id="autoadjust"
            src="/pictures/tutorial/Category.png"
            alt="Loading"
            height="300"
            width="600"
          />
        </Paper>
      </Box>

      {/* STEP 3 */}
      <Box sx={global.HowtoBoxes}>
        <Box sx={global.HowtoTypogs}>
          <Typography variant="h6" sx={{ fontSize: "21px" }}>
            Step 3: To add bookmark under your category just click the add bookmark button then input the url (link) and the name of the website you want to save then click CONFIRM.
          </Typography>
        </Box>
        <Paper sx={{ background: "#3b3b3b" }}>
          <img
            id="autoadjust"
            src="/pictures/tutorial/Bookmark.png"
            alt="Loading"
            height="300"
            width="600"
          />
        </Paper>
      </Box>

      {/* STEP 4 */}
      <Box sx={global.HowtoBoxes}>
        <Box sx={global.HowtoTypogs}>
          <Typography variant="h6" sx={{ fontSize: "21px" }}>
            Step 4: To access your saved bookmark, just click on the name of the bookmark that you save and it will automatically open that link on new tab.
          </Typography>
        </Box>
        <Paper sx={{ background: "#3b3b3b" }}>
          <img
            id="autoadjust"
            src="/pictures/tutorial/Bookmark2.png"
            alt="Loading"
            height="300"
            width="600"
          />
        </Paper>
      </Box>
    </Box >
  )
}

export default HowToUse