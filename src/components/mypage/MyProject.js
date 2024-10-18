// import React, { useEffect, useState } from 'react';
// import { Box, Grid, Typography, Card, CardMedia, CardContent, Button, LinearProgress } from '@mui/material';

// import StatusButton from './StatusButton';
// import axios from 'axios'; // 나중에 백엔드 연결 시 주석 해제
// import { useUser } from 'UserContext';
// import Cookies from 'js-cookie';
// import { SERVER_URL } from 'constants/URLs';

// // 프로젝트 카드 컴포넌트
// export const ProductCard = ({ product, setMyprojectClick, setMyprojectId }) => {
//     // 카드 클릭 시 상세 페이지로 이동
//     const handleCardClick = () => {
//         console.log('누락된 인덱스:', product.id);
//         setMyprojectId(product.id);

//         // index값이 유효한 숫자인지 체크하고 url로 전달
//         if (typeof product.id == 'number' && !isNaN(product.id)) {
//             // 페이지 이동
//             setMyprojectClick(true);
//         } else {
//             console.log('인덱스 번호 없음');
//         }
//     };

//     // 승인 상태에 따른 상태 라벨 결정
//     const getApprovalStatus = (approval) => {
//         switch (approval) {
//             case 1:
//                 return '승인완료';
//             case 0:
//                 return '승인대기';
//             case 2:
//                 return '승인거절';
//             default:
//                 return '미정';
//         }
//     };

//     // 달성률 계산 (fundsReceive / targetFunding * 100)
//     const achievementRate = Math.min((product.fundsReceive / product.targetFunding) * 100, 100);

//     // 현재 시간
//     const currentTime = new Date();
//     // product.endDate를 Date 객체로 변환
//     const endDate = new Date(product.endDate);
//     // 남은 시간 계산 (밀리초 기준)
//     const timeDifference = endDate - currentTime;

//     // 밀리초를 일(day) 단위로 변환
//     const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

//     return (
//         <Card
//             onClick={handleCardClick} // 클릭 시 상세페이지로 이동
//             sx={{
//                 borderRadius: '15px',
//                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                 padding: 2,
//                 position: 'relative',
//                 width: '100%',
//             }}
//         >
//             <CardMedia
//                 component="img"
//                 image={`http://localhost:9000/${product.thumbnailUrl}`}
//                 sx={{ height: '180px', borderRadius: '10px', objectFit: 'cover' }}
//             />

//             {/* 관리자 승인 상태에 따른 StatusButton 추가*/}
//             <StatusButton
//                 status={getApprovalStatus(product.approval)} // approval 값에 따라 버튼 상태 결정
//                 label={getApprovalStatus(product.approval)}
//                 sx={{
//                     position: 'absolute',
//                     top: 25,
//                     right: 20,
//                     borderRadius: '50px',
//                     width: 90,
//                     height: 10,
//                 }}
//             />

//             <CardContent>
//                 <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1rem', mb: 1 }}>
//                     {product.title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', mb: 1 }}>
//                     {product.description}
//                 </Typography>
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'space-between',
//                     }}
//                 >
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}>
//                             달성률 {achievementRate}%
//                         </Typography>
//                         <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}>
//                             {product.targetFunding}
//                         </Typography>
//                     </Box>
//                 </Box>
//                 <LinearProgress
//                     variant="determinate"
//                     value={achievementRate}
//                     sx={{ height: 8, borderRadius: '5px', mt: 1, mb: 1 }}
//                 />
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                     }}
//                 >
//                     <Button
//                         variant="contained"
//                         color="secondary"
//                         size="small"
//                         sx={{
//                             backgroundColor: '#5a87f7',
//                             borderRadius: '12px',
//                             fontSize: '0.75rem',
//                         }}
//                     >
//                         마감임박 D -{daysLeft}
//                     </Button>
//                     <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}>
//                         진행자: {product.nickName}
//                     </Typography>
//                 </Box>
//             </CardContent>
//         </Card>
//     );
// };

// // Myproject 컴포넌트
// export const Myproject = ({ setMyprojectClick, setMyprojectId }) => {
//     const { user } = useUser();
//     const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
//     const [projectList, setProjectList] = useState([]);
//     const [totalProducts, setTotalProducts] = useState(0); // 서버에서 가져온 프로젝트 데이터
//     const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수

//     const itemsPerPage = 10; // 페이지당 항목 수

