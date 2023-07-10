'use client'
import React from 'react'
import '@/app/style/home.css'
import { Grid, Typography, Box } from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { TopRated } from './API/TopRated'


interface TMDBMovie {
  id: number;
  name: string
  poster_path: string
  release_date: string
  vote_average: number
}

const TopRatedMovie: React.FC = () => {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);

  useEffect(() => {
    async function TopratedmovieApi() {
      try {
        const ratedmovie = await TopRated();
        // console.log(upcommingApi);
        if (ratedmovie && ratedmovie.results) {
          setMovies(ratedmovie.results);
        }
      } catch (error) {
        console.error('Error fetching data from TMDB:', error);
      }
    }
   TopratedmovieApi()
  }, []);

  return (
    <Box>
      <Typography variant='h4' sx={{ color: "gray", padding: "10px 20px", textTransform: "uppercase", textAlign: "justify" }}>Top Rated </Typography>
      <Grid className="scrollhide" sx={{ display: "flex", overflowX: "scroll", "&::-webkit-scrollbar": { display: "none" } }} >
        {
          movies.map((movie) => {
            return (
              <Grid container key={movie.id} sx={{ cursor: "pointer", }}>
                <Grid sx={{ border: "none", color: "white", textAlign: "center", overflow: "hidden" }} >
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
      
      </Grid>
    </Box>
  );
};

export default TopRatedMovie;
