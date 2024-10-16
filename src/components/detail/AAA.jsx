// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// import {
//   Typography,
//   LinearProgress,
//   Divider,
//   Button,
//   Tabs,
//   Tab,
//   Modal,
//   Box,
//   TextField,
// } from "@mui/material";
// import { margin, styled, width } from "@mui/system";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ProjectDetail from "./ProjectDetail";
// import Notice from "./notices";
// import Qna from "./qna";

// import "../../styles/style.css";
// import "./Detail.css";

// import { Header } from "../../layout/Header";
// import { Footer } from "../../layout/Footer";
// import { useLocation, useNavigate } from "react-router-dom";
// import Carousel from "react-bootstrap/Carousel";
// import "bootstrap/dist/css/bootstrap.min.css"; // 부트스트랩 CSS 로드
// import axios from "axios"; // axios를 사용하여 REST API 호출
// import { useUser } from "../../../UserContext";
// import Cookies from "js-cookie";
// import { SERVER_URL } from "../../../constants/URLs";

// const ProductContainer = styled("div")({
//   position: "relative",
//   width: "750px",
//   height: "500px",
//   backgroundColor: "#f0f0f0",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   borderRadius: "8px",
//   overflow: "hidden",
//   marginTop: "20px",
// });

// const ProductImage = styled("img")({
//   width: "100%",
//   height: "100%",
//   objectFit: "cover",
//   borderRadius: "8px",
// });

// const Indicator = styled("div")({
//   display: "flex",
//   justifyContent: "space-between",
//   marginTop: "10px",
// });

// const ModalBox = styled(Box)({
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   backgroundColor: "white",
//   boxShadow: 24,
//   padding: "20px",
//   borderRadius: "8px",
// });

// const projectData = {
//   category: "뷰티 & 패션",
//   organizer_id: "beauty_lovers",
//   title: "혁신적인 립스틱 컬렉션 출시",
//   description:
//     "고급스러운 컬러와 지속력을 자랑하는 새로운 립스틱 컬렉션을 선보입니다. 이번 프로젝트를 통해 뷰티 트렌드를 선도하는 제품을 만나보세요.",
//   currentAmount: 85000000,
//   target_funding: 100000000,
//   start_date: "2024-10-01",
//   end_date: "2024-12-01",
//   delivery_date: 1714593600, // Example UNIX timestamp for delivery date
//   liked_count: 3421,
//   supporterCount: 1567,
//   product_url: "https://example.com/product_image.png",
// };

// export const ProjectInfo = ({ projectInfo }) => {
//   const { user } = useUser();

//   const fetchProducts = () => {
//     console.log("dddddddddddddddddddd" + user.key);
//     axios
//       .get(` ${SERVER_URL}/api/projects/${projectId}`, {
//         params: {
//           // memberId: user.key,
//         },
//         headers: {
//           ...(Cookies.get("accessToken") && {
//             Authorization: `Bearer ${Cookies.get("accessToken")}`,
//           }),
//         },
//       })
//       .then((response) => {
//         console.log(response.data);
//         if (response.data !== null) {
//           setProductDetail(response.data);
//           setIsHearted(response.data.liked);
//           setLiked_count(response.data.likeCnt);
//         } else {
//           setProductDetail({});
//         }
//         console.log(productDetail);
//       })
//       .catch((error) => {
//         console.log(window.location.hostname);
//         console.error("프로젝트 데이터를 가져오는 중 오류 발생:", error);
//       });
//   };

//   const resetScroll = () => {
//     const html = document.documentElement;
//     const originalScrollBehavior = window.getComputedStyle(html).scrollBehavior;
//     html.style.scrollBehavior = "auto";
//     setTimeout(() => {
//       window.scrollTo(0, 0); // 즉시 스크롤을 맨 위로 이동
//       setTimeout(() => {
//         html.style.scrollBehavior = originalScrollBehavior;
//       }, 100); // 스크롤 이동 후에 100ms 대기 후 복원
//     }, 0); // scrollTo를 실행하기 전에 CSS가 적용되도록 지연을 줌
//   };

//   useEffect(() => {
//     fetchProducts();
//     resetScroll();
//   }, []);

//   const [remainingDays, setRemainingDays] = useState(0);
//   const progress = (currentAmount / target_funding) * 100;
//   const [supporterCount, setSupporterCount] = useState(
//     projectData.supporterCount
//   );
//   const [liked_count, setLiked_count] = useState(projectData.liked_count); // 좋아요 초기값
//   const [isHearted, setIsHearted] = useState(projectData.liked); // 사용자가 좋아요를 눌렀는지
//   console.log(isHearted, liked_count);

//   const [modalOpen, setModalOpen] = useState(false);
//   const [collabDetails, setCollabDetails] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     message: "",
//     files: [],
//   });

//   const [errors, setErrors] = useState({
//     name: false,
//     phone: false,
//     email: false,
//     message: false,
//   });

//   const location = useLocation();
//   const query = new URLSearchParams(location.search);
//   const [projectId, setProjectId] = useState(query.get("projectId") || "");
//   const [productDetail, setProductDetail] = useState({});
//   console.log(projectId);

