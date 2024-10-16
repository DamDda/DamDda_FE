import React, { useState, useEffect } from "react";
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
  Tab,
  Tabs,
} from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Preview.css"; // CSS 파일 불러오기
import dayjs from "dayjs"; // 날짜 처리 라이브러리

// PreviewDetail 컴포넌트
const PreviewDetail = ({ formattedGifts }) => {
  const [selectedPackage, setSelectedPackage] = useState(null); // 선택한 패키지
  const [selectedPackageOptions, setSelectedPackageOptions] = useState({}); // 각 패키지의 옵션 선택

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handleOptionSelect = (pkgId, option) => {
    setSelectedPackageOptions((prevOptions) => ({
      ...prevOptions,
      [pkgId]: option, // 해당 패키지의 선택된 옵션을 저장
    }));
  };

  return (
    <div className="package-section">
      <h1 style={{ marginBottom: "10px" }}>선물구성</h1>
      {Array.isArray(formattedGifts) && formattedGifts.length > 0 ? (
        formattedGifts.map((pkg) => (
          <Card
            key={pkg.id}
            className="package-card"
            onClick={() => handlePackageSelect(pkg)}
          >
            <CardContent>
              <h3>{pkg.name}</h3>
              <span>{pkg.price.toLocaleString()} 원</span>
              <span>{pkg.description}</span>
            </CardContent>

            {selectedPackage?.id === pkg.id && (
              <div style={{ marginTop: "10px" }}>
                {pkg.options.length > 0 ? (
                  <FormControl fullWidth>
                    <InputLabel id={`select-option-label-${pkg.id}`}>
                      옵션
                    </InputLabel>
                    <Select
                      labelId={`select-option-label-${pkg.id}`}
                      value={selectedPackageOptions[pkg.id] || ""}
                      onChange={(event) =>
                        handleOptionSelect(pkg.id, event.target.value)
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
                  <Typography variant="body2">옵션을 선택해주세요</Typography>
                )}
                <Button variant="contained" style={{ marginTop: "10px" }}>
                  이 패키지 선택
                </Button>
              </div>
            )}
          </Card>
        ))
      ) : (
        <Typography variant="body2">No packages available.</Typography>
      )}
    </div>
  );
};

// Preview 컴포넌트
const Preview = ({
  formData,
  tags,
  productImages,
  descriptionDetail,
  descriptionImages,
  formattedGifts,
}) => {
  const {
    title = "",
    description = "",
    currentAmount = 0,
    targetAmount = 0,
    productImage = "",
    end_date = "",
    start_date = "",
  } = formData;
  console.log("dmdkdkdkdkdkr" + descriptionImages);

  console.log("dmdkdkdkdkdkr" + descriptionImages);
  descriptionImages.forEach((image) => {
    console.log(image); // 각 객체의 내용을 확인
  });

  // 진행률 계산
  const progressPercentage = (currentAmount / targetAmount) * 100 || 0;
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태
  const [likeCount, setLikeCount] = useState(0); // 좋아요 카운트

  // 종료일 계산
  const endDate = dayjs(end_date);
  const today = dayjs();
  const daysLeft = endDate.diff(today, "day");

  const handleLikeClick = () => {
    setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
    setIsLiked(!isLiked); // 좋아요 상태 반전
  };

  return (
    <>
      <div className="container3">
        <div>
          <div className="project-info">
            <div className="category">{formData.category || "선택안함"}</div>
            <h1 className="project-title">{title || "제목 없음"}</h1>
            <p className="project-description">{description || "설명없음"}</p>
          </div>
        </div>

        <div className="section">
          {/* 왼쪽 - 이미지 캐러셀 */}
          <div className="image-section">
            <Carousel>
              {productImages.length > 0 ? (
                productImages.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img src={image.url} alt={`product-image-${index}`} />
                  </Carousel.Item>
                ))
              ) : (
                <Carousel.Item>
                  <div className="no-image">이미지가 없습니다.</div>
                </Carousel.Item>
              )}
            </Carousel>
            <div className="carousel-section">
              <Carousel>
                <Carousel.Item>
                  <img src={productImage || "이미지 없음"} alt="First slide" />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>

          {/* 오른쪽 - 프로젝트 정보 및 진행률 */}
          <div className="info-section">
            <div className="stats-container">
              <div className="stats-item">
                <h3>
                  후원금액 (진행률)
                  <div className="goal-price">
                    {currentAmount.toLocaleString()} 원
                    <span className="percentage">
                      ({progressPercentage.toFixed(2)}%)
                    </span>
                  </div>
                </h3>
              </div>

              <LinearProgress
                variant="determinate"
                value={progressPercentage}
                className="progress-bar"
              />

              <div className="stats-item">
                <span className="stats-label">남은 기간:</span>{" "}
                <span className="project-title">
                  {daysLeft >= 0 ? `+${daysLeft}일` : `${daysLeft}일`}
                </span>
              </div>
              <div className="stats-item">
                <span className="stats-label">후원자 수:</span>{" "}
                <span className="project-title">0명</span>
              </div>
            </div>
            <Divider className="divider" />
            <div className="info-text">
              목표금액:{" "}
              {formData?.target_funding
                ? formData.target_funding.toLocaleString()
                : "0"}{" "}
              원
            </div>
            <div className="info-text">
              펀딩기간: {start_date} ~ {end_date}
            </div>
            <div className="info-text">
              예상전달일: 프로젝트 종료 후 30일 이내
            </div>
            <div className="button-container1">
              <Button className="primary-button-width1">
                이 프로젝트 후원하기
              </Button>
              <div className="secondary-buttons1">
                <Button
                  variant="outlined"
                  onClick={handleLikeClick}
                  className="outlined-button1"
                >
                  {isLiked ? "♥" : "♡"} {likeCount} 명
                </Button>
                <Button variant="outlined" className="outlined-button1">
                  협업하기
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        <div className="details" style={{ margin: "30px" }}>
          <div>
            <Tabs value={0} indicatorColor="primary" textColor="primary">
              <Tab label="상세설명" />
              <Tab label="공지사항" />
              <Tab label="Q&A" />
            </Tabs>
          </div>

          <div className="detailDescription">
            <div className="container4">
              <Typography variant="body1" style={{ marginTop: "80px" }}>
                {descriptionDetail ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: descriptionDetail }}
                  />
                ) : (
                  "상세설명이 없습니다."
                )}
              </Typography>

              {descriptionImages && descriptionImages.length > 0 ? (
                <div style={{ marginTop: "10px" }}>
                  {descriptionImages.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={`description-image-${index}`}
                      style={{
                        width: "100%",
                        height: "auto",
                        marginTop: "10px",
                      }}
                    />
                  ))}
                </div>
              ) : (
                <Typography
                  variant="body2"
                  style={{ marginTop: "10px", color: "gray" }}
                >
                  이미지가 없습니다.
                </Typography>
              )}
            </div>
            <div className="container5">
              <PreviewDetail formattedGifts={formattedGifts} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;
