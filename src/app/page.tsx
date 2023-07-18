'use client'
import React from 'react'
import '@/app/style/home.css'
import { Box } from '@mui/material'
import Carousel from './Components/Carousel'
import TopRatedMovie from './Components/TopRatedMovie'
import PopularmoviePage from './Components/PopularMovies'
import UpcomingMovie from './Components/UpcomingMovie'
import SearchBar from './Components/SearchField'


const page: React.FC = () => {
  return (
    <Box id="home-page">
      <Carousel/>
      <UpcomingMovie />
      <TopRatedMovie/>
      <SearchBar/>
      <PopularmoviePage />
    </Box>
  );
};

export default page;
