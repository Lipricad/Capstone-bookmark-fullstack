import React, { useEffect, useState } from 'react';
import { Box, Typography} from "@mui/material"
import axios from 'axios';

function Try() {
  const [listOfCategory, setlistOfCategory] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/category").then((response) => {
      setlistOfCategory(response.data);
    });
  }, []);

  return (
    <Box className="App">
      {listOfCategory.map((value, key) => {
        return (

          <Box className="Box"  key={value.id}>

            <Typography sx={{marginTop: "100px"}} >{value.CategoryName}</Typography>

          </Box>

        )
      })}
    </Box>
  )
}

export default Try