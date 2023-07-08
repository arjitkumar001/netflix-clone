import axios from 'axios';

const API_KEY = '70832fbf4e20b8e11a44971719bde149';

export const fetchMovies = async (query:any) => {
  const encodedQuery = encodeURIComponent(query); // Encode the query parameter
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodedQuery}`;
  const response = await axios.get(url);
  return response.data.results;
};
