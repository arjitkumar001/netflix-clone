import React, { useEffect, useState } from 'react';
import { Carousel as CarouselComponent } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Typography, Box, Grid } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LinearIndeterminate from '@/app/Components/ProgressBar/Progressbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import Modal from '@mui/material/Modal';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ReactPlayer from 'react-player';
import PauseIcon from '@mui/icons-material/Pause';
import axios from 'axios';


interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  overview: string
  original_language: string
}const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  width: "50%",
  transform: 'translate(-50%, -50%)',
  bgcolor: '#171717',
};

const Carousel = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedTvShow, setSelectedTvShow] = useState<Movie | null>(null);
  const [videoData, setVideoData] = useState<any | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/now_playing?api_key=70832fbf4e20b8e11a44971719bde149'
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);
  useEffect(() => {
    // Fetch video data for each movie when movies state changes
    const fetchVideoData = async (id: number) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=70832fbf4e20b8e11a44971719bde149`
        );
        const videoKey = response.data.results[0]?.key;
        if (videoKey) {
          setVideoData((prevData: any) => ({
            ...prevData,
            [id]: videoKey,
          }));
        }
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    movies.map((movie: Movie) => fetchVideoData(movie.id));
  }, [movies]);


  useEffect(() => {
    setDisplayedMovies(movies);
  }, [movies]);
  const handleOpen = (tvShow: Movie) => {
    setSelectedTvShow(tvShow);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTvShow(null);
  };
  const handlePlayVideo = () => {
    setIsPlaying((prevState) => !prevState);
  };
  const handleMute = () => {
    setIsMuted((prevIsMuted) => !prevIsMuted);
  };


  return (
    <Box>
      {selectedTvShow && (
        <Modal
          open={open}
          onClose={handleClose}
          sx={{ backgroundColor: 'rgba(23, 23, 23,0.8)' }}
        >
          <Box className="model-body" sx={{ ...style, display: 'flex', flexDirection: 'column' }}>
            <Grid item xs={12} sm={12} md={6} lg={6} sx={{ alignItems: 'center', width: '100%', position: 'relative', cursor: 'pointer' }}>
              {selectedTvShow && videoData[selectedTvShow.id] && (
                <ReactPlayer
                  playing={isPlaying}
                  controls={false}
                  muted={isMuted}
                  autoplay={false}
                  style={{ opacity: ".5", }}
                  url={`https://www.youtube.com/watch?v=${videoData[selectedTvShow.id]}`}
                  width="100%"
                  height={500}
                  config={{
                    youtube: {
                      playerVars: { showinfo: 0, disablekb: 1 },
                    },
                  }}
                />
              )}
              <Typography sx={{ position: 'absolute', right: '10px', top: { xs: '5px', sm: '5px', md: '5px' }, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                <IconButton onClick={handleClose}>
                  <CloseIcon sx={{ fontSize: '24px', fontWeight: '800', color: 'gray', backgroundColor: 'lightgray', borderRadius: '5px', ':hover': { color: 'darkgrey' } }} titleAccess="Close" />
                </IconButton>
              </Typography>
              <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography onClick={handlePlayVideo} display={"inline"} sx={{ position: "absolute", bottom: "10px", left: "20px", }}>
                  {
                    isPlaying ? (
                      <Button sx={{ color: "black", background: "white", fontWeight: "bold", border: "2px solid black", outline: "2px solid white", textTransform: "capitalize", ":hover": { background: "darkgray" } }}><PauseIcon />Pause</Button>
                    ) :
                      (
                        <Button sx={{ color: "black", background: "white", fontWeight: "bold", border: "2px solid black", outline: "2px solid white", textTransform: "capitalize", ":hover": { background: "darkgray" } }}><PlayArrowIcon />Play</Button>
                      )
                  }
                </Typography>
                <AddCircleOutlineOutlinedIcon titleAccess="Save" sx={{ position: 'absolute', bottom: { xs: '15px', sm: '15px', md: '10px', lg: '8px' }, right: '80px', fontWeight: '400', color: 'white', cursor: 'pointer', fontSize: { xs: '2rem', sm: '2rem', md: '2.5rem' }, ':hover': { color: 'darkgray' } }} />
                <Typography onClick={handleMute}>
                  {
                    isMuted ? (
                      <VolumeOffOutlinedIcon sx={{ position: 'absolute', bottom: { xs: '15px', sm: '15px', md: '10px', lg: '8px' }, right: '20px', fontWeight: '400', color: 'white', cursor: 'pointer', fontSize: { xs: '2rem', sm: '2rem', md: '2.3rem' }, backgroundColor: 'transparent', border: '2px solid gray', borderRadius: '10px', ':hover': { color: 'darkgray' } }} />
                    ) : (
                      <VolumeUpIcon sx={{ position: 'absolute', bottom: { xs: '15px', sm: '15px', md: '10px', lg: '8px' }, right: '20px', fontWeight: '400', color: 'white', cursor: 'pointer', fontSize: { xs: '2rem', sm: '2rem', md: '2.3rem' }, backgroundColor: 'transparent', border: '2px solid gray', borderRadius: '10px', ':hover': { color: 'darkgray' } }} />
                    )
                  }
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} sx={{ textAlign: 'justify', paddingLeft: { xs: '5px', sm: '10px', md: '10px' }, paddingBottom: '20px', paddingTop: '10px', width: '100%', color: 'white' }}>
              <Grid>
                <Typography sx={{ fontSize: { xs: '14px', sm: '16px', md: '20px' } }}>
                  Title: {selectedTvShow.title}
                </Typography>
                <Grid sx={{ display: 'flex', columnGap: '10px' }}>
                  <Typography sx={{ fontSize: { xs: '14px', sm: '16px', md: '20px', color: '#7FFF00' } }}>
                    {selectedTvShow.vote_average}%
                  </Typography>
                  <Typography sx={{ fontSize: { xs: '14px', sm: '16px', md: '20px' }, color: '#7FFF00' }}>
                    {selectedTvShow.release_date}
                  </Typography>
                  <Typography sx={{ fontSize: { xs: '12px', sm: '12px', md: '12px' }, border: '1px solid white', borderRadius: '3px', padding: '5px 7px', textTransform: 'uppercase' }}>
                    {selectedTvShow.original_language}
                  </Typography>
                </Grid>
                <Typography sx={{ fontSize: { xs: '12px', sm: '12px', md: '14px' },whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",width:"100%"}}>
                  {selectedTvShow.overview}
                </Typography>
              </Grid>
            </Grid>
          </Box>

        </Modal>
      )}
      {displayedMovies.length > 0 ? (
        <CarouselComponent showThumbs={false}>
          {displayedMovies.slice(10, 15).map((movie) => (
            <Box key={movie.id} sx={{ width: "100%" }}>
              {movie.backdrop_path && (
                <img
                  className='slider-img'
                  src={`http://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt={movie.title + " image"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition:"center",
                    opacity: "0.3",
                  }}
                  loading='lazy'
                />
              )}
              <Grid position={"absolute"} sx={{ bottom: { lg: "70px", md: "70px", sm: "50px", xs: "30px" }, marginTop: '-100px', textAlign: "justify", width: { sm: "80%", xs: "100%" }, paddingLeft: { sm: "30px", xs: "10px" }, paddingRight: { sm: "0px", xs: "10px" } }}>
                <Typography
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize: { sm: '1.5rem', xs: '1rem', lg: '2.2rem' },
                  }}
                >
                  {movie.title}
                </Typography>
                <Typography sx={{ fontSize: { sm: '16px', xs: '14px', }, }}><span style={{ color: "#7FFF00" }}>{movie.vote_average}%</span> <span style={{ color: "#ffff" }}>{movie.release_date}</span></Typography>
                <Typography component={"p"} variant='body2' sx={{ color: "#ffff", fontSize: { sm: '16px', xs: '12px', },whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",width:"100%"  }}>{movie.overview}</Typography>
                <Stack spacing={2} direction="row" marginTop={"10px"} sx={{ fontSize: { sm: '16px', xs: '14px', } }}>
                  <Button onClick={() => handleOpen(movie)} variant="contained" sx={{ color: "#000", fontWeight: "bold", backgroundColor: "white", ":hover": { backgroundColor: "#2F4F4F" }, padding: { xs: "5px 10px", }, fontSize: { xs: "12px" }, textAlign: "center" }}><PlayArrowIcon /> Play</Button>
                  <Button onClick={() => handleOpen(movie)} variant="outlined" sx={{ color: "white", border: "1px solid gray", padding: { xs: "5px 5px", }, fontSize: { xs: "12px" } }}><InfoOutlinedIcon /> More info</Button>
                </Stack>
              </Grid>
            </Box>
          ))}
        </CarouselComponent>
      ) : (
        <Typography sx={{ marginTop: "70px" }}><LinearIndeterminate /></Typography>
      )}
    </Box>
  );
};

export default Carousel;
