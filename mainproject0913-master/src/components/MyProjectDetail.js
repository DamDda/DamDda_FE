import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, LinearProgress, Divider, Button, Tabs, Tab } from "@mui/material";
import { styled } from "@mui/system";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// 가짜 데이터 (실제 백엔드 구현 전까지 사용)
const mockProjectData = {
  1: {
    category: "💄뷰티",
    organizer_id: "홍길동",
    title: "세상에 단 하나뿐인 멋진 프로젝트",
    description: "세상에 단 하나뿐인 아주아주 멋진 예술품을 만들었습니다. 많이많이사세요",
    currentAmount: 500000,
    target_funding: 1000000,
    start_date: "2024.01.01",
    end_date: "2024.06.30",
    delivery_date: 30,
    liked_count: 500,
    supporter_count: 100,
    thumbnail_url: "https://via.placeholder.com/500",
  },
  // 다른 가짜 데이터 추가 가능
};

const ThumbnailContainer = styled("div")({
  position: "relative",
  width: "500px",
  height: "500px",
  backgroundColor: "#f0f0f0",
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

const ProjectDetail = () => {
  const { id } = useParams(); // URL에서 projectId를 가져옴
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    // 백엔드 구현 후 주석 해제
    /*
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`/projects/myproject/${id}`);
        setProjectData(response.data);
      } catch (error) {
        console.error("프로젝트 데이터를 가져오는 중 오류 발생", error);
      }
    };

    fetchProjectData();
    */

    // 백엔드가 구현되기 전에는 가짜 데이터 사용
    const mockData = mockProjectData[id] || mockProjectData[1]; // 가짜 데이터로 설정
    setProjectData(mockData);
  }, [id]);

  if (!projectData) {
    return <div>프로젝트 데이터를 불러오는 중입니다...</div>;
  }

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

  const remainingDays = Math.ceil((new Date(end_date) - new Date()) / (1000 * 3600 * 24));
  const progress = (currentAmount / target_funding) * 100;

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
          <Typography variant="h5">후원자 수: {liked_count}명</Typography>
          <Divider style={{ margin: "20px 0", width: "700px" }} />
          <Typography variant="body2">목표금액: {target_funding}원</Typography>
          <Typography variant="body2">
            펀딩 기간: {start_date}~{end_date}
          </Typography>
          <Typography variant="body2">
            예상 전달일: 프로젝트 종료일로부터 {projectData.delivery_date}일 이내
          </Typography>
          {/* 버튼 */}
          <div style={{ marginTop: "20px" }}>
            <Button variant="contained">이 프로젝트에 후원하기</Button>
            <Button variant="outlined" style={{ marginLeft: "10px" }}>
              협업하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
