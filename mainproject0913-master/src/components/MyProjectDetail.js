import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  LinearProgress,
  Divider,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StatusButton from "./StatusButton";

// 가짜 데이터 (실제 백엔드 구현 전까지 사용)
const mockProjectData = {
  1: {
    category: "💄뷰티",
    organizer_id: "홍길동",
    title: "세상에 단 하나뿐인 멋진 프로젝트",
    description: "세상에 단 하나뿐인 아주아주 멋진 예술품을 만들었습니다.",
    fundsReceive: 500000,
    targetFunding: 1000000,
    startDate: "2024.01.01",
    endDate: "2024.06.30",
    delivery_date: 30,
    supporterCnt: 500,
    supporter_count: 100,
    approval: -1,
    rejectMessage: "내용부족",
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
  marginRight: "30px",
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
  justifyContent: "flex-start", // 이미지와 정보를 나란히 배치
  alignItems: "flex-start", // 상단 정렬
  width: "100%",
  marginTop: "20px",
});

const ProgressSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start", // 상단 정렬
  alignItems: "flex-start",
  marginLeft: "20px", // 이미지와 텍스트 사이의 간격을 줄임
  marginTop: "19px",
});

const MyProjectDetail = () => {
  const { id } = useParams();
  const [projectData, setProjectData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const mockData = mockProjectData[id] || mockProjectData[1];
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
    fundsReceive,
    targetFunding,
    startDate,
    endDate,
    supporterCnt,
    thumbnail_url,
    rejectMessage,
  } = projectData;

  // 남은 기간이 0 이하일 경우 0으로 표시
  const remainingDays = Math.max(
    Math.ceil((new Date(endDate) - new Date()) / (1000 * 3600 * 24)),
    0
  );
  const progress = (fundsReceive / targetFunding) * 100;

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
      <IconButton
        onClick={() => navigate("/myproject")}
        style={{ position: "absolute", top: "200px", left: "500px" }}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>

      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", marginBottom: "20px" }}
      >
        프로젝트 진행률 확인
      </Typography>

      <div style={{ padding: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <Typography variant="category">{category}</Typography>
          <br />
          <Typography variant="organizer">{organizer_id}</Typography>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">{description}</Typography>
        </div>
      </div>

      <InfoSection>
        {/* 이미지 섹션 */}
        <ThumbnailContainer>
          {thumbnail_url ? (
            <ThumbnailImage src={thumbnail_url} alt="Project Thumbnail" />
          ) : (
            <Typography variant="body2" color="textSecondary">
              이미지가 없습니다.
            </Typography>
          )}
        </ThumbnailContainer>

        {/* 관리자 승인 상태에 따른 StatusButton */}
        <Box>
          <StatusButton
            status={getApprovalStatus(projectData.approval)}
            label={getApprovalStatus(projectData.approval)}
            showRejectReason={true} // 이 페이지에서만 Tooltip이 작동하도록 설정
            rejectMessage={rejectMessage} // 거절 사유 전달
            sx={{
              marginTop: "-50px",
              marginRight: "-1150px",
              backgroundColor: projectData.approval === -1 ? "red" : "#4caf50", // 거절일 때는 버튼 색을 다르게
              borderRadius: "50px",
              padding: "10px 20px",
              zIndex: 2, // Tooltip이 정상적으로 표시되도록 zIndex 추가
            }}
          />
        </Box>

        {/* 후원 정보 섹션 */}
        <ProgressSection>
          {/* 후원금액(진행률) 부분 */}
          <Typography variant="h6" style={{ marginTop: "20px" }}>
            후원금액
          </Typography>

          {/* 금액 표시 */}
          <Typography variant="h4" fontWeight="bold">
            {fundsReceive.toLocaleString()}원
          </Typography>

          {/* 진행률 바와 % */}
          <Box position="relative" width="600px" marginTop="10px">
            <LinearProgress
              variant="determinate"
              value={progress}
              style={{ height: "10px", borderRadius: "5px" }}
            />

            {/* % 표시를 바의 우측 상단에 배치 */}
            <Typography
              variant="body2"
              style={{
                position: "absolute",
                right: 0,
                top: "-20px", // 바의 위쪽에 위치하도록 설정
                fontSize: "16px", // 글씨 작게 설정
                color: "gray",
              }}
            >
              {progress.toFixed(2)}%
            </Typography>
          </Box>

          <Typography variant="h6" style={{ marginTop: "20px" }}>
            남은 기간 <br />
          </Typography>

          {/* 남은 기간 표시   */}
          <Typography variant="h4" fontWeight="bold">
            {remainingDays}일
          </Typography>

          <Typography variant="h6" style={{ marginTop: "20px" }}>
            후원자 수
          </Typography>

          {/* 후원자 수 표시 */}
          <Typography variant="h4" fontWeight="bold">
            {supporterCnt}명
          </Typography>

          {/* 회색 선 */}
          <Divider style={{ margin: "20px 0", width: "600px" }} />

          {/* 목표금액 */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography style={{ fontSize: "14px" }}>목표금액</Typography>
            <Typography style={{ fontSize: "14px", marginLeft: "50px" }}>
              {targetFunding}원
            </Typography>
          </Box>

          {/* 펀딩기간 */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography style={{ fontSize: "14px" }}>펀딩기간</Typography>
            <Typography style={{ fontSize: "14px", marginLeft: "50px" }}>
              {startDate}~{endDate}
            </Typography>
          </Box>
        </ProgressSection>
      </InfoSection>
    </DetailContainer>
  );
};

export default MyProjectDetail;