//   useEffect(() => {
//     setCollabDetails((prev) => ({ ...prev, title: productDetail.title }));
//   }, [productDetail.title]);

//   const handleHeartClick = async (prev) => {
//     const newHeartedStatus = !prev; // 하트 상태 반전

//     try {
//       if (prev) {
//         // 좋아요 취소 요청
//         const response = await axios.delete(
//           ` ${SERVER_URL}/api/projects/like`,
//           {
//             params: {
//               // memberId: user.key,
//               projectId: productDetail.id,
//             },
//             headers: {
//               ...(Cookies.get("accessToken") && {
//                 Authorization: `Bearer ${Cookies.get("accessToken")}`,
//               }),
//             },
//           }
//         );
//         console.log("좋아요 취소 성공:", response.data);
//         setLiked_count(liked_count - 1);
//         // setLiked_count((prevCount) => prevCount - 1); // 함수형 업데이트로 좋아요 수 감소
//       } else {
//         // 좋아요 추가 요청
//         const response = await axios.post(
//           ` ${SERVER_URL}/api/projects/like`,
//           null,
//           {
//             params: {
//               // memberId: user.key,
//               projectId: productDetail.id,
//             },
//             headers: {
//               ...(Cookies.get("accessToken") && {
//                 Authorization: `Bearer ${Cookies.get("accessToken")}`,
//               }),
//             },
//           }
//         );
//         console.log("좋아요 성공:", response.data);
//         setLiked_count((prevCount) => prevCount + 1); // 함수형 업데이트로 좋아요 수 증가
//       }
//       // 좋아요 상태 업데이트
//       setIsHearted(newHeartedStatus);
//     } catch (error) {
//       console.error("좋아요 처리 중 오류 발생:", error);
//     }

//     return newHeartedStatus; // 새로운 상태 반환
//   };

//   const scrollToSection = (id) => {
//     const target = document.getElementById(id);
//     target.scrollIntoView({ behavior: "smooth" });
//   };

//   const handleCollabClick = () => {
//     setModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setModalOpen(false);
//     setCollabDetails({
//       name: "",
//       phone: "",
//       email: "",
//       message: "",
//       files: [],
//     });
//     setErrors({ name: false, phone: false, email: false, message: false });
//     const confirmation = window.confirm("창을 닫으시겠습니까?");
//     if (confirmation) {
//       setModalOpen(false);
//       setCollabDetails({
//         name: "",
//         phone: "",
//         email: "",
//         message: "",
//         files: [],
//       });
//       setErrors({ name: false, phone: false, email: false, message: false });
//     }
//   };
//   const handleCollabSubmit = async () => {
//     const newErrors = {
//       title: !collabDetails.title,
//       name: !collabDetails.name,
//       phone: !collabDetails.phone,
//       email: !collabDetails.email,
//       message: !collabDetails.message,
//     };

//     setErrors(newErrors);

//     const formData = new FormData();

//     /*오늘 날짜*/
//     const date = new Date();
//     const year = date.getFullYear();
//     const month = ("0" + (date.getMonth() + 1)).slice(-2);
//     const day = ("0" + date.getDate()).slice(-2);
//     const today = `${year}-${month}-${day}`;

//     const jsonData = {
//       email: collabDetails.email,
//       phoneNumber: collabDetails.phone,
//       content: collabDetails.message,
//       user_id: user.id,
//       collaborationDTO: {
//         title: collabDetails.title,
//         CollaborateDate: today,
//         name: collabDetails.name,
//       },
//     };

//     formData.append("jsonData", JSON.stringify(jsonData));
//     collabDetails.files.forEach((file, index) => {
//       formData.append("collabDocList", file);
//     });

//     console.log("formData" + formData);
//     if (
//       !newErrors.title &&
//       !newErrors.message &&
//       !newErrors.name &&
//       !newErrors.phone &&
//       !newErrors.email
//     ) {
//       try {
//         console.log("요청 전까지는 가능함!!");
//         const response = await axios.post(
//           `/collab/register/${projectId}`,
//           formData,
//           {
//             withCredentials: true,
//             headers: {
//               "Content-Type": "multipart/form-data",
//               ...(Cookies.get("accessToken") && {
//                 Authorization: `Bearer ${Cookies.get("accessToken")}`,
//               }),
//             },
//           }
//         );
//         console.log("결과" + response);
//         alert("협업 요청이 전송되었습니다.");
//         handleModalClose();
//       } catch (error) {
//         console.log("register 과정 중 에러 발생 " + error);
//       }
//     }
//   };

//   const handleSponsorClick = () => {
//     const giftSelected = true; // 실제 로직으로 변경
//     if (!giftSelected) {
//       alert("선물구성을 선택하세요.");
//     } else {
//       const confirmation = window.confirm("이 프로젝트를 후원하시겠습니까?");
//       if (confirmation) {
//         setSupporterCount((prev) => prev + 1); // 후원자 수 증가
//         alert("결제 창으로 이동합니다.");
//       }
//     }
//   };

