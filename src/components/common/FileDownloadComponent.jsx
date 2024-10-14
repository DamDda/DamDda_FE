import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import FilePresentIcon from '@mui/icons-material/FilePresent'; // 아이콘 import

export const FileDownloadComponent = ({ handleDownload, fileName }) => {
  return (
    <TextField
      sx={{
        margin: "30px",
        width: "350px",
      }}
      label="File"
      variant="outlined"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={() => handleDownload(fileName)}>
              <FilePresentIcon />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <span
              onClick={() => handleDownload(fileName)}
              style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
            >
              {fileName}
            </span>
          </InputAdornment>
        ),
        readOnly: true, 
      }}
    />
  );
};
