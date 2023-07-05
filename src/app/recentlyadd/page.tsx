'use client'
import * as React from 'react';
import { useState, useEffect } from 'react'
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import Image from 'next/image';
import { Daymovie } from '../Components/Daymovie';
import '@/app/style/home.css'
interface movieData {
  id: string;
  poster_path: string;
  original_title: string;
  media_type: string;
  vote_count: number;

}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function page() {
  const [movie, setMovie] = useState<movieData[]>([])

  useEffect(() => {
    async function fetchDayMovies() {
      try {
        const daymoviedata = await Daymovie();
        console.log(daymoviedata);
        if (daymoviedata && daymoviedata.results) {
          setMovie(daymoviedata.results);
        }
      } catch (error) {
        console.error('Error fetching data from TMDB:', error);
      }
    }
    fetchDayMovies()
  }, []);
  return (
    <Box className="mt-80" sx={{ flexGrow: 1 }}>
      <Typography variant='h4' sx={{ color: "red", padding: "10px 20px", textTransform: "capitalize" }}><u>trending movies</u></Typography>

      <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(20)).map((_, index) => (
          <Grid xs={12} sm={4} md={4} lg={3} key={index}>
            <Box>
              <Item sx={{ backgroundColor: "transparent", rowGap: "10px" }}>
                {/* Render the movies based on the index */}
                {movie[index] && (
                  <Box key={movie[index].id} sx={{ padding: "10px 0px", cursor: "pointer" }}>
                    <Box sx={{ border: "2px solid gray", color: "white", textAlign: "center" }} height={400}>
                      <Image
                        src={"http://image.tmdb.org/t/p/w500" + movie[index].poster_path}
                        alt=""
                        height={250}
                        width={300}
                        style={{ padding: "5px 0px" }}
                      />
                      <Typography variant='body1' sx={{ color: "red", textAlign: "center", paddingLeft: "10px" }}>{movie[index].original_title}</Typography>
                      <Typography variant='body1' sx={{ color: "red", textAlign: "justify", paddingLeft: "10px" }}>{movie[index].media_type}</Typography>
                      <Typography sx={{ fontSize: "14px", color: "orange", textAlign: "right", paddingTop: "10px", fontWeight: "bold", borderRadius: "50%", paddingRight: "10px" }} >
                        <span style={{ color: "white" }}>Vote: </span>{movie[index].vote_count}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Item>
            </Box>
          </Grid>
        ))}
      </Grid>


    </Box>
  );
}
