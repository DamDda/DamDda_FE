import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/system";

// 컨테이너 스타일
const Container = styled("div")({
  padding: "20px",
  backgroundColor: "#f0f0f0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

// 상세 설명 섹션 스타일
const DetailSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginBottom: "20px",
  maxWidth: "800px", // 최대 너비 800px
  textAlign: "center",
});

// 패키지 섹션 스타일
const PackageSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginLeft: "20px",
  alignItems: "center",
  width: "400px",
});

// 카드 스타일
const PackageCard = styled(Card)({
  backgroundColor: "#f9f9f9",
  marginBottom: "10px",
  width: "100%",
  cursor: "pointer",
});

const ImageContainer = styled("img")({
  width: "100%",
  height: "auto",
  marginBottom: "10px",
});

const PreviewDetail = ({ descriptionDetail, descriptionImages }) => {
  const [rewardOption, setRewardOption] = useState([]); // 패키지 데이터
  const [selectedPackage, setSelectedPackage] = useState(null); // 선택한 패키지
  const [selectedOptions, setSelectedOptions] = useState({}); // 각 패키지의 옵션 선택

  useEffect(() => {
    // 패키지 및 상세 설명 데이터를 불러오는 함수 (API 연동 필요)
    const fetchData = async () => {
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

      setRewardOption(packageData); // 패키지 데이터를 상태로 저장
    };

    fetchData();
  }, []);

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
    <Container>
      {/* 상세 설명 섹션 */}
      <DetailSection>
        <Typography variant="h5" style={{ marginBottom: "10px" }}>
          상세 설명
        </Typography>

        <Typography variant="body1" style={{ marginBottom: "20px" }}>
          {descriptionDetail}
        </Typography>

        {/* 이미지 미리보기 */}
        {descriptionImages && descriptionImages.length > 0 ? (
          descriptionImages.map((image, index) => (
            <ImageContainer
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
      </DetailSection>

      {/* 선물 구성 섹션 */}
      <PackageSection>
        <Typography variant="h5" style={{ marginBottom: "10px" }}>
          패키지 선택
        </Typography>
        {rewardOption.map((pkg) => (
          <PackageCard key={pkg.id} onClick={() => handleCardClick(pkg)}>
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
          </PackageCard>
        ))}
      </PackageSection>
    </Container>
  );
};

export default PreviewDetail;
