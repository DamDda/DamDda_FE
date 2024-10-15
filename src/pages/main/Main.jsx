import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from 'components/layout/Header';

export function Main() {
  // const navigate = useNavigate();
  // const [category, setCategory] = useState('전체');
  const [search, setSearch] = useState('');
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

  return (
    <>
      <Header search={search} setSearch={setSearch} />
      {/* <Box
        sx={{
          margin: '0 auto',
          width: "80%",
          maxWidth: "1750px",
          minWidth: '600px',
        }}
      >
        <CarouselComponent />
        <Category setCategory={setCategory} />
        <SearchBar search={search} setSearch={setSearch} />
        <ServiceCards />
        <ProductRecommendations sortCondition={"likeCnt"} title={"인기 프로젝트"} subTitle={"좋아요가 가장 많은 프로젝트"} />
        <ProductRecommendations sortCondition={"endDate"} title={"마감 임박 프로젝트"} subTitle={"마감임박! 마지막 기회 놓치지 말아요!"} />
        <Banner />
        <ProductRecommendations sortCondition={"recommend"} title={"사용자 추천 프로젝트"} subTitle={"나에게 딱 맞는 프로젝트."} />
        <ProductRecommendations sortCondition={"viewCnt"} title={"최다 조회 프로젝트"} subTitle={"많은 사람들이 구경한 프로젝트"} />
        <ProductRecommendations sortCondition={"targetFunding"} title={"최다 후원 프로젝트"} subTitle={"많은 사람들의 이유있는 후원! 후원금이 가장 많은 프로젝트!"} />
        <NewSection />
        <CollaborationSection />
        <Footer />
      </Box> */}
    </>
  );
}

