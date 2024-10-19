import React, { useState, useEffect } from "react";
import {
  Typography,
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
import { display, styled } from "@mui/system";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ProgressChart } from "components/mypage/ProgressChart";

import axios from "axios";
import Cookies from "js-cookie";
import { SERVER_URL } from "constants/URLs";

import { useUser } from "UserContext";
import { Button } from "bootstrap";
import { BlueBorderButtonComponent } from "components/common/ButtonComponent";

// 후원 통계
const mockSupportStat = {
  totalAmount: 80771500,
  percentage: 161.54,
  supporters: 708,
  remainingDays: 0,
};

const mockChartData = [
  ["2024-10-08T00:00:00", 103000],
  ["2024-10-09T00:00:00", 103000],
  ["2024-10-22T00:00:00", 103000],
  ["2024-11-01T00:00:00", 103000],
  ["2024-11-02T00:00:00", 103000],
  ["2024-11-05T00:00:00", 103000],
  ["2024-11-09T00:00:00", 103000],
  ["2024-11-10T00:00:00", 206000],
  ["2024-11-16T00:00:00", 103000],
];

const mockSupporterData = [
  {
    deliveryId: "123456",
    delivery: {
      deliveryName: "홍길동",
      deliveryPhoneNumber: "010-1234-5678",
      deliveryAddress: "경기도 광명시",
      deliveryDetailedAddress: "oo동",
      deliveryMessage: "배송 전 연락 주세요.",
    },
    supportedAt: "2024-09-07T11:30:00",
    item_name: "눌림 플레이트 2세트 + 미니 보냉백 1개",
    supportingProject: {
      supportingProjectId: "SP123456",
      supportedAt: "2024-09-07T11:30:00",
    },
    supportingPackage: {
      packageName: "기본 패키지",
    },
  },
  {
    deliveryId: "123457",
    delivery: {
      deliveryName: "김철수",
      deliveryPhoneNumber: "010-9876-5432",
      deliveryAddress: "서울특별시 강남구",
      deliveryDetailedAddress: "xx동",
      deliveryMessage: "배송 전에 전화 부탁드립니다.",
    },
    supportedAt: "2024-09-07T14:30:00",
    item_name: "세트 상품 1개",
    supportingProject: {
      supportingProjectId: "SP123457",
      supportedAt: "2024-09-07T14:30:00",
    },
    supportingPackage: {
      packageName: "프리미엄 패키지",
    },
  },
  {
    deliveryId: "123458",
    delivery: {
      deliveryName: "이영희",
      deliveryPhoneNumber: "010-1234-8765",
      deliveryAddress: "부산광역시 해운대구",
      deliveryDetailedAddress: "yy동",
      deliveryMessage: "시간 맞춰서 부탁해요.",
    },
    supportedAt: "2024-09-08T10:00:00",
    item_name: "텀블러 1개",
    supportingProject: {
      supportingProjectId: "SP123458",
      supportedAt: "2024-09-08T10:00:00",
    },
    supportingPackage: {
      packageName: "스타터 패키지",
    },
  },
];

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

const DashboardSection = styled("div")({
  width: "100%",
  backgroundColor: "#f7f7f7",
  padding: "20px",
  borderRadius: "10px",
  marginTop: "40px",
  textAlign: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
});

const fetchData = async () => {
  // try {
  //   // 프로젝트 상세 정보 api 호출
  //   const [projectResponse] = await Promise.all([
  //     axios({
  //       method: "GET",
  //       url: `${SERVER_URL}/project/myproject/${projectId}`, // 템플릿 리터럴을 올바르게 적용
  //       // params: {
  //       //   memberId: user.key,
  //       // },
  //       headers: {
  //         Authorization: `Bearer ${Cookies.get("accessToken")}`, // 템플릿 리터럴을 올바르게 적용
  //       },
  //     }).then((response) => response),
  //   ]);
  //   // 후원 통계 api 호출
  //   setSupportStat(mockSupportStat);
  //   setProjectData(projectResponse.data); // 프로젝트 데이터 저장
  //   setLoading(false); // 로딩 상태 완료
  // } catch (error) {
  //   setLoading(false);
  // }
};

function CustomTableRow(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { border: "unset" } }}>
        <TableCell
          style={{
            width: "50px", // 칸 너비 조절
          }}
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell style={{ textAlign: "center" }}>
          {row.supportingProject.supportingProjectId}
        </TableCell>
        <TableCell style={{ textAlign: "center" }}>
          {row.delivery.deliveryName}
        </TableCell>
        <TableCell style={{ textAlign: "center" }}>
          {new Date(row.supportingProject.supportedAt).toLocaleString()}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 1,
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
                {row.delivery.deliveryPhoneNumber}
              </Typography>
              <Typography variant="body1">
                <strong style={{ fontSize: "18px", padding: "25px" }}>
                  배송지 정보
                </strong>
                {row.delivery.deliveryAddress}{" "}
                {row.delivery.deliveryDetailedAddress}
              </Typography>
              <Typography variant="body1">
                <strong style={{ fontSize: "18px", padding: "25px" }}>
                  배송 요청 사항
                </strong>
                {row.delivery.deliveryMessage}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// 후원자 정보 테이블 컴포넌트
export const SponsorTable = () => {
  const [orders, setOrders] = useState(mockSupporterData); // 모든 주문 정보를 저장할 상태
  // const [orders, setOrders] = useState([]); // 모든 주문 정보를 저장할 상태
  const [error, setError] = useState(null); // 에러 상태 관리
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  // 주문 정보를 가져오는 함수
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/order/all`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      // 데이터 확인
      setOrders(response.data); // 가져온 주문 정보를 상태에 저장
      setLoading(false); // 로딩 완료
    } catch (err) {
      console.error(err); // 오류 확인
      setError("주문 정보를 가져오는 중 오류가 발생했습니다.");
      setLoading(false); // 로딩 완료
    }
  };
  const downloadFile = () => {
    alert("엑셀 다운로드를 클릭하였습니다. ");
  };

  // 컴포넌트가 마운트될 때 주문 정보 가져오기
  useEffect(() => {
    //fetchOrders();
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Box style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ width: "auto" }}>
          <BlueBorderButtonComponent
            text={"엑셀 다운로드"}
            onClick={downloadFile}
          ></BlueBorderButtonComponent>
        </div>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow sx={{ "& > *": { border: "none" } }}>
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
              <CustomTableRow key={index} row={order}>
                {/* <TableCell>
                {order.supportingProject.supportingProjectId}
              </TableCell>
              <TableCell>{order.delivery.deliveryName}</TableCell>
              <TableCell>
                {new Date(order.supportingProject.supportedAt).toLocaleString()}
              </TableCell>
              <TableCell>{order.supportingPackage.packageName}</TableCell>
              <TableCell>{order.delivery.deliveryPhoneNumber}</TableCell>
              <TableCell>{order.delivery.deliveryAddress}</TableCell>
              <TableCell>{order.delivery.deliveryMessage}</TableCell> */}
              </CustomTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
