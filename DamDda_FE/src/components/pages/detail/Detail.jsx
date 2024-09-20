import React, { useState, useEffect } from "react";
import { Typography, LinearProgress, Divider, Button, Tabs, Tab } from "@mui/material";
import { styled } from "@mui/system";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProjectDetail from "./details";

const ThumbnailContainer = styled("div")({
  position: "relative",
  width: "500px",
  height: "500px",
  backgroundColor: "#f0f0f0", // 밝은 회색
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
  overflow: "hidden",
});

const ThumbnailImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "8px",
});

const Indicator = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px",
});

const projectData = {
  category: "💄뷰티",
  organizer_id: "홍길동",
  title: "세상에 단 하나뿐인 멋진 프로젝트",
  description:
    "세상에 단 하나뿐인 아주아주 멋진 예술품을 만들었습니다. 많이많이사세요",
  currentAmount: 500000,
  target_funding: 1000000,
  start_date: "2024.01.01",
  end_date: "2024.06.30",
  delivery_date: 30,
  liked_count: 500,
  supporter_count: 100,
  thumbnail_url: "data:image/png;",
};

const Detail = () => {
  const {
    category,
    organizer_id,
    title,
    description,
    currentAmount,
    target_funding,
    start_date,
    end_date,
    liked_count,
    thumbnail_url,
  } = projectData;

  const [remainingDays, setRemainingDays] = useState(0);
  const progress = (currentAmount / target_funding) * 100;
  const [heartCount, setHeartCount] = useState(0);
  const [isHearted, setIsHearted] = useState(false);

  useEffect(() => {
    const calculateRemainingDays = () => {
      const endDate = new Date(end_date);
      const today = new Date();
      const timeDiff = endDate - today;
      const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setRemainingDays(daysRemaining >= 0 ? daysRemaining : 0);
    };

    calculateRemainingDays();
    setHeartCount(projectData.supporter_count);
  }, [end_date]);

  const handleHeartClick = () => {
    setHeartCount((prev) => (isHearted ? prev - 1 : prev + 1));
    setIsHearted((prev) => !prev);
  };

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* 카테고리, 진행자명, 제목, 설명 */}
      <div style={{ marginBottom: "20px" }}>
        <Typography variant="category">{category}</Typography>
        <Typography variant="organizer">{organizer_id}</Typography>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </div>

      {/* 썸네일과 나머지 정보들 */}
      <div style={{ display: "flex" }}>
        <ThumbnailContainer>
          {thumbnail_url ? (
            <ThumbnailImage src={thumbnail_url} alt="Project Thumbnail" />
          ) : (
            <Typography variant="body2" color="textSecondary">
              이미지가 없습니다.
            </Typography>
          )}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              zIndex: 1,
              display: "flex",
              gap: "5px",
            }}
          >
            <Button>
              <ArrowBackIcon />
            </Button>
            <Button>
              <ArrowForwardIcon />
            </Button>
          </div>
          <Indicator>
            <div style={{ width: "100%", backgroundColor: "#ccc", height: "5px" }}>
              <div
                style={{
                  width: `${progress}%`,
                  backgroundColor: "#3f51b5",
                  height: "100%",
                }}
              />
            </div>
          </Indicator>
        </ThumbnailContainer>

        <div style={{ marginLeft: "20px", flex: 1 }}>
          <Typography variant="h5" style={{ marginTop: "20px" }}>
            후원금액 (진행률)
            <br />
            {currentAmount}원 ({progress.toFixed(2)}%)
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            style={{ margin: "10px 0", width: "700px" }}
          />
          <Typography variant="h5">남은 기간: {remainingDays}일</Typography>
          <Typography variant="h5">후원자 수: {heartCount}명</Typography>
          <Divider style={{ margin: "20px 0", width: "700px" }} />
          <Typography variant="body2">목표금액: {target_funding}원</Typography>
          <Typography variant="body2">
            펀딩 기간: {start_date}~{end_date}
          </Typography>
          <Typography variant="body2">
            예상 전달일: 프로젝트 종료일로부터 {projectData.delivery_date}일
            이내
          </Typography>
          {/* 버튼 */}
          <div style={{ marginTop: "20px" }}>
            <Button variant="contained">이 프로젝트에 후원하기</Button>
            <p>
            <Button
              variant="outlined"
              onClick={handleHeartClick}
              style={{ marginLeft: "10px" }}
            >
              {isHearted ? "♥" : "♡"} <br /> {liked_count}명
            </Button>
            <Button variant="outlined" style={{ marginLeft: "10px" }}>
              협업하기
            </Button>
            </p>
          </div>
        </div>
      </div>

      <Divider style={{ margin: "20px 0", width: "1220px" }} />

      {/* 상세설명 섹션 */}
      <div id="details">
        <Tabs value={0} indicatorColor="primary" textColor="primary">
          <Tab label="상세설명" onClick={() => scrollToSection('details')} />
          <Tab label="공지사항" onClick={() => scrollToSection('notices')} />
          <Tab label="Q&A" onClick={() => scrollToSection('qna')} />
        </Tabs>
        <Typography variant="body1" style={{ marginTop: "10px" }}>
          <ProjectDetail />
        </Typography>
      </div>

      <Divider style={{ margin: "20px 0" }} />

      {/* 공지사항 섹션 */}
      <div id="notices">
        <Tabs value={1} indicatorColor="primary" textColor="primary">
          <Tab label="상세설명" onClick={() => scrollToSection('details')} />
          <Tab label="공지사항" onClick={() => scrollToSection('notices')} />
          <Tab label="Q&A" onClick={() => scrollToSection('qna')} />
        </Tabs>
        <Typography variant="body1" style={{ marginTop: "10px" }}>
          여기에는 공지사항 내용이 들어갑니다.
        </Typography>
      </div>

      <Divider style={{ margin: "20px 0" }} />

      {/* Q&A 섹션 */}
      <div id="qna">
        <Tabs value={2} indicatorColor="primary" textColor="primary">
          <Tab label="상세설명" onClick={() => scrollToSection('details')} />
          <Tab label="공지사항" onClick={() => scrollToSection('notices')} />
          <Tab label="Q&A" onClick={() => scrollToSection('qna')} />
        </Tabs>
        <Typography variant="body1" style={{ marginTop: "10px" }}>
          여기에는 Q&A 내용이 들어갑니다.
        </Typography>
      </div>
    </div>
  );
};

export default Detail;