//     const fetchProducts = async (page) => {
//         try {
//             const response = await axios.get(`${SERVER_URL}/project/myproject`, {
//                 params: {
//                     page: page,
//                     size: itemsPerPage,
//                 },
//                 headers: {
//                     ...(Cookies.get('accessToken') && {
//                         Authorization: `Bearer ${Cookies.get('accessToken')}`,
//                     }),
//                 },
//             });

//             if (response.data.dtoList !== null) {
//                 setProjectList(response.data.dtoList); // 서버에서 받은 프로젝트 리스트
//             } else {
//                 setProjectList([]); // 서버에서 받은 프로젝트 리스트
//             }
//             setTotalPages(Math.ceil(response.data.total / itemsPerPage)); // 전체 페이지 수 업데이트
//             setTotalProducts(response.data.total);
//             console.log(response.data.total + 'aaaaaaaaaaaaaaaaaaaaaaa');
//             console.log(totalPages + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
//         } catch (error) {
//             console.error('프로젝트 데이터를 가져오는 중 오류 발생:', error);
//         }
//     };

//     // 처음 마운트되었을 때 및 페이지 변경 시 데이터 가져오기
//     useEffect(() => {
//         fetchProducts(currentPage);
//     }, []);

//     const displayedProducts = projectList;

//     // 페이지 번호 배열 생성
//     const generatePageNumbers = (currentPage, totalPages) => {
//         // 현재 페이지가 속한 10 단위의 시작 페이지와 끝 페이지 계산
//         const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
//         const endPage = Math.min(startPage + 9, totalPages); // 마지막 페이지가 totalPages를 넘지 않게

//         // startPage부터 endPage까지 페이지 번호 배열 생성
//         return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
//     };
//     const pageNumbers = generatePageNumbers(currentPage, totalPages);

//     console.log(totalPages + 'ssssssssssssssssssssssss');
//     console.log(pageNumbers + 'ddddddddddddddddddddddddddd');

//     // 처음 페이지로 이동
//     const handleFirstPage = () => {
//         setCurrentPage(1);
//     };

//     // 이전 페이지로 이동
//     const handlePrevPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     // 다음 페이지로 이동
//     const handleNextPage = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     // 끝 페이지로 이동
//     const handleEndPage = () => {
//         setCurrentPage(totalPages);
//     };

//     return (
//         <Box
//             sx={{
//                 margin: '0 auto',
//                 padding: 2,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 maxWidth: '100%',
//                 width: '1600px',
//             }}
//         >
//             <Grid container justifyContent="center" alignItems="center" spacing={4} sx={{ flexGrow: 1 }}>
//                 {displayedProducts.map((product) => (
//                     <Grid
//                         item
//                         key={product.id}
//                         xs={12}
//                         sm={6}
//                         md={4}
//                         lg={3}
//                         xl={2.4}
//                         display="flex"
//                         justifyContent="center"
//                     >
//                         <ProductCard
//                             product={product}
//                             setMyprojectId={setMyprojectId}
//                             setMyprojectClick={setMyprojectClick}
//                         />
//                     </Grid>
//                 ))}
//             </Grid>

//             {/* 페이지네이션 버튼 */}
//             <Box
//                 sx={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginTop: 2,
//                 }}
//             >
//                 <Button onClick={handleFirstPage} disabled={currentPage === 1}>
//                     처음으로
//                 </Button>

//                 <Button onClick={handlePrevPage} disabled={currentPage === 1}>
//                     이전
//                 </Button>

//                 <Box
//                     sx={{
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         marginTop: 0,
//                     }}
//                 >
//                     {pageNumbers.map((pageNumber) => (
//                         <Button
//                             key={pageNumber}
//                             onClick={() => setCurrentPage(pageNumber)} // 페이지 변경
//                             variant={currentPage === pageNumber ? 'contained' : 'outlined'}
//                             sx={{
//                                 mx: 1.0,
//                                 minWidth: 40,
//                                 minHeight: 40,
//                                 fontSize: '0.8rem',
//                             }}
//                         >
//                             {pageNumber}
//                         </Button>
//                     ))}
//                 </Box>

//                 <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
//                     다음
//                 </Button>

//                 <Button onClick={handleEndPage} disabled={currentPage === totalPages}>
//                     끝으로
//                 </Button>
//             </Box>
//         </Box>
//     );
// };
