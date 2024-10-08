import React, { useState } from "react";
import {
  Typography,
  LinearProgress,
  Divider,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { styled } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PreviewDetail from "./PreviewDetail";
import "../../styles/style.css";
import "./Preview.css";
import { Header } from "../../layout/Header";
import { Footer } from "../../layout/Footer";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css"; // 부트스트랩 CSS 로드

const ProductContainer = styled("div")({
  position: "relative",
  width: "750px",
  height: "500px",
  backgroundColor: "#f0f0f0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
  overflow: "hidden",
  marginTop: "20px",
});

const ProductImage = styled("img")({
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
  category: "뷰티 & 패션",
  organizer_id: "beauty_lovers",
  title: "혁신적인 립스틱 컬렉션 출시",
  description:
    "고급스러운 컬러와 지속력을 자랑하는 새로운 립스틱 컬렉션을 선보입니다. 이번 프로젝트를 통해 뷰티 트렌드를 선도하는 제품을 만나보세요.",
  currentAmount: 85000000,
  target_funding: 100000000,
  start_date: "2024-10-01",
  end_date: "2024-12-01",
  delivery_date: 1714593600, // Example UNIX timestamp for delivery date
  liked_count: 3421,
  supporterCount: 1567,
  product_url: "https://example.com/product_image.png",
};

const Preview = () => {
  const {
    category,
    title,
    description,
    currentAmount,
    target_funding,
    product_url,
  } = projectData;

  const [progress, setProgress] = useState(
    (currentAmount / target_funding) * 100
  );
  const [liked, setLiked] = useState(false); // 좋아요 상태
  const [likedCount, setLikedCount] = useState(projectData.liked_count); // 좋아요 카운트

  // 좋아요 버튼 클릭 핸들러
  const handleLikeClick = () => {
    if (liked) {
      setLikedCount(likedCount - 1); // 좋아요 수 감소
    } else {
      setLikedCount(likedCount + 1); // 좋아요 수 증가
    }
    setLiked(!liked); // 좋아요 상태 반전
  };

  const ProductCarousel = ({ productDetail }) => (
    <div
      style={{
        marginTop: "200px",
        maxWidth: "1500px",
        margin: "0 auto",
        backgroundColor: "gray",
      }}
    >
      <Carousel fade interval={3000} indicators={true} controls={true}>
        {productDetail &&
        productDetail.productImages &&
        productDetail.productImages.length > 0 ? (
          productDetail.productImages.map((image, index) => (
            <Carousel.Item key={index}>
              {image ? ( // 이미지가 있을 경우에만 출력
                <>
                  <img
                    src={`http://localhost:9000/${image}`}
                    alt={`Product image ${index}`}
                    style={{
                      width: "850px",
                      height: "500px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginTop: "20px",
                    }}
                  />
                  <Carousel.Caption>
                    <h3>Slide {index + 1}</h3>
                    <p>이 슬라이드는 {index + 1}번째 이미지입니다.</p>
                  </Carousel.Caption>
                </>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  이미지가 없습니다.
                </Typography>
              )}
            </Carousel.Item>
          ))
        ) : (
          <Carousel.Item>
            <div
              style={{
                width: "850px",
                height: "500px",
                padding: "200px",
                marginTop: "20px",
                textAlign: "center",
              }}
            >
              <Typography variant="body2" color="textSecondary">
                이미지가 없습니다.
              </Typography>
            </div>
          </Carousel.Item>
        )}
      </Carousel>
    </div>
  );

  return (
    <>
      <Header />
      <div className="container">
        <div style={{ paddingTop: "20px", textAlign: "center" }}>
          <div className="project-info">
            <div className="category">{category}</div>

            <h1 className="project-title">{title}</h1>
            <p className="project-description">{description}</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div
          style={{
            display: "flex",
            width: "1500px",
            justifyContent: "center",
          }}
        >
          <ProductContainer>
            <ProductCarousel productDetail={projectData} />
            {product_url ? (
              <ProductImage src={product_url} alt="Project Product" />
            ) : (
              <Typography variant="body2" color="textSecondary">
                이미지가 없습니다.
              </Typography>
            )}

            <Indicator>
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#ccc",
                  height: "5px",
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    backgroundColor: "#3f51b5",
                    height: "100%",
                  }}
                />
              </div>
            </Indicator>
          </ProductContainer>

          <div style={{ flex: 1, width: "1200px" }}>
            <div className="container" style={{ marginLeft: "50px" }}>
              <h5>
                후원금액 (진행률)
                <div className="goal-price">
                  <span>{currentAmount.toLocaleString()}원</span>
                  <span className="percentage">{progress.toFixed(2)}%</span>
                </div>
              </h5>

              <LinearProgress
                variant="determinate"
                value={progress}
                className="progress-bar"
              />

              <Divider className="divider" />
              <div className="info-text">
                목표금액: {target_funding.toLocaleString()}원
              </div>
              <div className="info-text">
                펀딩 기간:{" "}
                {new Date(projectData.start_date).toLocaleDateString()} ~{" "}
                {new Date(projectData.end_date).toLocaleDateString()}
              </div>
              <div className="info-text">
                예상 전달일: 프로젝트 종료일로부터 30일 이내
              </div>

              <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                {/* 좋아요 버튼 */}
                <Button
                  variant="outlined"
                  onClick={handleLikeClick}
                  startIcon={
                    liked ? (
                      <FavoriteIcon style={{ color: "red" }} />
                    ) : (
                      <FavoriteBorderIcon />
                    )
                  }
                >
                  {liked ? "좋아요 취소" : "좋아요"} {likedCount}
                </Button>

                {/* 후원하기 버튼 */}
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#7a82ed", color: "white" }}
                >
                  후원하기
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 상세설명 */}
        <Divider style={{ margin: "20px 0", width: "1220px" }} />

        <div id="details">
          <Tabs value={0} indicatorColor="primary" textColor="primary">
            <Tab label="상세설명" />
          </Tabs>
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            <PreviewDetail
              descriptionDetail={projectData.description}
              descriptionImages={[projectData.product_url]} // 예시로 이미지 사용
            />
          </Typography>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Preview;
