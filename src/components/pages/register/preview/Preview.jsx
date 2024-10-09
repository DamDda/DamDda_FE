import React, { useState } from "react";
import {
  Typography,
  LinearProgress,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Modal,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Preview.css"; // CSS 파일 불러오기

// 패키지 데이터 (예시)
const packageData = [
  {
    id: 1,
    name: "패키지 1",
    description: "설명 1",
    price: 5000,
    options: ["옵션 1", "옵션 2"],
  },
  {
    id: 2,
    name: "패키지 2",
    description: "설명 2",
    price: 59000,
    options: [],
  },
];

// PreviewDetail 컴포넌트
const PreviewDetail = ({ descriptionDetail, descriptionImages }) => {
  const [rewardOption] = useState(packageData); // 패키지 데이터
  const [selectedPackage, setSelectedPackage] = useState(null); // 선택한 패키지
  const [selectedOptions, setSelectedOptions] = useState({}); // 각 패키지의 옵션 선택

  const handleCardClick = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handleSelectOption = (pkgId, option) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [pkgId]: option, // 해당 패키지의 선택된 옵션을 저장
    }));
  };

  return (
    <div className="package-section">
      <Typography variant="h5" style={{ marginBottom: "10px" }}>
        패키지 선택
      </Typography>
      {rewardOption.map((pkg) => (
        <Card
          key={pkg.id}
          className="package-card"
          onClick={() => handleCardClick(pkg)}
        >
          <CardContent>
            <Typography variant="h6">{pkg.name}</Typography>
            <Typography variant="body1">
              {pkg.price.toLocaleString()}원
            </Typography>
            <Typography variant="body2">{pkg.description}</Typography>
          </CardContent>

          {/* 선택된 패키지의 옵션 표시 */}
          {selectedPackage?.id === pkg.id && (
            <div style={{ marginTop: "10px" }}>
              {pkg.options.length > 0 ? (
                <FormControl fullWidth>
                  <InputLabel id={`select-option-label-${pkg.id}`}>
                    옵션 선택
                  </InputLabel>
                  <Select
                    labelId={`select-option-label-${pkg.id}`}
                    value={selectedOptions[pkg.id] || ""}
                    onChange={(event) =>
                      handleSelectOption(pkg.id, event.target.value)
                    }
                  >
                    {pkg.options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <Typography variant="body2">옵션이 없습니다.</Typography>
              )}
              <Button variant="contained" style={{ marginTop: "10px" }}>
                이 패키지 선택
              </Button>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

// Preview 컴포넌트
const Preview = () => {
  const projectData = {
    category: "뷰티 & 패션",
    title: "혁신적인 립스틱 컬렉션 출시",
    description:
      "고급스러운 컬러와 지속력을 자랑하는 새로운 립스틱 컬렉션을 선보입니다. 이번 프로젝트를 통해 뷰티 트렌드를 선도하는 제품을 만나보세요.",
    currentAmount: 85000000,
    target_funding: 100000000,
    product_url: "https://example.com/product_image.png",
  };

  const { title, description, currentAmount, target_funding, product_url } =
    projectData;

  const [progress, setProgress] = useState(
    (currentAmount / target_funding) * 100
  );
  const [liked, setLiked] = useState(false); // 좋아요 상태
  const [likedCount, setLikedCount] = useState(3421); // 좋아요 카운트

  // 좋아요 버튼 클릭 핸들러
  const handleLikeClick = () => {
    setLikedCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
    setLiked(!liked); // 좋아요 상태 반전
  };

  return (
    <>
      {/* <div className="preview-container">
        <div className="preview-content">
          <div className="image-section">
            <div className="product-container">
              <img className="product-image" src={product_url} alt={title} />
            </div>
            <div className="indicator">
              <Button
                onClick={handleLikeClick}
                startIcon={liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              >
                {likedCount} Likes
              </Button>
            </div>
          </div>
          <div className="info-section">
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {description}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              style={{ marginBottom: "10px", height: "10px" }}
            />
            <Typography variant="body2" color="textSecondary">
              목표 금액: {target_funding.toLocaleString()}원
            </Typography>
            <Typography variant="body2" color="textSecondary">
              현재 금액: {currentAmount.toLocaleString()}원
            </Typography>
          </div>
        </div>

        <Divider style={{ margin: "20px 0" }} />

        {/* 상세 설명과 패키지 선택 섹션 */}
      {/*<PreviewDetail
          descriptionDetail="이 제품은 최신 트렌드를 반영한 고품질 립스틱으로, 다양한 컬러와 텍스처로 구성되어 있습니다. 모든 피부 톤에 잘 어울리며, 특별한 행사에 이상적인 제품입니다."
          descriptionImages={[
            "https://example.com/product_image1.png",
            "https://example.com/product_image2.png",
          ]}
        />
      </div> */}

      <div className="container">
        <div style={{ paddingTop: "20px", textAlign: "center" }}>
          <div className="project-info">
            <div className="category">{productDetail.category}</div>
            <div className="presenter">{productDetail.nickName}</div>

            <h1 className="project-title">{productDetail.title}</h1>
            <p className="project-description">{productDetail.description}</p>
          </div>
        </div>

        <div style={{ padding: "5px", marginBottom: "10px" }}>
          <div
            style={{
              display: "flex",
              width: "1500px",
              justifyContent: "center",
            }}
          >
            <ProductContainer>
              <ProductCarousel />
              {productDetail.productImages &&
              productDetail.productImages.length > 0 ? (
                productDetail.productImages.map((image, index) => (
                  <ProductImage
                    key={index}
                    src={`http://localhost:9000/${image}`}
                    alt={`Product image ${index}`}
                  />
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  이미지가 없습니다.
                </Typography>
              )}

              {product_url ? (
                <ProductImage src={product_url} alt="Project Product" />
              ) : (
                <Typography variant="body2" color="textSecondary">
                  이미지가 없습니다.
                </Typography>
              )}
              {/* <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  zIndex: 1,
                  display: "flex",
                  gap: "5px",
                }}
              ></div> */}
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
                      width: `${achievementRate}%`, //progress
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
                    <span>{productDetail.fundsReceive}원</span>
                    <span className="percentage">
                      {achievementRate.toFixed(2)}%
                    </span>
                  </div>
                </h5>

                <LinearProgress
                  variant="determinate"
                  value={productDetail.fundsReceive}
                  className="progress-bar"
                />

                <div className="stats-container">
                  <div className="stats-item">
                    남은 기간: <span className="stats-value">{daysLeft}일</span>
                  </div>
                  <div className="stats-item">
                    후원자 수:{" "}
                    <span className="stats-value">
                      {productDetail.supporterCnt}명
                    </span>
                  </div>
                </div>

                <Divider className="divider" />
                <div className="info-text">
                  목표금액: {productDetail.targetFunding}원
                </div>
                <div className="info-text">
                  펀딩 기간: {formatDate(productDetail.startDate)} ~{" "}
                  {formatDate(productDetail.endDate)}
                </div>
                <div className="info-text">
                  예상 전달일: 프로젝트 종료일로부터 30일 이내
                </div>
                <div className="button-container">
                  <Button
                    className="contained-button"
                    onClick={handleSponsorClick}
                  >
                    이 프로젝트에 후원하기
                  </Button>
                  <div className="secondary-buttons">
                    <Button
                      variant="outlined"
                      onClick={() => handleHeartClick(isHearted)}
                      className="heart-button"
                    >
                      {isHearted ? "♥" : "♡"} {liked_count}명
                    </Button>
                    <Button variant="outlined" className="heart-button">
                      협업하기
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 상세설명 */}
          <Divider style={{ margin: "20px 0", width: "1220px" }} />

          <div id="details">
            <Tabs value={0} indicatorColor="primary" textColor="primary">
              <Tab
                label="상세설명"
                onClick={() => scrollToSection("details")}
              />
              <Tab
                label="공지사항"
                onClick={() => scrollToSection("notices")}
              />
              <Tab label="Q&A" onClick={() => scrollToSection("qna")} />
            </Tabs>
            <Typography variant="body1" style={{ marginTop: "10px" }}>
              <PreviewDetail
                onPackageSelect={(pkg) => console.log("Selected Package:", pkg)}
              />
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;
