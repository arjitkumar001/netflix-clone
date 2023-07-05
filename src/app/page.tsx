'use client'
import React from 'react'
import '@/app/style/home.css'
import { Grid, Typography, Box} from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { FetchTMDBData } from './Components/FetchTMDBData';



interface TMDBMovie {
  id: number;
  title: string
  poster_path: string
  release_date: string
  vote_average:number
}

const page: React.FC = () => {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);

  useEffect(() => {
    async function fetchPopularMovies() {
      try {
        const upcommingApi = await FetchTMDBData();
        console.log(upcommingApi);
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
    <Box className="mt-80">
      <Typography variant='h4' sx={{ color: "red", padding: "10px 20px", textTransform:"capitalize"}}><u>Upcoming...</u></Typography>
      <Box className="scrollhide" sx={{ display: "flex",overflowX:"scroll","&::-webkit-scrollbar":{display:"none"}}} >
        {
          movies.map((movie) => {
            return (
              <Grid  key={movie.id} item xs={12} sm={12} md={3} lg={2} xl={2} sx={{ padding: "10px 20px" ,cursor:"pointer"}}>
                <Grid sx={{ border: "2px solid gray", color: "white", textAlign: "center", padding: "10px 10px" }} height={400}>
                  <Image src={"http://image.tmdb.org/t/p/w500"+ movie.poster_path} alt="" height={250} width={300} />
                  <Typography variant='body1' sx={{ color: "red",textAlign:"justify" }} >{movie.title}</Typography>
                  <Typography variant='body2' sx={{ color: "yellow",textAlign:"right" }}>Release: {movie.release_date}</Typography>
                  <Typography sx={{fontSize:"14px", color:"white",textAlign:"right",paddingTop:"10px",fontWeight:"bold",borderRadius:"50%"}} >{movie.vote_average} <sup style={{fontSize:"12px",color:"orange"}}>%</sup></Typography>
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
