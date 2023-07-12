import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import '@/app/style/home.css';
import { NowPlayingMovieApi } from './API/NowPlayingMovieApi';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Container from '@mui/material/Container/Container'


interface movieData {
    id: string;
    poster_path: string;
    original_title: string;
    vote_count: number;
    original_language: string
    release_date: string
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

export default function NowPlaingMovie() {
    const [movie, setMovie] = useState<movieData[]>([])
    const [open, setOpen] = useState(false);
    const [selectedTvShow, setSelectedTvShow] = useState<movieData | null>(null);
    const isMobile = useMediaQuery('(max-width: 400px)'); // Example media query

   useEffect(() => {
    async function fetchPlaymoveiApi() {
      try {
        const playmovie = await NowPlayingMovieApi();
        // console.log(playmovie);
        if (playmovie && playmovie.results) {
          setMovie(playmovie.results);
        }
      } catch (error) {
        console.error('Error fetching data from TMDB:', error);
      }
    }
    fetchPlaymoveiApi();
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
                                    <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: { xs: "14px", sm: "16px", md: "20px" } }}>
                                        <span>Title:</span>  {selectedTvShow.original_title}
                                    </Typography>
                                    <Typography sx={{ mt: 2, fontWeight: "bold", color: "#7FFF00" }}>
                                        <span style={{ color: "black" }}>Release Date:</span> {selectedTvShow.release_date}
                                    </Typography>
                                    <Typography sx={{ mt: 2, fontWeight: "bold" }}>
                                        <span>Language:</span> {selectedTvShow.original_language}
                                    </Typography>
                                    <Typography sx={{ fontSize: '14px', color: 'orange', paddingTop: '10px', fontWeight: 'bold', borderRadius: '50%', paddingRight: '10px' }}>
                                        <span style={{ color: 'black' }}>Vote avg.: </span>{selectedTvShow.vote_count}
                                    </Typography>
                                    <Typography sx={{ display: "flex", alignItems: "center", marginTop: "20px", fontWeight: "bold", color: "black", backgroundColor: "gray", borderRadius: "50px", transition: ".3s", cursor: "pointer", mt: { lg: "30px", md: "20px", sm: "20px", xs: "20px" }, ":hover": { backgroundColor: "lightgray" }, width: "50%" }}>
                                        <PlayCircleIcon sx={{ fontSize: "3rem", color: "brown" }} /> <span>Play Video</span><ArrowForwardIcon className='play-arrow' />
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                )}
                <Typography variant='h4' sx={{ color: 'gray', padding: '10px 20px', textTransform: 'uppercase', textAlign: 'justify', fontSize: { xs: "20px" } }}>
                 Now Playing
                </Typography>
                <Grid
                    ref={containerRef}
                    className='scroll-btn'
                    sx={{ display: 'flex', overflowX: 'scroll', '&::-webkit-scrollbar': { display: 'none' }, position: "relative" }}
                >
                    <Grid className='scroll-button' onClick={() => handleScrollLeft()} sx={{ position: 'sticky', top: 0, left: 0, zIndex: 1, ":hover": { backgroundColor: "black", opacity: "0.3" }, borderRadius: "none", display: "flex", justifyContent: "center", alignItems: "center", padding: "0px 10px" }}>
                        <ArrowBackIosIcon className='scroll-icon' sx={{ color: "black", fontSize: "2rem", zIndex: 2, }} />
                    </Grid>
                    {movie.map((tv) => (
                        <Grid
                            key={tv.id}
                            sx={{ cursor: 'pointer' }}
                        >
                            <Grid sx={{ border: 'none', color: 'white', textAlign: 'center', overflow: 'hidden' }}>
                                <Image
                                    onClick={() => handleOpen(tv)}
                                    className='home-Img'
                                    src={'http://image.tmdb.org/t/p/w500' + tv.poster_path}
                                    alt=''
                                    height={200}
                                    width={300}
                                    priority={true}
                                    loading='eager'
                                />
                            </Grid>
                        </Grid>
                    ))}
                    <Grid className='scroll-button' onClick={() => handleScrollRight()} sx={{ position: 'sticky', top: 0, right: 0, zIndex: 1, ":hover": { backgroundColor: "black", opacity: "0.3" }, borderRadius: "none", display: "flex", justifyContent: "center", alignItems: "center", padding: "0px 10px" }} >
                        <ArrowForwardIosIcon className='scroll-icon' sx={{ color: "black", fontSize: "2rem", zIndex: 2, }} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
