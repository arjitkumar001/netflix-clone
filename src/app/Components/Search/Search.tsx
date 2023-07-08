'use client'
import axios from 'axios';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';

interface searchdata{
    id:string;
    title:string
}

const API_KEY = '70832fbf4e20b8e11a44971719bde149';

const Search = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<searchdata[]>([]);

  const fetchMovies = async () => {
    try {
      const encodedQuery = encodeURIComponent(query);
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodedQuery}`;
      const response = await axios.get(url);
      setMovies(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    fetchMovies();
  };

  return (
    <div>
      <TextField
        label="Search Movies"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      {movies.map((movie) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
};

export default Search;