//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     if (collabDetails.files.length + files.length <= 3) {
//       setCollabDetails({
//         ...collabDetails,
//         files: [...collabDetails.files, ...files],
//       });
//     } else {
//       alert("최대 3개의 파일만 첨부할 수 있습니다.");
//     }
//   };

//   const handleFileDelete = (index) => {
//     const confirmation = window.confirm("정말로 삭제하시겠습니까?");
//     if (confirmation) {
//       const newFiles = collabDetails.files.filter((_, i) => i !== index);
//       setCollabDetails({ ...collabDetails, files: newFiles });
//     }
//   };

//   // 달성률 계산 (fundsReceive / targetFunding * 100)
//   const achievementRate = Math.min(
//     (productDetail.fundsReceive / productDetail.targetFunding) * 100,
//     100
//   );

//   // 현재 시간
//   const currentTime = new Date();
//   // product.endDate를 Date 객체로 변환
//   const endDate = new Date(productDetail.endDate);
//   // 남은 시간 계산 (밀리초 기준)
//   const timeDifference = endDate - currentTime;

//   // 밀리초를 일(day) 단위로 변환
//   const daysLeft =
//     Math.floor(timeDifference / (1000 * 60 * 60 * 24)) < 0
//       ? 0
//       : Math.floor(timeDifference / (1000 * 60 * 60 * 24));

//   // 날짜 형식을 변환하는 함수
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     // return date.toISOString().slice(0, 10); // YYYY-MM-DD 형식으로 변환
//     return date.toLocaleDateString("ko-KR", {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//     });
//     // return dateString;
//   };

//   const ProductCarousel = ({ productDetail }) => {
//     return (
//       <div
//         style={{
//           marginTop: "200px",
//           maxWidth: "1500px",
//           margin: "0 auto",
//           backgroundColor: "gray",
//         }}
//       >
//         {" "}
//         {/* 캐러셀의 최대 너비를 1000px로 설정 */}
//         <Carousel fade interval={3000} indicators={true} controls={true}>
//           {" "}
//           {/* 3초마다 자동 전환 */}
//           {productDetail &&
//           productDetail.productImages &&
//           productDetail.productImages.length > 0 ? (
//             productDetail.productImages.map((image, index) => (
//               <Carousel.Item key={index}>
//                 <img
//                   src={`http://localhost:9000/${image}`}
//                   alt={`Product image ${index}`}
//                   style={{
//                     // width: '850px',
//                     // height: '500px',
//                     width: "100%", // 이미지를 부모 요소의 너비에 맞춤
//                     height: "500px", // 고정된 높이를 유지하면서
//                     objectFit: "cover", // 이미지 비율을 유지하며 공간을 채움
//                     borderRadius: "8px",
//                     marginTop: "20px",
//                   }} // 스타일 적용
//                 />
//                 {/* <Carousel.Caption>
//                 <h3>Slide {index + 1}</h3>
//                 <p>이 슬라이드는 {index + 1}번째 이미지입니다.</p>
//               </Carousel.Caption> */}
//               </Carousel.Item>
//             ))
//           ) : (
//             <Carousel.Item>
//               <div
//                 style={{
//                   width: "850px",
//                   height: "500px",
//                   padding: "200px",
//                   marginTop: "20px",
//                   textAlign: "center",
//                 }}
//               >
//                 <Typography variant="body2" color="textSecondary">
//                   이미지가 없습니다.
//                 </Typography>
//               </div>
//             </Carousel.Item>
//           )}
//         </Carousel>
//       </div>
//     );
//   };

//   return (
//     <>
//       <Header />

//       <div className="container">
//         <div style={{ paddingTop: "20px", textAlign: "center" }}>
//           <div className="project-info">
//             <div className="category">{productDetail.category}</div>
//             <div className="presenter">{productDetail.nickName}</div>

//             <h1 className="project-title">{productDetail.title}</h1>
//             <p className="project-description">{productDetail.description}</p>
//           </div>
//         </div>
//       </div>

