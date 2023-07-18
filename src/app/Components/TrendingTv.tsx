'use client'
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { TvShow } from '../Components/API/TvShows';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import '@/app/style/home.css';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Container from '@mui/material/Container/Container'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ShareIcon from '@mui/icons-material/Share';
import YouTubeIcon from '@mui/icons-material/YouTube';
interface movieData {
  id: string;
  poster_path: string;
  original_name: string;
  first_air_date: string;
  vote_average: number;
  original_language: string;
  overview: string
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  width: "50%",
  transform: 'translate(-50%, -50%)',
  bgcolor: '#171717',
};
const youtube = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: "100px",
  fill: "red"
};

export default function TrendingTv() {
  const [tvShow, setTvShow] = useState<movieData[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedTvShow, setSelectedTvShow] = useState<movieData | null>(null);
 

  useEffect(() => {
    async function fetchTvShow() {
      try {
        const tvShow = await TvShow();
        // console.log(tvShow);
        if (tvShow && tvShow.results) {
          setTvShow(tvShow.results);
        }
      } catch (error) {
        console.error('Error fetching data from TMDB:', error);
      }
    }
    fetchTvShow();
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

  const handleOpen = (tvShow: movieData) => {
    setSelectedTvShow(tvShow);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTvShow(null);
  };

  return (
    <Box sx={{ paddingTop: "70px" }}>
      <Container maxWidth="xl">
        {/* Modal start here=================================== */}
        {selectedTvShow && (
          <Modal
            open={open}
            onClose={handleClose}
            sx={{ backgroundColor: "rgba(23, 23, 23,0.8)", }}
          >
            <Box className="model-body" sx={{ ...style, display: "flex", flexDirection: "column", }} >
              <Grid item xs={12} sm={12} md={6} lg={6} sx={{ alignItems: "center", width: "100%", position: "relative", cursor: "pointer" }}>
              <Typography sx={{ position: "absolute", left: "10px", top: { xs: "5px", sm: "5px", md: "5px", },fontWeight:"bold",fontSize:"1.5rem",color:"white",textTransform:"capitalize",width:"50%",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",textAlign:"justify"}}>
                {selectedTvShow.original_name}
              </Typography>
                <Typography sx={{ position: "absolute", right: "10px", top: { xs: "5px", sm: "5px", md: "5px" }, display: "flex", justifyContent: "center", alignItems: "center", gap: "20px" }}>
                  <WatchLaterIcon sx={{ fontSize: '2rem', fontWeight: '800', color: 'white', ":hover": { color: "gray" } }} titleAccess='Watchlater' />
                  <ShareIcon sx={{ fontSize: '2rem', fontWeight: '800', color: 'white', ":hover": { color: "gray" } }} titleAccess='Share' />
                  <IconButton onClick={handleClose} >
                    <CloseIcon sx={{ fontSize: '24px', fontWeight: '800', color: 'gray', backgroundColor: 'lightgray', borderRadius: '5px', ':hover': { color: 'darkgrey' } }} />
                  </IconButton>
                </Typography>

                <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                  <Typography sx={{ position: "absolute", bottom: { xs: "15px", sm: "15px", md: "10px", lg: "10px" }, left: "20px", fontSize: { xs: "1rem", sm: "1.2rem", md: "1.2rem" }, display: "flex", alignItems: "center", fontWeight: "bold", color: "black", backgroundColor: "#fff", borderRadius: "5px", transition: ".3s", cursor: "pointer", ":hover": { backgroundColor: "darkgrey" }, width: { xs: "20%", sm: "10%", md: "10%", lg: "10%" }, padding: "5px 0", textAlign: "center", border: "3px solid black", outline: "2px solid gray" }}>
                    <PlayArrowIcon sx={{ fontSize: { xs: "1.2rem", sm: "1.2rem", md: "1.5rem" } }} /> Play
                  </Typography>
                  <AddCircleOutlineOutlinedIcon titleAccess='Save' sx={{ position: "absolute", bottom: { xs: "15px", sm: "15px", md: "10px", lg: "8px", }, right:"80px", fontWeight: "400", color: "white", cursor: "pointer", fontSize: { xs: "2rem", sm: "2rem", md: "2.5rem" }, ":hover": { color: "darkgray" } }} />
                  <VolumeOffOutlinedIcon titleAccess='Mute' sx={{ position: "absolute", bottom: { xs: "15px", sm: "15px", md: "10px", lg: "8px" }, right: "20px", fontWeight: "400", color: "white", cursor: "pointer", fontSize: { xs: "2rem", sm: "2rem", md: "2.5rem" }, backgroundColor: "transparent", border: "2px solid gray", borderRadius: "10px", ":hover": { color: "darkgray" } }} />

                </Grid>
                <YouTubeIcon sx={{ ...youtube }} />
                <img
                  className='tvshow-mod-img'
                  src={'http://image.tmdb.org/t/p/w500' + selectedTvShow.poster_path}
                  alt=''
                  height="500px"
                  width="100%"
                  style={{}}
                  loading='eager' // Set loading to eager 
                />

              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} sx={{ textAlign: "justify", paddingLeft: { xs: "5px", sm: "10px", md: "10px" }, paddingBottom: "20px", paddingTop: "10px", width: "100%", color: "white" }}>

                <Grid >
                  <Typography sx={{ fontSize: { xs: "14px", sm: "16px", md: "20px" }, }}>
                    Title: {selectedTvShow.original_name}
                  </Typography>
                  <Grid sx={{ display: "flex", columnGap: "10px" }}>
                    <Typography sx={{ fontSize: { xs: "14px", sm: "16px", md: "20px", color: "#7FFF00" }, }}>
                      {selectedTvShow.vote_average}%
                    </Typography>
                    <Typography sx={{ fontSize: { xs: "14px", sm: "16px", md: "20px" }, color: "#7FFF00" }}>
                      {selectedTvShow.first_air_date}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: "12px", sm: "12px", md: "12px" }, border: "1px solid white", borderRadius: "3px", padding: "5px 5px", textTransform: "uppercase" }}>
                      {selectedTvShow.original_language}
                    </Typography>
                  </Grid>
                  <Typography sx={{ fontSize: { xs: "12px", sm: "12px", md: "14px" }, }}>
                    {selectedTvShow.overview}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        )}
        <Typography variant='h4' sx={{ color: 'gray', padding: '10px 20px', textTransform: 'uppercase', textAlign: 'justify', fontSize: { xs: "20px" } }}>
          Trending
        </Typography>
        <Grid
          ref={containerRef}
          className='scroll-btn'
          sx={{ display: 'flex', overflowX: 'scroll', '&::-webkit-scrollbar': { display: 'none' }, position: "relative" }}
        >
          <Grid className='scroll-button' onClick={() => handleScrollLeft()} sx={{ position: 'sticky', top: 0, left: 0, zIndex: 1, ":hover": { backgroundColor: "black", opacity: "0.3" }, borderRadius: "none", display: "flex", justifyContent: "center", alignItems: "center", padding: "0px 10px", width: "30px" }}>
            <ArrowBackIosIcon className='scroll-icon' sx={{ marginLeft: "10px", color: "black", fontSize: "2rem", zIndex: 2, }} />
          </Grid>
          {tvShow.map((tv) => (
            <Grid
              key={tv.id}
              sx={{ cursor: 'pointer' }}
            >
              <Grid sx={{ width: "250px", height: "350px", columnGap: "10px", textAlign: "center", padding: "0px 2px", overflow: "hidden" }}>
                <img
                  onClick={() => handleOpen(tv)}
                  className='home-Img'
                  src={'http://image.tmdb.org/t/p/w500' + tv.poster_path}
                  alt=''
                  height="500px"
                  width="100%"
                  loading='eager'
                />
              </Grid>
            </Grid>
          ))}
          <Grid className='scroll-button' onClick={() => handleScrollRight()} sx={{ position: 'sticky', top: 0, right: 0, zIndex: 1, ":hover": { backgroundColor: "black", opacity: "0.3" }, borderRadius: "none", display: "flex", justifyContent: "center", alignItems: "center", padding: "0px 10px", width: '30px' }} >
            <ArrowForwardIosIcon className='scroll-icon' sx={{ color: "black", fontSize: "2rem", zIndex: 2, }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
