import React from 'react';
import { TextField, InputAdornment, Box,Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = () => {
  const handleSearchChange = (event) => {
    // Handle search input change
    console.log(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        border: null,
      }}
    >
      <TextField
        placeholder="새로운 일상이 필요하신가요?" // Placeholder text from the image
        onChange={handleSearchChange}
        fullWidth
        InputProps={{
          endAdornment: (
              <InputAdornment position="end" sx={{ mt: '-8px', mr:'8px' }}>
                <Button onClick={() => console.log('Search icon clicked')} sx={{ minWidth: 0, padding: 0 }}>
                  <SearchIcon />
                </Button>
              </InputAdornment>

          ),
          style: {
            borderRadius: '50px', // Full rounded border
            padding: '0 12px', // Adjust padding to center content
            height: '100%', // Ensure the height matches the container
            display: 'flex',
            alignItems: 'center', // Vertically center the content
            marginTop: '5px',
          },
        }}
        sx={{
          width: 500,
          border: '2px solid #7a82ed', // Teal border color
          borderRadius: '50px', // Full rounded corners
          backgroundColor: '#fff', // White background
          height: '56px', // Height to match the input field in the image
          fontSize: '1rem', // Increase font size for placeholder
          '& .MuiInputBase-input::placeholder': {
            color: '#ffffff', // Gray placeholder color
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'transparent', // Hide default border
            },
            '&:hover fieldset': {
              borderColor: 'transparent', // Hide default border
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent', // Hide border when focused
            },
          },
        }}
      />
    </Box>
  );
};
