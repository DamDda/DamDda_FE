// import React, { useState, useEffect } from 'react';
// import { Typography, LinearProgress, Divider, IconButton, Box } from '@mui/material';
// import { styled } from '@mui/system';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import StatusButton from './StatusButton';
// import MyProjectDetailDashBoard from './MyProjectDetailDashBoard';

// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { SERVER_URL } from 'constants/URLs';

// // 후원 통계
// const mockSupportStat = {
//     totalAmount: 80771500,
//     percentage: 161.54,
//     supporters: 708,
//     remainingDays: 0,
// };

// const ThumbnailContainer = styled('div')({
//     position: 'relative',
//     width: '400px',
//     height: '400px',
//     backgroundColor: '#f0f0f0',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: '8px',
//     overflow: 'hidden',
//     marginRight: '30px',
// });

// const ThumbnailImage = styled('img')({
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//     borderRadius: '8px',
// });

// const DetailContainer = styled('div')({
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     maxWidth: '1200px',
//     margin: '0 auto',
//     padding: '40px',
//     textAlign: 'center',
// });

// const InfoSection = styled('div')({
//     display: 'flex',
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//     width: '100%',
//     marginTop: '20px',
// });

// const ProgressSection = styled('div')({
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//     marginLeft: '20px',
//     marginTop: '19px',
// });

// export default function MyProjectDetails({ projectId, setMyprojectClick }) {
//     const [projectData, setProjectData] = useState(null); // 프로젝트 정보 상태
//     const [supportStat, setSupportStat] = useState(null); // 후원 통계 상태
//     const [loading, setLoading] = useState(true);

//     // 두 API를 병렬로 호출하여 데이터를 가져옴
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // 프로젝트 상세 정보 api 호출
//                 const [projectResponse] = await Promise.all([
//                     axios({
//                         method: 'GET',
//                         url: `${SERVER_URL}/project/myproject/${projectId}`, // 템플릿 리터럴을 올바르게 적용
//                         // params: {
//                         //   memberId: user.key,
//                         // },
//                         headers: {
//                             Authorization: `Bearer ${Cookies.get('accessToken')}`, // 템플릿 리터럴을 올바르게 적용
//                         },
//                     }).then((response) => response),
//                 ]);

//                 // 후원 통계 api 호출
//                 setSupportStat(mockSupportStat);

//                 setProjectData(projectResponse.data); // 프로젝트 데이터 저장

//                 setLoading(false); // 로딩 상태 완료
//             } catch (error) {
//                 console.log('데이터를 불러오는 중 오류 발생:', error);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [projectId]);

//     if (loading) {
//         return <div>로딩중..</div>;
//     }

//     if (!projectData && !supportStat) {
//         return <div>데이터를 가져오는 중 오류가 발생</div>;
//     }

//     const {
//         approval,
//         category, // 카테고리
//         organizer_id, // 진행자
//         title, // 제목
//         description, // 설명
//         fundsReceive, // 받은 후원금
//         targetFunding, // 목표 후원금
//         startDate, // 시작일
//         endDate, // 마감일
//         supporterCnt, // 후원자수
//         productImages, // 썸네일 주소
//         rejectMessage, // 거절 메세지
//     } = projectData;

//     // 남은 기간이 0 이하일 경우 0으로 표시
//     const remainingDays = Math.max(Math.ceil((new Date(endDate) - new Date()) / (1000 * 3600 * 24)), 0);
//     const progress = (fundsReceive / targetFunding) * 100;

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

//     return (
//         <DetailContainer>
//             {/* 뒤로 가기 버튼 */}
//             <IconButton
//                 onClick={() => setMyprojectClick(false)}
//                 style={{ position: 'absolute', top: '330px', left: '700px' }}
//             >
//                 <ArrowBackIcon fontSize="large" />
//             </IconButton>

//             <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
//                 프로젝트 진행률 확인
//             </Typography>

//             <div style={{ padding: '20px' }}>
//                 <div style={{ marginBottom: '20px' }}>
//                     <Typography variant="category">{category}</Typography>
//                     <br />
//                     <Typography variant="organizer">{organizer_id}</Typography>
//                     <Typography variant="h6">{title}</Typography>
//                     <Typography variant="body2">{description}</Typography>
//                 </div>
//             </div>

