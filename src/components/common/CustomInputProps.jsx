import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import styles from '../css/CustomInputProps.module.css'; // 스타일 모듈 가져오기

export const CustomInputProps = ({ 
  type = 'text', 
  name, 
  onChange, 
  placeholder, 
  value, 
  className, 
  id, 
  checked, 
  customInputProps, 
  inputRef 
}) => {
  return (
    <TextField
      type={type} 
      name={name} 
      id={id} 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder} 
      fullWidth
      className={className} 
      checked={checked} 
      inputRef={inputRef} 
      InputProps={{
        ...customInputProps, 
        endAdornment: (
          <InputAdornment position="end">
      
          </InputAdornment>
        ),
      }}
    />
  );
};
