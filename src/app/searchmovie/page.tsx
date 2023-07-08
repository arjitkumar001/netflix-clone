'use client'
import React from 'react'
import Search from '../Components/Search/Search'
import Box from '@mui/material/Box';

const page = () => {
  return (
    <Box sx={{marginTop:"70px"}}>
        <Box>
      <h1>Movie Search</h1>
      <Search />
    </Box>
    </Box>
  )
}

export default page
