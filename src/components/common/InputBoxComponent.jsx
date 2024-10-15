import React from 'react';
import { TextField, Typography, Tooltip, IconButton, InputAdornment } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import styles from '../css/InputBoxComponent.module.css'; // 스타일 모듈 가져오기

// InputBox 컴포넌트
export function InputBox({ 
    title, 
    name, 
    label, 
    value, 
    onChange, 
    type = 'text', 
    placeholder, 
    className, 
    id, 
    errorMessage,
    error = false, 
    customInputProps, 
    inputRef 
  }) {
    return (
      <div className={styles.formItem}>
        <span className={styles.formDiv}>{title}</span>
        <TextField
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          id={id}
          placeholder={placeholder}
          fullWidth
          className={`${styles.customTextField} ${className}`}
          error={error}
          helperText={error && errorMessage}
          InputProps={{
            ...customInputProps,
            sx: {
              borderRadius: '8px',
              borderColor: '#dfe1e5', // 기본 테두리 색상
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#5c6bc0', // Hover 시 테두리 색상
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#5c6bc0', // Focus 시 테두리 색상
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: error ? '#f44336' : '#dfe1e5', // 에러 시 테두리 색상
              },
            },
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title={title} placement="top">
                  <IconButton className={styles.iconButton}>
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </div>
    );
  }


// InputLine 컴포넌트
export function InputLine({ 
  title, 
  name, 
  label, 
  value, 
  onChange, 
  type = 'text', 
  placeholder, 
  className, 
  id, 
  checked, 
  customInputProps, 
  inputRef, 
  error, 
  idError 
}) {
  return (
    <TextField
      required
      fullWidth
      name={name || title}
      label={label || title}
      variant="standard"
      value={value}
      onChange={onChange}
      type={type}
      id={id}
      placeholder={placeholder}
      className={`${styles.inputLine} ${className}`} // CSS 적용
      checked={checked}
      inputRef={inputRef}
      error={Boolean(error)}
      helperText={idError} // 에러 메시지 표시
      InputProps={customInputProps} // 추가 InputProps 적용
    />
  );
}

// InputLargeBox 컴포넌트
export function InputLargeBox({ 
  title, 
  name, 
  label, 
  value, 
  onChange, 
  type = 'text', 
  placeholder, 
  className, 
  id, 
  checked, 
  customInputProps, 
  inputRef, 
  row 
}) {
  return (
    <>
      <Typography className={styles.title}>{title}</Typography> {/* 제목 스타일 */}
      <TextField
        name={name || title}
        label={label || title}
        value={value}
        onChange={onChange}
        type={type}
        id={id}
        placeholder={placeholder}
        fullWidth
        multiline
        rows={row}
        maxRows={100}
        className={`${styles.inputLargeBox} ${className}`} // CSS 적용
        checked={checked}
        inputRef={inputRef}
        InputProps={{
          readOnly: true,
          ...customInputProps, // 추가 InputProps 적용
        }}
      />
    </>
  );
}