//       <div className="container">
//         <div style={{ padding: "5px" }}>
//           <div
//             style={{
//               display: "flex",
//               width: "1500px",
//               justifyContent: "center",
//             }}
//           >
//             캐러셀++
//             <ProductContainer>
//               <ProductCarousel productDetail={productDetail}></ProductCarousel>
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "50%",
//                   left: "10px",
//                   zIndex: 1,
//                   display: "flex",
//                   gap: "5px",
//                 }}
//               ></div>
//               <Indicator>
//                 <div
//                   style={{
//                     width: "100%",
//                     backgroundColor: "#ccc",
//                     height: "5px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: `${achievementRate}%`, //progress
//                       backgroundColor: "#3f51b5",
//                       height: "100%",
//                     }}
//                   />
//                 </div>
//               </Indicator>
//             </ProductContainer>
//             상세설명++
//             <div style={{ flex: 1, width: "1200px" }}>
//               <div className="container" style={{ marginLeft: "50px" }}>
//                 후원금액++
//                 <h5>
//                   후원금액 (진행률)
//                   <div className="goal-price">
//                     <span>{productDetail.fundsReceive}원</span>
//                     <span className="percentage">
//                       {achievementRate.toFixed(2)}%
//                     </span>
//                   </div>
//                 </h5>
//                 진행바++
//                 <LinearProgress
//                   variant="determinate"
//                   value={productDetail.fundsReceive}
//                   className="progress-bar"
//                 />
//                 <div className="stats-container">
//                   남은기간++
//                   <div className="stats-item">
//                     남은 기간: <span className="stats-value">{daysLeft}일</span>
//                   </div>
//                   후원자수++
//                   <div className="stats-item">
//                     후원자 수:{" "}
//                     <span className="stats-value">
//                       {productDetail.supporterCnt}명
//                     </span>
//                   </div>
//                 </div>
//                 선++
//                 <Divider className="divider" />
//                 목표금액++
//                 <div className="info-text">
//                   목표금액: {productDetail.targetFunding}원
//                 </div>
//                 펀딩기간++
//                 <div className="info-text">
//                   펀딩 기간: {formatDate(productDetail.startDate)} ~{" "}
//                   {formatDate(productDetail.endDate)}
//                 </div>
//                 예상전달일++
//                 <div className="info-text">
//                   예상 전달일: 프로젝트 종료일로부터 30일 이내
//                 </div>
//                 프로젝트 후원, 좋아요, 협업 버튼++
//                 <div className="button-container">
//                   후원++
//                   <Button
//                     className="contained-button"
//                     onClick={handleSponsorClick}
//                   >
//                     이 프로젝트에 후원하기
//                   </Button>
//                   <div className="secondary-buttons">
//                     좋아요++
//                     <Button
//                       variant="outlined"
//                       onClick={() => handleHeartClick(isHearted)}
//                       className="heart-button"
//                     >
//                       {isHearted ? "♥" : "♡"} {liked_count}명
//                     </Button>
//                     협업++
//                     <Button
//                       variant="outlined"
//                       onClick={handleCollabClick}
//                       className="heart-button"
//                     >
//                       협업하기
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* 상세설명 */}
//           선++
//           <Divider style={{ margin: "20px 0", width: "1220px" }} />
//           <div id="details">
//             탭0++
//             <Tabs value={0} indicatorColor="primary" textColor="primary">
//               <Tab
//                 label="상세설명"
//                 onClick={() => scrollToSection("details")}
//               />
//               <Tab
//                 label="공지사항"
//                 onClick={() => scrollToSection("notices")}
//               />
//               <Tab label="Q&A" onClick={() => scrollToSection("qna")} />
//             </Tabs>
//             <Typography variant="body1" style={{ marginTop: "10px" }}>
//               <ProjectDetail
//                 descriptionDetail={productDetail.descriptionDetail}
//                 descriptionImages={productDetail.descriptionImages}
//                 projectId={projectId}
//                 projectTitle={productDetail.title}
//               />
//             </Typography>
//           </div>
//           {/* Notice */}
//           <Divider style={{ margin: "20px 0" }} />
//           <div id="notices">
//             탭1++
//             <Tabs value={1} indicatorColor="primary" textColor="primary">
//               <Tab
//                 label="상세설명"
//                 onClick={() => scrollToSection("details")}
//               />
//               <Tab
//                 label="공지사항"
//                 onClick={() => scrollToSection("notices")}
//               />
//               <Tab label="Q&A" onClick={() => scrollToSection("qna")} />
//             </Tabs>
//             <Notice />
//           </div>
//           {/* QNA */}
//           <Divider style={{ margin: "20px 0" }} />
//           <div id="qna">
//             탭2++
//             <Tabs value={2} indicatorColor="primary" textColor="primary">
//               <Tab
//                 label="상세설명"
//                 onClick={() => scrollToSection("details")}
//               />
//               <Tab
//                 label="공지사항"
//                 onClick={() => scrollToSection("notices")}
//               />
//               <Tab label="Q&A" onClick={() => scrollToSection("qna")} />
//             </Tabs>
//             <Qna />
//           </div>
//           {/* 협업 모달 */}
//           <Modal open={modalOpen} onClose={handleModalClose}>
//             <ModalBox>
//               <TextField
//                 label="제목"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={collabDetails.title}
//                 onChange={(e) =>
//                   setCollabDetails({
//                     ...collabDetails,
//                     title: e.target.value,
//                   })
//                 }
//                 error={errors.name}
//                 helperText={errors.name ? "이름을 입력하세요." : ""}
//                 InputProps={{
//                   style: {
//                     borderColor: errors.name ? "red" : "inherit",
//                   },
//                 }}
//               />
//               <Typography variant="h6" component="h2">
//                 협업 요청
//               </Typography>
//               <TextField
//                 label="이름"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={collabDetails.name}
//                 onChange={(e) =>
//                   setCollabDetails({ ...collabDetails, name: e.target.value })
//                 }
//                 error={errors.name}
//                 helperText={errors.name ? "이름을 입력하세요." : ""}
//                 InputProps={{
//                   style: {
//                     borderColor: errors.name ? "red" : "inherit",
//                   },
//                 }}
//               />
//               <TextField
//                 label="전화번호"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={collabDetails.phone}
//                 onChange={(e) =>
//                   setCollabDetails({ ...collabDetails, phone: e.target.value })
//                 }
//                 error={errors.phone}
//                 helperText={errors.phone ? "전화번호를 입력하세요." : ""}
//                 InputProps={{
//                   style: {
//                     borderColor: errors.phone ? "red" : "inherit",
//                   },
//                 }}
//               />
//               <TextField
//                 label="이메일"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={collabDetails.email}
//                 onChange={(e) =>
//                   setCollabDetails({ ...collabDetails, email: e.target.value })
//                 }
//                 error={errors.email}
//                 helperText={errors.email ? "이메일을 입력하세요." : ""}
//                 InputProps={{
//                   style: {
//                     borderColor: errors.email ? "red" : "inherit",
//                   },
//                 }}
//               />
//               <TextField
//                 label="협업 내용"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 multiline
//                 rows={4}
//                 value={collabDetails.message}
//                 onChange={(e) =>
//                   setCollabDetails({
//                     ...collabDetails,
//                     message: e.target.value,
//                   })
//                 }
//                 error={errors.message}
//                 helperText={errors.message ? "협업 내용을 입력하세요." : ""}
//                 InputProps={{
//                   style: {
//                     borderColor: errors.message ? "red" : "inherit",
//                   },
//                 }}
//               />
//               <Button
//                 variant="contained"
//                 component="label"
//                 fullWidth
//                 margin="normal"
//               >
//                 파일 첨부
//                 <input
//                   type="file"
//                   hidden
//                   multiple
//                   onChange={handleFileChange}
//                 />
//               </Button>
//               {collabDetails.files.map((file, index) => (
//                 <div
//                   key={index}
//                   style={{
//                     marginTop: "10px",
//                     display: "flex",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <Typography variant="body2">
//                     첨부된 파일: {file.name}
//                   </Typography>
//                   <Button
//                     variant="outlined"
//                     onClick={() => handleFileDelete(index)}
//                     style={{ marginLeft: "10px" }}
//                   >
//                     삭제
//                   </Button>
//                 </div>
//               ))}
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "flex-end",
//                   marginTop: "20px",
//                 }}
//               >
//                 <Button
//                   variant="outlined"
//                   onClick={handleModalClose}
//                   style={{ marginRight: "10px" }}
//                 >
//                   닫기
//                 </Button>
//                 <Button variant="contained" onClick={handleCollabSubmit}>
//                   협업 요청하기
//                 </Button>
//               </div>
//             </ModalBox>
//           </Modal>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState, useRef } from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider,
  Select,
  InputLabel,
  MenuItem,
  Checkbox,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { SERVER_URL } from "../../../constants/URLs";

