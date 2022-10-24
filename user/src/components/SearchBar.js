import React, { useState } from 'react'
import { Box, TextField, InputAdornment, Link, Typography } from "@mui/material"

/* GLOBAL STYLES */
import global from "../styles/global";

function SearchBar({ placeholder, data }) {

  const [filteredData, setFilteredData] = useState([]);

  const haldleFilter = (event) => {
    const searchWord = event.target.value
    const newFilter = data.filter((value) => {
      return value.BookmarkName.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }

  }


  return (
    <Box>
      {/* Search Inputs */}
      <Box>
        <TextField
          autoComplete='off'
          id="search_bar"
          placeholder={placeholder}
          type="search"
          variant="filled"
          fullWidth
          onChange={haldleFilter}

          sx={global.searchfield}

          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <img
                  src="/pictures/assets/search.svg"
                  alt="search"
                  height="30"
                  width="30"
                />
              </InputAdornment>
            )
          }}
        />
        <Box id="searchIcon"> </Box>
      </Box>

      {filteredData.length !== 0 ? (
        <>
          <Box sx={global.dataResult}>
            {filteredData.slice(0, 10).map((value, key) => {
              return (
                <Link sx={global.dataItem}>
                  <Typography sx={global.dataItemTypog}>
                    <img height="16" width="16" alt="icon" src={`http://www.google.com/s2/favicons?domain=${value.Bookmark_URL}`} />
                    {value.BookmarkName}
                  </Typography>
                </Link>
              )
            })}
          </Box>
        </>
      ) : (<> <Box sx={global.dataResultBlank}></Box></>)}

    </Box>
  )
}

export default SearchBar