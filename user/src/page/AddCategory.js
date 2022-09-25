import React, { useEffect } from 'react'
import { Box, ButtonBase, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import axios from 'axios';

/* COMPONENTS */
import MainPageAddCol from '../components/MainPageAddCol'

/* GLOBAL STYLES */
import global from "../styles/global";


function AddCategory() {
  /* COLLECTION DATA */
  let { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/collection/byId/${id}`).then((response) => {
      console.log(response.data)
    });        /* REMOVE THE ESLINT-DISABLE IF YOU WANT TO SEE WARNING [ITS USELESS EITHERWAY] */
  }, []);   // eslint-disable-line react-hooks/exhaustive-deps                




  return (
    <MainPageAddCol>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>

        {/* CATEGORIES */}
        <Box sx={{ flex: "30" }}>

        </Box>

        {/* NEW CATEGORIES BUTTON */}
        <Box sx={{ flex: "1", display: "flex", flexDirection: "row" }}>

          <Box sx={{ flex: "5" }}> </Box>

          <Box sx={{ flex: "1" }}>
            <ButtonBase sx={global.buttonBase} type="submit" >
              <Typography variant="h5" sx={global.TypogBut}> New Category </Typography>
            </ButtonBase>
          </Box>
        </Box>

      </Box>
    </MainPageAddCol>
  )
}

export default AddCategory