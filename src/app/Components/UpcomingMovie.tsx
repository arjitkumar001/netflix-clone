// import React from 'react'
// import '@/app/style/home.css'
// import { Grid, Typography, Box } from '@mui/material'
// import Image from 'next/image'
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
// import { FetchTMDBData } from './API/FetchTMDBData'


// interface TMDBMovie {
//   id: number;
//   title: string
//   poster_path: string
//   release_date: string
//   vote_average: number
// }

// const UpcomingMovie: React.FC = () => {
//   const [movies, setMovies] = useState<TMDBMovie[]>([]);

//   useEffect(() => {
//     async function fetchUpcomingMovie() {
//       try {
//         const upcommingApi = await FetchTMDBData();
//         // console.log(upcommingApi);
//         if (upcommingApi && upcommingApi.results) {
//           setMovies(upcommingApi.results);
//         }
//       } catch (error) {
//         console.error('Error fetching data from TMDB:', error);
//       }
//     }
//    fetchUpcomingMovie()
//   }, []);

//   return (
//     <Box>
//       <Typography variant='h4' sx={{ color: "gray", padding: "10px 20px", textTransform: "uppercase", textAlign: "justify" }}>Up Coming</Typography>
//       <Grid className="scrollhide" sx={{ display: "flex", overflowX: "scroll", "&::-webkit-scrollbar": { display: "none" } }} >
//         {
//           movies.map((movie) => {
//             return (
              
//               <Grid container key={movie.id} sx={{ cursor: "pointer", }}>
              
//                 <Grid sx={{ border: "none", color: "white", textAlign: "center", overflow: "hidden" }} >
//                   <Image
//                     className='home-Img'
//                     src={"http://image.tmdb.org/t/p/w500" + movie.poster_path}
//                     alt=""
//                     height={300}
//                     width={250}
//                     priority={true} // Set priority to true
//                     loading='eager' // Set loading to eager 
//                   />
//                 </Grid>
             
//               </Grid>
//             )
//           })
//         }
      
//       </Grid>

//     </Box>
//   );
// };

// export default UpcomingMovie;

import React, { useRef } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import Image from 'next/image';
import { FetchTMDBData } from './API/FetchTMDBData';

interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const UpcomingMovie: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageClick = (scrollOffset: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + scrollOffset,
        behavior: 'smooth',
      });
    }
  };

  // Fetch and set movies using useEffect
    const [movies, setMovies] = useState<TMDBMovie[]>([]);

  useEffect(() => {
    async function fetchUpcomingMovie() {
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
   fetchUpcomingMovie()
  }, []);

  return (
    <Box>
      <Typography variant='h4' sx={{ color: 'gray', padding: '10px 20px', textTransform: 'uppercase', textAlign: 'justify' }}>
        Up Coming
      </Typography>
      <Grid
        ref={containerRef}
        className='scrollhide'
        sx={{ display: 'flex', overflowX: 'scroll', '&::-webkit-scrollbar': { display: 'none' },position:"relative" }}
      >
        {movies.map((movie) => (
          <Grid
            key={movie.id}
            container
            sx={{ cursor: 'pointer' }}
             // Adjust the scrollOffset as needed
          >
            <Grid sx={{ border: 'none', color: 'white', textAlign: 'center', overflow: 'hidden' }}>
              <Image
                className='home-Img'
                src={'http://image.tmdb.org/t/p/w500' + movie.poster_path}
                alt=''
                height={300}
                width={250}
                priority={true}
                loading='eager'
              />
            </Grid>
          </Grid>
        ))}
       
      </Grid>
      <Grid onClick={() => handleImageClick(300)} sx={{position:"fixed",right:"0px",top:"100px"}}><Button variant="contained">scroll</Button></Grid>
    </Box>
  );
};

export default UpcomingMovie;
