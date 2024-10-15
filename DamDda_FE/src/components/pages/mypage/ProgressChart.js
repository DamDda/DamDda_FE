// ProgressChart.js

import React from "react";
import { Line } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import "chart.js/auto";

// 서버에서 받아온 데이터를 누적 후원액으로 변환
const convertDataToCumulative = (serverData) => {
  const cumulativeData = [];
  let total = 0;

  serverData.forEach(([date, amount]) => {
    total += amount;
    cumulativeData.push({ date: date.split("T")[0], amount: total }); // 날짜에서 시간 제거
  });

  return cumulativeData;
};

// 목표 금액을 강조한 후원액 그래프 컴포넌트
const ProgressChart = ({ serverData, targetAmount }) => {
  const dailyData = convertDataToCumulative(serverData); // 데이터를 누적 후원액으로 변환

  const data = {
    labels: dailyData.map((data) => data.date), // 날짜 라벨을 x축에 사용
    datasets: [
      {
        label: "누적 후원액",
        data: dailyData.map((data) => data.amount), // 후원액 데이터
        borderColor: "rgba(255, 99, 132, 1)", // 그래프 색상
        backgroundColor: "rgba(255, 99, 132, 0.2)", // 채운 색상
        fill: true, // 그래프 영역을 채움
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value.toLocaleString()} 원`, // y축에 금액 표시
        },
      },
      x: {
        type: "category",
        ticks: {
          callback: (val, index) => dailyData[index].date, // x축에 날짜 표시
        },
      },
    },
    plugins: {
      annotation: {
        annotations: {
          line1: {
            type: "line",
            scaleID: "y",
            value: targetAmount, // 목표 금액 위치
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            label: {
              content: "목표액",
              enabled: true,
              position: "end",
              backgroundColor: "rgba(75, 192, 192, 1)",
            },
          },
        },
      },
    },
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h6" gutterBottom>
        일일 누적 후원액
      </Typography>
      <Line data={data} options={options} />
    </Box>
  );
};

export default ProgressChart;
