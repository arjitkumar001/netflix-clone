'use client'
import * as React from 'react';
import { useState, useEffect } from 'react'
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import Image from 'next/image';
import { TvShow } from '../Components/TvShows';
import '@/app/style/home.css'
interface movieData {
  id: string;
  poster_path: string;
  original_name: string;
  media_type: string;
  vote_average: number;

}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function page() {
  const [tvShow, setTvShow] = useState<movieData[]>([])

  useEffect(() => {
    async function fetchTvShow() {
      try {
        const tvShow = await TvShow();
        console.log( tvShow);
        if ( tvShow &&  tvShow.results) {
          setTvShow(tvShow.results);
        }
      } catch (error) {
        console.error('Error fetching data from TMDB:', error);
      }
    }
    fetchTvShow()
  }, []);
  return (
    <Box className="mt-80" sx={{ flexGrow: 1 }}>
      <Typography variant='h4' sx={{ color: "skyblue", padding: "10px 20px", textTransform: "capitalize" }}><u>TV Shows</u></Typography>

      <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(20)).map((_, index) => (
          <Grid xs={12} sm={4} md={4} lg={3} key={index}>
            <Box >
              <Item sx={{ backgroundColor: "transparent", rowGap: "10px" }}>
                {/* Render the movies based on the index */}
                {tvShow[index] && (
                  <Box key={tvShow[index].id} sx={{ padding: "10px 0px", cursor: "pointer" }}>
                    <Box sx={{ border: "2px solid gray", color: "white", textAlign: "center" }} height={400}>
                      <Image
                        src={"http://image.tmdb.org/t/p/w500" + tvShow[index].poster_path}
                        alt=""
                        height={250}
                        width={300}
                        style={{ padding: "5px 0px" }}
                      />
                      <Typography variant='body1' sx={{ color: "red", textAlign: "center", paddingLeft: "10px" }}>{tvShow[index].original_name}</Typography>
                      <Typography variant='body1' sx={{ color: "red", textAlign: "justify", paddingLeft: "10px",textDecoration:"capitalize" }}><u style={{color:"gray"}}>Medai Type:</u> {tvShow[index].media_type}</Typography>
                      <Typography sx={{ fontSize: "14px", color: "orange", textAlign: "right", paddingTop: "10px", fontWeight: "bold", borderRadius: "50%", paddingRight: "10px" }} >
                        <span style={{ color: "white" }}>Vote avg.: </span>{tvShow[index].vote_average}
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
