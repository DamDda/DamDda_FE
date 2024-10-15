import React from 'react';
import { Box, Button } from '@mui/material';


export const PaginationComponent= ({
  currentPage,
  setCurrentPage,
}) => {
    const totalPages = 10;
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    const handleFirstPage = () => setCurrentPage(1);
    const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const handleEndPage = () => setCurrentPage(totalPages);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
      }}
    >
      {/* 처음으로 버튼 */}
      <Button onClick={handleFirstPage} disabled={currentPage === 1}>
        처음으로
      </Button>

      {/* 이전 버튼 */}
      <Button onClick={handlePrevPage} disabled={currentPage === 1}>
        이전
      </Button>

      {/* 페이지 번호 버튼들 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 0,
        }}
      >
        {pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)} // 페이지 변경
            variant={currentPage === pageNumber ? 'contained' : 'outlined'} // 현재 페이지 스타일
            sx={{
              mx: 1.0,
              minWidth: 40, // 최소 너비
              minHeight: 40, // 최소 높이
              fontSize: '0.8rem', // 폰트 크기 조절
            }} // 좌우 간격
          >
            {pageNumber}
          </Button>
        ))}
      </Box>

      {/* 다음 버튼 */}
      <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
        다음
      </Button>

      {/* 끝으로 버튼 */}
      <Button onClick={handleEndPage} disabled={currentPage === totalPages}>
        끝으로
      </Button>
    </Box>
  );
};

