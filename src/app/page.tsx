'use client'
import React from 'react'
import '@/app/style/home.css'
import { Grid, Typography, Box } from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { FetchTMDBData } from './Components/FetchTMDBData';
import Carousel from './Components/Carousel'


interface TMDBMovie {
  id: number;
  title: string
  poster_path: string
  release_date: string
  vote_average: number
}

const page: React.FC = () => {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);

  useEffect(() => {
    async function fetchPopularMovies() {
      try {
        const upcommingApi = await FetchTMDBData();
        // console.log(upcommingApi);
        if (upcommingApi && upcommingApi.results) {
          setMovies(upcommingApi.results);
        }
      } catch (error) {
        console.error('Error fetching data from TMDB:', error);
      }
    }
    fetchPopularMovies()
  }, []);

  return (
    <Box sx={{ marginTop: "70px" }}>
      <Carousel />
      <Typography variant='h4' sx={{ color: "gray", padding: "10px 20px", textTransform: "uppercase", textAlign: "justify" }}>Up Coming</Typography>
      <Box className="scrollhide" sx={{ display: "flex", overflowX: "scroll", "&::-webkit-scrollbar": { display: "none" } }} >
        {
          movies.map((movie) => {
            return (
              <Grid key={movie.id} item xs={12} sm={12} md={3} lg={2} xl={2} sx={{ padding: "10px 20px", cursor: "pointer", }}>
                <Grid sx={{ border: "none", color: "white", textAlign: "center", }} >
                  <Image
                    className='home-Img'
                    src={"http://image.tmdb.org/t/p/w500" + movie.poster_path}
                    alt=""
                    height={350}
                    width={250}
                    priority={true} // Set priority to true
                    loading='eager' // Set loading to eager 
                  />
                </Grid>
              </Grid>
            )
          })
        }
      </Box>

    </Box>
  );
};

export default page;
