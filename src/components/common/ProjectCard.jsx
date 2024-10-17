import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, IconButton, Button, LinearProgress, Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { SERVER_URL } from "constants/URLs";

export const ProductCard = ({ product, handleLike }) => {
  const formattedTargetFunding = new Intl.NumberFormat().format(product.targetFunding);

  const achievementRate = Math.min((product.fundsReceive / product.targetFunding) * 100, 100);

  const currentTime = new Date();
  const endDate = new Date(product.endDate);
  const timeDifference = endDate - currentTime;
  const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const navigate = useNavigate();

/////////////////////////////////////////////

  // handleLike 함수가 제대로 전달되었는지 확인
  console.log("ProductCard - handleLike 함수:", handleLike);

////////////////////////////////////////////
  return (
    <>
      <Card
        sx={{
          borderRadius: "15px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "visible",
          width: "250px",  // 너비 줄이기
          height: "370px", // 높이 줄이기
          transform: "scale(0.95)", // 스케일 조정
          transformOrigin: "top left",
        }}
        onClick={() => navigate(`/detail?projectId=${product.id}`)}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            image={`${SERVER_URL}/${product.thumbnailUrl}`}
            sx={{ height: "160px", borderRadius: "5px", width: "100%" }} // 높이 줄이기
          />
          <IconButton
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: product.liked ? "red" : "gray",
            }}
            onClick={(event) => {
              event.stopPropagation();
              console.log("handleLike 호출됨:", product); // 로그로 함수 호출 확인

              handleLike(product);
            }}
          >
            <FavoriteIcon />
          </IconButton>
        </Box>

        <CardContent
          sx={{
            width: "250px", // 너비 줄이기
            height: "220px", // 높이 줄이기
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "flex-start",
          }}
        >
          {/* Title */}
          <Typography
            component="div"
            sx={{ fontWeight: "bold", fontSize: "1.2rem"}} // 폰트 크기 줄이기
          >
            {product.title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.9rem", mb: 2 }} // 폰트 크기 줄이기
          >
            {product.description}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", fontSize: "1rem" }} // 폰트 크기 줄이기
            >
              달성률 {achievementRate.toFixed(2)}%
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", fontSize: "0.8rem" }} // 폰트 크기 줄이기
            >
              {formattedTargetFunding}원
            </Typography>
          </Box>

          <Box sx={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
            <LinearProgress
              variant="determinate"
              value={achievementRate}
              sx={{ height: 8, borderRadius: "5px", mt: 1, mb: 2 }} // 높이 줄이기
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginTop: "10px" }}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              sx={{
                backgroundColor: "#5a87f7",
                borderRadius: "12px",
                fontSize: "0.8rem", // 폰트 크기 줄이기
                width: "110px", // 너비 줄이기
                height: "35px", // 높이 줄이기
              }}
            >
              마감임박 D - {daysLeft}
            </Button>

            <Typography variant="body2" sx={{ fontWeight: "300", fontSize: "0.75rem" }}>
                          진행자: {product.nickName}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