const Container = styled("div")({
  padding: "20px",
  backgroundColor: "#f0f0f0",
  display: "flex",
});

// 상세 설명 섹션 스타일
const DetailSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginBottom: "20px",
  flex: 2,
  maxHeight: "800px", // 최대 높이 800px
  overflow: "hidden", // 넘치는 부분 숨김
  overflowX: "auto",
});

// 선물 구성 섹션
const PackageSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginLeft: "20px",

  width: "200px",
});

// 카드(선물구성)
const PackageCard = styled(Card)({
  backgroundColor: "#f9f9f9",
  marginBottom: "10px",
  width: "200px",
  cursor: "pointer",
});

const SelectedCard = styled(Card)({
  marginBottom: "10px",
  padding: "10px",
  backgroundColor: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: "8px",
});

const CartSection = styled("div")({
  padding: "10px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  marginBottom: "20px",
});

const ImageContainer = styled("img")({
  width: "100%",
  height: "auto",
});

const CountButton = styled(IconButton)({
  padding: "2px", // 버튼 크기 축소
  margin: "0 5px", // 숫자 사이 여백 설정
});

const SelectPackageButton = styled(Button)({
  backgroundColor: "#7a82ed", // 기본 배경색
  color: "white", // 기본 글자색
  padding: "10px 20px", // 패딩 추가
  fontWeight: "bold", // 글자 두께
  borderRadius: "8px", // 모서리 둥글게
  marginTop: "10px", // 위쪽 여백 추가
  width: "100%", // 버튼 너비를 100%로 설정
  cursor: "pointer", // 마우스 커서
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // 그림자 추가
  transition: "background-color 0.3s ease", // 배경색 전환 효과
  "&:hover": {
    backgroundColor: "#5f6ae0", // 호버 시 배경색 변경
  },
  "&:disabled": {
    backgroundColor: "#ccc", // 비활성화 상태일 때 배경색
    color: "#999", // 비활성화 상태일 때 글자색
    cursor: "not-allowed", // 비활성화 상태일 때 커서
  },
});

