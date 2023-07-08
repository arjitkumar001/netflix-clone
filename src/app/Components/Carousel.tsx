import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Carousel as CarouselComponent } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Typography, Box } from '@mui/material';
import LinearIndeterminate from './ProgressBar/Progressbar';

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
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

  return (
    <Box>
      {displayedMovies.length > 0 ? (
        <CarouselComponent showThumbs={false}>
          {displayedMovies.slice(0,5).map((movie) => (
            <Box key={movie.id}>
              {movie.backdrop_path && (
                <Image
                  className='slider-img'
                  src={`http://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt={movie.title}
                  width={500}
                  height={400}
                  priority={true} // Set priority to true
                  loading='eager' // Set loading to eager
                  
                />
              )}
              <Typography
                sx={{
                  marginTop: '-100px',
                  paddingBottom: '30px',
                  color: 'white',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: { sm: '2rem', xs: '1rem', lg: '2.2rem' },
                }}
              >
                {movie.title}
              </Typography>
            </Box>
          ))}
        </CarouselComponent>
      ) : (
        <Box sx={{ textAlign: 'center', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <LinearIndeterminate />
        </Box>
      )}
    </Box>
  );
};

export default Carousel;
