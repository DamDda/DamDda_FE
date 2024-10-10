import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  LinearProgress,
  Divider,
  IconButton,
  Box,
  Tab,
  Tabs,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { border, borderBottom, styled } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import StatusButton from "./StatusButton";
// import { Row } from "react-bootstrap";
import axios from "axios";

import { useUser } from "../../../UserContext";

// // 가짜 데이터 (실제 백엔드 구현 전까지 사용)
// const mockProjectData = {
//   1: {
//     category: "💄뷰티",
//     organizer_id: "홍길동",
//     title: "세상에 단 하나뿐인 멋진 프로젝트",
//     description: "세상에 단 하나뿐인 아주아주 멋진 예술품을 만들었습니다.",
//     fundsReceive: 500000,
//     targetFunding: 1000000,
//     startDate: "2024.01.01",
//     endDate: "2024.06.30",
//     delivery_date: 30,
//     supporterCnt: 500,
//     supporter_count: 100,
//     approval: -1,
//     rejectMessage: "내용부족",
//     thumbnail_url: "https://via.placeholder.com/500",
//   },
// };

// 후원 통계
const mockSupportStat = {
  totalAmount: 80771500,
  percentage: 161.54,
  supporters: 708,
  remainingDays: 0,
};

// 후원자 조회
const mockSupporterData = [
  {
    deliveryId: "123456",
    deliveryName: "홍길동",
    supportedAt: "2024.09.07 - 오전 11:30",
    item_name: "눌림 플레이트 2세트 + 미니 보냉백 1개",
    deliveryPhoneNumber: "010-1234-5678",
    deliveryAddress: "경기도 광명시",
    deliveryDetailedAddress: "oo동",
    deliveryMessage: "배송 전 연락 주세요.",
    // history: [
    //   {
    //     date: "2024-09-01",
    //     customerId: "11091700",
    //     amount: 3,
    //   },
    // ],
  },
  {
    deliveryId: "123457",
    deliveryName: "김철수",
    supportedAt: "2024.09.07 - 오후 2:30",
    item_name: "세트 상품 1개",
    deliveryPhoneNumber: "010-9876-5432",
    deliveryAddress: "서울특별시 강남구",
    deliveryDetailedAddress: "xx동",
    deliveryMessage: "배송 전에 전화 부탁드립니다.",
    // history: [
    //   {
    //     date: "2024-09-03",
    //     customerId: "11091701",
    //     amount: 2,
    //   },
    // ],
  },
];

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

const DashboardSection = styled("div")({
  width: "100%",
  backgroundColor: "#f7f7f7",
  padding: "20px",
  borderRadius: "10px",
  marginTop: "40px",
  textAlign: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
});

