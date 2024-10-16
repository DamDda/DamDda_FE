import React from "react";
import { Line } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import "chart.js/auto";
import { Chart } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation"; // 플러그인 가져오기

// 플러그인 등록
Chart.register(annotationPlugin);

// 서버에서 받아온 데이터를 누적 후원액으로 변환
const convertDataToCumulative = (serverData) => {
  const cumulativeData = [];
  let total = 0;

  if (Array.isArray(serverData)) {
    serverData.forEach(([date, amount]) => {
      total += amount;
      cumulativeData.push({ date: date.split("T")[0], amount: total });
    });
  } else {
    console.error("serverData가 배열 형식이 아닙니다.");
    return [];
  }

  return cumulativeData;
};

const ProgressChart = ({ serverData, targetFunding }) => {
  console.log("targetFunding 값:", targetFunding);
  const dailyData = convertDataToCumulative(serverData);

  // targetFunding 값이 안전하게 설정되도록 보장
  const safeTargetFunding = targetFunding || 0;
  console.log("safeTargetFunding:", safeTargetFunding);

  // Chart.js의 데이터 설정
  const data = {
    labels: dailyData.map((data) => data.date),
    datasets: [
      {
        label: "누적 후원액",
        data: dailyData.map((data) => data.amount),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  // Chart.js의 옵션 설정
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value.toLocaleString()} 원`, // y축의 숫자를 금액으로 표시
        },
      },
      x: {
        type: "category",
        ticks: {
          callback: (val, index) => dailyData[index].date, // x축의 날짜를 표시
        },
      },
    },
    plugins: {
      annotation: {
        annotations: {
          // 목표 금액을 강조하는 선 추가
          targetLine: {
            type: "line",
            scaleID: "y",
            value: safeTargetFunding, // 목표 금액 설정
            borderColor: "rgba(75, 192, 192, 1)", // 선의 색상
            borderWidth: 2, // 선의 두께
            borderDash: [5, 5], // 대시 스타일 (선이 점선으로 보이도록)
            label: {
              content: `목표액: ${safeTargetFunding.toLocaleString()} 원`, // 목표 금액 라벨
              enabled: true,
              position: "end", // 라벨의 위치
              backgroundColor: "rgba(75, 192, 192, 1)", // 라벨의 배경색
              color: "#fff", // 라벨의 글자색
              font: {
                family: "Arial", // 폰트 설정
                size: 12,
                weight: "bold",
              },
            },
          },
        },
      },
    },
  };

  return (
    <Box sx={{ padding: "5px" }}>
      <Typography
        variant="h6"
        gutterBottom
        style={{
          marginRight: "800px",
          marginTop: "-10px",
          fontWeight: "bold",
          fontSize: "24px",
        }}
      >
        일일 누적 후원액
      </Typography>
      <Line data={data} options={options} plugins={[annotationPlugin]} />
    </Box>
  );
};

export default ProgressChart;
