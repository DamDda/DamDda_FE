import React, { useState } from 'react';
import { TextField, InputAdornment, Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../css/SearchBoxComponent.module.css'; // 스타일 모듈 import

export const SearchBoxComponent = ({ search, setSearch }) => {
  const [searchText, setSearchText] = useState(search || '');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value); 
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      enterSearch(searchText); 
    }
  };

  const enterSearch = () => {
    setSearch(searchText); 
  };

  return (
    <Box className={styles.container}>
      <TextField
        placeholder="새로운 일상이 필요하신가요?" 
        value={searchText}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown} 
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" className={styles.endAdornment}>
              <Button onClick={enterSearch} className={styles.searchButton}>
                <SearchIcon />
              </Button>
            </InputAdornment>
          ),
          className: styles.inputBase,
        }}
        className={styles.textField}
      />
    </Box>
  );
};
