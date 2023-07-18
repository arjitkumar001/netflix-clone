import React, { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <IconButton size="small" onClick={handleSearchClick}>
        <SearchIcon />
      </IconButton>
      <div
        style={{
          overflow: 'hidden',
          maxWidth: isSearchOpen ? '200px' : '0',
          transition: 'max-width 3s ease-in-out',
        }}
      >
        {isSearchOpen && (
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleSearchClick}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
