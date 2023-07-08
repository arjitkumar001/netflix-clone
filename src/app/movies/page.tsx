'use client'
import { Daymovie } from '../Components/Daymovie';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@/app/style/home.css';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

interface movieData {
  id: string;
  poster_path: string;
  original_title: string;
  media_type: string;
  vote_count: number;
  original_language: string

}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  width: "40%",
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};

export default function Page() {
  const [movie, setMovie] = useState<movieData[]>([])
  const [open, setOpen] = useState(false);
  const [selectedTvShow, setSelectedTvShow] = useState<movieData | null>(null);
  const isMobile = useMediaQuery('(max-width: 400px)'); // Example media query

  useEffect(() => {
    async function fetchDayMovies() {
      try {
        const tvShow = await Daymovie();
        console.log(tvShow);
        if (tvShow && tvShow.results) {
          setMovie(tvShow.results);
        }
      } catch (error) {
        console.error('Error fetching data from TMDB:', error);
      }
    }
    fetchDayMovies();
  }, []);

  const handleOpen = (tvShow: movieData) => {
    setSelectedTvShow(tvShow);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTvShow(null);
  };

  const theme = createTheme(); // Create an empty theme object
const Width ={
width:"100%"
}
  return (
    <ThemeProvider theme={theme}>
      <Box className="mt-80" sx={{ flexGrow: 1 }}>
        <Typography variant="h4" sx={{ color: 'red', padding: '10px 20px', textTransform: 'uppercase', textAlign: 'center', borderBottom: '2px solid gray', borderTop: '2px solid gray' }}>
          TV Shows
        </Typography>
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
                  height="350"
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
                  <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: { xs: "14px", sm: "16px", md: "20px" } }}>
                    <span>Title:</span>  {selectedTvShow.original_title}
                  </Typography>
                  <Typography sx={{ mt: 2, fontWeight: "bold" }}>
                    <span>Media Type:</span> {selectedTvShow.media_type}
                  </Typography>
                  <Typography sx={{ mt: 2, fontWeight: "bold" }}>
                    <span>Language:</span> {selectedTvShow.original_language}
                  </Typography>
                  <Typography sx={{ fontSize: '14px', color: 'orange', paddingTop: '10px', fontWeight: 'bold', borderRadius: '50%', paddingRight: '10px' }}>
                    <span style={{ color: 'black' }}>Vote avg.: </span>{selectedTvShow.vote_count}
                  </Typography>
                  <Typography sx={{ display: "flex", alignItems: "center", marginTop: "20px", fontWeight: "bold", color: "black", backgroundColor: "gray", borderRadius: "50px", transition: ".3s", cursor: "pointer", mt: { lg: "30px", md: "20px", sm: "20px", xs: "20px" }, ":hover": { backgroundColor: "lightgray" } }}>
                    <PlayCircleIcon sx={{ fontSize: "3rem", color: "brown" }} /> <span>Play Video</span><ArrowForwardIcon className='play-arrow' />
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        )}
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={isMobile ? 1 : 2}>
            {movie.map((tv) => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={tv.id} sx={{ textAlign: "center", marginTop: "10px" }}>
                <Box >
                  <Image
                    onClick={() => handleOpen(tv)}
                    src={'http://image.tmdb.org/t/p/w500' + tv.poster_path}
                    alt=""
                    height={400}
                    width={300}
                    className='img-tvshow'
                    priority={true} // Set priority to true
                    loading='eager' // Set loading to eager 
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

