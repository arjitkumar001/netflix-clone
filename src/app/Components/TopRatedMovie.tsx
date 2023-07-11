'use client'
import React from 'react'
import '@/app/style/home.css'
import { Grid, Typography, Box } from '@mui/material'
import Image from 'next/image'
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { TopRated } from './API/TopRated'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container/Container'

interface TMDBMovie {
  id: number;
  name: string
  poster_path: string
  first_air_date: string
  vote_average: number
  original_language:string
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  width: "40%",
  transform: 'translate(-50%, -50%)',
  bgcolor: '#808080',
  boxShadow: 24,
  p: 2,
};

const TopRatedMovie: React.FC = () => {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedTvShow, setSelectedTvShow] = useState<TMDBMovie | null>(null);

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
  const containerRef = useRef<HTMLDivElement>(null);
  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft - 300,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + 300,
        behavior: 'smooth',
      });
    }
  };
  const handleOpen = (tvShow: TMDBMovie) => {
    setSelectedTvShow(tvShow);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTvShow(null);
  };


  return (
    <Box>
       <Container maxWidth="xl">
        {/* Modal start here=================================== */}
        {selectedTvShow && (
          <Modal
            open={open}
            onClose={handleClose}

          >
            <Box className="model-body" sx={{ ...style, display: "flex", }} >
              <Grid item xs={12} sm={12} md={6} lg={6} sx={{ alignItems: "center", width: "100%" }}>

                <img
                  className='tvshow-mod-img'
                  src={'http://image.tmdb.org/t/p/w500' + selectedTvShow.poster_path}
                  alt=''
                  height="350px"
                  width="100%"
                  style={{ cursor: 'progress' }}
                  loading='eager' // Set loading to eager 
                />

              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} sx={{ textAlign: "justify", paddingLeft: "20px", fontWeight: "bold", width: "100%" }}>
                <Typography sx={{ textAlign: "right" }}>
                  <IconButton onClick={handleClose} >
                    <CloseIcon sx={{ fontSize: '24px', fontWeight: '800', color: 'gray', backgroundColor: 'lightgray', borderRadius: '5px', ':hover': { color: 'darkgrey' } }} />
                  </IconButton></Typography>
                <Grid sx={{ display: "flex", flexDirection: "column", height: "300px", justifyContent: "center" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: { xs: "14px", sm: "16px", md: "20px",color:"white" } }}>
                    <span style={{color:"black"}}>Title:</span>  {selectedTvShow.name}
                  </Typography>
                  <Typography sx={{ mt: 2, fontWeight: "bold",color:"#ADFF2F" }}>
                    <span style={{color:"black"}}>Release Date:</span> {selectedTvShow.first_air_date}
                  </Typography>
                  <Typography sx={{ mt: 2, fontWeight: "bold", color: '#FFFAF0' }}>
                    <span style={{color:"black"}}>Language:</span> {selectedTvShow.original_language}
                  </Typography>
                  <Typography sx={{ fontSize: '14px', color: '#ADFF2F', paddingTop: '10px', fontWeight: 'bold', borderRadius: '50%', paddingRight: '10px' }}>
                    <span style={{ color: 'black' }}>Vote avg.: </span>{selectedTvShow.vote_average}
                  </Typography>
                  <Typography sx={{ display: "flex", alignItems: "center", marginTop: "20px", fontWeight: "bold", color: "black", backgroundColor: "gray", borderRadius: "50px", transition: ".3s", cursor: "pointer", mt: { lg: "30px", md: "20px", sm: "20px", xs: "20px" }, ":hover": { backgroundColor: "lightgray" },width:"50%" }}>
                    <PlayCircleIcon sx={{ fontSize: "3rem", color: "brown" }} /> <span>Play Video</span><ArrowForwardIcon className='play-arrow' />
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        )}
      <Typography variant='h4' sx={{ color: "gray", padding: "10px 20px", textTransform: "uppercase", textAlign: "justify",fontSize:{xs:"20px"} }}>Top Rated </Typography>
      <Grid 
      ref={containerRef}
      className='scroll-btn'
       sx={{ display: "flex", overflowX: "scroll", "&::-webkit-scrollbar": { display: "none" },position:"relative" }} 
       >
      <Grid className='scroll-button' onClick={() => handleScrollLeft()} sx={{ position: 'sticky', top: 0, left: 0, zIndex: 1, ":hover": { backgroundColor: "black", opacity: "0.3" },borderRadius:"none",display:"flex",justifyContent:"center",alignItems:"center",padding:"0px 10px" }}>
          <ArrowBackIosIcon className='scroll-icon' sx={{ color: "black", fontSize: "2rem", zIndex: 2, }} />
        </Grid>
        {
          movies.map((movie) => {
            return (
              <Grid container key={movie.id} sx={{ cursor: "pointer", }}>
                <Grid sx={{ border: "none", color: "white", textAlign: "center", overflow: "hidden" }} >
                  <Image
                    onClick={() => handleOpen(movie)}
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
       <Grid className='scroll-button' onClick={() => handleScrollRight()} sx={{ position: 'sticky', top: 0, right: 0, zIndex: 1, ":hover": { backgroundColor: "black", opacity: "0.3" },borderRadius:"none",display:"flex",justifyContent:"center",alignItems:"center",padding:"0px 10px"  }} >
          <ArrowForwardIosIcon className='scroll-icon' sx={{ color: "black", fontSize: "2rem", zIndex: 2, }} />
        </Grid>
      </Grid>
     </Container>
    </Box>
  );
};

export default TopRatedMovie;
