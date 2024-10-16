// // src/components/MainContent.jsx
// import {React, useState, useRef, useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Footer } from '../../layout/Footer';
// import NewSection from './NewSection'; // NewsSection 대신 NewSection으로 변경
// import { Category } from '../../layout/Category';
// import { Header } from '../../layout/Header';
// import { CarouselComponent } from './Carousel';
// import {CollaborationSection} from './Collaboration'
// import {ServiceCards} from './ServiceCards'
// import { Box } from "@mui/material";

// // import { Payment } from '../support/payment';
// // import Banner1 from '../../assets/banner-1.png'
// import Banner2 from '../../assets/Banner2.png'
// import new_section_image1 from 'assets/newSection_image_1.png';
// import new_section_image2 from 'assets/newSection_image_2.png';
// import new_section_image3 from 'assets/newSection_image_3.png';
// import new_section_image4 from 'assets/newSection_image_4.png';
// import {ProductRecommendations} from './Product';
// import { SearchBar } from '../../layout/SearchBar';
// import "./MainBanner.css";
// import "../../styles/style.css"
// function Main() {
//   const navigate = useNavigate();
  
//   const [cartegory, setCartegory] = useState(' 전체');
//   const [search, setSearch] = useState('');
//   const isFirstRender = useRef(true); // 처음 렌더링 여부 추적

//   // cartegory 또는 search가 바뀔 때 실행되는 useEffect
//   useEffect(() => {
//     if (isFirstRender.current) {
//       isFirstRender.current = false; // 첫 렌더링 이후로는 false로 설정
//       return;
//     }

//     const fetchData = () => {
//       navigate(`/entire?category=${cartegory}&search=${search}`);
      
//       // 이곳에 데이터 요청이나 다른 비동기 작업을 수행하면 됩니다.
//     };

//     fetchData();
//   }, [cartegory, search]); // 의존성 배열에 cartegory와 search 추가


// // Card data to pass to NewSection component
// const cardData = [
//   {
//     title: '펀딩 뉴스',
//     description: '1억 목표 달성! 성공적인 펀딩 프로젝트의 비결을 확인하세요.',
//     buttonText: '자세히 보기',
//     imageUrl: new_section_image1,
//   },
//   {
//     title: '프로모션',
//     description: '최대 50% 할인! 지금 펀딩에 참여하고 특별 혜택을 누리세요.',
//     buttonText: '자세히 보기',
//     imageUrl: new_section_image2,
//   },
//   {
//     title: '전통 문화 성공 사례',
//     description: '혁신적인 아이디어로 3천만원 펀딩을 달성한 프로젝트 소개.',
//     buttonText: '자세히 보기',
//     imageUrl: new_section_image3,
//   },
//   {
//     title: 'K-POP 새로운 프로젝트',
//     description: '최신 펀딩 프로젝트에 지금 참여하세요!',
//     buttonText: '자세히 보기',
//     imageUrl: new_section_image4,
//   },
// ];
//   // useEffect(() => {
//   //   if (isFirstRender.current) {
//   //     // 처음 렌더링 시에는 실행되지 않도록 함
//   //     isFirstRender.current = false;
//   //     return;
//   //   }
    
//   //   // 이후 상태가 변경될 때만 navigate 호출
//   //   navigate(`/entire?category=${cartegory}&search=${search}`);
//   // }, [cartegory, search, navigate]);
  
//   return (
//     <>
//       <Header search={search} setSearch={setSearch}/>

      
//     <Box
//         sx={{
//           margin: '0 auto',
//           width: "80%",
//           maxWidth: "1750px",
//           minWidth: '600px',
//         }}
//       >
      
//       <CarouselComponent />
//       <Category setCartegory={setCartegory}/>
//       <SearchBar search={search} setSearch={setSearch}/>

//       <ServiceCards></ServiceCards>
      
//       <ProductRecommendations sortCondition={"likeCnt"} title={"인기 프로젝트"} subTitle={"좋아요가 가장 많은 프로젝트"}></ProductRecommendations>
//       <ProductRecommendations sortCondition={"endDate"} title={"마감 임박 프로젝트"} subTitle={"마감임박! 마지막 기회 놓치지 말아요!"}></ProductRecommendations>

//       <div className="banner-container2">
//             <img
//               src={Banner2}
//               alt="Banner"
//               className="banner-image2"
//             />
//           </div>
//       <ProductRecommendations sortCondition={"recommend"} title={"사용자 추천 프로젝트"} subTitle={"나에게 딱 맞는 프로젝트."}></ProductRecommendations>
//       <ProductRecommendations sortCondition={"viewCnt"} title={"최다 조회 프로젝트"} subTitle={"많은 사람들이 구경한 프로젝트"}></ProductRecommendations>

//       <ProductRecommendations sortCondition={"targetFunding"} title={"최다 후원 프로젝트"} subTitle={"많은 사람들의 이유있는 후원! 후원금이 가장 많은 프로젝트!"}></ProductRecommendations>
//       <NewSection cardData={cardData} /> {/* Passing cardData as props */}

//       <CollaborationSection></CollaborationSection>
     
//       <Footer />
//       {/* <Payment /> */}
//       </Box>
      

//     </>
//   );
// }

// export default Main;
