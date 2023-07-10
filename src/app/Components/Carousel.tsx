import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Carousel as CarouselComponent } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Typography, Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LinearIndeterminate from "@/app/Components/ProgressBar/Progressbar"


interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  overview: string
}

const Carousel = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);

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
    if (movies.length > 0) {
      const interval = setInterval(() => {
        const slicedMovies = movies.slice(1).concat(movies[0]);
        setDisplayedMovies(slicedMovies);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [movies]);
  // useEffect(() => {
  //   if (movies.length > 0) {
  //     const interval = setInterval(() => {
  //       setDisplayedMovies(prevMovies => {
  //         const slicedMovies = prevMovies.slice(1).concat(prevMovies[0]);
  //         return slicedMovies;
  //       });
  //     }, 5000);

  //     return () => clearInterval(interval);
  //   }
  // }, [movies])



  return (
    <Box>
      {displayedMovies.length > 0 ? (
        <CarouselComponent showThumbs={false}>
          {displayedMovies.slice(2, 7).map((movie) => (
            <Box key={movie.id}>
              {movie.backdrop_path && (
                <Image
                  className='slider-img'
                  src={`http://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt={movie.title}
                  width={500}
                  height={600}
                  priority={true} // Set priority to true
                  loading='eager' // Set loading to eager
                  style={{ opacity: "0.4" }}
                />
              )}
              <Box position={"absolute"} bottom={"100px"} sx={{ bottom: { md: "100px", sm: "50px", xs: "30px" }, marginTop: '-100px', textAlign: "justify", width: { sm: "80%", xs: "100%" }, paddingLeft: { sm: "30px", xs: "10px" }, paddingRight: { sm: "0px", xs: "10px" } }}>
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
                <Typography component={"p"} variant='body2' sx={{ color: "#ffff", fontSize: { sm: '16px', xs: '12px', } }}>{movie.overview}</Typography>
                <Stack spacing={2} direction="row" marginTop={"10px"} sx={{ fontSize: { sm: '16px', xs: '14px', } }}>
                  <Button variant="contained" sx={{ color: "#000", fontWeight: "bold", backgroundColor: "white", ":hover": { backgroundColor: "#2F4F4F" }, padding: { xs: "5px 5px", }, fontSize: { xs: "12px" }, textAlign: "center" }}><PlayArrowIcon /> Play</Button>
                  <Button variant="outlined" sx={{ color: "white", border: "1px solid gray", padding: { xs: "5px 5px", }, fontSize: { xs: "12px" } }}><InfoOutlinedIcon /> More info</Button>
                </Stack>
              </Box>
            </Box>
          ))}
        </CarouselComponent>
      ) : (
        <Typography sx={{marginTop:"70px"}}><LinearIndeterminate/></Typography>
      )}
    </Box>
  );
};

export default Carousel;