function CustomTableRow(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell style={{ textAlign: "center" }}>{row.deliveryId}</TableCell>
        <TableCell style={{ textAlign: "center" }}>
          {row.deliveryName}
        </TableCell>
        <TableCell style={{ textAlign: "center" }}>{row.supportedAt}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 3,
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Typography variant="body1">
                <strong style={{ fontSize: "18px", padding: "25px" }}>
                  선물 정보
                </strong>
                {row.item_name}
              </Typography>
              <Typography variant="body1">
                <strong style={{ fontSize: "18px", padding: "25px" }}>
                  연락처
                </strong>
                {row.deliveryPhoneNumber}
              </Typography>
              <Typography variant="body1">
                <strong style={{ fontSize: "18px", padding: "25px" }}>
                  배송지 정보
                </strong>
                {row.deliveryAddress} {row.deliveryDetailedAddress}
              </Typography>
              <Typography variant="body1">
                <strong style={{ fontSize: "18px", padding: "25px" }}>
                  배송 요청 사항
                </strong>
                {row.deliveryMessage}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// 후원자 정보 테이블 컴포넌트
function SupporterTable() {
  const [orders, setOrders] = useState([]); // 모든 주문 정보를 저장할 상태
  const [error, setError] = useState(null); // 에러 상태 관리
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  // 주문 정보를 가져오는 함수
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:9000/order/all");
      setOrders(response.data); // 가져온 주문 정보를 상태에 저장
      setLoading(false); // 로딩 완료
    } catch (err) {
      setError("주문 정보를 가져오는 중 오류가 발생했습니다.");
      setLoading(false); // 로딩 완료
    }
  };

  // 컴포넌트가 마운트될 때 주문 정보 가져오기
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              후원번호
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              주문자 이름
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              후원 날짜
            </TableCell>

            {/* <TableCell>선물 정보</TableCell>
            <TableCell>연락처</TableCell>
            <TableCell>배송지 정보</TableCell>
            <TableCell>배송 요청 사항</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={index}>
              <TableCell>
                {order.supportingProject.supportingProjectId}
              </TableCell>
              <TableCell>{order.delivery.deliveryName}</TableCell>
              <TableCell>
                {new Date(order.supportingProject.supportedAt).toLocaleString()}
              </TableCell>
              <TableCell>{order.supportingPackage.packageName}</TableCell>
              <TableCell>{order.delivery.deliveryPhoneNumber}</TableCell>
              <TableCell>{order.delivery.deliveryAddress}</TableCell>
              <TableCell>{order.delivery.deliveryMessage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function MyProjectDetails({ projectId, setMyprojectClick }) {
  // const { projectId } = useParams(); // URL에서 projectId 추출
  const [projectData, setProjectData] = useState(null); // 프로젝트 정보 상태
  const [supportStat, setSupportStat] = useState(null); // 후원 통계 상태

  const [loading, setLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const { user } = useUser();
  const navigate = useNavigate();

  // 두 API를 병렬로 호출하여 데이터를 가져옴
  useEffect(() => {
    const fetchData = async () => {
      console.log(projectId);
      console.log(user.key);
      try {
        // 프로젝트 상세 정보 api 호출
        const projectResponse = await axios({
          method: "GET",
          url: `http://localhost:9000/api/projects/myproject/${projectId}`,
          params: {
            memberId: user.key,
          },
        }).then((response) => response);
        console.log(projectResponse);

        // 후원 통계 api 호출
        // const supportStatResponse = await axios.get(
        //   `/projects/myproject/sptstat/${projectId}`
        // );
        setSupportStat(mockSupportStat);

        setProjectData(projectResponse.data); // 프로젝트 데이터 저장
        // setSupportStat(supportStatResponse.data); // 후원통계 데이터 저장

        setLoading(false); // 로딩 상태 완료
      } catch (error) {
        console.log("데이터를 불러오는 중 오류 발생:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // const [projectId, setProjectId] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState(null);

  // 프로젝트 ID 가져오기
  // const fetchUserProjectId = async (memberId) => {
  //   try {
  //     console.log("API 요청 중..."); // 요청 전에 로그 출력
  //     const response = await axios.get(
  //       `http://localhost:9000/order/user/project?memberId=${memberId}`
  //     );
  //     console.log("응답 데이터:", response.data); // 응답 로그 출력

  //     // 응답에서 projectId를 추출
  //     const userProjectId = response.data; // 단순히 ID를 반환하므로, 아래와 같이 수정
  //     setProjectId(userProjectId); // 상태에 저장
  //   } catch (error) {
  //     console.error("프로젝트 ID를 가져오는 중 오류 발생:", error);
  //   }
  // };

  // 프로젝트 통계 정보를 가져오는 함수
  // const fetchProjectStatistics = async (projectId) => {
  //   if (!projectId) return; // projectId가 없으면 함수 종료
  //   try {
  //     console.log("projectId:", projectId); // projectId 확인
  //     const response = await axios.get(
  //       `http://localhost:9000/order/statistics/${projectId}`
  //     );
  //     setStatistics(response.data); // 통계 정보를 상태에 저장
  //     setLoading(false); // 로딩 완료
  //   } catch (err) {
  //     setError("프로젝트 통계 정보를 가져오는 중 오류가 발생했습니다.");
  //     setLoading(false); // 로딩 완료
  //   }
  // };

  // useEffect(() => {
  //   const memberId = 8; // JWT로 변경
  //   fetchUserProjectId(memberId); // 사용자 프로젝트 ID 가져오기
  // }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 호출

  // useEffect(() => {
  //   if (projectId) {
  //     fetchProjectStatistics(projectId); // projectId가 설정되면 통계 가져오기
  //   }
  // }, [projectId]); // projectId가 변경될 때마다 호출

  if (loading) {
    return <div>로딩중..</div>;
  }

  if (!projectData && !supportStat) {
    return <div>데이터를 가져오는 중 오류가 발생</div>;
  }

  // 백엔드가 준비되지 않았을 때 가짜 데이터 사용
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const projectResponse =
  //         mockProjectData[projectId] || mockProjectData[1];
  //       const supportStatResponse = mockSupportStat;

  //       setProjectData(projectResponse); // 프로젝트 데이터 저장
  //       setSupportStat(supportStatResponse); // 후원 통계 데이터 저장
  //       setLoading(false); // 로딩 상태 완료
  //     } catch (error) {
  //       console.log("데이터를 불러오는 중 오류 발생:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [projectId]);

  // if (loading) {
  //   return <div>로딩 중...</div>;
  // }

  // if (!projectData || !supportStat) {
  //   return <div>데이터를 가져오는 중 오류가 발생했습니다.</div>;
  // }

  const {
    approval,
    category, // 카테고리
    organizer_id, // 진행자
    title, // 제목
    description, // 설명
    fundsReceive, // 받은 후원금
    targetFunding, // 목표 후원금
    startDate, // 시작일
    endDate, // 마감일
    supporterCnt, // 후원자수
    productImages, // 썸네일 주소
    rejectMessage, // 거절 메세지
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
      case 2:
        return "승인거절";
      default:
        return "미정";
    }
  };

  // 탭 핸들러
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <DetailContainer>
      {/* 뒤로 가기 버튼 */}
      <IconButton
        // onClick={() => navigate("/myproject")}
        onClick={() => setMyprojectClick(false)}
        style={{ position: "absolute", top: "330px", left: "700px" }}
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
          {productImages ? (
            <ThumbnailImage src={productImages[0]} alt="Project Thumbnail" />
          ) : (
            <Typography variant="body2" color="textSecondary">
              이미지가 없습니다.
            </Typography>
          )}
        </ThumbnailContainer>

        {/* 관리자 승인 상태에 따른 StatusButton */}
        <Box>
          <StatusButton
            status={getApprovalStatus(approval)}
            label={getApprovalStatus(approval)}
            showRejectReason={approval === 2 ? true : false} // 이 페이지에서만 Tooltip이 작동하도록 설정
            rejectMessage={rejectMessage} // 거절 사유 전달
            sx={{
              marginTop: "-50px",
              marginRight: "-1150px",
              backgroundColor: projectData.approval === 2 ? "red" : "#4caf50", // 거절일 때는 버튼 색을 다르게
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
              {startDate}~ {endDate}
              {/* {new Date(statistics.startDate).toLocaleDateString()}~{new Date(statistics.endDate).toLocaleDateString()} */}
            </Typography>
          </Box>
        </ProgressSection>
      </InfoSection>

      {/* Tabs Section */}
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="후원통계 및 후원자 조회 탭"
        sx={{
          marginTop: "60px",
          marginBottom: "20px",
          "& .MuiTab-root": {
            fontSize: "20px",
          },
        }}
      >
        <Tab label="후원 통계" />
        <Tab label="후원자 조회" />
      </Tabs>
      <br />

      {/* 후원 통계 */}
      {tabIndex === 0 && (
        <>
          <div style={{ fontSize: "20px" }}>
            {/* 시작일: {new Date(statistics.startDate).toLocaleDateString()} |
            마감일: {new Date(statistics.endDate).toLocaleDateString()} */}
          </div>

          <DashboardSection
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
              borderRadius: "10px",
              backgroundColor: "white",
              width: "1000px",
              marginTop: "20px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                marginBottom: "20px",
                fontWeight: "bold",
                marginRight: "-150px",
              }}
            >
              {/* 후원 통계 */}
            </Typography>
            <Typography>
              <span style={{ color: "red", fontSize: "18px" }}>
                총 후원금액
              </span>
              <br />
              <span style={{ color: "black", fontSize: "24px" }}>
                {/* {statistics.totalSupportAmount.toLocaleString()}원 */}
              </span>
              <br />
            </Typography>
            <Typography>
              <span style={{ color: "red", fontSize: "18px" }}>달성률</span>
              <br />
              <span style={{ color: "black", fontSize: "24px" }}>
                {/* {(statistics.totalSupportAmount / statistics.targetFunding) *
                  100} */}
                %
              </span>
              <br />
            </Typography>

            <Typography>
              <span style={{ color: "red", fontSize: "18px" }}>후원자 수</span>
              <br />
              <span style={{ color: "black", fontSize: "24px" }}>
                {/* {statistics.totalSupporters}명 */}
              </span>
              <br />
            </Typography>

            <Typography>
              <span style={{ color: "red", fontSize: "18px" }}>남은 기간</span>
              <br />
              <span style={{ color: "black", fontSize: "24px" }}>
                {/* {statistics.remainingDays}일 */}
              </span>
              <br />
            </Typography>
          </DashboardSection>
        </>
      )}

      {/* 후원자 조회 정보 */}
      {tabIndex === 1 && <SupporterTable />}
    </DetailContainer>
  );
};

export default MyProjectDetail;

