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
  Tab,
  Tabs,
} from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Preview.css"; // CSS 파일 불러오기

// PreviewDetail 컴포넌트
const PreviewDetail = ({ projectDescription, projectImages }) => {
  const [packages] = useState([]); // 빈 배열로 초기화
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
      <h1 style={{ marginBottom: "10px" }}>선택한 선물</h1>
      {/* 패키지가 배열인지 확인 후 map 실행 */}
      {Array.isArray(packages) && packages.length > 0 ? (
        packages.map((pkg) => (
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

            {/* 선택된 패키지의 옵션 표시 */}
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
                  Select This Package
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
const Preview = ({ formData, tags, productImages }) => {
  const sampleProject = {
    category: "뷰티 & 패션",
    title: "혁신적인 립스틱 컬렉션 출시",
    description:
      "활기찬 색상과 지속력을 자랑하는 고급 립스틱 컬렉션을 소개합니다. 이 프로젝트에 참여해 뷰티 트렌드세터의 일원이 되세요.",
    currentAmount: 85000000,
    targetAmount: 100000000,
    productImage: "https://example.com/product_image.png",
  };

  const { title, description, currentAmount, targetAmount, productImage } =
    sampleProject;

  const [progressPercentage, setProgressPercentage] = useState(
    (currentAmount / targetAmount) * 100
  );
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태
  const [likeCount, setLikeCount] = useState(""); // 좋아요 카운트

  const handleLikeClick = () => {
    setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
    setIsLiked(!isLiked); // 좋아요 상태 반전
  };

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="container3">
        <div style={{ paddingTop: "20px", textAlign: "center" }}>
          <div className="project-info">
            <div className="category">{formData.category || "선택안함"}</div>
            <h1 className="project-title">{formData.title || "제목 없음"}</h1>
            <p className="project-description">
              {formData.description || "설명없음"}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", paddingTop: "20px" }}>
          {/* 왼쪽 - 이미지 캐러셀 */}

          <div style={{ flex: 1, paddingRight: "20px" }}>
            <Carousel>
              {productImages.length > 0 ? (
                productImages.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={image.url}
                      alt={`product-image-${index}`}
                      style={{
                        width: "100%",
                        height: "400px",
                        objectFit: "cover",
                      }}
                    />
                  </Carousel.Item>
                ))
              ) : (
                <Carousel.Item>
                  <div
                    style={{
                      width: "100%",

                      height: "400px",

                      display: "flex",

                      justifyContent: "center",

                      alignItems: "center",

                      backgroundColor: "#ccc",
                    }}
                  >
                    이미지가 없습니다.
                  </div>
                </Carousel.Item>
              )}
            </Carousel>
          </div>

          {/* 오른쪽 - 프로젝트 정보 및 진행률 */}
          <div style={{ padding: "5px", marginBottom: "10px", flex: 1 }}>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <div className="carousel-section">
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={formData.productImage || "이미지 없음"}
                      alt="First slide"
                    />
                  </Carousel.Item>
                </Carousel>
              </div>

              <div style={{ flex: 1, marginLeft: "50px" }}>
                <h5>
                  후원금액 (진행률)
                  <div className="goal-price">
                    <span>{currentAmount.toLocaleString()} 원</span>
                    <span className="percentage">
                      {progressPercentage.toFixed(2)}%
                    </span>
                  </div>
                </h5>

                <LinearProgress
                  variant="determinate"
                  value={progressPercentage}
                  className="progress-bar"
                />

                <Divider className="divider" />
                <div className="info-text">
                  목표금액:{" "}
                  {formData?.target_funding
                    ? formData.target_funding.toLocaleString()
                    : "0"}{" "}
                  원
                </div>
                <div className="info-text">
                  펀딩기간: {formData.start_date} ~ {formData.end_date}
                </div>
                <div className="info-text">
                  예상전달일: 프로젝트 종료 후 30일이내
                </div>
                <div className="button-container">
                  <Button className="contained-button">
                    이 프로젝트 후원하기
                  </Button>
                  <div className="secondary-buttons">
                    <Button
                      variant="outlined"
                      onClick={handleLikeClick}
                      className="heart-button"
                    >
                      {isLiked ? "♥" : "♡"} {likeCount} 명
                    </Button>
                    <Button variant="outlined" className="heart-button">
                      협업하기
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Divider style={{ margin: "20px 0", width: "100%" }} />

        <div id="details">
          {/* <Tabs value={0} indicatorColor="primary" textColor="primary">
              <Tab label="Details" onClick={() => alert("Scroll to details")} />
              <Tab label="Notices" onClick={() => alert("Scroll to notices")} />
              <Tab label="Q&A" onClick={() => alert("Scroll to Q&A")} />
            </Tabs>
            <Typography variant="body1" style={{ marginTop: "10px" }}>
              <PreviewDetail
                projectDescription={description}
                projectImages={[productImage]} // 이미지 배열로 전달
              />
            </Typography> */}

          {/* 상세 설명 영역 */}

          <div id="details" style={{ marginTop: "30px" }}>
            <Tabs value={0} indicatorColor="primary" textColor="primary">
              <Tab label="상세설명" />

              <Tab label="선물구성" />

              <Tab label="서류제출" />
            </Tabs>

            <Typography variant="body1" style={{ marginTop: "10px" }}>
              {formData.descriptionDetail || "상세설명이 없습니다."}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;
