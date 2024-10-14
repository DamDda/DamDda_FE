import React from 'react'; // React를 사용하기 위해
import { useNavigate } from 'react-router-dom'; // navigate 기능을 사용하기 위해
import { Card, CardContent, CardMedia, IconButton, Button, LinearProgress, Box, Typography } from '@mui/material'; // MUI 컴포넌트들
import FavoriteIcon from '@mui/icons-material/Favorite'; // 좋아요 아이콘


// Individual product card component
export const ProductCard = ({ product, handleLike }) => {

    const formattedTargetFunding = new Intl.NumberFormat().format(product.targetFunding);
  
    // 달성률 계산 (fundsReceive / targetFunding * 100)
    const achievementRate = Math.min(
      (product.fundsReceive / product.targetFunding) * 100,
      100
    );
    
    // 현재 시간
    const currentTime = new Date();
    // product.endDate를 Date 객체로 변환
    const endDate = new Date(product.endDate);
    // 남은 시간 계산 (밀리초 기준)
    const timeDifference = endDate - currentTime;
  
    // 밀리초를 일(day) 단위로 변환
    const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    const navigate = useNavigate(); //새로운 프로젝트 눌렀을 때 이동하는 네비게이트
  
  
    return (
      <>
        <Card
          sx={{
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: 2,
            margin: '0px 10px',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflow: "visible", // 숨겨진 요소 방지
            width: "300px", // 고정된 가로 크기
            height: "480px",
            transform: "scale(0.95)", // 전체 요소의 크기를 0.9배로 축소
            transformOrigin: "top left", // 스케일 기준점 설정
          }}
          onClick={() => navigate(`/detail?projectId=${product.id}`)}
        >
          {/* 타이틀과 서브타이틀 */}
          <Box
            sx={{
              position: "relative",
            }}
          >
            <CardMedia
              component="img"
              image={`http://${window.location.hostname}:9000/${product.thumbnailUrl}`} // 이미지 URL을 서버에서 호출
              sx={{ height: "187.5px", borderRadius: "5px", width: "100%" }} // 이미지 높이 증가
            />
            <IconButton
              sx={{
                position: "absolute",
                top: 7,
                right: 7,
                color: product.liked ? "red" : "gray",
              }}
              onClick={(event) => {
                event.stopPropagation(); // Card 클릭 이벤트가 실행되지 않도록 방지
                handleLike(product); // 좋아요 처리
              }}
            >
              <FavoriteIcon />
            </IconButton>
          </Box>
  
          <CardContent
            sx={{
              height: "262.5px",
              display: "flex",
              flexDirection: "column",
              overflow: "visible", // 숨겨진 요소 방지
              justifyContent: "space-around",
              alignItems: "flex-start",
            }}
          >
            {/* Title */}
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", fontSize: "1.1rem", mb: 1 }}
            >
              {product.title}
            </Typography>
  
            {/* Description */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.85rem", mb: 1 }}
            >
              {product.description}
            </Typography>
  
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",  // 부모 Box가 전체 너비를 가지도록 설정
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", fontSize: "0.8rem" }}
              >
                달성률 {achievementRate.toFixed(2)}%
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", fontSize: "0.8rem" }}
              >
                {formattedTargetFunding}원
                {/* {product.targetFunding} */}
              </Typography>
            </Box>
  
            <Box
              sx={{
                width: "100%", // 부모 컨테이너 너비를 명시적으로 설정
                height: "auto", // 부모 컨테이너 높이가 자동으로 자식 높이를 수용
                display: "block", // 부모 컨테이너의 display 속성 확인
                overflow: "visible", // 자식 요소를 숨기지 않도록 설정
              }}
            >
              {/* Progress bar */}
              <LinearProgress
                variant="determinate"
                value={achievementRate}
                sx={{ height: 9, borderRadius: "5px", mt: 1, mb: 2 }}
              />
            </Box>
  
            {/* Host and Deadline */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",  // 부모 Box가 전체 너비를 가지도록 설정
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="small"
                sx={{
                  backgroundColor: "#5a87f7",
                  borderRadius: "12px",
                  fontSize: "0.75rem",
                }}
              >
                마감임박 D - {daysLeft}
              </Button>
  
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", fontSize: "0.8rem" }}
              >
                진행자: {product.nickName}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </>
    );
  };