export const DetailDescroption = ({
  descriptionDetail,
  descriptionImages,
  projectId,
  projectTitle,
}) => {
  const [rewardOption, setRewardOption] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(null); // 선택한 카드
  const [selectedOptions, setSelectedOptions] = useState({}); // 각 카드의 옵션 선택
  const [detailedDescription, setDetailedDescription] = useState([]);
  const [showMore, setShowMore] = useState(false); // 더보기 상태
  const detailRef = useRef(null);
  const [project_package, setProject_package] = useState([]);

  const navigate = useNavigate();

  // 버튼 클릭 시 호출될 함수
  console.log("Project ID:", projectId); // Project ID 확인
  console.log("Project Title:", projectTitle); // Project ID 확인

  const handleNavigateToPayment = () => {
    const orderInfo = {
      projectTitle: projectTitle, // 프로젝트 이름 (실제 값으로 설정 가능)
      selectedPackages: selectedPackages.map((pkg) => ({
        packageName: pkg.name, // 선택된 선물 구성의 이름
        selectedOption: pkg.selectedOption, // 선택된 옵션
        price: pkg.price, // 가격
        quantity: pkg.count, // 수량
      })),
      totalAmount: totalAmount, // 총 금액
      projectId: projectId, // projectId 추가
      memberId: 3, // jwt로 바꿔야함
    };

    // navigate 함수로 orderInfo 데이터를 전달하여 payment 페이지로 이동
    navigate("/payment", { state: orderInfo });
  };

  // const ProjectDetail = ({ descriptionDetail, descriptionImages }) => {
  //   const [rewardOption, setRewardOption] = useState([])
  //   const [selectedPackages, setSelectedPackages] = useState([])
  //   const [totalAmount, setTotalAmount] = useState(0)
  //   const [selectedPackage, setSelectedPackage] = useState(null) // 선택한 카드
  //   const [selectedOptions, setSelectedOptions] = useState({}) // 각 카드의 옵션 선택
  //   const [detailedDescription, setDetailedDescription] = useState([])
  //   const [showMore, setShowMore] = useState(false) // 더보기 상태

  //   const detailRef = useRef(null)
  //   const location = useLocation()
  //   const query = new URLSearchParams(location.search)
  //   const [project_package, setProject_package] = useState([])
  //   const [projectId, setProjectId] = useState(query.get('projectId') || '')
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       // Mock 데이터
  //       fetchPackage()
  //       //setRewardOption(packageData);
  //       //setDetailedDescription(details);
  //     }

  //     fetchData()
  //   }, [])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // Mock 데이터
  //     fetchPackage();
  //     const packageData = [
  //       {
  //         id: 1,
  //         name: "선물 1",
  //         description: "설명 1",
  //         price: 5000,
  //         options: ["옵션 1", "옵션 2"],
  //         stock: 10,
  //       },
  //       {
  //         id: 2,
  //         name: "선물 2",
  //         description: "설명 2",
  //         price: 59000,
  //         stock: 100,
  //       },
  //     ];

  //     const details = [
  //       {
  //         id: 1,
  //         text: "상세 설명 내용입니다. 이 내용은 800px 이하로 잘려서 보여집니다.",
  //         image: "https://via.placeholder.com/800",
  //       },
  //       {
  //         id: 2,
  //         text: "추가 상세 설명 내용이 여기 들어갑니다. 이 내용은 더보기 버튼을 클릭해야 보여집니다. 추가 상세 설명 내용이 여기 들어갑니다. 이 내용은 더보기 버튼을 클릭해야 보여집니다.",
  //         image: "https://via.placeholder.com/800",
  //       },
  //     ];

  //     setRewardOption(packageData);
  //     setDetailedDescription(details);
  //   };

  //   fetchData();
  // }, []);
  useEffect(() => {
    // 임의의 데이터 설정
    const packageData = [
      {
        id: 2,
        name: "패키지 A",
        price: 50000,
        RewardList: [
          {
            name: "리워드 1",
            OptionList: ["옵션 1-1", "옵션 1-2"],
          },
          {
            name: "리워드 2",
            OptionList: ["옵션 2-1", "옵션 2-2"],
          },
        ],
      },
      {
        id: 2,
        name: "패키지 B",
        price: 70000,
        RewardList: [
          {
            name: "리워드 3",
            OptionList: ["옵션 3-1", "옵션 3-2"],
          },
        ],
      },
      {
        id: 3,
        name: "패키지 C",
        price: 100000,
        RewardList: [],
      },
    ];

    // 임의 데이터로 project_package 상태 업데이트
    setProject_package(packageData);
  }, []);

  useEffect(() => {
    if (detailRef.current) {
      setShowMore(detailRef.current.scrollHeight > 800);
    }
  }, [detailedDescription]);

  const handleCardClick = (pkg) => {
    setSelectedPackage(pkg);
  };

  //패키지 가져오는 기능.
  const fetchPackage = async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/packages/project/${projectId}`,
        {
          //project id 받아줘야 함.
          //project_id를 넘겨받아야 함.
          withCredentials: true,
        }
      );

      if (!Array.isArray(response.data)) {
        console.error("API response is not an array:", response.data);
        return;
      }
      const formattedPackages = response.data.map((pac) => ({
        id: pac.id,
        name: pac.name,
        count: pac.count,
        price: pac.price,
        quantityLimited: pac.quantityLimited,
        RewardList: Array.isArray(pac.RewardList) ? pac.RewardList : [],
      }));
      console.log(formattedPackages.map((reward) => reward.RewardList));
      setProject_package(formattedPackages);
    } catch (error) {
      console.error("패키지 목록을 가져오는 중 오류 발생:", error);
    }
  };

  const handleSelectPackage = () => {
    if (selectedPackage) {
      const selectedOptionsList = Object.entries(selectedOptions) //"패키지ID-리워드인덱스": "선택된 옵션 값" 형태
        .filter(([key]) => key.startsWith(`${selectedPackage.id}-`))
        .map(([_, value]) => value);

      const exists = selectedPackages.some(
        (p) =>
          p.id === selectedPackage.id &&
          JSON.stringify(p.selectedOption) ===
            JSON.stringify(selectedOptionsList)
      );

      if (!exists) {
        setSelectedPackages([
          ...selectedPackages,
          {
            ...selectedPackage,
            count: 1,
            selectedOption: selectedOptionsList,
          },
        ]);
        setSelectedPackage(null);
        // 선택된 패키지의 옵션들만 초기화
        setSelectedOptions((prevOptions) => {
          const newOptions = { ...prevOptions };
          Object.keys(newOptions).forEach((key) => {
            if (key.startsWith(`${selectedPackage.id}-`)) {
              delete newOptions[key];
            }
          });
          return newOptions;
        });
        setSelectedPackage(null); // 선택한 패키지 초기화
      } else {
        alert("이미 선택된 선물과 옵션 조합입니다.");
      }
    }
  };
  const handleRemovePackage = (pkgId) => {
    setSelectedPackages(
      selectedPackages.filter(
        (pkg) => `${pkg.id}-${pkg.selectedOption}` !== pkgId
      )
    );
  };

  const handleChangeCount = (pkgId, delta) => {
    setSelectedPackages(
      selectedPackages.map((pkg) =>
        `${pkg.id}-${pkg.selectedOption}` === pkgId
          ? { ...pkg, count: Math.max(1, pkg.count + delta) }
          : pkg
      )
    );
  };

  const handleSelectOption = (pkgId, option) => {
    setSelectedOptions((prevOptions) => {
      const currentOptions = prevOptions[pkgId] || [];
      if (currentOptions.includes(option)) {
        return {
          ...prevOptions,
          [pkgId]: currentOptions.filter((opt) => opt !== option),
        };
      } else {
        return { ...prevOptions, [pkgId]: [...currentOptions, option] };
      }
    });
  };

  useEffect(() => {
    const total = selectedPackages.reduce(
      (sum, pkg) => sum + pkg.price * pkg.count,
      0
    );
    setTotalAmount(total);
  }, [selectedPackages]);

  return (
    <Container>
      {/* 상세 설명 섹션 */}
      <DetailSection ref={detailRef}>
        <Typography variant="h5" style={{ marginBottom: "10px" }}>
          상세 설명
        </Typography>

        <Typography variant="body1" style={{ marginTop: "10px" }}>
          {descriptionDetail}
        </Typography>

        {descriptionImages && descriptionImages.length > 0 ? (
          descriptionImages.map((image, index) => (
            <ImageContainer
              key={index}
              src={`http://localhost:9000/${image}`}
              alt={`Product image ${index}`}
            />
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            이미지가 없습니다.
          </Typography>
        )}

        {/* 남희님 더보기 한번 보셔야 할 것 같아요
        {detailedDescription.map((detail, index) => (
          <div key={detail.id} style={{ marginBottom: "20px" }}>
            <Typography variant="body1" style={{ marginTop: "10px" }}>
              {detail.text}
            </Typography>
            <ImageContainer
              src={detail.image}
              alt={`Detail Image ${detail.id}`}
            />
          </div>
        ))} */}

        {/* 더보기 버튼 표시 조건 수정 */}
        {detailRef.current &&
          detailRef.current.scrollHeight > 800 &&
          !showMore && (
            <Button onClick={() => setShowMore(true)}>▽ 더보기</Button>
          )}
        {/* 상세 내용이 더보기 상태일 때 모든 내용 표시 */}
        {showMore && (
          <div>
            <Typography variant="body1" style={{ marginTop: "10px" }}>
              {descriptionDetail}
            </Typography>

            {descriptionImages.map((image, index) => (
              <ImageContainer
                key={index}
                src={`http://localhost:9000/${image}`}
                alt={`Product image ${index}`}
              />
            ))}
          </div>
        )}

        {/* <ImageContainer
                  src={detail.image}
                  alt={`Detail Image ${detail.id}`}
                /> */}

        {/* 상세 내용이 더보기 상태일 때 모든 내용 표시 */}
        {/* {showMore && (
          <div>
            {detailedDescription.map((detail, index) => (
              <div key={detail.id} style={{ marginBottom: "20px" }}>
                <Typography variant="body1" style={{ marginTop: "10px" }}>
                  {detail.text}
                </Typography>
                <ImageContainer
                  src={detail.image}
                  alt={`Detail Image ${detail.id}`}
                />
              </div>
            ))}
          </div>
        )} */}
      </DetailSection>

      <Divider orientation="vertical" flexItem />

      {/* 선물 구성 섹션 */}
      <PackageSection>
        <Typography variant="h5" style={{ marginBottom: "10px" }}>
          선물 구성 선택
        </Typography>
        {project_package.map((pkg) => (
          <PackageCard key={pkg.id} onClick={() => handleCardClick(pkg)}>
            <CardContent>
              <Typography variant="h6">{pkg.name}</Typography>
              <Typography variant="body1">
                {pkg.price.toLocaleString()}원
              </Typography>
            </CardContent>

            {/* 옵션 드롭다운 */}
            {selectedPackage?.id === pkg.id && (
              <div>
                {pkg.RewardList && pkg.RewardList.length > 0 ? (
                  pkg.RewardList.map((reward, rewardIndex) => (
                    <div key={rewardIndex}>
                      <Typography variant="subtitle1">{reward.name}</Typography>
                      {reward.OptionList && reward.OptionList.length > 0 ? (
                        <FormControl fullWidth>
                          <InputLabel
                            id={`multiple-select-label-${pkg.id}-${rewardIndex}`}
                          >
                            옵션 선택
                          </InputLabel>
                          <Select
                            labelId={`multiple-select-label-${pkg.id}-${rewardIndex}`}
                            id={`multiple-select-${pkg.id}-${rewardIndex}`}
                            value={
                              selectedOptions[`${pkg.id}-${rewardIndex}`] || ""
                            }
                            onChange={(event) => {
                              const value = event.target.value;
                              setSelectedOptions({
                                ...selectedOptions,
                                [`${pkg.id}-${rewardIndex}`]: value,
                              });
                            }}
                          >
                            {reward.OptionList.map((option) => (
                              <MenuItem
                                key={option}
                                value={option}
                                disabled={
                                  selectedOptions[
                                    `${pkg.id}-${rewardIndex}`
                                  ] === option
                                }
                              >
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        <Typography variant="body2">
                          이 리워드에는 옵션이 없습니다.
                        </Typography>
                      )}
                    </div>
                  ))
                ) : (
                  <Typography variant="body2">리워드가 없습니다.</Typography>
                )}

                <SelectPackageButton
                  variant="contained"
                  onClick={handleSelectPackage}
                  disabled={
                    pkg.RewardList.some(
                      (reward, index) =>
                        reward.OptionList &&
                        reward.OptionList.length > 0 &&
                        !selectedOptions[`${pkg.id}-${index}`]
                    ) ||
                    selectedPackages.some(
                      (p) =>
                        p.id === pkg.id &&
                        JSON.stringify(p.selectedOption) ===
                          JSON.stringify(selectedOptions[pkg.id])
                    )
                  }
                  style={{ marginTop: "10px" }}
                >
                  이 선물 구성 선택하기
                </SelectPackageButton>
              </div>
            )}
          </PackageCard>
        ))}

        {/* 선택된 카드 목록 */}
        {selectedPackages.length > 0 && (
          <CartSection>
            <Typography variant="h6">선택한 선물</Typography>
            {selectedPackages.map((pkg) => (
              <SelectedCard key={`${pkg.id}-${pkg.selectedOption}`}>
                <div>
                  <Typography variant="h6">{pkg.name}</Typography>
                  <Typography variant="body2">
                    {pkg.price.toLocaleString()}원 × {pkg.count}개
                  </Typography>
                  {pkg.selectedOption && (
                    <Typography variant="body2">
                      옵션: {pkg.selectedOption}
                    </Typography>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CountButton
                    onClick={() =>
                      handleChangeCount(`${pkg.id}-${pkg.selectedOption}`, -1)
                    }
                    disabled={pkg.count === 1}
                    style={{ color: pkg.count === 1 ? "grey" : "black" }}
                  >
                    <RemoveIcon />
                  </CountButton>
                  <Typography>{pkg.count}</Typography>
                  <CountButton
                    onClick={() =>
                      handleChangeCount(`${pkg.id}-${pkg.selectedOption}`, 1)
                    }
                  >
                    <AddIcon />
                  </CountButton>
                  <IconButton
                    onClick={() => {
                      const confirmDelete = window.confirm(
                        "정말로 이 선물을 삭제하시겠습니까?"
                      );
                      if (confirmDelete) {
                        handleRemovePackage(`${pkg.id}-${pkg.selectedOption}`);
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </SelectedCard>
            ))}

            <SelectPackageButton
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleNavigateToPayment}
            >
              총 {totalAmount.toLocaleString()}원 후원하기
            </SelectPackageButton>
          </CartSection>
        )}
      </PackageSection>
    </Container>
  );
};
