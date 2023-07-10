'use client'
import React from 'react'
import '@/app/style/home.css'
import { Box } from '@mui/material'
import Carousel from './Components/Carousel'
import TopRatedMovie from './Components/TopRatedMovie'
import PopularmoviePage from './Components/PopularMovies'
import UpcomingMovie from './Components/UpcomingMovie'


const page: React.FC = () => {
  return (
    <Box>
      <Carousel />
      <UpcomingMovie />
      <TopRatedMovie/>
      <PopularmoviePage />
    </Box>
  );
};

export default page;
