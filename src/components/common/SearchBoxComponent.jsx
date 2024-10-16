import React, { useState } from 'react';
import { TextField, InputAdornment, Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../css/SearchBoxComponent.module.css'; // 스타일 모듈 import

export const SearchBoxComponent = ({ search, setSearch }) => {
  const [searchText, setSearchText] = useState(search || '');
  const [isExpanded, setIsExpanded] = useState(false); // 검색 바의 확장 상태

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setSearch(searchText);
    }
  };

  const enterSearch = () => {
    setSearch(searchText);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box className={styles.container}>
      <TextField
        variant="standard"
        placeholder="새로운 일상이 필요하신가요?"
        value={searchText}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        className={`${styles.textField} ${isExpanded ? styles.expanded : ''}`} // 조건부 클래스 추가
        InputProps={{
          disableUnderline: true, // underline 제거
          classes: {
            root: styles.inputBase,
          },
          
        }}
      />
       <Button onClick={enterSearch} className={styles.searchButton}>
        검색
      </Button>
      <InputAdornment position="end" className={styles.endAdornment}>
        <Button onClick={toggleExpand} className={styles.searchButton}>
          <SearchIcon />
        </Button>
      </InputAdornment>
     
    </Box>
  );
};
