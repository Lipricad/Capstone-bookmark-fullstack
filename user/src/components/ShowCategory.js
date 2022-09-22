import React, { useEffect } from 'react'
import { Box, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import axios from 'axios';

function ShowCategory() {

  /* COLLECTION DATA */
  var { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/collection/byId/${id}`).then((response) => {
      console.log(response.data)
    });        /* REMOVE THE ESLINT-DISABLE IF YOU WANT TO SEE WARNING [ITS USELESS EITHERWAY] */
  }, []);   // eslint-disable-line react-hooks/exhaustive-deps                




  return (
    <Box>
      <Typography variant="h1" sx={{ marginTop: "200px" }}> {id} </Typography>
    </Box>
  )
}

export default ShowCategory