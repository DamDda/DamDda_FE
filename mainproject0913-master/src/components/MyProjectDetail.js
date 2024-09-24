import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  LinearProgress,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StatusButton from "./StatusButton";

// 가짜 데이터 (실제 백엔드 구현 전까지 사용)
const mockProjectData = {
  1: {
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
    approval: 1,
    thumbnail_url: "https://via.placeholder.com/500",
  },
};

const ThumbnailContainer = styled("div")({
  position: "relative",
  width: "400px",
  height: "400px",
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

const DetailContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "40px",
  textAlign: "center",
});

const InfoSection = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

const ProgressSection = styled("div")({
  width: "100%",
  margin: "20px 0",
});

const MyProjectDetail = () => {
  const { id } = useParams(); // URL에서 projectId를 가져옴
  const [projectData, setProjectData] = useState(null);
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

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

  const remainingDays = Math.ceil(
    (new Date(end_date) - new Date()) / (1000 * 3600 * 24)
  );
  const progress = (currentAmount / target_funding) * 100;

  // 승인 상태에 따른 상태 라벨 결정
  const getApprovalStatus = (approval) => {
    switch (approval) {
      case 1:
        return "승인완료";
      case 0:
        return "승인대기";
      case -1:
        return "승인거절";
      default:
        return "미정";
    }
  };

  return (
    <DetailContainer>
      {/* 좌측 상단에 < 버튼 추가, 누르면 Myproject로 돌아감 */}
      <IconButton
        onClick={() => navigate("/myproject")}
        style={{ position: "absolute", top: "200px", left: "500px" }}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>

      {/* 상단 제목: 프로젝트 진행률 확인 */}
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", marginBottom: "20px" }}
      >
        프로젝트 진행률 확인
      </Typography>

      {/* 카테고리, 진행자명, 제목, 설명 */}
      <InfoSection>
        <ThumbnailContainer>
          {thumbnail_url ? (
            <ThumbnailImage src={thumbnail_url} alt="Project Thumbnail" />
          ) : (
            <Typography variant="body2" color="textSecondary">
              이미지가 없습니다.
            </Typography>
          )}
        </ThumbnailContainer>

        <div style={{ marginLeft: "40px", textAlign: "left" }}>
          <Typography variant="category">{category}</Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: "10px" }}
          >
            {title}
          </Typography>
          <Typography variant="body2">{description}</Typography>
          <Typography variant="body2" sx={{ marginTop: "10px", color: "gray" }}>
            진행자: {organizer_id}
          </Typography>
        </div>
      </InfoSection>

      {/* 후원금액과 진행률 */}
      <ProgressSection>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: "10px" }}
        >
          후원금액 (진행률): {currentAmount}원 ({progress.toFixed(2)}%)
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: "10px" }}
        />
        <Typography variant="h5" sx={{ marginTop: "20px" }}>
          남은 기간: {remainingDays}일
        </Typography>
        <Typography variant="h5">후원자 수: {liked_count}명</Typography>
      </ProgressSection>

      <Divider sx={{ width: "100%", margin: "20px 0" }} />

      {/* 목표 금액과 펀딩 기간 */}
      <Typography variant="body2">목표금액: {target_funding}원</Typography>
      <Typography variant="body2">
        펀딩 기간: {start_date} ~ {end_date}
      </Typography>
      <Typography variant="body2">
        예상 전달일: 프로젝트 종료일로부터 {projectData.delivery_date}일 이내
      </Typography>

      {/* 관리자 승인 상태에 따른 StatusButton 추가 */}
      <StatusButton
        status={getApprovalStatus(projectData.approval)}
        label={getApprovalStatus(projectData.approval)}
        sx={{
          marginTop: "20px",
          backgroundColor: "#4caf50",
          borderRadius: "50px",
          padding: "10px 20px",
        }}
      />
    </DetailContainer>
  );
};

export default MyProjectDetail;
