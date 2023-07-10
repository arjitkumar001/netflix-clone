'use client'
import React from 'react'
import '@/app/style/home.css'
import { Grid, Typography, Box } from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { PopularMovie } from './API/PopularMovie'



interface TMDBMovie {
  id: number;
  name: string
  poster_path: string
  first_air_date: string
  vote_average: number
}

const PopularmoviePage: React.FC = () => {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);

  useEffect(() => {
    async function fetchPopularMovies() {
      try {
        const popularMovie = await PopularMovie();
        // console.log(upcommingApi);
        if (popularMovie  && popularMovie .results) {
          setMovies(popularMovie .results);
        }
      } catch (error) {
        console.error('Error fetching data from TMDB:', error);
      }
    }
    fetchPopularMovies()
  }, []);

  return (
    <Box>
      <Typography variant='h4' sx={{ color: "gray", padding: "10px 20px", textTransform: "uppercase", textAlign: "justify" }}>Popular Movie</Typography>
      <Box  className="scrollhide" sx={{ display: "flex", overflowX: "scroll", "&::-webkit-scrollbar": { display: "none" } }} >
        {
          movies.map((movie) => {
            return (
              <Grid container  key={movie.id}  sx={{ cursor: "pointer", }}>
                <Grid sx={{ border: "none", color: "white", textAlign: "center",overflow:"hidden" }} >
                  <Image
                    className='home-Img'
                    src={"http://image.tmdb.org/t/p/w500" + movie.poster_path}
                    alt=""
                    height={300}
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

export default PopularmoviePage;