//             <InfoSection>
//                 {/* 이미지 섹션 */}
//                 <ThumbnailContainer>
//                     {productImages ?
//                         <ThumbnailImage src={productImages[0]} alt="Project Thumbnail" />
//                     :   <Typography variant="body2" color="textSecondary">
//                             이미지가 없습니다.
//                         </Typography>
//                     }
//                 </ThumbnailContainer>

//                 {/* 관리자 승인 상태에 따른 StatusButton */}
//                 <Box>
//                     <StatusButton
//                         status={getApprovalStatus(approval)}
//                         label={getApprovalStatus(approval)}
//                         showRejectReason={approval === 2} // 이 페이지에서만 Tooltip이 작동하도록 설정
//                         rejectMessage={rejectMessage} // 거절 사유 전달
//                         sx={{
//                             marginTop: '-50px',
//                             marginRight: '-1150px',
//                             // backgroundColor: projectData.approval === 2 ? "red" : "#4caf50", // 거절일 때는 버튼 색을 다르게(일단 주석 해제 하지 말아주세요)
//                             borderRadius: '50px',
//                             padding: '10px 20px',
//                             zIndex: 2, // Tooltip이 정상적으로 표시되도록 zIndex 추가
//                         }}
//                     />
//                 </Box>

//                 {/* 후원 정보 섹션 */}
//                 <ProgressSection>
//                     {/* 후원금액(진행률) 부분 */}
//                     <Typography variant="h6" style={{ marginTop: '20px' }}>
//                         후원금액
//                     </Typography>

//                     {/* 금액 표시 */}
//                     <Typography variant="h4" fontWeight="bold">
//                         {fundsReceive.toLocaleString()}원
//                     </Typography>

//                     {/* 진행률 바와 % */}
//                     <Box position="relative" width="600px" marginTop="10px">
//                         <LinearProgress
//                             variant="determinate"
//                             value={progress}
//                             style={{ height: '10px', borderRadius: '5px' }}
//                         />

//                         {/* % 표시를 바의 우측 상단에 배치 */}
//                         <Typography
//                             variant="body2"
//                             style={{
//                                 position: 'absolute',
//                                 right: 0,
//                                 top: '-20px', // 바의 위쪽에 위치하도록 설정
//                                 fontSize: '16px', // 글씨 작게 설정
//                                 color: 'gray',
//                             }}
//                         >
//                             {progress.toFixed(2)}%
//                         </Typography>
//                     </Box>

//                     <Typography variant="h6" style={{ marginTop: '20px' }}>
//                         남은 기간 <br />
//                     </Typography>

//                     {/* 남은 기간 표시   */}
//                     <Typography variant="h4" fontWeight="bold">
//                         {remainingDays}일
//                     </Typography>

//                     <Typography variant="h6" style={{ marginTop: '20px' }}>
//                         후원자 수
//                     </Typography>

//                     {/* 후원자 수 표시 */}
//                     <Typography variant="h4" fontWeight="bold">
//                         {supporterCnt}명
//                     </Typography>

//                     {/* 회색 선 */}
//                     <Divider style={{ margin: '20px 0', width: '600px' }} />

//                     {/* 목표금액 */}
//                     <Box display="flex" justifyContent="space-between" alignItems="center">
//                         <Typography style={{ fontSize: '14px' }}>목표금액</Typography>
//                         <Typography style={{ fontSize: '14px', marginLeft: '50px' }}>{targetFunding}원</Typography>
//                     </Box>

//                     {/* 펀딩기간 */}
//                     <Box display="flex" justifyContent="space-between" alignItems="center">
//                         <Typography style={{ fontSize: '14px' }}>펀딩기간</Typography>
//                         <Typography style={{ fontSize: '14px', marginLeft: '50px' }}>
//                             {startDate}~ {endDate}
//                         </Typography>
//                     </Box>
//                 </ProgressSection>
//             </InfoSection>

//             <MyProjectDetailDashBoard projectId={projectId} />
//         </DetailContainer>
//     );
// }
