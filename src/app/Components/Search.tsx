import React from 'react';
import { Movie } from './SearchField';
export interface SearchResultsProps {
  searchResults: Movie[]
}

const Search: React.FC<SearchResultsProps> = ({ searchResults }) => {
  return (
    <div style={{width:"100%",background:"black"}}>
      {searchResults.map((movie) => (
        <p key={movie.id}>{movie.title}</p>
      ))}
    </div>
  );
};

export default Search;
