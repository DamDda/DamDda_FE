import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import styles from '../css/DropdownComponent.module.css'; 

export const DropdownComponent = ({ inputLabel, menuItems, selectValue, onChange }) => {
  return (
    <Box className={styles['dropdown-container']}>
      <FormControl variant="outlined" fullWidth className={styles['dropdown-form-control']}>
      <InputLabel>{inputLabel}</InputLabel>
        <Select value={selectValue} onChange={onChange} label={inputLabel}  className={styles['dropdown-select']}
        >
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
