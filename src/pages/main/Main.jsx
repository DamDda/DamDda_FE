import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "components/layout/Header";
import { Footer } from "components/layout/Footer";

import { ImageCarousel } from "components/common/ImageCarousel";
import { MultiCategoryComponent } from "components/common/MultiCategoryComponent";
import { SearchBoxComponent } from "components/common/SearchBoxComponent";
import { ShortcutBoxComponent } from "components/common/ShortcutBoxComponent";
import { NewsSection } from "components/main/NewsSections";
import { ProjectRowComponent } from "components/common/ProjectRowComponent";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";


import new_section_image1 from 'assets/newSection_image_1.png';
import new_section_image2 from 'assets/newSection_image_2.png';
import new_section_image3 from 'assets/newSection_image_3.png';
import new_section_image4 from 'assets/newSection_image_4.png';
import Banner2 from 'assets/Banner2.png'

// Card data to pass to NewSection component
const cardData = [
  {
    title: '펀딩 뉴스',
    description: '1억 목표 달성! 성공적인 펀딩 프로젝트의 비결을 확인하세요.',
    buttonText: '자세히 보기',
    imageUrl: new_section_image1,
  },
  {
    title: '프로모션',
    description: '최대 50% 할인! 지금 펀딩에 참여하고 특별 혜택을 누리세요.',
    buttonText: '자세히 보기',
    imageUrl: new_section_image2,
  },
  {
    title: '전통 문화 성공 사례',
    description: '혁신적인 아이디어로 3천만원 펀딩을 달성한 프로젝트 소개.',
    buttonText: '자세히 보기',
    imageUrl: new_section_image3,
  },
  {
    title: 'K-POP 새로운 프로젝트',
    description: '최신 펀딩 프로젝트에 지금 참여하세요!',
    buttonText: '자세히 보기',
    imageUrl: new_section_image4,
  },
];
export function Main() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("전체");
  const [search, setSearch] = useState("");

  const services = [
    {
      title: "협업하기",
      description: "함께 협업하고 성공적인 프로젝트를 만들어보세요.",
      icon: <InsertDriveFileIcon style={{ fontSize: 50, color: "white" }} />,
      backgroundColor: "#7a82ed",
    },
    {
      title: "프로젝트 등록하기",
      description: "새로운 프로젝트를 등록하고 펀딩을 시작하세요.",
      icon: <AddCircleOutlineIcon style={{ fontSize: 50, color: "white" }} />,
      backgroundColor: "#7a82ed",
    },
    {
      title: "인기 프로젝트 가기",
      description: "가장 인기 있는 프로젝트에 참여하고 후원하세요.",
      icon: <StarIcon style={{ fontSize: 50, color: "white" }} />,
      backgroundColor: "#edf1ff",
    },
  ];
  // const isFirstRender = useRef(true);

  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //     return;
  //   }
  //   const fetchData = () => {
  //     navigate(`/entire?category=${category}&search=${search}`);
  //   };
  //   fetchData();
  // }, [category, search, navigate]);

  const [CarouselImages] = useState([
    "https://img.freepik.com/free-vector/polygonal-city-elements_23-2147496342.jpg?ga=GA1.1.167959845.1724899652&semt=ais_hybrid",
    "https://img.freepik.com/free-vector/road-infographic-template_23-2147531975.jpg?ga=GA1.1.167959845.1724899652&semt=ais_hybrid",
    "https://img.freepik.com/free-vector/flat-people-doing-outdoor-activities_23-2147869120.jpg?ga=GA1.1.167959845.1724899652&semt=ais_hybrid",
  ]);
  const CarouselStyle = { maxWidth: "90%", width: "1320px", height: "auto" };

  return (
    <>
      <Header search={search} setSearch={setSearch} />
      <Box
        sx={{
          margin: "0 auto",
          width: "100%",
          maxWidth: "1750px",
          minWidth: "600px",
        }}
      >
        <ImageCarousel images={CarouselImages} style={CarouselStyle} />
        <MultiCategoryComponent setCategory={setCategory} />
        {/* <SearchBoxComponent search={search} setSearch={setSearch} /> */}
        <ShortcutBoxComponent services={services} />

        <ProjectRowComponent sortCondition={"likeCnt"} title={"인기 프로젝트"} subTitle={"좋아요가 가장 많은 프로젝트"}></ProjectRowComponent>
        <ProjectRowComponent sortCondition={"endDate"} title={"마감 임박 프로젝트"} subTitle={"마감임박! 마지막 기회 놓치지 말아요!"}></ProjectRowComponent> 

<div
  style={{
    textAlign: 'center', // Centers the banner horizontally
    margin: '70px 0', // Adds margin around the banner
  }}
>
  <img
    src={Banner2}
    alt="Banner"
    style={{
      width: '100%', // Ensures the banner takes up the full width
      maxWidth: '1520px', // Optional: Limits the max width
      height: '270px', // Height of the banner
      borderRadius: '20px', // Sets the border radius to 20px
    }}
  />
</div>

         <ProjectRowComponent sortCondition={"recommend"} title={"사용자 추천 프로젝트"} subTitle={"나에게 딱 맞는 프로젝트."}></ProjectRowComponent>
      <ProjectRowComponent sortCondition={"viewCnt"} title={"최다 조회 프로젝트"} subTitle={"많은 사람들이 구경한 프로젝트"}></ProjectRowComponent>

      <ProjectRowComponent sortCondition={"targetFunding"} title={"최다 후원 프로젝트"} subTitle={"많은 사람들의 이유있는 후원! 후원금이 가장 많은 프로젝트!"}></ProjectRowComponent> 
          <NewsSection cardData={cardData} />

        <Footer />
      </Box>
    </>
  );
}
