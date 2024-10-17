import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import CollaborationImage from '../../assets/CollaborationImage.png';
export const Collaboration = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',

        flexDirection: 'column', // 세로 방향으로 정렬
        justifyContent: 'center',
        padding: '10px 200px',
    backgroundImage: `url(${CollaborationImage})`, // 이미지 배경 추가
        backgroundSize: 'cover', // 배경 이미지 크기 조절
        backgroundPosition: 'center', // 배경 이미지 위치 조정
        color: 'white',
        height: '300px', // 높이 조정
        width: '100%',
        maxWidth: '1920px',
        margin: 'auto', // 중앙 정렬
        marginBottom:'-300px'
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '2.3rem', marginLeft: '150px' }}>
    진행자와 함께 협업하기
  </Typography>
  <Button
    variant="contained"
    sx={{
      backgroundColor: 'white',
      color: '#000',
      fontWeight: 'bold',
      padding: '10px 20px',
      width: '150px', // 버튼 너비를 100px로 설정
      borderRadius: '30px',
      fontSize: '1.1rem',
      marginTop: '25px', // 텍스트와 버튼 사이 간격 추가
      marginLeft: '150px', // 왼쪽에서 20px 간격 유지
    }}
  >

  바로 가기
</Button>

    </Box>
  );
};

