import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export const DropdownComponent = ({ inputLabel, menuItems, selectValue, onChange }) => {
  return (
    <Box>
      <FormControl variant="outlined" fullWidth>
        <InputLabel>{inputLabel}</InputLabel>
        <Select value={selectValue} onChange={onChange} label={inputLabel}>
          {menuItems.map((menuItem, index) => (
            <MenuItem key={index} value={menuItem.value}>
              {menuItem.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
